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
      });
      const c = new s.OlP('DocumentToken');
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
      function bn(t, e = A.Default) {
        return (F || yn)(p(t), e);
      }
      const vn = bn(s.K0);
    },
    4720: function (t, e, n) {
      'use strict';
      n.d(e, {
        vT: () => a, // both arrow function & function can occur depending on minifier
        Is: function () {
          return o;
        },
      });
      var s = n(5366),
        r = n(1116);
      const i = new s.OlP('cdk-dir-doc', {
        providedIn: 'root',
        factory: function () {
          return (0, s.f3M)(r.K0);
        },
      });
    },
  },
  (t) => {
    'use strict';
    t((t.s = 126));
  },
]);
