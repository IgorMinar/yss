(self.webpackChunkcli_webpack5 = self.webpackChunkcli_webpack5 || []).push([
  [179],
  {
    255: (t) => {
      // weirdo module from: https://github.com/angular/angular-cli/blob/003854257c43d14a590a3823a2bb25b10303077b/packages/angular_devkit/build_angular/src/webpack/configs/common.ts#L498
      // if a module doesn't use 2nd and 3rd arg then it's most likely just a webpack overhead
      function e(t) {
        return Promise.resolve().then(() => {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        });
      }
      (e.keys = () => []), (e.resolve = e), (e.id = 255), (t.exports = e);
    },
    1116: function (t, e, n) {
      'use strict';
      n.d(e, {
        K0: function () {
          return c;
        },
        OlP: function () {
          return i;
        },
      });
      class i {
        constructor(a, b) {
          this.a = a;
          this.b = b;
        }
      }
      const c = new i('DocumentToken');
    },
    5366: function (
      /**__unused_webpack_module*/ t,
      /*__webpack_exports__*/ e,
      /**__webpack_require__*/ n,
    ) {
      'use strict';
      n.d(e, {
        f3M: function () {
          return vn;
        },
      });
      var s = n(1116);
      function bn(t, e = '.foo') {
        return t.a + e;
      }
      function vn(x) {
        return bn(x) + '.bar';
      }
    },
    4720: function (t, e, n) {
      'use strict';
      n.d(e, {
        vT: () => a, // both arrow function & function expression can occur depending on the minifier used
        Is: function () {
          return i;
        },
      });
      var s = n(5366),
        r = n(1116);
      //TODO: mixture of regular and siddefecty imports: d=(n(6238),n(4689),n(3169))
      //TODO: sideefecty imports: n(6238),n(4689);
      //TODO: dynamic import support: n(8255)(e).then(t=>t[s])
      const i = new r.OlP('cdk-dir-doc', {
          providedIn: 'root',
          factory: function () {
            return (0, s.f3M)(r.K0);
          },
        }),
        a = function (b) {
          !b;
        };
      console.log(i, a(i));
    },
  },
  // this is the bootrap code
  // it says evaluate module with id 4720 when this chunk is loaded and registered
  (t) => {
    'use strict';
    t((t.s = 4720));
  },
]);
