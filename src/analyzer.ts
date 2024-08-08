import { Project, SourceFile } from 'ts-morph';
import { SourceMapper } from './source-mapper';
import { analyzeWebpack5Chunk } from './webpack-v5-analyzer';
import { analyzeStatementBlock, FileAnalysis } from './analyzer-shared';

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
