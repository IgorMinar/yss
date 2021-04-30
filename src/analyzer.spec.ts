const { analyze } = require('./analyzer');
const { fakeSourceMapInfo, FakeSourceMapper } = require('./source-mapper');

describe('analyzer', () => {
  describe('basic parsing and analysis', () => {
    it('should error if fileContents contains a syntax error', () => {
      expect(() => analyze('bundle.js', 'funcTION foo() {}')).toThrowError(/TS1005:/);
    });

    it('should parse a file and return list of top level declarations', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          const hello = 'world';

          function greet() {
            return 3;
          }

          class MyClass {}

          let myLet = function () {};

          var myVar = function () {};
        }),
        true,
      );
      expect(analysis).toMatchObject({
        fileName: 'bundle.js',
        declarations: [
          {
            name: 'hello',
            type: 'var',
            position: { line: 1, column: 7 },
            selfSize: 22,
            retainers: ['#DEAD#'],
          },
          {
            name: 'greet',
            type: 'function',
            position: { line: 3, column: 1 },
            selfSize: 34,
            retainers: ['#DEAD#'],
          },
          {
            name: 'MyClass',
            type: 'class',
            position: { line: 7, column: 1 },
            selfSize: 18,
            retainers: ['#DEAD#'],
          },
          {
            name: 'myLet',
            type: 'var',
            position: { line: 9, column: 5 },
            selfSize: 27,
            retainers: ['#DEAD#'],
          },
          {
            name: 'myVar',
            type: 'var',
            position: { line: 11, column: 5 },
            selfSize: 27,
            retainers: ['#DEAD#'],
          },
        ],
        expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
      });
    });

    it('should parse a file with multiple variables declared in a single VariableDeclarationList', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          const a = 'a',
            b = 'bb',
            c = 'ccc';
        }),
        true,
      );
      expect(analysis).toMatchObject({
        fileName: 'bundle.js',
        declarations: [
          { name: 'a', type: 'var', selfSize: 14, retainers: ['#DEAD#'], sourceMapInfo: undefined },
          { name: 'b', type: 'var', selfSize: 15, retainers: ['#DEAD#'], sourceMapInfo: undefined },
          { name: 'c', type: 'var', selfSize: 16, retainers: ['#DEAD#'], sourceMapInfo: undefined },
        ],
        expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
      });
    });

    it('should parse a file and return list of top level expression statements', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          console.log('hello');

          function myFn() {}

          myFn();
          1 + 2;
          ['a'];
        }),
        true,
      );
      expect(analysis).toMatchObject({
        fileName: 'bundle.js',
        declarations: [
          {
            name: 'myFn',
            type: 'function',
            selfSize: 20,
            retainers: ['myFn()'],
            sourceMapInfo: undefined,
          },
        ],
        expressionStatements: [
          { name: '#ROOT#' },
          { name: '#DEAD#' },
          { name: 'console()', type: 'fn call', selfSize: 21 },
          { name: 'myFn()', type: 'fn call', selfSize: 9 },
          {
            name: 'exp#: 1 + 2;',
            type: 'misc expression',
            selfSize: 7,
          },
          {
            name: "exp#: ['a'];",
            type: 'misc expression',
            selfSize: 7,
          },
        ],
      });
    });

    it('should support nested function invocations (but for now just attribute all nested calls to the top level call)', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          function myFn(cb) {}
          function otherFn() {}

          myFn(otherFn());
        }),
        true,
      );
      expect(analysis).toMatchObject({
        fileName: 'bundle.js',
        declarations: [
          {
            name: 'myFn',
            type: 'function',
            selfSize: 20,
            retainers: ['myFn()'],
            sourceMapInfo: undefined,
          },
          {
            name: 'otherFn',
            type: 'function',
            selfSize: 23,
            retainers: ['myFn()'], // TODO: this should be 'myFn()' once we can extract fn calls in fn arguments
            sourceMapInfo: undefined,
          },
        ],
        expressionStatements: [
          { name: '#ROOT#' },
          { name: '#DEAD#' },
          { name: 'myFn()', type: 'fn call', selfSize: 18 },
        ],
      });
    });

    it('should support IIFEs', () => {
      const analysis = analyze(
        'bundle.js',
        // prettier-ignore
        toString(() => {
          (function iife1() {})();
          (function iife2() {}());
          (function () {})();
          (function () {}());
        }),
        true,
      );
      expect(analysis).toMatchObject({
        declarations: [],
        expressionStatements: [
          { name: '#ROOT#' },
          { name: '#DEAD#' },
          { name: 'iife1()', type: 'fn call', selfSize: 24 },
          { name: 'iife2()', type: 'fn call', selfSize: 26 },
          { name: '#anonymousFn0#()', type: 'fn call', selfSize: 21 },
          { name: '#anonymousFn1#()', type: 'fn call', selfSize: 21 },
        ],
      });
    });

    it('should support function invocations prefixed with unary operators (Terser uses this for before IIFEs)', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          function myFn(cb) {}

          !(function () {})(), myFn();
        }),
        true,
      );
      expect(analysis).toMatchObject({
        declarations: [
          {
            name: 'myFn',
            type: 'function',
            selfSize: 20,
            retainers: ['myFn()'],
            sourceMapInfo: undefined,
          },
        ],
        expressionStatements: [
          { name: '#ROOT#' },
          { name: '#DEAD#' },
          { name: '#anonymousFn0#()', type: 'fn call', selfSize: 16 },
          { name: 'myFn()', type: 'fn call', selfSize: 7 },
        ],
      });
    });

    it('should support comma separated expression statements', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          function myFn() {}
          function otherFn() {}

          myFn(), otherFn(), myFn();
        }),
        true,
      );
      expect(analysis).toMatchObject({
        declarations: [
          {
            name: 'myFn',
            type: 'function',
            selfSize: 18,
            retainers: ['myFn()', 'myFn()'],
            sourceMapInfo: undefined,
          },
          {
            name: 'otherFn',
            type: 'function',
            selfSize: 23,
            retainers: ['otherFn()'],
            sourceMapInfo: undefined,
          },
        ],
        expressionStatements: [
          { name: '#ROOT#' },
          { name: '#DEAD#' },
          { name: 'myFn()', type: 'fn call', selfSize: 8 },
          { name: 'otherFn()', type: 'fn call', selfSize: 10 },
          { name: 'myFn()', type: 'fn call', selfSize: 7 },
        ],
      });
    });

    it('should support ESM export aliases', () => {
      const analysis = analyze(
        'bundle.js',
        [
          'function myFn() {}',
          'function otherFn() {}',
          '',
          'export {myFn as alias1, otherFn as alias2}',
        ].join('\n'),
        true,
        false,
      );
      expect(analysis).toMatchObject({
        declarations: [
          {
            name: 'myFn',
            type: 'function',
            selfSize: 18,
            retainers: ['export {myFn as alias1}'],
          },
          {
            name: 'otherFn',
            type: 'function',
            selfSize: 22,
            retainers: ['export {otherFn as alias2}'],
          },
        ],
        expressionStatements: [
          {
            name: '#ROOT#',
          },
          {
            name: '#DEAD#',
          },
          {
            name: 'export {myFn as alias1}',
            type: 'export alias',
            selfSize: 25,
          },
          {
            name: 'export {otherFn as alias2}',
            type: 'export alias',
            selfSize: 18,
          },
        ],
      });
    });

    it('should find retainer within a function', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          var foo = 3;

          function myFn() {
            return foo;
          }
        }),
        true,
      );
      expect(analysis).toMatchObject({
        declarations: [
          { name: 'foo', type: 'var', selfSize: 12, retainers: ['myFn'] },
          { name: 'myFn', type: 'function', selfSize: 35, retainers: ['#DEAD#'] },
        ],
        expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
      });
    });

    it('should find retainer within a class', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          let foo = 3,
            bar = 4,
            baz = 5;

          class MyClass {
            constructor() {
              foo++;
            }
            myMethod() {
              return bar;
            }
            static statik() {
              return baz;
            }
          }
        }),
        true,
      );
      expect(analysis).toMatchObject({
        declarations: [
          { name: 'foo', type: 'var', selfSize: 12, retainers: ['MyClass'] },
          { name: 'bar', type: 'var', selfSize: 12, retainers: ['MyClass'] },
          { name: 'baz', type: 'var', selfSize: 12, retainers: ['MyClass'] },
          { name: 'MyClass', type: 'class', selfSize: 130, retainers: ['#DEAD#'] },
        ],
        expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
      });
    });

    it('should find retainer within a var declaration', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          var foo = 3;
          const bar = foo + 1;
          let baz = { a: { b: { c: [foo, bar] } } };
        }),
        true,
      );
      expect(analysis).toMatchObject({
        declarations: [
          { name: 'foo', type: 'var', selfSize: 12, retainers: ['bar', 'baz'] },
          { name: 'bar', type: 'var', selfSize: 20, retainers: ['baz'] },
          { name: 'baz', type: 'var', selfSize: 60, retainers: ['#DEAD#'] },
        ],
        expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
      });
    });

    it('should capture duplicate retainers within a single declaration', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          var foo = 3;

          function myFn() {
            return foo + foo;
          }
        }),
        true,
      );
      expect(analysis).toMatchObject({
        declarations: [
          { name: 'foo', type: 'var', selfSize: 12, retainers: ['myFn', 'myFn'] },
          { name: 'myFn', type: 'function', selfSize: 41, retainers: ['#DEAD#'] },
        ],
        expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
      });
    });
  });

  describe('source mapping support', () => {
    it('should create analysis with source mapping info if source mapper is provided', () => {
      const analysis = analyze(
        'bundle.js',
        toString(() => {
          const hello = 'world';

          function greet() {
            return 3;
          }

          class MyClass {}

          let myLet = function () {};

          var myVar = function () {};
        }),
        true,
        true,
        new FakeSourceMapper(),
      );
      expect(analysis).toMatchObject({
        declarations: [
          {
            name: 'hello',
            type: 'var',
            selfSize: 22,
            retainers: ['#DEAD#'],
            sourceMapInfo: fakeSourceMapInfo,
          },
          {
            name: 'greet',
            type: 'function',
            selfSize: 34,
            retainers: ['#DEAD#'],
            sourceMapInfo: fakeSourceMapInfo,
          },
          {
            name: 'MyClass',
            type: 'class',
            selfSize: 18,
            retainers: ['#DEAD#'],
            sourceMapInfo: fakeSourceMapInfo,
          },
          {
            name: 'myLet',
            type: 'var',
            selfSize: 27,
            retainers: ['#DEAD#'],
            sourceMapInfo: fakeSourceMapInfo,
          },
          {
            name: 'myVar',
            type: 'var',
            selfSize: 27,
            retainers: ['#DEAD#'],
            sourceMapInfo: fakeSourceMapInfo,
          },
        ],
        expressionStatements: [{ name: '#ROOT#' }, { name: '#DEAD#' }],
      });
    });
  });
});

function toString(lambda: () => void) {
  //console.log('-----\n' + lambda.toString() + '\n-----');
  const lines = lambda.toString().split('\n').slice(1, -1);
  const indentationWidth = lines[0].replace(/\S.*$/, '').length;
  const unindentedLines = lines.map((line) => line.slice(indentationWidth));
  return unindentedLines.join('\n');
}
