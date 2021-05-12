import fs from 'fs';
import { Project, SourceFile } from 'ts-morph';
import { FileAnalysis } from './analyzer';
import { analyzeWebpack5Chunk } from './webpack-v5-analyzer';

describe('webpack 5 analyzer', () => {
  const webpackSample = fs.readFileSync('./test-data/webpack-v5-sample.js', 'utf-8');

  it('should return null if not a webpack bundle', () => {
    let { sourceFile, fileAnalysis } = initTest('var thisIsNotAWebpackBundle = true;');
    expect(analyzeWebpack5Chunk(fileAnalysis, sourceFile)).toBeNull();
  });

  it('should return an analysis for a webpack bundle', () => {
    let { sourceFile, fileAnalysis } = initTest(webpackSample);
    expect(analyzeWebpack5Chunk(fileAnalysis, sourceFile)).toMatchObject({
      fileName: 'test-bundle.js',
      declarations: [
        {
          name: '1116#i',
          type: 'class',
          selfSize: 106,
          retainers: ['1116#c', '4720#i'],
        },
        {
          name: '1116#c',
          type: 'var',
          selfSize: 33,
          retainers: ['4720#i'],
        },
        {
          name: '5366#bn',
          type: 'function',
          selfSize: 67,
          retainers: ['5366#vn'],
        },
        {
          name: '5366#vn',
          type: 'function',
          selfSize: 62,
          retainers: ['4720#i'],
        },
        {
          name: '4720#i',
          type: 'var',
          selfSize: 161,
          retainers: ['4720#console()', '4720#console()'],
        },
        {
          name: '4720#a',
          type: 'var',
          selfSize: 51,
        },
      ],
      expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }, { name: '4720#console()' }],
    });
  });
});

function initTest(fileContents: string) {
  const testFileName = 'test-bundle.js';
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      outDir: 'dist/',
      skipLibCheck: true,
      lib: ['esnext', 'dom'],
    },
    useInMemoryFileSystem: true,
  });

  project.createSourceFile(testFileName, fileContents);

  return {
    fileAnalysis: new FileAnalysis(testFileName),
    sourceFile: project.getSourceFile(testFileName)!,
  };
}
