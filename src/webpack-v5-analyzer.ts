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
} from 'ts-morph';
import ts from 'typescript';
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

    // TODO: continue to analyze the map
    webpackModuleMap.forEach((moduleInitializer, moduleId) => {
      const [
        webpackModuleParam,
        webpackExportsParam,
        webpackRequireParam,
      ] = moduleInitializer.getParameters();

      if (!webpackModuleParam && !webpackExportsParam && !webpackRequireParam)
        throw new Error('no module initializer params?');

      if (webpackModuleParam && !webpackExportsParam && !webpackRequireParam) {
        // this is likely just a weirdo webpack overhead thingy, ignore
        return;
      }

      moduleInitializer.getStatements().forEach((statement) => {
        const nonWebpackStatements = [];

        // is this a webpack import/require statement?
        if (
          statement instanceof VariableStatement &&
          statement
            .getDeclarationList()
            .getDeclarations()[0]
            ?.getInitializerIfKind(ts.SyntaxKind.CallExpression)
            ?.getExpressionIfKind(ts.SyntaxKind.Identifier)
            ?.getDefinitionNodes()[0] === webpackRequireParam
        ) {
          // ignore for now
          return;
        }

        // is this a webpack export statement
        if (
          statement instanceof ExpressionStatement &&
          statement
            .getFirstChildIfKind(ts.SyntaxKind.CallExpression)
            ?.getFirstChildIfKind(ts.SyntaxKind.PropertyAccessExpression)
            ?.getFirstChildIfKind(ts.SyntaxKind.Identifier)?.getDefinitionNodes[0] ===
            webpackExportsParam
        ) {
          // ignore for now
          return;
        }
        nonWebpackStatements.push(statement);

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
      });
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
