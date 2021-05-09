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
  FunctionDeclaration,
  ReturnStatement,
} from 'ts-morph';
import ts, { convertCompilerOptionsFromJson } from 'typescript';
import { FileAnalysis, analyzeStatementBlock } from './analyzer';
import { SourceMapper } from './source-mapper';

export function analyze(
  fileAnalysis: FileAnalysis,
  sourceFile: SourceFile,
  sourceMapper: SourceMapper | null,
): FileAnalysis | null {
  const statements = sourceFile.getStatements();

  if (statements.length !== 1) return null;

  // (self.webpackChunkcli_webpack5 = self.webpackChunkcli_webpack5 || []).push()
  const callExpression = sourceFile
    .getFirstChildIfKind(ts.SyntaxKind.SyntaxList)
    .getFirstChildIfKind(ts.SyntaxKind.ExpressionStatement)
    ?.getFirstChildIfKind(ts.SyntaxKind.CallExpression);

  if (
    !callExpression ||
    callExpression.getExpressionIfKind(ts.SyntaxKind.PropertyAccessExpression)?.getName() !== 'push'
  )
    return null;

  const callArguments = callExpression.getArguments();
  if (callArguments.length !== 1) return null;

  /**
   * [ [], {}, () => {}]
   */
  const pushArrayLiteral = callExpression.getLastChildByKind(ts.SyntaxKind.ArrayLiteralExpression);
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

      const nonWebpackStatements = [];
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
          secondArgument.getProperties().forEach((exportPropertyAssignement) => {
            //console.log(exportPropertyAssignement.getFullText());
            if (!(exportPropertyAssignement instanceof PropertyAssignment))
              throw new Error('Expected exports to be property assignments');

            const exportIdentifier = exportPropertyAssignement.getName();
            const exportInitializer = exportPropertyAssignement.getInitializer();
            let exportedDeclarationName;

            if (exportInitializer instanceof FunctionExpression) {
              exportedDeclarationName = exportInitializer
                .getFirstDescendantByKindOrThrow(ts.SyntaxKind.ReturnStatement)
                .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier)
                .getDefinitionNodes()[0]
                .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier)
                .getText();
            } else if (exportInitializer instanceof ArrowFunction) {
              exportedDeclarationName = exportInitializer
                .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier)
                .getDefinitionNodes()[0]
                .getFirstChildByKindOrThrow(ts.SyntaxKind.Identifier)
                .getText();
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

          webpackRequireParamUsageCount++;

          // we've extracted everything, so return and go to the next statement
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

              // TODO: map imports to their usage and update retainers
              webpackRequireParamUsageCount++;
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

      const statementBlockAnalysis = analyzeStatementBlock(
        nonWebpackStatements,
        sourceFile,
        sourceMapper,
        fileAnalysis.deadCodeNode.name,
        true,
        true,
      );

      fileAnalysis.declarations = [
        ...fileAnalysis.declarations,
        ...statementBlockAnalysis.declarations.map((analysis) => ({
          ...analysis,
          name: `${moduleId}#${analysis.name}`,
        })),
      ];
      fileAnalysis.expressionStatements = [
        ...fileAnalysis.expressionStatements,
        ...statementBlockAnalysis.expressionStatements,
      ];
    });
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
