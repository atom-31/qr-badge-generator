window.EmberENV = {
  ...(window.EmberENV || {}),
  EXTEND_PROTOTYPES: !1,
  FEATURES: {},
  _APPLICATION_TEMPLATE_WRAPPER: !1,
  _DEFAULT_ASYNC_OBSERVERS: !0,
  _JQUERY_INTEGRATION: !1,
  _NO_IMPLICIT_ROUTE_MODEL: !0,
  _TEMPLATE_ONLY_GLIMMER_COMPONENTS: !0,
};
var loader,
  define,
  requireModule,
  require,
  requirejs,
  runningTests = !1;
if (
  ((function (e) {
    'use strict';
    function t() {
      var e = Object.create(null);
      return (e.__ = void 0), delete e.__, e;
    }
    var r = {
      loader: loader,
      define: define,
      requireModule: requireModule,
      require: require,
      requirejs: requirejs,
    };
    (requirejs =
      require =
      requireModule =
        function (e) {
          for (
            var t = [], r = f(e, '(require)', t), o = t.length - 1;
            o >= 0;
            o--
          )
            t[o].exports();
          return r.module.exports;
        }),
      (loader = {
        noConflict: function (t) {
          var o, n;
          for (o in t)
            t.hasOwnProperty(o) &&
              r.hasOwnProperty(o) &&
              ((n = t[o]), (e[n] = e[o]), (e[o] = r[o]));
        },
        makeDefaultExport: !0,
      });
    var o = t(),
      n = (t(), 0);
    var i = ['require', 'exports', 'module'];
    function s(e, t, r, o) {
      (this.uuid = n++),
        (this.id = e),
        (this.deps = !t.length && r.length ? i : t),
        (this.module = { exports: {} }),
        (this.callback = r),
        (this.hasExportsAsDep = !1),
        (this.isAlias = o),
        (this.reified = new Array(t.length)),
        (this.state = 'new');
    }
    function a() {}
    function u(e) {
      this.id = e;
    }
    function f(e, t, r) {
      for (var n = o[e] || o[e + '/index']; n && n.isAlias; )
        n = o[n.id] || o[n.id + '/index'];
      return (
        n ||
          (function (e, t) {
            throw new Error(
              'Could not find module `' + e + '` imported from `' + t + '`',
            );
          })(e, t),
        r &&
          'pending' !== n.state &&
          'finalized' !== n.state &&
          (n.findDeps(r), r.push(n)),
        n
      );
    }
    function l(e, t) {
      if ('.' !== e.charAt(0)) return e;
      for (
        var r = e.split('/'),
          o = t.split('/').slice(0, -1),
          n = 0,
          i = r.length;
        n < i;
        n++
      ) {
        var s = r[n];
        if ('..' === s) {
          if (0 === o.length)
            throw new Error('Cannot access parent module of root');
          o.pop();
        } else {
          if ('.' === s) continue;
          o.push(s);
        }
      }
      return o.join('/');
    }
    function d(e) {
      return !(!o[e] && !o[e + '/index']);
    }
    (s.prototype.makeDefaultExport = function () {
      var e = this.module.exports;
      null === e ||
        ('object' != typeof e && 'function' != typeof e) ||
        void 0 !== e.default ||
        !Object.isExtensible(e) ||
        (e.default = e);
    }),
      (s.prototype.exports = function () {
        if ('finalized' === this.state || 'reifying' === this.state)
          return this.module.exports;
        loader.wrapModules &&
          (this.callback = loader.wrapModules(this.id, this.callback)),
          this.reify();
        var e = this.callback.apply(this, this.reified);
        return (
          (this.reified.length = 0),
          (this.state = 'finalized'),
          (this.hasExportsAsDep && void 0 === e) || (this.module.exports = e),
          loader.makeDefaultExport && this.makeDefaultExport(),
          this.module.exports
        );
      }),
      (s.prototype.unsee = function () {
        (this.state = 'new'), (this.module = { exports: {} });
      }),
      (s.prototype.reify = function () {
        if ('reified' !== this.state) {
          this.state = 'reifying';
          try {
            (this.reified = this._reify()), (this.state = 'reified');
          } finally {
            'reifying' === this.state && (this.state = 'errored');
          }
        }
      }),
      (s.prototype._reify = function () {
        for (var e = this.reified.slice(), t = 0; t < e.length; t++) {
          var r = e[t];
          e[t] = r.exports ? r.exports : r.module.exports();
        }
        return e;
      }),
      (s.prototype.findDeps = function (e) {
        if ('new' === this.state) {
          this.state = 'pending';
          for (var t = this.deps, r = 0; r < t.length; r++) {
            var o = t[r],
              n = (this.reified[r] = { exports: void 0, module: void 0 });
            'exports' === o
              ? ((this.hasExportsAsDep = !0), (n.exports = this.module.exports))
              : 'require' === o
                ? (n.exports = this.makeRequire())
                : 'module' === o
                  ? (n.exports = this.module)
                  : (n.module = f(l(o, this.id), this.id, e));
          }
        }
      }),
      (s.prototype.makeRequire = function () {
        var e = this.id,
          t = function (t) {
            return require(l(t, e));
          };
        return (
          (t.default = t),
          (t.moduleId = e),
          (t.has = function (t) {
            return d(l(t, e));
          }),
          t
        );
      }),
      (define = function (e, t, r) {
        var n = o[e];
        (n && 'new' !== n.state) ||
          (arguments.length < 2 &&
            (function (e) {
              throw new Error(
                'an unsupported module was defined, expected `define(id, deps, module)` instead got: `' +
                  e +
                  '` arguments to define`',
              );
            })(arguments.length),
          Array.isArray(t) || ((r = t), (t = [])),
          (o[e] = r instanceof u ? new s(r.id, t, r, !0) : new s(e, t, r, !1)));
      }),
      (define.exports = function (e, t) {
        var r = o[e];
        if (!r || 'new' === r.state)
          return (
            ((r = new s(e, [], a, null)).module.exports = t),
            (r.state = 'finalized'),
            (o[e] = r),
            r
          );
      }),
      (define.alias = function (e, t) {
        return 2 === arguments.length ? define(t, new u(e)) : new u(e);
      }),
      (requirejs.entries = requirejs._eak_seen = o),
      (requirejs.has = d),
      (requirejs.unsee = function (e) {
        f(e, '(unsee)', !1).unsee();
      }),
      (requirejs.clear = function () {
        (requirejs.entries = requirejs._eak_seen = o = t()), t();
      }),
      define('foo', function () {}),
      define('foo/bar', [], function () {}),
      define('foo/asdf', ['module', 'exports', 'require'], function (e, t, r) {
        r.has('foo/bar') && r('foo/bar');
      }),
      define('foo/baz', [], define.alias('foo')),
      define('foo/quz', define.alias('foo')),
      define.alias('foo', 'foo/qux'),
      define(
        'foo/bar',
        ['foo', './quz', './baz', './asdf', './bar', '../foo'],
        function () {},
      ),
      define('foo/main', ['foo/bar'], function () {}),
      define.exports('foo/exports', {}),
      require('foo/exports'),
      require('foo/main'),
      require.unsee('foo/bar'),
      requirejs.clear(),
      'object' == typeof exports &&
        'object' == typeof module &&
        module.exports &&
        (module.exports = { require: require, define: define });
  })(this),
  'undefined' == typeof FastBoot)
) {
  var preferNative = !1;
  !(function (e) {
    define('fetch', ['exports', 'ember', 'rsvp'], function (t, r, o) {
      'use strict';
      var n = 'default' in r ? r.default : r,
        i = ('default' in o ? o.default : o).Promise,
        s = [
          'FormData',
          'FileReader',
          'Blob',
          'URLSearchParams',
          'Symbol',
          'ArrayBuffer',
        ],
        a = s;
      preferNative &&
        (a = s.concat([
          'fetch',
          'Headers',
          'Request',
          'Response',
          'AbortController',
        ])),
        a.forEach(function (r) {
          e[r] &&
            Object.defineProperty(t, r, {
              configurable: !0,
              get: function () {
                return e[r];
              },
              set: function (t) {
                e[r] = t;
              },
            });
        });
      var u = t,
        f = t;
      !(function () {
        class e {
          constructor() {
            Object.defineProperty(this, 'listeners', {
              value: {},
              writable: !0,
              configurable: !0,
            });
          }
          addEventListener(e, t, r) {
            e in this.listeners || (this.listeners[e] = []),
              this.listeners[e].push({ callback: t, options: r });
          }
          removeEventListener(e, t) {
            if (!(e in this.listeners)) return;
            const r = this.listeners[e];
            for (let e = 0, o = r.length; e < o; e++)
              if (r[e].callback === t) return void r.splice(e, 1);
          }
          dispatchEvent(e) {
            if (!(e.type in this.listeners)) return;
            const t = this.listeners[e.type].slice();
            for (let r = 0, o = t.length; r < o; r++) {
              const o = t[r];
              try {
                o.callback.call(this, e);
              } catch (e) {
                i.resolve().then(() => {
                  throw e;
                });
              }
              o.options &&
                o.options.once &&
                this.removeEventListener(e.type, o.callback);
            }
            return !e.defaultPrevented;
          }
        }
        class t extends e {
          constructor() {
            super(),
              this.listeners || e.call(this),
              Object.defineProperty(this, 'aborted', {
                value: !1,
                writable: !0,
                configurable: !0,
              }),
              Object.defineProperty(this, 'onabort', {
                value: null,
                writable: !0,
                configurable: !0,
              }),
              Object.defineProperty(this, 'reason', {
                value: void 0,
                writable: !0,
                configurable: !0,
              });
          }
          toString() {
            return '[object AbortSignal]';
          }
          dispatchEvent(e) {
            'abort' === e.type &&
              ((this.aborted = !0),
              'function' == typeof this.onabort && this.onabort.call(this, e)),
              super.dispatchEvent(e);
          }
        }
        class r {
          constructor() {
            Object.defineProperty(this, 'signal', {
              value: new t(),
              writable: !0,
              configurable: !0,
            });
          }
          abort(e) {
            let t;
            try {
              t = new Event('abort');
            } catch (e) {
              'undefined' != typeof document
                ? document.createEvent
                  ? ((t = document.createEvent('Event')),
                    t.initEvent('abort', !1, !1))
                  : ((t = document.createEventObject()), (t.type = 'abort'))
                : (t = { type: 'abort', bubbles: !1, cancelable: !1 });
            }
            let r = e;
            if (void 0 === r)
              if ('undefined' == typeof document)
                (r = new Error('This operation was aborted')),
                  (r.name = 'AbortError');
              else
                try {
                  r = new DOMException('signal is aborted without reason');
                } catch (e) {
                  (r = new Error('This operation was aborted')),
                    (r.name = 'AbortError');
                }
            (this.signal.reason = r), this.signal.dispatchEvent(t);
          }
          toString() {
            return '[object AbortController]';
          }
        }
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          ((r.prototype[Symbol.toStringTag] = 'AbortController'),
          (t.prototype[Symbol.toStringTag] = 'AbortSignal')),
          (function (e) {
            (function (e) {
              return e.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL
                ? (console.log(
                    '__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill',
                  ),
                  !0)
                : ('function' == typeof e.Request &&
                    !e.Request.prototype.hasOwnProperty('signal')) ||
                    !e.AbortController;
            })(e) && ((e.AbortController = r), (e.AbortSignal = t));
          })(void 0 !== f ? f : global);
      })();
      !(function (e) {
        var t =
            (void 0 !== u && u) ||
            (void 0 !== f && f) ||
            ('undefined' != typeof global && global) ||
            {},
          r = 'URLSearchParams' in t,
          o = 'Symbol' in t && 'iterator' in Symbol,
          n =
            'FileReader' in t &&
            'Blob' in t &&
            (function () {
              try {
                return new Blob(), !0;
              } catch (e) {
                return !1;
              }
            })(),
          s = 'FormData' in t,
          a = 'ArrayBuffer' in t;
        if (a)
          var l = [
              '[object Int8Array]',
              '[object Uint8Array]',
              '[object Uint8ClampedArray]',
              '[object Int16Array]',
              '[object Uint16Array]',
              '[object Int32Array]',
              '[object Uint32Array]',
              '[object Float32Array]',
              '[object Float64Array]',
            ],
            d =
              ArrayBuffer.isView ||
              function (e) {
                return e && l.indexOf(Object.prototype.toString.call(e)) > -1;
              };
        function h(e) {
          if (
            ('string' != typeof e && (e = String(e)),
            /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || '' === e)
          )
            throw new TypeError(
              'Invalid character in header field name: "' + e + '"',
            );
          return e.toLowerCase();
        }
        function c(e) {
          return 'string' != typeof e && (e = String(e)), e;
        }
        function p(e) {
          var t = {
            next: function () {
              var t = e.shift();
              return { done: void 0 === t, value: t };
            },
          };
          return (
            o &&
              (t[Symbol.iterator] = function () {
                return t;
              }),
            t
          );
        }
        function y(e) {
          (this.map = {}),
            e instanceof y
              ? e.forEach(function (e, t) {
                  this.append(t, e);
                }, this)
              : Array.isArray(e)
                ? e.forEach(function (e) {
                    if (2 != e.length)
                      throw new TypeError(
                        'Headers constructor: expected name/value pair to be length 2, found' +
                          e.length,
                      );
                    this.append(e[0], e[1]);
                  }, this)
                : e &&
                  Object.getOwnPropertyNames(e).forEach(function (t) {
                    this.append(t, e[t]);
                  }, this);
        }
        function b(e) {
          if (!e._noBody)
            return e.bodyUsed
              ? i.reject(new TypeError('Already read'))
              : void (e.bodyUsed = !0);
        }
        function m(e) {
          return new i(function (t, r) {
            (e.onload = function () {
              t(e.result);
            }),
              (e.onerror = function () {
                r(e.error);
              });
          });
        }
        function w(e) {
          var t = new FileReader(),
            r = m(t);
          return t.readAsArrayBuffer(e), r;
        }
        function E(e) {
          if (e.slice) return e.slice(0);
          var t = new Uint8Array(e.byteLength);
          return t.set(new Uint8Array(e)), t.buffer;
        }
        function v() {
          return (
            (this.bodyUsed = !1),
            (this._initBody = function (e) {
              var t;
              (this.bodyUsed = this.bodyUsed),
                (this._bodyInit = e),
                e
                  ? 'string' == typeof e
                    ? (this._bodyText = e)
                    : n && Blob.prototype.isPrototypeOf(e)
                      ? (this._bodyBlob = e)
                      : s && FormData.prototype.isPrototypeOf(e)
                        ? (this._bodyFormData = e)
                        : r && URLSearchParams.prototype.isPrototypeOf(e)
                          ? (this._bodyText = e.toString())
                          : a &&
                              n &&
                              (t = e) &&
                              DataView.prototype.isPrototypeOf(t)
                            ? ((this._bodyArrayBuffer = E(e.buffer)),
                              (this._bodyInit = new Blob([
                                this._bodyArrayBuffer,
                              ])))
                            : a &&
                                (ArrayBuffer.prototype.isPrototypeOf(e) || d(e))
                              ? (this._bodyArrayBuffer = E(e))
                              : (this._bodyText = e =
                                  Object.prototype.toString.call(e))
                  : ((this._noBody = !0), (this._bodyText = '')),
                this.headers.get('content-type') ||
                  ('string' == typeof e
                    ? this.headers.set(
                        'content-type',
                        'text/plain;charset=UTF-8',
                      )
                    : this._bodyBlob && this._bodyBlob.type
                      ? this.headers.set('content-type', this._bodyBlob.type)
                      : r &&
                        URLSearchParams.prototype.isPrototypeOf(e) &&
                        this.headers.set(
                          'content-type',
                          'application/x-www-form-urlencoded;charset=UTF-8',
                        ));
            }),
            n &&
              (this.blob = function () {
                var e = b(this);
                if (e) return e;
                if (this._bodyBlob) return i.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer)
                  return i.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData)
                  throw new Error('could not read FormData body as blob');
                return i.resolve(new Blob([this._bodyText]));
              }),
            (this.arrayBuffer = function () {
              if (this._bodyArrayBuffer) {
                var e = b(this);
                return (
                  e ||
                  (ArrayBuffer.isView(this._bodyArrayBuffer)
                    ? i.resolve(
                        this._bodyArrayBuffer.buffer.slice(
                          this._bodyArrayBuffer.byteOffset,
                          this._bodyArrayBuffer.byteOffset +
                            this._bodyArrayBuffer.byteLength,
                        ),
                      )
                    : i.resolve(this._bodyArrayBuffer))
                );
              }
              if (n) return this.blob().then(w);
              throw new Error('could not read as ArrayBuffer');
            }),
            (this.text = function () {
              var e,
                t,
                r,
                o,
                n,
                s = b(this);
              if (s) return s;
              if (this._bodyBlob)
                return (
                  (e = this._bodyBlob),
                  (t = new FileReader()),
                  (r = m(t)),
                  (o = /charset=([A-Za-z0-9_-]+)/.exec(e.type)),
                  (n = o ? o[1] : 'utf-8'),
                  t.readAsText(e, n),
                  r
                );
              if (this._bodyArrayBuffer)
                return i.resolve(
                  (function (e) {
                    for (
                      var t = new Uint8Array(e), r = new Array(t.length), o = 0;
                      o < t.length;
                      o++
                    )
                      r[o] = String.fromCharCode(t[o]);
                    return r.join('');
                  })(this._bodyArrayBuffer),
                );
              if (this._bodyFormData)
                throw new Error('could not read FormData body as text');
              return i.resolve(this._bodyText);
            }),
            s &&
              (this.formData = function () {
                return this.text().then(_);
              }),
            (this.json = function () {
              return this.text().then(JSON.parse);
            }),
            this
          );
        }
        (y.prototype.append = function (e, t) {
          (e = h(e)), (t = c(t));
          var r = this.map[e];
          this.map[e] = r ? r + ', ' + t : t;
        }),
          (y.prototype.delete = function (e) {
            delete this.map[h(e)];
          }),
          (y.prototype.get = function (e) {
            return (e = h(e)), this.has(e) ? this.map[e] : null;
          }),
          (y.prototype.has = function (e) {
            return this.map.hasOwnProperty(h(e));
          }),
          (y.prototype.set = function (e, t) {
            this.map[h(e)] = c(t);
          }),
          (y.prototype.forEach = function (e, t) {
            for (var r in this.map)
              this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
          }),
          (y.prototype.keys = function () {
            var e = [];
            return (
              this.forEach(function (t, r) {
                e.push(r);
              }),
              p(e)
            );
          }),
          (y.prototype.values = function () {
            var e = [];
            return (
              this.forEach(function (t) {
                e.push(t);
              }),
              p(e)
            );
          }),
          (y.prototype.entries = function () {
            var e = [];
            return (
              this.forEach(function (t, r) {
                e.push([r, t]);
              }),
              p(e)
            );
          }),
          o && (y.prototype[Symbol.iterator] = y.prototype.entries);
        var g = [
          'CONNECT',
          'DELETE',
          'GET',
          'HEAD',
          'OPTIONS',
          'PATCH',
          'POST',
          'PUT',
          'TRACE',
        ];
        function A(e, r) {
          if (!(this instanceof A))
            throw new TypeError(
              'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
            );
          var o,
            n,
            i = (r = r || {}).body;
          if (e instanceof A) {
            if (e.bodyUsed) throw new TypeError('Already read');
            (this.url = e.url),
              (this.credentials = e.credentials),
              r.headers || (this.headers = new y(e.headers)),
              (this.method = e.method),
              (this.mode = e.mode),
              (this.signal = e.signal),
              i ||
                null == e._bodyInit ||
                ((i = e._bodyInit), (e.bodyUsed = !0));
          } else this.url = String(e);
          if (
            ((this.credentials =
              r.credentials || this.credentials || 'same-origin'),
            (!r.headers && this.headers) || (this.headers = new y(r.headers)),
            (this.method =
              ((o = r.method || this.method || 'GET'),
              (n = o.toUpperCase()),
              g.indexOf(n) > -1 ? n : o)),
            (this.mode = r.mode || this.mode || null),
            (this.signal =
              r.signal ||
              this.signal ||
              (function () {
                if ('AbortController' in t) return new AbortController().signal;
              })()),
            (this.referrer = null),
            ('GET' === this.method || 'HEAD' === this.method) && i)
          )
            throw new TypeError('Body not allowed for GET or HEAD requests');
          if (
            (this._initBody(i),
            !(
              ('GET' !== this.method && 'HEAD' !== this.method) ||
              ('no-store' !== r.cache && 'no-cache' !== r.cache)
            ))
          ) {
            var s = /([?&])_=[^&]*/;
            if (s.test(this.url))
              this.url = this.url.replace(s, '$1_=' + new Date().getTime());
            else {
              this.url +=
                (/\?/.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
            }
          }
        }
        function _(e) {
          var t = new FormData();
          return (
            e
              .trim()
              .split('&')
              .forEach(function (e) {
                if (e) {
                  var r = e.split('='),
                    o = r.shift().replace(/\+/g, ' '),
                    n = r.join('=').replace(/\+/g, ' ');
                  t.append(decodeURIComponent(o), decodeURIComponent(n));
                }
              }),
            t
          );
        }
        function x(e, t) {
          if (!(this instanceof x))
            throw new TypeError(
              'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
            );
          if (
            (t || (t = {}),
            (this.type = 'default'),
            (this.status = void 0 === t.status ? 200 : t.status),
            this.status < 200 || this.status > 599)
          )
            throw new RangeError(
              "Failed to construct 'Response': The status provided (0) is outside the range [200, 599].",
            );
          (this.ok = this.status >= 200 && this.status < 300),
            (this.statusText =
              void 0 === t.statusText ? '' : '' + t.statusText),
            (this.headers = new y(t.headers)),
            (this.url = t.url || ''),
            this._initBody(e);
        }
        (A.prototype.clone = function () {
          return new A(this, { body: this._bodyInit });
        }),
          v.call(A.prototype),
          v.call(x.prototype),
          (x.prototype.clone = function () {
            return new x(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new y(this.headers),
              url: this.url,
            });
          }),
          (x.error = function () {
            var e = new x(null, { status: 200, statusText: '' });
            return (e.ok = !1), (e.status = 0), (e.type = 'error'), e;
          });
        var T = [301, 302, 303, 307, 308];
        (x.redirect = function (e, t) {
          if (-1 === T.indexOf(t)) throw new RangeError('Invalid status code');
          return new x(null, { status: t, headers: { location: e } });
        }),
          (e.DOMException = t.DOMException);
        try {
          new e.DOMException();
        } catch (t) {
          (e.DOMException = function (e, t) {
            (this.message = e), (this.name = t);
            var r = Error(e);
            this.stack = r.stack;
          }),
            (e.DOMException.prototype = Object.create(Error.prototype)),
            (e.DOMException.prototype.constructor = e.DOMException);
        }
        function O(r, o) {
          return new i(function (i, s) {
            var u = new A(r, o);
            if (u.signal && u.signal.aborted)
              return s(new e.DOMException('Aborted', 'AbortError'));
            var f = new XMLHttpRequest();
            function l() {
              f.abort();
            }
            if (
              ((f.onload = function () {
                var e,
                  t,
                  r = {
                    statusText: f.statusText,
                    headers:
                      ((e = f.getAllResponseHeaders() || ''),
                      (t = new y()),
                      e
                        .replace(/\r?\n[\t ]+/g, ' ')
                        .split('\r')
                        .map(function (e) {
                          return 0 === e.indexOf('\n')
                            ? e.substr(1, e.length)
                            : e;
                        })
                        .forEach(function (e) {
                          var r = e.split(':'),
                            o = r.shift().trim();
                          if (o) {
                            var n = r.join(':').trim();
                            try {
                              t.append(o, n);
                            } catch (e) {
                              console.warn('Response ' + e.message);
                            }
                          }
                        }),
                      t),
                  };
                0 === u.url.indexOf('file://') &&
                (f.status < 200 || f.status > 599)
                  ? (r.status = 200)
                  : (r.status = f.status),
                  (r.url =
                    'responseURL' in f
                      ? f.responseURL
                      : r.headers.get('X-Request-URL'));
                var o = 'response' in f ? f.response : f.responseText;
                setTimeout(function () {
                  i(new x(o, r));
                }, 0);
              }),
              (f.onerror = function () {
                setTimeout(function () {
                  s(new TypeError('Network request failed'));
                }, 0);
              }),
              (f.ontimeout = function () {
                setTimeout(function () {
                  s(new TypeError('Network request timed out'));
                }, 0);
              }),
              (f.onabort = function () {
                setTimeout(function () {
                  s(new e.DOMException('Aborted', 'AbortError'));
                }, 0);
              }),
              f.open(
                u.method,
                (function (e) {
                  try {
                    return '' === e && t.location.href ? t.location.href : e;
                  } catch (t) {
                    return e;
                  }
                })(u.url),
                !0,
              ),
              'include' === u.credentials
                ? (f.withCredentials = !0)
                : 'omit' === u.credentials && (f.withCredentials = !1),
              'responseType' in f &&
                (n
                  ? (f.responseType = 'blob')
                  : a && (f.responseType = 'arraybuffer')),
              o &&
                'object' == typeof o.headers &&
                !(
                  o.headers instanceof y ||
                  (t.Headers && o.headers instanceof t.Headers)
                ))
            ) {
              var d = [];
              Object.getOwnPropertyNames(o.headers).forEach(function (e) {
                d.push(h(e)), f.setRequestHeader(e, c(o.headers[e]));
              }),
                u.headers.forEach(function (e, t) {
                  -1 === d.indexOf(t) && f.setRequestHeader(t, e);
                });
            } else
              u.headers.forEach(function (e, t) {
                f.setRequestHeader(t, e);
              });
            u.signal &&
              (u.signal.addEventListener('abort', l),
              (f.onreadystatechange = function () {
                4 === f.readyState && u.signal.removeEventListener('abort', l);
              })),
              f.send(void 0 === u._bodyInit ? null : u._bodyInit);
          });
        }
        (O.polyfill = !0),
          t.fetch ||
            ((t.fetch = O), (t.Headers = y), (t.Request = A), (t.Response = x)),
          (e.Headers = y),
          (e.Request = A),
          (e.Response = x),
          (e.fetch = O);
      })({});
      if (!u.fetch)
        throw new Error(
          'fetch is not defined - maybe your browser targets are not covering everything you need?',
        );
      var l = 0;
      function d(e) {
        return l--, e;
      }
      n.Test
        ? (n.Test.registerWaiter(function () {
            return 0 === l;
          }),
          (t.default = function () {
            return (
              l++,
              t.fetch.apply(e, arguments).then(
                function (e) {
                  return e.clone().blob().then(d, d), e;
                },
                function (e) {
                  throw (d(e), e);
                },
              )
            );
          }))
        : (t.default = t.fetch),
        s.forEach(function (e) {
          delete t[e];
        });
    });
  })(
    ('undefined' != typeof window && window) ||
      ('undefined' != typeof globalThis && globalThis) ||
      ('undefined' != typeof self && self) ||
      ('undefined' != typeof global && global),
  );
}
loader.makeDefaultExport = !1;
//# sourceMappingURL=vendor.map
