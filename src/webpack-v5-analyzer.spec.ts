import fs from 'fs';
import { Project, SourceFile } from 'ts-morph';
import { FileAnalysis } from './analyzer';
import { analyze } from './webpack-v5-analyzer';

describe('webpack 5 analyzer', () => {
  const webpackSample = fs.readFileSync('./test-data/webpack-v5-sample.js', 'utf-8');

  it('should return null if not a webpack bundle', () => {
    let { sourceFile, fileAnalysis } = initTest('var thisIsNotAWebpackBundle = true;');
    expect(analyze(fileAnalysis, sourceFile)).toBeNull();
  });

  it('should return an analysis for a webpack bundle', () => {
    let { sourceFile, fileAnalysis } = initTest(webpackSample);
    expect(analyze(fileAnalysis, sourceFile)).toMatchObject({
      fileName: 'test-bundle.js',
      declarations: [
        {
          name: '1116#c',
          type: 'var',
          selfSize: 37,
          retainers: ['5366#vn', '4720#i'],
        },
        {
          name: '5366#bn',
          type: 'function',
          selfSize: 81,
        },
        {
          name: '5366#vn',
          type: 'var',
          selfSize: 20,
        },
        {
          name: '4720#i',
          type: 'var',
          selfSize: 161,
        },
        {
          name: '4720#a',
          type: 'var',
          selfSize: 51,
        },
      ],
      expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
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
    },
    useInMemoryFileSystem: true,
  });

  project.createSourceFile(testFileName, fileContents);

  return {
    fileAnalysis: new FileAnalysis(testFileName),
    sourceFile: project.getSourceFile(testFileName)!,
  };
}
