import {
  ArrayLiteralExpression,
  SourceFile,
  Node,
  ArrowFunction,
  FunctionExpression,
  ObjectLiteralExpression,
  PropertyAssignment,
  NumericLiteral,
  VariableStatement,
  ExpressionStatement,
  Identifier,
  Statement,
} from 'ts-morph';
import ts from 'typescript';
import { assertIsDefined } from './utils';
import {
  FileAnalysis,
  analyzeStatementBlock,
  ExpressionStatementAnalysis,
  DeclarationAnalysis,
} from './analyzer';
import { SourceMapper } from './source-mapper';

export function analyzeWebpack5Chunk(
  fileAnalysis: FileAnalysis,
  sourceFile: SourceFile,
  sourceMapper: SourceMapper | null,
): FileAnalysis | null {
  const statements = sourceFile.getStatements();
  const nodeToAnalysisMap: Map<Node, DeclarationAnalysis | ExpressionStatementAnalysis> = new Map();
  const nameToAnalysisMap: Map<
    string,
    DeclarationAnalysis | ExpressionStatementAnalysis
  > = new Map();

  if (statements.length !== 1) return null;

  // (self.webpackChunkcli_webpack5 = self.webpackChunkcli_webpack5 || []).push()
  const callExpression = sourceFile
    ?.getFirstChildIfKind(ts.SyntaxKind.SyntaxList)
    ?.getFirstChildIfKind(ts.SyntaxKind.ExpressionStatement)
    ?.getFirstChildIfKind(ts.SyntaxKind.CallExpression);

  if (
    !callExpression ||
    callExpression.getFirstDescendantByKind(ts.SyntaxKind.Identifier)?.getText() !== 'self' ||
    callExpression.getExpressionIfKind(ts.SyntaxKind.PropertyAccessExpression)?.getName() !== 'push'
  )
    return null;

  const callArguments = callExpression.getArguments();
  if (callArguments.length !== 1) return null;

  /**
   * [ [], {}, () => {}]
   */
  const pushArrayLiteral = callExpression.getLastChildByKind(ts.SyntaxKind.ArrayLiteralExpression);
  if (!pushArrayLiteral) return null;

  const [chunkIdArray, chunkRegistry, chunkRegistrationCallback] = pushArrayLiteral.getElements();

  if (
    !(chunkIdArray instanceof ArrayLiteralExpression) ||
    chunkIdArray.getElements().length !== 1 ||
    chunkIdArray.getFirstChildIfKind(ts.SyntaxKind.NumericLiteral)
  )
    return null;

  if (
    !(
      chunkRegistrationCallback instanceof ArrowFunction ||
      chunkRegistrationCallback instanceof FunctionExpression
    )
  )
    return null;

  if (!(chunkRegistry instanceof ObjectLiteralExpression)) return null;

  const webpackModuleMap = new Map<number, FunctionExpression | ArrowFunction>();

  // global mapping of all internal webpack exports to their declarations
  // the map format `internalModuleId#exportId` => `internalModuleId#declarationName`
  const webpackExportMap = new Map<string, string>();

  try {
    chunkRegistry.getProperties().forEach((propertyAssignment) => {
      if (!(propertyAssignment instanceof PropertyAssignment))
        throw new Error('chunkRegistry element not a PropertyAssignment');

      const moduleIdNode = propertyAssignment.getNameNode();
      if (!(moduleIdNode instanceof NumericLiteral))
        throw new Error('moduleId not a NumericLiteral');

      const moduleInitializer = propertyAssignment.getInitializer();
      if (
        !(
          moduleInitializer instanceof FunctionExpression ||
          moduleInitializer instanceof ArrowFunction
        )
      )
        throw new Error('module initializer not a FunctionExpression or ArrowFunction');

      webpackModuleMap.set(moduleIdNode.getLiteralValue(), moduleInitializer);
    });

    // In the first pass over the module map, we extract all the exports and create a complete exports map
    webpackModuleMap.forEach((moduleInitializer, moduleId) => {
      const [
        webpackModuleParam,
        webpackExportsParam,
        webpackRequireParam,
      ] = moduleInitializer.getParameters();

      const [webpackExportsParamRef, wtfRef] = webpackExportsParam
        ? webpackExportsParam.findReferencesAsNodes()
        : [];

      if (wtfRef) {
        throw new Error(
          'Found unexpected second webpack export reference within a webpack module with id: ' +
            moduleId,
        );
      }

      if (!webpackExportsParamRef) {
        // this module has no exports, skip it
        return;
      }

      const exportObjectLiteral = webpackExportsParamRef
        .getNextSiblingIfKindOrThrow(ts.SyntaxKind.CommaToken)
        .getNextSiblingIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression);

      exportObjectLiteral.getProperties().forEach((exportPropertyAssignement) => {
        if (!(exportPropertyAssignement instanceof PropertyAssignment))
          throw new Error('Expected exports to be property assignments');

        const exportIdentifier = exportPropertyAssignement.getName();
        const exportInitializer = exportPropertyAssignement.getInitializer();
        let exportedDeclarationName;

        if (exportInitializer instanceof FunctionExpression) {
          exportedDeclarationName = exportInitializer
            .getFirstDescendantByKindOrThrow(ts.SyntaxKind.ReturnStatement)
            .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier)
            .getDefinitions()[0]
            .getName();
        } else if (exportInitializer instanceof ArrowFunction) {
          exportedDeclarationName = exportInitializer
            .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier)
            .getDefinitions()[0]
            .getName();
        } else {
          throw new Error(
            'Expected export initializer to be a fn declaration or an arrow function',
          );
        }

        webpackExportMap.set(
          `${moduleId}#${exportIdentifier}`,
          `${moduleId}#${exportedDeclarationName}`,
        );
      });
    });

    //console.log(webpackExportMap);

    // In the second pass over the module map we extract everything else, and cross reference all the
    // code against the exports map
    webpackModuleMap.forEach((moduleInitializer, moduleId) => {
      const [
        webpackModuleParam,
        webpackExportsParam,
        webpackRequireParam,
      ] = moduleInitializer.getParameters();

      // integrity check counter to ensure that we collect and remap all of webpack requires
      let webpackRequireParamUsageCount = 0;

      if (!webpackModuleParam && !webpackExportsParam && !webpackRequireParam)
        throw new Error('no module initializer params?');

      if (webpackModuleParam && !webpackExportsParam && !webpackRequireParam) {
        // this is likely just a weirdo webpack overhead thingy, ignore
        return;
      }

      const nonWebpackStatements = [] as Statement<ts.Statement>[];
      moduleInitializer.getStatements().forEach((statement) => {
        // is this a "use strict"; or 'use strict'; preamble?
        const maybeUseStrict = statement
          .getFirstChildIfKind(ts.SyntaxKind.StringLiteral)
          ?.getText();
        if (
          statement instanceof ExpressionStatement &&
          (maybeUseStrict === "'use strict'" || maybeUseStrict === '"use strict"')
        ) {
          // consider as part of webpack overhead
          return;
        }

        // is this a webpack export statement
        let firstArgument, secondArgument;
        if (
          statement instanceof ExpressionStatement &&
          statement
            .getFirstChildIfKind(ts.SyntaxKind.CallExpression)
            ?.getFirstChildIfKind(ts.SyntaxKind.PropertyAccessExpression)
            ?.getFirstChildIfKind(ts.SyntaxKind.Identifier)
            ?.getDefinitionNodes()[0] === webpackRequireParam &&
          (firstArgument = statement
            .getFirstChildIfKind(ts.SyntaxKind.CallExpression)
            ?.getArguments()[0]) instanceof Identifier &&
          firstArgument.getDefinitionNodes()[0] === webpackExportsParam &&
          (secondArgument = statement
            .getFirstChildIfKind(ts.SyntaxKind.CallExpression)
            ?.getArguments()[1]) instanceof ObjectLiteralExpression
        ) {
          webpackRequireParamUsageCount++;

          // we've extracted everything in the first pass, so return and go to the next statement
          return;
        }

        // is this a webpack import/require statement?
        if (
          statement instanceof VariableStatement &&
          // peek at the first declaration to see if it's webpack require
          statement
            .getDeclarationList()
            .getDeclarations()[0]
            .getInitializerIfKind(ts.SyntaxKind.CallExpression)
            ?.getExpressionIfKind(ts.SyntaxKind.Identifier)
            ?.getDefinitionNodes()[0] === webpackRequireParam
        ) {
          statement
            .getDeclarationList()
            .getDeclarations()
            .forEach((varDeclaration) => {
              if (
                !(
                  varDeclaration
                    ?.getInitializerIfKind(ts.SyntaxKind.CallExpression)
                    ?.getExpressionIfKind(ts.SyntaxKind.Identifier)
                    ?.getDefinitionNodes()[0] === webpackRequireParam
                )
              ) {
                // this is not a webpack require variable declaration within webpack require VariableStatement
                throw new Error(
                  'found VariableStatement that contains mixture of webpack requrire and non-webpack variable declarations',
                );
              }

              webpackRequireParamUsageCount++;
              // that's it, we don't process the import just yet, we'll loop over the moduleMap 3rd time, to process imports
              // that's when we cross reference imports against exports, find retaining declarations, and update retainers
            });

          return;
        }

        // the current statement is not part of the webpack overhead, stash it in nonWebpackStatements
        // for later processing
        nonWebpackStatements.push(statement);
      });

      if (webpackRequireParam.findReferencesAsNodes().length !== webpackRequireParamUsageCount) {
        throw new Error(
          'Some webpackRequire usages have not been accounted for ' +
            ' ' +
            webpackRequireParam.findReferencesAsNodes().length +
            ' ' +
            webpackRequireParam.findReferencesAsNodes()[0].getFullText() +
            ' ' +
            webpackRequireParam.findReferencesAsNodes()[0].getStart() +
            ' ' +
            webpackRequireParamUsageCount +
            nonWebpackStatements[0].getFullText(),
        );
      }

      // TODO: the first arg is not needed?!?, remove?
      const [statementBlockAnalysis, statementBlockAnalysisMap] = analyzeStatementBlock(
        nonWebpackStatements,
        sourceFile,
        sourceMapper,
        fileAnalysis.deadCodeNode.name,
        true,
        true,
      );

      statementBlockAnalysisMap.forEach((analysis, node) => {
        const localizedAnalysis = localizeAnalysis(analysis, moduleId);
        nodeToAnalysisMap.set(node, localizedAnalysis);
        nameToAnalysisMap.set(localizedAnalysis.name, localizedAnalysis);
      });
    });

    // In the third pass over the module map, we extract all the exports and create a complete exports map
    webpackModuleMap.forEach((moduleInitializer, moduleId) => {
      const [
        webpackModuleParam,
        webpackExportsParam,
        webpackRequireParam,
      ] = moduleInitializer.getParameters();

      const webpackRequireParamRefs = webpackRequireParam
        ? webpackRequireParam.findReferencesAsNodes()
        : [];

      if (webpackRequireParamRefs.length === 0) {
        // this module has no imports, skip it
        return;
      }

      const moduleImports = webpackRequireParamRefs
        .map((webpackRequireParamRef) => {
          const webpackRequireCallExpression = webpackRequireParamRef.getParentIfKind(
            ts.SyntaxKind.CallExpression,
          );

          if (!webpackRequireCallExpression) {
            // this is most likely a webpack export statement, skip it
            return null;
          }

          const importedModuleIdNode = webpackRequireCallExpression.getArguments()[0];

          if (!(importedModuleIdNode instanceof NumericLiteral)) {
            throw new Error(
              `Expected imported module id @ position ${importedModuleIdNode.getStart()} to be a NumericLiteral, but was: ${importedModuleIdNode.getKindName()}`,
            );
          }

          const importedModuleId = importedModuleIdNode.getLiteralValue();
          const importedModuleVarDeclaration = webpackRequireCallExpression.getParentIfKindOrThrow(
            ts.SyntaxKind.VariableDeclaration,
          );
          const importedModuleVarIdentifier = importedModuleVarDeclaration.getFirstChildByKindOrThrow(
            ts.SyntaxKind.Identifier,
          );
          return [importedModuleVarIdentifier, importedModuleId] as [Identifier, number];
        })
        .filter((moduleImport) => moduleImport !== null) as [Identifier, number][];

      moduleImports.forEach(([importedModuleVarIdentifier, importedModuleId]) => {
        importedModuleVarIdentifier.findReferencesAsNodes().forEach((importedModuleRef) => {
          const importedSymbolRef = importedModuleRef.getParentIfKindOrThrow(
            ts.SyntaxKind.PropertyAccessExpression,
          );
          const importedSymbolName = importedSymbolRef.getName();
          const declarationName = webpackExportMap.get(`${importedModuleId}#${importedSymbolName}`);
          assertIsDefined(declarationName);

          // console.log(
          //   `found ${importedModuleVarIdentifier.getText()}.${importedSymbolName}, which maps to: ${importedModuleId}#${importedSymbolName} => ${declarationId}`,
          // );

          //  1. get hold of the declaration analysis for the importedSymbolRef
          const declarationAnalysis = nameToAnalysisMap.get(declarationName);
          assertIsDefined(declarationAnalysis);

          //  2. now figure out what declaration node ratiners this importedSymbolRef
          const retainingStatement = importedSymbolRef.getFirstAncestorOrThrow((ancestor) =>
            nodeToAnalysisMap.has(ancestor),
          );
          const retainingStatementAnalysis = nodeToAnalysisMap.get(retainingStatement);
          assertIsDefined(retainingStatementAnalysis);

          //  3. update the declaration analysis from #1 with new retainer found in #2
          declarationAnalysis.retainers.push(retainingStatementAnalysis.name);
        });
      });
    });

    nameToAnalysisMap.forEach((analysis) => {
      // dedupe all local {moduleId}##DEAD references
      analysis.retainers = analysis.retainers.filter((retainer) => !retainer.match(/\w+##DEAD#$/));
      if (analysis.retainers.length === 0) {
        analysis.retainers.push(fileAnalysis.deadCodeNode.name);
      }

      if (analysis instanceof DeclarationAnalysis) {
        fileAnalysis.declarations.push(analysis);
      } else {
        fileAnalysis.expressionStatements.push(analysis);
      }
    });

    // TODO:
    //  1. go over all declarations extracted from the entire chunk and update retainers as follows
    //    a. if retainers.length > 2, remove the {moduleId}##DEAD# retainer
    //    a. otherwise replace {moduleId}##DEAD# retainer with global #DEAD# retainer
  } catch (e) {
    console.error(e);
    return null;
  }

  return fileAnalysis;
}

function isKind<T extends ts.SyntaxKind, NT extends Node>(
  node: Node<ts.Node>,
  kind: T,
  nodeType: NT,
): node is NT {
  return node.getKind() === kind;
}

function localizeAnalysis<T extends DeclarationAnalysis | ExpressionStatementAnalysis>(
  analysis: T,
  moduleId: number,
): T {
  // TODO: OMG mutating the returned value, refactor?
  analysis.name = `${moduleId}#${analysis.name}`;
  analysis.retainers = analysis.retainers.map((retainer) => `${moduleId}#${retainer}`);
  return analysis;
}
