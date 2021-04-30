import { sourceMapperFactory } from './source-mapper';
import fs from 'fs';

describe('SourceMapper', () => {
  it('should map source maps', async () => {
    const sourceMapper = await sourceMapperFactory(JSON.stringify(fooTsSourceMap));
    expect(sourceMapper.idAtPosition({ line: 2, column: 7 })).toEqual({
      source: 'some-package/foo.ts:1:6',
      name: null, // TODO: why null? should have been: 'Foo',
      namePosition: {
        transpiled: { line: 2, column: 7 },
        source: { line: 1, column: 6 },
      },
      package: 'some-package',
    });

    expect(sourceMapper.idAtPosition({ line: 3, column: 9 })).toEqual({
      source: 'some-package/foo.ts:3:9',
      namePosition: {
        transpiled: { line: 3, column: 9 },
        source: { line: 3, column: 9 },
      },
      name: null, // TODO: why null? should have been: 'MyClass',
      package: 'some-package',
    });

    expect(sourceMapper.idAtPosition({ line: 11, column: 4 })).toEqual({
      source: 'some-package/foo.ts:9:4',
      name: null, // TODO: why null? should have been: 'myLet',
      namePosition: {
        transpiled: { line: 11, column: 4 },
        source: { line: 9, column: 4 },
      },
      package: 'some-package',
    });

    expect(sourceMapper.idAtPosition({ line: 12, column: 4 })).toEqual({
      source: 'some-package/foo.ts:11:4',
      name: null, // TODO: why null? should have been: 'myVar',
      namePosition: {
        transpiled: { line: 12, column: 4 },
        source: { line: 11, column: 4 },
      },
      package: 'some-package',
    });
  });
});

var fooTsSourceMap = {
  version: 3,
  file: 'foo.js',
  sourceRoot: 'some-package/',
  sources: ['foo.ts'],
  names: [],
  mappings:
    ';AAAA,IAAM,KAAK,GAAG,OAAO,CAAC;AAEtB,SAAS,KAAK;IACZ,OAAO,CAAC,CAAC;AACX,CAAC;AAED;IAAA;IAAe,CAAC;IAAD,cAAC;AAAD,CAAC,AAAhB,IAAgB;AAEhB,IAAI,KAAK,GAAG,cAAa,CAAC,CAAC;AAE3B,IAAI,KAAK,GAAG,cAAa,CAAC,CAAC',
  sourcesContent: [
    "const hello = 'world';\n\nfunction greet() {\n  return 3;\n}\n\nclass MyClass {}\n\nlet myLet = function () {};\n\nvar myVar = function () {};\n",
  ],
};
