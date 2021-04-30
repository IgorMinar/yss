(self.webpackChunkangular_io = self.webpackChunkangular_io || []).push([
  ['main'],
  {
    8255: function (/**__unused_webpack_module*/ t) {
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
    9713: function (
      /**__unused_webpack_module*/ t,
      /*__webpack_exports__*/ e,
      /**__webpack_require__*/ n,
    ) {
      'use strict';
      n.d(e, {
        l3: function () {
          return i;
        },
        _j: function () {
          return s;
        },
        LC: function () {
          return r;
        },
        ZN: function () {
          return f;
        },
        jt: function () {
          return a;
        },
        vP: function () {
          return c;
        },
        SB: function () {
          return u;
        },
        oB: function () {
          return l;
        },
        eR: function () {
          return h;
        },
        X$: function () {
          return o;
        },
        ZE: function () {
          return p;
        },
        k1: function () {
          return m;
        },
      });
      class s {}
      class r {}
      const i = '*';
      function o(t, e) {
        return { type: 7, name: t, definitions: e, options: {} };
      }
      function a(t, e = null) {
        return { type: 4, styles: e, timings: t };
      }
      function c(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function l(t) {
        return { type: 6, styles: t, offset: null };
      }
      function u(t, e, n) {
        return { type: 0, name: t, styles: e, options: n };
      }
      function h(t, e, n = null) {
        return { type: 1, expr: t, animation: e, options: n };
      }
      function d(t) {
        Promise.resolve(null).then(t);
      }
      class f {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0), this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []));
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()), (this._started = !0);
        }
        triggerMicrotask() {
          d(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {}
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class p {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            n = 0,
            s = 0;
          const r = this.players.length;
          0 == r
            ? d(() => this._onFinish())
            : this.players.forEach((t) => {
                t.onDone(() => {
                  ++e == r && this._onFinish();
                }),
                  t.onDestroy(() => {
                    ++n == r && this._onDestroy();
                  }),
                  t.onStart(() => {
                    ++s == r && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce((t, e) => Math.max(t, e.totalTime), 0));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0), this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0), this._onStartFns.forEach((t) => t()), (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(), this._onStart(), this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((t) => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (t, e) => (null === t || e.totalTime > t.totalTime ? e : t),
            null,
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      const m = '!';
    },
    7388: function (t, e, n) {
      'use strict';
      n.d(e, {
        rt: function () {
          return L;
        },
        kH: function () {
          return O;
        },
        Em: function () {
          return _;
        },
        tE: function () {
          return F;
        },
        qV: function () {
          return S;
        },
        qm: function () {
          return R;
        },
        Kd: function () {
          return C;
        },
        X6: function () {
          return T;
        },
        yG: function () {
          return k;
        },
      });
      var s = n(1116),
        r = n(5366),
        i = n(5959),
        o = n(7570),
        a = n(878),
        c = n(9235),
        l = n(4019),
        u = n(7701),
        h = n(3835),
        d = n(9996),
        f = n(611),
        p = n(9861),
        m = n(3169),
        g = n(7853);
      class _ extends class {
        constructor(t) {
          (this._items = t),
            (this._activeItemIndex = -1),
            (this._activeItem = null),
            (this._wrap = !1),
            (this._letterKeyStream = new i.xQ()),
            (this._typeaheadSubscription = o.w.EMPTY),
            (this._vertical = !0),
            (this._allowedModifierKeys = []),
            (this._homeAndEnd = !1),
            (this._skipPredicateFn = (t) => t.disabled),
            (this._pressedLetters = []),
            (this.tabOut = new i.xQ()),
            (this.change = new i.xQ()),
            t instanceof r.n_E &&
              t.changes.subscribe((t) => {
                if (this._activeItem) {
                  const e = t.toArray().indexOf(this._activeItem);
                  e > -1 && e !== this._activeItemIndex && (this._activeItemIndex = e);
                }
              });
        }
        skipPredicate(t) {
          return (this._skipPredicateFn = t), this;
        }
        withWrap(t = !0) {
          return (this._wrap = t), this;
        }
        withVerticalOrientation(t = !0) {
          return (this._vertical = t), this;
        }
        withHorizontalOrientation(t) {
          return (this._horizontal = t), this;
        }
        withAllowedModifierKeys(t) {
          return (this._allowedModifierKeys = t), this;
        }
        withTypeAhead(t = 200) {
          return (
            this._typeaheadSubscription.unsubscribe(),
            (this._typeaheadSubscription = this._letterKeyStream
              .pipe(
                (0, l.b)((t) => this._pressedLetters.push(t)),
                (0, u.b)(t),
                (0, h.h)(() => this._pressedLetters.length > 0),
                (0, d.U)(() => this._pressedLetters.join('')),
              )
              .subscribe((t) => {
                const e = this._getItemsArray();
                for (let n = 1; n < e.length + 1; n++) {
                  const s = (this._activeItemIndex + n) % e.length,
                    r = e[s];
                  if (
                    !this._skipPredicateFn(r) &&
                    0 === r.getLabel().toUpperCase().trim().indexOf(t)
                  ) {
                    this.setActiveItem(s);
                    break;
                  }
                }
                this._pressedLetters = [];
              })),
            this
          );
        }
        withHomeAndEnd(t = !0) {
          return (this._homeAndEnd = t), this;
        }
        setActiveItem(t) {
          const e = this._activeItem;
          this.updateActiveItem(t),
            this._activeItem !== e && this.change.next(this._activeItemIndex);
        }
        onKeydown(t) {
          const e = t.keyCode,
            n = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].every(
              (e) => !t[e] || this._allowedModifierKeys.indexOf(e) > -1,
            );
          switch (e) {
            case c.Mf:
              return void this.tabOut.next();
            case c.JH:
              if (this._vertical && n) {
                this.setNextItemActive();
                break;
              }
              return;
            case c.LH:
              if (this._vertical && n) {
                this.setPreviousItemActive();
                break;
              }
              return;
            case c.SV:
              if (this._horizontal && n) {
                'rtl' === this._horizontal
                  ? this.setPreviousItemActive()
                  : this.setNextItemActive();
                break;
              }
              return;
            case c.oh:
              if (this._horizontal && n) {
                'rtl' === this._horizontal
                  ? this.setNextItemActive()
                  : this.setPreviousItemActive();
                break;
              }
              return;
            case c.Sd:
              if (this._homeAndEnd && n) {
                this.setFirstItemActive();
                break;
              }
              return;
            case c.uR:
              if (this._homeAndEnd && n) {
                this.setLastItemActive();
                break;
              }
              return;
            default:
              return void (
                (n || (0, c.Vb)(t, 'shiftKey')) &&
                (t.key && 1 === t.key.length
                  ? this._letterKeyStream.next(t.key.toLocaleUpperCase())
                  : ((e >= c.A && e <= c.Z) || (e >= c.xE && e <= c.aO)) &&
                    this._letterKeyStream.next(String.fromCharCode(e)))
              );
          }
          (this._pressedLetters = []), t.preventDefault();
        }
        get activeItemIndex() {
          return this._activeItemIndex;
        }
        get activeItem() {
          return this._activeItem;
        }
        isTyping() {
          return this._pressedLetters.length > 0;
        }
        setFirstItemActive() {
          this._setActiveItemByIndex(0, 1);
        }
        setLastItemActive() {
          this._setActiveItemByIndex(this._items.length - 1, -1);
        }
        setNextItemActive() {
          this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
        }
        setPreviousItemActive() {
          this._activeItemIndex < 0 && this._wrap
            ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
        }
        updateActiveItem(t) {
          const e = this._getItemsArray(),
            n = 'number' == typeof t ? t : e.indexOf(t),
            s = e[n];
          (this._activeItem = null == s ? null : s), (this._activeItemIndex = n);
        }
        _setActiveItemByDelta(t) {
          this._wrap ? this._setActiveInWrapMode(t) : this._setActiveInDefaultMode(t);
        }
        _setActiveInWrapMode(t) {
          const e = this._getItemsArray();
          for (let n = 1; n <= e.length; n++) {
            const s = (this._activeItemIndex + t * n + e.length) % e.length;
            if (!this._skipPredicateFn(e[s])) return void this.setActiveItem(s);
          }
        }
        _setActiveInDefaultMode(t) {
          this._setActiveItemByIndex(this._activeItemIndex + t, t);
        }
        _setActiveItemByIndex(t, e) {
          const n = this._getItemsArray();
          if (n[t]) {
            for (; this._skipPredicateFn(n[t]); ) if (!n[(t += e)]) return;
            this.setActiveItem(t);
          }
        }
        _getItemsArray() {
          return this._items instanceof r.n_E ? this._items.toArray() : this._items;
        }
      } {
        constructor() {
          super(...arguments), (this._origin = 'program');
        }
        setFocusOrigin(t) {
          return (this._origin = t), this;
        }
        setActiveItem(t) {
          super.setActiveItem(t), this.activeItem && this.activeItem.focus(this._origin);
        }
      }
      let y = (() => {
        class t {
          constructor(t) {
            this._platform = t;
          }
          isDisabled(t) {
            return t.hasAttribute('disabled');
          }
          isVisible(t) {
            return (
              (function (t) {
                return !!(
                  t.offsetWidth ||
                  t.offsetHeight ||
                  ('function' == typeof t.getClientRects && t.getClientRects().length)
                );
              })(t) && 'visible' === getComputedStyle(t).visibility
            );
          }
          isTabbable(t) {
            if (!this._platform.isBrowser) return !1;
            const e = (function (t) {
              try {
                return t.frameElement;
              } catch (e) {
                return null;
              }
            })(((n = t).ownerDocument && n.ownerDocument.defaultView) || window);
            var n;
            if (e) {
              if (-1 === v(e)) return !1;
              if (!this.isVisible(e)) return !1;
            }
            let s = t.nodeName.toLowerCase(),
              r = v(t);
            return t.hasAttribute('contenteditable')
              ? -1 !== r
              : 'iframe' !== s &&
                  'object' !== s &&
                  !(
                    this._platform.WEBKIT &&
                    this._platform.IOS &&
                    !(function (t) {
                      let e = t.nodeName.toLowerCase(),
                        n = 'input' === e && t.type;
                      return 'text' === n || 'password' === n || 'select' === e || 'textarea' === e;
                    })(t)
                  ) &&
                  ('audio' === s
                    ? !!t.hasAttribute('controls') && -1 !== r
                    : 'video' === s
                    ? -1 !== r &&
                      (null !== r || this._platform.FIREFOX || t.hasAttribute('controls'))
                    : t.tabIndex >= 0);
          }
          isFocusable(t, e) {
            return (
              (function (t) {
                return (
                  !(function (t) {
                    return (
                      (function (t) {
                        return 'input' == t.nodeName.toLowerCase();
                      })(t) && 'hidden' == t.type
                    );
                  })(t) &&
                  ((function (t) {
                    let e = t.nodeName.toLowerCase();
                    return 'input' === e || 'select' === e || 'button' === e || 'textarea' === e;
                  })(t) ||
                    (function (t) {
                      return (
                        (function (t) {
                          return 'a' == t.nodeName.toLowerCase();
                        })(t) && t.hasAttribute('href')
                      );
                    })(t) ||
                    t.hasAttribute('contenteditable') ||
                    b(t))
                );
              })(t) &&
              !this.isDisabled(t) &&
              ((null == e ? void 0 : e.ignoreVisibility) || this.isVisible(t))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(m.t4));
          }),
          (t.ɵprov = r.Yz7({
            factory: function () {
              return new t(r.LFG(m.t4));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      function b(t) {
        if (!t.hasAttribute('tabindex') || void 0 === t.tabIndex) return !1;
        let e = t.getAttribute('tabindex');
        return '-32768' != e && !(!e || isNaN(parseInt(e, 10)));
      }
      function v(t) {
        if (!b(t)) return null;
        const e = parseInt(t.getAttribute('tabindex') || '', 10);
        return isNaN(e) ? -1 : e;
      }
      class w {
        constructor(t, e, n, s, r = !1) {
          (this._element = t),
            (this._checker = e),
            (this._ngZone = n),
            (this._document = s),
            (this._hasAttached = !1),
            (this.startAnchorListener = () => this.focusLastTabbableElement()),
            (this.endAnchorListener = () => this.focusFirstTabbableElement()),
            (this._enabled = !0),
            r || this.attachAnchors();
        }
        get enabled() {
          return this._enabled;
        }
        set enabled(t) {
          (this._enabled = t),
            this._startAnchor &&
              this._endAnchor &&
              (this._toggleAnchorTabIndex(t, this._startAnchor),
              this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        destroy() {
          const t = this._startAnchor,
            e = this._endAnchor;
          t &&
            (t.removeEventListener('focus', this.startAnchorListener),
            t.parentNode && t.parentNode.removeChild(t)),
            e &&
              (e.removeEventListener('focus', this.endAnchorListener),
              e.parentNode && e.parentNode.removeChild(e)),
            (this._startAnchor = this._endAnchor = null),
            (this._hasAttached = !1);
        }
        attachAnchors() {
          return (
            !!this._hasAttached ||
            (this._ngZone.runOutsideAngular(() => {
              this._startAnchor ||
                ((this._startAnchor = this._createAnchor()),
                this._startAnchor.addEventListener('focus', this.startAnchorListener)),
                this._endAnchor ||
                  ((this._endAnchor = this._createAnchor()),
                  this._endAnchor.addEventListener('focus', this.endAnchorListener));
            }),
            this._element.parentNode &&
              (this._element.parentNode.insertBefore(this._startAnchor, this._element),
              this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling),
              (this._hasAttached = !0)),
            this._hasAttached)
          );
        }
        focusInitialElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusInitialElement(t)));
          });
        }
        focusFirstTabbableElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusFirstTabbableElement(t)));
          });
        }
        focusLastTabbableElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusLastTabbableElement(t)));
          });
        }
        _getRegionBoundary(t) {
          let e = this._element.querySelectorAll(
            `[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`,
          );
          for (let n = 0; n < e.length; n++)
            e[n].hasAttribute(`cdk-focus-${t}`)
              ? console.warn(
                  `Found use of deprecated attribute 'cdk-focus-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,
                  e[n],
                )
              : e[n].hasAttribute(`cdk-focus-region-${t}`) &&
                console.warn(
                  `Found use of deprecated attribute 'cdk-focus-region-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,
                  e[n],
                );
          return 'start' == t
            ? e.length
              ? e[0]
              : this._getFirstTabbableElement(this._element)
            : e.length
            ? e[e.length - 1]
            : this._getLastTabbableElement(this._element);
        }
        focusInitialElement(t) {
          const e = this._element.querySelector('[cdk-focus-initial], [cdkFocusInitial]');
          if (e) {
            if (
              (e.hasAttribute('cdk-focus-initial') &&
                console.warn(
                  "Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0",
                  e,
                ),
              !this._checker.isFocusable(e))
            ) {
              const n = this._getFirstTabbableElement(e);
              return null == n || n.focus(t), !!n;
            }
            return e.focus(t), !0;
          }
          return this.focusFirstTabbableElement(t);
        }
        focusFirstTabbableElement(t) {
          const e = this._getRegionBoundary('start');
          return e && e.focus(t), !!e;
        }
        focusLastTabbableElement(t) {
          const e = this._getRegionBoundary('end');
          return e && e.focus(t), !!e;
        }
        hasAttached() {
          return this._hasAttached;
        }
        _getFirstTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t)) return t;
          let e = t.children || t.childNodes;
          for (let n = 0; n < e.length; n++) {
            let t =
              e[n].nodeType === this._document.ELEMENT_NODE
                ? this._getFirstTabbableElement(e[n])
                : null;
            if (t) return t;
          }
          return null;
        }
        _getLastTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t)) return t;
          let e = t.children || t.childNodes;
          for (let n = e.length - 1; n >= 0; n--) {
            let t =
              e[n].nodeType === this._document.ELEMENT_NODE
                ? this._getLastTabbableElement(e[n])
                : null;
            if (t) return t;
          }
          return null;
        }
        _createAnchor() {
          const t = this._document.createElement('div');
          return (
            this._toggleAnchorTabIndex(this._enabled, t),
            t.classList.add('cdk-visually-hidden'),
            t.classList.add('cdk-focus-trap-anchor'),
            t.setAttribute('aria-hidden', 'true'),
            t
          );
        }
        _toggleAnchorTabIndex(t, e) {
          t ? e.setAttribute('tabindex', '0') : e.removeAttribute('tabindex');
        }
        toggleAnchors(t) {
          this._startAnchor &&
            this._endAnchor &&
            (this._toggleAnchorTabIndex(t, this._startAnchor),
            this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        _executeOnStable(t) {
          this._ngZone.isStable ? t() : this._ngZone.onStable.pipe((0, f.q)(1)).subscribe(t);
        }
      }
      let S = (() => {
        class t {
          constructor(t, e, n) {
            (this._checker = t), (this._ngZone = e), (this._document = n);
          }
          create(t, e = !1) {
            return new w(t, this._checker, this._ngZone, this._document, e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(y), r.LFG(r.R0b), r.LFG(s.K0));
          }),
          (t.ɵprov = r.Yz7({
            factory: function () {
              return new t(r.LFG(y), r.LFG(r.R0b), r.LFG(s.K0));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      'undefined' != typeof Element && Element;
      const E = new r.OlP('liveAnnouncerElement', {
          providedIn: 'root',
          factory: function () {
            return null;
          },
        }),
        x = new r.OlP('LIVE_ANNOUNCER_DEFAULT_OPTIONS');
      let C = (() => {
        class t {
          constructor(t, e, n, s) {
            (this._ngZone = e),
              (this._defaultOptions = s),
              (this._document = n),
              (this._liveElement = t || this._createLiveElement());
          }
          announce(t, ...e) {
            const n = this._defaultOptions;
            let s, r;
            return (
              1 === e.length && 'number' == typeof e[0] ? (r = e[0]) : ([s, r] = e),
              this.clear(),
              clearTimeout(this._previousTimeout),
              s || (s = n && n.politeness ? n.politeness : 'polite'),
              null == r && n && (r = n.duration),
              this._liveElement.setAttribute('aria-live', s),
              this._ngZone.runOutsideAngular(
                () =>
                  new Promise((e) => {
                    clearTimeout(this._previousTimeout),
                      (this._previousTimeout = setTimeout(() => {
                        (this._liveElement.textContent = t),
                          e(),
                          'number' == typeof r &&
                            (this._previousTimeout = setTimeout(() => this.clear(), r));
                      }, 100));
                  }),
              )
            );
          }
          clear() {
            this._liveElement && (this._liveElement.textContent = '');
          }
          ngOnDestroy() {
            clearTimeout(this._previousTimeout),
              this._liveElement &&
                this._liveElement.parentNode &&
                (this._liveElement.parentNode.removeChild(this._liveElement),
                (this._liveElement = null));
          }
          _createLiveElement() {
            const t = this._document.getElementsByClassName('cdk-live-announcer-element'),
              e = this._document.createElement('div');
            for (let n = 0; n < t.length; n++) t[n].parentNode.removeChild(t[n]);
            return (
              e.classList.add('cdk-live-announcer-element'),
              e.classList.add('cdk-visually-hidden'),
              e.setAttribute('aria-atomic', 'true'),
              e.setAttribute('aria-live', 'polite'),
              this._document.body.appendChild(e),
              e
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(E, 8), r.LFG(r.R0b), r.LFG(s.K0), r.LFG(x, 8));
          }),
          (t.ɵprov = r.Yz7({
            factory: function () {
              return new t(r.LFG(E, 8), r.LFG(r.R0b), r.LFG(s.K0), r.LFG(x, 8));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      function T(t) {
        return 0 === t.buttons;
      }
      function k(t) {
        const e = (t.touches && t.touches[0]) || (t.changedTouches && t.changedTouches[0]);
        return !(
          !e ||
          -1 !== e.identifier ||
          (null != e.radiusX && 1 !== e.radiusX) ||
          (null != e.radiusY && 1 !== e.radiusY)
        );
      }
      const I = new r.OlP('cdk-focus-monitor-default-options'),
        A = (0, m.i$)({ passive: !0, capture: !0 });
      let F = (() => {
        class t {
          constructor(t, e, n, s) {
            (this._ngZone = t),
              (this._platform = e),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._documentKeydownListener = () => {
                (this._lastTouchTarget = null), this._setOriginForCurrentEventQueue('keyboard');
              }),
              (this._documentMousedownListener = (t) => {
                if (!this._lastTouchTarget) {
                  const e = T(t) ? 'keyboard' : 'mouse';
                  this._setOriginForCurrentEventQueue(e);
                }
              }),
              (this._documentTouchstartListener = (t) => {
                k(t)
                  ? this._lastTouchTarget || this._setOriginForCurrentEventQueue('keyboard')
                  : (null != this._touchTimeoutId && clearTimeout(this._touchTimeoutId),
                    (this._lastTouchTarget = N(t)),
                    (this._touchTimeoutId = setTimeout(() => (this._lastTouchTarget = null), 650)));
              }),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = setTimeout(() => (this._windowFocused = !1)));
              }),
              (this._rootNodeFocusAndBlurListener = (t) => {
                const e = N(t),
                  n = 'focus' === t.type ? this._onFocus : this._onBlur;
                for (let s = e; s; s = s.parentElement) n.call(this, t, s);
              }),
              (this._document = n),
              (this._detectionMode = (null == s ? void 0 : s.detectionMode) || 0);
          }
          monitor(t, e = !1) {
            const n = (0, p.fI)(t);
            if (!this._platform.isBrowser || 1 !== n.nodeType) return (0, a.of)(null);
            const s = (0, m.kV)(n) || this._getDocument(),
              r = this._elementInfo.get(n);
            if (r) return e && (r.checkChildren = !0), r.subject;
            const o = { checkChildren: e, subject: new i.xQ(), rootNode: s };
            return this._elementInfo.set(n, o), this._registerGlobalListeners(o), o.subject;
          }
          stopMonitoring(t) {
            const e = (0, p.fI)(t),
              n = this._elementInfo.get(e);
            n &&
              (n.subject.complete(),
              this._setClasses(e),
              this._elementInfo.delete(e),
              this._removeGlobalListeners(n));
          }
          focusVia(t, e, n) {
            const s = (0, p.fI)(t);
            s === this._getDocument().activeElement
              ? this._getClosestElementsInfo(s).forEach(([t, n]) => this._originChanged(t, e, n))
              : (this._setOriginForCurrentEventQueue(e),
                'function' == typeof s.focus && s.focus(n));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _toggleClass(t, e, n) {
            n ? t.classList.add(e) : t.classList.remove(e);
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : this._wasCausedByTouch(t)
              ? 'touch'
              : 'program';
          }
          _setClasses(t, e) {
            this._toggleClass(t, 'cdk-focused', !!e),
              this._toggleClass(t, 'cdk-touch-focused', 'touch' === e),
              this._toggleClass(t, 'cdk-keyboard-focused', 'keyboard' === e),
              this._toggleClass(t, 'cdk-mouse-focused', 'mouse' === e),
              this._toggleClass(t, 'cdk-program-focused', 'program' === e);
          }
          _setOriginForCurrentEventQueue(t) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                0 === this._detectionMode &&
                  (this._originTimeoutId = setTimeout(() => (this._origin = null), 1));
            });
          }
          _wasCausedByTouch(t) {
            const e = N(t);
            return (
              this._lastTouchTarget instanceof Node &&
              e instanceof Node &&
              (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
            );
          }
          _onFocus(t, e) {
            const n = this._elementInfo.get(e);
            n &&
              (n.checkChildren || e === N(t)) &&
              this._originChanged(e, this._getFocusOrigin(t), n);
          }
          _onBlur(t, e) {
            const n = this._elementInfo.get(e);
            !n ||
              (n.checkChildren && t.relatedTarget instanceof Node && e.contains(t.relatedTarget)) ||
              (this._setClasses(e), this._emitOrigin(n.subject, null));
          }
          _emitOrigin(t, e) {
            this._ngZone.run(() => t.next(e));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const e = t.rootNode,
              n = this._rootNodeFocusListenerCount.get(e) || 0;
            n ||
              this._ngZone.runOutsideAngular(() => {
                e.addEventListener('focus', this._rootNodeFocusAndBlurListener, A),
                  e.addEventListener('blur', this._rootNodeFocusAndBlurListener, A);
              }),
              this._rootNodeFocusListenerCount.set(e, n + 1),
              1 == ++this._monitoredElementCount &&
                this._ngZone.runOutsideAngular(() => {
                  const t = this._getDocument(),
                    e = this._getWindow();
                  t.addEventListener('keydown', this._documentKeydownListener, A),
                    t.addEventListener('mousedown', this._documentMousedownListener, A),
                    t.addEventListener('touchstart', this._documentTouchstartListener, A),
                    e.addEventListener('focus', this._windowFocusListener);
                });
          }
          _removeGlobalListeners(t) {
            const e = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(e)) {
              const t = this._rootNodeFocusListenerCount.get(e);
              t > 1
                ? this._rootNodeFocusListenerCount.set(e, t - 1)
                : (e.removeEventListener('focus', this._rootNodeFocusAndBlurListener, A),
                  e.removeEventListener('blur', this._rootNodeFocusAndBlurListener, A),
                  this._rootNodeFocusListenerCount.delete(e));
            }
            if (!--this._monitoredElementCount) {
              const t = this._getDocument(),
                e = this._getWindow();
              t.removeEventListener('keydown', this._documentKeydownListener, A),
                t.removeEventListener('mousedown', this._documentMousedownListener, A),
                t.removeEventListener('touchstart', this._documentTouchstartListener, A),
                e.removeEventListener('focus', this._windowFocusListener),
                clearTimeout(this._windowFocusTimeoutId),
                clearTimeout(this._touchTimeoutId),
                clearTimeout(this._originTimeoutId);
            }
          }
          _originChanged(t, e, n) {
            this._setClasses(t, e), this._emitOrigin(n.subject, e), (this._lastFocusOrigin = e);
          }
          _getClosestElementsInfo(t) {
            const e = [];
            return (
              this._elementInfo.forEach((n, s) => {
                (s === t || (n.checkChildren && s.contains(t))) && e.push([s, n]);
              }),
              e
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(r.R0b), r.LFG(m.t4), r.LFG(s.K0, 8), r.LFG(I, 8));
          }),
          (t.ɵprov = r.Yz7({
            factory: function () {
              return new t(r.LFG(r.R0b), r.LFG(m.t4), r.LFG(s.K0, 8), r.LFG(I, 8));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      function N(t) {
        return t.composedPath ? t.composedPath()[0] : t.target;
      }
      let O = (() => {
          class t {
            constructor(t, e) {
              (this._elementRef = t), (this._focusMonitor = e), (this.cdkFocusChange = new r.vpe());
            }
            ngAfterViewInit() {
              const t = this._elementRef.nativeElement;
              this._monitorSubscription = this._focusMonitor
                .monitor(t, 1 === t.nodeType && t.hasAttribute('cdkMonitorSubtreeFocus'))
                .subscribe((t) => this.cdkFocusChange.emit(t));
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef),
                this._monitorSubscription && this._monitorSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Y36(r.SBq), r.Y36(F));
            }),
            (t.ɵdir = r.lG2({
              type: t,
              selectors: [
                ['', 'cdkMonitorElementFocus', ''],
                ['', 'cdkMonitorSubtreeFocus', ''],
              ],
              outputs: { cdkFocusChange: 'cdkFocusChange' },
            })),
            t
          );
        })(),
        R = (() => {
          class t {
            constructor(t, e) {
              (this._platform = t), (this._document = e);
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const t = this._document.createElement('div');
              (t.style.backgroundColor = 'rgb(1,2,3)'),
                (t.style.position = 'absolute'),
                this._document.body.appendChild(t);
              const e = this._document.defaultView || window,
                n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
                s = ((n && n.backgroundColor) || '').replace(/ /g, '');
              switch ((this._document.body.removeChild(t), s)) {
                case 'rgb(0,0,0)':
                  return 2;
                case 'rgb(255,255,255)':
                  return 1;
              }
              return 0;
            }
            _applyBodyHighContrastModeCssClasses() {
              if (this._platform.isBrowser && this._document.body) {
                const t = this._document.body.classList;
                t.remove('cdk-high-contrast-active'),
                  t.remove('cdk-high-contrast-black-on-white'),
                  t.remove('cdk-high-contrast-white-on-black');
                const e = this.getHighContrastMode();
                1 === e
                  ? (t.add('cdk-high-contrast-active'), t.add('cdk-high-contrast-black-on-white'))
                  : 2 === e &&
                    (t.add('cdk-high-contrast-active'), t.add('cdk-high-contrast-white-on-black'));
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(m.t4), r.LFG(s.K0));
            }),
            (t.ɵprov = r.Yz7({
              factory: function () {
                return new t(r.LFG(m.t4), r.LFG(s.K0));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        L = (() => {
          class t {
            constructor(t) {
              t._applyBodyHighContrastModeCssClasses();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(R));
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({ imports: [[m.ud, g.Q8]] })),
            t
          );
        })();
    },
    4720: function (t, e, n) {
      'use strict';
      n.d(e, {
        vT: function () {
          return a;
        },
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
      let o = (() => {
          class t {
            constructor(t) {
              if (((this.value = 'ltr'), (this.change = new s.vpe()), t)) {
                const e = t.documentElement ? t.documentElement.dir : null,
                  n = (t.body ? t.body.dir : null) || e;
                this.value = 'ltr' === n || 'rtl' === n ? n : 'ltr';
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.LFG(i, 8));
            }),
            (t.ɵprov = s.Yz7({
              factory: function () {
                return new t(s.LFG(i, 8));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        a = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = s.oAB({ type: t })),
            (t.ɵinj = s.cJS({})),
            t
          );
        })();
    },
    9235: function (t, e, n) {
      'use strict';
      n.d(e, {
        A: function () {
          return m;
        },
        JH: function () {
          return d;
        },
        uR: function () {
          return a;
        },
        K5: function () {
          return r;
        },
        hY: function () {
          return i;
        },
        Sd: function () {
          return c;
        },
        oh: function () {
          return l;
        },
        aO: function () {
          return p;
        },
        SV: function () {
          return h;
        },
        L_: function () {
          return o;
        },
        Mf: function () {
          return s;
        },
        LH: function () {
          return u;
        },
        Z: function () {
          return g;
        },
        xE: function () {
          return f;
        },
        Vb: function () {
          return _;
        },
      });
      const s = 9,
        r = 13,
        i = 27,
        o = 32,
        a = 35,
        c = 36,
        l = 37,
        u = 38,
        h = 39,
        d = 40,
        f = 48,
        p = 57,
        m = 65,
        g = 90;
      function _(t, ...e) {
        return e.length ? e.some((e) => t[e]) : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
      }
    },
    7853: function (t, e, n) {
      'use strict';
      n.d(e, {
        wD: function () {
          return u;
        },
        yq: function () {
          return l;
        },
        Q8: function () {
          return h;
        },
      });
      var s = n(9861),
        r = n(5366),
        i = n(8318),
        o = n(5959),
        a = n(7701);
      let c = (() => {
          class t {
            create(t) {
              return 'undefined' == typeof MutationObserver ? null : new MutationObserver(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = r.Yz7({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        l = (() => {
          class t {
            constructor(t) {
              (this._mutationObserverFactory = t), (this._observedElements = new Map());
            }
            ngOnDestroy() {
              this._observedElements.forEach((t, e) => this._cleanupObserver(e));
            }
            observe(t) {
              const e = (0, s.fI)(t);
              return new i.y((t) => {
                const n = this._observeElement(e).subscribe(t);
                return () => {
                  n.unsubscribe(), this._unobserveElement(e);
                };
              });
            }
            _observeElement(t) {
              if (this._observedElements.has(t)) this._observedElements.get(t).count++;
              else {
                const e = new o.xQ(),
                  n = this._mutationObserverFactory.create((t) => e.next(t));
                n && n.observe(t, { characterData: !0, childList: !0, subtree: !0 }),
                  this._observedElements.set(t, { observer: n, stream: e, count: 1 });
              }
              return this._observedElements.get(t).stream;
            }
            _unobserveElement(t) {
              this._observedElements.has(t) &&
                (this._observedElements.get(t).count--,
                this._observedElements.get(t).count || this._cleanupObserver(t));
            }
            _cleanupObserver(t) {
              if (this._observedElements.has(t)) {
                const { observer: e, stream: n } = this._observedElements.get(t);
                e && e.disconnect(), n.complete(), this._observedElements.delete(t);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(c));
            }),
            (t.ɵprov = r.Yz7({
              factory: function () {
                return new t(r.LFG(c));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        u = (() => {
          class t {
            constructor(t, e, n) {
              (this._contentObserver = t),
                (this._elementRef = e),
                (this._ngZone = n),
                (this.event = new r.vpe()),
                (this._disabled = !1),
                (this._currentSubscription = null);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = (0, s.Ig)(t)),
                this._disabled ? this._unsubscribe() : this._subscribe();
            }
            get debounce() {
              return this._debounce;
            }
            set debounce(t) {
              (this._debounce = (0, s.su)(t)), this._subscribe();
            }
            ngAfterContentInit() {
              this._currentSubscription || this.disabled || this._subscribe();
            }
            ngOnDestroy() {
              this._unsubscribe();
            }
            _subscribe() {
              this._unsubscribe();
              const t = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (this.debounce
                  ? t.pipe((0, a.b)(this.debounce))
                  : t
                ).subscribe(this.event);
              });
            }
            _unsubscribe() {
              var t;
              null === (t = this._currentSubscription) || void 0 === t || t.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Y36(l), r.Y36(r.SBq), r.Y36(r.R0b));
            }),
            (t.ɵdir = r.lG2({
              type: t,
              selectors: [['', 'cdkObserveContent', '']],
              inputs: { disabled: ['cdkObserveContentDisabled', 'disabled'], debounce: 'debounce' },
              outputs: { event: 'cdkObserveContent' },
              exportAs: ['cdkObserveContent'],
            })),
            t
          );
        })(),
        h = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({ providers: [c] })),
            t
          );
        })();
    },
    3169: function (t, e, n) {
      'use strict';
      n.d(e, {
        t4: function () {
          return u;
        },
        ud: function () {
          return h;
        },
        kV: function () {
          return m;
        },
        _i: function () {
          return p;
        },
        i$: function () {
          return d;
        },
        Mq: function () {
          return f;
        },
      });
      var s = n(5366),
        r = n(1116);
      let i;
      try {
        i = 'undefined' != typeof Intl && Intl.v8BreakIterator;
      } catch (g) {
        i = !1;
      }
      let o,
        a,
        c,
        l,
        u = (() => {
          class t {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? (0, r.NF)(this._platformId)
                  : 'object' == typeof document && !!document),
                (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !i) &&
                  'undefined' != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !('MSStream' in window)),
                (this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.LFG(s.Lbi));
            }),
            (t.ɵprov = s.Yz7({
              factory: function () {
                return new t(s.LFG(s.Lbi));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        h = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = s.oAB({ type: t })),
            (t.ɵinj = s.cJS({})),
            t
          );
        })();
      function d(t) {
        return (function () {
          if (null == o && 'undefined' != typeof window)
            try {
              window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', { get: () => (o = !0) }),
              );
            } finally {
              o = o || !1;
            }
          return o;
        })()
          ? t
          : !!t.capture;
      }
      function f() {
        if (null == c) {
          if ('object' != typeof document || !document || 'function' != typeof Element || !Element)
            return (c = !1), c;
          if ('scrollBehavior' in document.documentElement.style) c = !0;
          else {
            const t = Element.prototype.scrollTo;
            c = !!t && !/\{\s*\[native code\]\s*\}/.test(t.toString());
          }
        }
        return c;
      }
      function p() {
        if ('object' != typeof document || !document) return 0;
        if (null == a) {
          const t = document.createElement('div'),
            e = t.style;
          (t.dir = 'rtl'),
            (e.width = '1px'),
            (e.overflow = 'auto'),
            (e.visibility = 'hidden'),
            (e.pointerEvents = 'none'),
            (e.position = 'absolute');
          const n = document.createElement('div'),
            s = n.style;
          (s.width = '2px'),
            (s.height = '1px'),
            t.appendChild(n),
            document.body.appendChild(t),
            (a = 0),
            0 === t.scrollLeft && ((t.scrollLeft = 1), (a = 0 === t.scrollLeft ? 1 : 2)),
            t.parentNode.removeChild(t);
        }
        return a;
      }
      function m(t) {
        if (
          (function () {
            if (null == l) {
              const t = 'undefined' != typeof document ? document.head : null;
              l = !(!t || (!t.createShadowRoot && !t.attachShadow));
            }
            return l;
          })()
        ) {
          const e = t.getRootNode ? t.getRootNode() : null;
          if ('undefined' != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot) return e;
        }
        return null;
      }
    },
    1448: function (t, e, n) {
      'use strict';
      n.d(e, {
        PQ: function () {
          return g;
        },
        ZD: function () {
          return y;
        },
        mF: function () {
          return m;
        },
        Cl: function () {
          return b;
        },
        rL: function () {
          return _;
        },
      });
      var s = n(9861),
        r = n(5366);
      n(8277), n(1098);
      var i = n(8318),
        o = n(5959),
        a = n(878),
        c = n(7254);
      n(2709), n(7570), n(6673), n(6605), n(8720);
      var l = n(810),
        u = n(3835),
        h = n(5416),
        d = (n(6238), n(4689), n(3169)),
        f = n(1116),
        p = n(4720);
      let m = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngZone = t),
                (this._platform = e),
                (this._scrolled = new o.xQ()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = n);
            }
            register(t) {
              this.scrollContainers.has(t) ||
                this.scrollContainers.set(
                  t,
                  t.elementScrolled().subscribe(() => this._scrolled.next(t)),
                );
            }
            deregister(t) {
              const e = this.scrollContainers.get(t);
              e && (e.unsubscribe(), this.scrollContainers.delete(t));
            }
            scrolled(t = 20) {
              return this._platform.isBrowser
                ? new i.y((e) => {
                    this._globalSubscription || this._addGlobalListener();
                    const n =
                      t > 0
                        ? this._scrolled.pipe((0, l.e)(t)).subscribe(e)
                        : this._scrolled.subscribe(e);
                    return (
                      this._scrolledCount++,
                      () => {
                        n.unsubscribe(),
                          this._scrolledCount--,
                          this._scrolledCount || this._removeGlobalListener();
                      }
                    );
                  })
                : (0, a.of)();
            }
            ngOnDestroy() {
              this._removeGlobalListener(),
                this.scrollContainers.forEach((t, e) => this.deregister(e)),
                this._scrolled.complete();
            }
            ancestorScrolled(t, e) {
              const n = this.getAncestorScrollContainers(t);
              return this.scrolled(e).pipe((0, u.h)((t) => !t || n.indexOf(t) > -1));
            }
            getAncestorScrollContainers(t) {
              const e = [];
              return (
                this.scrollContainers.forEach((n, s) => {
                  this._scrollableContainsElement(s, t) && e.push(s);
                }),
                e
              );
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _scrollableContainsElement(t, e) {
              let n = (0, s.fI)(e),
                r = t.getElementRef().nativeElement;
              do {
                if (n == r) return !0;
              } while ((n = n.parentElement));
              return !1;
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() => {
                const t = this._getWindow();
                return (0, c.R)(t.document, 'scroll').subscribe(() => this._scrolled.next());
              });
            }
            _removeGlobalListener() {
              this._globalSubscription &&
                (this._globalSubscription.unsubscribe(), (this._globalSubscription = null));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(r.R0b), r.LFG(d.t4), r.LFG(f.K0, 8));
            }),
            (t.ɵprov = r.Yz7({
              factory: function () {
                return new t(r.LFG(r.R0b), r.LFG(d.t4), r.LFG(f.K0, 8));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        g = (() => {
          class t {
            constructor(t, e, n, s) {
              (this.elementRef = t),
                (this.scrollDispatcher = e),
                (this.ngZone = n),
                (this.dir = s),
                (this._destroyed = new o.xQ()),
                (this._elementScrolled = new i.y((t) =>
                  this.ngZone.runOutsideAngular(() =>
                    (0, c.R)(this.elementRef.nativeElement, 'scroll')
                      .pipe((0, h.R)(this._destroyed))
                      .subscribe(t),
                  ),
                ));
            }
            ngOnInit() {
              this.scrollDispatcher.register(this);
            }
            ngOnDestroy() {
              this.scrollDispatcher.deregister(this),
                this._destroyed.next(),
                this._destroyed.complete();
            }
            elementScrolled() {
              return this._elementScrolled;
            }
            getElementRef() {
              return this.elementRef;
            }
            scrollTo(t) {
              const e = this.elementRef.nativeElement,
                n = this.dir && 'rtl' == this.dir.value;
              null == t.left && (t.left = n ? t.end : t.start),
                null == t.right && (t.right = n ? t.start : t.end),
                null != t.bottom && (t.top = e.scrollHeight - e.clientHeight - t.bottom),
                n && 0 != (0, d._i)()
                  ? (null != t.left && (t.right = e.scrollWidth - e.clientWidth - t.left),
                    2 == (0, d._i)()
                      ? (t.left = t.right)
                      : 1 == (0, d._i)() && (t.left = t.right ? -t.right : t.right))
                  : null != t.right && (t.left = e.scrollWidth - e.clientWidth - t.right),
                this._applyScrollToOptions(t);
            }
            _applyScrollToOptions(t) {
              const e = this.elementRef.nativeElement;
              (0, d.Mq)()
                ? e.scrollTo(t)
                : (null != t.top && (e.scrollTop = t.top),
                  null != t.left && (e.scrollLeft = t.left));
            }
            measureScrollOffset(t) {
              const e = this.elementRef.nativeElement;
              if ('top' == t) return e.scrollTop;
              if ('bottom' == t) return e.scrollHeight - e.clientHeight - e.scrollTop;
              const n = this.dir && 'rtl' == this.dir.value;
              return (
                'start' == t
                  ? (t = n ? 'right' : 'left')
                  : 'end' == t && (t = n ? 'left' : 'right'),
                n && 2 == (0, d._i)()
                  ? 'left' == t
                    ? e.scrollWidth - e.clientWidth - e.scrollLeft
                    : e.scrollLeft
                  : n && 1 == (0, d._i)()
                  ? 'left' == t
                    ? e.scrollLeft + e.scrollWidth - e.clientWidth
                    : -e.scrollLeft
                  : 'left' == t
                  ? e.scrollLeft
                  : e.scrollWidth - e.clientWidth - e.scrollLeft
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Y36(r.SBq), r.Y36(m), r.Y36(r.R0b), r.Y36(p.Is, 8));
            }),
            (t.ɵdir = r.lG2({
              type: t,
              selectors: [
                ['', 'cdk-scrollable', ''],
                ['', 'cdkScrollable', ''],
              ],
            })),
            t
          );
        })(),
        _ = (() => {
          class t {
            constructor(t, e, n) {
              (this._platform = t),
                (this._change = new o.xQ()),
                (this._changeListener = (t) => {
                  this._change.next(t);
                }),
                (this._document = n),
                e.runOutsideAngular(() => {
                  if (t.isBrowser) {
                    const t = this._getWindow();
                    t.addEventListener('resize', this._changeListener),
                      t.addEventListener('orientationchange', this._changeListener);
                  }
                  this.change().subscribe(() => this._updateViewportSize());
                });
            }
            ngOnDestroy() {
              if (this._platform.isBrowser) {
                const t = this._getWindow();
                t.removeEventListener('resize', this._changeListener),
                  t.removeEventListener('orientationchange', this._changeListener);
              }
              this._change.complete();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const t = { width: this._viewportSize.width, height: this._viewportSize.height };
              return this._platform.isBrowser || (this._viewportSize = null), t;
            }
            getViewportRect() {
              const t = this.getViewportScrollPosition(),
                { width: e, height: n } = this.getViewportSize();
              return {
                top: t.top,
                left: t.left,
                bottom: t.top + n,
                right: t.left + e,
                height: n,
                width: e,
              };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const t = this._document,
                e = this._getWindow(),
                n = t.documentElement,
                s = n.getBoundingClientRect();
              return {
                top: -s.top || t.body.scrollTop || e.scrollY || n.scrollTop || 0,
                left: -s.left || t.body.scrollLeft || e.scrollX || n.scrollLeft || 0,
              };
            }
            change(t = 20) {
              return t > 0 ? this._change.pipe((0, l.e)(t)) : this._change;
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _updateViewportSize() {
              const t = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: t.innerWidth, height: t.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(d.t4), r.LFG(r.R0b), r.LFG(f.K0, 8));
            }),
            (t.ɵprov = r.Yz7({
              factory: function () {
                return new t(r.LFG(d.t4), r.LFG(r.R0b), r.LFG(f.K0, 8));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        y = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({})),
            t
          );
        })(),
        b = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({ imports: [[p.vT, d.ud, y], p.vT, y] })),
            t
          );
        })();
    },
    9861: function (t, e, n) {
      'use strict';
      n.d(e, {
        Eq: function () {
          return o;
        },
        Ig: function () {
          return r;
        },
        HM: function () {
          return a;
        },
        fI: function () {
          return c;
        },
        su: function () {
          return i;
        },
      });
      var s = n(5366);
      function r(t) {
        return null != t && 'false' != `${t}`;
      }
      function i(t, e = 0) {
        return (function (t) {
          return !isNaN(parseFloat(t)) && !isNaN(Number(t));
        })(t)
          ? Number(t)
          : e;
      }
      function o(t) {
        return Array.isArray(t) ? t : [t];
      }
      function a(t) {
        return null == t ? '' : 'string' == typeof t ? t : `${t}px`;
      }
      function c(t) {
        return t instanceof s.SBq ? t.nativeElement : t;
      }
    },
    1116: function (t, e, n) {
      'use strict';
      n.d(e, {
        mr: function () {
          return v;
        },
        Ov: function () {
          return $;
        },
        ez: function () {
          return Y;
        },
        K0: function () {
          return c;
        },
        Do: function () {
          return S;
        },
        V_: function () {
          return h;
        },
        Ye: function () {
          return E;
        },
        S$: function () {
          return y;
        },
        mk: function () {
          return N;
        },
        sg: function () {
          return R;
        },
        O5: function () {
          return D;
        },
        PC: function () {
          return q;
        },
        RF: function () {
          return V;
        },
        n9: function () {
          return H;
        },
        ED: function () {
          return B;
        },
        b0: function () {
          return w;
        },
        lw: function () {
          return l;
        },
        EM: function () {
          return K;
        },
        JF: function () {
          return tt;
        },
        NF: function () {
          return W;
        },
        w_: function () {
          return a;
        },
        bD: function () {
          return Q;
        },
        q: function () {
          return i;
        },
        Mx: function () {
          return F;
        },
        HT: function () {
          return o;
        },
      });
      var s = n(5366);
      let r = null;
      function i() {
        return r;
      }
      function o(t) {
        r || (r = t);
      }
      class a {}
      const c = new s.OlP('DocumentToken');
      let l = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = (0, s.Yz7)({ factory: u, token: t, providedIn: 'platform' })),
          t
        );
      })();
      function u() {
        return (0, s.LFG)(d);
      }
      const h = new s.OlP('Location Initialized');
      let d = (() => {
        class t extends l {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return i().getBaseHref(this._doc);
          }
          onPopState(t) {
            const e = i().getGlobalEventTarget(this._doc, 'window');
            return (
              e.addEventListener('popstate', t, !1), () => e.removeEventListener('popstate', t)
            );
          }
          onHashChange(t) {
            const e = i().getGlobalEventTarget(this._doc, 'window');
            return (
              e.addEventListener('hashchange', t, !1), () => e.removeEventListener('hashchange', t)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            f() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            f() ? this._history.replaceState(t, e, n) : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.LFG(c));
          }),
          (t.ɵprov = (0, s.Yz7)({ factory: p, token: t, providedIn: 'platform' })),
          t
        );
      })();
      function f() {
        return !!window.history.pushState;
      }
      function p() {
        return new d((0, s.LFG)(c));
      }
      function m(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith('/') && n++,
          e.startsWith('/') && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + '/' + e
        );
      }
      function g(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ('/' === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function _(t) {
        return t && '?' !== t[0] ? '?' + t : t;
      }
      let y = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = (0, s.Yz7)({ factory: b, token: t, providedIn: 'root' })),
          t
        );
      })();
      function b(t) {
        const e = (0, s.LFG)(c).location;
        return new w((0, s.LFG)(l), (e && e.origin) || '');
      }
      const v = new s.OlP('appBaseHref');
      let w = (() => {
          class t extends y {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.',
                );
              this._baseHref = e;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return m(this._baseHref, t);
            }
            path(t = !1) {
              const e = this._platformLocation.pathname + _(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, s) {
              const r = this.prepareExternalUrl(n + _(s));
              this._platformLocation.pushState(t, e, r);
            }
            replaceState(t, e, n, s) {
              const r = this.prepareExternalUrl(n + _(s));
              this._platformLocation.replaceState(t, e, r);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.LFG(l), s.LFG(v, 8));
            }),
            (t.ɵprov = s.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        S = (() => {
          class t extends y {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != e && (this._baseHref = e);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = '#'), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = m(this._baseHref, t);
              return e.length > 0 ? '#' + e : e;
            }
            pushState(t, e, n, s) {
              let r = this.prepareExternalUrl(n + _(s));
              0 == r.length && (r = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, r);
            }
            replaceState(t, e, n, s) {
              let r = this.prepareExternalUrl(n + _(s));
              0 == r.length && (r = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, r);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.LFG(l), s.LFG(v, 8));
            }),
            (t.ɵprov = s.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        E = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new s.vpe()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = g(C(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({ url: this.path(!0), pop: !0, state: t.state, type: t.type });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = '') {
              return this.path() == this.normalize(t + _(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, C(e)),
              );
            }
            prepareExternalUrl(t) {
              return (
                t && '/' !== t[0] && (t = '/' + t), this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = '', n = null) {
              this._platformStrategy.pushState(n, '', t, e),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(t + _(e)), n);
            }
            replaceState(t, e = '', n = null) {
              this._platformStrategy.replaceState(n, '', t, e),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(t + _(e)), n);
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformStrategy).historyGo) || void 0 === n || n.call(e, t);
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = '', e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({ next: t, error: e, complete: n });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.LFG(y), s.LFG(l));
            }),
            (t.normalizeQueryParams = _),
            (t.joinWithSlash = m),
            (t.stripTrailingSlash = g),
            (t.ɵprov = (0, s.Yz7)({ factory: x, token: t, providedIn: 'root' })),
            t
          );
        })();
      function x() {
        return new E((0, s.LFG)(y), (0, s.LFG)(l));
      }
      function C(t) {
        return t.replace(/\/index.html$/, '');
      }
      var T = (function (t) {
        return (
          (t[(t.Zero = 0)] = 'Zero'),
          (t[(t.One = 1)] = 'One'),
          (t[(t.Two = 2)] = 'Two'),
          (t[(t.Few = 3)] = 'Few'),
          (t[(t.Many = 4)] = 'Many'),
          (t[(t.Other = 5)] = 'Other'),
          t
        );
      })({});
      const k = s.kL8;
      class I {}
      let A = (() => {
        class t extends I {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (k(e || this.locale)(t)) {
              case T.Zero:
                return 'zero';
              case T.One:
                return 'one';
              case T.Two:
                return 'two';
              case T.Few:
                return 'few';
              case T.Many:
                return 'many';
              default:
                return 'other';
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.LFG(s.soG));
          }),
          (t.ɵprov = s.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function F(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(';')) {
          const t = n.indexOf('='),
            [s, r] = -1 == t ? [n, ''] : [n.slice(0, t), n.slice(t + 1)];
          if (s.trim() === e) return decodeURIComponent(r);
        }
        return null;
      }
      let N = (() => {
        class t {
          constructor(t, e, n, s) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = e),
              (this._ngEl = n),
              (this._renderer = s),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses = 'string' == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = 'string' == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                ((0, s.sIi)(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create())
                  : (this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((t) => this._toggleClass(t.key, t.currentValue)),
              t.forEachChangedItem((t) => this._toggleClass(t.key, t.currentValue)),
              t.forEachRemovedItem((t) => {
                t.previousValue && this._toggleClass(t.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((t) => {
              if ('string' != typeof t.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${(0, s.AaK)(
                    t.item,
                  )}`,
                );
              this._toggleClass(t.item, !0);
            }),
              t.forEachRemovedItem((t) => this._toggleClass(t.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !0))
                : Object.keys(t).forEach((e) => this._toggleClass(e, !!t[e])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !1))
                : Object.keys(t).forEach((t) => this._toggleClass(t, !1)));
          }
          _toggleClass(t, e) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((t) => {
                e
                  ? this._renderer.addClass(this._ngEl.nativeElement, t)
                  : this._renderer.removeClass(this._ngEl.nativeElement, t);
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.Y36(s.ZZ4), s.Y36(s.aQg), s.Y36(s.SBq), s.Y36(s.Qsj));
          }),
          (t.ɵdir = s.lG2({
            type: t,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
          })),
          t
        );
      })();
      class O {
        constructor(t, e, n, s) {
          (this.$implicit = t), (this.ngForOf = e), (this.index = n), (this.count = s);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let R = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs.find(n).create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`,
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, s) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new O(null, this._ngForOf, -1, -1),
                    null === s ? void 0 : s,
                  ),
                  r = new L(t, n);
                e.push(r);
              } else if (null == s) this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const r = this._viewContainer.get(n);
                this._viewContainer.move(r, s);
                const i = new L(t, r);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++) this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, s = this._viewContainer.length; n < s; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n), (t.context.count = s), (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit = t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.Y36(s.s_b), s.Y36(s.Rgc), s.Y36(s.ZZ4));
          }),
          (t.ɵdir = s.lG2({
            type: t,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
          })),
          t
        );
      })();
      class L {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let D = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new P()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t), this._updateView();
          }
          set ngIfThen(t) {
            M('ngIfThen', t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            M('ngIfElse', t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context,
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context,
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.Y36(s.s_b), s.Y36(s.Rgc));
          }),
          (t.ɵdir = s.lG2({
            type: t,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
          })),
          t
        );
      })();
      class P {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function M(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(`${t} must be a TemplateRef, but received '${(0, s.AaK)(e)}'.`);
      }
      class j {
        constructor(t, e) {
          (this._viewContainerRef = t), (this._templateRef = e), (this._created = !1);
        }
        create() {
          (this._created = !0), this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created ? this.create() : !t && this._created && this.destroy();
        }
      }
      let V = (() => {
          class t {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(t) {
              (this._ngSwitch = t), 0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(t) {
              this._defaultViews || (this._defaultViews = []), this._defaultViews.push(t);
            }
            _matchCase(t) {
              const e = t == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || e),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                e
              );
            }
            _updateDefaultCases(t) {
              if (this._defaultViews && t !== this._defaultUsed) {
                this._defaultUsed = t;
                for (let e = 0; e < this._defaultViews.length; e++)
                  this._defaultViews[e].enforceState(t);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = s.lG2({
              type: t,
              selectors: [['', 'ngSwitch', '']],
              inputs: { ngSwitch: 'ngSwitch' },
            })),
            t
          );
        })(),
        H = (() => {
          class t {
            constructor(t, e, n) {
              (this.ngSwitch = n), n._addCase(), (this._view = new j(t, e));
            }
            ngDoCheck() {
              this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.Y36(s.s_b), s.Y36(s.Rgc), s.Y36(V, 1));
            }),
            (t.ɵdir = s.lG2({
              type: t,
              selectors: [['', 'ngSwitchCase', '']],
              inputs: { ngSwitchCase: 'ngSwitchCase' },
            })),
            t
          );
        })(),
        B = (() => {
          class t {
            constructor(t, e, n) {
              n._addDefault(new j(t, e));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.Y36(s.s_b), s.Y36(s.Rgc), s.Y36(V, 1));
            }),
            (t.ɵdir = s.lG2({ type: t, selectors: [['', 'ngSwitchDefault', '']] })),
            t
          );
        })(),
        q = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngEl = t),
                (this._differs = e),
                (this._renderer = n),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(t) {
              (this._ngStyle = t),
                !this._differ && t && (this._differ = this._differs.find(t).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const t = this._differ.diff(this._ngStyle);
                t && this._applyChanges(t);
              }
            }
            _setStyle(t, e) {
              const [n, s] = t.split('.');
              null != (e = null != e && s ? `${e}${s}` : e)
                ? this._renderer.setStyle(this._ngEl.nativeElement, n, e)
                : this._renderer.removeStyle(this._ngEl.nativeElement, n);
            }
            _applyChanges(t) {
              t.forEachRemovedItem((t) => this._setStyle(t.key, null)),
                t.forEachAddedItem((t) => this._setStyle(t.key, t.currentValue)),
                t.forEachChangedItem((t) => this._setStyle(t.key, t.currentValue));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.Y36(s.SBq), s.Y36(s.aQg), s.Y36(s.Qsj));
            }),
            (t.ɵdir = s.lG2({
              type: t,
              selectors: [['', 'ngStyle', '']],
              inputs: { ngStyle: 'ngStyle' },
            })),
            t
          );
        })();
      class Z {
        createSubscription(t, e) {
          return t.subscribe({
            next: e,
            error: (t) => {
              throw t;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
        onDestroy(t) {
          t.unsubscribe();
        }
      }
      class z {
        createSubscription(t, e) {
          return t.then(e, (t) => {
            throw t;
          });
        }
        dispose(t) {}
        onDestroy(t) {}
      }
      const G = new z(),
        U = new Z();
      let $ = (() => {
          class t {
            constructor(t) {
              (this._ref = t),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : this._latestValue
                : (t && this._subscribe(t), this._latestValue);
            }
            _subscribe(t) {
              (this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(t, (e) =>
                  this._updateLatestValue(t, e),
                ));
            }
            _selectStrategy(e) {
              if ((0, s.QGY)(e)) return G;
              if ((0, s.F4k)(e)) return U;
              throw Error(`InvalidPipeArgument: '${e}' for pipe '${(0, s.AaK)(t)}'`);
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(t, e) {
              t === this._obj && ((this._latestValue = e), this._ref.markForCheck());
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.Y36(s.sBO, 16));
            }),
            (t.ɵpipe = s.Yjl({ name: 'async', type: t, pure: !1 })),
            t
          );
        })(),
        Y = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = s.oAB({ type: t })),
            (t.ɵinj = s.cJS({ providers: [{ provide: I, useClass: A }] })),
            t
          );
        })();
      const Q = 'browser';
      function W(t) {
        return t === Q;
      }
      let K = (() => {
        class t {}
        return (
          (t.ɵprov = (0, s.Yz7)({
            token: t,
            providedIn: 'root',
            factory: () => new J((0, s.LFG)(c), window),
          })),
          t
        );
      })();
      class J {
        constructor(t, e) {
          (this.document = t), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const e = (function (t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if (
              'function' == typeof t.createTreeWalker &&
              t.body &&
              (t.body.createShadowRoot || t.body.attachShadow)
            ) {
              const n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let s = n.currentNode;
              for (; s; ) {
                const t = s.shadowRoot;
                if (t) {
                  const n = t.getElementById(e) || t.querySelector(`[name="${e}"]`);
                  if (n) return n;
                }
                s = n.nextNode();
              }
            }
            return null;
          })(this.document, t);
          e && (this.scrollToElement(e), this.attemptFocus(e));
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            s = e.top + this.window.pageYOffset,
            r = this.offset();
          this.window.scrollTo(n - r[0], s - r[1]);
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t = X(this.window.history) || X(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window;
          } catch (t) {
            return !1;
          }
        }
      }
      function X(t) {
        return Object.getOwnPropertyDescriptor(t, 'scrollRestoration');
      }
      class tt {}
    },
    2693: function (t, e, n) {
      'use strict';
      n.d(e, {
        eN: function () {
          return I;
        },
        JF: function () {
          return B;
        },
      });
      var s = n(1116),
        r = n(5366),
        i = n(878),
        o = n(8318),
        a = n(436),
        c = n(3835),
        l = n(9996);
      class u {}
      class h {}
      class d {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  'string' == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split('\n').forEach((t) => {
                            const e = t.indexOf(':');
                            if (e > 0) {
                              const n = t.slice(0, e),
                                s = n.toLowerCase(),
                                r = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(r)
                                  : this.headers.set(s, [r]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const s = e.toLowerCase();
                            'string' == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(s, n), this.maybeSetNormalizedName(e, s));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: 'a' });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: 'd' });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof d ? this.copyFrom(this.lazyInit) : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)), (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new d();
          return (
            (e.lazyInit = this.lazyInit && this.lazyInit instanceof d ? this.lazyInit : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case 'a':
            case 's':
              let n = t.value;
              if (('string' == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const s = ('a' === t.op ? this.headers.get(e) : void 0) || [];
              s.push(...n), this.headers.set(e, s);
              break;
            case 'd':
              const r = t.value;
              if (r) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === r.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e)),
            );
        }
      }
      class f {
        encodeKey(t) {
          return p(t);
        }
        encodeValue(t) {
          return p(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function p(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/gi, '$')
          .replace(/%2C/gi, ',')
          .replace(/%3B/gi, ';')
          .replace(/%2B/gi, '+')
          .replace(/%3D/gi, '=')
          .replace(/%3F/gi, '?')
          .replace(/%2F/gi, '/');
      }
      function m(t) {
        return `${t}`;
      }
      class g {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new f()),
            t.fromString)
          ) {
            if (t.fromObject) throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((t) => {
                      const s = t.indexOf('='),
                        [r, i] =
                          -1 == s
                            ? [e.decodeKey(t), '']
                            : [e.decodeKey(t.slice(0, s)), e.decodeValue(t.slice(s + 1))],
                        o = n.get(r) || [];
                      o.push(i), n.set(r, o);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: 'a' });
        }
        appendAll(t) {
          const e = [];
          return (
            Object.keys(t).forEach((n) => {
              const s = t[n];
              Array.isArray(s)
                ? s.forEach((t) => {
                    e.push({ param: n, value: t, op: 'a' });
                  })
                : e.push({ param: n, value: s, op: 'a' });
            }),
            this.clone(e)
          );
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + '=' + this.encoder.encodeValue(t))
                  .join('&');
              })
              .filter((t) => '' !== t)
              .join('&')
          );
        }
        clone(t) {
          const e = new g({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this), (e.updates = (this.updates || []).concat(t)), e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom.keys().forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const e = ('a' === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(m(t.value)), this.map.set(t.param, e);
                    break;
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(m(t.value));
                      -1 !== n && e.splice(n, 1),
                        e.length > 0 ? this.map.set(t.param, e) : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class _ {
        constructor() {
          this.map = new Map();
        }
        set(t, e) {
          return this.map.set(t, e), this;
        }
        get(t) {
          return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t);
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        keys() {
          return this.map.keys();
        }
      }
      function y(t) {
        return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function b(t) {
        return 'undefined' != typeof Blob && t instanceof Blob;
      }
      function v(t) {
        return 'undefined' != typeof FormData && t instanceof FormData;
      }
      class w {
        constructor(t, e, n, s) {
          let r;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || s
              ? ((this.body = void 0 !== n ? n : null), (r = s))
              : (r = n),
            r &&
              ((this.reportProgress = !!r.reportProgress),
              (this.withCredentials = !!r.withCredentials),
              r.responseType && (this.responseType = r.responseType),
              r.headers && (this.headers = r.headers),
              r.context && (this.context = r.context),
              r.params && (this.params = r.params)),
            this.headers || (this.headers = new d()),
            this.context || (this.context = new _()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf('?');
              this.urlWithParams = e + (-1 === n ? '?' : n < e.length - 1 ? '&' : '') + t;
            }
          } else (this.params = new g()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : y(this.body) || b(this.body) || v(this.body) || 'string' == typeof this.body
            ? this.body
            : this.body instanceof g
            ? this.body.toString()
            : 'object' == typeof this.body ||
              'boolean' == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || v(this.body)
            ? null
            : b(this.body)
            ? this.body.type || null
            : y(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof g
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body ||
              'number' == typeof this.body ||
              Array.isArray(this.body)
            ? 'application/json'
            : null;
        }
        clone(t = {}) {
          var e;
          const n = t.method || this.method,
            s = t.url || this.url,
            r = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            o = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
            a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
          let c = t.headers || this.headers,
            l = t.params || this.params;
          const u = null !== (e = t.context) && void 0 !== e ? e : this.context;
          return (
            void 0 !== t.setHeaders &&
              (c = Object.keys(t.setHeaders).reduce((e, n) => e.set(n, t.setHeaders[n]), c)),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce((e, n) => e.set(n, t.setParams[n]), l)),
            new w(n, s, i, {
              params: l,
              headers: c,
              context: u,
              reportProgress: a,
              responseType: r,
              withCredentials: o,
            })
          );
        }
      }
      var S = (function (t) {
        return (
          (t[(t.Sent = 0)] = 'Sent'),
          (t[(t.UploadProgress = 1)] = 'UploadProgress'),
          (t[(t.ResponseHeader = 2)] = 'ResponseHeader'),
          (t[(t.DownloadProgress = 3)] = 'DownloadProgress'),
          (t[(t.Response = 4)] = 'Response'),
          (t[(t.User = 5)] = 'User'),
          t
        );
      })({});
      class E {
        constructor(t, e = 200, n = 'OK') {
          (this.headers = t.headers || new d()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class x extends E {
        constructor(t = {}) {
          super(t), (this.type = S.ResponseHeader);
        }
        clone(t = {}) {
          return new x({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class C extends E {
        constructor(t = {}) {
          super(t), (this.type = S.Response), (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new C({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class T extends E {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${t.status} ${
                    t.statusText
                  }`),
            (this.error = t.error || null);
        }
      }
      function k(t, e) {
        return {
          body: e,
          headers: t.headers,
          context: t.context,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let I = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let s;
            if (t instanceof w) s = t;
            else {
              let r, i;
              (r = n.headers instanceof d ? n.headers : new d(n.headers)),
                n.params &&
                  (i = n.params instanceof g ? n.params : new g({ fromObject: n.params })),
                (s = new w(t, e, void 0 !== n.body ? n.body : null, {
                  headers: r,
                  context: n.context,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || 'json',
                  withCredentials: n.withCredentials,
                }));
            }
            const r = (0, i.of)(s).pipe((0, a.b)((t) => this.handler.handle(t)));
            if (t instanceof w || 'events' === n.observe) return r;
            const o = r.pipe((0, c.h)((t) => t instanceof C));
            switch (n.observe || 'body') {
              case 'body':
                switch (s.responseType) {
                  case 'arraybuffer':
                    return o.pipe(
                      (0, l.U)((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return t.body;
                      }),
                    );
                  case 'blob':
                    return o.pipe(
                      (0, l.U)((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error('Response is not a Blob.');
                        return t.body;
                      }),
                    );
                  case 'text':
                    return o.pipe(
                      (0, l.U)((t) => {
                        if (null !== t.body && 'string' != typeof t.body)
                          throw new Error('Response is not a string.');
                        return t.body;
                      }),
                    );
                  case 'json':
                  default:
                    return o.pipe((0, l.U)((t) => t.body));
                }
              case 'response':
                return o;
              default:
                throw new Error(`Unreachable: unhandled observe type ${n.observe}}`);
            }
          }
          delete(t, e = {}) {
            return this.request('DELETE', t, e);
          }
          get(t, e = {}) {
            return this.request('GET', t, e);
          }
          head(t, e = {}) {
            return this.request('HEAD', t, e);
          }
          jsonp(t, e) {
            return this.request('JSONP', t, {
              params: new g().append(e, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(t, e = {}) {
            return this.request('OPTIONS', t, e);
          }
          patch(t, e, n = {}) {
            return this.request('PATCH', t, k(n, e));
          }
          post(t, e, n = {}) {
            return this.request('POST', t, k(n, e));
          }
          put(t, e, n = {}) {
            return this.request('PUT', t, k(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(u));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class A {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const F = new r.OlP('HTTP_INTERCEPTORS');
      let N = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const O = /^\)\]\}',?\n/;
      let R = (() => {
        class t {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ('JSONP' === t.method)
              throw new Error(
                'Attempted to construct Jsonp request without HttpClientJsonpModule installed.',
              );
            return new o.y((e) => {
              const n = this.xhrFactory.build();
              if (
                (n.open(t.method, t.urlWithParams),
                t.withCredentials && (n.withCredentials = !0),
                t.headers.forEach((t, e) => n.setRequestHeader(t, e.join(','))),
                t.headers.has('Accept') ||
                  n.setRequestHeader('Accept', 'application/json, text/plain, */*'),
                !t.headers.has('Content-Type'))
              ) {
                const e = t.detectContentTypeHeader();
                null !== e && n.setRequestHeader('Content-Type', e);
              }
              if (t.responseType) {
                const e = t.responseType.toLowerCase();
                n.responseType = 'json' !== e ? e : 'text';
              }
              const s = t.serializeBody();
              let r = null;
              const i = () => {
                  if (null !== r) return r;
                  const e = 1223 === n.status ? 204 : n.status,
                    s = n.statusText || 'OK',
                    i = new d(n.getAllResponseHeaders()),
                    o =
                      (function (t) {
                        return 'responseURL' in t && t.responseURL
                          ? t.responseURL
                          : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                          ? t.getResponseHeader('X-Request-URL')
                          : null;
                      })(n) || t.url;
                  return (r = new x({ headers: i, status: e, statusText: s, url: o })), r;
                },
                o = () => {
                  let { headers: s, status: r, statusText: o, url: a } = i(),
                    c = null;
                  204 !== r && (c = void 0 === n.response ? n.responseText : n.response),
                    0 === r && (r = c ? 200 : 0);
                  let l = r >= 200 && r < 300;
                  if ('json' === t.responseType && 'string' == typeof c) {
                    const t = c;
                    c = c.replace(O, '');
                    try {
                      c = '' !== c ? JSON.parse(c) : null;
                    } catch (u) {
                      (c = t), l && ((l = !1), (c = { error: u, text: c }));
                    }
                  }
                  l
                    ? (e.next(
                        new C({ body: c, headers: s, status: r, statusText: o, url: a || void 0 }),
                      ),
                      e.complete())
                    : e.error(
                        new T({ error: c, headers: s, status: r, statusText: o, url: a || void 0 }),
                      );
                },
                a = (t) => {
                  const { url: s } = i(),
                    r = new T({
                      error: t,
                      status: n.status || 0,
                      statusText: n.statusText || 'Unknown Error',
                      url: s || void 0,
                    });
                  e.error(r);
                };
              let c = !1;
              const l = (s) => {
                  c || (e.next(i()), (c = !0));
                  let r = { type: S.DownloadProgress, loaded: s.loaded };
                  s.lengthComputable && (r.total = s.total),
                    'text' === t.responseType && n.responseText && (r.partialText = n.responseText),
                    e.next(r);
                },
                u = (t) => {
                  let n = { type: S.UploadProgress, loaded: t.loaded };
                  t.lengthComputable && (n.total = t.total), e.next(n);
                };
              return (
                n.addEventListener('load', o),
                n.addEventListener('error', a),
                n.addEventListener('timeout', a),
                n.addEventListener('abort', a),
                t.reportProgress &&
                  (n.addEventListener('progress', l),
                  null !== s && n.upload && n.upload.addEventListener('progress', u)),
                n.send(s),
                e.next({ type: S.Sent }),
                () => {
                  n.removeEventListener('error', a),
                    n.removeEventListener('abort', a),
                    n.removeEventListener('load', o),
                    n.removeEventListener('timeout', a),
                    t.reportProgress &&
                      (n.removeEventListener('progress', l),
                      null !== s && n.upload && n.upload.removeEventListener('progress', u)),
                    n.readyState !== n.DONE && n.abort();
                }
              );
            });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(s.JF));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const L = new r.OlP('XSRF_COOKIE_NAME'),
        D = new r.OlP('XSRF_HEADER_NAME');
      class P {}
      let M = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ''),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ('server' === this.platform) return null;
              const t = this.doc.cookie || '';
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = (0, s.Mx)(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(s.K0), r.LFG(r.Lbi), r.LFG(L));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        j = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                'GET' === t.method ||
                'HEAD' === t.method ||
                n.startsWith('http://') ||
                n.startsWith('https://')
              )
                return e.handle(t);
              const s = this.tokenService.getToken();
              return (
                null === s ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, s) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(P), r.LFG(D));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        V = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(F, []);
                this.chain = t.reduceRight((t, e) => new A(t, e), this.backend);
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(h), r.LFG(r.zs3));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        H = (() => {
          class t {
            static disable() {
              return { ngModule: t, providers: [{ provide: j, useClass: N }] };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: L, useValue: e.cookieName } : [],
                  e.headerName ? { provide: D, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({
              providers: [
                j,
                { provide: F, useExisting: j, multi: !0 },
                { provide: P, useClass: M },
                { provide: L, useValue: 'XSRF-TOKEN' },
                { provide: D, useValue: 'X-XSRF-TOKEN' },
              ],
            })),
            t
          );
        })(),
        B = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({
              providers: [I, { provide: u, useClass: V }, R, { provide: h, useExisting: R }],
              imports: [[H.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })]],
            })),
            t
          );
        })();
    },
    5366: function (t, e, n) {
      'use strict';
      n.d(e, {
        deG: function () {
          return nn;
        },
        tb: function () {
          return qc;
        },
        AFp: function () {
          return Mc;
        },
        ip1: function () {
          return Dc;
        },
        CZH: function () {
          return Pc;
        },
        hGG: function () {
          return Dl;
        },
        z2F: function () {
          return Cl;
        },
        sBO: function () {
          return Pa;
        },
        Sil: function () {
          return Xc;
        },
        _Vd: function () {
          return oa;
        },
        EJc: function () {
          return Gc;
        },
        SBq: function () {
          return ua;
        },
        qLn: function () {
          return Ss;
        },
        vpe: function () {
          return gc;
        },
        gxx: function () {
          return ui;
        },
        tBr: function () {
          return En;
        },
        XFs: function () {
          return A;
        },
        OlP: function () {
          return en;
        },
        zs3: function () {
          return Ci;
        },
        ZZ4: function () {
          return Aa;
        },
        aQg: function () {
          return Na;
        },
        soG: function () {
          return zc;
        },
        YKP: function () {
          return Ua;
        },
        v3s: function () {
          return kl;
        },
        h0i: function () {
          return Ga;
        },
        PXZ: function () {
          return vl;
        },
        R0b: function () {
          return nl;
        },
        FiY: function () {
          return xn;
        },
        Lbi: function () {
          return Bc;
        },
        g9A: function () {
          return Hc;
        },
        n_E: function () {
          return yc;
        },
        Qsj: function () {
          return fa;
        },
        FYo: function () {
          return da;
        },
        JOm: function () {
          return ks;
        },
        Tiy: function () {
          return ma;
        },
        q3G: function () {
          return fs;
        },
        WD2: function () {
          return mt;
        },
        tp0: function () {
          return Cn;
        },
        EAV: function () {
          return Fl;
        },
        Rgc: function () {
          return Ba;
        },
        dDg: function () {
          return ll;
        },
        DyG: function () {
          return sn;
        },
        GfV: function () {
          return ga;
        },
        s_b: function () {
          return Ya;
        },
        ifc: function () {
          return D;
        },
        eFA: function () {
          return wl;
        },
        G48: function () {
          return yl;
        },
        Gpc: function () {
          return f;
        },
        f3M: function () {
          return vn;
        },
        X6Q: function () {
          return _l;
        },
        _c5: function () {
          return Rl;
        },
        VLi: function () {
          return dl;
        },
        c2e: function () {
          return Zc;
        },
        zSh: function () {
          return di;
        },
        wAp: function () {
          return $o;
        },
        EiD: function () {
          return hs;
        },
        mCW: function () {
          return Yn;
        },
        qzn: function () {
          return Mn;
        },
        JVY: function () {
          return Vn;
        },
        pB0: function () {
          return Zn;
        },
        eBb: function () {
          return Bn;
        },
        L6k: function () {
          return Hn;
        },
        LAX: function () {
          return qn;
        },
        cg1: function () {
          return zo;
        },
        Tjo: function () {
          return Ol;
        },
        kL8: function () {
          return Go;
        },
        yhl: function () {
          return jn;
        },
        dqk: function () {
          return H;
        },
        sIi: function () {
          return Di;
        },
        CqO: function () {
          return eo;
        },
        QGY: function () {
          return Xi;
        },
        F4k: function () {
          return to;
        },
        RDi: function () {
          return St;
        },
        AaK: function () {
          return u;
        },
        z3N: function () {
          return Pn;
        },
        qOj: function () {
          return ki;
        },
        TTD: function () {
          return gt;
        },
        _Bn: function () {
          return sa;
        },
        xp6: function () {
          return fr;
        },
        uIk: function () {
          return Hi;
        },
        Tol: function () {
          return So;
        },
        Gre: function () {
          return jo;
        },
        ekj: function () {
          return wo;
        },
        Suo: function () {
          return Fc;
        },
        Xpm: function () {
          return K;
        },
        lG2: function () {
          return rt;
        },
        Yz7: function () {
          return v;
        },
        cJS: function () {
          return w;
        },
        oAB: function () {
          return et;
        },
        Yjl: function () {
          return it;
        },
        Y36: function () {
          return zi;
        },
        _UZ: function () {
          return Qi;
        },
        BQk: function () {
          return Ki;
        },
        ynx: function () {
          return Wi;
        },
        qZA: function () {
          return Yi;
        },
        TgZ: function () {
          return $i;
        },
        EpF: function () {
          return Ji;
        },
        n5z: function () {
          return Ke;
        },
        Ikx: function () {
          return Vo;
        },
        LFG: function () {
          return bn;
        },
        $8M: function () {
          return Xe;
        },
        NdJ: function () {
          return no;
        },
        CRH: function () {
          return Nc;
        },
        kcU: function () {
          return ge;
        },
        O4$: function () {
          return me;
        },
        oxw: function () {
          return ao;
        },
        ALo: function () {
          return fc;
        },
        lcZ: function () {
          return pc;
        },
        Hsn: function () {
          return uo;
        },
        F$t: function () {
          return lo;
        },
        Q6J: function () {
          return Gi;
        },
        s9C: function () {
          return ho;
        },
        MGl: function () {
          return fo;
        },
        VKq: function () {
          return lc;
        },
        WLB: function () {
          return uc;
        },
        iGM: function () {
          return Ic;
        },
        MAs: function () {
          return Zi;
        },
        evT: function () {
          return Cs;
        },
        Jf7: function () {
          return xs;
        },
        CHM: function () {
          return Bt;
        },
        oJD: function () {
          return ps;
        },
        LSH: function () {
          return ms;
        },
        kYT: function () {
          return nt;
        },
        Udp: function () {
          return vo;
        },
        WFA: function () {
          return so;
        },
        d8E: function () {
          return Ho;
        },
        YNc: function () {
          return qi;
        },
        _uU: function () {
          return Lo;
        },
        Oqu: function () {
          return Do;
        },
        hij: function () {
          return Po;
        },
        AsE: function () {
          return Mo;
        },
        Gf: function () {
          return Ac;
        },
      });
      var s = n(5959),
        r = n(7570),
        i = n(8318),
        o = n(1906),
        a = n(619);
      function c(t) {
        for (let e in t) if (t[e] === c) return e;
        throw Error('Could not find renamed property on target object.');
      }
      function l(t, e) {
        for (const n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function u(t) {
        if ('string' == typeof t) return t;
        if (Array.isArray(t)) return '[' + t.map(u).join(', ') + ']';
        if (null == t) return '' + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return '' + e;
        const n = e.indexOf('\n');
        return -1 === n ? e : e.substring(0, n);
      }
      function h(t, e) {
        return null == t || '' === t
          ? null === e
            ? ''
            : e
          : null == e || '' === e
          ? t
          : t + ' ' + e;
      }
      const d = c({ __forward_ref__: c });
      function f(t) {
        return (
          (t.__forward_ref__ = f),
          (t.toString = function () {
            return u(this());
          }),
          t
        );
      }
      function p(t) {
        return m(t) ? t() : t;
      }
      function m(t) {
        return 'function' == typeof t && t.hasOwnProperty(d) && t.__forward_ref__ === f;
      }
      class g extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ''}${e}`;
            })(t, e),
          ),
            (this.code = t);
        }
      }
      function _(t) {
        return 'string' == typeof t ? t : null == t ? '' : String(t);
      }
      function y(t) {
        return 'function' == typeof t
          ? t.name || t.toString()
          : 'object' == typeof t && null != t && 'function' == typeof t.type
          ? t.type.name || t.type.toString()
          : _(t);
      }
      function b(t, e) {
        const n = e ? ` in ${e}` : '';
        throw new g('201', `No provider for ${y(t)} found${n}`);
      }
      function v(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function w(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function S(t) {
        return E(t, C) || E(t, k);
      }
      function E(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function x(t) {
        return t && (t.hasOwnProperty(T) || t.hasOwnProperty(I)) ? t[T] : null;
      }
      const C = c({ '\u0275prov': c }),
        T = c({ '\u0275inj': c }),
        k = c({ ngInjectableDef: c }),
        I = c({ ngInjectorDef: c });
      var A = (function (t) {
        return (
          (t[(t.Default = 0)] = 'Default'),
          (t[(t.Host = 1)] = 'Host'),
          (t[(t.Self = 2)] = 'Self'),
          (t[(t.SkipSelf = 4)] = 'SkipSelf'),
          (t[(t.Optional = 8)] = 'Optional'),
          t
        );
      })({});
      let F;
      function N(t) {
        const e = F;
        return (F = t), e;
      }
      function O(t, e, n) {
        const s = S(t);
        return s && 'root' == s.providedIn
          ? void 0 === s.value
            ? (s.value = s.factory())
            : s.value
          : n & A.Optional
          ? null
          : void 0 !== e
          ? e
          : void b(u(t), 'Injector');
      }
      function R(t) {
        return { toString: t }.toString();
      }
      var L = (function (t) {
          return (t[(t.OnPush = 0)] = 'OnPush'), (t[(t.Default = 1)] = 'Default'), t;
        })({}),
        D = (function (t) {
          return (
            (t[(t.Emulated = 0)] = 'Emulated'),
            (t[(t.None = 2)] = 'None'),
            (t[(t.ShadowDom = 3)] = 'ShadowDom'),
            t
          );
        })({});
      const P = 'undefined' != typeof globalThis && globalThis,
        M = 'undefined' != typeof window && window,
        j =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        V = 'undefined' != typeof global && global,
        H = P || V || M || j,
        B = {},
        q = [],
        Z = c({ '\u0275cmp': c }),
        z = c({ '\u0275dir': c }),
        G = c({ '\u0275pipe': c }),
        U = c({ '\u0275mod': c }),
        $ = c({ '\u0275loc': c }),
        Y = c({ '\u0275fac': c }),
        Q = c({ __NG_ELEMENT_ID__: c });
      let W = 0;
      function K(t) {
        return R(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === L.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || q,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || D.Emulated,
              id: 'c',
              styles: t.styles || q,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            s = t.directives,
            r = t.features,
            i = t.pipes;
          return (
            (n.id += W++),
            (n.inputs = st(t.inputs, e)),
            (n.outputs = st(t.outputs)),
            r && r.forEach((t) => t(n)),
            (n.directiveDefs = s ? () => ('function' == typeof s ? s() : s).map(J) : null),
            (n.pipeDefs = i ? () => ('function' == typeof i ? i() : i).map(X) : null),
            n
          );
        });
      }
      function J(t) {
        return (
          ot(t) ||
          (function (t) {
            return t[z] || null;
          })(t)
        );
      }
      function X(t) {
        return (function (t) {
          return t[G] || null;
        })(t);
      }
      const tt = {};
      function et(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || q,
          declarations: t.declarations || q,
          imports: t.imports || q,
          exports: t.exports || q,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            R(() => {
              tt[t.id] = t.type;
            }),
          e
        );
      }
      function nt(t, e) {
        return R(() => {
          const n = at(t, !0);
          (n.declarations = e.declarations || q),
            (n.imports = e.imports || q),
            (n.exports = e.exports || q);
        });
      }
      function st(t, e) {
        if (null == t) return B;
        const n = {};
        for (const s in t)
          if (t.hasOwnProperty(s)) {
            let r = t[s],
              i = r;
            Array.isArray(r) && ((i = r[1]), (r = r[0])), (n[r] = s), e && (e[r] = i);
          }
        return n;
      }
      const rt = K;
      function it(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function ot(t) {
        return t[Z] || null;
      }
      function at(t, e) {
        const n = t[U] || null;
        if (!n && !0 === e) throw new Error(`Type ${u(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function ct(t) {
        return Array.isArray(t) && 'object' == typeof t[1];
      }
      function lt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function ut(t) {
        return 0 != (8 & t.flags);
      }
      function ht(t) {
        return 2 == (2 & t.flags);
      }
      function dt(t) {
        return 1 == (1 & t.flags);
      }
      function ft(t) {
        return null !== t.template;
      }
      function pt(t, e) {
        return t.hasOwnProperty(Y) ? t[Y] : null;
      }
      class mt {
        constructor(t, e, n) {
          (this.previousValue = t), (this.currentValue = e), (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function gt() {
        return _t;
      }
      function _t(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = bt), yt;
      }
      function yt() {
        const t = vt(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === B) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function bt(t, e, n, s) {
        const r =
            vt(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: B, current: null }),
          i = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[n],
          c = o[a];
        (i[a] = new mt(c && c.currentValue, e, o === B)), (t[s] = e);
      }
      function vt(t) {
        return t.__ngSimpleChanges__ || null;
      }
      let wt;
      function St(t) {
        wt = t;
      }
      function Et() {
        return void 0 !== wt ? wt : 'undefined' != typeof document ? document : void 0;
      }
      function xt(t) {
        return !!t.listen;
      }
      gt.ngInherit = !0;
      const Ct = { createRenderer: (t, e) => Et() };
      function Tt(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function kt(t, e) {
        return Tt(e[t]);
      }
      function It(t, e) {
        return Tt(e[t.index]);
      }
      function At(t, e) {
        return t.data[e];
      }
      function Ft(t, e) {
        return t[e];
      }
      function Nt(t, e) {
        const n = e[t];
        return ct(n) ? n : n[0];
      }
      function Ot(t) {
        return 4 == (4 & t[2]);
      }
      function Rt(t) {
        return 128 == (128 & t[2]);
      }
      function Lt(t, e) {
        return null == e ? null : t[e];
      }
      function Dt(t) {
        t[18] = 0;
      }
      function Pt(t, e) {
        t[5] += e;
        let n = t,
          s = t[3];
        for (; null !== s && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5])); )
          (s[5] += e), (n = s), (s = s[3]);
      }
      const Mt = { lFrame: ce(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1 };
      function jt() {
        return Mt.bindingsEnabled;
      }
      function Vt() {
        return Mt.lFrame.lView;
      }
      function Ht() {
        return Mt.lFrame.tView;
      }
      function Bt(t) {
        return (Mt.lFrame.contextLView = t), t[8];
      }
      function qt() {
        let t = Zt();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Zt() {
        return Mt.lFrame.currentTNode;
      }
      function zt(t, e) {
        const n = Mt.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function Gt() {
        return Mt.lFrame.isParent;
      }
      function Ut() {
        Mt.lFrame.isParent = !1;
      }
      function $t() {
        return Mt.isInCheckNoChangesMode;
      }
      function Yt(t) {
        Mt.isInCheckNoChangesMode = t;
      }
      function Qt() {
        const t = Mt.lFrame;
        let e = t.bindingRootIndex;
        return -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e;
      }
      function Wt() {
        return Mt.lFrame.bindingIndex;
      }
      function Kt() {
        return Mt.lFrame.bindingIndex++;
      }
      function Jt(t) {
        const e = Mt.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function Xt(t, e) {
        const n = Mt.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), te(e);
      }
      function te(t) {
        Mt.lFrame.currentDirectiveIndex = t;
      }
      function ee(t) {
        const e = Mt.lFrame.currentDirectiveIndex;
        return -1 === e ? null : t[e];
      }
      function ne() {
        return Mt.lFrame.currentQueryIndex;
      }
      function se(t) {
        Mt.lFrame.currentQueryIndex = t;
      }
      function re(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function ie(t, e, n) {
        if (n & A.SkipSelf) {
          let s = e,
            r = t;
          for (
            ;
            (s = s.parent),
              !(
                null !== s ||
                n & A.Host ||
                ((s = re(r)), null === s) ||
                ((r = r[15]), 10 & s.type)
              );

          );
          if (null === s) return !1;
          (e = s), (t = r);
        }
        const s = (Mt.lFrame = ae());
        return (s.currentTNode = e), (s.lView = t), !0;
      }
      function oe(t) {
        const e = ae(),
          n = t[1];
        (Mt.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function ae() {
        const t = Mt.lFrame,
          e = null === t ? null : t.child;
        return null === e ? ce(t) : e;
      }
      function ce(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function le() {
        const t = Mt.lFrame;
        return (Mt.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
      }
      const ue = le;
      function he() {
        const t = le();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function de() {
        return Mt.lFrame.selectedIndex;
      }
      function fe(t) {
        Mt.lFrame.selectedIndex = t;
      }
      function pe() {
        const t = Mt.lFrame;
        return At(t.tView, t.selectedIndex);
      }
      function me() {
        Mt.lFrame.currentNamespace = 'http://www.w3.org/2000/svg';
      }
      function ge() {
        Mt.lFrame.currentNamespace = null;
      }
      function _e(t, e) {
        for (let n = e.directiveStart, s = e.directiveEnd; n < s; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: r,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e;
          s && (t.contentHooks || (t.contentHooks = [])).push(-n, s),
            r &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, r),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, r)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function ye(t, e, n) {
        we(t, e, 3, n);
      }
      function be(t, e, n, s) {
        (3 & t[2]) === n && we(t, e, n, s);
      }
      function ve(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function we(t, e, n, s) {
        const r = null != s ? s : -1,
          i = e.length - 1;
        let o = 0;
        for (let a = void 0 !== s ? 65535 & t[18] : 0; a < i; a++)
          if ('number' == typeof e[a + 1]) {
            if (((o = e[a]), null != s && o >= s)) break;
          } else
            e[a] < 0 && (t[18] += 65536),
              (o < r || -1 == r) && (Se(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++;
      }
      function Se(t, e, n, s) {
        const r = n[s] < 0,
          i = n[s + 1],
          o = t[r ? -n[s] : n[s]];
        if (r) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              i.call(o);
            } finally {
            }
          }
        } else
          try {
            i.call(o);
          } finally {
          }
      }
      class Ee {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function xe(t, e, n) {
        const s = xt(t);
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ('number' == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              a = n[r++],
              c = n[r++];
            s ? t.setAttribute(e, a, c, o) : e.setAttributeNS(o, a, c);
          } else {
            const o = i,
              a = n[++r];
            Te(o)
              ? s && t.setProperty(e, o, a)
              : s
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function Ce(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Te(t) {
        return 64 === t.charCodeAt(0);
      }
      function ke(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let s = 0; s < e.length; s++) {
            const r = e[s];
            'number' == typeof r
              ? (n = r)
              : 0 === n || Ie(t, n, r, null, -1 === n || 2 === n ? e[++s] : null);
          }
        }
        return t;
      }
      function Ie(t, e, n, s, r) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ('number' == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ('number' == typeof e) break;
          if (e === n) {
            if (null === s) return void (null !== r && (t[i + 1] = r));
            if (s === t[i + 1]) return void (t[i + 2] = r);
          }
          i++, null !== s && i++, null !== r && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== s && t.splice(i++, 0, s),
          null !== r && t.splice(i++, 0, r);
      }
      function Ae(t) {
        return -1 !== t;
      }
      function Fe(t) {
        return 32767 & t;
      }
      function Ne(t, e) {
        let n = t >> 16,
          s = e;
        for (; n > 0; ) (s = s[15]), n--;
        return s;
      }
      let Oe = !0;
      function Re(t) {
        const e = Oe;
        return (Oe = t), e;
      }
      let Le = 0;
      function De(t, e) {
        const n = Me(t, e);
        if (-1 !== n) return n;
        const s = e[1];
        s.firstCreatePass &&
          ((t.injectorIndex = e.length), Pe(s.data, t), Pe(e, null), Pe(s.blueprint, null));
        const r = je(t, e),
          i = t.injectorIndex;
        if (Ae(r)) {
          const t = Fe(r),
            n = Ne(r, e),
            s = n[1].data;
          for (let r = 0; r < 8; r++) e[i + r] = n[t + r] | s[t + r];
        }
        return (e[i + 8] = r), i;
      }
      function Pe(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Me(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function je(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
        let n = 0,
          s = null,
          r = e;
        for (; null !== r; ) {
          const t = r[1],
            e = t.type;
          if (((s = 2 === e ? t.declTNode : 1 === e ? r[6] : null), null === s)) return -1;
          if ((n++, (r = r[15]), -1 !== s.injectorIndex)) return s.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Ve(t, e, n) {
        !(function (t, e, n) {
          let s;
          'string' == typeof n ? (s = n.charCodeAt(0) || 0) : n.hasOwnProperty(Q) && (s = n[Q]),
            null == s && (s = n[Q] = Le++);
          const r = 255 & s;
          e.data[t + (r >> 5)] |= 1 << r;
        })(t, e, n);
      }
      function He(t, e, n) {
        if (n & A.Optional) return t;
        b(e, 'NodeInjector');
      }
      function Be(t, e, n, s) {
        if ((n & A.Optional && void 0 === s && (s = null), 0 == (n & (A.Self | A.Host)))) {
          const r = t[9],
            i = N(void 0);
          try {
            return r ? r.get(e, s, n & A.Optional) : O(e, s, n & A.Optional);
          } finally {
            N(i);
          }
        }
        return He(s, e, n);
      }
      function qe(t, e, n, s = A.Default, r) {
        if (null !== t) {
          const i = (function (t) {
            if ('string' == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Q) ? t[Q] : void 0;
            return 'number' == typeof e ? (e >= 0 ? 255 & e : ze) : e;
          })(n);
          if ('function' == typeof i) {
            if (!ie(e, t, s)) return s & A.Host ? He(r, n, s) : Be(e, n, s, r);
            try {
              const t = i(s);
              if (null != t || s & A.Optional) return t;
              b(n);
            } finally {
              ue();
            }
          } else if ('number' == typeof i) {
            let r = null,
              o = Me(t, e),
              a = -1,
              c = s & A.Host ? e[16][6] : null;
            for (
              (-1 === o || s & A.SkipSelf) &&
              ((a = -1 === o ? je(t, e) : e[o + 8]),
              -1 !== a && Qe(s, !1) ? ((r = e[1]), (o = Fe(a)), (e = Ne(a, e))) : (o = -1));
              -1 !== o;

            ) {
              const t = e[1];
              if (Ye(i, o, t.data)) {
                const t = Ge(o, e, n, r, s, c);
                if (t !== Ze) return t;
              }
              (a = e[o + 8]),
                -1 !== a && Qe(s, e[1].data[o + 8] === c) && Ye(i, o, e)
                  ? ((r = t), (o = Fe(a)), (e = Ne(a, e)))
                  : (o = -1);
            }
          }
        }
        return Be(e, n, s, r);
      }
      const Ze = {};
      function ze() {
        return new We(qt(), Vt());
      }
      function Ge(t, e, n, s, r, i) {
        const o = e[1],
          a = o.data[t + 8],
          c = Ue(
            a,
            o,
            n,
            null == s ? ht(a) && Oe : s != o && 0 != (3 & a.type),
            r & A.Host && i === a,
          );
        return null !== c ? $e(e, o, c, a) : Ze;
      }
      function Ue(t, e, n, s, r) {
        const i = t.providerIndexes,
          o = e.data,
          a = 1048575 & i,
          c = t.directiveStart,
          l = i >> 20,
          u = r ? a + l : t.directiveEnd;
        for (let h = s ? a : a + l; h < u; h++) {
          const t = o[h];
          if ((h < c && n === t) || (h >= c && t.type === n)) return h;
        }
        if (r) {
          const t = o[c];
          if (t && ft(t) && t.type === n) return c;
        }
        return null;
      }
      function $e(t, e, n, s) {
        let r = t[n];
        const i = e.data;
        if (r instanceof Ee) {
          const o = r;
          o.resolving &&
            (function (t, e) {
              throw new g('200', `Circular dependency in DI detected for ${t}`);
            })(y(i[n]));
          const a = Re(o.canSeeViewProviders);
          o.resolving = !0;
          const c = o.injectImpl ? N(o.injectImpl) : null;
          ie(t, s, A.Default);
          try {
            (r = t[n] = o.factory(void 0, i, t, s)),
              e.firstCreatePass &&
                n >= s.directiveStart &&
                (function (t, e, n) {
                  const { ngOnChanges: s, ngOnInit: r, ngDoCheck: i } = e.type.prototype;
                  if (s) {
                    const s = _t(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, s);
                  }
                  r && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, r),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i));
                })(n, i[n], e);
          } finally {
            null !== c && N(c), Re(a), (o.resolving = !1), ue();
          }
        }
        return r;
      }
      function Ye(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function Qe(t, e) {
        return !(t & A.Self || (t & A.Host && e));
      }
      class We {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return qe(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Ke(t) {
        return R(() => {
          const e = t.prototype.constructor,
            n = e[Y] || Je(e),
            s = Object.prototype;
          let r = Object.getPrototypeOf(t.prototype).constructor;
          for (; r && r !== s; ) {
            const t = r[Y] || Je(r);
            if (t && t !== n) return t;
            r = Object.getPrototypeOf(r);
          }
          return (t) => new t();
        });
      }
      function Je(t) {
        return m(t)
          ? () => {
              const e = Je(p(t));
              return e && e();
            }
          : pt(t);
      }
      function Xe(t) {
        return (function (t, e) {
          if ('class' === e) return t.classes;
          if ('style' === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let s = 0;
            for (; s < t; ) {
              const r = n[s];
              if (Ce(r)) break;
              if (0 === r) s += 2;
              else if ('number' == typeof r) for (s++; s < t && 'string' == typeof n[s]; ) s++;
              else {
                if (r === e) return n[s + 1];
                s += 2;
              }
            }
          }
          return null;
        })(qt(), t);
      }
      function tn(t, e, n) {
        return R(() => {
          const s = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function r(...t) {
            if (this instanceof r) return s.apply(this, t), this;
            const e = new r(...t);
            return (n.annotation = e), n;
            function n(t, n, s) {
              const r = t.hasOwnProperty('__parameters__')
                ? t.__parameters__
                : Object.defineProperty(t, '__parameters__', { value: [] }).__parameters__;
              for (; r.length <= s; ) r.push(null);
              return (r[s] = r[s] || []).push(e), t;
            }
          }
          return (
            n && (r.prototype = Object.create(n.prototype)),
            (r.prototype.ngMetadataName = t),
            (r.annotationCls = r),
            r
          );
        });
      }
      class en {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = v({
                  token: this,
                  providedIn: e.providedIn || 'root',
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const nn = new en('AnalyzeForEntryComponents'),
        sn = Function;
      function rn(t, e) {
        void 0 === e && (e = t);
        for (let n = 0; n < t.length; n++) {
          let s = t[n];
          Array.isArray(s) ? (e === t && (e = t.slice(0, n)), rn(s, e)) : e !== t && e.push(s);
        }
        return e;
      }
      function on(t, e) {
        t.forEach((t) => (Array.isArray(t) ? on(t, e) : e(t)));
      }
      function an(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function cn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function ln(t, e) {
        const n = [];
        for (let s = 0; s < t; s++) n.push(e);
        return n;
      }
      function un(t, e, n) {
        let s = dn(t, e);
        return (
          s >= 0
            ? (t[1 | s] = n)
            : ((s = ~s),
              (function (t, e, n, s) {
                let r = t.length;
                if (r == e) t.push(n, s);
                else if (1 === r) t.push(s, t[0]), (t[0] = n);
                else {
                  for (r--, t.push(t[r - 1], t[r]); r > e; ) (t[r] = t[r - 2]), r--;
                  (t[e] = n), (t[e + 1] = s);
                }
              })(t, s, e, n)),
          s
        );
      }
      function hn(t, e) {
        const n = dn(t, e);
        if (n >= 0) return t[1 | n];
      }
      function dn(t, e) {
        return (function (t, e, n) {
          let s = 0,
            r = t.length >> 1;
          for (; r !== s; ) {
            const n = s + ((r - s) >> 1),
              i = t[n << 1];
            if (e === i) return n << 1;
            i > e ? (r = n) : (s = n + 1);
          }
          return ~(r << 1);
        })(t, e);
      }
      const fn = {},
        pn = /\n/gm,
        mn = c({ provide: String, useValue: c });
      let gn;
      function _n(t) {
        const e = gn;
        return (gn = t), e;
      }
      function yn(t, e = A.Default) {
        if (void 0 === gn) throw new Error('inject() must be called from an injection context');
        return null === gn ? O(t, void 0, e) : gn.get(t, e & A.Optional ? null : void 0, e);
      }
      function bn(t, e = A.Default) {
        return (F || yn)(p(t), e);
      }
      const vn = bn;
      function wn(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const s = p(t[n]);
          if (Array.isArray(s)) {
            if (0 === s.length) throw new Error('Arguments array must have arguments.');
            let t,
              n = A.Default;
            for (let e = 0; e < s.length; e++) {
              const r = s[e],
                i = r.__NG_DI_FLAG__;
              'number' == typeof i ? (-1 === i ? (t = r.token) : (n |= i)) : (t = r);
            }
            e.push(bn(t, n));
          } else e.push(bn(s));
        }
        return e;
      }
      function Sn(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t;
      }
      const En = Sn(
          tn('Inject', (t) => ({ token: t })),
          -1,
        ),
        xn = Sn(tn('Optional'), 8),
        Cn = Sn(tn('SkipSelf'), 4);
      let Tn, kn;
      function In(t) {
        var e;
        return (
          (null ===
            (e = (function () {
              if (void 0 === Tn && ((Tn = null), H.trustedTypes))
                try {
                  Tn = H.trustedTypes.createPolicy('angular', {
                    createHTML: (t) => t,
                    createScript: (t) => t,
                    createScriptURL: (t) => t,
                  });
                } catch (e) {}
              return Tn;
            })()) || void 0 === e
            ? void 0
            : e.createHTML(t)) || t
        );
      }
      function An(t) {
        var e;
        return (
          (null ===
            (e = (function () {
              if (void 0 === kn && ((kn = null), H.trustedTypes))
                try {
                  kn = H.trustedTypes.createPolicy('angular#unsafe-bypass', {
                    createHTML: (t) => t,
                    createScript: (t) => t,
                    createScriptURL: (t) => t,
                  });
                } catch (e) {}
              return kn;
            })()) || void 0 === e
            ? void 0
            : e.createHTML(t)) || t
        );
      }
      class Fn {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class Nn extends Fn {
        getTypeName() {
          return 'HTML';
        }
      }
      class On extends Fn {
        getTypeName() {
          return 'Style';
        }
      }
      class Rn extends Fn {
        getTypeName() {
          return 'Script';
        }
      }
      class Ln extends Fn {
        getTypeName() {
          return 'URL';
        }
      }
      class Dn extends Fn {
        getTypeName() {
          return 'ResourceURL';
        }
      }
      function Pn(t) {
        return t instanceof Fn ? t.changingThisBreaksApplicationSecurity : t;
      }
      function Mn(t, e) {
        const n = jn(t);
        if (null != n && n !== e) {
          if ('ResourceURL' === n && 'URL' === e) return !0;
          throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`);
        }
        return n === e;
      }
      function jn(t) {
        return (t instanceof Fn && t.getTypeName()) || null;
      }
      function Vn(t) {
        return new Nn(t);
      }
      function Hn(t) {
        return new On(t);
      }
      function Bn(t) {
        return new Rn(t);
      }
      function qn(t) {
        return new Ln(t);
      }
      function Zn(t) {
        return new Dn(t);
      }
      class zn {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t;
          try {
            const e = new window.DOMParser().parseFromString(In(t), 'text/html').body;
            return null === e
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (e.removeChild(e.firstChild), e);
          } catch (e) {
            return null;
          }
        }
      }
      class Gn {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              'sanitization-inert',
            )),
            null == this.inertDocument.body)
          ) {
            const t = this.inertDocument.createElement('html');
            this.inertDocument.appendChild(t);
            const e = this.inertDocument.createElement('body');
            t.appendChild(e);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement('template');
          if ('content' in e) return (e.innerHTML = In(t)), e;
          const n = this.inertDocument.createElement('body');
          return (
            (n.innerHTML = In(t)), this.defaultDoc.documentMode && this.stripCustomNsAttrs(n), n
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let s = e.length - 1; 0 < s; s--) {
            const n = e.item(s).name;
            ('xmlns:ns1' !== n && 0 !== n.indexOf('ns1:')) || t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n), (n = n.nextSibling);
        }
      }
      const Un = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        $n = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Yn(t) {
        return (t = String(t)).match(Un) || t.match($n) ? t : 'unsafe:' + t;
      }
      function Qn(t) {
        const e = {};
        for (const n of t.split(',')) e[n] = !0;
        return e;
      }
      function Wn(...t) {
        const e = {};
        for (const n of t) for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const Kn = Qn('area,br,col,hr,img,wbr'),
        Jn = Qn('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        Xn = Qn('rp,rt'),
        ts = Wn(Xn, Jn),
        es = Wn(
          Kn,
          Wn(
            Jn,
            Qn(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul',
            ),
          ),
          Wn(
            Xn,
            Qn(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video',
            ),
          ),
          ts,
        ),
        ns = Qn('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        ss = Qn('srcset'),
        rs = Wn(
          ns,
          ss,
          Qn(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width',
          ),
          Qn(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext',
          ),
        ),
        is = Qn('script,style,template');
      class os {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join('');
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!es.hasOwnProperty(e)) return (this.sanitizedSomething = !0), !is.hasOwnProperty(e);
          this.buf.push('<'), this.buf.push(e);
          const n = t.attributes;
          for (let r = 0; r < n.length; r++) {
            const t = n.item(r),
              e = t.name,
              i = e.toLowerCase();
            if (!rs.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            ns[i] && (o = Yn(o)),
              ss[i] &&
                ((s = o),
                (o = (s = String(s))
                  .split(',')
                  .map((t) => Yn(t.trim()))
                  .join(', '))),
              this.buf.push(' ', e, '="', ls(o), '"');
          }
          var s;
          return this.buf.push('>'), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          es.hasOwnProperty(e) &&
            !Kn.hasOwnProperty(e) &&
            (this.buf.push('</'), this.buf.push(e), this.buf.push('>'));
        }
        chars(t) {
          this.buf.push(ls(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`,
            );
          return e;
        }
      }
      const as = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        cs = /([^\#-~ |!])/g;
      function ls(t) {
        return t
          .replace(/&/g, '&amp;')
          .replace(as, function (t) {
            return (
              '&#' + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ';'
            );
          })
          .replace(cs, function (t) {
            return '&#' + t.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let us;
      function hs(t, e) {
        let n = null;
        try {
          us =
            us ||
            (function (t) {
              const e = new Gn(t);
              return (function () {
                try {
                  return !!new window.DOMParser().parseFromString(In(''), 'text/html');
                } catch (t) {
                  return !1;
                }
              })()
                ? new zn(e)
                : e;
            })(t);
          let s = e ? String(e) : '';
          n = us.getInertBodyElement(s);
          let r = 5,
            i = s;
          do {
            if (0 === r) throw new Error('Failed to sanitize html because the input is unstable');
            r--, (s = i), (i = n.innerHTML), (n = us.getInertBodyElement(s));
          } while (s !== i);
          return In(new os().sanitizeChildren(ds(n) || n));
        } finally {
          if (n) {
            const t = ds(n) || n;
            for (; t.firstChild; ) t.removeChild(t.firstChild);
          }
        }
      }
      function ds(t) {
        return 'content' in t &&
          (function (t) {
            return t.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === t.nodeName;
          })(t)
          ? t.content
          : null;
      }
      var fs = (function (t) {
        return (
          (t[(t.NONE = 0)] = 'NONE'),
          (t[(t.HTML = 1)] = 'HTML'),
          (t[(t.STYLE = 2)] = 'STYLE'),
          (t[(t.SCRIPT = 3)] = 'SCRIPT'),
          (t[(t.URL = 4)] = 'URL'),
          (t[(t.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          t
        );
      })({});
      function ps(t) {
        const e = gs();
        return e ? An(e.sanitize(fs.HTML, t) || '') : Mn(t, 'HTML') ? An(Pn(t)) : hs(Et(), _(t));
      }
      function ms(t) {
        const e = gs();
        return e ? e.sanitize(fs.URL, t) || '' : Mn(t, 'URL') ? Pn(t) : Yn(_(t));
      }
      function gs() {
        const t = Vt();
        return t && t[12];
      }
      function _s(t, e) {
        t.__ngContext__ = e;
      }
      function ys(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function bs(t) {
        return t.ngDebugContext;
      }
      function vs(t) {
        return t.ngOriginalError;
      }
      function ws(t, ...e) {
        t.error(...e);
      }
      class Ss {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            s = (function (t) {
              return t.ngErrorLogger || ws;
            })(t);
          s(this._console, 'ERROR', t),
            e && s(this._console, 'ORIGINAL ERROR', e),
            n && s(this._console, 'ERROR CONTEXT', n);
        }
        _findContext(t) {
          return t ? (bs(t) ? bs(t) : this._findContext(vs(t))) : null;
        }
        _findOriginalError(t) {
          let e = vs(t);
          for (; e && vs(e); ) e = vs(e);
          return e;
        }
      }
      const Es = (() =>
        (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(
          H,
        ))();
      function xs(t) {
        return { name: 'window', target: t.ownerDocument.defaultView };
      }
      function Cs(t) {
        return { name: 'document', target: t.ownerDocument };
      }
      function Ts(t) {
        return t instanceof Function ? t() : t;
      }
      var ks = (function (t) {
        return (t[(t.Important = 1)] = 'Important'), (t[(t.DashCase = 2)] = 'DashCase'), t;
      })({});
      function Is(t, e) {
        return (void 0)(t, e);
      }
      function As(t) {
        const e = t[3];
        return lt(e) ? e[3] : e;
      }
      function Fs(t) {
        return Os(t[13]);
      }
      function Ns(t) {
        return Os(t[4]);
      }
      function Os(t) {
        for (; null !== t && !lt(t); ) t = t[4];
        return t;
      }
      function Rs(t, e, n, s, r) {
        if (null != s) {
          let i,
            o = !1;
          lt(s) ? (i = s) : ct(s) && ((o = !0), (s = s[0]));
          const a = Tt(s);
          0 === t && null !== n
            ? null == r
              ? Bs(e, n, a)
              : Hs(e, n, a, r || null, !0)
            : 1 === t && null !== n
            ? Hs(e, n, a, r || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const s = Zs(t, e);
                s &&
                  (function (t, e, n, s) {
                    xt(t) ? t.removeChild(e, n, s) : e.removeChild(n);
                  })(t, s, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, s, r) {
                const i = n[7];
                i !== Tt(n) && Rs(e, t, s, i, r);
                for (let o = 10; o < n.length; o++) {
                  const r = n[o];
                  Ks(r[1], r, t, e, s, i);
                }
              })(e, t, i, n, r);
        }
      }
      function Ls(t, e, n) {
        return xt(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function Ds(t, e) {
        const n = t[9],
          s = n.indexOf(e),
          r = e[3];
        1024 & e[2] && ((e[2] &= -1025), Pt(r, -1)), n.splice(s, 1);
      }
      function Ps(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          s = t[n];
        if (s) {
          const i = s[17];
          null !== i && i !== t && Ds(i, s), e > 0 && (t[n - 1][4] = s[4]);
          const o = cn(t, 10 + e);
          Ks(s[1], (r = s), r[11], 2, null, null), (r[0] = null), (r[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]), (s[3] = null), (s[4] = null), (s[2] &= -129);
        }
        var r;
        return s;
      }
      function Ms(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          xt(n) && n.destroyNode && Ks(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return js(t[1], t);
              for (; e; ) {
                let n = null;
                if (ct(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; ) ct(e) && js(e[1], e), (e = e[3]);
                  null === e && (e = t), ct(e) && js(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function js(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let s = 0; s < n.length; s += 2) {
                  const t = e[n[s]];
                  if (!(t instanceof Ee)) {
                    const e = n[s + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2) e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                s = e[7];
              let r = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const t = n[i + 1],
                      o = 'function' == typeof t ? t(e) : Tt(e[t]),
                      a = s[(r = n[i + 2])],
                      c = n[i + 3];
                    'boolean' == typeof c
                      ? o.removeEventListener(n[i], a, c)
                      : c >= 0
                      ? s[(r = c)]()
                      : s[(r = -c)].unsubscribe(),
                      (i += 2);
                  } else {
                    const t = s[(r = n[i + 1])];
                    n[i].call(t);
                  }
              if (null !== s) {
                for (let t = r + 1; t < s.length; t++) (0, s[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && xt(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && lt(e[3])) {
            n !== e[3] && Ds(n, e);
            const s = e[19];
            null !== s && s.detachView(t);
          }
        }
      }
      function Vs(t, e, n) {
        return (function (t, e, n) {
          let s = e;
          for (; null !== s && 40 & s.type; ) s = (e = s).parent;
          if (null === s) return n[0];
          if (2 & s.flags) {
            const e = t.data[s.directiveStart].encapsulation;
            if (e === D.None || e === D.Emulated) return null;
          }
          return It(s, n);
        })(t, e.parent, n);
      }
      function Hs(t, e, n, s, r) {
        xt(t) ? t.insertBefore(e, n, s, r) : e.insertBefore(n, s, r);
      }
      function Bs(t, e, n) {
        xt(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function qs(t, e, n, s, r) {
        null !== s ? Hs(t, e, n, s, r) : Bs(t, e, n);
      }
      function Zs(t, e) {
        return xt(t) ? t.parentNode(e) : e.parentNode;
      }
      function zs(t, e, n) {
        return Gs(t, e, n);
      }
      let Gs = function (t, e, n) {
        return 40 & t.type ? It(t, n) : null;
      };
      function Us(t, e, n, s) {
        const r = Vs(t, s, e),
          i = e[11],
          o = zs(s.parent || e[6], s, e);
        if (null != r)
          if (Array.isArray(n)) for (let a = 0; a < n.length; a++) qs(i, r, n[a], o, !1);
          else qs(i, r, n, o, !1);
      }
      function $s(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return It(e, t);
          if (4 & n) return Qs(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return $s(t, n);
            {
              const n = t[e.index];
              return lt(n) ? Qs(-1, n) : Tt(n);
            }
          }
          if (32 & n) return Is(e, t)() || Tt(t[e.index]);
          {
            const n = Ys(t, e);
            return null !== n ? (Array.isArray(n) ? n[0] : $s(As(t[16]), n)) : $s(t, e.next);
          }
        }
        return null;
      }
      function Ys(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function Qs(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const t = e[n],
            s = t[1].firstChild;
          if (null !== s) return $s(t, s);
        }
        return e[7];
      }
      function Ws(t, e, n, s, r, i, o) {
        for (; null != n; ) {
          const a = s[n.index],
            c = n.type;
          if ((o && 0 === e && (a && _s(Tt(a), s), (n.flags |= 4)), 64 != (64 & n.flags)))
            if (8 & c) Ws(t, e, n.child, s, r, i, !1), Rs(e, t, r, a, i);
            else if (32 & c) {
              const o = Is(n, s);
              let c;
              for (; (c = o()); ) Rs(e, t, r, c, i);
              Rs(e, t, r, a, i);
            } else 16 & c ? Js(t, e, s, n, r, i) : Rs(e, t, r, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function Ks(t, e, n, s, r, i) {
        Ws(n, s, t.firstChild, e, r, i, !1);
      }
      function Js(t, e, n, s, r, i) {
        const o = n[16],
          a = o[6].projection[s.projection];
        if (Array.isArray(a)) for (let c = 0; c < a.length; c++) Rs(e, t, r, a[c], i);
        else Ws(t, e, a, o[3], r, i, !0);
      }
      function Xs(t, e, n) {
        xt(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n);
      }
      function tr(t, e, n) {
        xt(t)
          ? '' === n
            ? t.removeAttribute(e, 'class')
            : t.setAttribute(e, 'class', n)
          : (e.className = n);
      }
      function er(t, e, n) {
        let s = t.length;
        for (;;) {
          const r = t.indexOf(e, n);
          if (-1 === r) return r;
          if (0 === r || t.charCodeAt(r - 1) <= 32) {
            const n = e.length;
            if (r + n === s || t.charCodeAt(r + n) <= 32) return r;
          }
          n = r + 1;
        }
      }
      function nr(t, e, n) {
        let s = 0;
        for (; s < t.length; ) {
          let r = t[s++];
          if (n && 'class' === r) {
            if (((r = t[s]), -1 !== er(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; s < t.length && 'string' == typeof (r = t[s++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function sr(t) {
        return 4 === t.type && 'ng-template' !== t.value;
      }
      function rr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : 'ng-template');
      }
      function ir(t, e, n) {
        let s = 4;
        const r = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (Ce(t[e])) return e;
            return t.length;
          })(r);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const c = e[a];
          if ('number' != typeof c) {
            if (!o)
              if (4 & s) {
                if (
                  ((s = 2 | (1 & s)), ('' !== c && !rr(t, c, n)) || ('' === c && 1 === e.length))
                ) {
                  if (or(s)) return !1;
                  o = !0;
                }
              } else {
                const l = 8 & s ? c : e[++a];
                if (8 & s && null !== t.attrs) {
                  if (!nr(t.attrs, l, n)) {
                    if (or(s)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = ar(8 & s ? 'class' : c, r, sr(t), n);
                if (-1 === u) {
                  if (or(s)) return !1;
                  o = !0;
                  continue;
                }
                if ('' !== l) {
                  let t;
                  t = u > i ? '' : r[u + 1].toLowerCase();
                  const e = 8 & s ? t : null;
                  if ((e && -1 !== er(e, l, 0)) || (2 & s && l !== t)) {
                    if (or(s)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !or(s) && !or(c)) return !1;
            if (o && or(c)) continue;
            (o = !1), (s = c | (1 & s));
          }
        }
        return or(s) || o;
      }
      function or(t) {
        return 0 == (1 & t);
      }
      function ar(t, e, n, s) {
        if (null === e) return -1;
        let r = 0;
        if (s || !n) {
          let n = !1;
          for (; r < e.length; ) {
            const s = e[r];
            if (s === t) return r;
            if (3 === s || 6 === s) n = !0;
            else {
              if (1 === s || 2 === s) {
                let t = e[++r];
                for (; 'string' == typeof t; ) t = e[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const s = t[n];
              if ('number' == typeof s) return -1;
              if (s === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function cr(t, e, n = !1) {
        for (let s = 0; s < e.length; s++) if (ir(t, e[s], n)) return !0;
        return !1;
      }
      function lr(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const s = e[n];
          if (t.length === s.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== s[e]) continue t;
            return !0;
          }
        }
        return !1;
      }
      function ur(t, e) {
        return t ? ':not(' + e.trim() + ')' : e;
      }
      function hr(t) {
        let e = t[0],
          n = 1,
          s = 2,
          r = '',
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ('string' == typeof o)
            if (2 & s) {
              const e = t[++n];
              r += '[' + o + (e.length > 0 ? '="' + e + '"' : '') + ']';
            } else 8 & s ? (r += '.' + o) : 4 & s && (r += ' ' + o);
          else '' === r || or(o) || ((e += ur(i, r)), (r = '')), (s = o), (i = i || !or(s));
          n++;
        }
        return '' !== r && (e += ur(i, r)), e;
      }
      const dr = {};
      function fr(t) {
        pr(Ht(), Vt(), de() + t, $t());
      }
      function pr(t, e, n, s) {
        if (!s)
          if (3 == (3 & e[2])) {
            const s = t.preOrderCheckHooks;
            null !== s && ye(e, s, n);
          } else {
            const s = t.preOrderHooks;
            null !== s && be(e, s, 0, n);
          }
        fe(n);
      }
      function mr(t, e) {
        return (t << 17) | (e << 2);
      }
      function gr(t) {
        return (t >> 17) & 32767;
      }
      function _r(t) {
        return 2 | t;
      }
      function yr(t) {
        return (131068 & t) >> 2;
      }
      function br(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function vr(t) {
        return 1 | t;
      }
      function wr(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) {
            const r = n[s],
              i = n[s + 1];
            if (-1 !== i) {
              const n = t.data[i];
              se(r), n.contentQueries(2, e[i], i);
            }
          }
      }
      function Sr(t, e, n, s, r, i, o, a, c, l) {
        const u = e.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | s),
          Dt(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = c || (t && t[12]) || null),
          (u[9] = l || (t && t[9]) || null),
          (u[6] = i),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Er(t, e, n, s, r) {
        let i = t.data[e];
        if (null === i)
          (i = (function (t, e, n, s, r) {
            const i = Zt(),
              o = Gt(),
              a = (t.data[e] = (function (t, e, n, s, r, i) {
                return {
                  type: n,
                  index: s,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, e, s, r));
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== i &&
                (o
                  ? null == i.child && null !== a.parent && (i.child = a)
                  : null === i.next && (i.next = a)),
              a
            );
          })(t, e, n, s, r)),
            Mt.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = s), (i.attrs = r);
          const t = (function () {
            const t = Mt.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return zt(i, !0), i;
      }
      function xr(t, e, n, s) {
        if (0 === n) return -1;
        const r = e.length;
        for (let i = 0; i < n; i++) e.push(s), t.blueprint.push(s), t.data.push(null);
        return r;
      }
      function Cr(t, e, n) {
        oe(e);
        try {
          const s = t.viewQuery;
          null !== s && ei(1, s, n);
          const r = t.template;
          null !== r && Ir(t, e, r, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && wr(t, e),
            t.staticViewQueries && ei(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Wr(t, e[n]);
            })(e, i);
        } catch (s) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), s);
        } finally {
          (e[2] &= -5), he();
        }
      }
      function Tr(t, e, n, s) {
        const r = e[2];
        if (256 == (256 & r)) return;
        oe(e);
        const i = $t();
        try {
          Dt(e), (Mt.lFrame.bindingIndex = t.bindingStartIndex), null !== n && Ir(t, e, n, 2, s);
          const o = 3 == (3 & r);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && ye(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && be(e, n, 0, null), ve(e, 0);
            }
          if (
            ((function (t) {
              for (let e = Fs(t); null !== e; e = Ns(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    s = n[3];
                  0 == (1024 & n[2]) && Pt(s, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = Fs(t); null !== e; e = Ns(e))
                for (let t = 10; t < e.length; t++) {
                  const n = e[t],
                    s = n[1];
                  Rt(n) && Tr(s, n, s.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && wr(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && ye(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && be(e, n, 1), ve(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const s = n[t];
                  if (s < 0) fe(~s);
                  else {
                    const r = s,
                      i = n[++t],
                      o = n[++t];
                    Xt(i, r), o(2, e[r]);
                  }
                }
              } finally {
                fe(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Yr(t, e[n]);
            })(e, a);
          const c = t.viewQuery;
          if ((null !== c && ei(2, c, s), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && ye(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && be(e, n, 2), ve(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Pt(e[3], -1));
        } finally {
          he();
        }
      }
      function kr(t, e, n, s) {
        const r = e[10],
          i = !$t(),
          o = Ot(e);
        try {
          i && !o && r.begin && r.begin(), o && Cr(t, e, s), Tr(t, e, n, s);
        } finally {
          i && !o && r.end && r.end();
        }
      }
      function Ir(t, e, n, s, r) {
        const i = de(),
          o = 2 & s;
        try {
          fe(-1), o && e.length > 20 && pr(t, e, 20, $t()), n(s, r);
        } finally {
          fe(i);
        }
      }
      function Ar(t, e, n) {
        if (ut(e)) {
          const s = e.directiveEnd;
          for (let r = e.directiveStart; r < s; r++) {
            const e = t.data[r];
            e.contentQueries && e.contentQueries(1, n[r], r);
          }
        }
      }
      function Fr(t, e, n) {
        jt() &&
          ((function (t, e, n, s) {
            const r = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || De(n, e), _s(s, e);
            const o = n.initialInputs;
            for (let a = r; a < i; a++) {
              const s = t.data[a],
                i = ft(s);
              i && zr(e, n, s);
              const c = $e(e, t, a, n);
              _s(c, e), null !== o && Gr(0, a - r, c, s, 0, o), i && (Nt(n.index, e)[8] = c);
            }
          })(t, e, n, It(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const s = n.directiveStart,
                r = n.directiveEnd,
                i = n.index,
                o = Mt.lFrame.currentDirectiveIndex;
              try {
                fe(i);
                for (let n = s; n < r; n++) {
                  const s = t.data[n],
                    r = e[n];
                  te(n),
                    (null === s.hostBindings && 0 === s.hostVars && null === s.hostAttrs) ||
                      Vr(s, r);
                }
              } finally {
                fe(-1), te(o);
              }
            })(t, e, n));
      }
      function Nr(t, e, n = It) {
        const s = e.localNames;
        if (null !== s) {
          let r = e.index + 1;
          for (let i = 0; i < s.length; i += 2) {
            const o = s[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[r++] = a;
          }
        }
      }
      function Or(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Rr(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts,
            ))
          : e;
      }
      function Rr(t, e, n, s, r, i, o, a, c, l) {
        const u = 20 + s,
          h = u + r,
          d = (function (t, e) {
            const n = [];
            for (let s = 0; s < e; s++) n.push(s < t ? null : dr);
            return n;
          })(u, h),
          f = 'function' == typeof l ? l() : l;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof o ? o() : o,
          firstChild: null,
          schemas: c,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function Lr(t, e, n, s) {
        const r = si(e);
        null === n ? r.push(s) : (r.push(n), t.firstCreatePass && ri(t).push(s, r.length - 1));
      }
      function Dr(t, e, n) {
        for (let s in t)
          if (t.hasOwnProperty(s)) {
            const r = t[s];
            (n = null === n ? {} : n).hasOwnProperty(s) ? n[s].push(e, r) : (n[s] = [e, r]);
          }
        return n;
      }
      function Pr(t, e, n, s, r, i, o, a) {
        const c = It(e, n);
        let l,
          u = e.inputs;
        var h;
        !a && null != u && (l = u[s])
          ? (ai(t, n, l, s, r),
            ht(e) &&
              (function (t, e) {
                const n = Nt(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 & e.type &&
            ((s =
              'class' === (h = s)
                ? 'className'
                : 'for' === h
                ? 'htmlFor'
                : 'formaction' === h
                ? 'formAction'
                : 'innerHtml' === h
                ? 'innerHTML'
                : 'readonly' === h
                ? 'readOnly'
                : 'tabindex' === h
                ? 'tabIndex'
                : h),
            (r = null != o ? o(r, e.value || '', s) : r),
            xt(i)
              ? i.setProperty(c, s, r)
              : Te(s) || (c.setProperty ? c.setProperty(s, r) : (c[s] = r)));
      }
      function Mr(t, e, n, s) {
        let r = !1;
        if (jt()) {
          const i = (function (t, e, n) {
              const s = t.directiveRegistry;
              let r = null;
              if (s)
                for (let i = 0; i < s.length; i++) {
                  const o = s[i];
                  cr(n, o.selectors, !1) &&
                    (r || (r = []),
                    Ve(De(n, e), t, o.type),
                    ft(o) ? (Hr(t, n), r.unshift(o)) : r.push(o));
                }
              return r;
            })(t, e, n),
            o = null === s ? null : { '': -1 };
          if (null !== i) {
            (r = !0), qr(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            let s = !1,
              a = !1,
              c = xr(t, e, i.length, null);
            for (let r = 0; r < i.length; r++) {
              const l = i[r];
              (n.mergedAttrs = ke(n.mergedAttrs, l.hostAttrs)),
                Zr(t, n, e, c, l),
                Br(c, l, o),
                null !== l.contentQueries && (n.flags |= 8),
                (null === l.hostBindings && null === l.hostAttrs && 0 === l.hostVars) ||
                  (n.flags |= 128);
              const u = l.type.prototype;
              !s &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), (s = !0)),
                a ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), (a = !0)),
                c++;
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                s = t.data,
                r = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let c = e.directiveStart; c < n; c++) {
                const t = s[c],
                  n = t.inputs,
                  l = null === r || sr(e) ? null : Ur(n, r);
                i.push(l), (o = Dr(n, c, o)), (a = Dr(t.outputs, c, a));
              }
              null !== o &&
                (o.hasOwnProperty('class') && (e.flags |= 16),
                o.hasOwnProperty('style') && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const s = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const r = n[e[t + 1]];
                  if (null == r) throw new g('301', `Export of name '${e[t + 1]}' not found!`);
                  s.push(e[t], r);
                }
              }
            })(n, s, o);
        }
        return (n.mergedAttrs = ke(n.mergedAttrs, n.attrs)), r;
      }
      function jr(t, e, n, s, r, i) {
        const o = i.hostBindings;
        if (o) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const i = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ('number' == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != i && n.push(i),
            n.push(s, r, o);
        }
      }
      function Vr(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Hr(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function Br(t, e, n) {
        if (n) {
          if (e.exportAs) for (let s = 0; s < e.exportAs.length; s++) n[e.exportAs[s]] = t;
          ft(e) && (n[''] = t);
        }
      }
      function qr(t, e, n) {
        (t.flags |= 1), (t.directiveStart = e), (t.directiveEnd = e + n), (t.providerIndexes = e);
      }
      function Zr(t, e, n, s, r) {
        t.data[s] = r;
        const i = r.factory || (r.factory = pt(r.type)),
          o = new Ee(i, ft(r), null);
        (t.blueprint[s] = o), (n[s] = o), jr(t, e, 0, s, xr(t, n, r.hostVars, dr), r);
      }
      function zr(t, e, n) {
        const s = It(e, t),
          r = Or(n),
          i = t[10],
          o = Kr(
            t,
            Sr(t, r, null, n.onPush ? 64 : 16, s, e, i, i.createRenderer(s, n), null, null),
          );
        t[e.index] = o;
      }
      function Gr(t, e, n, s, r, i) {
        const o = i[e];
        if (null !== o) {
          const t = s.setInput;
          for (let e = 0; e < o.length; ) {
            const r = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? s.setInput(n, a, r, i) : (n[i] = a);
          }
        }
      }
      function Ur(t, e) {
        let n = null,
          s = 0;
        for (; s < e.length; ) {
          const r = e[s];
          if (0 !== r)
            if (5 !== r) {
              if ('number' == typeof r) break;
              t.hasOwnProperty(r) && (null === n && (n = []), n.push(r, t[r], e[s + 1])), (s += 2);
            } else s += 2;
          else s += 4;
        }
        return n;
      }
      function $r(t, e, n, s) {
        return new Array(t, !0, !1, e, null, 0, s, n, null, null);
      }
      function Yr(t, e) {
        const n = Nt(e, t);
        if (Rt(n)) {
          const t = n[1];
          80 & n[2] ? Tr(t, n, t.template, n[8]) : n[5] > 0 && Qr(n);
        }
      }
      function Qr(t) {
        for (let n = Fs(t); null !== n; n = Ns(n))
          for (let t = 10; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              Tr(t, e, t.template, e[8]);
            } else e[5] > 0 && Qr(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const s = Nt(e[n], t);
            Rt(s) && s[5] > 0 && Qr(s);
          }
      }
      function Wr(t, e) {
        const n = Nt(e, t),
          s = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n]);
        })(s, n),
          Cr(s, n, n[8]);
      }
      function Kr(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Jr(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = As(t);
          if (0 != (512 & t[2]) && !e) return t;
          t = e;
        }
        return null;
      }
      function Xr(t, e, n) {
        const s = e[10];
        s.begin && s.begin();
        try {
          Tr(t, e, t.template, n);
        } catch (r) {
          throw (oi(e, r), r);
        } finally {
          s.end && s.end();
        }
      }
      function ti(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              s = ys(n),
              r = s[1];
            kr(r, s, r.template, n);
          }
        })(t[8]);
      }
      function ei(t, e, n) {
        se(0), e(t, n);
      }
      const ni = (() => Promise.resolve(null))();
      function si(t) {
        return t[7] || (t[7] = []);
      }
      function ri(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function ii(t, e, n) {
        return (
          (null === t || ft(t)) &&
            (n = (function (t) {
              for (; Array.isArray(t); ) {
                if ('object' == typeof t[1]) return t;
                t = t[0];
              }
              return null;
            })(n[e.index])),
          n[11]
        );
      }
      function oi(t, e) {
        const n = t[9],
          s = n ? n.get(Ss, null) : null;
        s && s.handleError(e);
      }
      function ai(t, e, n, s, r) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            c = e[o],
            l = t.data[o];
          null !== l.setInput ? l.setInput(c, r, s, a) : (c[a] = r);
        }
      }
      function ci(t, e, n) {
        const s = kt(e, t);
        !(function (t, e, n) {
          xt(t) ? t.setValue(e, n) : (e.textContent = n);
        })(t[11], s, n);
      }
      function li(t, e, n) {
        let s = n ? t.styles : null,
          r = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            'number' == typeof t
              ? (i = t)
              : 1 == i
              ? (r = h(r, t))
              : 2 == i && (s = h(s, t + ': ' + e[++o] + ';'));
          }
        n ? (t.styles = s) : (t.stylesWithoutHost = s),
          n ? (t.classes = r) : (t.classesWithoutHost = r);
      }
      const ui = new en('INJECTOR', -1);
      class hi {
        get(t, e = fn) {
          if (e === fn) {
            const e = new Error(`NullInjectorError: No provider for ${u(t)}!`);
            throw ((e.name = 'NullInjectorError'), e);
          }
          return e;
        }
      }
      const di = new en('Set Injector scope.'),
        fi = {},
        pi = {};
      let mi;
      function gi() {
        return void 0 === mi && (mi = new hi()), mi;
      }
      function _i(t, e = null, n = null, s) {
        return new yi(t, n, e || gi(), s);
      }
      class yi {
        constructor(t, e, n, s = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const r = [];
          e && on(e, (n) => this.processProvider(n, t, e)),
            on([t], (t) => this.processInjectorType(t, [], r)),
            this.records.set(ui, wi(void 0, this));
          const i = this.records.get(di);
          (this.scope = null != i ? i.value : null),
            (this.source = s || ('object' == typeof t ? null : u(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
          }
        }
        get(t, e = fn, n = A.Default) {
          this.assertNotDestroyed();
          const s = _n(this);
          try {
            if (!(n & A.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ('function' == typeof (r = t) || ('object' == typeof r && r instanceof en)) &&
                  S(t);
                (e = n && this.injectableDefInScope(n) ? wi(bi(t), fi) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & A.Self ? gi() : this.parent).get(
              t,
              (e = n & A.Optional && e === fn ? null : e),
            );
          } catch (i) {
            if ('NullInjectorError' === i.name) {
              if (((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(u(t)), s)) throw i;
              return (function (t, e, n, s) {
                const r = t.ngTempTokenPath;
                throw (
                  (e.__source && r.unshift(e.__source),
                  (t.message = (function (t, e, n, s = null) {
                    t = t && '\n' === t.charAt(0) && '\u0275' == t.charAt(1) ? t.substr(2) : t;
                    let r = u(e);
                    if (Array.isArray(e)) r = e.map(u).join(' -> ');
                    else if ('object' == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let s = e[n];
                          t.push(n + ':' + ('string' == typeof s ? JSON.stringify(s) : u(s)));
                        }
                      r = `{${t.join(', ')}}`;
                    }
                    return `${n}${s ? '(' + s + ')' : ''}[${r}]: ${t.replace(pn, '\n  ')}`;
                  })('\n' + t.message, r, n, s)),
                  (t.ngTokenPath = r),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, 'R3InjectorError', this.source);
            }
            throw i;
          } finally {
            _n(s);
          }
          var r;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return this.records.forEach((e, n) => t.push(u(n))), `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Error('Injector has already been destroyed.');
        }
        processInjectorType(t, e, n) {
          if (!(t = p(t))) return !1;
          let s = x(t);
          const r = (null == s && t.ngModule) || void 0,
            i = void 0 === r ? t : r,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== r && (s = x(r)), null == s)) return !1;
          if (null != s.imports && !o) {
            let t;
            n.push(i);
            try {
              on(s.imports, (s) => {
                this.processInjectorType(s, e, n) && (void 0 === t && (t = []), t.push(s));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: s } = t[e];
                on(s, (t) => this.processProvider(t, n, s || q));
              }
          }
          this.injectorDefTypes.add(i);
          const a = pt(i) || (() => new i());
          this.records.set(i, wi(a, fi));
          const c = s.providers;
          if (null != c && !o) {
            const e = t;
            on(c, (t) => this.processProvider(t, e, c));
          }
          return void 0 !== r && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let s = Ei((t = p(t))) ? t : p(t && t.provide);
          const r = (function (t, e, n) {
            return Si(t) ? wi(void 0, t.useValue) : wi(vi(t), fi);
          })(t);
          if (Ei(t) || !0 !== t.multi) this.records.get(s);
          else {
            let e = this.records.get(s);
            e ||
              ((e = wi(void 0, fi, !0)), (e.factory = () => wn(e.multi)), this.records.set(s, e)),
              (s = t),
              e.multi.push(t);
          }
          this.records.set(s, r);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === fi && ((e.value = pi), (e.value = e.factory())),
            'object' == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              'object' == typeof n &&
              'function' == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = p(t.providedIn);
          return 'string' == typeof e
            ? 'any' === e || e === this.scope
            : this.injectorDefTypes.has(e);
        }
      }
      function bi(t) {
        const e = S(t),
          n = null !== e ? e.factory : pt(t);
        if (null !== n) return n;
        if (t instanceof en) throw new Error(`Token ${u(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = ln(e, '?');
              throw new Error(`Can't resolve all parameters for ${u(t)}: (${n.join(', ')}).`);
            }
            const n = (function (t) {
              const e = t && (t[C] || t[k]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty('name')) return t.name;
                  const e = ('' + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? '' : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`,
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error('unreachable');
      }
      function vi(t, e, n) {
        let s;
        if (Ei(t)) {
          const e = p(t);
          return pt(e) || bi(e);
        }
        if (Si(t)) s = () => p(t.useValue);
        else if ((r = t) && r.useFactory) s = () => t.useFactory(...wn(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          s = () => bn(p(t.useExisting));
        else {
          const e = p(t && (t.useClass || t.provide));
          if (
            !(function (t) {
              return !!t.deps;
            })(t)
          )
            return pt(e) || bi(e);
          s = () => new e(...wn(t.deps));
        }
        var r;
        return s;
      }
      function wi(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Si(t) {
        return null !== t && 'object' == typeof t && mn in t;
      }
      function Ei(t) {
        return 'function' == typeof t;
      }
      const xi = function (t, e, n) {
        return (function (t, e = null, n = null, s) {
          const r = _i(t, e, n, s);
          return r._resolveInjectorDefTypes(), r;
        })({ name: n }, e, t, n);
      };
      let Ci = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t) ? xi(t, e, '') : xi(t.providers, t.parent, t.name || '');
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = fn),
          (t.NULL = new hi()),
          (t.ɵprov = v({ token: t, providedIn: 'any', factory: () => bn(ui) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function Ti(t, e) {
        _e(ys(t)[1], qt());
      }
      function ki(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const s = [t];
        for (; e; ) {
          let r;
          if (ft(t)) r = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error('Directives cannot inherit Components');
            r = e.ɵdir;
          }
          if (r) {
            if (n) {
              s.push(r);
              const e = t;
              (e.inputs = Ii(t.inputs)),
                (e.declaredInputs = Ii(t.declaredInputs)),
                (e.outputs = Ii(t.outputs));
              const n = r.hostBindings;
              n && Ni(t, n);
              const i = r.viewQuery,
                o = r.contentQueries;
              if (
                (i && Ai(t, i),
                o && Fi(t, o),
                l(t.inputs, r.inputs),
                l(t.declaredInputs, r.declaredInputs),
                l(t.outputs, r.outputs),
                ft(r) && r.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(r.data.animation);
              }
            }
            const e = r.features;
            if (e)
              for (let s = 0; s < e.length; s++) {
                const r = e[s];
                r && r.ngInherit && r(t), r === ki && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let s = t.length - 1; s >= 0; s--) {
            const r = t[s];
            (r.hostVars = e += r.hostVars),
              (r.hostAttrs = ke(r.hostAttrs, (n = ke(n, r.hostAttrs))));
          }
        })(s);
      }
      function Ii(t) {
        return t === B ? {} : t === q ? [] : t;
      }
      function Ai(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, s) => {
              e(t, s), n(t, s);
            }
          : e;
      }
      function Fi(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, s, r) => {
              e(t, s, r), n(t, s, r);
            }
          : e;
      }
      function Ni(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, s) => {
              e(t, s), n(t, s);
            }
          : e;
      }
      let Oi = null;
      function Ri() {
        if (!Oi) {
          const t = H.Symbol;
          if (t && t.iterator) Oi = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              'entries' !== n &&
                'size' !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Oi = n);
            }
          }
        }
        return Oi;
      }
      class Li {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new Li(t);
        }
        static unwrap(t) {
          return Li.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof Li;
        }
      }
      function Di(t) {
        return !!Pi(t) && (Array.isArray(t) || (!(t instanceof Map) && Ri() in t));
      }
      function Pi(t) {
        return null !== t && ('function' == typeof t || 'object' == typeof t);
      }
      function Mi(t, e, n) {
        return (t[e] = n);
      }
      function ji(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Vi(t, e, n, s) {
        const r = ji(t, e, n);
        return ji(t, e + 1, s) || r;
      }
      function Hi(t, e, n, s) {
        const r = Vt();
        return (
          ji(r, Kt(), e) &&
            (Ht(),
            (function (t, e, n, s, r, i) {
              const o = It(t, e);
              !(function (t, e, n, s, r, i, o) {
                if (null == i) xt(t) ? t.removeAttribute(e, r, n) : e.removeAttribute(r);
                else {
                  const a = null == o ? _(i) : o(i, s || '', r);
                  xt(t)
                    ? t.setAttribute(e, r, a, n)
                    : n
                    ? e.setAttributeNS(n, r, a)
                    : e.setAttribute(r, a);
                }
              })(e[11], o, i, t.value, n, s, r);
            })(pe(), r, t, e, n, s)),
          Hi
        );
      }
      function Bi(t, e, n, s) {
        return ji(t, Kt(), n) ? e + _(n) + s : dr;
      }
      function qi(t, e, n, s, r, i, o, a) {
        const c = Vt(),
          l = Ht(),
          u = t + 20,
          h = l.firstCreatePass
            ? (function (t, e, n, s, r, i, o, a, c) {
                const l = e.consts,
                  u = Er(e, t, 4, o || null, Lt(l, a));
                Mr(e, n, u, Lt(l, c)), _e(e, u);
                const h = (u.tViews = Rr(
                  2,
                  u,
                  s,
                  r,
                  i,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  l,
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u), (h.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, l, c, e, n, s, r, i, o)
            : l.data[u];
        zt(h, !1);
        const d = c[11].createComment('');
        Us(l, c, d, h),
          _s(d, c),
          Kr(c, (c[u] = $r(d, c, d, h))),
          dt(h) && Fr(l, c, h),
          null != o && Nr(c, h, a);
      }
      function Zi(t) {
        return Ft(Mt.lFrame.contextLView, 20 + t);
      }
      function zi(t, e = A.Default) {
        const n = Vt();
        return null === n ? bn(t, e) : qe(qt(), n, p(t), e);
      }
      function Gi(t, e, n) {
        const s = Vt();
        return ji(s, Kt(), e) && Pr(Ht(), pe(), s, t, e, s[11], n, !1), Gi;
      }
      function Ui(t, e, n, s, r) {
        const i = r ? 'class' : 'style';
        ai(t, n, e.inputs[i], i, s);
      }
      function $i(t, e, n, s) {
        const r = Vt(),
          i = Ht(),
          o = 20 + t,
          a = r[11],
          c = (r[o] = Ls(a, e, Mt.lFrame.currentNamespace)),
          l = i.firstCreatePass
            ? (function (t, e, n, s, r, i, o) {
                const a = e.consts,
                  c = Er(e, t, 2, r, Lt(a, i));
                return (
                  Mr(e, n, c, Lt(a, o)),
                  null !== c.attrs && li(c, c.attrs, !1),
                  null !== c.mergedAttrs && li(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(o, i, r, 0, e, n, s)
            : i.data[o];
        zt(l, !0);
        const u = l.mergedAttrs;
        null !== u && xe(a, c, u);
        const h = l.classes;
        null !== h && tr(a, c, h);
        const d = l.styles;
        null !== d && Xs(a, c, d),
          64 != (64 & l.flags) && Us(i, r, c, l),
          0 === Mt.lFrame.elementDepthCount && _s(c, r),
          Mt.lFrame.elementDepthCount++,
          dt(l) && (Fr(i, r, l), Ar(i, l, r)),
          null !== s && Nr(r, l);
      }
      function Yi() {
        let t = qt();
        Gt() ? Ut() : ((t = t.parent), zt(t, !1));
        const e = t;
        Mt.lFrame.elementDepthCount--;
        const n = Ht();
        n.firstCreatePass && (_e(n, t), ut(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Ui(n, e, Vt(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Ui(n, e, Vt(), e.stylesWithoutHost, !1);
      }
      function Qi(t, e, n, s) {
        $i(t, e, n, s), Yi();
      }
      function Wi(t, e, n) {
        const s = Vt(),
          r = Ht(),
          i = t + 20,
          o = r.firstCreatePass
            ? (function (t, e, n, s, r) {
                const i = e.consts,
                  o = Lt(i, s),
                  a = Er(e, t, 8, 'ng-container', o);
                return (
                  null !== o && li(a, o, !0),
                  Mr(e, n, a, Lt(i, r)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(i, r, s, e, n)
            : r.data[i];
        zt(o, !0);
        const a = (s[i] = s[11].createComment(''));
        Us(r, s, a, o), _s(a, s), dt(o) && (Fr(r, s, o), Ar(r, o, s)), null != n && Nr(s, o);
      }
      function Ki() {
        let t = qt();
        const e = Ht();
        Gt() ? Ut() : ((t = t.parent), zt(t, !1)),
          e.firstCreatePass && (_e(e, t), ut(t) && e.queries.elementEnd(t));
      }
      function Ji() {
        return Vt();
      }
      function Xi(t) {
        return !!t && 'function' == typeof t.then;
      }
      function to(t) {
        return !!t && 'function' == typeof t.subscribe;
      }
      const eo = to;
      function no(t, e, n = !1, s) {
        const r = Vt(),
          i = Ht(),
          o = qt();
        return ro(i, r, r[11], o, t, e, n, s), no;
      }
      function so(t, e, n = !1, s) {
        const r = qt(),
          i = Vt(),
          o = Ht();
        return ro(o, i, ii(ee(o.data), r, i), r, t, e, n, s), so;
      }
      function ro(t, e, n, s, r, i, o = !1, a) {
        const c = dt(s),
          l = t.firstCreatePass && ri(t),
          u = si(e);
        let h = !0;
        if (3 & s.type) {
          const d = It(s, e),
            f = a ? a(d) : B,
            p = f.target || d,
            m = u.length,
            g = a ? (t) => a(Tt(t[s.index])).target : s.index;
          if (xt(n)) {
            let o = null;
            if (
              (!a &&
                c &&
                (o = (function (t, e, n, s) {
                  const r = t.cleanup;
                  if (null != r)
                    for (let i = 0; i < r.length - 1; i += 2) {
                      const t = r[i];
                      if (t === n && r[i + 1] === s) {
                        const t = e[7],
                          n = r[i + 2];
                        return t.length > n ? t[n] : null;
                      }
                      'string' == typeof t && (i += 2);
                    }
                  return null;
                })(t, e, r, s.index)),
              null !== o)
            )
              ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                (o.__ngLastListenerFn__ = i),
                (h = !1);
            else {
              i = oo(s, e, 0, i, !1);
              const t = n.listen(f.name || p, r, i);
              u.push(i, t), l && l.push(r, g, m, m + 1);
            }
          } else
            (i = oo(s, e, 0, i, !0)),
              p.addEventListener(r, i, o),
              u.push(i),
              l && l.push(r, g, m, o);
        } else i = oo(s, e, 0, i, !1);
        const d = s.outputs;
        let f;
        if (h && null !== d && (f = d[r])) {
          const t = f.length;
          if (t)
            for (let n = 0; n < t; n += 2) {
              const t = e[f[n]][f[n + 1]].subscribe(i),
                o = u.length;
              u.push(i, t), l && l.push(r, s.index, o, -(o + 1));
            }
        }
      }
      function io(t, e, n, s) {
        try {
          return !1 !== n(s);
        } catch (r) {
          return oi(t, r), !1;
        }
      }
      function oo(t, e, n, s, r) {
        return function n(i) {
          if (i === Function) return s;
          const o = 2 & t.flags ? Nt(t.index, e) : e;
          0 == (32 & e[2]) && Jr(o);
          let a = io(e, 0, s, i),
            c = n.__ngNextListenerFn__;
          for (; c; ) (a = io(e, 0, c, i) && a), (c = c.__ngNextListenerFn__);
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function ao(t = 1) {
        return (function (t) {
          return (Mt.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, Mt.lFrame.contextLView))[8];
        })(t);
      }
      function co(t, e) {
        let n = null;
        const s = (function (t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(t);
        for (let r = 0; r < e.length; r++) {
          const i = e[r];
          if ('*' !== i) {
            if (null === s ? cr(t, i, !0) : lr(s, i)) return r;
          } else n = r;
        }
        return n;
      }
      function lo(t) {
        const e = Vt()[16][6];
        if (!e.projection) {
          const n = (e.projection = ln(t ? t.length : 1, null)),
            s = n.slice();
          let r = e.child;
          for (; null !== r; ) {
            const e = t ? co(r, t) : 0;
            null !== e && (s[e] ? (s[e].projectionNext = r) : (n[e] = r), (s[e] = r)), (r = r.next);
          }
        }
      }
      function uo(t, e = 0, n) {
        const s = Vt(),
          r = Ht(),
          i = Er(r, 20 + t, 16, null, n || null);
        null === i.projection && (i.projection = e),
          Ut(),
          64 != (64 & i.flags) &&
            (function (t, e, n) {
              Js(e[11], 0, e, n, Vs(t, n, e), zs(n.parent || e[6], n, e));
            })(r, s, i);
      }
      function ho(t, e, n) {
        return fo(t, '', e, '', n), ho;
      }
      function fo(t, e, n, s, r) {
        const i = Vt(),
          o = Bi(i, e, n, s);
        return o !== dr && Pr(Ht(), pe(), i, t, o, i[11], r, !1), fo;
      }
      function po(t, e, n, s, r) {
        const i = t[n + 1],
          o = null === e;
        let a = s ? gr(i) : yr(i),
          c = !1;
        for (; 0 !== a && (!1 === c || o); ) {
          const n = t[a + 1];
          mo(t[a], e) && ((c = !0), (t[a + 1] = s ? vr(n) : _r(n))), (a = s ? gr(n) : yr(n));
        }
        c && (t[n + 1] = s ? _r(i) : vr(i));
      }
      function mo(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || 'string' != typeof e) && dn(t, e) >= 0)
        );
      }
      const go = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function _o(t) {
        return t.substring(go.key, go.keyEnd);
      }
      function yo(t, e) {
        const n = go.textEnd;
        return n === e
          ? -1
          : ((e = go.keyEnd = (function (t, e, n) {
              for (; e < n && t.charCodeAt(e) > 32; ) e++;
              return e;
            })(t, (go.key = e), n)),
            bo(t, e, n));
      }
      function bo(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function vo(t, e, n) {
        return xo(t, e, n, !1), vo;
      }
      function wo(t, e) {
        return xo(t, e, null, !0), wo;
      }
      function So(t) {
        Co(un, Eo, t, !0);
      }
      function Eo(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                (go.key = 0),
                  (go.keyEnd = 0),
                  (go.value = 0),
                  (go.valueEnd = 0),
                  (go.textEnd = t.length);
              })(t),
              yo(t, bo(t, 0, go.textEnd))
            );
          })(e);
          n >= 0;
          n = yo(e, n)
        )
          un(t, _o(e), !0);
      }
      function xo(t, e, n, s) {
        const r = Vt(),
          i = Ht(),
          o = Jt(2);
        i.firstUpdatePass && ko(i, t, o, s),
          e !== dr &&
            ji(r, o, e) &&
            Fo(
              i,
              i.data[de()],
              r,
              r[11],
              t,
              (r[o + 1] = (function (t, e) {
                return (
                  null == t ||
                    ('string' == typeof e ? (t += e) : 'object' == typeof t && (t = u(Pn(t)))),
                  t
                );
              })(e, n)),
              s,
              o,
            );
      }
      function Co(t, e, n, s) {
        const r = Ht(),
          i = Jt(2);
        r.firstUpdatePass && ko(r, null, i, s);
        const o = Vt();
        if (n !== dr && ji(o, i, n)) {
          const a = r.data[de()];
          if (Ro(a, s) && !To(r, i)) {
            let t = s ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== t && (n = h(t, n || '')), Ui(r, a, o, n, s);
          } else
            !(function (t, e, n, s, r, i, o, a) {
              r === dr && (r = q);
              let c = 0,
                l = 0,
                u = 0 < r.length ? r[0] : null,
                h = 0 < i.length ? i[0] : null;
              for (; null !== u || null !== h; ) {
                const d = c < r.length ? r[c + 1] : void 0,
                  f = l < i.length ? i[l + 1] : void 0;
                let p,
                  m = null;
                u === h
                  ? ((c += 2), (l += 2), d !== f && ((m = h), (p = f)))
                  : null === h || (null !== u && u < h)
                  ? ((c += 2), (m = u))
                  : ((l += 2), (m = h), (p = f)),
                  null !== m && Fo(t, e, n, s, m, p, o, a),
                  (u = c < r.length ? r[c] : null),
                  (h = l < i.length ? i[l] : null);
              }
            })(
              r,
              a,
              o,
              o[11],
              o[i + 1],
              (o[i + 1] = (function (t, e, n) {
                if (null == n || '' === n) return q;
                const s = [],
                  r = Pn(n);
                if (Array.isArray(r)) for (let i = 0; i < r.length; i++) t(s, r[i], !0);
                else if ('object' == typeof r)
                  for (const i in r) r.hasOwnProperty(i) && t(s, i, r[i]);
                else 'string' == typeof r && e(s, r);
                return s;
              })(t, e, n)),
              s,
              i,
            );
        }
      }
      function To(t, e) {
        return e >= t.expandoStartIndex;
      }
      function ko(t, e, n, s) {
        const r = t.data;
        if (null === r[n + 1]) {
          const i = r[de()],
            o = To(t, n);
          Ro(i, s) && null === e && !o && (e = !1),
            (e = (function (t, e, n, s) {
              const r = ee(t);
              let i = s ? e.residualClasses : e.residualStyles;
              if (null === r)
                0 === (s ? e.classBindings : e.styleBindings) &&
                  ((n = Ao((n = Io(null, t, e, n, s)), e.attrs, s)), (i = null));
              else {
                const o = e.directiveStylingLast;
                if (-1 === o || t[o] !== r)
                  if (((n = Io(r, t, e, n, s)), null === i)) {
                    let n = (function (t, e, n) {
                      const s = n ? e.classBindings : e.styleBindings;
                      if (0 !== yr(s)) return t[gr(s)];
                    })(t, e, s);
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = Io(null, t, e, n[1], s)),
                      (n = Ao(n, e.attrs, s)),
                      (function (t, e, n, s) {
                        t[gr(n ? e.classBindings : e.styleBindings)] = s;
                      })(t, e, s, n));
                  } else
                    i = (function (t, e, n) {
                      let s;
                      const r = e.directiveEnd;
                      for (let i = 1 + e.directiveStylingLast; i < r; i++)
                        s = Ao(s, t[i].hostAttrs, n);
                      return Ao(s, e.attrs, n);
                    })(t, e, s);
              }
              return void 0 !== i && (s ? (e.residualClasses = i) : (e.residualStyles = i)), n;
            })(r, i, e, s)),
            (function (t, e, n, s, r, i) {
              let o = i ? e.classBindings : e.styleBindings,
                a = gr(o),
                c = yr(o);
              t[s] = n;
              let l,
                u = !1;
              if (Array.isArray(n)) {
                const t = n;
                (l = t[1]), (null === l || dn(t, l) > 0) && (u = !0);
              } else l = n;
              if (r)
                if (0 !== c) {
                  const e = gr(t[a + 1]);
                  (t[s + 1] = mr(e, a)),
                    0 !== e && (t[e + 1] = br(t[e + 1], s)),
                    (t[a + 1] = (131071 & t[a + 1]) | (s << 17));
                } else (t[s + 1] = mr(a, 0)), 0 !== a && (t[a + 1] = br(t[a + 1], s)), (a = s);
              else (t[s + 1] = mr(c, 0)), 0 === a ? (a = s) : (t[c + 1] = br(t[c + 1], s)), (c = s);
              u && (t[s + 1] = _r(t[s + 1])),
                po(t, l, s, !0),
                po(t, l, s, !1),
                (function (t, e, n, s, r) {
                  const i = r ? t.residualClasses : t.residualStyles;
                  null != i && 'string' == typeof e && dn(i, e) >= 0 && (n[s + 1] = vr(n[s + 1]));
                })(e, l, t, s, i),
                (o = mr(a, c)),
                i ? (e.classBindings = o) : (e.styleBindings = o);
            })(r, i, e, n, o, s);
        }
      }
      function Io(t, e, n, s, r) {
        let i = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((i = e[a]), (s = Ao(s, i.hostAttrs, r)), i !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), s;
      }
      function Ao(t, e, n) {
        const s = n ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i];
            'number' == typeof o
              ? (r = o)
              : r === s &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ['', t]), un(t, o, !!n || e[++i]));
          }
        return void 0 === t ? null : t;
      }
      function Fo(t, e, n, s, r, i, o, a) {
        if (!(3 & e.type)) return;
        const c = t.data,
          l = c[a + 1];
        Oo(1 == (1 & l) ? No(c, e, n, r, yr(l), o) : void 0) ||
          (Oo(i) || (2 == (2 & l) && (i = No(c, null, n, r, a, o))),
          (function (t, e, n, s, r) {
            const i = xt(t);
            if (e)
              r
                ? i
                  ? t.addClass(n, s)
                  : n.classList.add(s)
                : i
                ? t.removeClass(n, s)
                : n.classList.remove(s);
            else {
              let e = -1 === s.indexOf('-') ? void 0 : ks.DashCase;
              if (null == r) i ? t.removeStyle(n, s, e) : n.style.removeProperty(s);
              else {
                const o = 'string' == typeof r && r.endsWith('!important');
                o && ((r = r.slice(0, -10)), (e |= ks.Important)),
                  i ? t.setStyle(n, s, r, e) : n.style.setProperty(s, r, o ? 'important' : '');
              }
            }
          })(s, o, kt(de(), n), r, i));
      }
      function No(t, e, n, s, r, i) {
        const o = null === e;
        let a;
        for (; r > 0; ) {
          const e = t[r],
            i = Array.isArray(e),
            c = i ? e[1] : e,
            l = null === c;
          let u = n[r + 1];
          u === dr && (u = l ? q : void 0);
          let h = l ? hn(u, s) : c === s ? u : void 0;
          if ((i && !Oo(h) && (h = hn(e, s)), Oo(h) && ((a = h), o))) return a;
          const d = t[r + 1];
          r = o ? gr(d) : yr(d);
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles;
          null != t && (a = hn(t, s));
        }
        return a;
      }
      function Oo(t) {
        return void 0 !== t;
      }
      function Ro(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function Lo(t, e = '') {
        const n = Vt(),
          s = Ht(),
          r = t + 20,
          i = s.firstCreatePass ? Er(s, r, 1, e, null) : s.data[r],
          o = (n[r] = (function (t, e) {
            return xt(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        Us(s, n, o, i), zt(i, !1);
      }
      function Do(t) {
        return Po('', t, ''), Do;
      }
      function Po(t, e, n) {
        const s = Vt(),
          r = Bi(s, t, e, n);
        return r !== dr && ci(s, de(), r), Po;
      }
      function Mo(t, e, n, s, r) {
        const i = Vt(),
          o = (function (t, e, n, s, r, i) {
            const o = Vi(t, Wt(), n, r);
            return Jt(2), o ? e + _(n) + s + _(r) + i : dr;
          })(i, t, e, n, s, r);
        return o !== dr && ci(i, de(), o), Mo;
      }
      function jo(t, e, n) {
        Co(un, Eo, Bi(Vt(), t, e, n), !0);
      }
      function Vo(t, e, n) {
        const s = Vt();
        return ji(s, Kt(), e) && Pr(Ht(), pe(), s, t, e, s[11], n, !0), Vo;
      }
      function Ho(t, e, n) {
        const s = Vt();
        if (ji(s, Kt(), e)) {
          const r = Ht(),
            i = pe();
          Pr(r, i, s, t, e, ii(ee(r.data), i, s), n, !0);
        }
        return Ho;
      }
      const Bo = void 0;
      var qo = [
        'en',
        [['a', 'p'], ['AM', 'PM'], Bo],
        [['AM', 'PM'], Bo, Bo],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        Bo,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        Bo,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', Bo, "{1} 'at' {0}", Bo],
        ['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Zo = {};
      function zo(t) {
        const e = (function (t) {
          return t.toLowerCase().replace(/_/g, '-');
        })(t);
        let n = Uo(e);
        if (n) return n;
        const s = e.split('-')[0];
        if (((n = Uo(s)), n)) return n;
        if ('en' === s) return qo;
        throw new Error(`Missing locale data for the locale "${t}".`);
      }
      function Go(t) {
        return zo(t)[$o.PluralCase];
      }
      function Uo(t) {
        return (
          t in Zo || (Zo[t] = H.ng && H.ng.common && H.ng.common.locales && H.ng.common.locales[t]),
          Zo[t]
        );
      }
      var $o = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = 'LocaleId'),
          (t[(t.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
          (t[(t.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
          (t[(t.DaysFormat = 3)] = 'DaysFormat'),
          (t[(t.DaysStandalone = 4)] = 'DaysStandalone'),
          (t[(t.MonthsFormat = 5)] = 'MonthsFormat'),
          (t[(t.MonthsStandalone = 6)] = 'MonthsStandalone'),
          (t[(t.Eras = 7)] = 'Eras'),
          (t[(t.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
          (t[(t.WeekendRange = 9)] = 'WeekendRange'),
          (t[(t.DateFormat = 10)] = 'DateFormat'),
          (t[(t.TimeFormat = 11)] = 'TimeFormat'),
          (t[(t.DateTimeFormat = 12)] = 'DateTimeFormat'),
          (t[(t.NumberSymbols = 13)] = 'NumberSymbols'),
          (t[(t.NumberFormats = 14)] = 'NumberFormats'),
          (t[(t.CurrencyCode = 15)] = 'CurrencyCode'),
          (t[(t.CurrencySymbol = 16)] = 'CurrencySymbol'),
          (t[(t.CurrencyName = 17)] = 'CurrencyName'),
          (t[(t.Currencies = 18)] = 'Currencies'),
          (t[(t.Directionality = 19)] = 'Directionality'),
          (t[(t.PluralCase = 20)] = 'PluralCase'),
          (t[(t.ExtraData = 21)] = 'ExtraData'),
          t
        );
      })({});
      let Yo = 'en-US';
      function Qo(t) {
        var e, n;
        (n = 'Expected localeId to be defined'),
          null == (e = t) &&
            (function (t, e, n, s) {
              throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`);
            })(n, e),
          'string' == typeof t && (Yo = t.toLowerCase().replace(/_/g, '-'));
      }
      function Wo(t, e, n, s, r) {
        if (((t = p(t)), Array.isArray(t))) for (let i = 0; i < t.length; i++) Wo(t[i], e, n, s, r);
        else {
          const i = Ht(),
            o = Vt();
          let a = Ei(t) ? t : p(t.provide),
            c = vi(t);
          const l = qt(),
            u = 1048575 & l.providerIndexes,
            h = l.directiveStart,
            d = l.providerIndexes >> 20;
          if (Ei(t) || !t.multi) {
            const s = new Ee(c, r, zi),
              f = Xo(a, e, r ? u : u + d, h);
            -1 === f
              ? (Ve(De(l, o), i, a),
                Ko(i, t, e.length),
                e.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                r && (l.providerIndexes += 1048576),
                n.push(s),
                o.push(s))
              : ((n[f] = s), (o[f] = s));
          } else {
            const f = Xo(a, e, u + d, h),
              p = Xo(a, e, u, u + d),
              m = f >= 0 && n[f],
              g = p >= 0 && n[p];
            if ((r && !g) || (!r && !m)) {
              Ve(De(l, o), i, a);
              const u = (function (t, e, n, s, r) {
                const i = new Ee(t, n, zi);
                return (
                  (i.multi = []), (i.index = e), (i.componentProviders = 0), Jo(i, r, s && !n), i
                );
              })(r ? ea : ta, n.length, r, s, c);
              !r && g && (n[p].providerFactory = u),
                Ko(i, t, e.length, 0),
                e.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                r && (l.providerIndexes += 1048576),
                n.push(u),
                o.push(u);
            } else Ko(i, t, f > -1 ? f : p, Jo(n[r ? p : f], c, !r && s));
            !r && s && g && n[p].componentProviders++;
          }
        }
      }
      function Ko(t, e, n, s) {
        const r = Ei(e);
        if (r || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy;
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!r && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [s, i]) : o[t + 1].push(s, i);
            } else o.push(n, i);
          }
        }
      }
      function Jo(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Xo(t, e, n, s) {
        for (let r = n; r < s; r++) if (e[r] === t) return r;
        return -1;
      }
      function ta(t, e, n, s) {
        return na(this.multi, []);
      }
      function ea(t, e, n, s) {
        const r = this.multi;
        let i;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = $e(n, n[1], this.providerFactory.index, s);
          (i = e.slice(0, t)), na(r, i);
          for (let n = t; n < e.length; n++) i.push(e[n]);
        } else (i = []), na(r, i);
        return i;
      }
      function na(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function sa(t, e = []) {
        return (n) => {
          n.providersResolver = (n, s) =>
            (function (t, e, n) {
              const s = Ht();
              if (s.firstCreatePass) {
                const r = ft(t);
                Wo(n, s.data, s.blueprint, r, !0), Wo(e, s.data, s.blueprint, r, !1);
              }
            })(n, s ? s(t) : t, e);
        };
      }
      class ra {}
      class ia {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${u(
                t,
              )}. Did you add it to @NgModule.entryComponents?`,
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let oa = (() => {
        class t {}
        return (t.NULL = new ia()), t;
      })();
      function aa(...t) {}
      function ca(t, e) {
        return new ua(It(t, e));
      }
      const la = function () {
        return ca(qt(), Vt());
      };
      let ua = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = la), t;
      })();
      function ha(t) {
        return t instanceof ua ? t.nativeElement : t;
      }
      class da {}
      let fa = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => pa()), t;
      })();
      const pa = function () {
        const t = Vt(),
          e = Nt(qt().index, t);
        return (function (t) {
          return t[11];
        })(ct(e) ? e : t);
      };
      let ma = (() => {
        class t {}
        return (t.ɵprov = v({ token: t, providedIn: 'root', factory: () => null })), t;
      })();
      class ga {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const _a = new ga('12.0.0-rc.0');
      class ya {
        constructor() {}
        supports(t) {
          return Di(t);
        }
        create(t) {
          return new va(t);
        }
      }
      const ba = (t, e) => e;
      class va {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || ba);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            s = 0,
            r = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < xa(n, s, r)) ? e : n,
              o = xa(i, s, r),
              a = i.currentIndex;
            if (i === n) s--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) s++;
            else {
              r || (r = []);
              const t = o - s,
                e = a - s;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const s = n < r.length ? r[n] : (r[n] = 0),
                    i = s + n;
                  e <= i && i < t && (r[n] = s + 1);
                }
                r[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Di(t)))
            throw new Error(
              `Error trying to diff '${u(t)}'. Only arrays and iterables are allowed`,
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            s,
            r = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (s = this._trackByFn(e, n)),
                null !== r && Object.is(r.trackById, s)
                  ? (i && (r = this._verifyReinsertion(r, n, s, e)),
                    Object.is(r.item, n) || this._addIdentityChange(r, n))
                  : ((r = this._mismatch(r, n, s, e)), (i = !0)),
                (r = r._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Ri()]();
                  let s;
                  for (; !(s = n.next()).done; ) e(s.value);
                }
              })(t, (t) => {
                (s = this._trackByFn(e, t)),
                  null !== r && Object.is(r.trackById, s)
                    ? (i && (r = this._verifyReinsertion(r, t, s, e)),
                      Object.is(r.item, t) || this._addIdentityChange(r, t))
                    : ((r = this._mismatch(r, t, s, e)), (i = !0)),
                  (r = r._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(r), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null, t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, s) {
          let r;
          return (
            null === t ? (r = this._itTail) : ((r = t._prev), this._remove(t)),
            null !==
            (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, r, s))
              : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, s))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, r, s))
              : (t = this._addAfter(new wa(e, n), r, s)),
            t
          );
        }
        _verifyReinsertion(t, e, n, s) {
          let r = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
          return (
            null !== r
              ? (t = this._reinsertAfter(r, t._prev, s))
              : t.currentIndex != s && ((t.currentIndex = s), this._addToMoves(t, s)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const s = t._prevRemoved,
            r = t._nextRemoved;
          return (
            null === s ? (this._removalsHead = r) : (s._nextRemoved = r),
            null === r ? (this._removalsTail = s) : (r._prevRemoved = s),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t;
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const s = null === e ? this._itHead : e._next;
          return (
            (t._next = s),
            (t._prev = e),
            null === s ? (this._itTail = t) : (s._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Ea()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new Ea()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class wa {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Sa {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class Ea {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new Sa()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function xa(t, e, n) {
        const s = t.previousIndex;
        if (null === s) return s;
        let r = 0;
        return n && s < n.length && (r = n[s]), s + e + r;
      }
      class Ca {
        constructor() {}
        supports(t) {
          return t instanceof Map || Pi(t);
        }
        create() {
          return new Ta();
        }
      }
      class Ta {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Pi(t)))
              throw new Error(`Error trying to diff '${u(t)}'. Only maps and objects are allowed`);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t), (this._appendAfter = e), (e = e._next);
              else {
                const s = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, s);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const s = n._prev,
              r = n._next;
            return s && (s._next = r), r && (r._prev = s), (n._next = null), (n._prev = null), n;
          }
          const n = new ka(t);
          return this._records.set(t, n), (n.currentValue = e), this._addToAdditions(n), n;
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue), (t.currentValue = e), this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map ? t.forEach(e) : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class ka {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Ia() {
        return new Aa([new ya()]);
      }
      let Aa = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || Ia()),
              deps: [[t, new Cn(), new xn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (null != e) return e;
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${
                ((n = t), n.name || typeof n)
              }'`,
            );
            var n;
          }
        }
        return (t.ɵprov = v({ token: t, providedIn: 'root', factory: Ia })), t;
      })();
      function Fa() {
        return new Na([new Ca()]);
      }
      let Na = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || Fa()),
              deps: [[t, new Cn(), new xn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (t.ɵprov = v({ token: t, providedIn: 'root', factory: Fa })), t;
      })();
      function Oa(t, e, n, s, r = !1) {
        for (; null !== n; ) {
          const i = e[n.index];
          if ((null !== i && s.push(Tt(i)), lt(i)))
            for (let t = 10; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild;
              null !== n && Oa(e[1], e, n, s);
            }
          const o = n.type;
          if (8 & o) Oa(t, e, n.child, s);
          else if (32 & o) {
            const t = Is(n, e);
            let r;
            for (; (r = t()); ) s.push(r);
          } else if (16 & o) {
            const t = Ys(e, n);
            if (Array.isArray(t)) s.push(...t);
            else {
              const n = As(e[16]);
              Oa(n[1], n, t, s, !0);
            }
          }
          n = r ? n.projectionNext : n.next;
        }
        return s;
      }
      class Ra {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return Oa(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (lt(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 && (Ps(t, n), cn(e, n));
            }
            this._attachedToViewContainer = !1;
          }
          Ms(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Lr(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Jr(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Xr(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Yt(!0);
            try {
              Xr(t, e, n);
            } finally {
              Yt(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error('This view is already attached directly to the ApplicationRef!');
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null), Ks(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer)
            throw new Error('This view is already attached to a ViewContainer!');
          this._appRef = t;
        }
      }
      class La extends Ra {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          ti(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Yt(!0);
            try {
              ti(t);
            } finally {
              Yt(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const Da = function (t) {
        return (function (t, e, n) {
          if (ht(t) && !n) {
            const n = Nt(t.index, e);
            return new Ra(n, n);
          }
          return 47 & t.type ? new Ra(e[16], e) : null;
        })(qt(), Vt(), 16 == (16 & t));
      };
      let Pa = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Da), t;
      })();
      const Ma = [new Ca()],
        ja = new Aa([new ya()]),
        Va = new Na(Ma),
        Ha = function () {
          return za(qt(), Vt());
        };
      let Ba = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Ha), t;
      })();
      const qa = Ba,
        Za = class extends qa {
          constructor(t, e, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = n);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = Sr(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return null !== s && (n[19] = s.createEmbeddedView(e)), Cr(e, n, t), new Ra(n);
          }
        };
      function za(t, e) {
        return 4 & t.type ? new Za(e, t, ca(t, e)) : null;
      }
      class Ga {}
      class Ua {}
      const $a = function () {
        return Xa(qt(), Vt());
      };
      let Ya = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = $a), t;
      })();
      const Qa = Ya,
        Wa = class extends Qa {
          constructor(t, e, n) {
            super(), (this._lContainer = t), (this._hostTNode = e), (this._hostLView = n);
          }
          get element() {
            return ca(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new We(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = je(this._hostTNode, this._hostLView);
            if (Ae(t)) {
              const e = Ne(t, this._hostLView),
                n = Fe(t);
              return new We(e[1].data[n + 8], e);
            }
            return new We(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = Ka(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, e, n) {
            const s = t.createEmbeddedView(e || {});
            return this.insert(s, n), s;
          }
          createComponent(t, e, n, s, r) {
            const i = n || this.parentInjector;
            if (!r && null == t.ngModule && i) {
              const t = i.get(Ga, null);
              t && (r = t);
            }
            const o = t.create(i, s, void 0, r);
            return this.insert(o.hostView, e), o;
          }
          insert(t, e) {
            const n = t._lView,
              s = n[1];
            if (lt(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  s = new Wa(e, e[6], e[3]);
                s.detach(s.indexOf(t));
              }
            }
            const r = this._adjustIndex(e),
              i = this._lContainer;
            !(function (t, e, n, s) {
              const r = 10 + s,
                i = n.length;
              s > 0 && (n[r - 1][4] = e),
                s < i - 10 ? ((e[4] = n[r]), an(n, 10 + s, e)) : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0), null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(s, n, i, r);
            const o = Qs(r, i),
              a = n[11],
              c = Zs(a, i[7]);
            return (
              null !== c &&
                (function (t, e, n, s, r, i) {
                  (s[0] = r), (s[6] = e), Ks(t, s, n, 1, r, i);
                })(s, i[6], a, n, c, o),
              t.attachToViewContainerRef(),
              an(Ja(i), r, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = Ka(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = Ps(this._lContainer, e);
            n && (cn(Ja(this._lContainer), e), Ms(n[1], n));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = Ps(this._lContainer, e);
            return n && null != cn(Ja(this._lContainer), e) ? new Ra(n) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function Ka(t) {
        return t[8];
      }
      function Ja(t) {
        return t[8] || (t[8] = []);
      }
      function Xa(t, e) {
        let n;
        const s = e[t.index];
        if (lt(s)) n = s;
        else {
          let r;
          if (8 & t.type) r = Tt(s);
          else {
            const n = e[11];
            r = n.createComment('');
            const s = It(t, e);
            Hs(
              n,
              Zs(n, s),
              r,
              (function (t, e) {
                return xt(t) ? t.nextSibling(e) : e.nextSibling;
              })(n, s),
              !1,
            );
          }
          (e[t.index] = n = $r(s, e, r, t)), Kr(e, n);
        }
        return new Wa(n, t, e);
      }
      const tc = {};
      class ec extends oa {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = ot(t);
          return new rc(e, this.ngModule);
        }
      }
      function nc(t) {
        const e = [];
        for (let n in t) t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const sc = new en('SCHEDULER_TOKEN', { providedIn: 'root', factory: () => Es });
      class rc extends ra {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(hr).join(',')),
            (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return nc(this.componentDef.inputs);
        }
        get outputs() {
          return nc(this.componentDef.outputs);
        }
        create(t, e, n, s) {
          const r = (s = s || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, s, r) => {
                      const i = t.get(n, tc, r);
                      return i !== tc || s === tc ? i : e.get(n, s, r);
                    },
                  };
                })(t, s.injector)
              : t,
            i = r.get(da, Ct),
            o = r.get(ma, null),
            a = i.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || 'div',
            l = n
              ? (function (t, e, n) {
                  if (xt(t)) return t.selectRootElement(e, n === D.ShadowDom);
                  let s = 'string' == typeof e ? t.querySelector(e) : e;
                  return (s.textContent = ''), s;
                })(a, n, this.componentDef.encapsulation)
              : Ls(
                  i.createRenderer(null, this.componentDef),
                  c,
                  (function (t) {
                    const e = t.toLowerCase();
                    return 'svg' === e
                      ? 'http://www.w3.org/2000/svg'
                      : 'math' === e
                      ? 'http://www.w3.org/1998/MathML/'
                      : null;
                  })(c),
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = { components: [], scheduler: Es, clean: ni, playerHandler: null, flags: 0 },
            d = Rr(0, null, null, 1, 0, null, null, null, null, null),
            f = Sr(null, d, h, u, null, null, i, a, o, r);
          let p, m;
          oe(f);
          try {
            const t = (function (t, e, n, s, r, i) {
              const o = n[1];
              n[20] = t;
              const a = Er(o, 20, 2, '#host', null),
                c = (a.mergedAttrs = e.hostAttrs);
              null !== c &&
                (li(a, c, !0),
                null !== t &&
                  (xe(r, t, c),
                  null !== a.classes && tr(r, t, a.classes),
                  null !== a.styles && Xs(r, t, a.styles)));
              const l = s.createRenderer(t, e),
                u = Sr(n, Or(e), null, e.onPush ? 64 : 16, n[20], a, s, l, null, null);
              return (
                o.firstCreatePass && (Ve(De(a, n), o, e.type), Hr(o, a), qr(a, n.length, 1)),
                Kr(n, u),
                (n[20] = u)
              );
            })(l, this.componentDef, f, i, a);
            if (l)
              if (n) xe(a, l, ['ng-version', _a.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let s = 1,
                    r = 2;
                  for (; s < t.length; ) {
                    let i = t[s];
                    if ('string' == typeof i)
                      2 === r ? '' !== i && e.push(i, t[++s]) : 8 === r && n.push(i);
                    else {
                      if (!or(r)) break;
                      r = i;
                    }
                    s++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && xe(a, l, t), e && e.length > 0 && tr(a, l, e.join(' '));
              }
            if (((m = At(d, 20)), void 0 !== e)) {
              const t = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const s = e[n];
                t.push(null != s ? Array.from(s) : null);
              }
            }
            (p = (function (t, e, n, s, r) {
              const i = n[1],
                o = (function (t, e, n) {
                  const s = qt();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Zr(t, s, e, xr(t, e, 1, null), n));
                  const r = $e(e, t, s.directiveStart, s);
                  _s(r, e);
                  const i = It(s, e);
                  return i && _s(i, e), r;
                })(i, n, e);
              if (
                (s.components.push(o), (t[8] = o), r && r.forEach((t) => t(o, e)), e.contentQueries)
              ) {
                const t = qt();
                e.contentQueries(1, o, t.directiveStart);
              }
              const a = qt();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (fe(a.index), jr(n[1], a, 0, a.directiveStart, a.directiveEnd, e), Vr(e, o)),
                o
              );
            })(t, this.componentDef, f, h, [Ti])),
              Cr(d, f, null);
          } finally {
            he();
          }
          return new ic(this.componentType, p, ca(m, f), f, m);
        }
      }
      class ic extends class {} {
        constructor(t, e, n, s, r) {
          super(),
            (this.location = n),
            (this._rootLView = s),
            (this._tNode = r),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new La(s)),
            (this.componentType = t);
        }
        get injector() {
          return new We(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const oc = new Map();
      class ac extends Ga {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ec(this));
          const n = at(t),
            s = t[$] || null;
          s && Qo(s),
            (this._bootstrapComponents = Ts(n.bootstrap)),
            (this._r3Injector = _i(
              t,
              e,
              [
                { provide: Ga, useValue: this },
                { provide: oa, useValue: this.componentFactoryResolver },
              ],
              u(t),
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = Ci.THROW_IF_NOT_FOUND, n = A.Default) {
          return t === Ci || t === Ga || t === ui ? this : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class cc extends Ua {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== at(t) &&
              (function (t) {
                const e = new Set();
                !(function t(n) {
                  const s = at(n, !0),
                    r = s.id;
                  null !== r &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${u(e)} vs ${u(e.name)}`,
                        );
                    })(r, oc.get(r), n),
                    oc.set(r, n));
                  const i = Ts(s.imports);
                  for (const o of i) e.has(o) || (e.add(o), t(o));
                })(t);
              })(t);
        }
        create(t) {
          return new ac(this.moduleType, t);
        }
      }
      function lc(t, e, n, s) {
        return dc(Vt(), Qt(), t, e, n, s);
      }
      function uc(t, e, n, s, r) {
        return (function (t, e, n, s, r, i, o) {
          const a = e + n;
          return Vi(t, a, r, i) ? Mi(t, a + 2, o ? s.call(o, r, i) : s(r, i)) : hc(t, a + 2);
        })(Vt(), Qt(), t, e, n, s, r);
      }
      function hc(t, e) {
        const n = t[e];
        return n === dr ? void 0 : n;
      }
      function dc(t, e, n, s, r, i) {
        const o = e + n;
        return ji(t, o, r) ? Mi(t, o + 1, i ? s.call(i, r) : s(r)) : hc(t, o + 1);
      }
      function fc(t, e) {
        const n = Ht();
        let s;
        const r = t + 20;
        n.firstCreatePass
          ? ((s = (function (t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const s = e[n];
                  if (t === s.name) return s;
                }
              throw new g('302', `The pipe '${t}' could not be found!`);
            })(e, n.pipeRegistry)),
            (n.data[r] = s),
            s.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(r, s.onDestroy))
          : (s = n.data[r]);
        const i = s.factory || (s.factory = pt(s.type)),
          o = N(zi);
        try {
          const t = Re(!1),
            e = i();
          return (
            Re(t),
            (function (t, e, n, s) {
              n >= t.data.length && ((t.data[n] = null), (t.blueprint[n] = null)), (e[n] = s);
            })(n, Vt(), r, e),
            e
          );
        } finally {
          N(o);
        }
      }
      function pc(t, e, n) {
        const s = t + 20,
          r = Vt(),
          i = Ft(r, s);
        return (function (t, e) {
          return Li.isWrapped(e) && ((e = Li.unwrap(e)), (t[Wt()] = dr)), e;
        })(
          r,
          (function (t, e) {
            return t[1].data[e].pure;
          })(r, s)
            ? dc(r, Qt(), e, i.transform, n, i)
            : i.transform(n),
        );
      }
      function mc(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const gc = class extends s.xQ {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          var s, i, o;
          let a = t,
            c = e || (() => null),
            l = n;
          if (t && 'object' == typeof t) {
            const e = t;
            (a = null === (s = e.next) || void 0 === s ? void 0 : s.bind(e)),
              (c = null === (i = e.error) || void 0 === i ? void 0 : i.bind(e)),
              (l = null === (o = e.complete) || void 0 === o ? void 0 : o.bind(e));
          }
          this.__isAsync && ((c = mc(c)), a && (a = mc(a)), l && (l = mc(l)));
          const u = super.subscribe({ next: a, error: c, complete: l });
          return t instanceof r.w && t.add(u), u;
        }
      };
      function _c() {
        return this._results[Ri()]();
      }
      class yc {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = Ri(),
            n = yc.prototype;
          n[e] || (n[e] = _c);
        }
        get changes() {
          return this._changes || (this._changes = new gc());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, e) {
          this.dirty = !1;
          const n = rn(t);
          (this._changesDetected = !(function (t, e, n) {
            if (t.length !== e.length) return !1;
            for (let s = 0; s < t.length; s++) {
              let r = t[s],
                i = e[s];
              if ((n && ((r = n(r)), (i = n(i))), i !== r)) return !1;
            }
            return !0;
          })(this._results, n, e)) &&
            ((this._results = n),
            (this.length = n.length),
            (this.last = n[this.length - 1]),
            (this.first = n[0]));
        }
        notifyOnChanges() {
          !this._changes ||
            (!this._changesDetected && this._emitDistinctChangesOnly) ||
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class bc {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new bc(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class vc {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n = null !== t.contentQueries ? t.contentQueries[0] : e.length,
              s = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              s.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new vc(s);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== Lc(t, e).matches && this.queries[e].setDirty();
        }
      }
      class wc {
        constructor(t, e, n = null) {
          (this.predicate = t), (this.flags = e), (this.read = n);
        }
      }
      class Sc {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const s = null !== e ? e.length : 0,
              r = this.getByIndex(n).embeddedTView(t, s);
            r && ((r.indexInDeclarationView = n), null !== e ? e.push(r) : (e = [r]));
          }
          return null !== e ? new Sc(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Ec {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-t.index, e), new Ec(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 8 & n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let s = 0; s < n.length; s++) {
              const r = n[s];
              this.matchTNodeWithReadOption(t, e, xc(e, r)),
                this.matchTNodeWithReadOption(t, e, Ue(e, t, r, !1, !1));
            }
          else
            n === Ba
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Ue(e, t, n, !1, !1));
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const s = this.metadata.read;
            if (null !== s)
              if (s === ua || s === Ya || (s === Ba && 4 & e.type)) this.addMatch(e.index, -2);
              else {
                const n = Ue(e, t, s, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches ? (this.matches = [t, e]) : this.matches.push(t, e);
        }
      }
      function xc(t, e) {
        const n = t.localNames;
        if (null !== n) for (let s = 0; s < n.length; s += 2) if (n[s] === e) return n[s + 1];
        return null;
      }
      function Cc(t, e, n, s) {
        return -1 === n
          ? (function (t, e) {
              return 11 & t.type ? ca(t, e) : 4 & t.type ? za(t, e) : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === ua ? ca(e, t) : n === Ba ? za(e, t) : n === Ya ? Xa(e, t) : void 0;
            })(t, e, s)
          : $e(t, t[1], n, e);
      }
      function Tc(t, e, n, s) {
        const r = e[19].queries[s];
        if (null === r.matches) {
          const s = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const r = i[t];
            o.push(r < 0 ? null : Cc(e, s[r], i[t + 1], n.metadata.read));
          }
          r.matches = o;
        }
        return r.matches;
      }
      function kc(t, e, n, s) {
        const r = t.queries.getByIndex(n),
          i = r.matches;
        if (null !== i) {
          const o = Tc(t, e, r, n);
          for (let t = 0; t < i.length; t += 2) {
            const n = i[t];
            if (n > 0) s.push(o[t / 2]);
            else {
              const r = i[t + 1],
                o = e[-n];
              for (let t = 10; t < o.length; t++) {
                const e = o[t];
                e[17] === e[3] && kc(e[1], e, r, s);
              }
              if (null !== o[9]) {
                const t = o[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  kc(n[1], n, r, s);
                }
              }
            }
          }
        }
        return s;
      }
      function Ic(t) {
        const e = Vt(),
          n = Ht(),
          s = ne();
        se(s + 1);
        const r = Lc(n, s);
        if (t.dirty && Ot(e) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) t.reset([]);
          else {
            const i = r.crossesNgTemplate ? kc(n, e, s, []) : Tc(n, e, r, s);
            t.reset(i, ha), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Ac(t, e, n) {
        const s = Ht();
        s.firstCreatePass &&
          (Rc(s, new wc(t, e, n), -1), 2 == (2 & e) && (s.staticViewQueries = !0)),
          Oc(s, Vt(), e);
      }
      function Fc(t, e, n, s) {
        const r = Ht();
        if (r.firstCreatePass) {
          const i = qt();
          Rc(r, new wc(e, n, s), i.index),
            (function (t, e) {
              const n = t.contentQueries || (t.contentQueries = []);
              e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e);
            })(r, t),
            2 == (2 & n) && (r.staticContentQueries = !0);
        }
        Oc(r, Vt(), n);
      }
      function Nc() {
        return (t = Vt()), (e = ne()), t[19].queries[e].queryList;
        var t, e;
      }
      function Oc(t, e, n) {
        const s = new yc(4 == (4 & n));
        Lr(t, e, s, s.destroy), null === e[19] && (e[19] = new vc()), e[19].queries.push(new bc(s));
      }
      function Rc(t, e, n) {
        null === t.queries && (t.queries = new Sc()), t.queries.track(new Ec(e, n));
      }
      function Lc(t, e) {
        return t.queries.getByIndex(e);
      }
      const Dc = new en('Application Initializer');
      let Pc = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = aa),
              (this.reject = aa),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                if (Xi(e)) t.push(e);
                else if (eo(e)) {
                  const n = new Promise((t, n) => {
                    e.subscribe({ complete: t, error: n });
                  });
                  t.push(n);
                }
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(Dc, 8));
          }),
          (t.ɵprov = v({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Mc = new en('AppId'),
        jc = {
          provide: Mc,
          useFactory: function () {
            return `${Vc()}${Vc()}${Vc()}`;
          },
          deps: [],
        };
      function Vc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Hc = new en('Platform Initializer'),
        Bc = new en('Platform ID'),
        qc = new en('appBootstrapListener');
      let Zc = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = v({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const zc = new en('LocaleId'),
        Gc = new en('DefaultCurrencyCode');
      class Uc {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const $c = function (t) {
          return new cc(t);
        },
        Yc = $c,
        Qc = function (t) {
          return Promise.resolve($c(t));
        },
        Wc = function (t) {
          const e = $c(t),
            n = Ts(at(t).declarations).reduce((t, e) => {
              const n = ot(e);
              return n && t.push(new rc(n)), t;
            }, []);
          return new Uc(e, n);
        },
        Kc = Wc,
        Jc = function (t) {
          return Promise.resolve(Wc(t));
        };
      let Xc = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = Yc),
              (this.compileModuleAsync = Qc),
              (this.compileModuleAndAllComponentsSync = Kc),
              (this.compileModuleAndAllComponentsAsync = Jc);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = v({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const tl = (() => Promise.resolve(0))();
      function el(t) {
        'undefined' == typeof Zone
          ? tl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', t);
      }
      class nl {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new gc(!1)),
            (this.onMicrotaskEmpty = new gc(!1)),
            (this.onStable = new gc(!1)),
            (this.onError = new gc(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js');
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = !n && e),
            (this.shouldCoalesceRunChangeDetection = n),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = H.requestAnimationFrame,
                e = H.cancelAnimationFrame;
              if ('undefined' != typeof Zone && t && e) {
                const n = t[Zone.__symbol__('OriginalDelegate')];
                n && (t = n);
                const s = e[Zone.__symbol__('OriginalDelegate')];
                s && (e = s);
              }
              return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(H, () => {
                      t.fakeTopEventTask ||
                        (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            (t.lastRequestAnimationFrameId = -1),
                              il(t),
                              (t.isCheckStableRunning = !0),
                              rl(t),
                              (t.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {},
                        )),
                        t.fakeTopEventTask.invoke();
                    })),
                    il(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, s, r, i, o, a) => {
                  try {
                    return ol(t), n.invokeTask(r, i, o, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection && 'eventTask' === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      al(t);
                  }
                },
                onInvoke: (n, s, r, i, o, a, c) => {
                  try {
                    return ol(t), n.invoke(r, i, o, a, c);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), al(t);
                  }
                },
                onHasTask: (e, n, s, r) => {
                  e.hasTask(s, r),
                    n === s &&
                      ('microTask' == r.change
                        ? ((t._hasPendingMicrotasks = r.microTask), il(t), rl(t))
                        : 'macroTask' == r.change && (t.hasPendingMacrotasks = r.macroTask));
                },
                onHandleError: (e, n, s, r) => (
                  e.handleError(s, r), t.runOutsideAngular(() => t.onError.emit(r)), !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!nl.isInAngularZone())
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
        static assertNotInAngularZone() {
          if (nl.isInAngularZone())
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, s) {
          const r = this._inner,
            i = r.scheduleEventTask('NgZoneEvent: ' + s, t, sl, aa, aa);
          try {
            return r.runTask(i, e, n);
          } finally {
            r.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const sl = {};
      function rl(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function il(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function ol(t) {
        t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function al(t) {
        t._nesting--, rl(t);
      }
      class cl {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new gc()),
            (this.onMicrotaskEmpty = new gc()),
            (this.onStable = new gc()),
            (this.onError = new gc());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, s) {
          return t.apply(e, n);
        }
      }
      let ll = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      nl.assertNotInAngularZone(),
                        el(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                el(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1),
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let s = -1;
              e &&
                e > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter((t) => t.timeoutId !== s)),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?',
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(bn(nl));
            }),
            (t.ɵprov = v({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ul = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), pl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return pl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = v({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class hl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      function dl(t) {
        pl = t;
      }
      let fl,
        pl = new hl(),
        ml = !0,
        gl = !1;
      function _l() {
        return (gl = !0), ml;
      }
      function yl() {
        if (gl) throw new Error('Cannot enable prod mode after platform setup.');
        ml = !1;
      }
      const bl = new en('AllowMultipleToken');
      class vl {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function wl(t, e, n = []) {
        const s = `Platform: ${e}`,
          r = new en(s);
        return (e = []) => {
          let i = Sl();
          if (!i || i.injector.get(bl, !1))
            if (t) t(n.concat(e).concat({ provide: r, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat({ provide: r, useValue: !0 }, { provide: di, useValue: 'platform' });
              !(function (t) {
                if (fl && !fl.destroyed && !fl.injector.get(bl, !1))
                  throw new Error(
                    'There can be only one platform. Destroy the previous one to create a new one.',
                  );
                fl = t.get(El);
                const e = t.get(Hc, null);
                e && e.forEach((t) => t());
              })(Ci.create({ providers: t, name: s }));
            }
          return (function (t) {
            const e = Sl();
            if (!e) throw new Error('No platform exists!');
            if (!e.injector.get(t, null))
              throw new Error(
                'A platform with a different configuration has been created. Please destroy it first.',
              );
            return e;
          })(r);
        };
      }
      function Sl() {
        return fl && !fl.destroyed ? fl : null;
      }
      let El = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    'noop' === t
                      ? new cl()
                      : ('zone.js' === t ? void 0 : t) ||
                        new nl({
                          enableLongStackTrace: _l(),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              s = [{ provide: nl, useValue: n }];
            return n.run(() => {
              const e = Ci.create({ providers: s, parent: this.injector, name: t.moduleType.name }),
                r = t.create(e),
                i = r.injector.get(Ss, null);
              if (!i)
                throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  });
                  r.onDestroy(() => {
                    Tl(this._modules, r), t.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const s = n();
                    return Xi(s)
                      ? s.catch((n) => {
                          throw (e.runOutsideAngular(() => t.handleError(n)), n);
                        })
                      : s;
                  } catch (s) {
                    throw (e.runOutsideAngular(() => t.handleError(s)), s);
                  }
                })(i, n, () => {
                  const t = r.injector.get(Pc);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Qo(r.injector.get(zc, 'en-US') || 'en-US'), this._moduleDoBootstrap(r), r
                      ),
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = xl({}, e);
            return (function (t, e, n) {
              const s = new cc(n);
              return Promise.resolve(s);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Cl);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${u(
                    t.instance.constructor,
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`,
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new Error('The platform has already been destroyed!');
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(Ci));
          }),
          (t.ɵprov = v({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function xl(t, e) {
        return Array.isArray(e) ? e.reduce(xl, t) : Object.assign(Object.assign({}, t), e);
      }
      let Cl = (() => {
        class t {
          constructor(t, e, n, s, r) {
            (this._zone = t),
              (this._injector = e),
              (this._exceptionHandler = n),
              (this._componentFactoryResolver = s),
              (this._initStatus = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              }));
            const c = new i.y((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              l = new i.y((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    nl.assertNotInAngularZone(),
                      el(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  nl.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (0, o.T)(c, l.pipe((0, a.B)()));
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.',
              );
            let n;
            (n = t instanceof ra ? t : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const s = n.isBoundToModule ? void 0 : this._injector.get(Ga),
              r = n.create(Ci.NULL, [], e || n.selector, s),
              i = r.location.nativeElement,
              o = r.injector.get(ll, null),
              a = o && r.injector.get(ul);
            return (
              o && a && a.registerApplication(i, o),
              r.onDestroy(() => {
                this.detachView(r.hostView),
                  Tl(this.components, r),
                  a && a.unregisterApplication(i);
              }),
              this._loadComponent(r),
              r
            );
          }
          tick() {
            if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively');
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t));
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Tl(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(qc, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(nl), bn(Ci), bn(Ss), bn(oa), bn(Pc));
          }),
          (t.ɵprov = v({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Tl(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class kl {}
      class Il {}
      const Al = { factoryPathPrefix: '', factoryPathSuffix: '.ngfactory' };
      let Fl = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Al);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, s] = t.split('#');
            return (
              void 0 === s && (s = 'default'),
              n(8255)(e)
                .then((t) => t[s])
                .then((t) => Nl(t, e, s))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, s] = t.split('#'),
              r = 'NgFactory';
            return (
              void 0 === s && ((s = 'default'), (r = '')),
              n(8255)(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix)
                .then((t) => t[s + r])
                .then((t) => Nl(t, e, s))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(Xc), bn(Il, 8));
          }),
          (t.ɵprov = v({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Nl(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const Ol = function (t) {
          return null;
        },
        Rl = wl(null, 'core', [
          { provide: Bc, useValue: 'unknown' },
          { provide: El, deps: [Ci] },
          { provide: ul, deps: [] },
          { provide: Zc, deps: [] },
        ]),
        Ll = [
          { provide: Cl, useClass: Cl, deps: [nl, Ci, Ss, oa, Pc] },
          {
            provide: sc,
            deps: [nl],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: Pc, useClass: Pc, deps: [[new xn(), Dc]] },
          { provide: Xc, useClass: Xc, deps: [] },
          jc,
          {
            provide: Aa,
            useFactory: function () {
              return ja;
            },
            deps: [],
          },
          {
            provide: Na,
            useFactory: function () {
              return Va;
            },
            deps: [],
          },
          {
            provide: zc,
            useFactory: function (t) {
              return (
                Qo((t = t || ('undefined' != typeof $localize && $localize.locale) || 'en-US')), t
              );
            },
            deps: [[new En(zc), new xn(), new Cn()]],
          },
          { provide: Gc, useValue: 'USD' },
        ];
      let Dl = (() => {
        class t {
          constructor(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(bn(Cl));
          }),
          (t.ɵmod = et({ type: t })),
          (t.ɵinj = w({ providers: Ll })),
          t
        );
      })();
    },
    4369: function (t, e, n) {
      'use strict';
      n.d(e, {
        lW: function () {
          return d;
        },
        ot: function () {
          return f;
        },
      });
      var s = n(7064),
        r = n(6136),
        i = n(5366),
        o = n(7388);
      const a = ['mat-button', ''],
        c = ['*'],
        l = [
          'mat-button',
          'mat-flat-button',
          'mat-icon-button',
          'mat-raised-button',
          'mat-stroked-button',
          'mat-mini-fab',
          'mat-fab',
        ];
      class u {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const h = (0, s.pj)((0, s.Id)((0, s.Kr)(u)));
      let d = (() => {
          class t extends h {
            constructor(t, e, n) {
              super(t),
                (this._focusMonitor = e),
                (this._animationMode = n),
                (this.isRoundButton = this._hasHostAttributes('mat-fab', 'mat-mini-fab')),
                (this.isIconButton = this._hasHostAttributes('mat-icon-button'));
              for (const s of l)
                this._hasHostAttributes(s) && this._getHostElement().classList.add(s);
              t.nativeElement.classList.add('mat-button-base'),
                this.isRoundButton && (this.color = 'accent');
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t, e) {
              t
                ? this._focusMonitor.focusVia(this._getHostElement(), t, e)
                : this._getHostElement().focus(e);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some((t) => this._getHostElement().hasAttribute(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(i.Y36(i.SBq), i.Y36(o.tE), i.Y36(r.Qb, 8));
            }),
            (t.ɵcmp = i.Xpm({
              type: t,
              selectors: [
                ['button', 'mat-button', ''],
                ['button', 'mat-raised-button', ''],
                ['button', 'mat-icon-button', ''],
                ['button', 'mat-fab', ''],
                ['button', 'mat-mini-fab', ''],
                ['button', 'mat-stroked-button', ''],
                ['button', 'mat-flat-button', ''],
              ],
              viewQuery: function (t, e) {
                if ((1 & t && i.Gf(s.wG, 5), 2 & t)) {
                  let t;
                  i.iGM((t = i.CRH())) && (e.ripple = t.first);
                }
              },
              hostAttrs: [1, 'mat-focus-indicator'],
              hostVars: 5,
              hostBindings: function (t, e) {
                2 & t &&
                  (i.uIk('disabled', e.disabled || null),
                  i.ekj('_mat-animation-noopable', 'NoopAnimations' === e._animationMode)(
                    'mat-button-disabled',
                    e.disabled,
                  ));
              },
              inputs: { disabled: 'disabled', disableRipple: 'disableRipple', color: 'color' },
              exportAs: ['matButton'],
              features: [i.qOj],
              attrs: a,
              ngContentSelectors: c,
              decls: 4,
              vars: 5,
              consts: [
                [1, 'mat-button-wrapper'],
                [
                  'matRipple',
                  '',
                  1,
                  'mat-button-ripple',
                  3,
                  'matRippleDisabled',
                  'matRippleCentered',
                  'matRippleTrigger',
                ],
                [1, 'mat-button-focus-overlay'],
              ],
              template: function (t, e) {
                1 & t &&
                  (i.F$t(),
                  i.TgZ(0, 'span', 0),
                  i.Hsn(1),
                  i.qZA(),
                  i._UZ(2, 'span', 1),
                  i._UZ(3, 'span', 2)),
                  2 & t &&
                    (i.xp6(2),
                    i.ekj('mat-button-ripple-round', e.isRoundButton || e.isIconButton),
                    i.Q6J('matRippleDisabled', e._isRippleDisabled())(
                      'matRippleCentered',
                      e.isIconButton,
                    )('matRippleTrigger', e._getHostElement()));
              },
              directives: [s.wG],
              styles: [
                '.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        f = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = i.oAB({ type: t })),
            (t.ɵinj = i.cJS({ imports: [[s.si, s.BQ], s.BQ] })),
            t
          );
        })();
    },
    7064: function (t, e, n) {
      'use strict';
      n.d(e, {
        Y2: function () {
          return C;
        },
        BQ: function () {
          return p;
        },
        wG: function () {
          return T;
        },
        si: function () {
          return k;
        },
        IR: function () {
          return x;
        },
        pj: function () {
          return g;
        },
        Kr: function () {
          return _;
        },
        Id: function () {
          return m;
        },
        sb: function () {
          return y;
        },
      });
      var s = n(5366),
        r = n(7388),
        i = n(4720);
      const o = new s.GfV('12.0.0-rc.0');
      var a = n(1116),
        c = n(9861),
        l = (n(5959), n(3169)),
        u = n(6136);
      n(9235);
      const h = new s.GfV('12.0.0-rc.0'),
        d = new s.OlP('mat-sanity-checks', {
          providedIn: 'root',
          factory: function () {
            return !0;
          },
        });
      let f,
        p = (() => {
          class t {
            constructor(t, e, n) {
              (this._hasDoneGlobalChecks = !1),
                (this._document = n),
                t._applyBodyHighContrastModeCssClasses(),
                (this._sanityChecks = e),
                this._hasDoneGlobalChecks ||
                  (this._checkDoctypeIsDefined(),
                  this._checkThemeIsPresent(),
                  this._checkCdkVersionMatch(),
                  (this._hasDoneGlobalChecks = !0));
            }
            _getWindow() {
              const t = this._document.defaultView || window;
              return 'object' == typeof t && t ? t : null;
            }
            _checksAreEnabled() {
              return (0, s.X6Q)() && !this._isTestEnv();
            }
            _isTestEnv() {
              const t = this._getWindow();
              return t && (t.__karma__ || t.jasmine);
            }
            _checkDoctypeIsDefined() {
              this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.doctype) &&
                !this._document.doctype &&
                console.warn(
                  'Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.',
                );
            }
            _checkThemeIsPresent() {
              if (
                !this._checksAreEnabled() ||
                !1 === this._sanityChecks ||
                !this._sanityChecks.theme ||
                !this._document.body ||
                'function' != typeof getComputedStyle
              )
                return;
              const t = this._document.createElement('div');
              t.classList.add('mat-theme-loaded-marker'), this._document.body.appendChild(t);
              const e = getComputedStyle(t);
              e &&
                'none' !== e.display &&
                console.warn(
                  'Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming',
                ),
                this._document.body.removeChild(t);
            }
            _checkCdkVersionMatch() {
              this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.version) &&
                h.full !== o.full &&
                console.warn(
                  'The Angular Material version (' +
                    h.full +
                    ') does not match the Angular CDK version (' +
                    o.full +
                    ').\nPlease ensure the versions of these two packages exactly match.',
                );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.LFG(r.qm), s.LFG(d, 8), s.LFG(a.K0));
            }),
            (t.ɵmod = s.oAB({ type: t })),
            (t.ɵinj = s.cJS({ imports: [[i.vT], i.vT] })),
            t
          );
        })();
      function m(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = (0, c.Ig)(t);
          }
        };
      }
      function g(t, e) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.defaultColor = e), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const e = t || this.defaultColor;
            e !== this._color &&
              (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),
              e && this._elementRef.nativeElement.classList.add(`mat-${e}`),
              (this._color = e));
          }
        };
      }
      function _(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = (0, c.Ig)(t);
          }
        };
      }
      function y(t, e = 0) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._tabIndex = e), (this.defaultTabIndex = e);
          }
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(t) {
            this._tabIndex = null != t ? (0, c.su)(t) : this.defaultTabIndex;
          }
        };
      }
      try {
        f = 'undefined' != typeof Intl;
      } catch (I) {
        f = !1;
      }
      class b {
        constructor(t, e, n) {
          (this._renderer = t), (this.element = e), (this.config = n), (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const v = { enterDuration: 450, exitDuration: 400 },
        w = (0, l.i$)({ passive: !0 }),
        S = ['mousedown', 'touchstart'],
        E = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
      class x {
        constructor(t, e, n, s) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            s.isBrowser && (this._containerElement = (0, c.fI)(n));
        }
        fadeInRipple(t, e, n = {}) {
          const s = (this._containerRect =
              this._containerRect || this._containerElement.getBoundingClientRect()),
            r = Object.assign(Object.assign({}, v), n.animation);
          n.centered && ((t = s.left + s.width / 2), (e = s.top + s.height / 2));
          const i =
              n.radius ||
              (function (t, e, n) {
                const s = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                  r = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                return Math.sqrt(s * s + r * r);
              })(t, e, s),
            o = t - s.left,
            a = e - s.top,
            c = r.enterDuration,
            l = document.createElement('div');
          l.classList.add('mat-ripple-element'),
            (l.style.left = o - i + 'px'),
            (l.style.top = a - i + 'px'),
            (l.style.height = 2 * i + 'px'),
            (l.style.width = 2 * i + 'px'),
            null != n.color && (l.style.backgroundColor = n.color),
            (l.style.transitionDuration = `${c}ms`),
            this._containerElement.appendChild(l),
            window.getComputedStyle(l).getPropertyValue('opacity'),
            (l.style.transform = 'scale(1)');
          const u = new b(this, l, n);
          return (
            (u.state = 0),
            this._activeRipples.add(u),
            n.persistent || (this._mostRecentTransientRipple = u),
            this._runTimeoutOutsideZone(() => {
              const t = u === this._mostRecentTransientRipple;
              (u.state = 1), n.persistent || (t && this._isPointerDown) || u.fadeOut();
            }, c),
            u
          );
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (
            (t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !e)
          )
            return;
          const n = t.element,
            s = Object.assign(Object.assign({}, v), t.config.animation);
          (n.style.transitionDuration = `${s.exitDuration}ms`),
            (n.style.opacity = '0'),
            (t.state = 2),
            this._runTimeoutOutsideZone(() => {
              (t.state = 3), n.parentNode.removeChild(n);
            }, s.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((t) => t.fadeOut());
        }
        setupTriggerEvents(t) {
          const e = (0, c.fI)(t);
          e &&
            e !== this._triggerElement &&
            (this._removeTriggerEvents(), (this._triggerElement = e), this._registerEvents(S));
        }
        handleEvent(t) {
          'mousedown' === t.type
            ? this._onMousedown(t)
            : 'touchstart' === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(E), (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(t) {
          const e = (0, r.X6)(t),
            n = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
          this._target.rippleDisabled ||
            e ||
            n ||
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !(0, r.yG)(t)) {
            (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let t = 0; t < e.length; t++)
              this.fadeInRipple(e[t].clientX, e[t].clientY, this._target.rippleConfig);
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((t) => {
              !t.config.persistent &&
                (1 === t.state || (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach((t) => {
              this._triggerElement.addEventListener(t, this, w);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (S.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, w);
            }),
            this._pointerUpEventsRegistered &&
              E.forEach((t) => {
                this._triggerElement.removeEventListener(t, this, w);
              }));
        }
      }
      const C = new s.OlP('mat-ripple-global-options');
      let T = (() => {
          class t {
            constructor(t, e, n, s, r) {
              (this._elementRef = t),
                (this._animationMode = r),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = s || {}),
                (this._rippleRenderer = new x(this, e, t, n));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = t), this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    'NoopAnimations' === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {},
                  ),
                  this.animation,
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, e = 0, n) {
              return 'number' == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    e,
                    Object.assign(Object.assign({}, this.rippleConfig), n),
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), t),
                  );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                s.Y36(s.SBq),
                s.Y36(s.R0b),
                s.Y36(l.t4),
                s.Y36(C, 8),
                s.Y36(u.Qb, 8),
              );
            }),
            (t.ɵdir = s.lG2({
              type: t,
              selectors: [
                ['', 'mat-ripple', ''],
                ['', 'matRipple', ''],
              ],
              hostAttrs: [1, 'mat-ripple'],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && s.ekj('mat-ripple-unbounded', e.unbounded);
              },
              inputs: {
                radius: ['matRippleRadius', 'radius'],
                disabled: ['matRippleDisabled', 'disabled'],
                trigger: ['matRippleTrigger', 'trigger'],
                color: ['matRippleColor', 'color'],
                unbounded: ['matRippleUnbounded', 'unbounded'],
                centered: ['matRippleCentered', 'centered'],
                animation: ['matRippleAnimation', 'animation'],
              },
              exportAs: ['matRipple'],
            })),
            t
          );
        })(),
        k = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = s.oAB({ type: t })),
            (t.ɵinj = s.cJS({ imports: [[p, l.ud], p] })),
            t
          );
        })();
    },
    4431: function (t, e, n) {
      'use strict';
      n.d(e, {
        Hw: function () {
          return M;
        },
        Ps: function () {
          return j;
        },
        jv: function () {
          return I;
        },
      });
      var s = n(5366),
        r = n(7064),
        i = n(9861),
        o = n(1116),
        a = n(8318),
        c = n(8470),
        l = n(9996),
        u = n(2056),
        h = n(9764);
      function d(t, e) {
        return new a.y((n) => {
          const s = t.length;
          if (0 === s) return void n.complete();
          const r = new Array(s);
          let i = 0,
            o = 0;
          for (let a = 0; a < s; a++) {
            const c = (0, h.D)(t[a]);
            let l = !1;
            n.add(
              c.subscribe({
                next: (t) => {
                  l || ((l = !0), o++), (r[a] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  i++,
                    (i !== s && l) ||
                      (o === s && n.next(e ? e.reduce((t, e, n) => ((t[e] = r[n]), t), {}) : r),
                      n.complete());
                },
              }),
            );
          }
        });
      }
      var f = n(878),
        p = n(1225),
        m = n(7570),
        g = n(4019),
        _ = n(7727),
        y = n(1520),
        b = n(619),
        v = n(611),
        w = n(2693),
        S = n(9624);
      const E = ['*'];
      function x(t) {
        return Error(`Unable to find icon with the name "${t}"`);
      }
      function C(t) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`,
        );
      }
      function T(t) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`,
        );
      }
      class k {
        constructor(t, e, n) {
          (this.url = t), (this.svgText = e), (this.options = n);
        }
      }
      let I = (() => {
        class t {
          constructor(t, e, n, s) {
            (this._httpClient = t),
              (this._sanitizer = e),
              (this._errorHandler = s),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = 'material-icons'),
              (this._document = n);
          }
          addSvgIcon(t, e, n) {
            return this.addSvgIconInNamespace('', t, e, n);
          }
          addSvgIconLiteral(t, e, n) {
            return this.addSvgIconLiteralInNamespace('', t, e, n);
          }
          addSvgIconInNamespace(t, e, n, s) {
            return this._addSvgIconConfig(t, e, new k(n, null, s));
          }
          addSvgIconResolver(t) {
            return this._resolvers.push(t), this;
          }
          addSvgIconLiteralInNamespace(t, e, n, r) {
            const i = this._sanitizer.sanitize(s.q3G.HTML, n);
            if (!i) throw T(n);
            return this._addSvgIconConfig(t, e, new k('', i, r));
          }
          addSvgIconSet(t, e) {
            return this.addSvgIconSetInNamespace('', t, e);
          }
          addSvgIconSetLiteral(t, e) {
            return this.addSvgIconSetLiteralInNamespace('', t, e);
          }
          addSvgIconSetInNamespace(t, e, n) {
            return this._addSvgIconSetConfig(t, new k(e, null, n));
          }
          addSvgIconSetLiteralInNamespace(t, e, n) {
            const r = this._sanitizer.sanitize(s.q3G.HTML, e);
            if (!r) throw T(e);
            return this._addSvgIconSetConfig(t, new k('', r, n));
          }
          registerFontClassAlias(t, e = t) {
            return this._fontCssClassesByAlias.set(t, e), this;
          }
          classNameForFontAlias(t) {
            return this._fontCssClassesByAlias.get(t) || t;
          }
          setDefaultFontSetClass(t) {
            return (this._defaultFontSetClass = t), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(t) {
            const e = this._sanitizer.sanitize(s.q3G.RESOURCE_URL, t);
            if (!e) throw C(t);
            const n = this._cachedIconsByUrl.get(e);
            return n
              ? (0, f.of)(A(n))
              : this._loadSvgIconFromConfig(new k(t, null)).pipe(
                  (0, g.b)((t) => this._cachedIconsByUrl.set(e, t)),
                  (0, l.U)((t) => A(t)),
                );
          }
          getNamedSvgIcon(t, e = '') {
            const n = F(e, t);
            let s = this._svgIconConfigs.get(n);
            if (s) return this._getSvgFromConfig(s);
            if (((s = this._getIconConfigFromResolvers(e, t)), s))
              return this._svgIconConfigs.set(n, s), this._getSvgFromConfig(s);
            const r = this._iconSetConfigs.get(e);
            return r ? this._getSvgFromIconSetConfigs(t, r) : (0, p._)(x(n));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(t) {
            return t.svgText
              ? (0, f.of)(A(this._svgElementFromConfig(t)))
              : this._loadSvgIconFromConfig(t).pipe((0, l.U)((t) => A(t)));
          }
          _getSvgFromIconSetConfigs(t, e) {
            const n = this._extractIconWithNameFromAnySet(t, e);
            return n
              ? (0, f.of)(n)
              : (function (...t) {
                  if (1 === t.length) {
                    const e = t[0];
                    if ((0, c.k)(e)) return d(e, null);
                    if ((0, u.K)(e) && Object.getPrototypeOf(e) === Object.prototype) {
                      const t = Object.keys(e);
                      return d(
                        t.map((t) => e[t]),
                        t,
                      );
                    }
                  }
                  if ('function' == typeof t[t.length - 1]) {
                    const e = t.pop();
                    return d((t = 1 === t.length && (0, c.k)(t[0]) ? t[0] : t), null).pipe(
                      (0, l.U)((t) => e(...t)),
                    );
                  }
                  return d(t, null);
                })(
                  e
                    .filter((t) => !t.svgText)
                    .map((t) =>
                      this._loadSvgIconSetFromConfig(t).pipe(
                        (0, _.K)((e) => {
                          const n = this._sanitizer.sanitize(s.q3G.RESOURCE_URL, t.url);
                          return (
                            this._errorHandler.handleError(
                              new Error(`Loading icon set URL: ${n} failed: ${e.message}`),
                            ),
                            (0, f.of)(null)
                          );
                        }),
                      ),
                    ),
                ).pipe(
                  (0, l.U)(() => {
                    const n = this._extractIconWithNameFromAnySet(t, e);
                    if (!n) throw x(t);
                    return n;
                  }),
                );
          }
          _extractIconWithNameFromAnySet(t, e) {
            for (let n = e.length - 1; n >= 0; n--) {
              const s = e[n];
              if (s.svgText && s.svgText.indexOf(t) > -1) {
                const e = this._svgElementFromConfig(s),
                  n = this._extractSvgIconFromSet(e, t, s.options);
                if (n) return n;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(t) {
            return this._fetchIcon(t).pipe(
              (0, g.b)((e) => (t.svgText = e)),
              (0, l.U)(() => this._svgElementFromConfig(t)),
            );
          }
          _loadSvgIconSetFromConfig(t) {
            return t.svgText
              ? (0, f.of)(null)
              : this._fetchIcon(t).pipe((0, g.b)((e) => (t.svgText = e)));
          }
          _extractSvgIconFromSet(t, e, n) {
            const s = t.querySelector(`[id="${e}"]`);
            if (!s) return null;
            const r = s.cloneNode(!0);
            if ((r.removeAttribute('id'), 'svg' === r.nodeName.toLowerCase()))
              return this._setSvgAttributes(r, n);
            if ('symbol' === r.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(r), n);
            const i = this._svgElementFromString('<svg></svg>');
            return i.appendChild(r), this._setSvgAttributes(i, n);
          }
          _svgElementFromString(t) {
            const e = this._document.createElement('DIV');
            e.innerHTML = t;
            const n = e.querySelector('svg');
            if (!n) throw Error('<svg> tag not found');
            return n;
          }
          _toSvgElement(t) {
            const e = this._svgElementFromString('<svg></svg>'),
              n = t.attributes;
            for (let s = 0; s < n.length; s++) {
              const { name: t, value: r } = n[s];
              'id' !== t && e.setAttribute(t, r);
            }
            for (let s = 0; s < t.childNodes.length; s++)
              t.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
                e.appendChild(t.childNodes[s].cloneNode(!0));
            return e;
          }
          _setSvgAttributes(t, e) {
            return (
              t.setAttribute('fit', ''),
              t.setAttribute('height', '100%'),
              t.setAttribute('width', '100%'),
              t.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
              t.setAttribute('focusable', 'false'),
              e && e.viewBox && t.setAttribute('viewBox', e.viewBox),
              t
            );
          }
          _fetchIcon(t) {
            var e;
            const { url: n, options: r } = t,
              i = null !== (e = null == r ? void 0 : r.withCredentials) && void 0 !== e && e;
            if (!this._httpClient)
              throw Error(
                'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.',
              );
            if (null == n) throw Error(`Cannot fetch icon from URL "${n}".`);
            const o = this._sanitizer.sanitize(s.q3G.RESOURCE_URL, n);
            if (!o) throw C(n);
            const a = this._inProgressUrlFetches.get(o);
            if (a) return a;
            const c = this._httpClient.get(o, { responseType: 'text', withCredentials: i }).pipe(
              (0, y.x)(() => this._inProgressUrlFetches.delete(o)),
              (0, b.B)(),
            );
            return this._inProgressUrlFetches.set(o, c), c;
          }
          _addSvgIconConfig(t, e, n) {
            return this._svgIconConfigs.set(F(t, e), n), this;
          }
          _addSvgIconSetConfig(t, e) {
            const n = this._iconSetConfigs.get(t);
            return n ? n.push(e) : this._iconSetConfigs.set(t, [e]), this;
          }
          _svgElementFromConfig(t) {
            if (!t.svgElement) {
              const e = this._svgElementFromString(t.svgText);
              this._setSvgAttributes(e, t.options), (t.svgElement = e);
            }
            return t.svgElement;
          }
          _getIconConfigFromResolvers(t, e) {
            for (let s = 0; s < this._resolvers.length; s++) {
              const r = this._resolvers[s](e, t);
              if (r)
                return (n = r).url && n.options ? new k(r.url, null, r.options) : new k(r, null);
            }
            var n;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.LFG(w.eN, 8), s.LFG(S.H7), s.LFG(o.K0, 8), s.LFG(s.qLn));
          }),
          (t.ɵprov = s.Yz7({
            factory: function () {
              return new t(s.LFG(w.eN, 8), s.LFG(S.H7), s.LFG(o.K0, 8), s.LFG(s.qLn));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      function A(t) {
        return t.cloneNode(!0);
      }
      function F(t, e) {
        return t + ':' + e;
      }
      class N {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const O = (0, r.pj)(N),
        R = new s.OlP('mat-icon-location', {
          providedIn: 'root',
          factory: function () {
            const t = (0, s.f3M)(o.K0),
              e = t ? t.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : '') };
          },
        }),
        L = [
          'clip-path',
          'color-profile',
          'src',
          'cursor',
          'fill',
          'filter',
          'marker',
          'marker-start',
          'marker-mid',
          'marker-end',
          'mask',
          'stroke',
        ],
        D = L.map((t) => `[${t}]`).join(', '),
        P = /^url\(['"]?#(.*?)['"]?\)$/;
      let M = (() => {
          class t extends O {
            constructor(t, e, n, s, r) {
              super(t),
                (this._iconRegistry = e),
                (this._location = s),
                (this._errorHandler = r),
                (this._inline = !1),
                (this._currentIconFetch = m.w.EMPTY),
                n || t.nativeElement.setAttribute('aria-hidden', 'true');
            }
            get inline() {
              return this._inline;
            }
            set inline(t) {
              this._inline = (0, i.Ig)(t);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(t) {
              t !== this._svgIcon &&
                (t ? this._updateSvgIcon(t) : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = t));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(t) {
              const e = this._cleanupFontValue(t);
              e !== this._fontSet && ((this._fontSet = e), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(t) {
              const e = this._cleanupFontValue(t);
              e !== this._fontIcon && ((this._fontIcon = e), this._updateFontIconClasses());
            }
            _splitIconName(t) {
              if (!t) return ['', ''];
              const e = t.split(':');
              switch (e.length) {
                case 1:
                  return ['', e[0]];
                case 2:
                  return e;
                default:
                  throw Error(`Invalid icon name: "${t}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const t = this._elementsWithExternalReferences;
              if (t && t.size) {
                const t = this._location.getPathname();
                t !== this._previousPath &&
                  ((this._previousPath = t), this._prependPathToReferences(t));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(t) {
              this._clearSvgElement();
              const e = t.querySelectorAll('style');
              for (let s = 0; s < e.length; s++) e[s].textContent += ' ';
              const n = this._location.getPathname();
              (this._previousPath = n),
                this._cacheChildrenWithExternalReferences(t),
                this._prependPathToReferences(n),
                this._elementRef.nativeElement.appendChild(t);
            }
            _clearSvgElement() {
              const t = this._elementRef.nativeElement;
              let e = t.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                e--;

              ) {
                const n = t.childNodes[e];
                (1 === n.nodeType && 'svg' !== n.nodeName.toLowerCase()) || t.removeChild(n);
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const t = this._elementRef.nativeElement,
                e = this.fontSet
                  ? this._iconRegistry.classNameForFontAlias(this.fontSet)
                  : this._iconRegistry.getDefaultFontSetClass();
              e != this._previousFontSetClass &&
                (this._previousFontSetClass && t.classList.remove(this._previousFontSetClass),
                e && t.classList.add(e),
                (this._previousFontSetClass = e)),
                this.fontIcon != this._previousFontIconClass &&
                  (this._previousFontIconClass && t.classList.remove(this._previousFontIconClass),
                  this.fontIcon && t.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(t) {
              return 'string' == typeof t ? t.trim().split(' ')[0] : t;
            }
            _prependPathToReferences(t) {
              const e = this._elementsWithExternalReferences;
              e &&
                e.forEach((e, n) => {
                  e.forEach((e) => {
                    n.setAttribute(e.name, `url('${t}#${e.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(t) {
              const e = t.querySelectorAll(D),
                n = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let s = 0; s < e.length; s++)
                L.forEach((t) => {
                  const r = e[s],
                    i = r.getAttribute(t),
                    o = i ? i.match(P) : null;
                  if (o) {
                    let e = n.get(r);
                    e || ((e = []), n.set(r, e)), e.push({ name: t, value: o[1] });
                  }
                });
            }
            _updateSvgIcon(t) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                t)
              ) {
                const [e, n] = this._splitIconName(t);
                e && (this._svgNamespace = e),
                  n && (this._svgName = n),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(n, e)
                    .pipe((0, v.q)(1))
                    .subscribe(
                      (t) => this._setSvgElement(t),
                      (t) => {
                        this._errorHandler.handleError(
                          new Error(`Error retrieving icon ${e}:${n}! ${t.message}`),
                        );
                      },
                    ));
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                s.Y36(s.SBq),
                s.Y36(I),
                s.$8M('aria-hidden'),
                s.Y36(R),
                s.Y36(s.qLn),
              );
            }),
            (t.ɵcmp = s.Xpm({
              type: t,
              selectors: [['mat-icon']],
              hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
              hostVars: 7,
              hostBindings: function (t, e) {
                2 & t &&
                  (s.uIk('data-mat-icon-type', e._usingFontIcon() ? 'font' : 'svg')(
                    'data-mat-icon-name',
                    e._svgName || e.fontIcon,
                  )('data-mat-icon-namespace', e._svgNamespace || e.fontSet),
                  s.ekj('mat-icon-inline', e.inline)(
                    'mat-icon-no-color',
                    'primary' !== e.color && 'accent' !== e.color && 'warn' !== e.color,
                  ));
              },
              inputs: {
                color: 'color',
                inline: 'inline',
                svgIcon: 'svgIcon',
                fontSet: 'fontSet',
                fontIcon: 'fontIcon',
              },
              exportAs: ['matIcon'],
              features: [s.qOj],
              ngContentSelectors: E,
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && (s.F$t(), s.Hsn(0));
              },
              styles: [
                '.mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        j = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = s.oAB({ type: t })),
            (t.ɵinj = s.cJS({ imports: [[r.BQ], r.BQ] })),
            t
          );
        })();
    },
    6136: function (t, e, n) {
      'use strict';
      n.d(e, {
        Qb: function () {
          return _e;
        },
        PW: function () {
          return we;
        },
      });
      var s = n(5366),
        r = n(9624),
        i = n(9713);
      function o() {
        return 'undefined' != typeof window && void 0 !== window.document;
      }
      function a() {
        return 'undefined' != typeof process && '[object process]' === {}.toString.call(process);
      }
      function c(t) {
        switch (t.length) {
          case 0:
            return new i.ZN();
          case 1:
            return t[0];
          default:
            return new i.ZE(t);
        }
      }
      function l(t, e, n, s, r = {}, o = {}) {
        const a = [],
          c = [];
        let l = -1,
          u = null;
        if (
          (s.forEach((t) => {
            const n = t.offset,
              s = n == l,
              h = (s && u) || {};
            Object.keys(t).forEach((n) => {
              let s = n,
                c = t[n];
              if ('offset' !== n)
                switch (((s = e.normalizePropertyName(s, a)), c)) {
                  case i.k1:
                    c = r[n];
                    break;
                  case i.l3:
                    c = o[n];
                    break;
                  default:
                    c = e.normalizeStyleValue(n, s, c, a);
                }
              h[s] = c;
            }),
              s || c.push(h),
              (u = h),
              (l = n);
          }),
          a.length)
        ) {
          const t = '\n - ';
          throw new Error(`Unable to animate due to the following errors:${t}${a.join(t)}`);
        }
        return c;
      }
      function u(t, e, n, s) {
        switch (e) {
          case 'start':
            t.onStart(() => s(n && h(n, 'start', t)));
            break;
          case 'done':
            t.onDone(() => s(n && h(n, 'done', t)));
            break;
          case 'destroy':
            t.onDestroy(() => s(n && h(n, 'destroy', t)));
        }
      }
      function h(t, e, n) {
        const s = n.totalTime,
          r = d(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == s ? t.totalTime : s,
            !!n.disabled,
          ),
          i = t._data;
        return null != i && (r._data = i), r;
      }
      function d(t, e, n, s, r = '', i = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: s,
          phaseName: r,
          totalTime: i,
          disabled: !!o,
        };
      }
      function f(t, e, n) {
        let s;
        return (
          t instanceof Map
            ? ((s = t.get(e)), s || t.set(e, (s = n)))
            : ((s = t[e]), s || (s = t[e] = n)),
          s
        );
      }
      function p(t) {
        const e = t.indexOf(':');
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let m = (t, e) => !1,
        g = (t, e) => !1,
        _ = (t, e, n) => [];
      const y = a();
      (y || 'undefined' != typeof Element) &&
        ((m = o()
          ? (t, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === t) return !0;
                e = e.parentNode || e.host;
              }
              return !1;
            }
          : (t, e) => t.contains(e)),
        (g = (() => {
          if (y || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (t, n) => e.apply(t, [n]) : g;
          }
        })()),
        (_ = (t, e, n) => {
          let s = [];
          if (n) {
            const n = t.querySelectorAll(e);
            for (let t = 0; t < n.length; t++) s.push(n[t]);
          } else {
            const n = t.querySelector(e);
            n && s.push(n);
          }
          return s;
        }));
      let b = null,
        v = !1;
      function w(t) {
        b ||
          ((b = ('undefined' != typeof document ? document.body : null) || {}),
          (v = !!b.style && 'WebkitAppearance' in b.style));
        let e = !0;
        return (
          b.style &&
            !(function (t) {
              return 'ebkit' == t.substring(1, 6);
            })(t) &&
            ((e = t in b.style), !e && v) &&
            (e = 'Webkit' + t.charAt(0).toUpperCase() + t.substr(1) in b.style),
          e
        );
      }
      const S = g,
        E = m,
        x = _;
      function C(t) {
        const e = {};
        return (
          Object.keys(t).forEach((n) => {
            const s = n.replace(/([a-z])([A-Z])/g, '$1-$2');
            e[s] = t[n];
          }),
          e
        );
      }
      let T = (() => {
          class t {
            validateStyleProperty(t) {
              return w(t);
            }
            matchesElement(t, e) {
              return S(t, e);
            }
            containsElement(t, e) {
              return E(t, e);
            }
            query(t, e, n) {
              return x(t, e, n);
            }
            computeStyle(t, e, n) {
              return n || '';
            }
            animate(t, e, n, s, r, o = [], a) {
              return new i.ZN(n, s);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = s.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        k = (() => {
          class t {}
          return (t.NOOP = new T()), t;
        })();
      function I(t) {
        if ('number' == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : A(parseFloat(e[1]), e[2]);
      }
      function A(t, e) {
        switch (e) {
          case 's':
            return 1e3 * t;
          default:
            return t;
        }
      }
      function F(t, e, n) {
        return t.hasOwnProperty('duration')
          ? t
          : (function (t, e, n) {
              let s,
                r = 0,
                i = '';
              if ('string' == typeof t) {
                const n = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
                );
                if (null === n)
                  return (
                    e.push(`The provided timing value "${t}" is invalid.`),
                    { duration: 0, delay: 0, easing: '' }
                  );
                s = A(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (r = A(parseFloat(o), n[4]));
                const a = n[5];
                a && (i = a);
              } else s = t;
              if (!n) {
                let n = !1,
                  i = e.length;
                s < 0 &&
                  (e.push('Duration values below 0 are not allowed for this animation step.'),
                  (n = !0)),
                  r < 0 &&
                    (e.push('Delay values below 0 are not allowed for this animation step.'),
                    (n = !0)),
                  n && e.splice(i, 0, `The provided timing value "${t}" is invalid.`);
              }
              return { duration: s, delay: r, easing: i };
            })(t, e, n);
      }
      function N(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function O(t, e, n = {}) {
        if (e) for (let s in t) n[s] = t[s];
        else N(t, n);
        return n;
      }
      function R(t, e, n) {
        return n ? e + ':' + n + ';' : '';
      }
      function L(t) {
        let e = '';
        for (let n = 0; n < t.style.length; n++) {
          const s = t.style.item(n);
          e += R(0, s, t.style.getPropertyValue(s));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith('_') &&
            (e += R(0, n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), t.style[n]));
        t.setAttribute('style', e);
      }
      function D(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((s) => {
            const r = Z(s);
            n && !n.hasOwnProperty(s) && (n[s] = t.style[r]), (t.style[r] = e[s]);
          }),
          a() && L(t));
      }
      function P(t, e) {
        t.style &&
          (Object.keys(e).forEach((e) => {
            const n = Z(e);
            t.style[n] = '';
          }),
          a() && L(t));
      }
      function M(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : (0, i.vP)(t)) : t;
      }
      const j = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
      function V(t) {
        let e = [];
        if ('string' == typeof t) {
          let n;
          for (; (n = j.exec(t)); ) e.push(n[1]);
          j.lastIndex = 0;
        }
        return e;
      }
      function H(t, e, n) {
        const s = t.toString(),
          r = s.replace(j, (t, s) => {
            let r = e[s];
            return (
              e.hasOwnProperty(s) ||
                (n.push(`Please provide a value for the animation param ${s}`), (r = '')),
              r.toString()
            );
          });
        return r == s ? t : r;
      }
      function B(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const q = /-+([a-z0-9])/g;
      function Z(t) {
        return t.replace(q, (...t) => t[1].toUpperCase());
      }
      function z(t, e) {
        return 0 === t || 0 === e;
      }
      function G(t, e, n) {
        const s = Object.keys(n);
        if (s.length && e.length) {
          let i = e[0],
            o = [];
          if (
            (s.forEach((t) => {
              i.hasOwnProperty(t) || o.push(t), (i[t] = n[t]);
            }),
            o.length)
          )
            for (var r = 1; r < e.length; r++) {
              let n = e[r];
              o.forEach(function (e) {
                n[e] = $(t, e);
              });
            }
        }
        return e;
      }
      function U(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(`Unable to resolve animation metadata node #${e.type}`);
        }
      }
      function $(t, e) {
        return window.getComputedStyle(t)[e];
      }
      function Y(t, e) {
        const n = [];
        return (
          'string' == typeof t
            ? t.split(/\s*,\s*/).forEach((t) =>
                (function (t, e, n) {
                  if (':' == t[0]) {
                    const s = (function (t, e) {
                      switch (t) {
                        case ':enter':
                          return 'void => *';
                        case ':leave':
                          return '* => void';
                        case ':increment':
                          return (t, e) => parseFloat(e) > parseFloat(t);
                        case ':decrement':
                          return (t, e) => parseFloat(e) < parseFloat(t);
                        default:
                          return (
                            e.push(`The transition alias value "${t}" is not supported`), '* => *'
                          );
                      }
                    })(t, n);
                    if ('function' == typeof s) return void e.push(s);
                    t = s;
                  }
                  const s = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == s || s.length < 4)
                    return n.push(`The provided transition expression "${t}" is not supported`), e;
                  const r = s[1],
                    i = s[2],
                    o = s[3];
                  e.push(K(r, o)), '<' != i[0] || ('*' == r && '*' == o) || e.push(K(o, r));
                })(t, n, e),
              )
            : n.push(t),
          n
        );
      }
      const Q = new Set(['true', '1']),
        W = new Set(['false', '0']);
      function K(t, e) {
        const n = Q.has(t) || W.has(t),
          s = Q.has(e) || W.has(e);
        return (r, i) => {
          let o = '*' == t || t == r,
            a = '*' == e || e == i;
          return (
            !o && n && 'boolean' == typeof r && (o = r ? Q.has(t) : W.has(t)),
            !a && s && 'boolean' == typeof i && (a = i ? Q.has(e) : W.has(e)),
            o && a
          );
        };
      }
      const J = new RegExp('s*:selfs*,?', 'g');
      function X(t, e, n) {
        return new tt(t).build(e, n);
      }
      class tt {
        constructor(t) {
          this._driver = t;
        }
        build(t, e) {
          const n = new et(e);
          return this._resetContextStyleTimingState(n), U(this, M(t), n);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ''),
            (t.collectedStyles = {}),
            (t.collectedStyles[''] = {}),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let n = (e.queryCount = 0),
            s = (e.depCount = 0);
          const r = [],
            i = [];
          return (
            '@' == t.name.charAt(0) &&
              e.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))",
              ),
            t.definitions.forEach((t) => {
              if ((this._resetContextStyleTimingState(e), 0 == t.type)) {
                const n = t,
                  s = n.name;
                s
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((t) => {
                    (n.name = t), r.push(this.visitState(n, e));
                  }),
                  (n.name = s);
              } else if (1 == t.type) {
                const r = this.visitTransition(t, e);
                (n += r.queryCount), (s += r.depCount), i.push(r);
              } else
                e.errors.push(
                  'only state() and transition() definitions can sit inside of a trigger()',
                );
            }),
            {
              type: 7,
              name: t.name,
              states: r,
              transitions: i,
              queryCount: n,
              depCount: s,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const n = this.visitStyle(t.styles, e),
            s = (t.options && t.options.params) || null;
          if (n.containsDynamicStyles) {
            const r = new Set(),
              i = s || {};
            if (
              (n.styles.forEach((t) => {
                if (nt(t)) {
                  const e = t;
                  Object.keys(e).forEach((t) => {
                    V(e[t]).forEach((t) => {
                      i.hasOwnProperty(t) || r.add(t);
                    });
                  });
                }
              }),
              r.size)
            ) {
              const n = B(r.values());
              e.errors.push(
                `state("${
                  t.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ', ',
                )}`,
              );
            }
          }
          return { type: 0, name: t.name, style: n, options: s ? { params: s } : null };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const n = U(this, M(t.animation), e);
          return {
            type: 1,
            matchers: Y(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: st(t.options),
          };
        }
        visitSequence(t, e) {
          return { type: 2, steps: t.steps.map((t) => U(this, t, e)), options: st(t.options) };
        }
        visitGroup(t, e) {
          const n = e.currentTime;
          let s = 0;
          const r = t.steps.map((t) => {
            e.currentTime = n;
            const r = U(this, t, e);
            return (s = Math.max(s, e.currentTime)), r;
          });
          return (e.currentTime = s), { type: 3, steps: r, options: st(t.options) };
        }
        visitAnimate(t, e) {
          const n = (function (t, e) {
            let n = null;
            if (t.hasOwnProperty('duration')) n = t;
            else if ('number' == typeof t) return rt(F(t, e).duration, 0, '');
            const s = t;
            if (s.split(/\s+/).some((t) => '{' == t.charAt(0) && '{' == t.charAt(1))) {
              const t = rt(0, 0, '');
              return (t.dynamic = !0), (t.strValue = s), t;
            }
            return (n = n || F(s, e)), rt(n.duration, n.delay, n.easing);
          })(t.timings, e.errors);
          let s;
          e.currentAnimateTimings = n;
          let r = t.styles ? t.styles : (0, i.oB)({});
          if (5 == r.type) s = this.visitKeyframes(r, e);
          else {
            let r = t.styles,
              o = !1;
            if (!r) {
              o = !0;
              const t = {};
              n.easing && (t.easing = n.easing), (r = (0, i.oB)(t));
            }
            e.currentTime += n.duration + n.delay;
            const a = this.visitStyle(r, e);
            (a.isEmptyStep = o), (s = a);
          }
          return (e.currentAnimateTimings = null), { type: 4, timings: n, style: s, options: null };
        }
        visitStyle(t, e) {
          const n = this._makeStyleAst(t, e);
          return this._validateStyleAst(n, e), n;
        }
        _makeStyleAst(t, e) {
          const n = [];
          Array.isArray(t.styles)
            ? t.styles.forEach((t) => {
                'string' == typeof t
                  ? t == i.l3
                    ? n.push(t)
                    : e.errors.push(`The provided style string value ${t} is not allowed.`)
                  : n.push(t);
              })
            : n.push(t.styles);
          let s = !1,
            r = null;
          return (
            n.forEach((t) => {
              if (nt(t)) {
                const e = t,
                  n = e.easing;
                if ((n && ((r = n), delete e.easing), !s))
                  for (let t in e)
                    if (e[t].toString().indexOf('{{') >= 0) {
                      s = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: r,
              offset: t.offset,
              containsDynamicStyles: s,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const n = e.currentAnimateTimings;
          let s = e.currentTime,
            r = e.currentTime;
          n && r > 0 && (r -= n.duration + n.delay),
            t.styles.forEach((t) => {
              'string' != typeof t &&
                Object.keys(t).forEach((n) => {
                  if (!this._driver.validateStyleProperty(n))
                    return void e.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`,
                    );
                  const i = e.collectedStyles[e.currentQuerySelector],
                    o = i[n];
                  let a = !0;
                  o &&
                    (r != s &&
                      r >= o.startTime &&
                      s <= o.endTime &&
                      (e.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${r}ms" and "${s}ms"`,
                      ),
                      (a = !1)),
                    (r = o.startTime)),
                    a && (i[n] = { startTime: r, endTime: s }),
                    e.options &&
                      (function (t, e, n) {
                        const s = e.params || {},
                          r = V(t);
                        r.length &&
                          r.forEach((t) => {
                            s.hasOwnProperty(t) ||
                              n.push(
                                `Unable to resolve the local animation param ${t} in the given list of values`,
                              );
                          });
                      })(t[n], e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const n = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return e.errors.push('keyframes() must be placed inside of a call to animate()'), n;
          let s = 0;
          const r = [];
          let i = !1,
            o = !1,
            a = 0;
          const c = t.steps.map((t) => {
            const n = this._makeStyleAst(t, e);
            let c =
                null != n.offset
                  ? n.offset
                  : (function (t) {
                      if ('string' == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((t) => {
                          if (nt(t) && t.hasOwnProperty('offset')) {
                            const n = t;
                            (e = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (nt(t) && t.hasOwnProperty('offset')) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(n.styles),
              l = 0;
            return (
              null != c && (s++, (l = n.offset = c)),
              (o = o || l < 0 || l > 1),
              (i = i || l < a),
              (a = l),
              r.push(l),
              n
            );
          });
          o && e.errors.push('Please ensure that all keyframe offsets are between 0 and 1'),
            i && e.errors.push('Please ensure that all keyframe offsets are in order');
          const l = t.steps.length;
          let u = 0;
          s > 0 && s < l
            ? e.errors.push('Not all style() steps within the declared keyframes() contain offsets')
            : 0 == s && (u = 1 / (l - 1));
          const h = l - 1,
            d = e.currentTime,
            f = e.currentAnimateTimings,
            p = f.duration;
          return (
            c.forEach((t, s) => {
              const i = u > 0 ? (s == h ? 1 : u * s) : r[s],
                o = i * p;
              (e.currentTime = d + f.delay + o),
                (f.duration = o),
                this._validateStyleAst(t, e),
                (t.offset = i),
                n.styles.push(t);
            }),
            n
          );
        }
        visitReference(t, e) {
          return { type: 8, animation: U(this, M(t.animation), e), options: st(t.options) };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: st(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: st(t.options),
          };
        }
        visitQuery(t, e) {
          const n = e.currentQuerySelector,
            s = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [r, i] = (function (t) {
            const e = !!t.split(/\s*,\s*/).find((t) => ':self' == t);
            return (
              e && (t = t.replace(J, '')),
              [
                (t = t
                  .replace(/@\*/g, '.ng-trigger')
                  .replace(/@\w+/g, (t) => '.ng-trigger-' + t.substr(1))
                  .replace(/:animating/g, '.ng-animating')),
                e,
              ]
            );
          })(t.selector);
          (e.currentQuerySelector = n.length ? n + ' ' + r : r),
            f(e.collectedStyles, e.currentQuerySelector, {});
          const o = U(this, M(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = n),
            {
              type: 11,
              selector: r,
              limit: s.limit || 0,
              optional: !!s.optional,
              includeSelf: i,
              animation: o,
              originalSelector: t.selector,
              options: st(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery || e.errors.push('stagger() can only be used inside of query()');
          const n =
            'full' === t.timings
              ? { duration: 0, delay: 0, easing: 'full' }
              : F(t.timings, e.errors, !0);
          return { type: 12, animation: U(this, M(t.animation), e), timings: n, options: null };
        }
      }
      class et {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function nt(t) {
        return !Array.isArray(t) && 'object' == typeof t;
      }
      function st(t) {
        var e;
        return t ? (t = N(t)).params && (t.params = (e = t.params) ? N(e) : null) : (t = {}), t;
      }
      function rt(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function it(t, e, n, s, r, i, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: s,
          duration: r,
          delay: i,
          totalTime: r + i,
          easing: o,
          subTimeline: a,
        };
      }
      class ot {
        constructor() {
          this._map = new Map();
        }
        consume(t) {
          let e = this._map.get(t);
          return e ? this._map.delete(t) : (e = []), e;
        }
        append(t, e) {
          let n = this._map.get(t);
          n || this._map.set(t, (n = [])), n.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const at = new RegExp(':enter', 'g'),
        ct = new RegExp(':leave', 'g');
      function lt(t, e, n, s, r, i = {}, o = {}, a, c, l = []) {
        return new ut().buildKeyframes(t, e, n, s, r, i, o, a, c, l);
      }
      class ut {
        buildKeyframes(t, e, n, s, r, i, o, a, c, l = []) {
          c = c || new ot();
          const u = new dt(t, e, c, s, r, l, []);
          (u.options = a), u.currentTimeline.setStyles([i], null, u.errors, a), U(this, n, u);
          const h = u.timelines.filter((t) => t.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const t = h[h.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, u.errors, a);
          }
          return h.length ? h.map((t) => t.buildKeyframes()) : [it(e, [], [], [], 0, 0, '', !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const n = e.subInstructions.consume(e.element);
          if (n) {
            const s = e.createSubContext(t.options),
              r = e.currentTimeline.currentTime,
              i = this._visitSubInstructions(n, s, s.options);
            r != i && e.transformIntoNewTimeline(i);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const n = e.createSubContext(t.options);
          n.transformIntoNewTimeline(),
            this.visitReference(t.animation, n),
            e.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, n) {
          let s = e.currentTimeline.currentTime;
          const r = null != n.duration ? I(n.duration) : null,
            i = null != n.delay ? I(n.delay) : null;
          return (
            0 !== r &&
              t.forEach((t) => {
                const n = e.appendInstructionToTimeline(t, r, i);
                s = Math.max(s, n.duration + n.delay);
              }),
            s
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0), U(this, t.animation, e), (e.previousNode = t);
        }
        visitSequence(t, e) {
          const n = e.subContextCount;
          let s = e;
          const r = t.options;
          if (
            r &&
            (r.params || r.delay) &&
            ((s = e.createSubContext(r)), s.transformIntoNewTimeline(), null != r.delay)
          ) {
            6 == s.previousNode.type &&
              (s.currentTimeline.snapshotCurrentStyles(), (s.previousNode = ht));
            const t = I(r.delay);
            s.delayNextStep(t);
          }
          t.steps.length &&
            (t.steps.forEach((t) => U(this, t, s)),
            s.currentTimeline.applyStylesToKeyframe(),
            s.subContextCount > n && s.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const n = [];
          let s = e.currentTimeline.currentTime;
          const r = t.options && t.options.delay ? I(t.options.delay) : 0;
          t.steps.forEach((i) => {
            const o = e.createSubContext(t.options);
            r && o.delayNextStep(r),
              U(this, i, o),
              (s = Math.max(s, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach((t) => e.currentTimeline.mergeTimelineCollectedStyles(t)),
            e.transformIntoNewTimeline(s),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const n = t.strValue;
            return F(e.params ? H(n, e.params, e.errors) : n, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const n = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            s = e.currentTimeline;
          n.delay && (e.incrementTime(n.delay), s.snapshotCurrentStyles());
          const r = t.style;
          5 == r.type
            ? this.visitKeyframes(r, e)
            : (e.incrementTime(n.duration), this.visitStyle(r, e), s.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const n = e.currentTimeline,
            s = e.currentAnimateTimings;
          !s && n.getCurrentStyleProperties().length && n.forwardFrame();
          const r = (s && s.easing) || t.easing;
          t.isEmptyStep ? n.applyEmptyStep(r) : n.setStyles(t.styles, r, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const n = e.currentAnimateTimings,
            s = e.currentTimeline.duration,
            r = n.duration,
            i = e.createSubContext().currentTimeline;
          (i.easing = n.easing),
            t.styles.forEach((t) => {
              i.forwardTime((t.offset || 0) * r),
                i.setStyles(t.styles, t.easing, e.errors, e.options),
                i.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(i),
            e.transformIntoNewTimeline(s + r),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const n = e.currentTimeline.currentTime,
            s = t.options || {},
            r = s.delay ? I(s.delay) : 0;
          r &&
            (6 === e.previousNode.type ||
              (0 == n && e.currentTimeline.getCurrentStyleProperties().length)) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = ht));
          let i = n;
          const o = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!s.optional,
            e.errors,
          );
          e.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, s) => {
            e.currentQueryIndex = s;
            const o = e.createSubContext(t.options, n);
            r && o.delayNextStep(r),
              n === e.element && (a = o.currentTimeline),
              U(this, t.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (i = Math.max(i, o.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(i),
            a &&
              (e.currentTimeline.mergeTimelineCollectedStyles(a),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const n = e.parentContext,
            s = e.currentTimeline,
            r = t.timings,
            i = Math.abs(r.duration),
            o = i * (e.currentQueryTotal - 1);
          let a = i * e.currentQueryIndex;
          switch (r.duration < 0 ? 'reverse' : r.easing) {
            case 'reverse':
              a = o - a;
              break;
            case 'full':
              a = n.currentStaggerTime;
          }
          const c = e.currentTimeline;
          a && c.delayNextStep(a);
          const l = c.currentTime;
          U(this, t.animation, e),
            (e.previousNode = t),
            (n.currentStaggerTime =
              s.currentTime - l + (s.startTime - n.currentTimeline.startTime));
        }
      }
      const ht = {};
      class dt {
        constructor(t, e, n, s, r, i, o, a) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = n),
            (this._enterClassName = s),
            (this._leaveClassName = r),
            (this.errors = i),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = ht),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = a || new ft(this._driver, e, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const n = t;
          let s = this.options;
          null != n.duration && (s.duration = I(n.duration)),
            null != n.delay && (s.delay = I(n.delay));
          const r = n.params;
          if (r) {
            let t = s.params;
            t || (t = this.options.params = {}),
              Object.keys(r).forEach((n) => {
                (e && t.hasOwnProperty(n)) || (t[n] = H(r[n], t, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const n = (t.params = {});
              Object.keys(e).forEach((t) => {
                n[t] = e[t];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, n) {
          const s = e || this.element,
            r = new dt(
              this._driver,
              s,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(s, n || 0),
            );
          return (
            (r.previousNode = this.previousNode),
            (r.currentAnimateTimings = this.currentAnimateTimings),
            (r.options = this._copyOptions()),
            r.updateOptions(t),
            (r.currentQueryIndex = this.currentQueryIndex),
            (r.currentQueryTotal = this.currentQueryTotal),
            (r.parentContext = this),
            this.subContextCount++,
            r
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = ht),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, n) {
          const s = {
              duration: null != e ? e : t.duration,
              delay: this.currentTimeline.currentTime + (null != n ? n : 0) + t.delay,
              easing: '',
            },
            r = new pt(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              s,
              t.stretchStartingKeyframe,
            );
          return this.timelines.push(r), s;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, n, s, r, i) {
          let o = [];
          if ((s && o.push(this.element), t.length > 0)) {
            t = (t = t.replace(at, '.' + this._enterClassName)).replace(
              ct,
              '.' + this._leaveClassName,
            );
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)), o.push(...e);
          }
          return (
            r ||
              0 != o.length ||
              i.push(
                `\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`,
              ),
            o
          );
        }
      }
      class ft {
        constructor(t, e, n, s) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = s),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new ft(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
          );
        }
        _loadKeyframe() {
          this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(), (this.duration = t), this._loadKeyframe();
        }
        _updateStyle(t, e) {
          (this._localTimelineStyles[t] = e),
            (this._globalTimelineStyles[t] = e),
            (this._styleSummary[t] = { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || i.l3),
                (this._currentKeyframe[t] = i.l3);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(t, e, n, s) {
          e && (this._previousKeyframe.easing = e);
          const r = (s && s.params) || {},
            o = (function (t, e) {
              const n = {};
              let s;
              return (
                t.forEach((t) => {
                  '*' === t
                    ? ((s = s || Object.keys(e)),
                      s.forEach((t) => {
                        n[t] = i.l3;
                      }))
                    : O(t, !1, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          Object.keys(o).forEach((t) => {
            const e = H(o[t], r, n);
            (this._pendingStyles[t] = e),
              this._localTimelineStyles.hasOwnProperty(t) ||
                (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(t)
                  ? this._globalTimelineStyles[t]
                  : i.l3),
              this._updateStyle(t, e);
          });
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length &&
            ((this._pendingStyles = {}),
            e.forEach((e) => {
              this._currentKeyframe[e] = t[e];
            }),
            Object.keys(this._localTimelineStyles).forEach((t) => {
              this._currentKeyframe.hasOwnProperty(t) ||
                (this._currentKeyframe[t] = this._localTimelineStyles[t]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((t) => {
            const e = this._localTimelineStyles[t];
            (this._pendingStyles[t] = e), this._updateStyle(t, e);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach((e) => {
            const n = this._styleSummary[e],
              s = t._styleSummary[e];
            (!n || s.time > n.time) && this._updateStyle(e, s.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let s = [];
          this._keyframes.forEach((r, o) => {
            const a = O(r, !0);
            Object.keys(a).forEach((n) => {
              const s = a[n];
              s == i.k1 ? t.add(n) : s == i.l3 && e.add(n);
            }),
              n || (a.offset = o / this.duration),
              s.push(a);
          });
          const r = t.size ? B(t.values()) : [],
            o = e.size ? B(e.values()) : [];
          if (n) {
            const t = s[0],
              e = N(t);
            (t.offset = 0), (e.offset = 1), (s = [t, e]);
          }
          return it(this.element, s, r, o, this.duration, this.startTime, this.easing, !1);
        }
      }
      class pt extends ft {
        constructor(t, e, n, s, r, i, o = !1) {
          super(t, e, i.delay),
            (this.element = e),
            (this.keyframes = n),
            (this.preStyleProps = s),
            (this.postStyleProps = r),
            (this._stretchStartingKeyframe = o),
            (this.timings = { duration: i.duration, delay: i.delay, easing: i.easing });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: n, easing: s } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const r = [],
              i = n + e,
              o = e / i,
              a = O(t[0], !1);
            (a.offset = 0), r.push(a);
            const c = O(t[0], !1);
            (c.offset = mt(o)), r.push(c);
            const l = t.length - 1;
            for (let s = 1; s <= l; s++) {
              let o = O(t[s], !1);
              (o.offset = mt((e + o.offset * n) / i)), r.push(o);
            }
            (n = i), (e = 0), (s = ''), (t = r);
          }
          return it(this.element, t, this.preStyleProps, this.postStyleProps, n, e, s, !0);
        }
      }
      function mt(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class gt {}
      class _t extends gt {
        normalizePropertyName(t, e) {
          return Z(t);
        }
        normalizeStyleValue(t, e, n, s) {
          let r = '';
          const i = n.toString().trim();
          if (yt[e] && 0 !== n && '0' !== n)
            if ('number' == typeof n) r = 'px';
            else {
              const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e && 0 == e[1].length && s.push(`Please provide a CSS unit value for ${t}:${n}`);
            }
          return i + r;
        }
      }
      const yt = (() =>
        (function (t) {
          const e = {};
          return t.forEach((t) => (e[t] = !0)), e;
        })(
          'width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'.split(
            ',',
          ),
        ))();
      function bt(t, e, n, s, r, i, o, a, c, l, u, h, d) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: r,
          fromState: n,
          fromStyles: i,
          toState: s,
          toStyles: o,
          timelines: a,
          queriedElements: c,
          preStyleProps: l,
          postStyleProps: u,
          totalTime: h,
          errors: d,
        };
      }
      const vt = {};
      class wt {
        constructor(t, e, n) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = n);
        }
        match(t, e, n, s) {
          return (function (t, e, n, s, r) {
            return t.some((t) => t(e, n, s, r));
          })(this.ast.matchers, t, e, n, s);
        }
        buildStyles(t, e, n) {
          const s = this._stateStyles['*'],
            r = this._stateStyles[t],
            i = s ? s.buildStyles(e, n) : {};
          return r ? r.buildStyles(e, n) : i;
        }
        build(t, e, n, s, r, i, o, a, c, l) {
          const u = [],
            h = (this.ast.options && this.ast.options.params) || vt,
            d = this.buildStyles(n, (o && o.params) || vt, u),
            p = (a && a.params) || vt,
            m = this.buildStyles(s, p, u),
            g = new Set(),
            _ = new Map(),
            y = new Map(),
            b = 'void' === s,
            v = { params: Object.assign(Object.assign({}, h), p) },
            w = l ? [] : lt(t, e, this.ast.animation, r, i, d, m, v, c, u);
          let S = 0;
          if (
            (w.forEach((t) => {
              S = Math.max(t.duration + t.delay, S);
            }),
            u.length)
          )
            return bt(e, this._triggerName, n, s, b, d, m, [], [], _, y, S, u);
          w.forEach((t) => {
            const n = t.element,
              s = f(_, n, {});
            t.preStyleProps.forEach((t) => (s[t] = !0));
            const r = f(y, n, {});
            t.postStyleProps.forEach((t) => (r[t] = !0)), n !== e && g.add(n);
          });
          const E = B(g.values());
          return bt(e, this._triggerName, n, s, b, d, m, w, E, _, y, S);
        }
      }
      class St {
        constructor(t, e) {
          (this.styles = t), (this.defaultParams = e);
        }
        buildStyles(t, e) {
          const n = {},
            s = N(this.defaultParams);
          return (
            Object.keys(t).forEach((e) => {
              const n = t[e];
              null != n && (s[e] = n);
            }),
            this.styles.styles.forEach((t) => {
              if ('string' != typeof t) {
                const r = t;
                Object.keys(r).forEach((t) => {
                  let i = r[t];
                  i.length > 1 && (i = H(i, s, e)), (n[t] = i);
                });
              }
            }),
            n
          );
        }
      }
      class Et {
        constructor(t, e) {
          (this.name = t),
            (this.ast = e),
            (this.transitionFactories = []),
            (this.states = {}),
            e.states.forEach((t) => {
              this.states[t.name] = new St(t.style, (t.options && t.options.params) || {});
            }),
            xt(this.states, 'true', '1'),
            xt(this.states, 'false', '0'),
            e.transitions.forEach((e) => {
              this.transitionFactories.push(new wt(t, e, this.states));
            }),
            (this.fallbackTransition = new wt(
              t,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(t, e) => !0],
                options: null,
                queryCount: 0,
                depCount: 0,
              },
              this.states,
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, n, s) {
          return this.transitionFactories.find((r) => r.match(t, e, n, s)) || null;
        }
        matchStyles(t, e, n) {
          return this.fallbackTransition.buildStyles(t, e, n);
        }
      }
      function xt(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const Ct = new ot();
      class Tt {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(t, e) {
          const n = [],
            s = X(this._driver, e, n);
          if (n.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${n.join('\n')}`,
            );
          this._animations[t] = s;
        }
        _buildPlayer(t, e, n) {
          const s = t.element,
            r = l(0, this._normalizer, 0, t.keyframes, e, n);
          return this._driver.animate(s, r, t.duration, t.delay, t.easing, [], !0);
        }
        create(t, e, n = {}) {
          const s = [],
            r = this._animations[t];
          let o;
          const a = new Map();
          if (
            (r
              ? ((o = lt(this._driver, e, r, 'ng-enter', 'ng-leave', {}, {}, n, Ct, s)),
                o.forEach((t) => {
                  const e = f(a, t.element, {});
                  t.postStyleProps.forEach((t) => (e[t] = null));
                }))
              : (s.push("The requested animation doesn't exist or has already been destroyed"),
                (o = [])),
            s.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${s.join('\n')}`,
            );
          a.forEach((t, e) => {
            Object.keys(t).forEach((n) => {
              t[n] = this._driver.computeStyle(e, n, i.l3);
            });
          });
          const l = c(
            o.map((t) => {
              const e = a.get(t.element);
              return this._buildPlayer(t, {}, e);
            }),
          );
          return (
            (this._playersById[t] = l), l.onDestroy(() => this.destroy(t)), this.players.push(l), l
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const n = this.players.indexOf(e);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e) throw new Error(`Unable to find the timeline player referenced by ${t}`);
          return e;
        }
        listen(t, e, n, s) {
          const r = d(e, '', '', '');
          return u(this._getPlayer(t), n, r, s), () => {};
        }
        command(t, e, n, s) {
          if ('register' == n) return void this.register(t, s[0]);
          if ('create' == n) return void this.create(t, e, s[0] || {});
          const r = this._getPlayer(t);
          switch (n) {
            case 'play':
              r.play();
              break;
            case 'pause':
              r.pause();
              break;
            case 'reset':
              r.reset();
              break;
            case 'restart':
              r.restart();
              break;
            case 'finish':
              r.finish();
              break;
            case 'init':
              r.init();
              break;
            case 'setPosition':
              r.setPosition(parseFloat(s[0]));
              break;
            case 'destroy':
              this.destroy(t);
          }
        }
      }
      const kt = [],
        It = {
          namespaceId: '',
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        At = {
          namespaceId: '',
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        };
      class Ft {
        constructor(t, e = '') {
          this.namespaceId = e;
          const n = t && t.hasOwnProperty('value');
          if (((this.value = null != (s = n ? t.value : t) ? s : null), n)) {
            const e = N(t);
            delete e.value, (this.options = e);
          } else this.options = {};
          var s;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const t = this.options.params;
            Object.keys(e).forEach((n) => {
              null == t[n] && (t[n] = e[n]);
            });
          }
        }
      }
      const Nt = new Ft('void');
      class Ot {
        constructor(t, e, n) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = 'ng-tns-' + t),
            Vt(e, this._hostClassName);
        }
        listen(t, e, n, s) {
          if (!this._triggers.hasOwnProperty(e))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`,
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${e}" because the provided event is undefined!`,
            );
          if ('start' != (r = n) && 'done' != r)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`,
            );
          var r;
          const i = f(this._elementListeners, t, []),
            o = { name: e, phase: n, callback: s };
          i.push(o);
          const a = f(this._engine.statesByElement, t, {});
          return (
            a.hasOwnProperty(e) || (Vt(t, 'ng-trigger'), Vt(t, 'ng-trigger-' + e), (a[e] = Nt)),
            () => {
              this._engine.afterFlush(() => {
                const t = i.indexOf(o);
                t >= 0 && i.splice(t, 1), this._triggers[e] || delete a[e];
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers[t] && ((this._triggers[t] = e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e) throw new Error(`The provided animation trigger "${t}" has not been registered!`);
          return e;
        }
        trigger(t, e, n, s = !0) {
          const r = this._getTrigger(e),
            i = new Lt(this.id, e, t);
          let o = this._engine.statesByElement.get(t);
          o ||
            (Vt(t, 'ng-trigger'),
            Vt(t, 'ng-trigger-' + e),
            this._engine.statesByElement.set(t, (o = {})));
          let a = o[e];
          const c = new Ft(n, this.id);
          if (
            (!(n && n.hasOwnProperty('value')) && a && c.absorbOptions(a.options),
            (o[e] = c),
            a || (a = Nt),
            'void' !== c.value && a.value === c.value)
          ) {
            if (
              !(function (t, e) {
                const n = Object.keys(t),
                  s = Object.keys(e);
                if (n.length != s.length) return !1;
                for (let r = 0; r < n.length; r++) {
                  const s = n[r];
                  if (!e.hasOwnProperty(s) || t[s] !== e[s]) return !1;
                }
                return !0;
              })(a.params, c.params)
            ) {
              const e = [],
                n = r.matchStyles(a.value, a.params, e),
                s = r.matchStyles(c.value, c.params, e);
              e.length
                ? this._engine.reportError(e)
                : this._engine.afterFlush(() => {
                    P(t, n), D(t, s);
                  });
            }
            return;
          }
          const l = f(this._engine.playersByElement, t, []);
          l.forEach((t) => {
            t.namespaceId == this.id && t.triggerName == e && t.queued && t.destroy();
          });
          let u = r.matchTransition(a.value, c.value, t, c.params),
            h = !1;
          if (!u) {
            if (!s) return;
            (u = r.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: u,
              fromState: a,
              toState: c,
              player: i,
              isFallbackTransition: h,
            }),
            h ||
              (Vt(t, 'ng-animate-queued'),
              i.onStart(() => {
                Ht(t, 'ng-animate-queued');
              })),
            i.onDone(() => {
              let e = this.players.indexOf(i);
              e >= 0 && this.players.splice(e, 1);
              const n = this._engine.playersByElement.get(t);
              if (n) {
                let t = n.indexOf(i);
                t >= 0 && n.splice(t, 1);
              }
            }),
            this.players.push(i),
            l.push(i),
            i
          );
        }
        deregister(t) {
          delete this._triggers[t],
            this._engine.statesByElement.forEach((e, n) => {
              delete e[t];
            }),
            this._elementListeners.forEach((e, n) => {
              this._elementListeners.set(
                n,
                e.filter((e) => e.name != t),
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t), this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e && (e.forEach((t) => t.destroy()), this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const n = this._engine.driver.query(t, '.ng-trigger', !0);
          n.forEach((t) => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size
              ? n.forEach((n) => n.triggerLeaveAnimation(t, e, !1, !0))
              : this.clearElementCache(t);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              n.forEach((t) => this.clearElementCache(t)),
            );
        }
        triggerLeaveAnimation(t, e, n, s) {
          const r = this._engine.statesByElement.get(t);
          if (r) {
            const i = [];
            if (
              (Object.keys(r).forEach((e) => {
                if (this._triggers[e]) {
                  const n = this.trigger(t, e, 'void', s);
                  n && i.push(n);
                }
              }),
              i.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e),
                n && c(i).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            n = this._engine.statesByElement.get(t);
          if (e && n) {
            const s = new Set();
            e.forEach((e) => {
              const r = e.name;
              if (s.has(r)) return;
              s.add(r);
              const i = this._triggers[r].fallbackTransition,
                o = n[r] || Nt,
                a = new Ft('void'),
                c = new Lt(this.id, r, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: r,
                  transition: i,
                  fromState: o,
                  toState: a,
                  player: c,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const n = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let s = !1;
          if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) s = !0;
            else {
              let e = t;
              for (; (e = e.parentNode); )
                if (n.statesByElement.get(e)) {
                  s = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), s))
            n.markElementAsRemoved(this.id, t, !1, e);
          else {
            const s = t.__ng_removed;
            (s && s !== It) ||
              (n.afterFlush(() => this.clearElementCache(t)),
              n.destroyInnerAnimations(t),
              n._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          Vt(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((n) => {
              const s = n.player;
              if (s.destroyed) return;
              const r = n.element,
                i = this._elementListeners.get(r);
              i &&
                i.forEach((e) => {
                  if (e.name == n.triggerName) {
                    const s = d(r, n.triggerName, n.fromState.value, n.toState.value);
                    (s._data = t), u(n.player, e.phase, s, e.callback);
                  }
                }),
                s.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      s.destroy();
                    })
                  : e.push(n);
            }),
            (this._queue = []),
            e.sort((t, e) => {
              const n = t.transition.ast.depCount,
                s = e.transition.ast.depCount;
              return 0 == n || 0 == s
                ? n - s
                : this._engine.driver.containsElement(t.element, e.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((e) => e.element === t) || e),
            e
          );
        }
      }
      class Rt {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (t, e) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((e) => {
                e.queued && t.push(e);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const n = new Ot(t, e, this);
          return (
            e.parentNode
              ? this._balanceNamespaceList(n, e)
              : (this.newHostElements.set(e, n), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = n)
          );
        }
        _balanceNamespaceList(t, e) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let s = !1;
            for (let r = n; r >= 0; r--)
              if (this.driver.containsElement(this._namespaceList[r].hostElement, e)) {
                this._namespaceList.splice(r + 1, 0, t), (s = !0);
                break;
              }
            s || this._namespaceList.splice(0, 0, t);
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t;
        }
        register(t, e) {
          let n = this._namespaceLookup[t];
          return n || (n = this.createNamespace(t, e)), n;
        }
        registerTrigger(t, e, n) {
          let s = this._namespaceLookup[t];
          s && s.register(e, n) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const n = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement), delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            n = this.statesByElement.get(t);
          if (n) {
            const t = Object.keys(n);
            for (let s = 0; s < t.length; s++) {
              const r = n[t[s]].namespaceId;
              if (r) {
                const t = this._fetchNamespace(r);
                t && e.add(t);
              }
            }
          }
          return e;
        }
        trigger(t, e, n, s) {
          if (Dt(e)) {
            const r = this._fetchNamespace(t);
            if (r) return r.trigger(e, n, s), !0;
          }
          return !1;
        }
        insertNode(t, e, n, s) {
          if (!Dt(e)) return;
          const r = e.__ng_removed;
          if (r && r.setForRemoval) {
            (r.setForRemoval = !1), (r.setForMove = !0);
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(e, n);
          }
          s && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) || (this.disabledNodes.add(t), Vt(t, 'ng-animate-disabled'))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), Ht(t, 'ng-animate-disabled'));
        }
        removeNode(t, e, n, s) {
          if (Dt(e)) {
            const r = t ? this._fetchNamespace(t) : null;
            if ((r ? r.removeNode(e, s) : this.markElementAsRemoved(t, e, !1, s), n)) {
              const n = this.namespacesByHostElement.get(e);
              n && n.id !== t && n.removeNode(e, s);
            }
          } else this._onRemovalComplete(e, s);
        }
        markElementAsRemoved(t, e, n, s) {
          this.collectedLeaveElements.push(e),
            (e.__ng_removed = {
              namespaceId: t,
              setForRemoval: s,
              hasAnimation: n,
              removedBeforeQueried: !1,
            });
        }
        listen(t, e, n, s, r) {
          return Dt(e) ? this._fetchNamespace(t).listen(e, n, s, r) : () => {};
        }
        _buildInstruction(t, e, n, s, r) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            n,
            s,
            t.fromState.options,
            t.toState.options,
            e,
            r,
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, '.ng-trigger', !0);
          e.forEach((t) => this.destroyActiveAnimationsForElement(t)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, '.ng-animating', !0)),
              e.forEach((t) => this.finishActiveQueriedAnimationOnElement(t)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((t) => {
              t.queued ? (t.markedForDestroy = !0) : t.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((t) => t.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return c(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t.__ng_removed;
          if (e && e.setForRemoval) {
            if (((t.__ng_removed = It), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const n = this._fetchNamespace(e.namespaceId);
              n && n.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          this.driver.matchesElement(t, '.ng-animate-disabled') &&
            this.markElementAsDisabled(t, !1),
            this.driver.query(t, '.ng-animate-disabled', !0).forEach((t) => {
              this.markElementAsDisabled(t, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((t, e) => this._balanceNamespaceList(t, e)),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              Vt(this.collectedEnterElements[n], 'ng-star-inserted');
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              e = this._flushAnimations(n, t);
            } finally {
              for (let t = 0; t < n.length; t++) n[t]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((t) => t()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const t = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? c(e).onDone(() => {
                    t.forEach((t) => t());
                  })
                : t.forEach((t) => t());
          }
        }
        reportError(t) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${t.join(
              '\n',
            )}`,
          );
        }
        _flushAnimations(t, e) {
          const n = new ot(),
            s = [],
            r = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            h = new Set();
          this.disabledNodes.forEach((t) => {
            h.add(t);
            const e = this.driver.query(t, '.ng-animate-queued', !0);
            for (let n = 0; n < e.length; n++) h.add(e[n]);
          });
          const d = this.bodyNode,
            p = Array.from(this.statesByElement.keys()),
            m = jt(p, this.collectedEnterElements),
            g = new Map();
          let _ = 0;
          m.forEach((t, e) => {
            const n = 'ng-enter' + _++;
            g.set(e, n), t.forEach((t) => Vt(t, n));
          });
          const y = [],
            b = new Set(),
            v = new Set();
          for (let i = 0; i < this.collectedLeaveElements.length; i++) {
            const t = this.collectedLeaveElements[i],
              e = t.__ng_removed;
            e &&
              e.setForRemoval &&
              (y.push(t),
              b.add(t),
              e.hasAnimation
                ? this.driver.query(t, '.ng-star-inserted', !0).forEach((t) => b.add(t))
                : v.add(t));
          }
          const w = new Map(),
            S = jt(p, Array.from(b));
          S.forEach((t, e) => {
            const n = 'ng-leave' + _++;
            w.set(e, n), t.forEach((t) => Vt(t, n));
          }),
            t.push(() => {
              m.forEach((t, e) => {
                const n = g.get(e);
                t.forEach((t) => Ht(t, n));
              }),
                S.forEach((t, e) => {
                  const n = w.get(e);
                  t.forEach((t) => Ht(t, n));
                }),
                y.forEach((t) => {
                  this.processLeaveNode(t);
                });
            });
          const E = [],
            x = [];
          for (let i = this._namespaceList.length - 1; i >= 0; i--)
            this._namespaceList[i].drainQueuedTransitions(e).forEach((t) => {
              const e = t.player,
                r = t.element;
              if ((E.push(e), this.collectedEnterElements.length)) {
                const t = r.__ng_removed;
                if (t && t.setForMove) return void e.destroy();
              }
              const i = !d || !this.driver.containsElement(d, r),
                c = w.get(r),
                h = g.get(r),
                p = this._buildInstruction(t, n, h, c, i);
              if (p.errors && p.errors.length) x.push(p);
              else {
                if (i)
                  return (
                    e.onStart(() => P(r, p.fromStyles)),
                    e.onDestroy(() => D(r, p.toStyles)),
                    void s.push(e)
                  );
                if (t.isFallbackTransition)
                  return (
                    e.onStart(() => P(r, p.fromStyles)),
                    e.onDestroy(() => D(r, p.toStyles)),
                    void s.push(e)
                  );
                p.timelines.forEach((t) => (t.stretchStartingKeyframe = !0)),
                  n.append(r, p.timelines),
                  o.push({ instruction: p, player: e, element: r }),
                  p.queriedElements.forEach((t) => f(a, t, []).push(e)),
                  p.preStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    if (n.length) {
                      let t = l.get(e);
                      t || l.set(e, (t = new Set())), n.forEach((e) => t.add(e));
                    }
                  }),
                  p.postStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    let s = u.get(e);
                    s || u.set(e, (s = new Set())), n.forEach((t) => s.add(t));
                  });
              }
            });
          if (x.length) {
            const t = [];
            x.forEach((e) => {
              t.push(`@${e.triggerName} has failed due to:\n`),
                e.errors.forEach((e) => t.push(`- ${e}\n`));
            }),
              E.forEach((t) => t.destroy()),
              this.reportError(t);
          }
          const C = new Map(),
            T = new Map();
          o.forEach((t) => {
            const e = t.element;
            n.has(e) &&
              (T.set(e, e), this._beforeAnimationBuild(t.player.namespaceId, t.instruction, C));
          }),
            s.forEach((t) => {
              const e = t.element;
              this._getPreviousPlayers(e, !1, t.namespaceId, t.triggerName, null).forEach((t) => {
                f(C, e, []).push(t), t.destroy();
              });
            });
          const k = y.filter((t) => Zt(t, l, u)),
            I = new Map();
          Mt(I, this.driver, v, u, i.l3).forEach((t) => {
            Zt(t, l, u) && k.push(t);
          });
          const A = new Map();
          m.forEach((t, e) => {
            Mt(A, this.driver, new Set(t), l, i.k1);
          }),
            k.forEach((t) => {
              const e = I.get(t),
                n = A.get(t);
              I.set(t, Object.assign(Object.assign({}, e), n));
            });
          const F = [],
            N = [],
            O = {};
          o.forEach((t) => {
            const { element: e, player: i, instruction: o } = t;
            if (n.has(e)) {
              if (h.has(e))
                return (
                  i.onDestroy(() => D(e, o.toStyles)),
                  (i.disabled = !0),
                  i.overrideTotalTime(o.totalTime),
                  void s.push(i)
                );
              let t = O;
              if (T.size > 1) {
                let n = e;
                const s = [];
                for (; (n = n.parentNode); ) {
                  const e = T.get(n);
                  if (e) {
                    t = e;
                    break;
                  }
                  s.push(n);
                }
                s.forEach((e) => T.set(e, t));
              }
              const n = this._buildAnimation(i.namespaceId, o, C, r, A, I);
              if ((i.setRealPlayer(n), t === O)) F.push(i);
              else {
                const e = this.playersByElement.get(t);
                e && e.length && (i.parentPlayer = c(e)), s.push(i);
              }
            } else
              P(e, o.fromStyles),
                i.onDestroy(() => D(e, o.toStyles)),
                N.push(i),
                h.has(e) && s.push(i);
          }),
            N.forEach((t) => {
              const e = r.get(t.element);
              if (e && e.length) {
                const n = c(e);
                t.setRealPlayer(n);
              }
            }),
            s.forEach((t) => {
              t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy();
            });
          for (let i = 0; i < y.length; i++) {
            const t = y[i],
              e = t.__ng_removed;
            if ((Ht(t, 'ng-leave'), e && e.hasAnimation)) continue;
            let n = [];
            if (a.size) {
              let e = a.get(t);
              e && e.length && n.push(...e);
              let s = this.driver.query(t, '.ng-animating', !0);
              for (let t = 0; t < s.length; t++) {
                let e = a.get(s[t]);
                e && e.length && n.push(...e);
              }
            }
            const s = n.filter((t) => !t.destroyed);
            s.length ? Bt(this, t, s) : this.processLeaveNode(t);
          }
          return (
            (y.length = 0),
            F.forEach((t) => {
              this.players.push(t),
                t.onDone(() => {
                  t.destroy();
                  const e = this.players.indexOf(t);
                  this.players.splice(e, 1);
                }),
                t.play();
            }),
            F
          );
        }
        elementContainsData(t, e) {
          let n = !1;
          const s = e.__ng_removed;
          return (
            s && s.setForRemoval && (n = !0),
            this.playersByElement.has(e) && (n = !0),
            this.playersByQueriedElement.has(e) && (n = !0),
            this.statesByElement.has(e) && (n = !0),
            this._fetchNamespace(t).elementContainsData(e) || n
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, n, s, r) {
          let i = [];
          if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (i = e);
          } else {
            const e = this.playersByElement.get(t);
            if (e) {
              const t = !r || 'void' == r;
              e.forEach((e) => {
                e.queued || ((t || e.triggerName == s) && i.push(e));
              });
            }
          }
          return (
            (n || s) &&
              (i = i.filter((t) => !((n && n != t.namespaceId) || (s && s != t.triggerName)))),
            i
          );
        }
        _beforeAnimationBuild(t, e, n) {
          const s = e.element,
            r = e.isRemovalTransition ? void 0 : t,
            i = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const o of e.timelines) {
            const t = o.element,
              a = t !== s,
              c = f(n, t, []);
            this._getPreviousPlayers(t, a, r, i, e.toState).forEach((t) => {
              const e = t.getRealPlayer();
              e.beforeDestroy && e.beforeDestroy(), t.destroy(), c.push(t);
            });
          }
          P(s, e.fromStyles);
        }
        _buildAnimation(t, e, n, s, r, o) {
          const a = e.triggerName,
            u = e.element,
            h = [],
            d = new Set(),
            p = new Set(),
            m = e.timelines.map((e) => {
              const c = e.element;
              d.add(c);
              const f = c.__ng_removed;
              if (f && f.removedBeforeQueried) return new i.ZN(e.duration, e.delay);
              const m = c !== u,
                g = (function (t) {
                  const e = [];
                  return qt(t, e), e;
                })((n.get(c) || kt).map((t) => t.getRealPlayer())).filter(
                  (t) => !!t.element && t.element === c,
                ),
                _ = r.get(c),
                y = o.get(c),
                b = l(0, this._normalizer, 0, e.keyframes, _, y),
                v = this._buildPlayer(e, b, g);
              if ((e.subTimeline && s && p.add(c), m)) {
                const e = new Lt(t, a, c);
                e.setRealPlayer(v), h.push(e);
              }
              return v;
            });
          h.forEach((t) => {
            f(this.playersByQueriedElement, t.element, []).push(t),
              t.onDone(() =>
                (function (t, e, n) {
                  let s;
                  if (t instanceof Map) {
                    if (((s = t.get(e)), s)) {
                      if (s.length) {
                        const t = s.indexOf(n);
                        s.splice(t, 1);
                      }
                      0 == s.length && t.delete(e);
                    }
                  } else if (((s = t[e]), s)) {
                    if (s.length) {
                      const t = s.indexOf(n);
                      s.splice(t, 1);
                    }
                    0 == s.length && delete t[e];
                  }
                  return s;
                })(this.playersByQueriedElement, t.element, t),
              );
          }),
            d.forEach((t) => Vt(t, 'ng-animating'));
          const g = c(m);
          return (
            g.onDestroy(() => {
              d.forEach((t) => Ht(t, 'ng-animating')), D(u, e.toStyles);
            }),
            p.forEach((t) => {
              f(s, t, []).push(g);
            }),
            g
          );
        }
        _buildPlayer(t, e, n) {
          return e.length > 0
            ? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, n)
            : new i.ZN(t.duration, t.delay);
        }
      }
      class Lt {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = n),
            (this._player = new i.ZN()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            Object.keys(this._queuedCallbacks).forEach((e) => {
              this._queuedCallbacks[e].forEach((n) => u(t, e, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback('start')),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          f(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent('done', t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent('start', t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent('destroy', t), this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function Dt(t) {
        return t && 1 === t.nodeType;
      }
      function Pt(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : 'none'), n;
      }
      function Mt(t, e, n, s, r) {
        const i = [];
        n.forEach((t) => i.push(Pt(t)));
        const o = [];
        s.forEach((n, s) => {
          const i = {};
          n.forEach((t) => {
            const n = (i[t] = e.computeStyle(s, t, r));
            (n && 0 != n.length) || ((s.__ng_removed = At), o.push(s));
          }),
            t.set(s, i);
        });
        let a = 0;
        return n.forEach((t) => Pt(t, i[a++])), o;
      }
      function jt(t, e) {
        const n = new Map();
        if ((t.forEach((t) => n.set(t, [])), 0 == e.length)) return n;
        const s = new Set(e),
          r = new Map();
        function i(t) {
          if (!t) return 1;
          let e = r.get(t);
          if (e) return e;
          const o = t.parentNode;
          return (e = n.has(o) ? o : s.has(o) ? 1 : i(o)), r.set(t, e), e;
        }
        return (
          e.forEach((t) => {
            const e = i(t);
            1 !== e && n.get(e).push(t);
          }),
          n
        );
      }
      function Vt(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t.$$classes;
          n || (n = t.$$classes = {}), (n[e] = !0);
        }
      }
      function Ht(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t.$$classes;
          n && delete n[e];
        }
      }
      function Bt(t, e, n) {
        c(n).onDone(() => t.processLeaveNode(e));
      }
      function qt(t, e) {
        for (let n = 0; n < t.length; n++) {
          const s = t[n];
          s instanceof i.ZE ? qt(s.players, e) : e.push(s);
        }
      }
      function Zt(t, e, n) {
        const s = n.get(t);
        if (!s) return !1;
        let r = e.get(t);
        return r ? s.forEach((t) => r.add(t)) : e.set(t, s), n.delete(t), !0;
      }
      class zt {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (t, e) => {}),
            (this._transitionEngine = new Rt(t, e, n)),
            (this._timelineEngine = new Tt(t, e, n)),
            (this._transitionEngine.onRemovalComplete = (t, e) => this.onRemovalComplete(t, e));
        }
        registerTrigger(t, e, n, s, r) {
          const i = t + '-' + s;
          let o = this._triggerCache[i];
          if (!o) {
            const t = [],
              e = X(this._driver, r, t);
            if (t.length)
              throw new Error(
                `The animation trigger "${s}" has failed to build due to the following errors:\n - ${t.join(
                  '\n - ',
                )}`,
              );
            (o = (function (t, e) {
              return new Et(t, e);
            })(s, e)),
              (this._triggerCache[i] = o);
          }
          this._transitionEngine.registerTrigger(e, s, o);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, n, s) {
          this._transitionEngine.insertNode(t, e, n, s);
        }
        onRemove(t, e, n, s) {
          this._transitionEngine.removeNode(t, e, s || !1, n);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, n, s) {
          if ('@' == n.charAt(0)) {
            const [t, r] = p(n);
            this._timelineEngine.command(t, e, r, s);
          } else this._transitionEngine.trigger(t, e, n, s);
        }
        listen(t, e, n, s, r) {
          if ('@' == n.charAt(0)) {
            const [t, s] = p(n);
            return this._timelineEngine.listen(t, e, s, r);
          }
          return this._transitionEngine.listen(t, e, n, s, r);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(this._timelineEngine.players);
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function Gt(t, e) {
        let n = null,
          s = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = $t(e[0])), e.length > 1 && (s = $t(e[e.length - 1])))
            : e && (n = $t(e)),
          n || s ? new Ut(t, n, s) : null
        );
      }
      let Ut = (() => {
        class t {
          constructor(e, n, s) {
            (this._element = e), (this._startStyles = n), (this._endStyles = s), (this._state = 0);
            let r = t.initialStylesByElement.get(e);
            r || t.initialStylesByElement.set(e, (r = {})), (this._initialStyles = r);
          }
          start() {
            this._state < 1 &&
              (this._startStyles && D(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (D(this._element, this._initialStyles),
                this._endStyles && (D(this._element, this._endStyles), (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (P(this._element, this._startStyles), (this._endStyles = null)),
                this._endStyles && (P(this._element, this._endStyles), (this._endStyles = null)),
                D(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function $t(t) {
        let e = null;
        const n = Object.keys(t);
        for (let s = 0; s < n.length; s++) {
          const r = n[s];
          Yt(r) && ((e = e || {}), (e[r] = t[r]));
        }
        return e;
      }
      function Yt(t) {
        return 'display' === t || 'position' === t;
      }
      class Qt {
        constructor(t, e, n, s, r, i, o) {
          (this._element = t),
            (this._name = e),
            (this._duration = n),
            (this._delay = s),
            (this._easing = r),
            (this._fillMode = i),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (t) => this._handleCallback(t));
        }
        apply() {
          !(function (t, e) {
            const n = ee(t, '').trim();
            n.length &&
              ((function (t, e) {
                let n = 0;
                for (let s = 0; s < t.length; s++) ',' === t.charAt(s) && n++;
              })(n),
              (e = `${n}, ${e}`)),
              te(t, '', e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`,
          ),
            Xt(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          Wt(this._element, this._name, 'paused');
        }
        resume() {
          Wt(this._element, this._name, 'running');
        }
        setPosition(t) {
          const e = Kt(this._element, this._name);
          (this._position = t * this._duration),
            te(this._element, 'Delay', `-${this._position}ms`, e);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name &&
            Math.max(e - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0), this._onDoneFn(), Xt(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (t, e) {
              const n = ee(t, '').split(','),
                s = Jt(n, e);
              s >= 0 && (n.splice(s, 1), te(t, '', n.join(',')));
            })(this._element, this._name));
        }
      }
      function Wt(t, e, n) {
        te(t, 'PlayState', n, Kt(t, e));
      }
      function Kt(t, e) {
        const n = ee(t, '');
        return n.indexOf(',') > 0 ? Jt(n.split(','), e) : Jt([n], e);
      }
      function Jt(t, e) {
        for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function Xt(t, e, n) {
        n ? t.removeEventListener('animationend', e) : t.addEventListener('animationend', e);
      }
      function te(t, e, n, s) {
        const r = 'animation' + e;
        if (null != s) {
          const e = t.style[r];
          if (e.length) {
            const t = e.split(',');
            (t[s] = n), (n = t.join(','));
          }
        }
        t.style[r] = n;
      }
      function ee(t, e) {
        return t.style['animation' + e] || '';
      }
      class ne {
        constructor(t, e, n, s, r, i, o, a) {
          (this.element = t),
            (this.keyframes = e),
            (this.animationName = n),
            (this._duration = s),
            (this._delay = r),
            (this._finalStyles = o),
            (this._specialStyles = a),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = i || 'linear'),
            (this.totalTime = s + r),
            this._buildStyler();
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((t) => t()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(t) {
          this._styler.setPosition(t);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1), this._styler.apply(), this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          this._styler.destroy(), this._buildStyler(), this._styler.apply();
        }
        _buildStyler() {
          this._styler = new Qt(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            'forwards',
            () => this.finish(),
          );
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach((n) => {
              'offset' != n && (t[n] = e ? this._finalStyles[n] : $(this.element, n));
            });
          }
          this.currentSnapshot = t;
        }
      }
      class se extends i.ZN {
        constructor(t, e) {
          super(),
            (this.element = t),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = C(e));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((t) => {
              this._startingStyles[t] = this.element.style[t];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach((t) =>
              this.element.style.setProperty(t, this._styles[t]),
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach((t) => {
              const e = this._startingStyles[t];
              e ? this.element.style.setProperty(t, e) : this.element.style.removeProperty(t);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class re {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(t) {
          return w(t);
        }
        matchesElement(t, e) {
          return S(t, e);
        }
        containsElement(t, e) {
          return E(t, e);
        }
        query(t, e, n) {
          return x(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        buildKeyframeElement(t, e, n) {
          n = n.map((t) => C(t));
          let s = `@keyframes ${e} {\n`,
            r = '';
          n.forEach((t) => {
            r = ' ';
            const e = parseFloat(t.offset);
            (s += `${r}${100 * e}% {\n`),
              (r += ' '),
              Object.keys(t).forEach((e) => {
                const n = t[e];
                switch (e) {
                  case 'offset':
                    return;
                  case 'easing':
                    return void (n && (s += `${r}animation-timing-function: ${n};\n`));
                  default:
                    return void (s += `${r}${e}: ${n};\n`);
                }
              }),
              (s += `${r}}\n`);
          }),
            (s += '}\n');
          const i = document.createElement('style');
          return (i.textContent = s), i;
        }
        animate(t, e, n, s, r, i = [], o) {
          const a = i.filter((t) => t instanceof ne),
            c = {};
          z(n, s) &&
            a.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (c[t] = e[t]));
            });
          const l = (function (t) {
            let e = {};
            return (
              t &&
                (Array.isArray(t) ? t : [t]).forEach((t) => {
                  Object.keys(t).forEach((n) => {
                    'offset' != n && 'easing' != n && (e[n] = t[n]);
                  });
                }),
              e
            );
          })((e = G(t, e, c)));
          if (0 == n) return new se(t, l);
          const u = 'gen_css_kf_' + this._count++,
            h = this.buildKeyframeElement(t, u, e);
          (function (t) {
            var e;
            const n = null === (e = t.getRootNode) || void 0 === e ? void 0 : e.call(t);
            return 'undefined' != typeof ShadowRoot && n instanceof ShadowRoot ? n : document.head;
          })(t).appendChild(h);
          const d = Gt(t, e),
            f = new ne(t, e, u, n, s, r, l, d);
          return (
            f.onDestroy(() => {
              var t;
              (t = h).parentNode.removeChild(t);
            }),
            f
          );
        }
      }
      class ie {
        constructor(t, e, n, s) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = n),
            (this._specialStyles = s),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0), this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(this.element, t, this.options)),
            (this._finalKeyframe = t.length ? t[t.length - 1] : {}),
            this.domPlayer.addEventListener('finish', () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(t, e, n) {
          return t.animate(e, n);
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(), (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((e) => {
              'offset' != e &&
                (t[e] = this._finished ? this._finalKeyframe[e] : $(this.element, e));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class oe {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(ae().toString())),
            (this._cssKeyframesDriver = new re());
        }
        validateStyleProperty(t) {
          return w(t);
        }
        matchesElement(t, e) {
          return S(t, e);
        }
        containsElement(t, e) {
          return E(t, e);
        }
        query(t, e, n) {
          return x(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t;
        }
        animate(t, e, n, s, r, i = [], o) {
          if (!o && !this._isNativeImpl) return this._cssKeyframesDriver.animate(t, e, n, s, r, i);
          const a = { duration: n, delay: s, fill: 0 == s ? 'both' : 'forwards' };
          r && (a.easing = r);
          const c = {},
            l = i.filter((t) => t instanceof ie);
          z(n, s) &&
            l.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (c[t] = e[t]));
            });
          const u = Gt(t, (e = G(t, (e = e.map((t) => O(t, !1))), c)));
          return new ie(t, e, a, u);
        }
      }
      function ae() {
        return (o() && Element.prototype.animate) || {};
      }
      var ce = n(1116);
      let le = (() => {
        class t extends i._j {
          constructor(t, e) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(e.body, {
                id: '0',
                encapsulation: s.ifc.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? (0, i.vP)(t) : t;
            return de(this._renderer, null, e, 'register', [n]), new ue(e, this._renderer);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.LFG(s.FYo), s.LFG(ce.K0));
          }),
          (t.ɵprov = s.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class ue extends i.LC {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new he(this._id, t, e || {}, this._renderer);
        }
      }
      class he {
        constructor(t, e, n, s) {
          (this.id = t),
            (this.element = e),
            (this._renderer = s),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command('create', n);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return de(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen('done', t);
        }
        onStart(t) {
          this._listen('start', t);
        }
        onDestroy(t) {
          this._listen('destroy', t);
        }
        init() {
          this._command('init');
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command('play'), (this._started = !0);
        }
        pause() {
          this._command('pause');
        }
        restart() {
          this._command('restart');
        }
        finish() {
          this._command('finish');
        }
        destroy() {
          this._command('destroy');
        }
        reset() {
          this._command('reset');
        }
        setPosition(t) {
          this._command('setPosition', t);
        }
        getPosition() {
          var t, e;
          return null !==
            (e =
              null === (t = this._renderer.engine.players[+this.id]) || void 0 === t
                ? void 0
                : t.getPosition()) && void 0 !== e
            ? e
            : 0;
        }
      }
      function de(t, e, n, s, r) {
        return t.setProperty(e, `@@${n}:${s}`, r);
      }
      let fe = (() => {
        class t {
          constructor(t, e, n) {
            (this.delegate = t),
              (this.engine = e),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (e.onRemovalComplete = (t, e) => {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t);
              });
          }
          createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
              let t = this._rendererCache.get(n);
              return t || ((t = new pe('', n, this.engine)), this._rendererCache.set(n, t)), t;
            }
            const s = e.id,
              r = e.id + '-' + this._currentId;
            this._currentId++, this.engine.register(r, t);
            const i = (e) => {
              Array.isArray(e) ? e.forEach(i) : this.engine.registerTrigger(s, r, t, e.name, e);
            };
            return e.data.animation.forEach(i), new me(this, r, n, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => e(n))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((t) => {
                        const [e, n] = t;
                        e(n);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([e, n]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(), this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.LFG(s.FYo), s.LFG(zt), s.LFG(s.R0b));
          }),
          (t.ɵprov = s.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class pe {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode ? (t) => e.destroyNode(t) : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e), this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, n, s = !0) {
          this.delegate.insertBefore(t, e, n), this.engine.onInsert(this.namespaceId, e, t, s);
        }
        removeChild(t, e, n) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, n);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, n, s) {
          this.delegate.setAttribute(t, e, n, s);
        }
        removeAttribute(t, e, n) {
          this.delegate.removeAttribute(t, e, n);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, n, s) {
          this.delegate.setStyle(t, e, n, s);
        }
        removeStyle(t, e, n) {
          this.delegate.removeStyle(t, e, n);
        }
        setProperty(t, e, n) {
          '@' == e.charAt(0) && '@.disabled' == e
            ? this.disableAnimations(t, !!n)
            : this.delegate.setProperty(t, e, n);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class me extends pe {
        constructor(t, e, n, s) {
          super(e, n, s), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, n) {
          '@' == e.charAt(0)
            ? '.' == e.charAt(1) && '@.disabled' == e
              ? this.disableAnimations(t, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, t, e.substr(1), n)
            : this.delegate.setProperty(t, e, n);
        }
        listen(t, e, n) {
          if ('@' == e.charAt(0)) {
            const s = (function (t) {
              switch (t) {
                case 'body':
                  return document.body;
                case 'document':
                  return document;
                case 'window':
                  return window;
                default:
                  return t;
              }
            })(t);
            let r = e.substr(1),
              i = '';
            return (
              '@' != r.charAt(0) &&
                ([r, i] = (function (t) {
                  const e = t.indexOf('.');
                  return [t.substring(0, e), t.substr(e + 1)];
                })(r)),
              this.engine.listen(this.namespaceId, s, r, i, (t) => {
                this.factory.scheduleListenerCallback(t._data || -1, n, t);
              })
            );
          }
          return this.delegate.listen(t, e, n);
        }
      }
      let ge = (() => {
        class t extends zt {
          constructor(t, e, n) {
            super(t.body, e, n);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.LFG(ce.K0), s.LFG(k), s.LFG(gt));
          }),
          (t.ɵprov = s.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const _e = new s.OlP('AnimationModuleType'),
        ye = [
          { provide: i._j, useClass: le },
          {
            provide: gt,
            useFactory: function () {
              return new _t();
            },
          },
          { provide: zt, useClass: ge },
          {
            provide: s.FYo,
            useFactory: function (t, e, n) {
              return new fe(t, e, n);
            },
            deps: [r.se, zt, s.R0b],
          },
        ],
        be = [
          {
            provide: k,
            useFactory: function () {
              return 'function' == typeof ae() ? new oe() : new re();
            },
          },
          { provide: _e, useValue: 'BrowserAnimations' },
          ...ye,
        ],
        ve = [{ provide: k, useClass: T }, { provide: _e, useValue: 'NoopAnimations' }, ...ye];
      let we = (() => {
        class t {
          static withConfig(e) {
            return { ngModule: t, providers: e.disableAnimations ? ve : be };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵmod = s.oAB({ type: t })),
          (t.ɵinj = s.cJS({ providers: be, imports: [r.b2] })),
          t
        );
      })();
    },
    9624: function (t, e, n) {
      'use strict';
      n.d(e, {
        b2: function () {
          return M;
        },
        H7: function () {
          return O;
        },
        h_: function () {
          return V;
        },
        Dx: function () {
          return q;
        },
        q6: function () {
          return D;
        },
        se: function () {
          return S;
        },
      });
      var s = n(1116),
        r = n(5366);
      class i extends s.w_ {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class o extends i {
        static makeCurrent() {
          (0, s.HT)(new o());
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return 'window' === e ? window : 'document' === e ? t : 'body' === e ? t.body : null;
        }
        getBaseHref(t) {
          const e = ((c = c || document.querySelector('base')), c ? c.getAttribute('href') : null);
          return null == e
            ? null
            : (function (t) {
                (a = a || document.createElement('a')), a.setAttribute('href', t);
                const e = a.pathname;
                return '/' === e.charAt(0) ? e : `/${e}`;
              })(e);
        }
        resetBaseElement() {
          c = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (0, s.Mx)(document.cookie, t);
        }
      }
      let a,
        c = null;
      const l = new r.OlP('TRANSITION_ID'),
        u = [
          {
            provide: r.ip1,
            useFactory: function (t, e, n) {
              return () => {
                n.get(r.CZH).donePromise.then(() => {
                  const n = (0, s.q)();
                  Array.prototype.slice
                    .apply(e.querySelectorAll('style[ng-transition]'))
                    .filter((e) => e.getAttribute('ng-transition') === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [l, s.K0, r.zs3],
            multi: !0,
          },
        ];
      class h {
        static init() {
          (0, r.VLi)(new h());
        }
        addToWindow(t) {
          (r.dqk.getAngularTestability = (e, n = !0) => {
            const s = t.findTestabilityInTree(e, n);
            if (null == s) throw new Error('Could not find testability for element.');
            return s;
          }),
            (r.dqk.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (r.dqk.getAllAngularRootElements = () => t.getAllRootElements()),
            r.dqk.frameworkStabilizers || (r.dqk.frameworkStabilizers = []),
            r.dqk.frameworkStabilizers.push((t) => {
              const e = r.dqk.getAllAngularTestabilities();
              let n = e.length,
                s = !1;
              const i = function (e) {
                (s = s || e), n--, 0 == n && t(s);
              };
              e.forEach(function (t) {
                t.whenStable(i);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? (0, s.q)().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      let d = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const f = new r.OlP('EventManagerPlugins');
      let p = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let s = 0; s < n.length; s++) {
              const e = n[s];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(f), r.LFG(r.R0b));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class m {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = (0, s.q)().getGlobalEventTarget(this._doc, t);
          if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let g = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        _ = (() => {
          class t extends g {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement('style');
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => (0, s.q)().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(s.K0));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const y = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
        },
        b = /%COMP%/g;
      function v(t, e, n) {
        for (let s = 0; s < e.length; s++) {
          let r = e[s];
          Array.isArray(r) ? v(t, r, n) : ((r = r.replace(b, t)), n.push(r));
        }
        return n;
      }
      function w(t) {
        return (e) => {
          if ('__ngUnwrap__' === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let S = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new E(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case r.ifc.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new x(this.eventManager, this.sharedStylesHost, e, this.appId)),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case r.ifc.ShadowDom:
                return new C(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = v(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(p), r.LFG(_), r.LFG(r.AFp));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class E {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e ? document.createElementNS(y[e] || e, t) : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = 'string' == typeof t ? document.querySelector(t) : t;
          if (!n) throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ''), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, s) {
          if (s) {
            e = s + ':' + e;
            const r = y[s];
            r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const s = y[n];
            s ? t.removeAttributeNS(s, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, s) {
          s & (r.JOm.DashCase | r.JOm.Important)
            ? t.style.setProperty(e, n, s & r.JOm.Important ? 'important' : '')
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & r.JOm.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, w(n))
            : this.eventManager.addEventListener(t, e, w(n));
        }
      }
      class x extends E {
        constructor(t, e, n, s) {
          super(t), (this.component = n);
          const r = v(s + '-' + n.id, n.styles, []);
          e.addStyles(r),
            (this.contentAttr = '_ngcontent-%COMP%'.replace(b, s + '-' + n.id)),
            (this.hostAttr = '_nghost-%COMP%'.replace(b, s + '-' + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ''), n;
        }
      }
      class C extends E {
        constructor(t, e, n, s) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const r = v(s.id, s.styles, []);
          for (let i = 0; i < r.length; i++) {
            const t = document.createElement('style');
            (t.textContent = r[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
        }
      }
      let T = (() => {
        class t extends m {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n);
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(s.K0));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const k = ['alt', 'control', 'meta', 'shift'],
        I = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        A = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        F = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let N = (() => {
          class t extends m {
            constructor(t) {
              super(t);
            }
            supports(e) {
              return null != t.parseEventName(e);
            }
            addEventListener(e, n, r) {
              const i = t.parseEventName(n),
                o = t.eventCallback(i.fullKey, r, this.manager.getZone());
              return this.manager
                .getZone()
                .runOutsideAngular(() => (0, s.q)().onAndCancel(e, i.domEventName, o));
            }
            static parseEventName(e) {
              const n = e.toLowerCase().split('.'),
                s = n.shift();
              if (0 === n.length || ('keydown' !== s && 'keyup' !== s)) return null;
              const r = t._normalizeKey(n.pop());
              let i = '';
              if (
                (k.forEach((t) => {
                  const e = n.indexOf(t);
                  e > -1 && (n.splice(e, 1), (i += t + '.'));
                }),
                (i += r),
                0 != n.length || 0 === r.length)
              )
                return null;
              const o = {};
              return (o.domEventName = s), (o.fullKey = i), o;
            }
            static getEventFullKey(t) {
              let e = '',
                n = (function (t) {
                  let e = t.key;
                  if (null == e) {
                    if (((e = t.keyIdentifier), null == e)) return 'Unidentified';
                    e.startsWith('U+') &&
                      ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                      3 === t.location && A.hasOwnProperty(e) && (e = A[e]));
                  }
                  return I[e] || e;
                })(t);
              return (
                (n = n.toLowerCase()),
                ' ' === n ? (n = 'space') : '.' === n && (n = 'dot'),
                k.forEach((s) => {
                  s != n && (0, F[s])(t) && (e += s + '.');
                }),
                (e += n),
                e
              );
            }
            static eventCallback(e, n, s) {
              return (r) => {
                t.getEventFullKey(r) === e && s.runGuarded(() => n(r));
              };
            }
            static _normalizeKey(t) {
              switch (t) {
                case 'esc':
                  return 'escape';
                default:
                  return t;
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(s.K0));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        O = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = (0, r.Yz7)({
              factory: function () {
                return (0, r.LFG)(L);
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })();
      function R(t) {
        return new L(t.get(s.K0));
      }
      let L = (() => {
        class t extends O {
          constructor(t) {
            super(), (this._doc = t);
          }
          sanitize(t, e) {
            if (null == e) return null;
            switch (t) {
              case r.q3G.NONE:
                return e;
              case r.q3G.HTML:
                return (0, r.qzn)(e, 'HTML')
                  ? (0, r.z3N)(e)
                  : (0, r.EiD)(this._doc, String(e)).toString();
              case r.q3G.STYLE:
                return (0, r.qzn)(e, 'Style') ? (0, r.z3N)(e) : e;
              case r.q3G.SCRIPT:
                if ((0, r.qzn)(e, 'Script')) return (0, r.z3N)(e);
                throw new Error('unsafe value used in a script context');
              case r.q3G.URL:
                return (0, r.yhl)(e), (0, r.qzn)(e, 'URL') ? (0, r.z3N)(e) : (0, r.mCW)(String(e));
              case r.q3G.RESOURCE_URL:
                if ((0, r.qzn)(e, 'ResourceURL')) return (0, r.z3N)(e);
                throw new Error(
                  'unsafe value used in a resource URL context (see https://g.co/ng/security#xss)',
                );
              default:
                throw new Error(
                  `Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`,
                );
            }
          }
          bypassSecurityTrustHtml(t) {
            return (0, r.JVY)(t);
          }
          bypassSecurityTrustStyle(t) {
            return (0, r.L6k)(t);
          }
          bypassSecurityTrustScript(t) {
            return (0, r.eBb)(t);
          }
          bypassSecurityTrustUrl(t) {
            return (0, r.LAX)(t);
          }
          bypassSecurityTrustResourceUrl(t) {
            return (0, r.pB0)(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(s.K0));
          }),
          (t.ɵprov = (0, r.Yz7)({
            factory: function () {
              return R((0, r.LFG)(r.gxx));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      const D = (0, r.eFA)(r._c5, 'browser', [
          { provide: r.Lbi, useValue: s.bD },
          {
            provide: r.g9A,
            useValue: function () {
              o.makeCurrent(), h.init();
            },
            multi: !0,
          },
          {
            provide: s.K0,
            useFactory: function () {
              return (0, r.RDi)(document), document;
            },
            deps: [],
          },
        ]),
        P = [
          [],
          { provide: r.zSh, useValue: 'root' },
          {
            provide: r.qLn,
            useFactory: function () {
              return new r.qLn();
            },
            deps: [],
          },
          { provide: f, useClass: T, multi: !0, deps: [s.K0, r.R0b, r.Lbi] },
          { provide: f, useClass: N, multi: !0, deps: [s.K0] },
          [],
          { provide: S, useClass: S, deps: [p, _, r.AFp] },
          { provide: r.FYo, useExisting: S },
          { provide: g, useExisting: _ },
          { provide: _, useClass: _, deps: [s.K0] },
          { provide: r.dDg, useClass: r.dDg, deps: [r.R0b] },
          { provide: p, useClass: p, deps: [f, r.R0b] },
          { provide: s.JF, useClass: d, deps: [] },
          [],
        ];
      let M = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.',
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: r.AFp, useValue: e.appId },
                { provide: l, useExisting: r.AFp },
                u,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(t, 12));
          }),
          (t.ɵmod = r.oAB({ type: t })),
          (t.ɵinj = r.cJS({ providers: P, imports: [s.ez, r.hGG] })),
          t
        );
      })();
      function j() {
        return new V((0, r.LFG)(s.K0));
      }
      let V = (() => {
        class t {
          constructor(t) {
            (this._doc = t), (this._dom = (0, s.q)());
          }
          addTag(t, e = !1) {
            return t ? this._getOrCreateElement(t, e) : null;
          }
          addTags(t, e = !1) {
            return t
              ? t.reduce((t, n) => (n && t.push(this._getOrCreateElement(n, e)), t), [])
              : [];
          }
          getTag(t) {
            return (t && this._doc.querySelector(`meta[${t}]`)) || null;
          }
          getTags(t) {
            if (!t) return [];
            const e = this._doc.querySelectorAll(`meta[${t}]`);
            return e ? [].slice.call(e) : [];
          }
          updateTag(t, e) {
            if (!t) return null;
            e = e || this._parseSelector(t);
            const n = this.getTag(e);
            return n ? this._setMetaElementAttributes(t, n) : this._getOrCreateElement(t, !0);
          }
          removeTag(t) {
            this.removeTagElement(this.getTag(t));
          }
          removeTagElement(t) {
            t && this._dom.remove(t);
          }
          _getOrCreateElement(t, e = !1) {
            if (!e) {
              const e = this._parseSelector(t),
                n = this.getTag(e);
              if (n && this._containsAttributes(t, n)) return n;
            }
            const n = this._dom.createElement('meta');
            return (
              this._setMetaElementAttributes(t, n),
              this._doc.getElementsByTagName('head')[0].appendChild(n),
              n
            );
          }
          _setMetaElementAttributes(t, e) {
            return Object.keys(t).forEach((n) => e.setAttribute(this._getMetaKeyMap(n), t[n])), e;
          }
          _parseSelector(t) {
            const e = t.name ? 'name' : 'property';
            return `${e}="${t[e]}"`;
          }
          _containsAttributes(t, e) {
            return Object.keys(t).every((n) => e.getAttribute(this._getMetaKeyMap(n)) === t[n]);
          }
          _getMetaKeyMap(t) {
            return H[t] || t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(s.K0));
          }),
          (t.ɵprov = (0, r.Yz7)({ factory: j, token: t, providedIn: 'root' })),
          t
        );
      })();
      const H = { httpEquiv: 'http-equiv' };
      function B() {
        return new q((0, r.LFG)(s.K0));
      }
      let q = (() => {
        class t {
          constructor(t) {
            this._doc = t;
          }
          getTitle() {
            return this._doc.title;
          }
          setTitle(t) {
            this._doc.title = t || '';
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(s.K0));
          }),
          (t.ɵprov = (0, r.Yz7)({ factory: B, token: t, providedIn: 'root' })),
          t
        );
      })();
      'undefined' != typeof window && window;
    },
    2223: function (t, e, n) {
      'use strict';
      n.d(e, {
        c: function () {
          return i;
        },
      });
      var s = n(5959),
        r = n(7570);
      class i extends s.xQ {
        constructor() {
          super(...arguments), (this.value = null), (this.hasNext = !1), (this.hasCompleted = !1);
        }
        _subscribe(t) {
          return this.hasError
            ? (t.error(this.thrownError), r.w.EMPTY)
            : this.hasCompleted && this.hasNext
            ? (t.next(this.value), t.complete(), r.w.EMPTY)
            : super._subscribe(t);
        }
        next(t) {
          this.hasCompleted || ((this.value = t), (this.hasNext = !0));
        }
        error(t) {
          this.hasCompleted || super.error(t);
        }
        complete() {
          (this.hasCompleted = !0), this.hasNext && super.next(this.value), super.complete();
        }
      }
    },
    3103: function (t, e, n) {
      'use strict';
      n.d(e, {
        P: function () {
          return o;
        },
      });
      var s = n(653),
        r = n(878),
        i = n(1225);
      let o = (() => {
        class t {
          constructor(t, e, n) {
            (this.kind = t), (this.value = e), (this.error = n), (this.hasValue = 'N' === t);
          }
          observe(t) {
            switch (this.kind) {
              case 'N':
                return t.next && t.next(this.value);
              case 'E':
                return t.error && t.error(this.error);
              case 'C':
                return t.complete && t.complete();
            }
          }
          do(t, e, n) {
            switch (this.kind) {
              case 'N':
                return t && t(this.value);
              case 'E':
                return e && e(this.error);
              case 'C':
                return n && n();
            }
          }
          accept(t, e, n) {
            return t && 'function' == typeof t.next ? this.observe(t) : this.do(t, e, n);
          }
          toObservable() {
            switch (this.kind) {
              case 'N':
                return (0, r.of)(this.value);
              case 'E':
                return (0, i._)(this.error);
              case 'C':
                return (0, s.c)();
            }
            throw new Error('unexpected notification kind value');
          }
          static createNext(e) {
            return void 0 !== e ? new t('N', e) : t.undefinedValueNotification;
          }
          static createError(e) {
            return new t('E', void 0, e);
          }
          static createComplete() {
            return t.completeNotification;
          }
        }
        return (
          (t.completeNotification = new t('C')),
          (t.undefinedValueNotification = new t('N', void 0)),
          t
        );
      })();
    },
    8318: function (t, e, n) {
      'use strict';
      n.d(e, {
        y: function () {
          return l;
        },
      });
      var s = n(6673),
        r = n(5331),
        i = n(7498),
        o = n(6197),
        a = n(3392),
        c = n(1484);
      let l = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: o } = this,
              a = (function (t, e, n) {
                if (t) {
                  if (t instanceof s.L) return t;
                  if (t[r.b]) return t[r.b]();
                }
                return t || e || n ? new s.L(t, e, n) : new s.L(i.c);
              })(t, e, n);
            if (
              (a.add(
                o
                  ? o.call(a, this.source)
                  : this.source ||
                    (c.v.useDeprecatedSynchronousErrorHandling && !a.syncErrorThrowable)
                  ? this._subscribe(a)
                  : this._trySubscribe(a),
              ),
              c.v.useDeprecatedSynchronousErrorHandling &&
                a.syncErrorThrowable &&
                ((a.syncErrorThrowable = !1), a.syncErrorThrown))
            )
              throw a.syncErrorValue;
            return a;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              c.v.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof s.L ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = u(e))((e, n) => {
              let s;
              s = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (r) {
                    n(r), s && s.unsubscribe();
                  }
                },
                n,
                e,
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [o.L]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? a.y
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = u(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n),
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function u(t) {
        if ((t || (t = c.v.Promise || Promise), !t)) throw new Error('no Promise impl found');
        return t;
      }
    },
    7498: function (t, e, n) {
      'use strict';
      n.d(e, {
        c: function () {
          return i;
        },
      });
      var s = n(1484),
        r = n(4294);
      const i = {
        closed: !0,
        next(t) {},
        error(t) {
          if (s.v.useDeprecatedSynchronousErrorHandling) throw t;
          (0, r.z)(t);
        },
        complete() {},
      };
    },
    9829: function (t, e, n) {
      'use strict';
      n.d(e, {
        L: function () {
          return r;
        },
      });
      var s = n(6673);
      class r extends s.L {
        notifyNext(t, e, n, s, r) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
    },
    6605: function (t, e, n) {
      'use strict';
      n.d(e, {
        t: function () {
          return f;
        },
      });
      var s = n(5959),
        r = n(8277);
      class i extends r.o {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e);
        }
        schedule(t, e = 0) {
          return e > 0
            ? super.schedule(t, e)
            : ((this.delay = e), (this.state = t), this.scheduler.flush(this), this);
        }
        execute(t, e) {
          return e > 0 || this.closed ? super.execute(t, e) : this._execute(t, e);
        }
        requestAsyncId(t, e, n = 0) {
          return (null !== n && n > 0) || (null === n && this.delay > 0)
            ? super.requestAsyncId(t, e, n)
            : t.flush(this);
        }
      }
      var o = n(1098);
      class a extends o.v {}
      const c = new a(i);
      var l = n(7570),
        u = n(45),
        h = n(3895),
        d = n(9291);
      class f extends s.xQ {
        constructor(t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY, n) {
          super(),
            (this.scheduler = n),
            (this._events = []),
            (this._infiniteTimeWindow = !1),
            (this._bufferSize = t < 1 ? 1 : t),
            (this._windowTime = e < 1 ? 1 : e),
            e === Number.POSITIVE_INFINITY
              ? ((this._infiniteTimeWindow = !0), (this.next = this.nextInfiniteTimeWindow))
              : (this.next = this.nextTimeWindow);
        }
        nextInfiniteTimeWindow(t) {
          if (!this.isStopped) {
            const e = this._events;
            e.push(t), e.length > this._bufferSize && e.shift();
          }
          super.next(t);
        }
        nextTimeWindow(t) {
          this.isStopped ||
            (this._events.push(new p(this._getNow(), t)), this._trimBufferThenGetEvents()),
            super.next(t);
        }
        _subscribe(t) {
          const e = this._infiniteTimeWindow,
            n = e ? this._events : this._trimBufferThenGetEvents(),
            s = this.scheduler,
            r = n.length;
          let i;
          if (this.closed) throw new h.N();
          if (
            (this.isStopped || this.hasError
              ? (i = l.w.EMPTY)
              : (this.observers.push(t), (i = new d.W(this, t))),
            s && t.add((t = new u.ht(t, s))),
            e)
          )
            for (let o = 0; o < r && !t.closed; o++) t.next(n[o]);
          else for (let o = 0; o < r && !t.closed; o++) t.next(n[o].value);
          return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), i;
        }
        _getNow() {
          return (this.scheduler || c).now();
        }
        _trimBufferThenGetEvents() {
          const t = this._getNow(),
            e = this._bufferSize,
            n = this._windowTime,
            s = this._events,
            r = s.length;
          let i = 0;
          for (; i < r && !(t - s[i].time < n); ) i++;
          return r > e && (i = Math.max(i, r - e)), i > 0 && s.splice(0, i), s;
        }
      }
      class p {
        constructor(t, e) {
          (this.time = t), (this.value = e);
        }
      }
    },
    5959: function (t, e, n) {
      'use strict';
      n.d(e, {
        Yc: function () {
          return l;
        },
        xQ: function () {
          return u;
        },
      });
      var s = n(8318),
        r = n(6673),
        i = n(7570),
        o = n(3895),
        a = n(9291),
        c = n(5331);
      class l extends r.L {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let u = (() => {
        class t extends s.y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [c.b]() {
            return new l(this);
          }
          lift(t) {
            const e = new h(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new o.N();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                s = e.slice();
              for (let r = 0; r < n; r++) s[r].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new o.N();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              s = e.slice();
            for (let r = 0; r < n; r++) s[r].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new o.N();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let s = 0; s < e; s++) n[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new o.N();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new o.N();
            return this.hasError
              ? (t.error(this.thrownError), i.w.EMPTY)
              : this.isStopped
              ? (t.complete(), i.w.EMPTY)
              : (this.observers.push(t), new a.W(this, t));
          }
          asObservable() {
            const t = new s.y();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new h(t, e)), t;
      })();
      class h extends u {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : i.w.EMPTY;
        }
      }
    },
    9291: function (t, e, n) {
      'use strict';
      n.d(e, {
        W: function () {
          return r;
        },
      });
      var s = n(7570);
      class r extends s.w {
        constructor(t, e) {
          super(), (this.subject = t), (this.subscriber = e), (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (((this.subject = null), !e || 0 === e.length || t.isStopped || t.closed)) return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
    },
    6673: function (t, e, n) {
      'use strict';
      n.d(e, {
        L: function () {
          return l;
        },
      });
      var s = n(5024),
        r = n(7498),
        i = n(7570),
        o = n(5331),
        a = n(1484),
        c = n(4294);
      class l extends i.w {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = r.c;
              break;
            case 1:
              if (!t) {
                this.destination = r.c;
                break;
              }
              if ('object' == typeof t) {
                t instanceof l
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0), (this.destination = new u(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0), (this.destination = new u(this, t, e, n));
          }
        }
        [o.b]() {
          return this;
        }
        static create(t, e, n) {
          const s = new l(t, e, n);
          return (s.syncErrorThrowable = !1), s;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class u extends l {
        constructor(t, e, n, i) {
          let o;
          super(), (this._parentSubscriber = t);
          let a = this;
          (0, s.m)(e)
            ? (o = e)
            : e &&
              ((o = e.next),
              (n = e.error),
              (i = e.complete),
              e !== r.c &&
                ((a = Object.create(e)),
                (0, s.m)(a.unsubscribe) && this.add(a.unsubscribe.bind(a)),
                (a.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = a),
            (this._next = o),
            (this._error = n),
            (this._complete = i);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            a.v.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = a.v;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : (0, c.z)(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              (0, c.z)(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              a.v.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), a.v.useDeprecatedSynchronousErrorHandling)) throw n;
            (0, c.z)(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!a.v.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
          try {
            e.call(this._context, n);
          } catch (s) {
            return a.v.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = s), (t.syncErrorThrown = !0), !0)
              : ((0, c.z)(s), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null), (this._parentSubscriber = null), t.unsubscribe();
        }
      }
    },
    7570: function (t, e, n) {
      'use strict';
      n.d(e, {
        w: function () {
          return a;
        },
      });
      var s = n(8470),
        r = n(2056),
        i = n(5024);
      const o = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join('\n  ')}`
              : ''),
            (this.name = 'UnsubscriptionError'),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let a = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: a,
              _unsubscribe: l,
              _subscriptions: u,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n) for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if ((0, i.m)(l)) {
              a && (this._unsubscribe = void 0);
              try {
                l.call(this);
              } catch (h) {
                e = h instanceof o ? c(h.errors) : [h];
              }
            }
            if ((0, s.k)(u)) {
              let t = -1,
                n = u.length;
              for (; ++t < n; ) {
                const n = u[t];
                if ((0, r.K)(n))
                  try {
                    n.unsubscribe();
                  } catch (h) {
                    (e = e || []), h instanceof o ? (e = e.concat(c(h.errors))) : e.push(h);
                  }
              }
            }
            if (e) throw new o(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case 'function':
                n = new t(e);
              case 'object':
                if (n === this || n.closed || 'function' != typeof n.unsubscribe) return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error('unrecognized teardown ' + e + ' added to Subscription.');
            }
            let { _parentOrParents: s } = n;
            if (null === s) n._parentOrParents = this;
            else if (s instanceof t) {
              if (s === this) return n;
              n._parentOrParents = [s, this];
            } else {
              if (-1 !== s.indexOf(this)) return n;
              s.push(this);
            }
            const r = this._subscriptions;
            return null === r ? (this._subscriptions = [n]) : r.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        var e;
        return (t.EMPTY = (((e = new t()).closed = !0), e)), t;
      })();
      function c(t) {
        return t.reduce((t, e) => t.concat(e instanceof o ? e.errors : e), []);
      }
    },
    1484: function (t, e, n) {
      'use strict';
      n.d(e, {
        v: function () {
          return r;
        },
      });
      let s = !1;
      const r = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
                t.stack,
            );
          } else s && console.log('RxJS: Back to a better error behavior. Thank you. <3');
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
    },
    6882: function (t, e, n) {
      'use strict';
      n.d(e, {
        IY: function () {
          return o;
        },
        Ds: function () {
          return a;
        },
        ft: function () {
          return c;
        },
      });
      var s = n(6673),
        r = n(8318),
        i = n(6015);
      class o extends s.L {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class a extends s.L {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function c(t, e) {
        if (e.closed) return;
        if (t instanceof r.y) return t.subscribe(e);
        let n;
        try {
          n = (0, i.s)(t)(e);
        } catch (s) {
          e.error(s);
        }
        return n;
      }
    },
    2875: function (t, e, n) {
      'use strict';
      n.d(e, {
        c: function () {
          return a;
        },
        N: function () {
          return c;
        },
      });
      var s = n(5959),
        r = n(8318),
        i = n(7570),
        o = n(1564);
      class a extends r.y {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (t && !t.isStopped) || (this._subject = this.subjectFactory()), this._subject;
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new i.w()),
              t.add(this.source.subscribe(new l(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = i.w.EMPTY))),
            t
          );
        }
        refCount() {
          return (0, o.x)()(this);
        }
      }
      const c = (() => {
        const t = a.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class l extends s.Yc {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0), this._unsubscribe(), super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0), (t._subject = null), (t._connection = null), e && e.unsubscribe();
          }
        }
      }
    },
    1305: function (t, e, n) {
      'use strict';
      n.d(e, {
        aj: function () {
          return l;
        },
      });
      var s = n(6163),
        r = n(8470),
        i = n(9829),
        o = n(7e3),
        a = n(9342);
      const c = {};
      function l(...t) {
        let e, n;
        return (
          (0, s.K)(t[t.length - 1]) && (n = t.pop()),
          'function' == typeof t[t.length - 1] && (e = t.pop()),
          1 === t.length && (0, r.k)(t[0]) && (t = t[0]),
          (0, a.n)(t, n).lift(new u(e))
        );
      }
      class u {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new h(t, this.resultSelector));
        }
      }
      class h extends i.L {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(c), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) this.add((0, o.D)(this, t[n], void 0, n));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n) {
          const s = this.values,
            r = this.toRespond ? (s[n] === c ? --this.toRespond : this.toRespond) : 0;
          (s[n] = e),
            0 === r &&
              (this.resultSelector ? this._tryResultSelector(s) : this.destination.next(s.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
    },
    7930: function (t, e, n) {
      'use strict';
      n.d(e, {
        z: function () {
          return i;
        },
      });
      var s = n(878),
        r = n(7471);
      function i(...t) {
        return (0, r.J)(1)((0, s.of)(...t));
      }
    },
    653: function (t, e, n) {
      'use strict';
      n.d(e, {
        E: function () {
          return r;
        },
        c: function () {
          return i;
        },
      });
      var s = n(8318);
      const r = new s.y((t) => t.complete());
      function i(t) {
        return t
          ? (function (t) {
              return new s.y((e) => t.schedule(() => e.complete()));
            })(t)
          : r;
      }
    },
    9764: function (t, e, n) {
      'use strict';
      n.d(e, {
        D: function () {
          return h;
        },
      });
      var s = n(8318),
        r = n(6015),
        i = n(7570),
        o = n(6197),
        a = n(2570),
        c = n(5686),
        l = n(5168),
        u = n(9653);
      function h(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && 'function' == typeof t[o.L];
                  })(t)
                )
                  return (function (t, e) {
                    return new s.y((n) => {
                      const s = new i.w();
                      return (
                        s.add(
                          e.schedule(() => {
                            const r = t[o.L]();
                            s.add(
                              r.subscribe({
                                next(t) {
                                  s.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  s.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  s.add(e.schedule(() => n.complete()));
                                },
                              }),
                            );
                          }),
                        ),
                        s
                      );
                    });
                  })(t, e);
                if ((0, l.t)(t))
                  return (function (t, e) {
                    return new s.y((n) => {
                      const s = new i.w();
                      return (
                        s.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                s.add(
                                  e.schedule(() => {
                                    n.next(t), s.add(e.schedule(() => n.complete()));
                                  }),
                                );
                              },
                              (t) => {
                                s.add(e.schedule(() => n.error(t)));
                              },
                            ),
                          ),
                        ),
                        s
                      );
                    });
                  })(t, e);
                if ((0, u.z)(t)) return (0, a.r)(t, e);
                if (
                  (function (t) {
                    return t && 'function' == typeof t[c.hZ];
                  })(t) ||
                  'string' == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error('Iterable cannot be null');
                    return new s.y((n) => {
                      const s = new i.w();
                      let r;
                      return (
                        s.add(() => {
                          r && 'function' == typeof r.return && r.return();
                        }),
                        s.add(
                          e.schedule(() => {
                            (r = t[c.hZ]()),
                              s.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = r.next();
                                    (t = n.value), (e = n.done);
                                  } catch (s) {
                                    return void n.error(s);
                                  }
                                  e ? n.complete() : (n.next(t), this.schedule());
                                }),
                              );
                          }),
                        ),
                        s
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(((null !== t && typeof t) || t) + ' is not observable');
            })(t, e)
          : t instanceof s.y
          ? t
          : new s.y((0, r.s)(t));
      }
    },
    9342: function (t, e, n) {
      'use strict';
      n.d(e, {
        n: function () {
          return o;
        },
      });
      var s = n(8318),
        r = n(625),
        i = n(2570);
      function o(t, e) {
        return e ? (0, i.r)(t, e) : new s.y((0, r.V)(t));
      }
    },
    7254: function (t, e, n) {
      'use strict';
      n.d(e, {
        R: function () {
          return a;
        },
      });
      var s = n(8318),
        r = n(8470),
        i = n(5024),
        o = n(9996);
      function a(t, e, n, l) {
        return (
          (0, i.m)(n) && ((l = n), (n = void 0)),
          l
            ? a(t, e, n).pipe((0, o.U)((t) => ((0, r.k)(t) ? l(...t) : l(t))))
            : new s.y((s) => {
                c(
                  t,
                  e,
                  function (t) {
                    s.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : t);
                  },
                  s,
                  n,
                );
              })
        );
      }
      function c(t, e, n, s, r) {
        let i;
        if (
          (function (t) {
            return (
              t &&
              'function' == typeof t.addEventListener &&
              'function' == typeof t.removeEventListener
            );
          })(t)
        ) {
          const s = t;
          t.addEventListener(e, n, r), (i = () => s.removeEventListener(e, n, r));
        } else if (
          (function (t) {
            return t && 'function' == typeof t.on && 'function' == typeof t.off;
          })(t)
        ) {
          const s = t;
          t.on(e, n), (i = () => s.off(e, n));
        } else if (
          (function (t) {
            return t && 'function' == typeof t.addListener && 'function' == typeof t.removeListener;
          })(t)
        ) {
          const s = t;
          t.addListener(e, n), (i = () => s.removeListener(e, n));
        } else {
          if (!t || !t.length) throw new TypeError('Invalid event target');
          for (let i = 0, o = t.length; i < o; i++) c(t[i], e, n, s, r);
        }
        s.add(i);
      }
    },
    1906: function (t, e, n) {
      'use strict';
      n.d(e, {
        T: function () {
          return a;
        },
      });
      var s = n(8318),
        r = n(6163),
        i = n(7471),
        o = n(9342);
      function a(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          a = t[t.length - 1];
        return (
          (0, r.K)(a)
            ? ((n = t.pop()), t.length > 1 && 'number' == typeof t[t.length - 1] && (e = t.pop()))
            : 'number' == typeof a && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof s.y ? t[0] : (0, i.J)(e)((0, o.n)(t, n))
        );
      }
    },
    878: function (t, e, n) {
      'use strict';
      n.d(e, {
        of: function () {
          return o;
        },
      });
      var s = n(6163),
        r = n(9342),
        i = n(2570);
      function o(...t) {
        let e = t[t.length - 1];
        return (0, s.K)(e) ? (t.pop(), (0, i.r)(t, e)) : (0, r.n)(t);
      }
    },
    1225: function (t, e, n) {
      'use strict';
      n.d(e, {
        _: function () {
          return r;
        },
      });
      var s = n(8318);
      function r(t, e) {
        return new s.y(
          e ? (n) => e.schedule(i, 0, { error: t, subscriber: n }) : (e) => e.error(t),
        );
      }
      function i({ error: t, subscriber: e }) {
        e.error(t);
      }
    },
    1110: function (t, e, n) {
      'use strict';
      n.d(e, {
        H: function () {
          return a;
        },
      });
      var s = n(8318),
        r = n(8569),
        i = n(2293),
        o = n(6163);
      function a(t = 0, e, n) {
        let a = -1;
        return (
          (0, i.k)(e) ? (a = Number(e) < 1 ? 1 : Number(e)) : (0, o.K)(e) && (n = e),
          (0, o.K)(n) || (n = r.P),
          new s.y((e) => {
            const s = (0, i.k)(t) ? t : +t - n.now();
            return n.schedule(c, s, { index: 0, period: a, subscriber: e });
          })
        );
      }
      function c(t) {
        const { index: e, period: n, subscriber: s } = t;
        if ((s.next(e), !s.closed)) {
          if (-1 === n) return s.complete();
          (t.index = e + 1), this.schedule(t, n);
        }
      }
    },
    810: function (t, e, n) {
      'use strict';
      n.d(e, {
        e: function () {
          return c;
        },
      });
      var s = n(8569),
        r = n(6882);
      class i {
        constructor(t) {
          this.durationSelector = t;
        }
        call(t, e) {
          return e.subscribe(new o(t, this.durationSelector));
        }
      }
      class o extends r.Ds {
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
            const s = (0, r.ft)(n, new r.IY(this));
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
      var a = n(1110);
      function c(t, e = s.P) {
        return (
          (n = () => (0, a.H)(t, e)),
          function (t) {
            return t.lift(new i(n));
          }
        );
        var n;
      }
    },
    7727: function (t, e, n) {
      'use strict';
      n.d(e, {
        K: function () {
          return r;
        },
      });
      var s = n(6882);
      function r(t) {
        return function (e) {
          const n = new i(t),
            s = e.lift(n);
          return (n.caught = s);
        };
      }
      class i {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new o(t, this.selector, this.caught));
        }
      }
      class o extends s.Ds {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new s.IY(this);
            this.add(r);
            const i = (0, s.ft)(n, r);
            i !== r && this.add(i);
          }
        }
      }
    },
    436: function (t, e, n) {
      'use strict';
      n.d(e, {
        b: function () {
          return r;
        },
      });
      var s = n(3982);
      function r(t, e) {
        return (0, s.zg)(t, e, 1);
      }
    },
    7701: function (t, e, n) {
      'use strict';
      n.d(e, {
        b: function () {
          return i;
        },
      });
      var s = n(6673),
        r = n(8569);
      function i(t, e = r.P) {
        return (n) => n.lift(new o(t, e));
      }
      class o {
        constructor(t, e) {
          (this.dueTime = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new a(t, this.dueTime, this.scheduler));
        }
      }
      class a extends s.L {
        constructor(t, e, n) {
          super(t),
            (this.dueTime = e),
            (this.scheduler = n),
            (this.debouncedSubscription = null),
            (this.lastValue = null),
            (this.hasValue = !1);
        }
        _next(t) {
          this.clearDebounce(),
            (this.lastValue = t),
            (this.hasValue = !0),
            this.add((this.debouncedSubscription = this.scheduler.schedule(c, this.dueTime, this)));
        }
        _complete() {
          this.debouncedNext(), this.destination.complete();
        }
        debouncedNext() {
          if ((this.clearDebounce(), this.hasValue)) {
            const { lastValue: t } = this;
            (this.lastValue = null), (this.hasValue = !1), this.destination.next(t);
          }
        }
        clearDebounce() {
          const t = this.debouncedSubscription;
          null !== t && (this.remove(t), t.unsubscribe(), (this.debouncedSubscription = null));
        }
      }
      function c(t) {
        t.debouncedNext();
      }
    },
    7768: function (t, e, n) {
      'use strict';
      n.d(e, {
        d: function () {
          return r;
        },
      });
      var s = n(6673);
      function r(t = null) {
        return (e) => e.lift(new i(t));
      }
      class i {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new o(t, this.defaultValue));
        }
      }
      class o extends s.L {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete();
        }
      }
    },
    8720: function (t, e, n) {
      'use strict';
      n.d(e, {
        x: function () {
          return r;
        },
      });
      var s = n(6673);
      function r(t, e) {
        return (n) => n.lift(new i(t, e));
      }
      class i {
        constructor(t, e) {
          (this.compare = t), (this.keySelector = e);
        }
        call(t, e) {
          return e.subscribe(new o(t, this.compare, this.keySelector));
        }
      }
      class o extends s.L {
        constructor(t, e, n) {
          super(t),
            (this.keySelector = n),
            (this.hasKey = !1),
            'function' == typeof e && (this.compare = e);
        }
        compare(t, e) {
          return t === e;
        }
        _next(t) {
          let e;
          try {
            const { keySelector: n } = this;
            e = n ? n(t) : t;
          } catch (s) {
            return this.destination.error(s);
          }
          let n = !1;
          if (this.hasKey)
            try {
              const { compare: t } = this;
              n = t(this.key, e);
            } catch (s) {
              return this.destination.error(s);
            }
          else this.hasKey = !0;
          n || ((this.key = e), this.destination.next(t));
        }
      }
    },
    3835: function (t, e, n) {
      'use strict';
      n.d(e, {
        h: function () {
          return r;
        },
      });
      var s = n(6673);
      function r(t, e) {
        return function (n) {
          return n.lift(new i(t, e));
        };
      }
      class i {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new o(t, this.predicate, this.thisArg));
        }
      }
      class o extends s.L {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
    },
    1520: function (t, e, n) {
      'use strict';
      n.d(e, {
        x: function () {
          return i;
        },
      });
      var s = n(6673),
        r = n(7570);
      function i(t) {
        return (e) => e.lift(new o(t));
      }
      class o {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new a(t, this.callback));
        }
      }
      class a extends s.L {
        constructor(t, e) {
          super(t), this.add(new r.w(e));
        }
      }
    },
    3530: function (t, e, n) {
      'use strict';
      n.d(e, {
        P: function () {
          return l;
        },
      });
      var s = n(9665),
        r = n(3835),
        i = n(611),
        o = n(7768),
        a = n(790),
        c = n(3392);
      function l(t, e) {
        const n = arguments.length >= 2;
        return (l) =>
          l.pipe(
            t ? (0, r.h)((e, n) => t(e, n, l)) : c.y,
            (0, i.q)(1),
            n ? (0, o.d)(e) : (0, a.T)(() => new s.K()),
          );
      }
    },
    9996: function (t, e, n) {
      'use strict';
      n.d(e, {
        U: function () {
          return r;
        },
      });
      var s = n(6673);
      function r(t, e) {
        return function (n) {
          if ('function' != typeof t)
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
          return n.lift(new i(t, e));
        };
      }
      class i {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new o(t, this.project, this.thisArg));
        }
      }
      class o extends s.L {
        constructor(t, e, n) {
          super(t), (this.project = e), (this.count = 0), (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
    },
    7471: function (t, e, n) {
      'use strict';
      n.d(e, {
        J: function () {
          return i;
        },
      });
      var s = n(3982),
        r = n(3392);
      function i(t = Number.POSITIVE_INFINITY) {
        return (0, s.zg)(r.y, t);
      }
    },
    3982: function (t, e, n) {
      'use strict';
      n.d(e, {
        zg: function () {
          return o;
        },
      });
      var s = n(9996),
        r = n(9764),
        i = n(6882);
      function o(t, e, n = Number.POSITIVE_INFINITY) {
        return 'function' == typeof e
          ? (i) => i.pipe(o((n, i) => (0, r.D)(t(n, i)).pipe((0, s.U)((t, s) => e(n, t, i, s))), n))
          : ('number' == typeof e && (n = e), (e) => e.lift(new a(t, n)));
      }
      class a {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new c(t, this.project, this.concurrent));
        }
      }
      class c extends i.Ds {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new i.IY(this),
            n = this.destination;
          n.add(e);
          const s = (0, i.ft)(t, e);
          s !== e && n.add(s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active && 0 === this.buffer.length && this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active && this.hasCompleted && this.destination.complete();
        }
      }
    },
    6598: function (t, e, n) {
      'use strict';
      n.d(e, {
        O: function () {
          return r;
        },
      });
      var s = n(2875);
      function r(t, e) {
        return function (n) {
          let r;
          if (
            ((r =
              'function' == typeof t
                ? t
                : function () {
                    return t;
                  }),
            'function' == typeof e)
          )
            return n.lift(new i(r, e));
          const o = Object.create(n, s.N);
          return (o.source = n), (o.subjectFactory = r), o;
        };
      }
      class i {
        constructor(t, e) {
          (this.subjectFactory = t), (this.selector = e);
        }
        call(t, e) {
          const { selector: n } = this,
            s = this.subjectFactory(),
            r = n(s).subscribe(t);
          return r.add(e.subscribe(s)), r;
        }
      }
    },
    45: function (t, e, n) {
      'use strict';
      n.d(e, {
        QV: function () {
          return i;
        },
        ht: function () {
          return a;
        },
      });
      var s = n(6673),
        r = n(3103);
      function i(t, e = 0) {
        return function (n) {
          return n.lift(new o(t, e));
        };
      }
      class o {
        constructor(t, e = 0) {
          (this.scheduler = t), (this.delay = e);
        }
        call(t, e) {
          return e.subscribe(new a(t, this.scheduler, this.delay));
        }
      }
      class a extends s.L {
        constructor(t, e, n = 0) {
          super(t), (this.scheduler = e), (this.delay = n);
        }
        static dispatch(t) {
          const { notification: e, destination: n } = t;
          e.observe(n), this.unsubscribe();
        }
        scheduleMessage(t) {
          this.destination.add(
            this.scheduler.schedule(a.dispatch, this.delay, new c(t, this.destination)),
          );
        }
        _next(t) {
          this.scheduleMessage(r.P.createNext(t));
        }
        _error(t) {
          this.scheduleMessage(r.P.createError(t)), this.unsubscribe();
        }
        _complete() {
          this.scheduleMessage(r.P.createComplete()), this.unsubscribe();
        }
      }
      class c {
        constructor(t, e) {
          (this.notification = t), (this.destination = e);
        }
      }
    },
    7296: function (t, e, n) {
      'use strict';
      n.d(e, {
        C: function () {
          return i;
        },
      });
      var s = n(2223),
        r = n(6598);
      function i() {
        return (t) => (0, r.O)(new s.c())(t);
      }
    },
    9753: function (t, e, n) {
      'use strict';
      n.d(e, {
        _: function () {
          return i;
        },
      });
      var s = n(6605),
        r = n(6598);
      function i(t, e, n, i) {
        n && 'function' != typeof n && (i = n);
        const o = 'function' == typeof n ? n : void 0,
          a = new s.t(t, e, i);
        return (t) => (0, r.O)(() => a, o)(t);
      }
    },
    1564: function (t, e, n) {
      'use strict';
      n.d(e, {
        x: function () {
          return r;
        },
      });
      var s = n(6673);
      function r() {
        return function (t) {
          return t.lift(new i(t));
        };
      }
      class i {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const s = new o(t, n),
            r = e.subscribe(s);
          return s.closed || (s.connection = n.connect()), r;
        }
      }
      class o extends s.L {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1)) return void (this.connection = null);
          const { connection: n } = this,
            s = t._connection;
          (this.connection = null), !s || (n && s !== n) || s.unsubscribe();
        }
      }
    },
    619: function (t, e, n) {
      'use strict';
      n.d(e, {
        B: function () {
          return a;
        },
      });
      var s = n(6598),
        r = n(1564),
        i = n(5959);
      function o() {
        return new i.xQ();
      }
      function a() {
        return (t) => (0, r.x)()((0, s.O)(o)(t));
      }
    },
    6238: function (t, e, n) {
      'use strict';
      n.d(e, {
        O: function () {
          return i;
        },
      });
      var s = n(7930),
        r = n(6163);
      function i(...t) {
        const e = t[t.length - 1];
        return (0, r.K)(e) ? (t.pop(), (n) => (0, s.z)(t, n, e)) : (e) => (0, s.z)(t, e);
      }
    },
    4689: function (t, e, n) {
      'use strict';
      n.d(e, {
        w: function () {
          return o;
        },
      });
      var s = n(9996),
        r = n(9764),
        i = n(6882);
      function o(t, e) {
        return 'function' == typeof e
          ? (n) => n.pipe(o((n, i) => (0, r.D)(t(n, i)).pipe((0, s.U)((t, s) => e(n, t, i, s)))))
          : (e) => e.lift(new a(t));
      }
      class a {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new c(t, this.project));
        }
      }
      class c extends i.Ds {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this._innerSub(e);
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new i.IY(this),
            s = this.destination;
          s.add(n),
            (this.innerSubscription = (0, i.ft)(t, n)),
            this.innerSubscription !== n && s.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0), this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
    },
    611: function (t, e, n) {
      'use strict';
      n.d(e, {
        q: function () {
          return o;
        },
      });
      var s = n(6673),
        r = n(8402),
        i = n(653);
      function o(t) {
        return (e) => (0 === t ? (0, i.c)() : e.lift(new a(t)));
      }
      class a {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new r.W();
        }
        call(t, e) {
          return e.subscribe(new c(t, this.total));
        }
      }
      class c extends s.L {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
    },
    5416: function (t, e, n) {
      'use strict';
      n.d(e, {
        R: function () {
          return r;
        },
      });
      var s = n(6882);
      function r(t) {
        return (e) => e.lift(new i(t));
      }
      class i {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new o(t),
            r = (0, s.ft)(this.notifier, new s.IY(n));
          return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n;
        }
      }
      class o extends s.Ds {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext() {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
    },
    4019: function (t, e, n) {
      'use strict';
      n.d(e, {
        b: function () {
          return o;
        },
      });
      var s = n(6673),
        r = n(6054),
        i = n(5024);
      function o(t, e, n) {
        return function (s) {
          return s.lift(new a(t, e, n));
        };
      }
      class a {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(new c(t, this.nextOrObserver, this.error, this.complete));
        }
      }
      class c extends s.L {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = r.Z),
            (this._tapError = r.Z),
            (this._tapComplete = r.Z),
            (this._tapError = n || r.Z),
            (this._tapComplete = s || r.Z),
            (0, i.m)(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || r.Z),
                (this._tapError = e.error || r.Z),
                (this._tapComplete = e.complete || r.Z));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
    },
    790: function (t, e, n) {
      'use strict';
      n.d(e, {
        T: function () {
          return i;
        },
      });
      var s = n(9665),
        r = n(6673);
      function i(t = c) {
        return (e) => e.lift(new o(t));
      }
      class o {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new a(t, this.errorFactory));
        }
      }
      class a extends r.L {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function c() {
        return new s.K();
      }
    },
    2570: function (t, e, n) {
      'use strict';
      n.d(e, {
        r: function () {
          return i;
        },
      });
      var s = n(8318),
        r = n(7570);
      function i(t, e) {
        return new s.y((n) => {
          const s = new r.w();
          let i = 0;
          return (
            s.add(
              e.schedule(function () {
                i !== t.length
                  ? (n.next(t[i++]), n.closed || s.add(this.schedule()))
                  : n.complete();
              }),
            ),
            s
          );
        });
      }
    },
    8277: function (t, e, n) {
      'use strict';
      n.d(e, {
        o: function () {
          return i;
        },
      });
      var s = n(7570);
      class r extends s.w {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class i extends r {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e), (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            s = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(s, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(s, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n,
            s = !1;
          try {
            this.work(t);
          } catch (r) {
            (s = !0), (n = (!!r && r) || new Error(r));
          }
          if (s) return this.unsubscribe(), n;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            s = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== s && n.splice(s, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
    },
    1098: function (t, e, n) {
      'use strict';
      n.d(e, {
        v: function () {
          return r;
        },
      });
      let s = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class r extends s {
        constructor(t, e = s.now) {
          super(t, () => (r.delegate && r.delegate !== this ? r.delegate.now() : e())),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return r.delegate && r.delegate !== this
            ? r.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
    },
    2709: function (t, e, n) {
      'use strict';
      n.d(e, {
        e: function () {
          return f;
        },
        E: function () {
          return d;
        },
      });
      let s = 1;
      const r = (() => Promise.resolve())(),
        i = {};
      function o(t) {
        return t in i && (delete i[t], !0);
      }
      const a = {
        setImmediate(t) {
          const e = s++;
          return (i[e] = !0), r.then(() => o(e) && t()), e;
        },
        clearImmediate(t) {
          o(t);
        },
      };
      var c = n(8277);
      class l extends c.o {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e);
        }
        requestAsyncId(t, e, n = 0) {
          return null !== n && n > 0
            ? super.requestAsyncId(t, e, n)
            : (t.actions.push(this),
              t.scheduled || (t.scheduled = a.setImmediate(t.flush.bind(t, null))));
        }
        recycleAsyncId(t, e, n = 0) {
          if ((null !== n && n > 0) || (null === n && this.delay > 0))
            return super.recycleAsyncId(t, e, n);
          0 === t.actions.length && (a.clearImmediate(e), (t.scheduled = void 0));
        }
      }
      var u = n(1098);
      class h extends u.v {
        flush(t) {
          (this.active = !0), (this.scheduled = void 0);
          const { actions: e } = this;
          let n,
            s = -1,
            r = e.length;
          t = t || e.shift();
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while (++s < r && (t = e.shift()));
          if (((this.active = !1), n)) {
            for (; ++s < r && (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      const d = new h(l),
        f = d;
    },
    8569: function (t, e, n) {
      'use strict';
      n.d(e, {
        P: function () {
          return r;
        },
      });
      var s = n(8277);
      const r = new (n(1098).v)(s.o);
    },
    5686: function (t, e, n) {
      'use strict';
      function s() {
        return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
      }
      n.d(e, {
        hZ: function () {
          return r;
        },
      });
      const r = s();
    },
    6197: function (t, e, n) {
      'use strict';
      n.d(e, {
        L: function () {
          return s;
        },
      });
      const s = (() => ('function' == typeof Symbol && Symbol.observable) || '@@observable')();
    },
    5331: function (t, e, n) {
      'use strict';
      n.d(e, {
        b: function () {
          return s;
        },
      });
      const s = (() =>
        'function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random())();
    },
    8402: function (t, e, n) {
      'use strict';
      n.d(e, {
        W: function () {
          return s;
        },
      });
      const s = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = 'argument out of range'),
            (this.name = 'ArgumentOutOfRangeError'),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    9665: function (t, e, n) {
      'use strict';
      n.d(e, {
        K: function () {
          return s;
        },
      });
      const s = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = 'no elements in sequence'),
            (this.name = 'EmptyError'),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    3895: function (t, e, n) {
      'use strict';
      n.d(e, {
        N: function () {
          return s;
        },
      });
      const s = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = 'object unsubscribed'),
            (this.name = 'ObjectUnsubscribedError'),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    4294: function (t, e, n) {
      'use strict';
      function s(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      n.d(e, {
        z: function () {
          return s;
        },
      });
    },
    3392: function (t, e, n) {
      'use strict';
      function s(t) {
        return t;
      }
      n.d(e, {
        y: function () {
          return s;
        },
      });
    },
    8470: function (t, e, n) {
      'use strict';
      n.d(e, {
        k: function () {
          return s;
        },
      });
      const s = (() => Array.isArray || ((t) => t && 'number' == typeof t.length))();
    },
    9653: function (t, e, n) {
      'use strict';
      n.d(e, {
        z: function () {
          return s;
        },
      });
      const s = (t) => t && 'number' == typeof t.length && 'function' != typeof t;
    },
    5024: function (t, e, n) {
      'use strict';
      function s(t) {
        return 'function' == typeof t;
      }
      n.d(e, {
        m: function () {
          return s;
        },
      });
    },
    2293: function (t, e, n) {
      'use strict';
      n.d(e, {
        k: function () {
          return r;
        },
      });
      var s = n(8470);
      function r(t) {
        return !(0, s.k)(t) && t - parseFloat(t) + 1 >= 0;
      }
    },
    2056: function (t, e, n) {
      'use strict';
      function s(t) {
        return null !== t && 'object' == typeof t;
      }
      n.d(e, {
        K: function () {
          return s;
        },
      });
    },
    5168: function (t, e, n) {
      'use strict';
      function s(t) {
        return !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then;
      }
      n.d(e, {
        t: function () {
          return s;
        },
      });
    },
    6163: function (t, e, n) {
      'use strict';
      function s(t) {
        return t && 'function' == typeof t.schedule;
      }
      n.d(e, {
        K: function () {
          return s;
        },
      });
    },
    6054: function (t, e, n) {
      'use strict';
      function s() {}
      n.d(e, {
        Z: function () {
          return s;
        },
      });
    },
    6015: function (t, e, n) {
      'use strict';
      n.d(e, {
        s: function () {
          return u;
        },
      });
      var s = n(625),
        r = n(4294),
        i = n(5686),
        o = n(6197),
        a = n(9653),
        c = n(5168),
        l = n(2056);
      const u = (t) => {
        if (t && 'function' == typeof t[o.L])
          return (
            (u = t),
            (t) => {
              const e = u[o.L]();
              if ('function' != typeof e.subscribe)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable',
                );
              return e.subscribe(t);
            }
          );
        if ((0, a.z)(t)) return (0, s.V)(t);
        if ((0, c.t)(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e),
                )
                .then(null, r.z),
              t
            )
          );
        if (t && 'function' == typeof t[i.hZ])
          return (
            (e = t),
            (t) => {
              const n = e[i.hZ]();
              for (;;) {
                let e;
                try {
                  e = n.next();
                } catch (s) {
                  return t.error(s), t;
                }
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                'function' == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = (0, l.K)(t) ? 'an invalid object' : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`,
          );
        }
        var e, n, u;
      };
    },
    625: function (t, e, n) {
      'use strict';
      n.d(e, {
        V: function () {
          return s;
        },
      });
      const s = (t) => (e) => {
        for (let n = 0, s = t.length; n < s && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
    },
    7e3: function (t, e, n) {
      'use strict';
      n.d(e, {
        D: function () {
          return a;
        },
      });
      var s = n(6673);
      class r extends s.L {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this);
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      var i = n(6015),
        o = n(8318);
      function a(t, e, n, s, a = new r(t, n, s)) {
        if (!a.closed) return e instanceof o.y ? e.subscribe(a) : (0, i.s)(e)(a);
      }
    },
    1374: function (t, e, n) {
      'use strict';
      n.d(e, {
        xx: function () {
          return d;
        },
        cH: function () {
          return f;
        },
        bL: function () {
          return p;
        },
        Yp: function () {
          return m;
        },
        Zg: function () {
          return g;
        },
      });
      var s = n(2223),
        r = n(878),
        i = n(4689),
        o = n(4019),
        a = n(7727),
        c = n(5366),
        l = n(9474),
        u = n(2693),
        h = n(2981);
      const d = 'file-not-found',
        f = 'fetching-error',
        p = 'generated/',
        m = p + 'docs/';
      let g = (() => {
        class t {
          constructor(t, e, n) {
            (this.logger = t),
              (this.http = e),
              (this.cache = new Map()),
              (this.currentDocument = n.currentPath.pipe((0, i.w)((t) => this.getDocument(t))));
          }
          getDocument(t) {
            const e = t || 'index';
            return (
              this.logger.log('getting document', e),
              this.cache.has(e) || this.cache.set(e, this.fetchDocument(e)),
              this.cache.get(e)
            );
          }
          fetchDocument(t) {
            const e = `${m}${t}.json`,
              n = new s.c();
            return (
              this.logger.log('fetching document from', e),
              this.http
                .get(e, { responseType: 'json' })
                .pipe(
                  (0, o.b)((t) => {
                    if (!t || 'object' != typeof t)
                      throw (this.logger.log('received invalid data:', t), Error('Invalid data'));
                  }),
                  (0, a.K)((e) =>
                    404 === e.status ? this.getFileNotFoundDoc(t) : this.getErrorDoc(t, e),
                  ),
                )
                .subscribe(n),
              n.asObservable()
            );
          }
          getFileNotFoundDoc(t) {
            return t !== d
              ? (this.logger.error(new Error(`Document file not found at '${t}'`)),
                this.getDocument(d))
              : (0, r.of)({ id: d, contents: 'Document not found' });
          }
          getErrorDoc(t, e) {
            return (
              this.logger.error(new Error(`Error fetching document '${t}': (${e.message})`)),
              this.cache.delete(t),
              (0, r.of)({
                id: f,
                contents:
                  ((n = t),
                  `\n  <div class="nf-container l-flex-wrap flex-center">\n    <div class="nf-icon material-icons">error_outline</div>\n    <div class="nf-response l-flex-wrap">\n      <h1 class="no-toc">Request for document failed.</h1>\n      <p>\n        We are unable to retrieve the "${n}" page at this time.\n        Please check your connection and try again later.\n      </p>\n    </div>\n  </div>\n`),
              })
            );
            var n;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(c.LFG(l.Y), c.LFG(u.eN), c.LFG(h.a));
          }),
          (t.ɵprov = c.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
    },
    6396: function (t, e, n) {
      'use strict';
      n.d(e, {
        o: function () {
          return _;
        },
      });
      var s = n(8470),
        r = n(9342),
        i = n(9829),
        o = n(7e3);
      class a {
        call(t, e) {
          return e.subscribe(new c(t));
        }
      }
      class c extends i.L {
        constructor(t) {
          super(t), (this.hasFirst = !1), (this.observables = []), (this.subscriptions = []);
        }
        _next(t) {
          this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            for (let n = 0; n < e && !this.hasFirst; n++) {
              const e = (0, o.D)(this, t[n], void 0, n);
              this.subscriptions && this.subscriptions.push(e), this.add(e);
            }
            this.observables = null;
          }
        }
        notifyNext(t, e, n) {
          if (!this.hasFirst) {
            this.hasFirst = !0;
            for (let t = 0; t < this.subscriptions.length; t++)
              if (t !== n) {
                let e = this.subscriptions[t];
                e.unsubscribe(), this.remove(e);
              }
            this.subscriptions = null;
          }
          this.destination.next(e);
        }
      }
      var l = n(6605),
        u = n(1110),
        h = n(3530),
        d = n(436),
        f = n(9753),
        p = n(8318);
      class m {
        constructor(t, e) {
          (this.worker = t), (this.zone = e), (this.nextId = 0);
        }
        static create(t, e) {
          return new m(t, e);
        }
        sendMessage(t, e) {
          return new p.y((n) => {
            const s = this.nextId++,
              r = (e) => {
                const { type: r, id: i, payload: o } = e.data;
                t === r &&
                  s === i &&
                  this.zone.run(() => {
                    n.next(o), n.complete();
                  });
              },
              i = (t) => {
                this.zone.run(() => n.error(t));
              };
            return (
              this.worker.addEventListener('message', r),
              this.worker.addEventListener('error', i),
              this.worker.postMessage({ type: t, id: s, payload: e }),
              () => {
                this.worker.removeEventListener('message', r),
                  this.worker.removeEventListener('error', i);
              }
            );
          });
        }
      }
      var g = n(5366);
      let _ = (() => {
        class t {
          constructor(t) {
            (this.zone = t), (this.searchesSubject = new l.t(1));
          }
          initWorker(t) {
            const e = (this.ready = (function (...t) {
              if (1 === t.length) {
                if (!(0, s.k)(t[0])) return t[0];
                t = t[0];
              }
              return (0, r.n)(t, void 0).lift(new a());
            })((0, u.H)(t), this.searchesSubject.asObservable().pipe((0, h.P)())).pipe(
              (0, d.b)(() => {
                const t = new Worker(new URL(n.p + n.u('src_app_search_search_worker_ts'), n.b), {
                  type: void 0,
                });
                return (
                  (this.worker = m.create(t, this.zone)), this.worker.sendMessage('load-index')
                );
              }),
              (0, f._)(1),
            ));
            return e.connect(), e;
          }
          search(t) {
            return (
              this.searchesSubject.next(t),
              this.ready.pipe((0, d.b)(() => this.worker.sendMessage('query-index', t)))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(g.LFG(g.R0b));
          }),
          (t.ɵprov = g.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
    },
    6896: function (t, e, n) {
      'use strict';
      n.d(e, {
        O: function () {
          return o;
        },
      });
      var s = n(529),
        r = n(5285),
        i = n(5366);
      let o = (() => {
        class t {
          constructor(t) {
            (this.window = t), this.ga('create', s.N.gaId, 'auto');
          }
          locationChanged(t) {
            this.sendPage(t);
          }
          sendPage(t) {
            t !== this.previousUrl &&
              ((this.previousUrl = t),
              this.ga('set', 'page', '/' + t),
              this.ga('send', 'pageview'));
          }
          sendEvent(t, e, n, s) {
            this.ga('send', 'event', t, e, n, s);
          }
          ga(...t) {
            const e = this.window.ga;
            e && e(...t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(i.LFG(r.R));
          }),
          (t.ɵprov = i.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
    },
    2981: function (t, e, n) {
      'use strict';
      n.d(e, {
        a: function () {
          return u;
        },
      });
      var s = n(6605),
        r = n(9996),
        i = n(4019),
        o = n(5366),
        a = n(6896),
        c = n(1116),
        l = n(2250);
      let u = (() => {
        class t {
          constructor(t, e, n, o) {
            (this.gaService = t),
              (this.location = e),
              (this.scrollService = n),
              (this.platformLocation = o),
              (this.urlParser = document.createElement('a')),
              (this.urlSubject = new s.t(1)),
              (this.fullPageNavigation = !1),
              (this.currentUrl = this.urlSubject.pipe((0, r.U)((t) => this.stripSlashes(t)))),
              (this.currentPath = this.currentUrl.pipe(
                (0, r.U)((t) => (t.match(/[^?#]*/) || [])[0]),
                (0, i.b)((t) => this.gaService.locationChanged(t)),
              )),
              this.urlSubject.next(e.path(!0)),
              this.location.subscribe((t) => this.urlSubject.next(t.url || ''));
          }
          fullPageNavigationNeeded() {
            this.fullPageNavigation = !0;
          }
          go(t) {
            t &&
              ((t = this.stripSlashes(t)),
              /^http/.test(t)
                ? this.goExternal(t)
                : this.fullPageNavigation
                ? (this.scrollService.removeStoredScrollInfo(), this.goExternal(t))
                : (this.location.go(t), this.urlSubject.next(t)));
          }
          goExternal(t) {
            window.location.assign(t);
          }
          replace(t) {
            window.location.replace(t);
          }
          reloadPage() {
            window.location.reload();
          }
          stripSlashes(t) {
            return t.replace(/^\/+/, '').replace(/\/+(\?|#|$)/, '$1');
          }
          search() {
            const t = {},
              e = this.location.path(),
              n = e.indexOf('?');
            if (n > -1)
              try {
                e.substr(n + 1)
                  .split('&')
                  .forEach((e) => {
                    const n = e.split('=');
                    n[0] && (t[decodeURIComponent(n[0])] = n[1] && decodeURIComponent(n[1]));
                  });
              } catch (s) {}
            return t;
          }
          setSearch(t, e) {
            const n = Object.keys(e).reduce((t, n) => {
              const s = e[n];
              return void 0 === s
                ? t
                : (t += (t ? '&' : '?') + `${encodeURIComponent(n)}=${encodeURIComponent(s)}`);
            }, '');
            this.platformLocation.replaceState({}, t, this.platformLocation.pathname + n);
          }
          handleAnchorClick(t, e = 0, n = !1, s = !1) {
            if (0 !== e || n || s) return !0;
            const r = t.target;
            if (r && '_self' !== r) return !0;
            if (null != t.getAttribute('download')) return !0;
            const { pathname: i, search: o, hash: a } = t,
              c = i + o + a;
            return (
              (this.urlParser.href = c),
              t.href !== this.urlParser.href || !/\/[^/.]*$/.test(i) || (this.go(c), !1)
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(o.LFG(a.O), o.LFG(c.Ye), o.LFG(l.a), o.LFG(c.lw));
          }),
          (t.ɵprov = o.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
    },
    9474: function (t, e, n) {
      'use strict';
      n.d(e, {
        Y: function () {
          return i;
        },
      });
      var s = n(529),
        r = n(5366);
      let i = (() => {
        class t {
          constructor(t) {
            this.errorHandler = t;
          }
          log(t, ...e) {
            s.N.production || console.log(t, ...e);
          }
          error(t) {
            this.errorHandler.handleError(t);
          }
          warn(t, ...e) {
            console.warn(t, ...e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(r.qLn));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
    },
    1262: function (t, e, n) {
      'use strict';
      n.d(e, {
        f_: function () {
          return p;
        },
      });
      var s = n(1116),
        r = n(6605),
        i = n(5959),
        o = n(7254),
        a = n(810),
        c = n(5416),
        l = n(8720),
        u = n(5366),
        h = n(2250);
      class d {
        constructor(t, e) {
          (this.element = t), (this.index = e), (this.top = 0);
        }
        calculateTop(t, e) {
          this.top = t + this.element.getBoundingClientRect().top - e;
        }
      }
      class f {
        constructor(t) {
          (this.activeScrollItem = new r.t(1)), (this.spiedElements = t.map((t, e) => new d(t, e)));
        }
        calibrate(t, e) {
          this.spiedElements.forEach((n) => n.calculateTop(t, e)),
            this.spiedElements.sort((t, e) => e.top - t.top);
        }
        onScroll(t, e) {
          let n;
          t + 1 >= e
            ? (n = this.spiedElements[0])
            : this.spiedElements.some((e) => e.top <= t && ((n = e), !0)),
            this.activeScrollItem.next(n || null);
        }
      }
      let p = (() => {
        class t {
          constructor(t, e) {
            (this.doc = t),
              (this.scrollService = e),
              (this.spiedElementGroups = []),
              (this.onStopListening = new i.xQ()),
              (this.resizeEvents = (0, o.R)(window, 'resize').pipe(
                (0, a.e)(300),
                (0, c.R)(this.onStopListening),
              )),
              (this.scrollEvents = (0, o.R)(window, 'scroll').pipe(
                (0, a.e)(10),
                (0, c.R)(this.onStopListening),
              ));
          }
          spyOn(t) {
            this.spiedElementGroups.length ||
              (this.resizeEvents.subscribe(() => this.onResize()),
              this.scrollEvents.subscribe(() => this.onScroll()),
              this.onResize());
            const e = this.getScrollTop(),
              n = this.getTopOffset(),
              s = this.lastMaxScrollTop,
              r = new f(t);
            return (
              r.calibrate(e, n),
              r.onScroll(e, s),
              this.spiedElementGroups.push(r),
              {
                active: r.activeScrollItem.asObservable().pipe((0, l.x)()),
                unspy: () => this.unspy(r),
              }
            );
          }
          getContentHeight() {
            return this.doc.body.scrollHeight || Number.MAX_SAFE_INTEGER;
          }
          getScrollTop() {
            return (window && window.pageYOffset) || 0;
          }
          getTopOffset() {
            return this.scrollService.topOffset + 50;
          }
          getViewportHeight() {
            return this.doc.body.clientHeight || 0;
          }
          onResize() {
            const t = this.getContentHeight(),
              e = this.getViewportHeight(),
              n = this.getScrollTop(),
              s = this.getTopOffset();
            (this.lastContentHeight = t),
              (this.lastMaxScrollTop = t - e),
              this.spiedElementGroups.forEach((t) => t.calibrate(n, s));
          }
          onScroll() {
            this.lastContentHeight !== this.getContentHeight() && this.onResize();
            const t = this.getScrollTop(),
              e = this.lastMaxScrollTop;
            this.spiedElementGroups.forEach((n) => n.onScroll(t, e));
          }
          unspy(t) {
            t.activeScrollItem.complete(),
              (this.spiedElementGroups = this.spiedElementGroups.filter((e) => e !== t)),
              this.spiedElementGroups.length || this.onStopListening.next();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(u.LFG(s.K0), u.LFG(h.a));
          }),
          (t.ɵprov = u.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
    },
    2250: function (t, e, n) {
      'use strict';
      n.d(e, {
        a: function () {
          return l;
        },
      });
      var s = n(1116),
        r = n(5959),
        i = n(7254),
        o = n(5416),
        a = n(7701),
        c = n(5366);
      let l = (() => {
        class t {
          constructor(t, e, n, s) {
            (this.document = t),
              (this.platformLocation = e),
              (this.viewportScroller = n),
              (this.location = s),
              (this.onDestroy = new r.xQ()),
              (this.poppedStateScrollPosition = null),
              (this.supportManualScrollRestoration =
                !!window &&
                'scrollTo' in window &&
                'pageXOffset' in window &&
                (function () {
                  const t =
                    Object.getOwnPropertyDescriptor(history, 'scrollRestoration') ||
                    Object.getOwnPropertyDescriptor(
                      Object.getPrototypeOf(history),
                      'scrollRestoration',
                    );
                  return void 0 !== t && !(!t.writable && !t.set);
                })());
            try {
              this.storage = window.sessionStorage;
            } catch (c) {
              this.storage = {
                length: 0,
                clear: () => {},
                getItem: () => null,
                key: () => null,
                removeItem: () => {},
                setItem: () => {},
              };
            }
            if (
              ((0, i.R)(window, 'resize')
                .pipe((0, o.R)(this.onDestroy))
                .subscribe(() => (this._topOffset = null)),
              (0, i.R)(window, 'scroll')
                .pipe((0, a.b)(250), (0, o.R)(this.onDestroy))
                .subscribe(() => this.updateScrollPositionInHistory()),
              (0, i.R)(window, 'beforeunload')
                .pipe((0, o.R)(this.onDestroy))
                .subscribe(() => this.updateScrollLocationHref()),
              this.supportManualScrollRestoration)
            ) {
              history.scrollRestoration = 'manual';
              const t = this.location.subscribe((t) => {
                'hashchange' === t.type
                  ? this.scrollToPosition()
                  : (this.removeStoredScrollInfo(),
                    (this.poppedStateScrollPosition = t.state ? t.state.scrollPosition : null));
              });
              this.onDestroy.subscribe(() => t.unsubscribe());
            }
            window.location.href !== this.getStoredScrollLocationHref() &&
              this.removeStoredScrollInfo();
          }
          get topOffset() {
            if (!this._topOffset) {
              const t = this.document.querySelector('.app-toolbar');
              this._topOffset = ((t && t.clientHeight) || 0) + 16;
            }
            return this._topOffset;
          }
          get topOfPageElement() {
            return (
              this._topOfPageElement ||
                (this._topOfPageElement =
                  this.document.getElementById('top-of-page') || this.document.body),
              this._topOfPageElement
            );
          }
          ngOnDestroy() {
            this.onDestroy.next();
          }
          scroll() {
            const t = this.getCurrentHash(),
              e = t ? this.document.getElementById(t) : this.topOfPageElement;
            this.scrollToElement(e);
          }
          isLocationWithHash() {
            return !!this.getCurrentHash();
          }
          scrollAfterRender(t) {
            const e = this.getStoredScrollPosition();
            e
              ? this.viewportScroller.scrollToPosition(e)
              : this.needToFixScrollPosition()
              ? this.scrollToPosition()
              : this.isLocationWithHash()
              ? setTimeout(() => this.scroll(), t)
              : this.scrollToTop();
          }
          scrollToElement(t) {
            t &&
              (t.scrollIntoView(),
              window &&
                window.scrollBy &&
                (window.scrollBy(0, t.getBoundingClientRect().top - this.topOffset),
                window.pageYOffset < 20 && window.scrollBy(0, -window.pageYOffset)));
          }
          scrollToTop() {
            this.scrollToElement(this.topOfPageElement);
          }
          scrollToPosition() {
            this.poppedStateScrollPosition &&
              (this.viewportScroller.scrollToPosition(this.poppedStateScrollPosition),
              (this.poppedStateScrollPosition = null));
          }
          updateScrollLocationHref() {
            this.storage.setItem('scrollLocationHref', window.location.href);
          }
          updateScrollPositionInHistory() {
            if (this.supportManualScrollRestoration) {
              const t = this.viewportScroller.getScrollPosition();
              this.location.replaceState(this.location.path(!0), void 0, { scrollPosition: t }),
                this.storage.setItem('scrollPosition', t.join(','));
            }
          }
          getStoredScrollLocationHref() {
            return this.storage.getItem('scrollLocationHref') || null;
          }
          getStoredScrollPosition() {
            const t = this.storage.getItem('scrollPosition');
            if (!t) return null;
            const [e, n] = t.split(',');
            return [+e, +n];
          }
          removeStoredScrollInfo() {
            this.storage.removeItem('scrollLocationHref'),
              this.storage.removeItem('scrollPosition');
          }
          needToFixScrollPosition() {
            return this.supportManualScrollRestoration && !!this.poppedStateScrollPosition;
          }
          getCurrentHash() {
            return decodeURIComponent(this.platformLocation.hash.replace(/^#/, ''));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(c.LFG(s.K0), c.LFG(s.lw), c.LFG(s.EM), c.LFG(s.Ye));
          }),
          (t.ɵprov = c.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
    },
    9147: function (t, e, n) {
      'use strict';
      n.d(e, {
        G: function () {
          return p;
        },
      });
      var s = n(5366),
        r = n(1116);
      function i(t, e) {
        1 & t && (s.ynx(0), s.TgZ(1, 'p', 2), s._uU(2, 'Searching ...'), s.qZA(), s.BQk());
      }
      function o(t, e) {
        if ((1 & t && s._UZ(0, 'span'), 2 & t)) {
          const t = s.oxw().$implicit;
          s.Gre('symbol ', t.type, '');
        }
      }
      function a(t, e) {
        if (1 & t) {
          const t = s.EpF();
          s.TgZ(0, 'li', 9),
            s.TgZ(1, 'a', 10),
            s.NdJ('click', function (e) {
              const n = s.CHM(t).$implicit;
              return s.oxw(3).onResultSelected(n, e);
            }),
            s.YNc(2, o, 1, 3, 'span', 11),
            s.TgZ(3, 'span'),
            s._uU(4),
            s.qZA(),
            s.qZA(),
            s.qZA();
        }
        if (2 & t) {
          const t = e.$implicit,
            n = s.oxw().$implicit;
          s.xp6(1),
            s.s9C('href', t.path, s.LSH),
            s.xp6(1),
            s.Q6J('ngIf', 'api' === n.name),
            s.xp6(1),
            s.ekj('deprecated-api-item', t.deprecated),
            s.xp6(1),
            s.Oqu(t.title);
        }
      }
      function c(t, e) {
        if ((1 & t && s._UZ(0, 'span'), 2 & t)) {
          const t = s.oxw().$implicit;
          s.Gre('symbol ', t.type, '');
        }
      }
      function l(t, e) {
        if (1 & t) {
          const t = s.EpF();
          s.TgZ(0, 'li', 9),
            s.TgZ(1, 'a', 10),
            s.NdJ('click', function (e) {
              const n = s.CHM(t).$implicit;
              return s.oxw(3).onResultSelected(n, e);
            }),
            s.YNc(2, c, 1, 3, 'span', 11),
            s.TgZ(3, 'span'),
            s._uU(4),
            s.qZA(),
            s.qZA(),
            s.qZA();
        }
        if (2 & t) {
          const t = e.$implicit,
            n = s.oxw().$implicit;
          s.xp6(1),
            s.s9C('href', t.path, s.LSH),
            s.xp6(1),
            s.Q6J('ngIf', 'api' === n.name),
            s.xp6(1),
            s.ekj('deprecated-api-item', t.deprecated),
            s.xp6(1),
            s.Oqu(t.title);
        }
      }
      function u(t, e) {
        if (
          (1 & t &&
            (s.TgZ(0, 'div', 5),
            s.TgZ(1, 'h3', 6),
            s._uU(2),
            s.qZA(),
            s.TgZ(3, 'ul', 7),
            s.YNc(4, a, 5, 5, 'li', 8),
            s.qZA(),
            s.TgZ(5, 'ul'),
            s.YNc(6, l, 5, 5, 'li', 8),
            s.qZA(),
            s.qZA()),
          2 & t)
        ) {
          const t = e.$implicit;
          s.xp6(2),
            s.AsE('', t.name, ' (', t.pages.length + t.priorityPages.length, ')'),
            s.xp6(2),
            s.Q6J('ngForOf', t.priorityPages),
            s.xp6(2),
            s.Q6J('ngForOf', t.pages);
        }
      }
      function h(t, e) {
        if (
          (1 & t &&
            (s.ynx(0),
            s.TgZ(1, 'h2', 3),
            s._uU(2, 'Search Results'),
            s.qZA(),
            s.YNc(3, u, 7, 4, 'div', 4),
            s.BQk()),
          2 & t)
        ) {
          const t = s.oxw();
          s.xp6(3), s.Q6J('ngForOf', t.searchAreas);
        }
      }
      function d(t, e) {
        1 & t &&
          (s.ynx(0),
          s.TgZ(1, 'div', 5),
          s.TgZ(2, 'p', 2),
          s._uU(3, ' No results found.'),
          s._UZ(4, 'br'),
          s._uU(
            5,
            ' Here are a few links that might be helpful in finding what you are looking for: ',
          ),
          s.qZA(),
          s.TgZ(6, 'ul', 7),
          s.TgZ(7, 'li', 9),
          s.TgZ(8, 'a', 12),
          s._uU(9, 'API reference'),
          s.qZA(),
          s.qZA(),
          s.TgZ(10, 'li', 9),
          s.TgZ(11, 'a', 13),
          s._uU(12, 'Resources'),
          s.qZA(),
          s.qZA(),
          s.TgZ(13, 'li', 9),
          s.TgZ(14, 'a', 14),
          s._uU(15, 'Glossary'),
          s.qZA(),
          s.qZA(),
          s.TgZ(16, 'li', 9),
          s.TgZ(17, 'a', 15),
          s._uU(18, 'Cheat-sheet'),
          s.qZA(),
          s.qZA(),
          s.TgZ(19, 'li', 9),
          s.TgZ(20, 'a', 16),
          s._uU(21, 'Angular blog'),
          s.qZA(),
          s.qZA(),
          s.qZA(),
          s.qZA(),
          s.BQk());
      }
      var f = (function (t) {
        return (
          (t.InProgress = 'in-progress'),
          (t.ResultsFound = 'results-found'),
          (t.NoResultsFound = 'no-results-found'),
          t
        );
      })({});
      let p = (() => {
        class t {
          constructor() {
            (this.searchResults = null),
              (this.resultSelected = new s.vpe()),
              (this.searchState = f.InProgress),
              (this.defaultArea = 'other'),
              (this.folderToAreaMap = {
                api: 'api',
                cli: 'cli',
                docs: 'guides',
                errors: 'errors',
                guide: 'guides',
                start: 'tutorials',
                tutorial: 'tutorials',
              }),
              (this.searchAreas = []);
          }
          ngOnChanges() {
            (this.searchState =
              null === this.searchResults
                ? f.InProgress
                : this.searchResults.results.length
                ? f.ResultsFound
                : f.NoResultsFound),
              (this.searchAreas = this.processSearchResults(this.searchResults));
          }
          onResultSelected(t, e) {
            0 !== e.button || e.ctrlKey || e.metaKey || this.resultSelected.emit(t);
          }
          processSearchResults(t) {
            if (!t) return [];
            const e = {};
            return (
              t.results.forEach((t) => {
                if (!t.title) return;
                const n = this.computeAreaName(t);
                (e[n] = e[n] || []).push(t);
              }),
              Object.keys(e)
                .sort((t, e) => (t > e ? 1 : -1))
                .map((t) => {
                  const { priorityPages: n, pages: s, deprecated: r } = (function (t) {
                    const e = [],
                      n = [],
                      s = [];
                    for (
                      t.forEach((t) => {
                        t.deprecated ? s.push(t) : e.length < 5 ? e.push(t) : n.push(t);
                      });
                      e.length < 5 && n.length;

                    )
                      e.push(n.shift());
                    for (; e.length < 5 && s.length; ) e.push(s.shift());
                    return n.sort(m), { priorityPages: e, pages: n, deprecated: s };
                  })(e[t]);
                  return { name: t, priorityPages: n, pages: s.concat(r) };
                })
            );
          }
          computeAreaName(t) {
            var e;
            const [n] = t.path.split('/', 1);
            return null !== (e = this.folderToAreaMap[n]) && void 0 !== e ? e : this.defaultArea;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = s.Xpm({
            type: t,
            selectors: [['aio-search-results']],
            inputs: { searchResults: 'searchResults' },
            outputs: { resultSelected: 'resultSelected' },
            features: [s.TTD],
            decls: 4,
            vars: 4,
            consts: [
              [1, 'search-results', 3, 'ngSwitch'],
              [4, 'ngSwitchCase'],
              [1, 'no-results'],
              [1, 'visually-hidden'],
              ['class', 'search-area', 4, 'ngFor', 'ngForOf'],
              [1, 'search-area'],
              [1, 'search-section-header'],
              [1, 'priority-pages'],
              ['class', 'search-page', 4, 'ngFor', 'ngForOf'],
              [1, 'search-page'],
              [1, 'search-result-item', 3, 'href', 'click'],
              [3, 'class', 4, 'ngIf'],
              ['href', 'api', 1, 'search-result-item'],
              ['href', 'resources', 1, 'search-result-item'],
              ['href', 'guide/glossary', 1, 'search-result-item'],
              ['href', 'guide/cheatsheet', 1, 'search-result-item'],
              ['href', 'https://blog.angular.io/', 1, 'search-result-item'],
            ],
            template: function (t, e) {
              1 & t &&
                (s.TgZ(0, 'div', 0),
                s.YNc(1, i, 3, 0, 'ng-container', 1),
                s.YNc(2, h, 4, 1, 'ng-container', 1),
                s.YNc(3, d, 22, 0, 'ng-container', 1),
                s.qZA()),
                2 & t &&
                  (s.Q6J('ngSwitch', e.searchState),
                  s.xp6(1),
                  s.Q6J('ngSwitchCase', 'in-progress'),
                  s.xp6(1),
                  s.Q6J('ngSwitchCase', 'results-found'),
                  s.xp6(1),
                  s.Q6J('ngSwitchCase', 'no-results-found'));
            },
            directives: [r.RF, r.n9, r.sg, r.O5],
            encapsulation: 2,
          })),
          t
        );
      })();
      function m(t, e) {
        return t.title.toUpperCase() > e.title.toUpperCase() ? 1 : -1;
      }
    },
    3732: function (t, e, n) {
      'use strict';
      n.d(e, {
        H: function () {
          return l;
        },
      });
      var s = n(5366),
        r = n(1116);
      function i(t, e) {
        if ((1 & t && s._UZ(0, 'span'), 2 & t)) {
          const t = s.oxw();
          s.Gre('symbol ', null == t.selected ? null : t.selected.value, '');
        }
      }
      function o(t, e) {
        if ((1 & t && s._UZ(0, 'span'), 2 & t)) {
          const t = s.oxw().$implicit;
          s.Gre('symbol ', t.value, '');
        }
      }
      function a(t, e) {
        if (1 & t) {
          const t = s.EpF();
          s.TgZ(0, 'li', 6),
            s.NdJ('click', function () {
              const e = s.CHM(t),
                n = e.$implicit,
                r = e.index;
              return s.oxw(2).select(n, r);
            })('keydown.enter', function () {
              const e = s.CHM(t),
                n = e.$implicit,
                r = e.index;
              return s.oxw(2).select(n, r);
            })('keydown.space', function (e) {
              const n = s.CHM(t),
                r = n.$implicit,
                i = n.index;
              return s.oxw(2).select(r, i), e.preventDefault();
            }),
            s.YNc(1, o, 1, 3, 'span', 2),
            s.TgZ(2, 'span'),
            s._uU(3),
            s.qZA(),
            s.qZA();
        }
        if (2 & t) {
          const t = e.$implicit,
            n = s.oxw(2);
          s.ekj('selected', t === n.selected),
            s.xp6(1),
            s.Q6J('ngIf', n.showSymbol),
            s.xp6(2),
            s.Oqu(t.title);
        }
      }
      function c(t, e) {
        if ((1 & t && (s.TgZ(0, 'ul', 4), s.YNc(1, a, 4, 4, 'li', 5), s.qZA()), 2 & t)) {
          const t = s.oxw();
          s.xp6(1), s.Q6J('ngForOf', t.options);
        }
      }
      let l = (() => {
        class t {
          constructor(t) {
            (this.hostElement = t),
              (this.change = new s.vpe()),
              (this.showSymbol = !1),
              (this.showOptions = !1);
          }
          ngOnInit() {
            this.label = this.label || '';
          }
          toggleOptions() {
            this.showOptions = !this.showOptions;
          }
          hideOptions() {
            this.showOptions = !1;
          }
          select(t, e) {
            (this.selected = t), this.change.emit({ option: t, index: e }), this.hideOptions();
          }
          onClick(t) {
            this.hostElement.nativeElement.contains(t) || this.hideOptions();
          }
          onKeyDown() {
            this.hideOptions();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.Y36(s.SBq));
          }),
          (t.ɵcmp = s.Xpm({
            type: t,
            selectors: [['aio-select']],
            hostBindings: function (t, e) {
              1 & t &&
                s.NdJ(
                  'click',
                  function (t) {
                    return e.onClick(t.target);
                  },
                  !1,
                  s.evT,
                )(
                  'keydown.escape',
                  function () {
                    return e.onKeyDown();
                  },
                  !1,
                  s.evT,
                );
            },
            inputs: {
              selected: 'selected',
              options: 'options',
              showSymbol: 'showSymbol',
              label: 'label',
              disabled: 'disabled',
            },
            outputs: { change: 'change' },
            decls: 9,
            vars: 5,
            consts: [
              [1, 'form-select-menu'],
              [1, 'form-select-button', 3, 'disabled', 'click'],
              [3, 'class', 4, 'ngIf'],
              ['class', 'form-select-dropdown', 4, 'ngIf'],
              [1, 'form-select-dropdown'],
              [
                'role',
                'button',
                'tabindex',
                '0',
                3,
                'selected',
                'click',
                'keydown.enter',
                'keydown.space',
                4,
                'ngFor',
                'ngForOf',
              ],
              ['role', 'button', 'tabindex', '0', 3, 'click', 'keydown.enter', 'keydown.space'],
            ],
            template: function (t, e) {
              1 & t &&
                (s.TgZ(0, 'div', 0),
                s.TgZ(1, 'button', 1),
                s.NdJ('click', function () {
                  return e.toggleOptions();
                }),
                s.TgZ(2, 'span'),
                s.TgZ(3, 'strong'),
                s._uU(4),
                s.qZA(),
                s.qZA(),
                s.YNc(5, i, 1, 3, 'span', 2),
                s.TgZ(6, 'span'),
                s._uU(7),
                s.qZA(),
                s.qZA(),
                s.YNc(8, c, 2, 1, 'ul', 3),
                s.qZA()),
                2 & t &&
                  (s.xp6(1),
                  s.Q6J('disabled', e.disabled),
                  s.xp6(3),
                  s.Oqu(e.label),
                  s.xp6(1),
                  s.Q6J('ngIf', e.showSymbol),
                  s.xp6(2),
                  s.Oqu(null == e.selected ? null : e.selected.title),
                  s.xp6(1),
                  s.Q6J('ngIf', e.showOptions));
            },
            directives: [r.O5, r.sg],
            encapsulation: 2,
          })),
          t
        );
      })();
    },
    5425: function (t, e, n) {
      'use strict';
      n.d(e, {
        m: function () {
          return i;
        },
      });
      var s = n(1116),
        r = n(5366);
      let i = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵmod = r.oAB({ type: t })),
          (t.ɵinj = r.cJS({ imports: [[s.ez]] })),
          t
        );
      })();
    },
    3387: function (t, e, n) {
      'use strict';
      n.d(e, {
        I: function () {
          return c;
        },
      });
      var s = n(1116),
        r = n(6605),
        i = n(5366),
        o = n(9624),
        a = n(1262);
      let c = (() => {
        class t {
          constructor(t, e, n) {
            (this.document = t),
              (this.domSanitizer = e),
              (this.scrollSpyService = n),
              (this.tocList = new r.t(1)),
              (this.activeItemIndex = new r.t(1)),
              (this.scrollSpyInfo = null);
          }
          genToc(t, e = '') {
            if ((this.resetScrollSpyInfo(), !t)) return void this.tocList.next([]);
            const n = this.findTocHeadings(t),
              s = new Map(),
              r = n.map((t) => {
                const { title: n, content: r } = this.extractHeadingSafeHtml(t);
                return {
                  level: t.tagName.toLowerCase(),
                  href: `${e}#${this.getId(t, s)}`,
                  title: n,
                  content: r,
                };
              });
            this.tocList.next(r),
              (this.scrollSpyInfo = this.scrollSpyService.spyOn(n)),
              this.scrollSpyInfo.active.subscribe((t) => this.activeItemIndex.next(t && t.index));
          }
          reset() {
            this.resetScrollSpyInfo(), this.tocList.next([]);
          }
          extractHeadingSafeHtml(t) {
            const e = this.document.createElement('div');
            return (
              (e.innerHTML = t.innerHTML),
              l(e, '.github-links, .header-link').forEach(u),
              l(e, 'a').forEach((t) => {
                const e = t.parentNode;
                for (; t.childNodes.length; ) e.insertBefore(t.childNodes[0], t);
                u(t);
              }),
              {
                content: this.domSanitizer.bypassSecurityTrustHtml(e.innerHTML.trim()),
                title: (e.textContent || '').trim(),
              }
            );
          }
          findTocHeadings(t) {
            return l(t, 'h1,h2,h3').filter((t) => !/(?:no-toc|notoc)/i.test(t.className));
          }
          resetScrollSpyInfo() {
            this.scrollSpyInfo && (this.scrollSpyInfo.unspy(), (this.scrollSpyInfo = null)),
              this.activeItemIndex.next(null);
          }
          getId(t, e) {
            let n = t.id;
            return (
              n
                ? s(n)
                : ((n = (t.textContent || '').trim().toLowerCase().replace(/\W+/g, '-')),
                  (n = s(n)),
                  (t.id = n)),
              n
            );
            function s(t) {
              const n = (e.get(t) || 0) + 1;
              return e.set(t, n), 1 === n ? t : `${t}-${n}`;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(i.LFG(s.K0), i.LFG(o.H7), i.LFG(a.f_));
          }),
          (t.ɵprov = i.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function l(t, e) {
        return Array.from(t.querySelectorAll(e));
      }
      function u(t) {
        null !== t.parentNode && t.parentNode.removeChild(t);
      }
    },
    5285: function (t, e, n) {
      'use strict';
      n.d(e, {
        R: function () {
          return s;
        },
        s: function () {
          return r;
        },
      });
      const s = new (n(5366).OlP)('Window');
      function r() {
        return window;
      }
    },
    529: function (t, e, n) {
      'use strict';
      n.d(e, {
        N: function () {
          return s;
        },
      });
      const s = { gaId: 'UA-8594346-15', production: !0, mode: 'rc' };
    },
    7001: function (t, e, n) {
      'use strict';
      var s = n(9624),
        r = n(5366),
        i = n(2693),
        o = n(6136),
        a = n(1116),
        c = n(8318),
        l = n(9764),
        u = n(653);
      function h(t) {
        return new c.y((e) => {
          let n;
          try {
            n = t();
          } catch (s) {
            return void e.error(s);
          }
          return (n ? (0, l.D)(n) : (0, u.c)()).subscribe(e);
        });
      }
      var d = n(1225),
        f = n(7254),
        p = n(878),
        m = n(7930),
        g = n(5959),
        _ = n(6054);
      const y = new c.y(_.Z);
      var b = n(1906),
        v = n(9996),
        w = n(3835),
        S = n(4689),
        E = n(6598),
        x = n(611),
        C = n(4019),
        T = n(8569),
        k = n(6673),
        I = n(3103);
      class A {
        constructor(t, e) {
          (this.delay = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new F(t, this.delay, this.scheduler));
        }
      }
      class F extends k.L {
        constructor(t, e, n) {
          super(t),
            (this.delay = e),
            (this.scheduler = n),
            (this.queue = []),
            (this.active = !1),
            (this.errored = !1);
        }
        static dispatch(t) {
          const e = t.source,
            n = e.queue,
            s = t.scheduler,
            r = t.destination;
          for (; n.length > 0 && n[0].time - s.now() <= 0; ) n.shift().notification.observe(r);
          if (n.length > 0) {
            const e = Math.max(0, n[0].time - s.now());
            this.schedule(t, e);
          } else this.unsubscribe(), (e.active = !1);
        }
        _schedule(t) {
          (this.active = !0),
            this.destination.add(
              t.schedule(F.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: t,
              }),
            );
        }
        scheduleNotification(t) {
          if (!0 === this.errored) return;
          const e = this.scheduler,
            n = new N(e.now() + this.delay, t);
          this.queue.push(n), !1 === this.active && this._schedule(e);
        }
        _next(t) {
          this.scheduleNotification(I.P.createNext(t));
        }
        _error(t) {
          (this.errored = !0), (this.queue = []), this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.scheduleNotification(I.P.createComplete()), this.unsubscribe();
        }
      }
      class N {
        constructor(t, e) {
          (this.time = t), (this.notification = e);
        }
      }
      const O = 'Service workers are disabled or not supported by this browser';
      class R {
        constructor(t) {
          if (((this.serviceWorker = t), t)) {
            const e = (0, f.R)(t, 'controllerchange').pipe((0, v.U)(() => t.controller)),
              n = h(() => (0, p.of)(t.controller)),
              s = (0, m.z)(n, e);
            (this.worker = s.pipe((0, w.h)((t) => !!t))),
              (this.registration = this.worker.pipe((0, S.w)(() => t.getRegistration())));
            const r = (0, f.R)(t, 'message')
              .pipe((0, v.U)((t) => t.data))
              .pipe((0, w.h)((t) => t && t.type))
              .pipe((0, E.O)(new g.xQ()));
            r.connect(), (this.events = r);
          } else
            this.worker = this.events = this.registration = h(() =>
              (0, d._)(new Error('Service workers are disabled or not supported by this browser')),
            );
        }
        postMessage(t, e) {
          return this.worker
            .pipe(
              (0, x.q)(1),
              (0, C.b)((n) => {
                n.postMessage(Object.assign({ action: t }, e));
              }),
            )
            .toPromise()
            .then(() => {});
        }
        postMessageWithStatus(t, e, n) {
          const s = this.waitForStatus(n),
            r = this.postMessage(t, e);
          return Promise.all([s, r]).then(() => {});
        }
        generateNonce() {
          return Math.round(1e7 * Math.random());
        }
        eventsOfType(t) {
          return this.events.pipe((0, w.h)((e) => e.type === t));
        }
        nextEventOfType(t) {
          return this.eventsOfType(t).pipe((0, x.q)(1));
        }
        waitForStatus(t) {
          return this.eventsOfType('STATUS')
            .pipe(
              (0, w.h)((e) => e.nonce === t),
              (0, x.q)(1),
              (0, v.U)((t) => {
                if (!t.status) throw new Error(t.error);
              }),
            )
            .toPromise();
        }
        get isEnabled() {
          return !!this.serviceWorker;
        }
      }
      let L = (() => {
          class t {
            constructor(t) {
              if (((this.sw = t), (this.subscriptionChanges = new g.xQ()), !t.isEnabled))
                return (
                  (this.messages = y), (this.notificationClicks = y), void (this.subscription = y)
                );
              (this.messages = this.sw.eventsOfType('PUSH').pipe((0, v.U)((t) => t.data))),
                (this.notificationClicks = this.sw
                  .eventsOfType('NOTIFICATION_CLICK')
                  .pipe((0, v.U)((t) => t.data))),
                (this.pushManager = this.sw.registration.pipe((0, v.U)((t) => t.pushManager)));
              const e = this.pushManager.pipe((0, S.w)((t) => t.getSubscription()));
              this.subscription = (0, b.T)(e, this.subscriptionChanges);
            }
            get isEnabled() {
              return this.sw.isEnabled;
            }
            requestSubscription(t) {
              if (!this.sw.isEnabled) return Promise.reject(new Error(O));
              const e = { userVisibleOnly: !0 };
              let n = this.decodeBase64(t.serverPublicKey.replace(/_/g, '/').replace(/-/g, '+')),
                s = new Uint8Array(new ArrayBuffer(n.length));
              for (let r = 0; r < n.length; r++) s[r] = n.charCodeAt(r);
              return (
                (e.applicationServerKey = s),
                this.pushManager
                  .pipe(
                    (0, S.w)((t) => t.subscribe(e)),
                    (0, x.q)(1),
                  )
                  .toPromise()
                  .then((t) => (this.subscriptionChanges.next(t), t))
              );
            }
            unsubscribe() {
              return this.sw.isEnabled
                ? this.subscription
                    .pipe(
                      (0, x.q)(1),
                      (0, S.w)((t) => {
                        if (null === t) throw new Error('Not subscribed to push notifications.');
                        return t.unsubscribe().then((t) => {
                          if (!t) throw new Error('Unsubscribe failed!');
                          this.subscriptionChanges.next(null);
                        });
                      }),
                    )
                    .toPromise()
                : Promise.reject(new Error(O));
            }
            decodeBase64(t) {
              return atob(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(R));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        D = (() => {
          class t {
            constructor(t) {
              if (((this.sw = t), !t.isEnabled))
                return (this.available = y), (this.activated = y), void (this.unrecoverable = y);
              (this.available = this.sw.eventsOfType('UPDATE_AVAILABLE')),
                (this.activated = this.sw.eventsOfType('UPDATE_ACTIVATED')),
                (this.unrecoverable = this.sw.eventsOfType('UNRECOVERABLE_STATE'));
            }
            get isEnabled() {
              return this.sw.isEnabled;
            }
            checkForUpdate() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(O));
              const t = this.sw.generateNonce();
              return this.sw.postMessageWithStatus('CHECK_FOR_UPDATES', { statusNonce: t }, t);
            }
            activateUpdate() {
              if (!this.sw.isEnabled) return Promise.reject(new Error(O));
              const t = this.sw.generateNonce();
              return this.sw.postMessageWithStatus('ACTIVATE_UPDATE', { statusNonce: t }, t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(R));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class P {}
      const M = new r.OlP('NGSW_REGISTER_SCRIPT');
      function j(t, e, n, s) {
        return () => {
          if (!(0, a.NF)(s) || !('serviceWorker' in navigator) || !1 === n.enabled) return;
          let i;
          if (
            (navigator.serviceWorker.addEventListener('controllerchange', () => {
              null !== navigator.serviceWorker.controller &&
                navigator.serviceWorker.controller.postMessage({ action: 'INITIALIZE' });
            }),
            'function' == typeof n.registrationStrategy)
          )
            i = n.registrationStrategy();
          else {
            const [e, ...s] = (n.registrationStrategy || 'registerWhenStable:30000').split(':');
            switch (e) {
              case 'registerImmediately':
                i = (0, p.of)(null);
                break;
              case 'registerWithDelay':
                i = V(+s[0] || 0);
                break;
              case 'registerWhenStable':
                i = s[0] ? (0, b.T)(H(t), V(+s[0])) : H(t);
                break;
              default:
                throw new Error(
                  `Unknown ServiceWorker registration strategy: ${n.registrationStrategy}`,
                );
            }
          }
          t.get(r.R0b).runOutsideAngular(() =>
            i
              .pipe((0, x.q)(1))
              .subscribe(() =>
                navigator.serviceWorker
                  .register(e, { scope: n.scope })
                  .catch((t) => console.error('Service worker registration failed with:', t)),
              ),
          );
        };
      }
      function V(t) {
        return (0, p.of)(null).pipe(
          (function (t, e = T.P) {
            var n;
            const s = (n = t) instanceof Date && !isNaN(+n) ? +t - e.now() : Math.abs(t);
            return (t) => t.lift(new A(s, e));
          })(t),
        );
      }
      function H(t) {
        return t.get(r.z2F).isStable.pipe((0, w.h)((t) => t));
      }
      function B(t, e) {
        return new R((0, a.NF)(e) && !1 !== t.enabled ? navigator.serviceWorker : void 0);
      }
      let q = (() => {
        class t {
          static register(e, n = {}) {
            return {
              ngModule: t,
              providers: [
                { provide: M, useValue: e },
                { provide: P, useValue: n },
                { provide: R, useFactory: B, deps: [P, r.Lbi] },
                { provide: r.ip1, useFactory: j, deps: [r.zs3, M, P, r.Lbi], multi: !0 },
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵmod = r.oAB({ type: t })),
          (t.ɵinj = r.cJS({ providers: [L, D] })),
          t
        );
      })();
      var Z = n(4369),
        z = n(4431),
        G = n(7064),
        U = n(9861),
        $ = n(7570);
      const Y = ['primaryValueBar'];
      class Q {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const W = (0, G.pj)(Q, 'primary'),
        K = new r.OlP('mat-progress-bar-location', {
          providedIn: 'root',
          factory: function () {
            const t = (0, r.f3M)(a.K0),
              e = t ? t.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : '') };
          },
        });
      let J = 0,
        X = (() => {
          class t extends W {
            constructor(t, e, n, s) {
              super(t),
                (this._elementRef = t),
                (this._ngZone = e),
                (this._animationMode = n),
                (this._isNoopAnimation = !1),
                (this._value = 0),
                (this._bufferValue = 0),
                (this.animationEnd = new r.vpe()),
                (this._animationEndSubscription = $.w.EMPTY),
                (this.mode = 'determinate'),
                (this.progressbarId = 'mat-progress-bar-' + J++);
              const i = s ? s.getPathname().split('#')[0] : '';
              (this._rectangleFillValue = `url('${i}#${this.progressbarId}')`),
                (this._isNoopAnimation = 'NoopAnimations' === n);
            }
            get value() {
              return this._value;
            }
            set value(t) {
              this._value = tt((0, U.su)(t) || 0);
            }
            get bufferValue() {
              return this._bufferValue;
            }
            set bufferValue(t) {
              this._bufferValue = tt(t || 0);
            }
            _primaryTransform() {
              return { transform: `scale3d(${this.value / 100}, 1, 1)` };
            }
            _bufferTransform() {
              return 'buffer' === this.mode
                ? { transform: `scale3d(${this.bufferValue / 100}, 1, 1)` }
                : null;
            }
            ngAfterViewInit() {
              this._ngZone.runOutsideAngular(() => {
                const t = this._primaryValueBar.nativeElement;
                this._animationEndSubscription = (0, f.R)(t, 'transitionend')
                  .pipe((0, w.h)((e) => e.target === t))
                  .subscribe(() => {
                    ('determinate' !== this.mode && 'buffer' !== this.mode) ||
                      this._ngZone.run(() => this.animationEnd.next({ value: this.value }));
                  });
              });
            }
            ngOnDestroy() {
              this._animationEndSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Y36(r.SBq), r.Y36(r.R0b), r.Y36(o.Qb, 8), r.Y36(K, 8));
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-progress-bar']],
              viewQuery: function (t, e) {
                if ((1 & t && r.Gf(Y, 5), 2 & t)) {
                  let t;
                  r.iGM((t = r.CRH())) && (e._primaryValueBar = t.first);
                }
              },
              hostAttrs: [
                'role',
                'progressbar',
                'aria-valuemin',
                '0',
                'aria-valuemax',
                '100',
                'tabindex',
                '-1',
                1,
                'mat-progress-bar',
              ],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  (r.uIk(
                    'aria-valuenow',
                    'indeterminate' === e.mode || 'query' === e.mode ? null : e.value,
                  )('mode', e.mode),
                  r.ekj('_mat-animation-noopable', e._isNoopAnimation));
              },
              inputs: { color: 'color', mode: 'mode', value: 'value', bufferValue: 'bufferValue' },
              outputs: { animationEnd: 'animationEnd' },
              exportAs: ['matProgressBar'],
              features: [r.qOj],
              decls: 10,
              vars: 4,
              consts: [
                ['aria-hidden', 'true'],
                [
                  'width',
                  '100%',
                  'height',
                  '4',
                  'focusable',
                  'false',
                  1,
                  'mat-progress-bar-background',
                  'mat-progress-bar-element',
                ],
                [
                  'x',
                  '4',
                  'y',
                  '0',
                  'width',
                  '8',
                  'height',
                  '4',
                  'patternUnits',
                  'userSpaceOnUse',
                  3,
                  'id',
                ],
                ['cx', '2', 'cy', '2', 'r', '2'],
                ['width', '100%', 'height', '100%'],
                [1, 'mat-progress-bar-buffer', 'mat-progress-bar-element', 3, 'ngStyle'],
                [
                  1,
                  'mat-progress-bar-primary',
                  'mat-progress-bar-fill',
                  'mat-progress-bar-element',
                  3,
                  'ngStyle',
                ],
                ['primaryValueBar', ''],
                [
                  1,
                  'mat-progress-bar-secondary',
                  'mat-progress-bar-fill',
                  'mat-progress-bar-element',
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (r.TgZ(0, 'div', 0),
                  r.O4$(),
                  r.TgZ(1, 'svg', 1),
                  r.TgZ(2, 'defs'),
                  r.TgZ(3, 'pattern', 2),
                  r._UZ(4, 'circle', 3),
                  r.qZA(),
                  r.qZA(),
                  r._UZ(5, 'rect', 4),
                  r.qZA(),
                  r.kcU(),
                  r._UZ(6, 'div', 5),
                  r._UZ(7, 'div', 6, 7),
                  r._UZ(9, 'div', 8),
                  r.qZA()),
                  2 & t &&
                    (r.xp6(3),
                    r.Q6J('id', e.progressbarId),
                    r.xp6(2),
                    r.uIk('fill', e._rectangleFillValue),
                    r.xp6(1),
                    r.Q6J('ngStyle', e._bufferTransform()),
                    r.xp6(1),
                    r.Q6J('ngStyle', e._primaryTransform()));
              },
              directives: [a.PC],
              styles: [
                '.mat-progress-bar{display:block;height:4px;overflow:hidden;position:relative;transition:opacity 250ms linear;width:100%}._mat-animation-noopable.mat-progress-bar{transition:none;animation:none}.mat-progress-bar .mat-progress-bar-element,.mat-progress-bar .mat-progress-bar-fill::after{height:100%;position:absolute;width:100%}.mat-progress-bar .mat-progress-bar-background{width:calc(100% + 10px)}.cdk-high-contrast-active .mat-progress-bar .mat-progress-bar-background{display:none}.mat-progress-bar .mat-progress-bar-buffer{transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .mat-progress-bar .mat-progress-bar-buffer{border-top:solid 5px;opacity:.5}.mat-progress-bar .mat-progress-bar-secondary{display:none}.mat-progress-bar .mat-progress-bar-fill{animation:none;transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .mat-progress-bar .mat-progress-bar-fill{border-top:solid 4px}.mat-progress-bar .mat-progress-bar-fill::after{animation:none;content:"";display:inline-block;left:0}.mat-progress-bar[dir=rtl],[dir=rtl] .mat-progress-bar{transform:rotateY(180deg)}.mat-progress-bar[mode=query]{transform:rotateZ(180deg)}.mat-progress-bar[mode=query][dir=rtl],[dir=rtl] .mat-progress-bar[mode=query]{transform:rotateZ(180deg) rotateY(180deg)}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-fill,.mat-progress-bar[mode=query] .mat-progress-bar-fill{transition:none}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-primary,.mat-progress-bar[mode=query] .mat-progress-bar-primary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-primary-indeterminate-translate 2000ms infinite linear;left:-145.166611%}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-primary.mat-progress-bar-fill::after,.mat-progress-bar[mode=query] .mat-progress-bar-primary.mat-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-primary-indeterminate-scale 2000ms infinite linear}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-secondary,.mat-progress-bar[mode=query] .mat-progress-bar-secondary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-secondary-indeterminate-translate 2000ms infinite linear;left:-54.888891%;display:block}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-secondary.mat-progress-bar-fill::after,.mat-progress-bar[mode=query] .mat-progress-bar-secondary.mat-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-secondary-indeterminate-scale 2000ms infinite linear}.mat-progress-bar[mode=buffer] .mat-progress-bar-background{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-background-scroll 250ms infinite linear;display:block}.mat-progress-bar._mat-animation-noopable .mat-progress-bar-fill,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-buffer,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-primary,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-primary.mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-secondary,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-secondary.mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-background{animation:none;transition-duration:1ms}@keyframes mat-progress-bar-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mat-progress-bar-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mat-progress-bar-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mat-progress-bar-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mat-progress-bar-background-scroll{to{transform:translateX(-8px)}}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })();
      function tt(t, e = 0, n = 100) {
        return Math.max(e, Math.min(n, t));
      }
      let et = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵmod = r.oAB({ type: t })),
          (t.ɵinj = r.cJS({ imports: [[a.ez, G.BQ], G.BQ] })),
          t
        );
      })();
      var nt = n(3169),
        st = n(1448),
        rt = n(9235);
      function it(t) {
        return (e) => e.lift(new ot(t));
      }
      class ot {
        constructor(t) {
          this.value = t;
        }
        call(t, e) {
          return e.subscribe(new at(t, this.value));
        }
      }
      class at extends k.L {
        constructor(t, e) {
          super(t), (this.value = e);
        }
        _next(t) {
          this.destination.next(this.value);
        }
      }
      var ct = n(5416),
        lt = n(8720),
        ut = n(6238),
        ht = n(7701),
        dt = n(9713),
        ft = n(7388),
        pt = n(4720);
      const mt = ['*'];
      function gt(t, e) {
        if (1 & t) {
          const t = r.EpF();
          r.TgZ(0, 'div', 2),
            r.NdJ('click', function () {
              return r.CHM(t), r.oxw()._onBackdropClicked();
            }),
            r.qZA();
        }
        if (2 & t) {
          const t = r.oxw();
          r.ekj('mat-drawer-shown', t._isShowingBackdrop());
        }
      }
      function _t(t, e) {
        1 & t && (r.TgZ(0, 'mat-drawer-content'), r.Hsn(1, 2), r.qZA());
      }
      const yt = [[['mat-drawer']], [['mat-drawer-content']], '*'],
        bt = ['mat-drawer', 'mat-drawer-content', '*'];
      function vt(t, e) {
        if (1 & t) {
          const t = r.EpF();
          r.TgZ(0, 'div', 2),
            r.NdJ('click', function () {
              return r.CHM(t), r.oxw()._onBackdropClicked();
            }),
            r.qZA();
        }
        if (2 & t) {
          const t = r.oxw();
          r.ekj('mat-drawer-shown', t._isShowingBackdrop());
        }
      }
      function wt(t, e) {
        1 & t && (r.TgZ(0, 'mat-sidenav-content', 3), r.Hsn(1, 2), r.qZA());
      }
      const St = [[['mat-sidenav']], [['mat-sidenav-content']], '*'],
        Et = ['mat-sidenav', 'mat-sidenav-content', '*'],
        xt =
          '.mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}\n',
        Ct = {
          transformDrawer: (0, dt.X$)('transform', [
            (0, dt.SB)(
              'open, open-instant',
              (0, dt.oB)({ transform: 'none', visibility: 'visible' }),
            ),
            (0, dt.SB)('void', (0, dt.oB)({ 'box-shadow': 'none', visibility: 'hidden' })),
            (0, dt.eR)('void => open-instant', (0, dt.jt)('0ms')),
            (0, dt.eR)(
              'void <=> open, open-instant => void',
              (0, dt.jt)('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'),
            ),
          ]),
        },
        Tt = new r.OlP('MAT_DRAWER_DEFAULT_AUTOSIZE', {
          providedIn: 'root',
          factory: function () {
            return !1;
          },
        }),
        kt = new r.OlP('MAT_DRAWER_CONTAINER');
      let It = (() => {
          class t extends st.PQ {
            constructor(t, e, n, s, r) {
              super(n, s, r), (this._changeDetectorRef = t), (this._container = e);
            }
            ngAfterContentInit() {
              this._container._contentMarginChanges.subscribe(() => {
                this._changeDetectorRef.markForCheck();
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                r.Y36(r.sBO),
                r.Y36((0, r.Gpc)(() => Ft)),
                r.Y36(r.SBq),
                r.Y36(st.mF),
                r.Y36(r.R0b),
              );
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-drawer-content']],
              hostAttrs: [1, 'mat-drawer-content'],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  r.Udp('margin-left', e._container._contentMargins.left, 'px')(
                    'margin-right',
                    e._container._contentMargins.right,
                    'px',
                  );
              },
              features: [r.qOj],
              ngContentSelectors: mt,
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && (r.F$t(), r.Hsn(0));
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        At = (() => {
          class t {
            constructor(t, e, n, s, i, o, a) {
              (this._elementRef = t),
                (this._focusTrapFactory = e),
                (this._focusMonitor = n),
                (this._platform = s),
                (this._ngZone = i),
                (this._doc = o),
                (this._container = a),
                (this._elementFocusedBeforeDrawerWasOpened = null),
                (this._enableAnimations = !1),
                (this._position = 'start'),
                (this._mode = 'over'),
                (this._disableClose = !1),
                (this._opened = !1),
                (this._animationStarted = new g.xQ()),
                (this._animationEnd = new g.xQ()),
                (this._animationState = 'void'),
                (this.openedChange = new r.vpe(!0)),
                (this._openedStream = this.openedChange.pipe(
                  (0, w.h)((t) => t),
                  (0, v.U)(() => {}),
                )),
                (this.openedStart = this._animationStarted.pipe(
                  (0, w.h)((t) => t.fromState !== t.toState && 0 === t.toState.indexOf('open')),
                  it(void 0),
                )),
                (this._closedStream = this.openedChange.pipe(
                  (0, w.h)((t) => !t),
                  (0, v.U)(() => {}),
                )),
                (this.closedStart = this._animationStarted.pipe(
                  (0, w.h)((t) => t.fromState !== t.toState && 'void' === t.toState),
                  it(void 0),
                )),
                (this._destroyed = new g.xQ()),
                (this.onPositionChanged = new r.vpe()),
                (this._modeChanged = new g.xQ()),
                this.openedChange.subscribe((t) => {
                  t
                    ? (this._doc &&
                        (this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement),
                      this._takeFocus())
                    : this._isFocusWithinDrawer() && this._restoreFocus();
                }),
                this._ngZone.runOutsideAngular(() => {
                  (0, f.R)(this._elementRef.nativeElement, 'keydown')
                    .pipe(
                      (0, w.h)((t) => t.keyCode === rt.hY && !this.disableClose && !(0, rt.Vb)(t)),
                      (0, ct.R)(this._destroyed),
                    )
                    .subscribe((t) =>
                      this._ngZone.run(() => {
                        this.close(), t.stopPropagation(), t.preventDefault();
                      }),
                    );
                }),
                this._animationEnd
                  .pipe((0, lt.x)((t, e) => t.fromState === e.fromState && t.toState === e.toState))
                  .subscribe((t) => {
                    const { fromState: e, toState: n } = t;
                    ((0 === n.indexOf('open') && 'void' === e) ||
                      ('void' === n && 0 === e.indexOf('open'))) &&
                      this.openedChange.emit(this._opened);
                  });
            }
            get position() {
              return this._position;
            }
            set position(t) {
              (t = 'end' === t ? 'end' : 'start') != this._position &&
                ((this._position = t), this.onPositionChanged.emit());
            }
            get mode() {
              return this._mode;
            }
            set mode(t) {
              (this._mode = t), this._updateFocusTrapState(), this._modeChanged.next();
            }
            get disableClose() {
              return this._disableClose;
            }
            set disableClose(t) {
              this._disableClose = (0, U.Ig)(t);
            }
            get autoFocus() {
              const t = this._autoFocus;
              return null == t ? 'side' !== this.mode : t;
            }
            set autoFocus(t) {
              this._autoFocus = (0, U.Ig)(t);
            }
            get opened() {
              return this._opened;
            }
            set opened(t) {
              this.toggle((0, U.Ig)(t));
            }
            _takeFocus() {
              this.autoFocus &&
                this._focusTrap &&
                this._focusTrap.focusInitialElementWhenReady().then((t) => {
                  t ||
                    'function' != typeof this._elementRef.nativeElement.focus ||
                    this._elementRef.nativeElement.focus();
                });
            }
            _restoreFocus() {
              this.autoFocus &&
                (this._elementFocusedBeforeDrawerWasOpened
                  ? this._focusMonitor.focusVia(
                      this._elementFocusedBeforeDrawerWasOpened,
                      this._openedVia,
                    )
                  : this._elementRef.nativeElement.blur(),
                (this._elementFocusedBeforeDrawerWasOpened = null),
                (this._openedVia = null));
            }
            _isFocusWithinDrawer() {
              var t;
              const e = null === (t = this._doc) || void 0 === t ? void 0 : t.activeElement;
              return !!e && this._elementRef.nativeElement.contains(e);
            }
            ngAfterContentInit() {
              (this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement)),
                this._updateFocusTrapState();
            }
            ngAfterContentChecked() {
              this._platform.isBrowser && (this._enableAnimations = !0);
            }
            ngOnDestroy() {
              this._focusTrap && this._focusTrap.destroy(),
                this._animationStarted.complete(),
                this._animationEnd.complete(),
                this._modeChanged.complete(),
                this._destroyed.next(),
                this._destroyed.complete();
            }
            open(t) {
              return this.toggle(!0, t);
            }
            close() {
              return this.toggle(!1);
            }
            _closeViaBackdropClick() {
              return this._setOpen(!1, !0);
            }
            toggle(t = !this.opened, e) {
              return this._setOpen(t, !t && this._isFocusWithinDrawer(), e);
            }
            _setOpen(t, e, n = 'program') {
              return (
                (this._opened = t),
                t
                  ? ((this._animationState = this._enableAnimations ? 'open' : 'open-instant'),
                    (this._openedVia = n))
                  : ((this._animationState = 'void'), e && this._restoreFocus()),
                this._updateFocusTrapState(),
                new Promise((t) => {
                  this.openedChange.pipe((0, x.q)(1)).subscribe((e) => t(e ? 'open' : 'close'));
                })
              );
            }
            _getWidth() {
              return (
                (this._elementRef.nativeElement && this._elementRef.nativeElement.offsetWidth) || 0
              );
            }
            _updateFocusTrapState() {
              this._focusTrap && (this._focusTrap.enabled = this.opened && 'side' !== this.mode);
            }
            _animationStartListener(t) {
              this._animationStarted.next(t);
            }
            _animationDoneListener(t) {
              this._animationEnd.next(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                r.Y36(r.SBq),
                r.Y36(ft.qV),
                r.Y36(ft.tE),
                r.Y36(nt.t4),
                r.Y36(r.R0b),
                r.Y36(a.K0, 8),
                r.Y36(kt, 8),
              );
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-drawer']],
              hostAttrs: ['tabIndex', '-1', 1, 'mat-drawer'],
              hostVars: 12,
              hostBindings: function (t, e) {
                1 & t &&
                  r.WFA('@transform.start', function (t) {
                    return e._animationStartListener(t);
                  })('@transform.done', function (t) {
                    return e._animationDoneListener(t);
                  }),
                  2 & t &&
                    (r.uIk('align', null),
                    r.d8E('@transform', e._animationState),
                    r.ekj('mat-drawer-end', 'end' === e.position)(
                      'mat-drawer-over',
                      'over' === e.mode,
                    )('mat-drawer-push', 'push' === e.mode)('mat-drawer-side', 'side' === e.mode)(
                      'mat-drawer-opened',
                      e.opened,
                    ));
              },
              inputs: {
                position: 'position',
                mode: 'mode',
                disableClose: 'disableClose',
                autoFocus: 'autoFocus',
                opened: 'opened',
              },
              outputs: {
                openedChange: 'openedChange',
                _openedStream: 'opened',
                openedStart: 'openedStart',
                _closedStream: 'closed',
                closedStart: 'closedStart',
                onPositionChanged: 'positionChanged',
              },
              exportAs: ['matDrawer'],
              ngContentSelectors: mt,
              decls: 2,
              vars: 0,
              consts: [['cdkScrollable', '', 1, 'mat-drawer-inner-container']],
              template: function (t, e) {
                1 & t && (r.F$t(), r.TgZ(0, 'div', 0), r.Hsn(1), r.qZA());
              },
              directives: [st.PQ],
              encapsulation: 2,
              data: { animation: [Ct.transformDrawer] },
              changeDetection: 0,
            })),
            t
          );
        })(),
        Ft = (() => {
          class t {
            constructor(t, e, n, s, i, o = !1, a) {
              (this._dir = t),
                (this._element = e),
                (this._ngZone = n),
                (this._changeDetectorRef = s),
                (this._animationMode = a),
                (this._drawers = new r.n_E()),
                (this.backdropClick = new r.vpe()),
                (this._destroyed = new g.xQ()),
                (this._doCheckSubject = new g.xQ()),
                (this._contentMargins = { left: null, right: null }),
                (this._contentMarginChanges = new g.xQ()),
                t &&
                  t.change.pipe((0, ct.R)(this._destroyed)).subscribe(() => {
                    this._validateDrawers(), this.updateContentMargins();
                  }),
                i
                  .change()
                  .pipe((0, ct.R)(this._destroyed))
                  .subscribe(() => this.updateContentMargins()),
                (this._autosize = o);
            }
            get start() {
              return this._start;
            }
            get end() {
              return this._end;
            }
            get autosize() {
              return this._autosize;
            }
            set autosize(t) {
              this._autosize = (0, U.Ig)(t);
            }
            get hasBackdrop() {
              return null == this._backdropOverride
                ? !this._start ||
                    'side' !== this._start.mode ||
                    !this._end ||
                    'side' !== this._end.mode
                : this._backdropOverride;
            }
            set hasBackdrop(t) {
              this._backdropOverride = null == t ? null : (0, U.Ig)(t);
            }
            get scrollable() {
              return this._userContent || this._content;
            }
            ngAfterContentInit() {
              this._allDrawers.changes
                .pipe((0, ut.O)(this._allDrawers), (0, ct.R)(this._destroyed))
                .subscribe((t) => {
                  this._drawers.reset(t.filter((t) => !t._container || t._container === this)),
                    this._drawers.notifyOnChanges();
                }),
                this._drawers.changes.pipe((0, ut.O)(null)).subscribe(() => {
                  this._validateDrawers(),
                    this._drawers.forEach((t) => {
                      this._watchDrawerToggle(t),
                        this._watchDrawerPosition(t),
                        this._watchDrawerMode(t);
                    }),
                    (!this._drawers.length ||
                      this._isDrawerOpen(this._start) ||
                      this._isDrawerOpen(this._end)) &&
                      this.updateContentMargins(),
                    this._changeDetectorRef.markForCheck();
                }),
                this._ngZone.runOutsideAngular(() => {
                  this._doCheckSubject
                    .pipe((0, ht.b)(10), (0, ct.R)(this._destroyed))
                    .subscribe(() => this.updateContentMargins());
                });
            }
            ngOnDestroy() {
              this._contentMarginChanges.complete(),
                this._doCheckSubject.complete(),
                this._drawers.destroy(),
                this._destroyed.next(),
                this._destroyed.complete();
            }
            open() {
              this._drawers.forEach((t) => t.open());
            }
            close() {
              this._drawers.forEach((t) => t.close());
            }
            updateContentMargins() {
              let t = 0,
                e = 0;
              if (this._left && this._left.opened)
                if ('side' == this._left.mode) t += this._left._getWidth();
                else if ('push' == this._left.mode) {
                  const n = this._left._getWidth();
                  (t += n), (e -= n);
                }
              if (this._right && this._right.opened)
                if ('side' == this._right.mode) e += this._right._getWidth();
                else if ('push' == this._right.mode) {
                  const n = this._right._getWidth();
                  (e += n), (t -= n);
                }
              (t = t || null),
                (e = e || null),
                (t === this._contentMargins.left && e === this._contentMargins.right) ||
                  ((this._contentMargins = { left: t, right: e }),
                  this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins)));
            }
            ngDoCheck() {
              this._autosize &&
                this._isPushed() &&
                this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
            }
            _watchDrawerToggle(t) {
              t._animationStarted
                .pipe(
                  (0, w.h)((t) => t.fromState !== t.toState),
                  (0, ct.R)(this._drawers.changes),
                )
                .subscribe((t) => {
                  'open-instant' !== t.toState &&
                    'NoopAnimations' !== this._animationMode &&
                    this._element.nativeElement.classList.add('mat-drawer-transition'),
                    this.updateContentMargins(),
                    this._changeDetectorRef.markForCheck();
                }),
                'side' !== t.mode &&
                  t.openedChange
                    .pipe((0, ct.R)(this._drawers.changes))
                    .subscribe(() => this._setContainerClass(t.opened));
            }
            _watchDrawerPosition(t) {
              t &&
                t.onPositionChanged.pipe((0, ct.R)(this._drawers.changes)).subscribe(() => {
                  this._ngZone.onMicrotaskEmpty.pipe((0, x.q)(1)).subscribe(() => {
                    this._validateDrawers();
                  });
                });
            }
            _watchDrawerMode(t) {
              t &&
                t._modeChanged
                  .pipe((0, ct.R)((0, b.T)(this._drawers.changes, this._destroyed)))
                  .subscribe(() => {
                    this.updateContentMargins(), this._changeDetectorRef.markForCheck();
                  });
            }
            _setContainerClass(t) {
              const e = this._element.nativeElement.classList,
                n = 'mat-drawer-container-has-open';
              t ? e.add(n) : e.remove(n);
            }
            _validateDrawers() {
              (this._start = this._end = null),
                this._drawers.forEach((t) => {
                  'end' == t.position ? (this._end = t) : (this._start = t);
                }),
                (this._right = this._left = null),
                this._dir && 'rtl' === this._dir.value
                  ? ((this._left = this._end), (this._right = this._start))
                  : ((this._left = this._start), (this._right = this._end));
            }
            _isPushed() {
              return (
                (this._isDrawerOpen(this._start) && 'over' != this._start.mode) ||
                (this._isDrawerOpen(this._end) && 'over' != this._end.mode)
              );
            }
            _onBackdropClicked() {
              this.backdropClick.emit(), this._closeModalDrawersViaBackdrop();
            }
            _closeModalDrawersViaBackdrop() {
              [this._start, this._end]
                .filter((t) => t && !t.disableClose && this._canHaveBackdrop(t))
                .forEach((t) => t._closeViaBackdropClick());
            }
            _isShowingBackdrop() {
              return (
                (this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start)) ||
                (this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end))
              );
            }
            _canHaveBackdrop(t) {
              return 'side' !== t.mode || !!this._backdropOverride;
            }
            _isDrawerOpen(t) {
              return null != t && t.opened;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                r.Y36(pt.Is, 8),
                r.Y36(r.SBq),
                r.Y36(r.R0b),
                r.Y36(r.sBO),
                r.Y36(st.rL),
                r.Y36(Tt),
                r.Y36(o.Qb, 8),
              );
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-drawer-container']],
              contentQueries: function (t, e, n) {
                if ((1 & t && (r.Suo(n, It, 5), r.Suo(n, At, 5)), 2 & t)) {
                  let t;
                  r.iGM((t = r.CRH())) && (e._content = t.first),
                    r.iGM((t = r.CRH())) && (e._allDrawers = t);
                }
              },
              viewQuery: function (t, e) {
                if ((1 & t && r.Gf(It, 5), 2 & t)) {
                  let t;
                  r.iGM((t = r.CRH())) && (e._userContent = t.first);
                }
              },
              hostAttrs: [1, 'mat-drawer-container'],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && r.ekj('mat-drawer-container-explicit-backdrop', e._backdropOverride);
              },
              inputs: { autosize: 'autosize', hasBackdrop: 'hasBackdrop' },
              outputs: { backdropClick: 'backdropClick' },
              exportAs: ['matDrawerContainer'],
              features: [r._Bn([{ provide: kt, useExisting: t }])],
              ngContentSelectors: bt,
              decls: 4,
              vars: 2,
              consts: [
                ['class', 'mat-drawer-backdrop', 3, 'mat-drawer-shown', 'click', 4, 'ngIf'],
                [4, 'ngIf'],
                [1, 'mat-drawer-backdrop', 3, 'click'],
              ],
              template: function (t, e) {
                1 & t &&
                  (r.F$t(yt),
                  r.YNc(0, gt, 1, 2, 'div', 0),
                  r.Hsn(1),
                  r.Hsn(2, 1),
                  r.YNc(3, _t, 2, 0, 'mat-drawer-content', 1)),
                  2 & t && (r.Q6J('ngIf', e.hasBackdrop), r.xp6(3), r.Q6J('ngIf', !e._content));
              },
              directives: [a.O5, It],
              styles: [xt],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Nt = (() => {
          class t extends It {
            constructor(t, e, n, s, r) {
              super(t, e, n, s, r);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                r.Y36(r.sBO),
                r.Y36((0, r.Gpc)(() => Rt)),
                r.Y36(r.SBq),
                r.Y36(st.mF),
                r.Y36(r.R0b),
              );
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-sidenav-content']],
              hostAttrs: [1, 'mat-drawer-content', 'mat-sidenav-content'],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  r.Udp('margin-left', e._container._contentMargins.left, 'px')(
                    'margin-right',
                    e._container._contentMargins.right,
                    'px',
                  );
              },
              features: [r.qOj],
              ngContentSelectors: mt,
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && (r.F$t(), r.Hsn(0));
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Ot = (() => {
          class t extends At {
            constructor() {
              super(...arguments),
                (this._fixedInViewport = !1),
                (this._fixedTopGap = 0),
                (this._fixedBottomGap = 0);
            }
            get fixedInViewport() {
              return this._fixedInViewport;
            }
            set fixedInViewport(t) {
              this._fixedInViewport = (0, U.Ig)(t);
            }
            get fixedTopGap() {
              return this._fixedTopGap;
            }
            set fixedTopGap(t) {
              this._fixedTopGap = (0, U.su)(t);
            }
            get fixedBottomGap() {
              return this._fixedBottomGap;
            }
            set fixedBottomGap(t) {
              this._fixedBottomGap = (0, U.su)(t);
            }
          }
          return (
            (t.ɵfac = (function () {
              let e;
              return function (n) {
                return (e || (e = r.n5z(t)))(n || t);
              };
            })()),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-sidenav']],
              hostAttrs: ['tabIndex', '-1', 1, 'mat-drawer', 'mat-sidenav'],
              hostVars: 17,
              hostBindings: function (t, e) {
                2 & t &&
                  (r.uIk('align', null),
                  r.Udp('top', e.fixedInViewport ? e.fixedTopGap : null, 'px')(
                    'bottom',
                    e.fixedInViewport ? e.fixedBottomGap : null,
                    'px',
                  ),
                  r.ekj('mat-drawer-end', 'end' === e.position)(
                    'mat-drawer-over',
                    'over' === e.mode,
                  )('mat-drawer-push', 'push' === e.mode)('mat-drawer-side', 'side' === e.mode)(
                    'mat-drawer-opened',
                    e.opened,
                  )('mat-sidenav-fixed', e.fixedInViewport));
              },
              inputs: {
                fixedInViewport: 'fixedInViewport',
                fixedTopGap: 'fixedTopGap',
                fixedBottomGap: 'fixedBottomGap',
              },
              exportAs: ['matSidenav'],
              features: [r.qOj],
              ngContentSelectors: mt,
              decls: 2,
              vars: 0,
              consts: [['cdkScrollable', '', 1, 'mat-drawer-inner-container']],
              template: function (t, e) {
                1 & t && (r.F$t(), r.TgZ(0, 'div', 0), r.Hsn(1), r.qZA());
              },
              directives: [st.PQ],
              encapsulation: 2,
              data: { animation: [Ct.transformDrawer] },
              changeDetection: 0,
            })),
            t
          );
        })(),
        Rt = (() => {
          class t extends Ft {}
          return (
            (t.ɵfac = (function () {
              let e;
              return function (n) {
                return (e || (e = r.n5z(t)))(n || t);
              };
            })()),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-sidenav-container']],
              contentQueries: function (t, e, n) {
                if ((1 & t && (r.Suo(n, Nt, 5), r.Suo(n, Ot, 5)), 2 & t)) {
                  let t;
                  r.iGM((t = r.CRH())) && (e._content = t.first),
                    r.iGM((t = r.CRH())) && (e._allDrawers = t);
                }
              },
              hostAttrs: [1, 'mat-drawer-container', 'mat-sidenav-container'],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && r.ekj('mat-drawer-container-explicit-backdrop', e._backdropOverride);
              },
              exportAs: ['matSidenavContainer'],
              features: [r._Bn([{ provide: kt, useExisting: t }]), r.qOj],
              ngContentSelectors: Et,
              decls: 4,
              vars: 2,
              consts: [
                ['class', 'mat-drawer-backdrop', 3, 'mat-drawer-shown', 'click', 4, 'ngIf'],
                ['cdkScrollable', '', 4, 'ngIf'],
                [1, 'mat-drawer-backdrop', 3, 'click'],
                ['cdkScrollable', ''],
              ],
              template: function (t, e) {
                1 & t &&
                  (r.F$t(St),
                  r.YNc(0, vt, 1, 2, 'div', 0),
                  r.Hsn(1),
                  r.Hsn(2, 1),
                  r.YNc(3, wt, 2, 0, 'mat-sidenav-content', 1)),
                  2 & t && (r.Q6J('ngIf', e.hasBackdrop), r.xp6(3), r.Q6J('ngIf', !e._content));
              },
              directives: [a.O5, Nt, st.PQ],
              styles: [xt],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Lt = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({ imports: [[a.ez, G.BQ, nt.ud, st.ZD], st.ZD, G.BQ] })),
            t
          );
        })();
      const Dt = ['*', [['mat-toolbar-row']]],
        Pt = ['*', 'mat-toolbar-row'];
      class Mt {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const jt = (0, G.pj)(Mt);
      let Vt = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = r.lG2({
              type: t,
              selectors: [['mat-toolbar-row']],
              hostAttrs: [1, 'mat-toolbar-row'],
              exportAs: ['matToolbarRow'],
            })),
            t
          );
        })(),
        Ht = (() => {
          class t extends jt {
            constructor(t, e, n) {
              super(t), (this._platform = e), (this._document = n);
            }
            ngAfterViewInit() {
              this._platform.isBrowser &&
                (this._checkToolbarMixedModes(),
                this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes()));
            }
            _checkToolbarMixedModes() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Y36(r.SBq), r.Y36(nt.t4), r.Y36(a.K0));
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['mat-toolbar']],
              contentQueries: function (t, e, n) {
                if ((1 & t && r.Suo(n, Vt, 5), 2 & t)) {
                  let t;
                  r.iGM((t = r.CRH())) && (e._toolbarRows = t);
                }
              },
              hostAttrs: [1, 'mat-toolbar'],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  r.ekj('mat-toolbar-multiple-rows', e._toolbarRows.length > 0)(
                    'mat-toolbar-single-row',
                    0 === e._toolbarRows.length,
                  );
              },
              inputs: { color: 'color' },
              exportAs: ['matToolbar'],
              features: [r.qOj],
              ngContentSelectors: Pt,
              decls: 2,
              vars: 0,
              template: function (t, e) {
                1 & t && (r.F$t(Dt), r.Hsn(0), r.Hsn(1, 1));
              },
              styles: [
                '.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Bt = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({ imports: [[G.BQ], G.BQ] })),
            t
          );
        })();
      const qt = new r.OlP('CurrentDate');
      function Zt() {
        return new Date();
      }
      var zt = n(5285);
      const Gt = ['*'];
      let Ut = (() => {
        class t {
          constructor(t, e) {
            (this.currentDate = e), (this.dismissed = new r.vpe());
            try {
              this.storage = t.localStorage;
            } catch (n) {
              this.storage = {
                length: 0,
                clear: () => {},
                getItem: () => null,
                key: () => null,
                removeItem: () => {},
                setItem: () => {},
              };
            }
          }
          ngOnInit() {
            const t = 'hide' === this.storage.getItem('aio-notification/' + this.notificationId),
              e = this.currentDate > new Date(this.expirationDate);
            this.showNotification = t || e ? 'hide' : 'show';
          }
          contentClick() {
            this.dismissOnContentClick && this.dismiss();
          }
          dismiss() {
            this.storage.setItem('aio-notification/' + this.notificationId, 'hide'),
              (this.showNotification = 'hide'),
              this.dismissed.next();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Y36(zt.R), r.Y36(qt));
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-notification']],
            hostVars: 1,
            hostBindings: function (t, e) {
              2 & t && r.d8E('@hideAnimation', e.showNotification);
            },
            inputs: {
              dismissOnContentClick: 'dismissOnContentClick',
              notificationId: 'notificationId',
              expirationDate: 'expirationDate',
            },
            outputs: { dismissed: 'dismissed' },
            ngContentSelectors: Gt,
            decls: 4,
            vars: 0,
            consts: [
              [1, 'content', 3, 'click', 'keyup.enter'],
              ['mat-icon-button', '', 'aria-label', 'Close', 1, 'close-button', 3, 'click'],
              ['svgIcon', 'close', 'aria-label', 'Dismiss notification'],
            ],
            template: function (t, e) {
              1 & t &&
                (r.F$t(),
                r.TgZ(0, 'span', 0),
                r.NdJ('click', function () {
                  return e.contentClick();
                })('keyup.enter', function () {
                  return e.contentClick();
                }),
                r.Hsn(1),
                r.qZA(),
                r.TgZ(2, 'button', 1),
                r.NdJ('click', function () {
                  return e.dismiss();
                }),
                r._UZ(3, 'mat-icon', 2),
                r.qZA());
            },
            directives: [Z.lW, z.Hw],
            encapsulation: 2,
            data: {
              animation: [
                (0, dt.X$)('hideAnimation', [
                  (0, dt.SB)('show', (0, dt.oB)({ height: '*' })),
                  (0, dt.SB)('hide', (0, dt.oB)({ height: 0 })),
                  (0, dt.eR)('show => hide', (0, dt.jt)(250)),
                ]),
              ],
            },
          })),
          t
        );
      })();
      var $t = n(2981);
      const Yt = ['searchBox'];
      let Qt = (() => {
        class t {
          constructor(t) {
            (this.locationService = t),
              (this.searchDebounce = 300),
              (this.searchSubject = new g.xQ()),
              (this.onSearch = this.searchSubject.pipe(
                (0, lt.x)(),
                (0, ht.b)(this.searchDebounce),
              )),
              (this.onFocus = new r.vpe());
          }
          ngAfterViewInit() {
            const t = this.locationService.search().search;
            t && ((this.query = this.decodeQuery(t)), this.doSearch());
          }
          doSearch() {
            this.searchSubject.next(this.query);
          }
          doFocus() {
            this.onFocus.emit(this.query);
          }
          focus() {
            this.searchBox.nativeElement.focus();
          }
          decodeQuery(t) {
            return t.replace(/\+/g, ' ');
          }
          get query() {
            return this.searchBox.nativeElement.value;
          }
          set query(t) {
            this.searchBox.nativeElement.value = t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Y36($t.a));
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-search-box']],
            viewQuery: function (t, e) {
              if ((1 & t && r.Gf(Yt, 7), 2 & t)) {
                let t;
                r.iGM((t = r.CRH())) && (e.searchBox = t.first);
              }
            },
            outputs: { onSearch: 'onSearch', onFocus: 'onFocus' },
            decls: 2,
            vars: 0,
            consts: [
              [
                'type',
                'search',
                'aria-label',
                'search',
                'placeholder',
                'Search',
                3,
                'input',
                'keyup',
                'focus',
                'click',
              ],
              ['searchBox', ''],
            ],
            template: function (t, e) {
              1 & t &&
                (r.TgZ(0, 'input', 0, 1),
                r.NdJ('input', function () {
                  return e.doSearch();
                })('keyup', function () {
                  return e.doSearch();
                })('focus', function () {
                  return e.doFocus();
                })('click', function () {
                  return e.doSearch();
                }),
                r.qZA());
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      var Wt = n(3895);
      class Kt extends g.xQ {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new Wt.N();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      var Jt = n(1305),
        Xt = n(3530),
        te = n(529);
      let ee = (() => {
        class t {
          constructor(t) {
            (this.location = t), (this.mode = this.location.search().mode || te.N.mode);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG($t.a));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      var ne = n(1374),
        se = n(7296),
        re = n(9753);
      const ie = ne.bL + 'navigation.json';
      let oe = (() => {
        class t {
          constructor(t, e) {
            (this.http = t), (this.location = e);
            const n = this.fetchNavigationInfo();
            (this.navigationViews = this.getNavigationViews(n)),
              (this.currentNodes = this.getCurrentNodes(this.navigationViews)),
              (this.versionInfo = this.getVersionInfo(n));
          }
          fetchNavigationInfo() {
            const t = this.http.get(ie).pipe((0, se.C)());
            return t.connect(), t;
          }
          getVersionInfo(t) {
            const e = t.pipe(
              (0, v.U)((t) => t.__versionInfo),
              (0, se.C)(),
            );
            return e.connect(), e;
          }
          getNavigationViews(t) {
            const e = t.pipe(
              (0, v.U)((t) => {
                const e = Object.assign({}, t);
                return (
                  Object.keys(e).forEach((t) => {
                    '_' === t[0] && delete e[t];
                  }),
                  e
                );
              }),
              (0, se.C)(),
            );
            return e.connect(), e;
          }
          getCurrentNodes(t) {
            const e = (0, Jt.aj)([
              t.pipe((0, v.U)((t) => this.computeUrlToNavNodesMap(t))),
              this.location.currentPath,
            ]).pipe(
              (0, v.U)((t) => ({ navMap: t[0], url: t[1] })),
              (0, v.U)((t) => {
                const e = /^api/.exec(t.url);
                return (
                  e && (t.url = e[0]),
                  t.navMap.get(t.url) || { '': { view: '', url: t.url, nodes: [] } }
                );
              }),
              (0, re._)(1),
            );
            return e.connect(), e;
          }
          computeUrlToNavNodesMap(t) {
            const e = new Map();
            return Object.keys(t).forEach((n) => t[n].forEach((t) => this.walkNodes(n, e, t))), e;
          }
          ensureHasTooltip(t) {
            const e = t.title;
            null == t.tooltip && e && (t.tooltip = e + (/[a-zA-Z0-9]$/.test(e) ? '.' : ''));
          }
          walkNodes(t, e, n, s = []) {
            const r = [n, ...s],
              i = n.url;
            if ((this.ensureHasTooltip(n), i)) {
              const n = i.replace(/\/$/, '');
              e.has(n) || e.set(n, {}), (e.get(n)[t] = { url: i, view: t, nodes: r });
            }
            n.children && n.children.forEach((n) => this.walkNodes(t, e, n, r));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(i.eN), r.LFG($t.a));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      var ae = n(2250),
        ce = n(6396),
        le = n(3387);
      function ue(t, e) {
        if (
          (1 & t &&
            (r.TgZ(0, 'div'),
            r.TgZ(1, 'a', 1),
            r.TgZ(2, 'span'),
            r._uU(3),
            r.qZA(),
            r.qZA(),
            r.qZA()),
          2 & t)
        ) {
          const t = r.oxw();
          r.xp6(1),
            r.s9C('href', t.node.url, r.LSH),
            r.s9C('title', t.node.tooltip),
            r.Q6J('ngClass', t.classes),
            r.xp6(2),
            r.Oqu(t.node.title);
        }
      }
      function he(t, e) {
        if (1 & t) {
          const t = r.EpF();
          r.TgZ(0, 'a', 6),
            r.NdJ('click', function () {
              return r.CHM(t), r.oxw(2).headerClicked();
            }),
            r.TgZ(1, 'span'),
            r._uU(2),
            r.qZA(),
            r._UZ(3, 'mat-icon', 7),
            r.qZA();
        }
        if (2 & t) {
          const t = r.oxw(2);
          r.s9C('href', t.node.url, r.LSH),
            r.s9C('title', t.node.tooltip),
            r.Q6J('ngClass', t.classes),
            r.xp6(2),
            r.Oqu(t.node.title);
        }
      }
      function de(t, e) {
        if (1 & t) {
          const t = r.EpF();
          r.TgZ(0, 'button', 8),
            r.NdJ('click', function () {
              return r.CHM(t), r.oxw(2).headerClicked();
            }),
            r.TgZ(1, 'span'),
            r._uU(2),
            r.qZA(),
            r._UZ(3, 'mat-icon', 7),
            r.qZA();
        }
        if (2 & t) {
          const t = r.oxw(2);
          r.s9C('title', t.node.tooltip),
            r.Q6J('ngClass', t.classes),
            r.uIk('aria-pressed', t.isExpanded),
            r.xp6(2),
            r.Oqu(t.node.title);
        }
      }
      function fe(t, e) {
        if ((1 & t && r._UZ(0, 'aio-nav-item', 9), 2 & t)) {
          const t = e.$implicit,
            n = r.oxw(2);
          r.Q6J('level', n.level + 1)('isWide', n.isWide)('isParentExpanded', n.isExpanded)(
            'node',
            t,
          )('selectedNodes', n.selectedNodes);
        }
      }
      function pe(t, e) {
        if (
          (1 & t &&
            (r.TgZ(0, 'div'),
            r.YNc(1, he, 4, 4, 'a', 2),
            r.YNc(2, de, 4, 4, 'button', 3),
            r.TgZ(3, 'div', 4),
            r.YNc(4, fe, 1, 5, 'aio-nav-item', 5),
            r.qZA(),
            r.qZA()),
          2 & t)
        ) {
          const t = r.oxw();
          r.xp6(1),
            r.Q6J('ngIf', null != t.node.url),
            r.xp6(1),
            r.Q6J('ngIf', null == t.node.url),
            r.xp6(1),
            r.Q6J('ngClass', t.classes),
            r.xp6(1),
            r.Q6J('ngForOf', t.nodeChildren);
        }
      }
      let me = (() => {
        class t {
          constructor() {
            (this.isWide = !1),
              (this.level = 1),
              (this.isParentExpanded = !0),
              (this.isExpanded = !1),
              (this.isSelected = !1);
          }
          ngOnChanges() {
            if (
              ((this.nodeChildren =
                this.node && this.node.children ? this.node.children.filter((t) => !t.hidden) : []),
              this.selectedNodes)
            ) {
              const t = this.selectedNodes.indexOf(this.node);
              (this.isSelected = -1 !== t),
                (this.isExpanded =
                  this.isParentExpanded && (this.isSelected || (this.isWide && this.isExpanded)));
            } else this.isSelected = !1;
            this.setClasses();
          }
          setClasses() {
            this.classes = {
              ['level-' + this.level]: !0,
              collapsed: !this.isExpanded,
              expanded: this.isExpanded,
              selected: this.isSelected,
            };
          }
          headerClicked() {
            (this.isExpanded = !this.isExpanded), this.setClasses();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-nav-item']],
            inputs: {
              isWide: 'isWide',
              level: 'level',
              node: 'node',
              isParentExpanded: 'isParentExpanded',
              selectedNodes: 'selectedNodes',
            },
            features: [r.TTD],
            decls: 2,
            vars: 2,
            consts: [
              [4, 'ngIf'],
              [1, 'vertical-menu-item', 3, 'href', 'ngClass', 'title'],
              [
                'class',
                'vertical-menu-item heading',
                3,
                'href',
                'ngClass',
                'title',
                'click',
                4,
                'ngIf',
              ],
              [
                'type',
                'button',
                'class',
                'vertical-menu-item heading',
                3,
                'ngClass',
                'title',
                'click',
                4,
                'ngIf',
              ],
              [1, 'heading-children', 3, 'ngClass'],
              [
                3,
                'level',
                'isWide',
                'isParentExpanded',
                'node',
                'selectedNodes',
                4,
                'ngFor',
                'ngForOf',
              ],
              [1, 'vertical-menu-item', 'heading', 3, 'href', 'ngClass', 'title', 'click'],
              ['svgIcon', 'keyboard_arrow_right', 1, 'rotating-icon'],
              [
                'type',
                'button',
                1,
                'vertical-menu-item',
                'heading',
                3,
                'ngClass',
                'title',
                'click',
              ],
              [3, 'level', 'isWide', 'isParentExpanded', 'node', 'selectedNodes'],
            ],
            template: function (t, e) {
              1 & t && (r.YNc(0, ue, 4, 4, 'div', 0), r.YNc(1, pe, 5, 4, 'div', 0)),
                2 & t &&
                  (r.Q6J('ngIf', !e.node.children), r.xp6(1), r.Q6J('ngIf', e.node.children));
            },
            directives: [a.O5, a.mk, a.sg, z.Hw, t],
            encapsulation: 2,
          })),
          t
        );
      })();
      function ge(t, e) {
        if ((1 & t && r._UZ(0, 'aio-nav-item', 1), 2 & t)) {
          const t = e.$implicit,
            n = r.oxw();
          r.Q6J('node', t)('selectedNodes', null == n.currentNode ? null : n.currentNode.nodes)(
            'isWide',
            n.isWide,
          );
        }
      }
      let _e = (() => {
        class t {
          constructor() {
            this.isWide = !1;
          }
          get filteredNodes() {
            return this.nodes ? this.nodes.filter((t) => !t.hidden) : [];
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-nav-menu']],
            inputs: { currentNode: 'currentNode', isWide: 'isWide', nodes: 'nodes' },
            decls: 1,
            vars: 1,
            consts: [
              [3, 'node', 'selectedNodes', 'isWide', 4, 'ngFor', 'ngForOf'],
              [3, 'node', 'selectedNodes', 'isWide'],
            ],
            template: function (t, e) {
              1 & t && r.YNc(0, ge, 1, 3, 'aio-nav-item', 0),
                2 & t && r.Q6J('ngForOf', e.filteredNodes);
            },
            directives: [a.sg, me],
            encapsulation: 2,
          })),
          t
        );
      })();
      var ye = n(3732);
      function be(t, e) {
        if (
          (1 & t &&
            (r.TgZ(0, 'div', 1),
            r.TgZ(1, 'p'),
            r._uU(2, 'This is the '),
            r.TgZ(3, 'strong'),
            r._uU(4),
            r.qZA(),
            r._uU(5, ' Please visit '),
            r.TgZ(6, 'a', 2),
            r._uU(7, 'angular.io'),
            r.qZA(),
            r._uU(8, ' to see documentation for the current version of Angular.'),
            r.qZA(),
            r.qZA()),
          2 & t)
        ) {
          const t = r.oxw();
          r.xp6(4),
            r.hij(
              'archived documentation for Angular v',
              null == t.version ? null : t.version.major,
              '.',
            );
        }
      }
      let ve = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-mode-banner']],
            inputs: { mode: 'mode', version: 'version' },
            decls: 1,
            vars: 1,
            consts: [
              ['class', 'mode-banner alert archive-warning', 4, 'ngIf'],
              [1, 'mode-banner', 'alert', 'archive-warning'],
              ['href', 'https://angular.io/'],
            ],
            template: function (t, e) {
              1 & t && r.YNc(0, be, 9, 1, 'div', 0), 2 & t && r.Q6J('ngIf', 'archive' == e.mode);
            },
            directives: [a.O5],
            encapsulation: 2,
          })),
          t
        );
      })();
      function we(t, e, n, s) {
        return new (n || (n = Promise))(function (r, i) {
          function o(t) {
            try {
              c(s.next(t));
            } catch (e) {
              i(e);
            }
          }
          function a(t) {
            try {
              c(s.throw(t));
            } catch (e) {
              i(e);
            }
          }
          function c(t) {
            var e;
            t.done
              ? r(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(o, a);
          }
          c((s = s.apply(t, e || [])).next());
        });
      }
      var Se = n(2709),
        Ee = n(1110),
        xe = n(45),
        Ce = n(7727),
        Te = n(9474);
      const ke = [
          {
            selector: 'aio-announcement-bar',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_announcement-bar_announcement-bar_module_ts')
                .then(n.bind(n, 126))
                .then((t) => t.AnnouncementBarModule),
          },
          {
            selector: 'aio-api-list',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_api_api-list_module_ts')
                .then(n.bind(n, 4705))
                .then((t) => t.ApiListModule),
          },
          {
            selector: 'aio-contributor-list',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_contributor_contributor-list_module_ts')
                .then(n.bind(n, 9211))
                .then((t) => t.ContributorListModule),
          },
          {
            selector: 'aio-file-not-found-search',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_search_file-not-found-search_module_ts')
                .then(n.bind(n, 7656))
                .then((t) => t.FileNotFoundSearchModule),
          },
          {
            selector: 'aio-resource-list',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_resource_resource-list_module_ts')
                .then(n.bind(n, 7769))
                .then((t) => t.ResourceListModule),
          },
          {
            selector: 'aio-toc',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_toc_toc_module_ts')
                .then(n.bind(n, 7707))
                .then((t) => t.TocModule),
          },
          {
            selector: 'code-example',
            loadChildren: () =>
              Promise.all([
                n.e(
                  'default-src_app_custom-elements_code_code_component_ts-src_app_custom-elements_code_code_module_ts',
                ),
                n.e('src_app_custom-elements_code_code-example_module_ts'),
              ])
                .then(n.bind(n, 7341))
                .then((t) => t.CodeExampleModule),
          },
          {
            selector: 'code-tabs',
            loadChildren: () =>
              Promise.all([
                n.e(
                  'default-src_app_custom-elements_code_code_component_ts-src_app_custom-elements_code_code_module_ts',
                ),
                n.e('src_app_custom-elements_code_code-tabs_module_ts'),
              ])
                .then(n.bind(n, 9517))
                .then((t) => t.CodeTabsModule),
          },
          {
            selector: 'live-example',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_live-example_live-example_module_ts')
                .then(n.bind(n, 8948))
                .then((t) => t.LiveExampleModule),
          },
          {
            selector: 'aio-events',
            loadChildren: () =>
              n
                .e('src_app_custom-elements_events_events_module_ts')
                .then(n.bind(n, 597))
                .then((t) => t.EventsModule),
          },
        ],
        Ie = new r.OlP('aio/elements-map'),
        Ae = new Map();
      ke.forEach((t) => {
        Ae.set(t.selector, t.loadChildren);
      });
      var Fe = n(6605);
      const Ne = {
        schedule(t, e) {
          const n = setTimeout(t, e);
          return () => clearTimeout(n);
        },
        scheduleBeforeRender(t) {
          if ('undefined' == typeof window) return Ne.schedule(t, 0);
          if (void 0 === window.requestAnimationFrame) return Ne.schedule(t, 16);
          const e = window.requestAnimationFrame(t);
          return () => window.cancelAnimationFrame(e);
        },
      };
      let Oe;
      function Re(t, e, n) {
        let s = n;
        return (
          (function (t) {
            return !!t && t.nodeType === Node.ELEMENT_NODE;
          })(t) &&
            e.some(
              (e, n) =>
                !(
                  '*' === e ||
                  !(function (t, e) {
                    if (!Oe) {
                      const t = Element.prototype;
                      Oe =
                        t.matches ||
                        t.matchesSelector ||
                        t.mozMatchesSelector ||
                        t.msMatchesSelector ||
                        t.oMatchesSelector ||
                        t.webkitMatchesSelector;
                    }
                    return t.nodeType === Node.ELEMENT_NODE && Oe.call(t, e);
                  })(t, e) ||
                  ((s = n), 0)
                ),
            ),
          s
        );
      }
      class Le {
        constructor(t, e) {
          this.componentFactory = e.get(r._Vd).resolveComponentFactory(t);
        }
        create(t) {
          return new De(this.componentFactory, t);
        }
      }
      class De {
        constructor(t, e) {
          (this.componentFactory = t),
            (this.injector = e),
            (this.eventEmitters = new Fe.t(1)),
            (this.events = this.eventEmitters.pipe((0, S.w)((t) => (0, b.T)(...t)))),
            (this.componentRef = null),
            (this.viewChangeDetectorRef = null),
            (this.inputChanges = null),
            (this.hasInputChanges = !1),
            (this.implementsOnChanges = !1),
            (this.scheduledChangeDetectionFn = null),
            (this.scheduledDestroyFn = null),
            (this.initialInputValues = new Map()),
            (this.unchangedInputs = new Set(
              this.componentFactory.inputs.map(({ propName: t }) => t),
            )),
            (this.ngZone = this.injector.get(r.R0b)),
            (this.elementZone =
              'undefined' == typeof Zone ? null : this.ngZone.run(() => Zone.current));
        }
        connect(t) {
          this.runInZone(() => {
            if (null !== this.scheduledDestroyFn)
              return this.scheduledDestroyFn(), void (this.scheduledDestroyFn = null);
            null === this.componentRef && this.initializeComponent(t);
          });
        }
        disconnect() {
          this.runInZone(() => {
            null !== this.componentRef &&
              null === this.scheduledDestroyFn &&
              (this.scheduledDestroyFn = Ne.schedule(() => {
                null !== this.componentRef &&
                  (this.componentRef.destroy(),
                  (this.componentRef = null),
                  (this.viewChangeDetectorRef = null));
              }, 10));
          });
        }
        getInputValue(t) {
          return this.runInZone(() =>
            null === this.componentRef
              ? this.initialInputValues.get(t)
              : this.componentRef.instance[t],
          );
        }
        setInputValue(t, e) {
          this.runInZone(() => {
            var n, s;
            null !== this.componentRef
              ? (((n = e) !== (s = this.getInputValue(t)) && (n == n || s == s)) ||
                  (void 0 === e && this.unchangedInputs.has(t))) &&
                (this.recordInputChange(t, e),
                this.unchangedInputs.delete(t),
                (this.hasInputChanges = !0),
                (this.componentRef.instance[t] = e),
                this.scheduleDetectChanges())
              : this.initialInputValues.set(t, e);
          });
        }
        initializeComponent(t) {
          const e = r.zs3.create({ providers: [], parent: this.injector }),
            n = (function (t, e) {
              const n = t.childNodes,
                s = e.map(() => []);
              let r = -1;
              e.some((t, e) => '*' === t && ((r = e), !0));
              for (let i = 0, o = n.length; i < o; ++i) {
                const t = n[i],
                  o = Re(t, e, r);
                -1 !== o && s[o].push(t);
              }
              return s;
            })(t, this.componentFactory.ngContentSelectors);
          (this.componentRef = this.componentFactory.create(e, n, t)),
            (this.viewChangeDetectorRef = this.componentRef.injector.get(r.sBO)),
            (this.implementsOnChanges =
              'function' == typeof this.componentRef.instance.ngOnChanges),
            this.initializeInputs(),
            this.initializeOutputs(this.componentRef),
            this.detectChanges(),
            this.injector.get(r.z2F).attachView(this.componentRef.hostView);
        }
        initializeInputs() {
          this.componentFactory.inputs.forEach(({ propName: t }) => {
            this.initialInputValues.has(t) && this.setInputValue(t, this.initialInputValues.get(t));
          }),
            this.initialInputValues.clear();
        }
        initializeOutputs(t) {
          const e = this.componentFactory.outputs.map(({ propName: e, templateName: n }) =>
            t.instance[e].pipe((0, v.U)((t) => ({ name: n, value: t }))),
          );
          this.eventEmitters.next(e);
        }
        callNgOnChanges(t) {
          if (!this.implementsOnChanges || null === this.inputChanges) return;
          const e = this.inputChanges;
          (this.inputChanges = null), t.instance.ngOnChanges(e);
        }
        markViewForCheck(t) {
          this.hasInputChanges && ((this.hasInputChanges = !1), t.markForCheck());
        }
        scheduleDetectChanges() {
          this.scheduledChangeDetectionFn ||
            (this.scheduledChangeDetectionFn = Ne.scheduleBeforeRender(() => {
              (this.scheduledChangeDetectionFn = null), this.detectChanges();
            }));
        }
        recordInputChange(t, e) {
          if (!this.implementsOnChanges) return;
          null === this.inputChanges && (this.inputChanges = {});
          const n = this.inputChanges[t];
          if (n) return void (n.currentValue = e);
          const s = this.unchangedInputs.has(t),
            i = s ? void 0 : this.getInputValue(t);
          this.inputChanges[t] = new r.WD2(i, e, s);
        }
        detectChanges() {
          null !== this.componentRef &&
            (this.callNgOnChanges(this.componentRef),
            this.markViewForCheck(this.viewChangeDetectorRef),
            this.componentRef.changeDetectorRef.detectChanges());
        }
        runInZone(t) {
          return this.elementZone && Zone.current !== this.elementZone ? this.ngZone.run(t) : t();
        }
      }
      class Pe extends HTMLElement {
        constructor() {
          super(...arguments), (this.ngElementEventsSubscription = null);
        }
      }
      new r.GfV('12.0.0-rc.0');
      let Me = (() => {
        class t {
          constructor(t, e, n) {
            (this.moduleRef = t),
              (this.compiler = n),
              (this.elementsLoading = new Map()),
              (this.elementsToLoad = new Map(e));
          }
          loadContainedCustomElements(t) {
            const e = Array.from(this.elementsToLoad.keys()).filter((e) => t.querySelector(e));
            if (!e.length) return (0, p.of)(void 0);
            const n = Promise.all(e.map((t) => this.loadCustomElement(t)));
            return (0, l.D)(n.then(() => {}));
          }
          loadCustomElement(t) {
            if (this.elementsLoading.has(t)) return this.elementsLoading.get(t);
            if (this.elementsToLoad.has(t)) {
              const e = this.elementsToLoad
                .get(t)()
                .then((t) => (t instanceof r.YKP ? t : this.compiler.compileModuleAsync(t)))
                .then((e) => {
                  const n = e.create(this.moduleRef.injector),
                    s = (function (t, e) {
                      const n = (function (t, e) {
                          return e.get(r._Vd).resolveComponentFactory(t).inputs;
                        })(t, e.injector),
                        s = e.strategyFactory || new Le(t, e.injector),
                        i = (function (t) {
                          const e = {};
                          return (
                            t.forEach(({ propName: t, templateName: n }) => {
                              var s;
                              e[((s = n), s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`))] = t;
                            }),
                            e
                          );
                        })(n);
                      class o extends Pe {
                        constructor(t) {
                          super(), (this.injector = t);
                        }
                        get ngElementStrategy() {
                          if (!this._ngElementStrategy) {
                            const t = (this._ngElementStrategy = s.create(
                              this.injector || e.injector,
                            ));
                            n.forEach(({ propName: e }) => {
                              if (!this.hasOwnProperty(e)) return;
                              const n = this[e];
                              delete this[e], t.setInputValue(e, n);
                            });
                          }
                          return this._ngElementStrategy;
                        }
                        attributeChangedCallback(t, e, n, s) {
                          this.ngElementStrategy.setInputValue(i[t], n);
                        }
                        connectedCallback() {
                          let t = !1;
                          this.ngElementStrategy.events && (this.subscribeToEvents(), (t = !0)),
                            this.ngElementStrategy.connect(this),
                            t || this.subscribeToEvents();
                        }
                        disconnectedCallback() {
                          this._ngElementStrategy && this._ngElementStrategy.disconnect(),
                            this.ngElementEventsSubscription &&
                              (this.ngElementEventsSubscription.unsubscribe(),
                              (this.ngElementEventsSubscription = null));
                        }
                        subscribeToEvents() {
                          this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(
                            (t) => {
                              const e = (function (t, e, n) {
                                if ('function' != typeof CustomEvent) {
                                  const s = t.createEvent('CustomEvent');
                                  return s.initCustomEvent(e, !1, !1, n), s;
                                }
                                return new CustomEvent(e, {
                                  bubbles: !1,
                                  cancelable: !1,
                                  detail: n,
                                });
                              })(this.ownerDocument, t.name, t.value);
                              this.dispatchEvent(e);
                            },
                          );
                        }
                      }
                      return (
                        (o.observedAttributes = Object.keys(i)),
                        n.forEach(({ propName: t }) => {
                          Object.defineProperty(o.prototype, t, {
                            get() {
                              return this.ngElementStrategy.getInputValue(t);
                            },
                            set(e) {
                              this.ngElementStrategy.setInputValue(t, e);
                            },
                            configurable: !0,
                            enumerable: !0,
                          });
                        }),
                        o
                      );
                    })(n.instance.customElementComponent, { injector: n.injector });
                  return customElements.define(t, s), customElements.whenDefined(t);
                })
                .then(() => {
                  this.elementsLoading.delete(t), this.elementsToLoad.delete(t);
                })
                .catch((e) => (this.elementsLoading.delete(t), Promise.reject(e)));
              return this.elementsLoading.set(t, e), e;
            }
            return Promise.resolve();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(r.h0i), r.LFG(Ie), r.LFG(r.Sil));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const je = document.querySelector('aio-doc-viewer'),
        Ve = je ? je.innerHTML : '';
      let He = (() => {
        class t {
          constructor(t, e, n, s, i, o) {
            (this.logger = e),
              (this.titleService = n),
              (this.metaService = s),
              (this.tocService = i),
              (this.elementsLoader = o),
              (this.void$ = (0, p.of)(void 0)),
              (this.onDestroy$ = new r.vpe()),
              (this.docContents$ = new r.vpe()),
              (this.currViewContainer = document.createElement('div')),
              (this.nextViewContainer = document.createElement('div')),
              (this.docReady = new r.vpe()),
              (this.docRemoved = new r.vpe()),
              (this.docInserted = new r.vpe()),
              (this.docRendered = new r.vpe()),
              (this.hostElement = t.nativeElement),
              (this.hostElement.innerHTML = Ve),
              this.hostElement.firstElementChild &&
                (this.currViewContainer = this.hostElement.firstElementChild),
              this.docContents$
                .pipe(
                  (0, xe.QV)(Se.E),
                  (0, S.w)((t) => this.render(t)),
                  (0, ct.R)(this.onDestroy$),
                )
                .subscribe();
          }
          set doc(t) {
            t && this.docContents$.emit(t);
          }
          ngOnDestroy() {
            this.onDestroy$.emit();
          }
          prepareTitleAndToc(t, e) {
            const n = t.querySelector('h1'),
              s = !!n && !/no-?toc/i.test(n.className),
              r = t.querySelector('aio-toc.embedded');
            return (
              n && s && !r
                ? n.insertAdjacentHTML('afterend', '<aio-toc class="embedded"></aio-toc>')
                : !s && r && null !== r.parentNode && r.parentNode.removeChild(r),
              () => {
                this.tocService.reset();
                let r = '';
                n &&
                  ((r = 'string' == typeof n.innerText ? n.innerText : n.textContent),
                  s && this.tocService.genToc(t, e)),
                  this.titleService.setTitle(r ? `Angular - ${r}` : 'Angular');
              }
            );
          }
          render(t) {
            let e;
            return (
              this.setNoIndex(t.id === ne.xx || t.id === ne.cH),
              this.void$.pipe(
                (0, C.b)(() => (this.nextViewContainer.innerHTML = t.contents || '')),
                (0, C.b)(() => (e = this.prepareTitleAndToc(this.nextViewContainer, t.id))),
                (0, S.w)(() =>
                  this.elementsLoader.loadContainedCustomElements(this.nextViewContainer),
                ),
                (0, C.b)(() => this.docReady.emit()),
                (0, S.w)(() => this.swapViews(e)),
                (0, C.b)(() => this.docRendered.emit()),
                (0, Ce.K)((e) => {
                  const n = `${e instanceof Error ? e.stack : e}`;
                  return (
                    this.logger.error(
                      new Error(`[DocViewer] Error preparing document '${t.id}': ${n}`),
                    ),
                    (this.nextViewContainer.innerHTML = ''),
                    this.setNoIndex(!0),
                    /loading chunk \d+ failed/i.test(n) &&
                      (function () {
                        var t, e, n;
                        we(this, void 0, void 0, function* () {
                          if (
                            (console.log(
                              `\nServiceWorker: ${
                                null !==
                                  (n =
                                    null ===
                                      (e =
                                        null === (t = navigator.serviceWorker) || void 0 === t
                                          ? void 0
                                          : t.controller) || void 0 === e
                                      ? void 0
                                      : e.state) && void 0 !== n
                                  ? n
                                  : 'N/A'
                              }`,
                            ),
                            'undefined' == typeof caches)
                          )
                            console.log('\nCaches: N/A');
                          else {
                            const t = (yield caches.keys()).filter((t) => t.startsWith('ngsw:/:'));
                            yield s(t, 'db:control', !0, ['manifests']),
                              yield s(t, 'assets:app-shell:cache', !1),
                              yield s(t, 'assets:app-shell:meta', !0);
                          }
                          function s(t, e, n, s = []) {
                            return we(this, void 0, void 0, function* () {
                              const o = t.filter((t) => t.endsWith(e));
                              for (const t of o) {
                                const e = yield r(t, n, s);
                                yield i(t, e);
                              }
                            });
                          }
                          function r(t, e, n = []) {
                            return we(this, void 0, void 0, function* () {
                              const s = new Set(n.map((t) => new Request(t).url)),
                                r = yield caches.open(t),
                                i = (yield r.keys()).map((t) => t.url).filter((t) => !s.has(t));
                              return yield Promise.all(
                                i.map((t) =>
                                  we(this, void 0, void 0, function* () {
                                    var n;
                                    return {
                                      key: t,
                                      value: e
                                        ? yield null === (n = yield r.match(t)) || void 0 === n
                                            ? void 0
                                            : n.json()
                                        : void 0,
                                    };
                                  }),
                                ),
                              );
                            });
                          }
                          function i(t, e) {
                            const n = e
                              .map(
                                ({ key: t, value: e }) =>
                                  `  - ${t}${e ? `: ${JSON.stringify(e)}` : ''}`,
                              )
                              .join('\n');
                            console.log(`\nCache: ${t} (${e.length} entries)\n${n}`);
                          }
                          console.warn(
                            '\nIf you see this error, please report an issue at https://github.com/angular/angular/issues/new?template=3-docs-bug.md including the above logs.',
                          );
                        });
                      })(),
                    this.void$
                  );
                }),
              )
            );
          }
          setNoIndex(t) {
            t
              ? this.metaService.addTag({ name: 'robots', content: 'noindex' })
              : this.metaService.removeTag('name="robots"');
          }
          swapViews(e = () => {}) {
            const n = new c.y((t) => {
                const e = requestAnimationFrame(() => {
                  t.next(), t.complete();
                });
                return () => cancelAnimationFrame(e);
              }),
              s = (e, s, r, i, o = 200) => {
                const a =
                  !t.animationsEnabled || this.hostElement.classList.contains('no-animations');
                return (
                  (e.style.transition = ''),
                  a
                    ? this.void$.pipe((0, C.b)(() => (e.style[s] = i)))
                    : this.void$.pipe(
                        (0, S.w)(() => n),
                        (0, C.b)(() => (e.style[s] = r)),
                        (0, S.w)(() => n),
                        (0, C.b)(() => (e.style.transition = `all ${o}ms ease-in-out`)),
                        (0, S.w)(() => n),
                        (0, C.b)(() => (e.style[s] = i)),
                        (0, S.w)(() =>
                          (0, Ee.H)(
                            ((t) => {
                              const e = getComputedStyle(t).transitionDuration || '';
                              return 1e3 * Number(e.replace(/s$/, ''));
                            })(e),
                          ),
                        ),
                        (0, S.w)(() => this.void$),
                      )
                );
              };
            let r = this.void$;
            return (
              this.currViewContainer.parentElement &&
                (r = r.pipe(
                  (0, S.w)(() => s(this.currViewContainer, 'opacity', '1', '0.1')),
                  (0, C.b)(() =>
                    this.currViewContainer.parentElement.removeChild(this.currViewContainer),
                  ),
                  (0, C.b)(() => this.docRemoved.emit()),
                )),
              r.pipe(
                (0, C.b)(() => this.hostElement.appendChild(this.nextViewContainer)),
                (0, C.b)(() => e()),
                (0, C.b)(() => this.docInserted.emit()),
                (0, S.w)(() => s(this.nextViewContainer, 'opacity', '0.1', '1')),
                (0, C.b)(() => {
                  const t = this.currViewContainer;
                  (this.currViewContainer = this.nextViewContainer),
                    (this.nextViewContainer = t),
                    (this.nextViewContainer.innerHTML = '');
                }),
              )
            );
          }
        }
        return (
          (t.animationsEnabled = !0),
          (t.ɵfac = function (e) {
            return new (e || t)(
              r.Y36(r.SBq),
              r.Y36(Te.Y),
              r.Y36(s.Dx),
              r.Y36(s.h_),
              r.Y36(le.I),
              r.Y36(Me),
            );
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-doc-viewer']],
            inputs: { doc: 'doc' },
            outputs: {
              docReady: 'docReady',
              docRemoved: 'docRemoved',
              docInserted: 'docInserted',
              docRendered: 'docRendered',
            },
            decls: 0,
            vars: 0,
            template: function (t, e) {},
            encapsulation: 2,
          })),
          t
        );
      })();
      function Be(t, e) {
        if ((1 & t && (r.TgZ(0, 'li'), r.TgZ(1, 'a', 6), r._uU(2), r.qZA(), r.qZA()), 2 & t)) {
          const t = e.$implicit;
          r.xp6(1),
            r.Q6J('href', t.url, r.LSH)('title', t.tooltip || t.title),
            r.xp6(1),
            r.Oqu(t.title);
        }
      }
      function qe(t, e) {
        if (
          (1 & t &&
            (r.TgZ(0, 'div', 4),
            r.TgZ(1, 'h3'),
            r._uU(2),
            r.qZA(),
            r.TgZ(3, 'ul'),
            r.YNc(4, Be, 3, 3, 'li', 5),
            r.qZA(),
            r.qZA()),
          2 & t)
        ) {
          const t = e.$implicit;
          r.xp6(2), r.Oqu(t.title), r.xp6(2), r.Q6J('ngForOf', t.children);
        }
      }
      let Ze = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-footer']],
            inputs: { nodes: 'nodes', versionInfo: 'versionInfo' },
            decls: 14,
            vars: 2,
            consts: [
              [1, 'grid-fluid'],
              ['class', 'footer-block', 4, 'ngFor', 'ngForOf'],
              ['href', 'license', 'title', 'License text'],
              ['href', 'https://creativecommons.org/licenses/by/4.0/'],
              [1, 'footer-block'],
              [4, 'ngFor', 'ngForOf'],
              [1, 'link', 3, 'href', 'title'],
            ],
            template: function (t, e) {
              1 & t &&
                (r.TgZ(0, 'div', 0),
                r.YNc(1, qe, 5, 2, 'div', 1),
                r.qZA(),
                r.TgZ(2, 'p'),
                r._uU(3, ' Super-powered by Google \xa92010-2021.\n'),
                r.qZA(),
                r.TgZ(4, 'p'),
                r._uU(5, ' Code licensed under an '),
                r.TgZ(6, 'a', 2),
                r._uU(7, 'MIT-style License'),
                r.qZA(),
                r._uU(8, '. Documentation licensed under '),
                r.TgZ(9, 'a', 3),
                r._uU(10, 'CC BY 4.0'),
                r.qZA(),
                r._uU(11, '.\n'),
                r.qZA(),
                r.TgZ(12, 'p'),
                r._uU(13),
                r.qZA()),
                2 & t &&
                  (r.xp6(1),
                  r.Q6J('ngForOf', e.nodes),
                  r.xp6(12),
                  r.hij(' Version ', null == e.versionInfo ? null : e.versionInfo.full, '.\n'));
            },
            directives: [a.sg],
            encapsulation: 2,
          })),
          t
        );
      })();
      const ze = function (t) {
        return { selected: t };
      };
      function Ge(t, e) {
        if (
          (1 & t &&
            (r.TgZ(0, 'li', 2),
            r.TgZ(1, 'a', 3),
            r.TgZ(2, 'span', 4),
            r._uU(3),
            r.qZA(),
            r.qZA(),
            r.qZA()),
          2 & t)
        ) {
          const t = e.$implicit,
            n = r.oxw();
          r.Q6J('ngClass', r.VKq(4, ze, t.url === n.currentUrl)),
            r.xp6(1),
            r.Q6J('href', t.url, r.LSH)('title', t.tooltip),
            r.xp6(2),
            r.Oqu(t.title);
        }
      }
      let Ue = (() => {
        class t {
          get currentUrl() {
            return this.currentNode ? this.currentNode.url : null;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-top-menu']],
            inputs: { nodes: 'nodes', currentNode: 'currentNode' },
            decls: 2,
            vars: 1,
            consts: [
              ['role', 'navigation'],
              [3, 'ngClass', 4, 'ngFor', 'ngForOf'],
              [3, 'ngClass'],
              [1, 'nav-link', 3, 'href', 'title'],
              [1, 'nav-link-inner'],
            ],
            template: function (t, e) {
              1 & t && (r.TgZ(0, 'ul', 0), r.YNc(1, Ge, 4, 6, 'li', 1), r.qZA()),
                2 & t && (r.xp6(1), r.Q6J('ngForOf', e.nodes));
            },
            directives: [a.sg, a.mk],
            encapsulation: 2,
          })),
          t
        );
      })();
      var $e = n(9147);
      const Ye = ['dt'];
      let Qe = (() => {
          class t {
            constructor() {
              this.docChange = new r.vpe();
            }
            get text() {
              return this.doc && this.doc.contents;
            }
            dtextSet() {
              (this.doc.contents = this.dt.nativeElement.value),
                this.docChange.emit(Object.assign({}, this.doc));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['aio-dt']],
              viewQuery: function (t, e) {
                if ((1 & t && r.Gf(Ye, 7, r.SBq), 2 & t)) {
                  let t;
                  r.iGM((t = r.CRH())) && (e.dt = t.first);
                }
              },
              inputs: { doc: 'doc' },
              outputs: { docChange: 'docChange' },
              decls: 7,
              vars: 1,
              consts: [
                ['rows', '10', 'cols', '80', 3, 'value'],
                ['dt', ''],
                [3, 'click'],
              ],
              template: function (t, e) {
                1 & t &&
                  (r.TgZ(0, 'div'),
                  r._UZ(1, 'hr'),
                  r._UZ(2, 'textarea', 0, 1),
                  r._UZ(4, 'br'),
                  r.TgZ(5, 'button', 2),
                  r.NdJ('click', function () {
                    return e.dtextSet();
                  }),
                  r._uU(6, 'Show change'),
                  r.qZA(),
                  r.qZA()),
                  2 & t && (r.xp6(2), r.Q6J('value', e.text));
              },
              encapsulation: 2,
            })),
            t
          );
        })(),
        We = (() => {
          class t {
            constructor(t, e, n) {
              (this.elementRef = t),
                (this.elementsLoader = e),
                (this.logger = n),
                (this.selector = '');
            }
            ngOnInit() {
              this.selector && !/[^\w-]/.test(this.selector)
                ? ((this.elementRef.nativeElement.innerHTML = `<${this.selector}></${this.selector}>`),
                  this.elementsLoader.loadCustomElement(this.selector))
                : this.logger.error(
                    new Error(`Invalid selector for 'aio-lazy-ce': ${this.selector}`),
                  );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Y36(r.SBq), r.Y36(Me), r.Y36(Te.Y));
            }),
            (t.ɵcmp = r.Xpm({
              type: t,
              selectors: [['aio-lazy-ce']],
              inputs: { selector: 'selector' },
              decls: 0,
              vars: 0,
              template: function (t, e) {},
              encapsulation: 2,
            })),
            t
          );
        })();
      const Ke = ['searchBox', 'searchResultsView'];
      function Je(t, e) {
        1 & t && (r.TgZ(0, 'div', 40), r._UZ(1, 'mat-progress-bar', 41), r.qZA());
      }
      function Xe(t, e) {
        1 & t && r._UZ(0, 'img', 42);
      }
      function tn(t, e) {
        1 & t && r._UZ(0, 'img', 43);
      }
      function en(t, e) {
        if ((1 & t && r._UZ(0, 'aio-top-menu', 44), 2 & t)) {
          const t = r.oxw();
          r.Q6J('nodes', t.topMenuNodes)(
            'currentNode',
            null == t.currentNodes ? null : t.currentNodes.TopBar,
          );
        }
      }
      function nn(t, e) {
        if (1 & t) {
          const t = r.EpF();
          r.TgZ(0, 'aio-search-results', 45, 46),
            r.NdJ('resultSelected', function () {
              return r.CHM(t), r.oxw().hideSearchResults();
            }),
            r.ALo(2, 'async'),
            r.qZA();
        }
        if (2 & t) {
          const t = r.oxw();
          r.Q6J('searchResults', r.lcZ(2, 1, t.searchResults));
        }
      }
      function sn(t, e) {
        if ((1 & t && r._UZ(0, 'aio-nav-menu', 29), 2 & t)) {
          const t = r.oxw();
          r.Q6J('nodes', t.topMenuNarrowNodes)(
            'currentNode',
            null == t.currentNodes ? null : t.currentNodes.TopBarNarrow,
          )('isWide', !1);
        }
      }
      function rn(t, e) {
        if (1 & t) {
          const t = r.EpF();
          r.TgZ(0, 'aio-dt', 47),
            r.NdJ('docChange', function (e) {
              return r.CHM(t), (r.oxw().currentDocument = e);
            }),
            r.qZA();
        }
        if (2 & t) {
          const t = r.oxw();
          r.Q6J('doc', t.currentDocument);
        }
      }
      function on(t, e) {
        if (1 & t) {
          const t = r.EpF();
          r.TgZ(0, 'div', 48),
            r.NdJ('wheel', function (e) {
              return r.CHM(t), r.oxw().restrainScrolling(e);
            }),
            r._UZ(1, 'aio-lazy-ce', 49),
            r.qZA();
        }
        if (2 & t) {
          const t = r.oxw();
          r.Udp('max-height', t.tocMaxHeight, 'px');
        }
      }
      function an(t, e) {
        1 & t && (r.TgZ(0, 'div', 50), r.TgZ(1, 'mat-icon'), r._uU(2, '\xa0'), r.qZA(), r.qZA());
      }
      const cn = function (t) {
        return { collapsed: t };
      };
      let ln = (() => {
        class t {
          constructor(t, e, n, s, r, i, o, a) {
            (this.deployment = t),
              (this.documentService = e),
              (this.hostElement = n),
              (this.locationService = s),
              (this.navigationService = r),
              (this.scrollService = i),
              (this.searchService = o),
              (this.tocService = a),
              (this.currentNodes = {}),
              (this.dtOn = !1),
              (this.hostClasses = ''),
              (this.isStarting = !0),
              (this.isTransitioning = !0),
              (this.isFetching = !1),
              (this.showTopMenu = !1),
              (this.dockSideNav = !1),
              (this.isSideNavDoc = !1),
              (this.hasFloatingToc = !1),
              (this.showFloatingToc = new Kt(!1)),
              (this.tocMaxHeightOffset = 0),
              (this.showSearchResults = !1),
              (this.notificationAnimating = !1);
          }
          get isOpened() {
            return this.dockSideNav && this.isSideNavDoc;
          }
          get mode() {
            return this.dockSideNav && (this.isSideNavDoc || this.showTopMenu) ? 'side' : 'over';
          }
          ngOnInit() {
            'Worker' in window && this.searchService.initWorker(2e3),
              this.onResize(window.innerWidth),
              this.documentService.currentDocument.subscribe((t) => (this.currentDocument = t)),
              this.locationService.currentPath.subscribe((t) => {
                t === this.currentPath
                  ? this.scrollService.scroll()
                  : ((this.currentPath = t),
                    clearTimeout(this.isFetchingTimeout),
                    (this.isFetchingTimeout = setTimeout(() => (this.isFetching = !0), 200)));
              }),
              this.navigationService.currentNodes.subscribe((t) => {
                (this.currentNodes = t),
                  'archive' !== this.deployment.mode ||
                    t.SideNav ||
                    this.locationService.replace('docs');
              }),
              (0, Jt.aj)([
                this.navigationService.versionInfo,
                this.navigationService.navigationViews.pipe((0, v.U)((t) => t.docVersions)),
              ]).subscribe(([t, e]) => {
                const n = [
                  { title: 'next', url: 'https://next.angular.io/' },
                  { title: 'rc', url: 'https://rc.angular.io/' },
                  { title: 'stable', url: 'https://angular.io/' },
                ];
                'archive' === this.deployment.mode && n.push({ title: `v${t.major}` }),
                  (this.docVersions = [...n, ...e]),
                  (this.currentDocVersion = this.docVersions.find(
                    (e) => e.title === this.deployment.mode || e.title === `v${t.major}`,
                  )),
                  (this.currentDocVersion.title += ` (v${t.raw})`);
              }),
              this.navigationService.navigationViews.subscribe((t) => {
                (this.footerNodes = t.Footer || []),
                  (this.sideNavNodes = t.SideNav || []),
                  (this.topMenuNodes = t.TopBar || []),
                  (this.topMenuNarrowNodes = t.TopBarNarrow || this.topMenuNodes);
              }),
              this.navigationService.versionInfo.subscribe((t) => (this.versionInfo = t));
            const t = this.tocService.tocList.pipe((0, v.U)((t) => t.length > 0));
            (0, Jt.aj)([t, this.showFloatingToc]).subscribe(
              ([t, e]) => (this.hasFloatingToc = t && e),
            ),
              (0, Jt.aj)([
                this.documentService.currentDocument,
                this.navigationService.currentNodes,
              ])
                .pipe((0, Xt.P)())
                .subscribe(() => this.updateShell()),
              this.locationService.currentUrl.subscribe((t) => (this.currentUrl = t));
          }
          onDocReady() {
            (this.isTransitioning = !0),
              clearTimeout(this.isFetchingTimeout),
              setTimeout(() => (this.isFetching = !1), 500);
          }
          onDocRemoved() {
            this.scrollService.removeStoredScrollInfo();
          }
          onDocInserted() {
            setTimeout(() => this.updateShell()), this.scrollService.scrollAfterRender(500);
          }
          onDocRendered() {
            this.isStarting && setTimeout(() => (this.isStarting = !1), 100),
              (this.isTransitioning = !1);
          }
          onDocVersionChange(t) {
            const e = this.docVersions[t];
            if (e.url) {
              const t = e.url + (e.url.endsWith('/') ? '' : '/');
              this.locationService.go(`${t}${this.currentUrl}`);
            }
          }
          onResize(t) {
            (this.showTopMenu = t >= 1048),
              (this.dockSideNav = t >= 992),
              this.showFloatingToc.next(t > 800),
              this.showTopMenu && !this.isSideNavDoc && this.sidenav.toggle(!1);
          }
          onClick(t, e, n, s, r) {
            if (
              (this.searchElements.some((e) => e.nativeElement.contains(t)) ||
                this.hideSearchResults(),
              'FOOTER' === t.tagName && s && r)
            )
              return (this.dtOn = !this.dtOn), !1;
            let i = t;
            for (; i && !(i instanceof HTMLAnchorElement); ) i = i.parentElement;
            return (
              !(i instanceof HTMLAnchorElement) ||
              this.locationService.handleAnchorClick(i, e, n, s)
            );
          }
          setPageId(t) {
            this.pageId = 'index' === t ? 'home' : t.replace('/', '-');
          }
          setFolderId(t) {
            this.folderId = 'index' === t ? 'home' : t.split('/', 1)[0];
          }
          notificationDismissed() {
            (this.notificationAnimating = !0),
              setTimeout(() => (this.notificationAnimating = !1), 250),
              this.updateHostClasses();
          }
          updateHostClasses() {
            const t = `mode-${this.deployment.mode}`,
              e = 'sidenav-' + (this.sidenav.opened ? 'open' : 'closed'),
              n = `page-${this.pageId}`,
              s = `folder-${this.folderId}`,
              r = Object.keys(this.currentNodes)
                .map((t) => `view-${t}`)
                .join(' ');
            this.hostClasses = [
              t,
              e,
              n,
              s,
              r,
              `aio-notification-${this.notification.showNotification}`,
              this.notificationAnimating ? 'aio-notification-animating' : '',
            ].join(' ');
          }
          updateShell() {
            this.updateSideNav(),
              this.setPageId(this.currentDocument.id),
              this.setFolderId(this.currentDocument.id),
              this.updateHostClasses();
          }
          updateSideNav() {
            let t = this.sidenav.opened;
            const e = !!this.currentNodes.SideNav;
            this.isSideNavDoc !== e && (t = this.isSideNavDoc = e),
              this.sidenav.toggle(this.dockSideNav && t);
          }
          onScroll() {
            if (!this.tocMaxHeightOffset) {
              const t = this.hostElement.nativeElement,
                e = t.querySelector('.app-toolbar'),
                n = t.querySelector('footer');
              e && n && (this.tocMaxHeightOffset = e.clientHeight + n.clientHeight + 24);
            }
            this.tocMaxHeight = (
              document.body.scrollHeight -
              window.pageYOffset -
              this.tocMaxHeightOffset
            ).toFixed(2);
          }
          restrainScrolling(t) {
            const e = t.currentTarget,
              n = e.scrollTop;
            t.deltaY < 0
              ? n < 1 && t.preventDefault()
              : e.scrollHeight - e.clientHeight - n < 1 && t.preventDefault();
          }
          hideSearchResults() {
            this.showSearchResults = !1;
            const t = this.locationService.search();
            void 0 !== t.search &&
              this.locationService.setSearch(
                '',
                Object.assign(Object.assign({}, t), { search: void 0 }),
              );
          }
          focusSearchBox() {
            this.searchBox && this.searchBox.focus();
          }
          doSearch(t) {
            (this.searchResults = this.searchService.search(t)), (this.showSearchResults = !!t);
          }
          onKeyUp(t, e) {
            ('/' !== t && 191 !== e) || this.focusSearchBox(),
              ('Escape' !== t && 27 !== e) ||
                (this.showSearchResults && (this.hideSearchResults(), this.focusSearchBox()));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              r.Y36(ee),
              r.Y36(ne.Zg),
              r.Y36(r.SBq),
              r.Y36($t.a),
              r.Y36(oe),
              r.Y36(ae.a),
              r.Y36(ce.o),
              r.Y36(le.I),
            );
          }),
          (t.ɵcmp = r.Xpm({
            type: t,
            selectors: [['aio-shell']],
            viewQuery: function (t, e) {
              if ((1 & t && (r.Gf(Qt, 7), r.Gf(Ot, 7), r.Gf(Ut, 7), r.Gf(Ke, 5, r.SBq)), 2 & t)) {
                let t;
                r.iGM((t = r.CRH())) && (e.searchBox = t.first),
                  r.iGM((t = r.CRH())) && (e.sidenav = t.first),
                  r.iGM((t = r.CRH())) && (e.notification = t.first),
                  r.iGM((t = r.CRH())) && (e.searchElements = t);
              }
            },
            hostVars: 3,
            hostBindings: function (t, e) {
              1 & t &&
                r.NdJ(
                  'resize',
                  function (t) {
                    return e.onResize(t.target.innerWidth);
                  },
                  !1,
                  r.Jf7,
                )('click', function (t) {
                  return e.onClick(t.target, t.button, t.ctrlKey, t.metaKey, t.altKey);
                })(
                  'scroll',
                  function () {
                    return e.onScroll();
                  },
                  !1,
                  r.Jf7,
                )(
                  'keyup',
                  function (t) {
                    return e.onKeyUp(t.key, t.which);
                  },
                  !1,
                  r.evT,
                ),
                2 & t && (r.d8E('@.disabled', e.isStarting), r.Tol(e.hostClasses));
            },
            decls: 46,
            vars: 36,
            consts: [
              ['id', 'top-of-page'],
              ['class', 'progress-bar-container', 4, 'ngIf'],
              ['color', 'primary', 1, 'app-toolbar', 'no-print'],
              [1, 'notification-container'],
              [
                'notificationId',
                'survey-march-2020',
                'expirationDate',
                '2020-04-15',
                3,
                'dismissOnContentClick',
                'dismissed',
              ],
              ['href', 'https://goo.gle/angular-survey-2020'],
              ['svgIcon', 'insert_comment', 'aria-label', 'Announcement', 1, 'icon'],
              [1, 'message'],
              [1, 'action-button'],
              ['mat-button', '', 'title', 'Docs menu', 1, 'hamburger', 3, 'click'],
              ['svgIcon', 'menu'],
              ['href', '/', 1, 'nav-link', 'home', 3, 'ngSwitch'],
              [
                'src',
                'assets/images/logos/angular/logo-nav@2x.png',
                'width',
                '150',
                'height',
                '40',
                'title',
                'Home',
                'alt',
                'Home',
                4,
                'ngSwitchCase',
              ],
              [
                'src',
                'assets/images/logos/angular/shield-large.svg',
                'width',
                '37',
                'height',
                '40',
                'title',
                'Home',
                'alt',
                'Home',
                4,
                'ngSwitchDefault',
              ],
              [3, 'nodes', 'currentNode', 4, 'ngIf'],
              [1, 'search-container', 3, 'onSearch', 'onFocus'],
              ['searchBox', ''],
              [1, 'toolbar-external-icons-container'],
              [
                'href',
                'https://twitter.com/angular',
                'title',
                'Twitter',
                'aria-label',
                'Angular on twitter',
              ],
              ['svgIcon', 'logos:twitter'],
              [
                'href',
                'https://github.com/angular/angular',
                'title',
                'GitHub',
                'aria-label',
                'Angular on github',
              ],
              ['svgIcon', 'logos:github'],
              [
                'href',
                'https://youtube.com/angular',
                'title',
                'YouTube',
                'aria-label',
                'Angular on YouTube',
              ],
              ['svgIcon', 'logos:youtube'],
              [3, 'searchResults', 'resultSelected', 4, 'ngIf'],
              ['role', 'main', 1, 'sidenav-container'],
              [1, 'sidenav', 3, 'ngClass', 'mode', 'opened', 'openedChange'],
              ['sidenav', ''],
              [3, 'nodes', 'currentNode', 'isWide', 4, 'ngIf'],
              [3, 'nodes', 'currentNode', 'isWide'],
              [1, 'doc-version'],
              [3, 'options', 'selected', 'change'],
              ['role', 'main', 1, 'sidenav-content', 3, 'id'],
              [3, 'mode', 'version'],
              [3, 'doc', 'docReady', 'docRemoved', 'docInserted', 'docRendered'],
              [3, 'doc', 'docChange', 4, 'ngIf'],
              ['class', 'toc-container no-print', 3, 'max-height', 'wheel', 4, 'ngIf'],
              [1, 'no-print'],
              [3, 'nodes', 'versionInfo'],
              ['class', 'cdk-visually-hidden', 4, 'ngIf'],
              [1, 'progress-bar-container'],
              ['mode', 'indeterminate', 'color', 'warn'],
              [
                'src',
                'assets/images/logos/angular/logo-nav@2x.png',
                'width',
                '150',
                'height',
                '40',
                'title',
                'Home',
                'alt',
                'Home',
              ],
              [
                'src',
                'assets/images/logos/angular/shield-large.svg',
                'width',
                '37',
                'height',
                '40',
                'title',
                'Home',
                'alt',
                'Home',
              ],
              [3, 'nodes', 'currentNode'],
              [3, 'searchResults', 'resultSelected'],
              ['searchResultsView', ''],
              [3, 'doc', 'docChange'],
              [1, 'toc-container', 'no-print', 3, 'wheel'],
              ['selector', 'aio-toc'],
              [1, 'cdk-visually-hidden'],
            ],
            template: function (t, e) {
              if (1 & t) {
                const t = r.EpF();
                r._UZ(0, 'div', 0),
                  r.YNc(1, Je, 2, 0, 'div', 1),
                  r.TgZ(2, 'mat-toolbar', 2),
                  r.TgZ(3, 'mat-toolbar-row', 3),
                  r.TgZ(4, 'aio-notification', 4),
                  r.NdJ('dismissed', function () {
                    return e.notificationDismissed();
                  }),
                  r.TgZ(5, 'a', 5),
                  r._UZ(6, 'mat-icon', 6),
                  r.TgZ(7, 'span', 7),
                  r._uU(8, 'Help Angular by taking a '),
                  r.TgZ(9, 'b'),
                  r._uU(10, '1 minute survey'),
                  r.qZA(),
                  r._uU(11, '!'),
                  r.qZA(),
                  r.TgZ(12, 'span', 8),
                  r._uU(13, 'Go to survey'),
                  r.qZA(),
                  r.qZA(),
                  r.qZA(),
                  r.qZA(),
                  r.TgZ(14, 'mat-toolbar-row'),
                  r.TgZ(15, 'button', 9),
                  r.NdJ('click', function () {
                    return r.CHM(t), r.MAs(33).toggle();
                  }),
                  r._UZ(16, 'mat-icon', 10),
                  r.qZA(),
                  r.TgZ(17, 'a', 11),
                  r.YNc(18, Xe, 1, 0, 'img', 12),
                  r.YNc(19, tn, 1, 0, 'img', 13),
                  r.qZA(),
                  r.YNc(20, en, 1, 2, 'aio-top-menu', 14),
                  r.TgZ(21, 'aio-search-box', 15, 16),
                  r.NdJ('onSearch', function (t) {
                    return e.doSearch(t);
                  })('onFocus', function (t) {
                    return e.doSearch(t);
                  }),
                  r.qZA(),
                  r.TgZ(23, 'div', 17),
                  r.TgZ(24, 'a', 18),
                  r._UZ(25, 'mat-icon', 19),
                  r.qZA(),
                  r.TgZ(26, 'a', 20),
                  r._UZ(27, 'mat-icon', 21),
                  r.qZA(),
                  r.TgZ(28, 'a', 22),
                  r._UZ(29, 'mat-icon', 23),
                  r.qZA(),
                  r.qZA(),
                  r.qZA(),
                  r.qZA(),
                  r.YNc(30, nn, 3, 3, 'aio-search-results', 24),
                  r.TgZ(31, 'mat-sidenav-container', 25),
                  r.TgZ(32, 'mat-sidenav', 26, 27),
                  r.NdJ('openedChange', function () {
                    return e.updateHostClasses();
                  }),
                  r.YNc(34, sn, 1, 3, 'aio-nav-menu', 28),
                  r._UZ(35, 'aio-nav-menu', 29),
                  r.TgZ(36, 'div', 30),
                  r.TgZ(37, 'aio-select', 31),
                  r.NdJ('change', function (t) {
                    return e.onDocVersionChange(t.index);
                  }),
                  r.qZA(),
                  r.qZA(),
                  r.qZA(),
                  r.TgZ(38, 'main', 32),
                  r._UZ(39, 'aio-mode-banner', 33),
                  r.TgZ(40, 'aio-doc-viewer', 34),
                  r.NdJ('docReady', function () {
                    return e.onDocReady();
                  })('docRemoved', function () {
                    return e.onDocRemoved();
                  })('docInserted', function () {
                    return e.onDocInserted();
                  })('docRendered', function () {
                    return e.onDocRendered();
                  }),
                  r.qZA(),
                  r.YNc(41, rn, 1, 1, 'aio-dt', 35),
                  r.qZA(),
                  r.qZA(),
                  r.YNc(42, on, 2, 2, 'div', 36),
                  r.TgZ(43, 'footer', 37),
                  r._UZ(44, 'aio-footer', 38),
                  r.qZA(),
                  r.YNc(45, an, 3, 0, 'div', 39);
              }
              2 & t &&
                (r.xp6(1),
                r.Q6J('ngIf', e.isFetching),
                r.xp6(1),
                r.ekj('transitioning', e.isTransitioning),
                r.xp6(2),
                r.Q6J('dismissOnContentClick', !0),
                r.xp6(11),
                r.ekj('starting', e.isStarting),
                r.xp6(2),
                r.Q6J('ngSwitch', e.showTopMenu),
                r.xp6(1),
                r.Q6J('ngSwitchCase', !0),
                r.xp6(2),
                r.Q6J('ngIf', e.showTopMenu),
                r.xp6(10),
                r.Q6J('ngIf', e.showSearchResults),
                r.xp6(1),
                r.ekj('starting', e.isStarting)('has-floating-toc', e.hasFloatingToc),
                r.xp6(1),
                r.Q6J('ngClass', r.VKq(34, cn, !e.dockSideNav))('mode', e.mode)(
                  'opened',
                  e.isOpened,
                ),
                r.xp6(2),
                r.Q6J('ngIf', !e.showTopMenu),
                r.xp6(1),
                r.Q6J('nodes', e.sideNavNodes)(
                  'currentNode',
                  null == e.currentNodes ? null : e.currentNodes.SideNav,
                )('isWide', e.dockSideNav),
                r.xp6(2),
                r.Q6J('options', e.docVersions)('selected', e.currentDocVersion),
                r.xp6(1),
                r.Q6J('id', e.pageId),
                r.xp6(1),
                r.Q6J('mode', e.deployment.mode)('version', e.versionInfo),
                r.xp6(1),
                r.ekj('no-animations', e.isStarting),
                r.Q6J('doc', e.currentDocument),
                r.xp6(1),
                r.Q6J('ngIf', e.dtOn),
                r.xp6(1),
                r.Q6J('ngIf', e.hasFloatingToc),
                r.xp6(2),
                r.Q6J('nodes', e.footerNodes)('versionInfo', e.versionInfo),
                r.xp6(1),
                r.Q6J('ngIf', !e.isStarting));
            },
            directives: [
              a.O5,
              Ht,
              Vt,
              Ut,
              z.Hw,
              Z.lW,
              a.RF,
              a.n9,
              a.ED,
              Qt,
              Rt,
              Ot,
              a.mk,
              _e,
              ye.H,
              ve,
              He,
              Ze,
              X,
              Ue,
              $e.G,
              Qe,
              We,
            ],
            pipes: [a.Ov],
            encapsulation: 2,
          })),
          t
        );
      })();
      const un = new r.OlP('SvgIcons');
      let hn = (() => {
        class t extends z.jv {
          constructor(t, e, n, s, r) {
            super(t, e, n, s), (this.svgIcons = r), (this.cachedSvgElements = { $$default: {} });
          }
          getNamedSvgIcon(t, e) {
            const n = this.cachedSvgElements[e || '$$default'];
            let s = n && n[t];
            return (
              s || (s = this.loadSvgElement(t, e)),
              s ? (0, p.of)(s.cloneNode(!0)) : super.getNamedSvgIcon(t, e)
            );
          }
          loadSvgElement(t, e) {
            const n = this.svgIcons.find((n) =>
              e ? n.name === t && n.namespace === e : n.name === t,
            );
            if (!n) return;
            const s = n.namespace || '$$default',
              r = this.cachedSvgElements[s] || (this.cachedSvgElements[s] = {}),
              i = document.createElement('DIV');
            i.innerHTML = n.svgSource;
            const o = i.querySelector('svg');
            return (r[n.name] = o), o;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(i.eN), r.LFG(s.H7), r.LFG(a.K0, 8), r.LFG(r.qLn), r.LFG(un));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      var dn = n(6896);
      let fn = (() => {
        class t extends r.qLn {
          constructor(t) {
            super(), (this.window = t);
          }
          handleError(t) {
            try {
              super.handleError(t);
            } catch (e) {
              this.reportError(e);
            }
            this.reportError(t);
          }
          reportError(t) {
            this.window.onerror &&
              ('string' == typeof t
                ? this.window.onerror(t)
                : this.window.onerror(t.message, void 0, void 0, void 0, t));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.LFG(zt.R));
          }),
          (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      var pn = n(1262);
      n(9665),
        n(2875),
        n(436),
        n(8402),
        n(790),
        n(7768),
        n(3392),
        n(3982),
        n(1564),
        n(1520),
        n(7471);
      const mn = new r.OlP('ROUTES');
      let gn = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵmod = r.oAB({ type: t })),
          (t.ɵinj = r.cJS({
            providers: [
              Me,
              { provide: Ie, useValue: Ae },
              { provide: mn, useValue: ke, multi: !0 },
            ],
          })),
          t
        );
      })();
      var _n = n(5425),
        yn = n(2293);
      function bn(t) {
        const { subscriber: e, counter: n, period: s } = t;
        e.next(n), this.schedule({ subscriber: e, counter: n + 1, period: s }, s);
      }
      let vn = (() => {
          class t {
            constructor(t, e, n, s) {
              if (
                ((this.logger = n),
                (this.swu = s),
                (this.checkInterval = 216e5),
                (this.onDestroy = new g.xQ()),
                !s.isEnabled)
              )
                return;
              const r = t.isStable.pipe((0, Xt.P)((t) => t));
              (0, m.z)(
                r,
                (function (t = 0, e = T.P) {
                  return (
                    (!(0, yn.k)(t) || t < 0) && (t = 0),
                    (e && 'function' == typeof e.schedule) || (e = T.P),
                    new c.y(
                      (n) => (
                        n.add(e.schedule(bn, t, { subscriber: n, counter: 0, period: t })), n
                      ),
                    )
                  );
                })(this.checkInterval),
              )
                .pipe(
                  (0, C.b)(() => this.log('Checking for update...')),
                  (0, ct.R)(this.onDestroy),
                )
                .subscribe(() => this.swu.checkForUpdate()),
                this.swu.available
                  .pipe(
                    (0, C.b)((t) => this.log(`Update available: ${JSON.stringify(t)}`)),
                    (0, ct.R)(this.onDestroy),
                  )
                  .subscribe(() => this.swu.activateUpdate()),
                this.swu.activated
                  .pipe(
                    (0, C.b)((t) => this.log(`Update activated: ${JSON.stringify(t)}`)),
                    (0, ct.R)(this.onDestroy),
                  )
                  .subscribe(() => e.fullPageNavigationNeeded()),
                this.swu.unrecoverable
                  .pipe(
                    (0, C.b)((t) => this.log(`Unrecoverable state: ${t.reason}\nReloading...`)),
                    (0, ct.R)(this.onDestroy),
                  )
                  .subscribe(() => e.reloadPage());
            }
            ngOnDestroy() {
              this.onDestroy.next();
            }
            log(t) {
              const e = new Date().toISOString();
              this.logger.log(`[SwUpdates - ${e}]: ${t}`);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.LFG(r.z2F), r.LFG($t.a), r.LFG(Te.Y), r.LFG(D));
            }),
            (t.ɵprov = r.Yz7({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        wn = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = r.oAB({ type: t })),
            (t.ɵinj = r.cJS({ providers: [vn] })),
            t
          );
        })();
      const Sn = [
        {
          provide: un,
          useValue: {
            name: 'close',
            svgSource:
              '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /><path d="M0 0h24v24H0z" fill="none" /></svg>',
          },
          multi: !0,
        },
        {
          provide: un,
          useValue: {
            name: 'insert_comment',
            svgSource:
              '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>',
          },
          multi: !0,
        },
        {
          provide: un,
          useValue: {
            name: 'keyboard_arrow_right',
            svgSource:
              '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /></svg>',
          },
          multi: !0,
        },
        {
          provide: un,
          useValue: {
            name: 'menu',
            svgSource:
              '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>',
          },
          multi: !0,
        },
        {
          provide: un,
          useValue: {
            namespace: 'logos',
            name: 'github',
            svgSource:
              '<svg focusable="false" viewBox="0 0 51.8 50.4" xmlns="http://www.w3.org/2000/svg"><path d="M25.9,0.2C11.8,0.2,0.3,11.7,0.3,25.8c0,11.3,7.3,20.9,17.5,24.3c1.3,0.2,1.7-0.6,1.7-1.2c0-0.6,0-2.6,0-4.8c-7.1,1.5-8.6-3-8.6-3c-1.2-3-2.8-3.7-2.8-3.7c-2.3-1.6,0.2-1.6,0.2-1.6c2.6,0.2,3.9,2.6,3.9,2.6c2.3,3.9,6,2.8,7.5,2.1c0.2-1.7,0.9-2.8,1.6-3.4c-5.7-0.6-11.7-2.8-11.7-12.7c0-2.8,1-5.1,2.6-6.9c-0.3-0.7-1.1-3.3,0.3-6.8c0,0,2.1-0.7,7,2.6c2-0.6,4.2-0.9,6.4-0.9c2.2,0,4.4,0.3,6.4,0.9c4.9-3.3,7-2.6,7-2.6c1.4,3.5,0.5,6.1,0.3,6.8c1.6,1.8,2.6,4.1,2.6,6.9c0,9.8-6,12-11.7,12.6c0.9,0.8,1.7,2.4,1.7,4.7c0,3.4,0,6.2,0,7c0,0.7,0.5,1.5,1.8,1.2c10.2-3.4,17.5-13,17.5-24.3C51.5,11.7,40.1,0.2,25.9,0.2z" /></svg>',
          },
          multi: !0,
        },
        {
          provide: un,
          useValue: {
            namespace: 'logos',
            name: 'twitter',
            svgSource:
              '<svg focusable="false" viewBox="0 0 50 59" xmlns="http://www.w3.org/2000/svg"><path d="M50,9.3c-1.8,0.8-3.8,1.4-5.9,1.6c2.1-1.3,3.7-3.3,4.5-5.7c-2,1.2-4.2,2-6.5,2.5c-1.9-2-4.5-3.2-7.5-3.2c-5.7,0-10.3,4.6-10.3,10.3c0,0.8,0.1,1.6,0.3,2.3C16.1,16.7,8.5,12.6,3.5,6.4c-0.9,1.5-1.4,3.3-1.4,5.2c0,3.6,1.8,6.7,4.6,8.5C5,20,3.4,19.6,2,18.8c0,0,0,0.1,0,0.1c0,5,3.5,9.1,8.2,10.1c-0.9,0.2-1.8,0.4-2.7,0.4c-0.7,0-1.3-0.1-1.9-0.2c1.3,4.1,5.1,7,9.6,7.1c-3.5,2.8-7.9,4.4-12.7,4.4c-0.8,0-1.6,0-2.4-0.1c4.5,2.9,9.9,4.6,15.7,4.6c18.9,0,29.2-15.6,29.2-29.2c0-0.4,0-0.9,0-1.3C46.9,13.2,48.6,11.4,50,9.3z" /></svg>',
          },
          multi: !0,
        },
        {
          provide: un,
          useValue: {
            namespace: 'logos',
            name: 'youtube',
            svgSource:
              '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" /></svg>',
          },
          multi: !0,
        },
      ];
      let En = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵmod = r.oAB({ type: t, bootstrap: [ln] })),
          (t.ɵinj = r.cJS({
            providers: [
              ee,
              ne.Zg,
              { provide: r.qLn, useClass: fn },
              dn.O,
              Te.Y,
              a.Ye,
              { provide: a.S$, useClass: a.b0 },
              $t.a,
              { provide: z.jv, useClass: hn },
              oe,
              ae.a,
              pn.f_,
              ce.o,
              Sn,
              le.I,
              { provide: qt, useFactory: Zt },
              { provide: zt.R, useFactory: zt.s },
            ],
            imports: [
              [
                s.b2,
                o.PW,
                gn,
                i.JF,
                Z.ot,
                z.Ps,
                et,
                Lt,
                Bt,
                wn,
                _n.m,
                q.register('/ngsw-worker.js', { enabled: te.N.production }),
              ],
            ],
          })),
          t
        );
      })();
      te.N.production && (0, r.G48)(), s.q6().bootstrapModule(En);
    },
  },
  function (t) {
    'use strict';
    t((t.s = 7001));
  },
]);
//# sourceMappingURL=main-es2015.8ea96175dd77d80e1694.js.map
