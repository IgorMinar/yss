import { DominanceInfo } from 'dominance';
import {
  Project,
  FunctionDeclaration,
  ClassDeclaration,
  VariableStatement,
  ExpressionStatement,
  Node,
  CallExpression,
  ExportDeclaration,
  VariableDeclaration,
  Statement,
  SourceFile,
} from 'ts-morph';
import ts from 'typescript';
import { assertIsDefined } from './utils';
import { SourceMapper, SourceMapInfo } from './source-mapper';
import { analyzeWebpack5Chunk } from './webpack-v5-analyzer';

export function analyze(
  fileName: string,
  fileContents: string,
  skipDiagnostics = false,
  ignoreExports = true,
  sourceMapper: SourceMapper | null = null,
): FileAnalysis {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      outDir: 'dist/',
      skipLibCheck: true,
      //TODO: do we need this? Tests suggest that console.log() in a webpack5 module requires lib.dom.d.ts
      //lib: ['esnext', 'dom'],
    },
    useInMemoryFileSystem: true,
  });

  const fileAnalysis = new FileAnalysis(fileName);

  project.createSourceFile(fileName, fileContents);
  const sourceFile = project.getSourceFile(fileName)!;

  if (!skipDiagnostics) {
    const diagnostics = project.getPreEmitDiagnostics();
    if (diagnostics.length > 0) {
      throw new Error(project.formatDiagnosticsWithColorAndContext(diagnostics));
    }
  }

  analyzeWebpack5Chunk(fileAnalysis, sourceFile, sourceMapper) ||
    analyzeESModule(fileAnalysis, sourceFile, sourceMapper, ignoreExports);

  return fileAnalysis;
}

function analyzeESModule(
  fileAnalysis: FileAnalysis,
  sourceFile: SourceFile,
  sourceMapper: SourceMapper | null,
  ignoreExports: boolean,
) {
  const topLevelStatements = sourceFile.getStatements();
  const [statementBlockAnalysis] = analyzeStatementBlock(
    topLevelStatements,
    sourceFile,
    sourceMapper,
    fileAnalysis.deadCodeNode.name,
    ignoreExports,
  );
  fileAnalysis.declarations = fileAnalysis.declarations.concat(statementBlockAnalysis.declarations);
  fileAnalysis.expressionStatements = fileAnalysis.expressionStatements.concat(
    statementBlockAnalysis.expressionStatements,
  );

  return fileAnalysis;
}

export function analyzeStatementBlock(
  topLevelStatements: Statement<ts.Statement>[],
  sourceFile: SourceFile,
  sourceMapper: SourceMapper | null,
  deadCodeNodeName: string,
  ignoreExports: boolean,
  ignoreUnknownReferences = false,
) {
  const statementBlockAnalysis = new StatementBlockAnalysis();
  const analysisMap: Map<Node, DeclarationAnalysis | ExpressionStatementAnalysis> = new Map();
  let annoymousFnSuffix = 0;

  for (let topLevelStatement of topLevelStatements) {
    switch (topLevelStatement.getKind()) {
      case ts.SyntaxKind.FunctionDeclaration:
        const fnDeclaration = topLevelStatement as FunctionDeclaration;
        const fnName = fnDeclaration.getName() ?? '#anonymous#';
        const fnSize = fnDeclaration.getFullWidth();
        const fnNameNode = fnDeclaration.getNameNode() ?? fnDeclaration;
        const fnSourceMapInfo = sourceMapper?.idAtPosition(
          sourceFile.getLineAndColumnAtPos(fnNameNode.getStart()),
        );
        const fnAnalysis = new DeclarationAnalysis(
          fnName,
          'function',
          sourceFile.getLineAndColumnAtPos(fnDeclaration.getStart()),
          fnSize,
          fnSourceMapInfo,
        );
        statementBlockAnalysis.declarations.push(fnAnalysis);
        analysisMap.set(fnDeclaration, fnAnalysis);
        break;

      case ts.SyntaxKind.ClassDeclaration:
        const classDeclaration = topLevelStatement as ClassDeclaration;
        const className = classDeclaration.getName() ?? '#anonymous#';
        const classSize = classDeclaration.getFullWidth();
        const classNameNode = classDeclaration.getNameNode() ?? classDeclaration;
        const classSourceMapInfo = sourceMapper?.idAtPosition(
          sourceFile.getLineAndColumnAtPos(classNameNode.getStart()),
        );
        const classAnalysis = new DeclarationAnalysis(
          className,
          'class',
          sourceFile.getLineAndColumnAtPos(classDeclaration.getStart()),
          classSize,
          classSourceMapInfo,
        );
        statementBlockAnalysis.declarations.push(classAnalysis);
        analysisMap.set(classDeclaration, classAnalysis);
        break;

      case ts.SyntaxKind.VariableStatement:
        const varStatement = topLevelStatement as VariableStatement;
        const varDeclarationList = varStatement.getFirstChildByKindOrThrow(
          ts.SyntaxKind.VariableDeclarationList,
        );
        const varDeclarationKeyword = varDeclarationList.getDeclarationKindKeyword().getText() + 1;

        for (let varDeclaration of varDeclarationList.getDeclarations()) {
          const varName = varDeclaration.getName();
          const varNameNode = getBOWrappedName(varDeclaration) ?? varDeclaration.getNameNode();
          const varSourceMapInfo = sourceMapper?.idAtPosition(
            sourceFile.getLineAndColumnAtPos(varNameNode.getStart()),
          );
          // varSize is computed as selfSize + varDeclarationKeyword length for the first var
          const varSize =
            varDeclaration.getFullWidth() +
            (varDeclaration.getPreviousSibling() === undefined ? varDeclarationKeyword.length : 0);
          const varAnalysis = new DeclarationAnalysis(
            varName,
            'var',
            sourceFile.getLineAndColumnAtPos(varDeclaration.getStart()),
            varSize,
            varSourceMapInfo,
          );
          // TODO: if a var declaration has a side-effecty initializer then we should treat it as an entry point!!!
          //       currently all variable declarations are treated as innert which is not right
          statementBlockAnalysis.declarations.push(varAnalysis);
          analysisMap.set(varDeclaration, varAnalysis);
        }
        break;

      case ts.SyntaxKind.ExpressionStatement:
      case ts.SyntaxKind.EmptyStatement:
      case ts.SyntaxKind.IfStatement:
      case ts.SyntaxKind.SwitchKeyword:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.ForOfStatement:
      case ts.SyntaxKind.TryStatement:
      case ts.SyntaxKind.DoStatement:
      case ts.SyntaxKind.LabeledStatement:
      case ts.SyntaxKind.DebuggerStatement:
      case ts.SyntaxKind.ThrowStatement:
        const expStatement = topLevelStatement as ExpressionStatement;
        const expSize = expStatement.getFullWidth();
        const expSourceMapInfo = sourceMapper?.idAtPosition(
          sourceFile.getLineAndColumnAtPos(expStatement.getStart()),
        );

        // is this a simple fn call?
        const callExpression = expStatement.getFirstChildByKind(ts.SyntaxKind.CallExpression);
        if (callExpression) {
          const fnIdentifier = callExpression.getFirstDescendantByKind(ts.SyntaxKind.Identifier);
          // TODO: wouldn't it be more reliable to source map the identifier to the original name?
          const fnName = fnIdentifier
            ? fnIdentifier.getText()
            : `#anonymousFn${annoymousFnSuffix++}#`;
          if (expSourceMapInfo?.name && !expSourceMapInfo.name.endsWith(')')) {
            // append "()" so that it's clear that it's a fn call
            expSourceMapInfo.name += '()';
          }
          const fnCallAnalysis = new ExpressionStatementAnalysis(
            `${fnName}()`,
            'fn call',
            sourceFile.getLineAndColumnAtPos(callExpression.getStart()),
            expSize,
            expSourceMapInfo,
          );
          statementBlockAnalysis.expressionStatements.push(fnCallAnalysis);
          analysisMap.set(expStatement, fnCallAnalysis);
        } else {
          //is this a simple comma-separated list of fn calls?
          let isSimpleCallExpressionList = true;
          const callExpressions = [] as CallExpression[];

          expStatement.forEachDescendant((descendantNode, traversal) => {
            switch (descendantNode.getKind()) {
              case ts.SyntaxKind.BinaryExpression:
              case ts.SyntaxKind.CommaToken:
              case ts.SyntaxKind.PrefixUnaryExpression: {
                //continue traversal
                // TODO: do we attribute the size for these tokens correctly, I think we don't?
                break;
              }
              case ts.SyntaxKind.CallExpression: {
                callExpressions.push(descendantNode as CallExpression);
                // do not descend any deeper
                // TODO: we should go deeeper and extract function invocations within function arguments
                traversal.skip();
                break;
              }
              default: {
                isSimpleCallExpressionList = false;
                //throw new Error(`unsupported node type: ${descendantNode.getKindName()}`);
              }
            }
          });
          if (isSimpleCallExpressionList) {
            for (let callExpression of callExpressions) {
              const callExpressionSize = callExpression.getFullWidth();
              const callExpSourceMapInfo = sourceMapper?.idAtPosition(
                sourceFile.getLineAndColumnAtPos(callExpression.getStart()),
              );
              if (callExpSourceMapInfo?.name && !callExpSourceMapInfo.name.endsWith(')')) {
                // append "()" so that it's clear that it's a fn call
                callExpSourceMapInfo.name += '()';
              }
              const fnIdentifier = callExpression.getFirstDescendantByKind(
                ts.SyntaxKind.Identifier,
              );
              // TODO: wouldn't it be more reliable to source map the identifier to the original name?
              const fnName = fnIdentifier
                ? fnIdentifier.getText()
                : `#anonymousFn${annoymousFnSuffix++}#`;
              const fnCallAnalysis = new ExpressionStatementAnalysis(
                // TODO: cuts off the method name: console.log('..') becomes console()
                // TODO: this naming convention (as well as for miscExps) could lead to collisions, use .getStart() in the name to disambiguate
                `${fnName}()`,
                'fn call',
                sourceFile.getLineAndColumnAtPos(callExpression.getStart()),
                callExpressionSize,
                callExpSourceMapInfo,
              );
              // TODO: this is not a statement, but oh well, this needs bigger refactoring
              statementBlockAnalysis.expressionStatements.push(fnCallAnalysis);
              analysisMap.set(callExpression, fnCallAnalysis);
            }
          } else {
            // TODO: this this the best way to represent misc expressions? could we break it down more and extract any fn calls?
            const miscExpName = expStatement.getText(false).trim().slice(0, 50);
            const miscExpAnalysis = new ExpressionStatementAnalysis(
              `exp#: ${miscExpName}`,
              'misc expression',
              sourceFile.getLineAndColumnAtPos(expStatement.getStart()),
              expSize,
              expSourceMapInfo,
            );
            statementBlockAnalysis.expressionStatements.push(miscExpAnalysis);
            analysisMap.set(expStatement, miscExpAnalysis);
          }
        }
        break;

      // exports are retainers, so we need to treat them as entry-points/declarations
      case ts.SyntaxKind.ExportDeclaration:
        if (ignoreExports) break;

        const exportDeclaration = topLevelStatement as ExportDeclaration;
        const namedExports = exportDeclaration.getFirstDescendantByKind(ts.SyntaxKind.NamedExports);
        assertIsDefined(
          namedExports,
          'For ExportDeclaration only NamedExports descendants are currently supported, was: ' +
            exportDeclaration.getFirstDescendant()?.getKindName(),
        );
        const exportSpecifiers = namedExports.getElements();

        // +1 is for closing "}"
        const exportDeclarationOverhead =
          exportSpecifiers[0].getPos() - exportDeclaration.getPos() + 1;

        for (let exportSpecifier of exportSpecifiers) {
          const exportSpecifierName = exportSpecifier.getAliasNode()
            ? `export {${exportSpecifier.getName()} as ${exportSpecifier
                .getAliasNode()!
                .getText()}}`
            : `export {${exportSpecifier.getName()}}`;

          // TODO: is it right that we source map back to the alias?
          const exportNameNode = exportSpecifier.getAliasNode() ?? exportSpecifier.getNameNode();
          const exportSpecifierSourceMapInfo = sourceMapper?.idAtPosition(
            sourceFile.getLineAndColumnAtPos(exportNameNode.getStart()),
          );
          if (exportSpecifierSourceMapInfo) {
            exportSpecifierSourceMapInfo.name = 'export ' + exportSpecifierSourceMapInfo.name;
          }

          // exportSpecifierSize is computed as selfSize + exportDeclarationOverhead length for the first export
          const exportSpecifierSize =
            exportSpecifier.getFullWidth() +
            (exportSpecifier.getPreviousSibling() === undefined ? exportDeclarationOverhead : 0);
          const exportSpecifierAnalysis = new ExpressionStatementAnalysis(
            exportSpecifierName,
            'export alias',
            sourceFile.getLineAndColumnAtPos(exportSpecifier.getStart()),
            exportSpecifierSize,
            exportSpecifierSourceMapInfo,
          );
          statementBlockAnalysis.expressionStatements.push(exportSpecifierAnalysis);
          analysisMap.set(exportSpecifier, exportSpecifierAnalysis);
        }
        break;

      case ts.SyntaxKind.ImportDeclaration:
        // ignore imports for now
        break;

      default:
        throw new Error(`unsupported node type: ${topLevelStatement.getKindName()}`);
    }
  }

  analysisMap.forEach((declarationAnalysis, declarationNode) => {
    if (!(declarationAnalysis instanceof DeclarationAnalysis)) {
      // this is an ExpressionStatementAnalysis, skip it
      return;
    }

    if (!Node.isReferenceFindableNode(declarationNode)) {
      throw new Error(
        'Found a declaration that is not a "referenceFindableNode", name: ' +
          declarationAnalysis.name,
      );
    }

    // TODO: debugging...
    //console.log('finding references for: ', declarationAnalysis.name);

    // TODO: skip Console for now because it collides with the global Console
    if (declarationAnalysis.name === 'Console') return;

    // find all deeply-nested retaining nodes
    const retainingNodes = declarationNode.findReferencesAsNodes();

    // now find the parent top level declaration statement for these nodes
    const retainerDeclarations = retainingNodes
      .map((retainingNode) => {
        if (
          retainingNode.getParent()!.getKind() === ts.SyntaxKind.ExportSpecifier &&
          (ignoreExports || retainingNode.getPreviousSibling())
        ) {
          // the retaining node is an export alias e.g. `export {foo as aliasBar}`
          // we only care about the symbol being exported and not its alias
          // but TS considers both as referencing nodes, so we ignore it to prevent duplicates
          return null;
        }

        // traverse up until we find the top level declaration statement
        try {
          return retainingNode.getFirstAncestorOrThrow((ancestor) => analysisMap.has(ancestor));
        } catch (e) {
          if (ignoreUnknownReferences) return null;

          console.error(`Unknown reference found at position: ${retainingNode.getStart()}`);
          throw e;
        }
      })
      // filter out self-references
      .filter(
        (retainingDeclaration): retainingDeclaration is Node<ts.Node> =>
          retainingDeclaration !== null && retainingDeclaration !== declarationNode,
      );

    // for now just convert all retainer declarations to their user friendly names for printing
    const retainerNames = retainerDeclarations.map((retainingDeclaration) => {
      const retainerAnalysis = analysisMap.get(retainingDeclaration)!;
      return retainerAnalysis.name;
    });

    //console.log(declarationAnalysis.name, retainerNames.length);
    if (retainerNames.length === 0) {
      retainerNames.push(deadCodeNodeName);
    }
    //console.log(declarationAnalysis.name, retainerNames);

    declarationAnalysis.retainers = retainerNames;
  });

  return [statementBlockAnalysis, analysisMap] as [StatementBlockAnalysis, typeof analysisMap];
}

export class FileAnalysis {
  public rootNode = new ExpressionStatementAnalysis(
    '#ROOT#',
    'script root',
    { line: 0, column: 0 },
    0,
    {
      name: '#ROOT#',
      source: null,
      namePosition: {
        source: { line: 0, column: 0 },
        transpiled: { line: 0, column: 0 },
      },
      package: null,
    },
  );
  public deadCodeNode = new ExpressionStatementAnalysis(
    '#DEAD#',
    'dead code',
    { line: 0, column: 0 },
    0,
    {
      name: '#DEAD#',
      source: null,
      namePosition: {
        source: { line: 0, column: 0 },
        transpiled: { line: 0, column: 0 },
      },
      package: null,
    },
  );
  public declarations: DeclarationAnalysis[] = [];
  public expressionStatements: ExpressionStatementAnalysis[] = [this.rootNode, this.deadCodeNode];

  constructor(public fileName: string) {}
}

/**
 * Partial analysis used for intermediate results of multiple a statement block.
 *
 * These instances of StatementBlockAnalysis should be stitched together to form FileAnalysis.
 */
export class StatementBlockAnalysis {
  public declarations: DeclarationAnalysis[] = [];
  public expressionStatements: ExpressionStatementAnalysis[] = [];
}

export class DeclarationAnalysis {
  constructor(
    public name: string,
    public type: 'var' | 'class' | 'function',
    public position: { line: number; column: number },
    public selfSize: number,
    public sourceMapInfo?: SourceMapInfo,
    public retainers: string[] = [],
    public dominanceInfo?: DominanceInfo,
  ) {}
}

export class ExpressionStatementAnalysis {
  constructor(
    public name: string,
    public type: 'fn call' | 'misc expression' | 'script root' | 'dead code' | 'export alias',
    public position: { line: number; column: number },
    public selfSize: number,
    public sourceMapInfo?: SourceMapInfo,
    public dominanceInfo?: DominanceInfo,
    public retainers: string[] = ['#ROOT#'],
  ) {}
}

/**
 * workaround for @angular-devkit/build-optimizer not correctly preserving the mapping
 * for wrapped class names wrapped into `let Foo = (()=>{class Foo {}})()`.
 *
 * This fn extracts the NameNode of the nested/wrapped class. This NameNode can then
 * be used to source-map the name to the name in the source code.
 *
 * @returns NameNode if successfully retrieved, undefined if nested class is an anonymous
 * class, and null if this var declaration doesn't match AST shape produced by build-optimizer.
 */
function getBOWrappedName(varDeclaration: VariableDeclaration) {
  const nestedClassDeclaration = varDeclaration
    .getInitializerIfKind(ts.SyntaxKind.CallExpression)
    ?.getExpressionIfKind(ts.SyntaxKind.ParenthesizedExpression)
    ?.getExpressionIfKind(ts.SyntaxKind.ArrowFunction)
    ?.getBody()
    .getDescendantStatements()[0];

  if (nestedClassDeclaration?.getKind() === ts.SyntaxKind.ClassDeclaration) {
    return (nestedClassDeclaration as ClassDeclaration).getNameNode();
  }

  return null;
}
