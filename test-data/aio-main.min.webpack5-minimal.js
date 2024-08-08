(self.webpackChunkangular_io = self.webpackChunkangular_io || []).push([
  ['main'],
  {
    8255: function (t) {
      function e(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        });
      }
      (e.keys = function () {
        return [];
      }),
        (e.resolve = e),
        (e.id = 8255),
        (t.exports = e);
    },
    810: function (t, e, n) {
      'use strict';
      n.d(e, {
        e: function () {
          return c;
        },
      });
      class i {
        constructor(t) {
          this.durationSelector = t;
        }
        call(t, e) {
          return e.subscribe(new o(t, this.durationSelector));
        }
      }
      class o {
        constructor(t, e) {
          super(t), (this.durationSelector = e), (this.hasValue = !1);
        }
        _next(t) {
          if (((this.value = t), (this.hasValue = !0), !this.throttled)) {
            let n;
            try {
              const { durationSelector: e } = this;
              n = e(t);
            } catch (e) {
              return this.destination.error(e);
            }
            !s || s.closed ? this.clearThrottle() : this.add((this.throttled = s));
          }
        }
        clearThrottle() {
          const { value: t, hasValue: e, throttled: n } = this;
          n && (this.remove(n), (this.throttled = void 0), n.unsubscribe()),
            e && ((this.value = void 0), (this.hasValue = !1), this.destination.next(t));
        }
        notifyNext() {
          this.clearThrottle();
        }
        notifyComplete() {
          this.clearThrottle();
        }
      }
      //var a = n(1110);
      function c(t, e) {
        return (
          (n = () => (0, e)(t, e)),
          function (t) {
            return t.lift(new i(n));
          }
        );
        var n;
      }
    },
    1262: function (t, e, n) {
      'use strict';
      n.d(e, {
        f_: function () {
          return p;
        },
      });
      var a = n(810);

      let p = (() => {
        class t {
          constructor(t, e) {
            (this.doc = t),
              (this.scrollService = e),
              (this.spiedElementGroups = []),
              (this.resizeEvents = (0, p)(window, 'resize').pipe((0, a.e)(300))),
              (this.scrollEvents = (0, p)(window, 'scroll').pipe((0, a.e)(10)));
          }
        }
      })();
      new p();
    },
  },
  function (t) {
    'use strict';
    t((t.s = 1262));
  },
]);
//# sourceMappingURL=main-es2015.38e4e7656f7370692582.js.map
