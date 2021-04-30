import { SourceMapConsumer } from 'source-map';

export async function sourceMapperFactory(sourceMap: string) {
  const consumer = await new SourceMapConsumer(sourceMap);
  return new MozillaSourceMapper(consumer);
}

export class MozillaSourceMapper {
  constructor(private sourceMapConsumer: SourceMapConsumer) {}

  idAtPosition(position: { line: number; column: number }): SourceMapInfo {
    const originalPosition = this.sourceMapConsumer.originalPositionFor({
      ...position,
      // TODO: this might work better for js-web-frameworks, but is it right?
      //bias: SourceMapConsumer.LEAST_UPPER_BOUND,
    });

    // TODO: hack to fix broken source maps
    if (
      originalPosition.source?.endsWith('modules/benchmarks/src/js-web-frameworks/ng2/index_aot.ts')
    ) {
      switch (originalPosition.name) {
        case 'platformBrowser': {
          originalPosition.name =
            'platformBrowser().bootstrapModuleFactory(JsWebFrameworksModuleNgFactory).then(init)';
          break;
        }
      }
    }

    if (originalPosition.source?.endsWith('modules/benchmarks/src/js-web-frameworks/ng2/rows.ts')) {
      switch (originalPosition.name) {
        case 'i0.ɵɵtextInterpolate': {
          originalPosition.name = 'JsWebFrameworksComponent';
          break;
        }
        case 'itemById': {
          originalPosition.name = 'JsWebFrameworksModule';
          break;
        }
      }
    }

    if (
      originalPosition.source?.endsWith(
        'modules/benchmarks/src/js-web-frameworks/ng2/rows.ngfactory.ts',
      )
    ) {
      switch (originalPosition.name) {
        case 'JsWebFrameworksModule': {
          originalPosition.name = 'exp#: enableProdMode()';
          break;
        }
      }
    }

    if (originalPosition.source?.endsWith('modules/benchmarks/src/util.ts')) {
      switch (originalPosition.name) {
        case null: {
          originalPosition.name = 'exp#: urlParamsToForm()';
          break;
        }
      }
    }

    return {
      source: `${originalPosition.source}:${originalPosition.line}:${originalPosition.column}`,
      name: originalPosition.name,
      namePosition: {
        source: { line: originalPosition.line, column: originalPosition.column },
        transpiled: { line: position.line, column: position.column },
      },
      package: getPackageName(originalPosition.source),
    };
  }
}

export interface SourceMapper {
  idAtPosition(position: { line: number; column: number }): SourceMapInfo;
}

export interface SourceMapInfo {
  source: string | null;
  name: string | null;
  namePosition: {
    source: { line: number | null; column: number | null };
    transpiled: { line: number; column: number };
  };
  package: string | null;
}

export class FakeSourceMapper {
  idAtPosition(): SourceMapInfo {
    return fakeSourceMapInfo;
  }
}

export const fakeSourceMapInfo = {
  source: './source.ts',
  line: 3,
  column: 23,
  namePosition: {
    source: { line: 3, column: 23 },
    transpiled: { line: 2, column: 3 },
  },
  name: 'SomeName',
  package: '.',
};

function getPackageName(sourcePath: string | null) {
  if (sourcePath === null) return null;

  if (sourcePath[0] === '.') return '.';

  // @angular/foo/src/bar/baz => @angular/foo
  if (sourcePath[0] === '@') return sourcePath.replace(/^(@[^/]+\/[^/]+)\/.*/, '$1');

  // rxjs/foo/src/bar/baz => rxjs
  return sourcePath.replace(/^([^/]+)\/.*/, '$1');
}
