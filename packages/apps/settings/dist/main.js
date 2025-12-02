(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('._SettingsContainer_12j2h_1{width:100%;height:100%;position:sticky;top:0;left:0}._Settings_12j2h_1{--tabs-width: 10rem;flex:1;display:flex;width:100%;height:100%;background-color:var(--background-color-2)}._Tabs_12j2h_19{display:flex;gap:.25rem;flex-direction:column;min-width:calc(var(--tabs-width) / 2);width:var(--tabs-width);height:100%;max-width:50%;padding:.5rem;margin:0;background-color:var(--background-color-2);resize:horizontal;overflow:hidden}._TabButton_12j2h_34{display:flex;gap:.5rem;align-items:center;width:100%;min-width:fit-content;padding:.75rem;border-radius:var(--border-radius-1);font-size:.875rem}._TabButton_12j2h_34._ActiveTab_12j2h_45{background-color:var(--background-color-0)}._TabButton_12j2h_34:not(._ActiveTab_12j2h_45):hover,._TabButton_12j2h_34:not(._ActiveTab_12j2h_45):focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 50%,transparent)}._TabButton_12j2h_34>svg{height:1.35rem;aspect-ratio:1}._TabButton_12j2h_34>p{margin:0}._TabPanel_12j2h_63{flex:1;display:flex;flex-direction:column;align-content:flex-start;height:100%;padding:.5rem 1rem;background-color:var(--background-color-3);overflow:auto}._TabPanel_12j2h_63:not(._ActivePanel_12j2h_74){display:none}._Option_12j2h_78{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;text-align:start;width:100%;padding-bottom:1rem}._OptionList_12j2h_88{gap:.5rem}._OptionList_12j2h_88 ._Option_12j2h_78{padding-bottom:0}._OptionHorizontal_12j2h_96{flex-direction:row;justify-content:space-between}._Option_12j2h_78>._Label_12j2h_101{color:var(--foreground-color-0)}._Input_12j2h_105{display:flex;gap:.5rem;flex-wrap:wrap}._Input_12j2h_105>label{flex:1;display:flex}._ImageSelectContainer_12j2h_116{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:.5rem}._ImageSelect_12j2h_116{display:block;width:100%}._ImageSelect_12j2h_116>input{position:absolute;opacity:0;width:0;height:0}._ImageSelect_12j2h_116>input:hover+img,._ImageSelect_12j2h_116>input:focus-visible+img{filter:brightness(110%)}._ImageSelect_12j2h_116>input:checked+img{outline:.25em solid var(--foreground-color-0)}._ImageSelect_12j2h_116>img{width:100%;height:100%;border-radius:var(--border-radius-1);transition:filter var(--transition-duration-0) var(--ease-in-out-default);cursor:pointer}._ButtonGroup_12j2h_151{display:flex;gap:1rem;flex-wrap:wrap;margin:.75rem 0}._ButtonGroup_12j2h_151 ._Button_12j2h_151{margin-bottom:0}._Button_12j2h_151{--normal-color: var(--background-color-0) !important;--hover-color: var(--background-color-1) !important;margin-bottom:.75rem!important;padding:.5rem 1rem;border-radius:var(--border-radius-1)}._ButtonDanger_12j2h_171{--text-color: var(--black-1) !important;--normal-color: var(--red-0) !important;--hover-color: var(--red-1) !important}._IconButton_12j2h_177{--color: var(--foreground-color-0);position:relative;height:1.25rem;width:auto;padding:0;background:none;border:none;outline:none;aspect-ratio:1;cursor:pointer}._IconButton_12j2h_177:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff0;border-radius:var(--border-radius-99);transform:scale(1);transform-origin:center;transition:all var(--transition-duration-1) var(--ease-in-out-default)}._IconButton_12j2h_177:hover:after,._IconButton_12j2h_177:focus-visible:after{background-color:#ffffff1a;transform:scale(1.5)}._IconButton_12j2h_177:disabled{--color: var(--foreground-color-2)}._IconButton_12j2h_177 svg{height:100%}._IconButton_12j2h_177 svg path{fill:var(--color);transition:fill var(--transition-duration-0) var(--ease-in-out-default)}._ProgressBarContainer_12j2h_223{width:100%;max-width:35rem}._ProgressBar_12j2h_223{width:100%!important}._ProgressBarLabels_12j2h_232{display:flex;justify-content:space-between;width:100%}._Option_12j2h_78>span._Label_12j2h_101{display:flex;gap:.5rem;align-items:center}._Icon_12j2h_177{display:inline-block;width:2rem;height:2rem}._Icon_12j2h_177 div{width:inherit;height:inherit}._Icon_12j2h_177 div>svg{width:inherit;height:inherit;object-fit:contain}._Dropdown_12j2h_261{width:auto;max-width:calc(60% - var(--gap));padding:.5rem 1rem;color:var(--text-color);background-color:var(--background-color-0);border:none;border-radius:var(--border-radius-1);outline:none;font-size:.875em}._Dropdown_12j2h_261>*{color:inherit;background-color:inherit;border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}')),document.head.appendChild(o)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
import { App as bt, AppsConfig as mt, useVirtualRoot as we, useWindowsManager as Ye, useSystemManager as me, useHistory as Ot, useAlert as At, useWindowedModal as ht, useContextMenu as Me, Actions as Fe, ClickAction as re, Vector2 as be, Divider as Rt, VirtualRoot as Je, DialogBox as Ze, ModalsConfig as Qe, DirectoryList as $t, CODE_EXTENSIONS as jt, utilStyles as H, WindowedModal as Bt, ImagePreview as Ue, StorageManager as ue, VirtualFile as Lt, useSettingsManager as qe, SettingsManager as Ee, Button as Se, IMAGE_EXTENSIONS as kt, ProgressBar as Dt } from "@prozilla-os/core";
import { jsxs as x, jsx as s, Fragment as vt } from "react/jsx-runtime";
import { FontAwesomeIcon as X } from "@fortawesome/react-fontawesome";
import { faUpload as Mt, faTrash as et, faCircleInfo as yt, faCaretLeft as Ft, faCaretRight as Ut, faArrowUp as zt, faPlus as Wt, faSearch as Yt, faCog as qt, faHouse as Vt, faDesktop as Kt, faImage as Ht, faFileLines as Gt, faDownload as Xt, faThumbTack as Jt, faEllipsisVertical as Zt, faShapes as Qt, faPalette as en, faHardDrive as tn } from "@fortawesome/free-solid-svg-icons";
import pe, { Children as gt, cloneElement as _e, useRef as Te, useId as nn, useState as te, useEffect as se, useCallback as rn } from "react";
import { Theme as tt } from "@prozilla-os/skins";
import { round as Ae, removeFromArray as on } from "@prozilla-os/shared";
const an = "_SettingsContainer_12j2h_1", sn = "_Settings_12j2h_1", ln = "_Tabs_12j2h_19", cn = "_TabButton_12j2h_34", un = "_ActiveTab_12j2h_45", dn = "_TabPanel_12j2h_63", fn = "_ActivePanel_12j2h_74", pn = "_Option_12j2h_78", bn = "_OptionList_12j2h_88", mn = "_OptionHorizontal_12j2h_96", hn = "_Label_12j2h_101", vn = "_Input_12j2h_105", yn = "_ImageSelectContainer_12j2h_116", gn = "_ImageSelect_12j2h_116", _n = "_ButtonGroup_12j2h_151", Tn = "_Button_12j2h_151", xn = "_ButtonDanger_12j2h_171", En = "_IconButton_12j2h_177", Sn = "_ProgressBarContainer_12j2h_223", Cn = "_ProgressBar_12j2h_223", Pn = "_ProgressBarLabels_12j2h_232", wn = "_Icon_12j2h_177", Nn = "_Dropdown_12j2h_261", E = {
  SettingsContainer: an,
  Settings: sn,
  Tabs: ln,
  TabButton: cn,
  ActiveTab: un,
  TabPanel: dn,
  ActivePanel: fn,
  Option: pn,
  OptionList: bn,
  OptionHorizontal: mn,
  Label: hn,
  Input: vn,
  ImageSelectContainer: yn,
  ImageSelect: gn,
  ButtonGroup: _n,
  Button: Tn,
  ButtonDanger: xn,
  IconButton: En,
  ProgressBarContainer: Sn,
  ProgressBar: Cn,
  ProgressBarLabels: Pn,
  Icon: wn,
  Dropdown: Nn
};
function In(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ze = { exports: {} }, ye = { exports: {} }, D = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nt;
function On() {
  if (nt) return D;
  nt = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, l = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, h = e ? Symbol.for("react.provider") : 60109, i = e ? Symbol.for("react.context") : 60110, y = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, C = e ? Symbol.for("react.suspense") : 60113, k = e ? Symbol.for("react.suspense_list") : 60120, P = e ? Symbol.for("react.memo") : 60115, N = e ? Symbol.for("react.lazy") : 60116, S = e ? Symbol.for("react.block") : 60121, F = e ? Symbol.for("react.fundamental") : 60117, q = e ? Symbol.for("react.responder") : 60118, Q = e ? Symbol.for("react.scope") : 60119;
  function z(u) {
    if (typeof u == "object" && u !== null) {
      var ee = u.$$typeof;
      switch (ee) {
        case n:
          switch (u = u.type, u) {
            case y:
            case v:
            case r:
            case a:
            case l:
            case C:
              return u;
            default:
              switch (u = u && u.$$typeof, u) {
                case i:
                case d:
                case N:
                case P:
                case h:
                  return u;
                default:
                  return ee;
              }
          }
        case t:
          return ee;
      }
    }
  }
  function U(u) {
    return z(u) === v;
  }
  return D.AsyncMode = y, D.ConcurrentMode = v, D.ContextConsumer = i, D.ContextProvider = h, D.Element = n, D.ForwardRef = d, D.Fragment = r, D.Lazy = N, D.Memo = P, D.Portal = t, D.Profiler = a, D.StrictMode = l, D.Suspense = C, D.isAsyncMode = function(u) {
    return U(u) || z(u) === y;
  }, D.isConcurrentMode = U, D.isContextConsumer = function(u) {
    return z(u) === i;
  }, D.isContextProvider = function(u) {
    return z(u) === h;
  }, D.isElement = function(u) {
    return typeof u == "object" && u !== null && u.$$typeof === n;
  }, D.isForwardRef = function(u) {
    return z(u) === d;
  }, D.isFragment = function(u) {
    return z(u) === r;
  }, D.isLazy = function(u) {
    return z(u) === N;
  }, D.isMemo = function(u) {
    return z(u) === P;
  }, D.isPortal = function(u) {
    return z(u) === t;
  }, D.isProfiler = function(u) {
    return z(u) === a;
  }, D.isStrictMode = function(u) {
    return z(u) === l;
  }, D.isSuspense = function(u) {
    return z(u) === C;
  }, D.isValidElementType = function(u) {
    return typeof u == "string" || typeof u == "function" || u === r || u === v || u === a || u === l || u === C || u === k || typeof u == "object" && u !== null && (u.$$typeof === N || u.$$typeof === P || u.$$typeof === h || u.$$typeof === i || u.$$typeof === d || u.$$typeof === F || u.$$typeof === q || u.$$typeof === Q || u.$$typeof === S);
  }, D.typeOf = z, D;
}
var M = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rt;
function An() {
  return rt || (rt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, l = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, h = e ? Symbol.for("react.provider") : 60109, i = e ? Symbol.for("react.context") : 60110, y = e ? Symbol.for("react.async_mode") : 60111, v = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, C = e ? Symbol.for("react.suspense") : 60113, k = e ? Symbol.for("react.suspense_list") : 60120, P = e ? Symbol.for("react.memo") : 60115, N = e ? Symbol.for("react.lazy") : 60116, S = e ? Symbol.for("react.block") : 60121, F = e ? Symbol.for("react.fundamental") : 60117, q = e ? Symbol.for("react.responder") : 60118, Q = e ? Symbol.for("react.scope") : 60119;
    function z(c) {
      return typeof c == "string" || typeof c == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      c === r || c === v || c === a || c === l || c === C || c === k || typeof c == "object" && c !== null && (c.$$typeof === N || c.$$typeof === P || c.$$typeof === h || c.$$typeof === i || c.$$typeof === d || c.$$typeof === F || c.$$typeof === q || c.$$typeof === Q || c.$$typeof === S);
    }
    function U(c) {
      if (typeof c == "object" && c !== null) {
        var Z = c.$$typeof;
        switch (Z) {
          case n:
            var ve = c.type;
            switch (ve) {
              case y:
              case v:
              case r:
              case a:
              case l:
              case C:
                return ve;
              default:
                var Xe = ve && ve.$$typeof;
                switch (Xe) {
                  case i:
                  case d:
                  case N:
                  case P:
                  case h:
                    return Xe;
                  default:
                    return Z;
                }
            }
          case t:
            return Z;
        }
      }
    }
    var u = y, ee = v, ne = i, le = h, ce = n, J = d, oe = r, ae = N, m = P, f = t, g = a, w = l, j = C, V = !1;
    function G(c) {
      return V || (V = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), o(c) || U(c) === y;
    }
    function o(c) {
      return U(c) === v;
    }
    function p(c) {
      return U(c) === i;
    }
    function A(c) {
      return U(c) === h;
    }
    function O(c) {
      return typeof c == "object" && c !== null && c.$$typeof === n;
    }
    function _(c) {
      return U(c) === d;
    }
    function R(c) {
      return U(c) === r;
    }
    function T(c) {
      return U(c) === N;
    }
    function I(c) {
      return U(c) === P;
    }
    function B(c) {
      return U(c) === t;
    }
    function L(c) {
      return U(c) === a;
    }
    function $(c) {
      return U(c) === l;
    }
    function Y(c) {
      return U(c) === C;
    }
    M.AsyncMode = u, M.ConcurrentMode = ee, M.ContextConsumer = ne, M.ContextProvider = le, M.Element = ce, M.ForwardRef = J, M.Fragment = oe, M.Lazy = ae, M.Memo = m, M.Portal = f, M.Profiler = g, M.StrictMode = w, M.Suspense = j, M.isAsyncMode = G, M.isConcurrentMode = o, M.isContextConsumer = p, M.isContextProvider = A, M.isElement = O, M.isForwardRef = _, M.isFragment = R, M.isLazy = T, M.isMemo = I, M.isPortal = B, M.isProfiler = L, M.isStrictMode = $, M.isSuspense = Y, M.isValidElementType = z, M.typeOf = U;
  }()), M;
}
var ot;
function _t() {
  return ot || (ot = 1, process.env.NODE_ENV === "production" ? ye.exports = On() : ye.exports = An()), ye.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Re, at;
function Rn() {
  if (at) return Re;
  at = 1;
  var e = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function r(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function l() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var h = {}, i = 0; i < 10; i++)
        h["_" + String.fromCharCode(i)] = i;
      var y = Object.getOwnPropertyNames(h).map(function(d) {
        return h[d];
      });
      if (y.join("") !== "0123456789")
        return !1;
      var v = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        v[d] = d;
      }), Object.keys(Object.assign({}, v)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Re = l() ? Object.assign : function(a, h) {
    for (var i, y = r(a), v, d = 1; d < arguments.length; d++) {
      i = Object(arguments[d]);
      for (var C in i)
        n.call(i, C) && (y[C] = i[C]);
      if (e) {
        v = e(i);
        for (var k = 0; k < v.length; k++)
          t.call(i, v[k]) && (y[v[k]] = i[v[k]]);
      }
    }
    return y;
  }, Re;
}
var $e, it;
function Ve() {
  if (it) return $e;
  it = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return $e = e, $e;
}
var je, st;
function Tt() {
  return st || (st = 1, je = Function.call.bind(Object.prototype.hasOwnProperty)), je;
}
var Be, lt;
function $n() {
  if (lt) return Be;
  lt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = Ve(), t = {}, r = Tt();
    e = function(a) {
      var h = "Warning: " + a;
      typeof console < "u" && console.error(h);
      try {
        throw new Error(h);
      } catch {
      }
    };
  }
  function l(a, h, i, y, v) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in a)
        if (r(a, d)) {
          var C;
          try {
            if (typeof a[d] != "function") {
              var k = Error(
                (y || "React class") + ": " + i + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw k.name = "Invariant Violation", k;
            }
            C = a[d](h, d, y, i, null, n);
          } catch (N) {
            C = N;
          }
          if (C && !(C instanceof Error) && e(
            (y || "React class") + ": type specification of " + i + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof C + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), C instanceof Error && !(C.message in t)) {
            t[C.message] = !0;
            var P = v ? v() : "";
            e(
              "Failed " + i + " type: " + C.message + (P ?? "")
            );
          }
        }
    }
  }
  return l.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, Be = l, Be;
}
var Le, ct;
function jn() {
  if (ct) return Le;
  ct = 1;
  var e = _t(), n = Rn(), t = Ve(), r = Tt(), l = $n(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(i) {
    var y = "Warning: " + i;
    typeof console < "u" && console.error(y);
    try {
      throw new Error(y);
    } catch {
    }
  });
  function h() {
    return null;
  }
  return Le = function(i, y) {
    var v = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function C(o) {
      var p = o && (v && o[v] || o[d]);
      if (typeof p == "function")
        return p;
    }
    var k = "<<anonymous>>", P = {
      array: q("array"),
      bigint: q("bigint"),
      bool: q("boolean"),
      func: q("function"),
      number: q("number"),
      object: q("object"),
      string: q("string"),
      symbol: q("symbol"),
      any: Q(),
      arrayOf: z,
      element: U(),
      elementType: u(),
      instanceOf: ee,
      node: J(),
      objectOf: le,
      oneOf: ne,
      oneOfType: ce,
      shape: ae,
      exact: m
    };
    function N(o, p) {
      return o === p ? o !== 0 || 1 / o === 1 / p : o !== o && p !== p;
    }
    function S(o, p) {
      this.message = o, this.data = p && typeof p == "object" ? p : {}, this.stack = "";
    }
    S.prototype = Error.prototype;
    function F(o) {
      if (process.env.NODE_ENV !== "production")
        var p = {}, A = 0;
      function O(R, T, I, B, L, $, Y) {
        if (B = B || k, $ = $ || I, Y !== t) {
          if (y) {
            var c = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw c.name = "Invariant Violation", c;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Z = B + ":" + I;
            !p[Z] && // Avoid spamming the console because they are often not actionable except for lib authors
            A < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + $ + "` prop on `" + B + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), p[Z] = !0, A++);
          }
        }
        return T[I] == null ? R ? T[I] === null ? new S("The " + L + " `" + $ + "` is marked as required " + ("in `" + B + "`, but its value is `null`.")) : new S("The " + L + " `" + $ + "` is marked as required in " + ("`" + B + "`, but its value is `undefined`.")) : null : o(T, I, B, L, $);
      }
      var _ = O.bind(null, !1);
      return _.isRequired = O.bind(null, !0), _;
    }
    function q(o) {
      function p(A, O, _, R, T, I) {
        var B = A[O], L = w(B);
        if (L !== o) {
          var $ = j(B);
          return new S(
            "Invalid " + R + " `" + T + "` of type " + ("`" + $ + "` supplied to `" + _ + "`, expected ") + ("`" + o + "`."),
            { expectedType: o }
          );
        }
        return null;
      }
      return F(p);
    }
    function Q() {
      return F(h);
    }
    function z(o) {
      function p(A, O, _, R, T) {
        if (typeof o != "function")
          return new S("Property `" + T + "` of component `" + _ + "` has invalid PropType notation inside arrayOf.");
        var I = A[O];
        if (!Array.isArray(I)) {
          var B = w(I);
          return new S("Invalid " + R + " `" + T + "` of type " + ("`" + B + "` supplied to `" + _ + "`, expected an array."));
        }
        for (var L = 0; L < I.length; L++) {
          var $ = o(I, L, _, R, T + "[" + L + "]", t);
          if ($ instanceof Error)
            return $;
        }
        return null;
      }
      return F(p);
    }
    function U() {
      function o(p, A, O, _, R) {
        var T = p[A];
        if (!i(T)) {
          var I = w(T);
          return new S("Invalid " + _ + " `" + R + "` of type " + ("`" + I + "` supplied to `" + O + "`, expected a single ReactElement."));
        }
        return null;
      }
      return F(o);
    }
    function u() {
      function o(p, A, O, _, R) {
        var T = p[A];
        if (!e.isValidElementType(T)) {
          var I = w(T);
          return new S("Invalid " + _ + " `" + R + "` of type " + ("`" + I + "` supplied to `" + O + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return F(o);
    }
    function ee(o) {
      function p(A, O, _, R, T) {
        if (!(A[O] instanceof o)) {
          var I = o.name || k, B = G(A[O]);
          return new S("Invalid " + R + " `" + T + "` of type " + ("`" + B + "` supplied to `" + _ + "`, expected ") + ("instance of `" + I + "`."));
        }
        return null;
      }
      return F(p);
    }
    function ne(o) {
      if (!Array.isArray(o))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), h;
      function p(A, O, _, R, T) {
        for (var I = A[O], B = 0; B < o.length; B++)
          if (N(I, o[B]))
            return null;
        var L = JSON.stringify(o, function(Y, c) {
          var Z = j(c);
          return Z === "symbol" ? String(c) : c;
        });
        return new S("Invalid " + R + " `" + T + "` of value `" + String(I) + "` " + ("supplied to `" + _ + "`, expected one of " + L + "."));
      }
      return F(p);
    }
    function le(o) {
      function p(A, O, _, R, T) {
        if (typeof o != "function")
          return new S("Property `" + T + "` of component `" + _ + "` has invalid PropType notation inside objectOf.");
        var I = A[O], B = w(I);
        if (B !== "object")
          return new S("Invalid " + R + " `" + T + "` of type " + ("`" + B + "` supplied to `" + _ + "`, expected an object."));
        for (var L in I)
          if (r(I, L)) {
            var $ = o(I, L, _, R, T + "." + L, t);
            if ($ instanceof Error)
              return $;
          }
        return null;
      }
      return F(p);
    }
    function ce(o) {
      if (!Array.isArray(o))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), h;
      for (var p = 0; p < o.length; p++) {
        var A = o[p];
        if (typeof A != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + V(A) + " at index " + p + "."
          ), h;
      }
      function O(_, R, T, I, B) {
        for (var L = [], $ = 0; $ < o.length; $++) {
          var Y = o[$], c = Y(_, R, T, I, B, t);
          if (c == null)
            return null;
          c.data && r(c.data, "expectedType") && L.push(c.data.expectedType);
        }
        var Z = L.length > 0 ? ", expected one of type [" + L.join(", ") + "]" : "";
        return new S("Invalid " + I + " `" + B + "` supplied to " + ("`" + T + "`" + Z + "."));
      }
      return F(O);
    }
    function J() {
      function o(p, A, O, _, R) {
        return f(p[A]) ? null : new S("Invalid " + _ + " `" + R + "` supplied to " + ("`" + O + "`, expected a ReactNode."));
      }
      return F(o);
    }
    function oe(o, p, A, O, _) {
      return new S(
        (o || "React class") + ": " + p + " type `" + A + "." + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + _ + "`."
      );
    }
    function ae(o) {
      function p(A, O, _, R, T) {
        var I = A[O], B = w(I);
        if (B !== "object")
          return new S("Invalid " + R + " `" + T + "` of type `" + B + "` " + ("supplied to `" + _ + "`, expected `object`."));
        for (var L in o) {
          var $ = o[L];
          if (typeof $ != "function")
            return oe(_, R, T, L, j($));
          var Y = $(I, L, _, R, T + "." + L, t);
          if (Y)
            return Y;
        }
        return null;
      }
      return F(p);
    }
    function m(o) {
      function p(A, O, _, R, T) {
        var I = A[O], B = w(I);
        if (B !== "object")
          return new S("Invalid " + R + " `" + T + "` of type `" + B + "` " + ("supplied to `" + _ + "`, expected `object`."));
        var L = n({}, A[O], o);
        for (var $ in L) {
          var Y = o[$];
          if (r(o, $) && typeof Y != "function")
            return oe(_, R, T, $, j(Y));
          if (!Y)
            return new S(
              "Invalid " + R + " `" + T + "` key `" + $ + "` supplied to `" + _ + "`.\nBad object: " + JSON.stringify(A[O], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(o), null, "  ")
            );
          var c = Y(I, $, _, R, T + "." + $, t);
          if (c)
            return c;
        }
        return null;
      }
      return F(p);
    }
    function f(o) {
      switch (typeof o) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !o;
        case "object":
          if (Array.isArray(o))
            return o.every(f);
          if (o === null || i(o))
            return !0;
          var p = C(o);
          if (p) {
            var A = p.call(o), O;
            if (p !== o.entries) {
              for (; !(O = A.next()).done; )
                if (!f(O.value))
                  return !1;
            } else
              for (; !(O = A.next()).done; ) {
                var _ = O.value;
                if (_ && !f(_[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function g(o, p) {
      return o === "symbol" ? !0 : p ? p["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && p instanceof Symbol : !1;
    }
    function w(o) {
      var p = typeof o;
      return Array.isArray(o) ? "array" : o instanceof RegExp ? "object" : g(p, o) ? "symbol" : p;
    }
    function j(o) {
      if (typeof o > "u" || o === null)
        return "" + o;
      var p = w(o);
      if (p === "object") {
        if (o instanceof Date)
          return "date";
        if (o instanceof RegExp)
          return "regexp";
      }
      return p;
    }
    function V(o) {
      var p = j(o);
      switch (p) {
        case "array":
        case "object":
          return "an " + p;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + p;
        default:
          return p;
      }
    }
    function G(o) {
      return !o.constructor || !o.constructor.name ? k : o.constructor.name;
    }
    return P.checkPropTypes = l, P.resetWarningCache = l.resetWarningCache, P.PropTypes = P, P;
  }, Le;
}
var ke, ut;
function Bn() {
  if (ut) return ke;
  ut = 1;
  var e = Ve();
  function n() {
  }
  function t() {
  }
  return t.resetWarningCache = n, ke = function() {
    function r(h, i, y, v, d, C) {
      if (C !== e) {
        var k = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw k.name = "Invariant Violation", k;
      }
    }
    r.isRequired = r;
    function l() {
      return r;
    }
    var a = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: l,
      element: r,
      elementType: r,
      instanceOf: l,
      node: r,
      objectOf: l,
      oneOf: l,
      oneOfType: l,
      shape: l,
      exact: l,
      checkPropTypes: t,
      resetWarningCache: n
    };
    return a.PropTypes = a, a;
  }, ke;
}
if (process.env.NODE_ENV !== "production") {
  var Ln = _t(), kn = !0;
  ze.exports = jn()(Ln.isElement, kn);
} else
  ze.exports = Bn()();
var Dn = ze.exports;
const b = /* @__PURE__ */ In(Dn);
function Ke(e) {
  return (n) => !!n.type && n.type.tabsRole === e;
}
const he = Ke("Tab"), Ne = Ke("TabList"), Ie = Ke("TabPanel");
function Mn(e) {
  return he(e) || Ne(e) || Ie(e);
}
function We(e, n) {
  return gt.map(e, (t) => t === null ? null : Mn(t) ? n(t) : t.props && t.props.children && typeof t.props.children == "object" ? _e(t, { ...t.props, children: We(t.props.children, n) }) : t);
}
function Ce(e, n) {
  return gt.forEach(e, (t) => {
    t !== null && (he(t) || Ie(t) ? n(t) : t.props && t.props.children && typeof t.props.children == "object" && (Ne(t) && n(t), Ce(t.props.children, n)));
  });
}
function xt(e, n, t) {
  let r, l = 0, a = 0, h = !1;
  const i = [], y = e[n];
  return Ce(y, (v) => {
    Ne(v) && (v.props && v.props.children && typeof v.props.children == "object" && Ce(v.props.children, (d) => i.push(d)), h && (r = new Error("Found multiple 'TabList' components inside 'Tabs'. Only one is allowed.")), h = !0), he(v) ? ((!h || i.indexOf(v) === -1) && (r = new Error("Found a 'Tab' component outside of the 'TabList' component. 'Tab' components have to be inside the 'TabList' component.")), l++) : Ie(v) && a++;
  }), !r && l !== a && (r = new Error(`There should be an equal number of 'Tab' and 'TabPanel' in \`${t}\`. Received ${l} 'Tab' and ${a} 'TabPanel'.`)), r;
}
function Fn(e, n, t, r, l) {
  const a = e[n], h = l || n;
  let i = null;
  return a && typeof a != "function" ? i = new Error(`Invalid ${r} \`${h}\` of type \`${typeof a}\` supplied to \`${t}\`, expected \`function\`.`) : e.selectedIndex != null && a == null && (i = new Error(`The ${r} \`${h}\` is marked as required in \`${t}\`, but its value is \`undefined\` or \`null\`.
\`onSelect\` is required when \`selectedIndex\` is also set. Not doing so will make the tabs not do anything, as \`selectedIndex\` indicates that you want to handle the selected tab yourself.
If you only want to set the inital tab replace \`selectedIndex\` with \`defaultIndex\`.`)), i;
}
function Un(e, n, t, r, l) {
  const a = e[n], h = l || n;
  let i = null;
  if (a != null && typeof a != "number")
    i = new Error(`Invalid ${r} \`${h}\` of type \`${typeof a}\` supplied to \`${t}\`, expected \`number\`.`);
  else if (e.defaultIndex != null && a != null)
    return new Error(`The ${r} \`${h}\` cannot be used together with \`defaultIndex\` in \`${t}\`.
Either remove \`${h}\` to let \`${t}\` handle the selected tab internally or remove \`defaultIndex\` to handle it yourself.`);
  return i;
}
function Et(e) {
  var n, t, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (n = 0; n < l; n++) e[n] && (t = Et(e[n])) && (r && (r += " "), r += t);
  } else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function Oe() {
  for (var e, n, t = 0, r = "", l = arguments.length; t < l; t++) (e = arguments[t]) && (n = Et(e)) && (r && (r += " "), r += n);
  return r;
}
function St(e) {
  let n = 0;
  return Ce(e, (t) => {
    he(t) && n++;
  }), n;
}
function Ct(e) {
  return e && "getAttribute" in e;
}
function dt(e) {
  return Ct(e) && e.getAttribute("data-rttab");
}
function ie(e) {
  return Ct(e) && e.getAttribute("aria-disabled") === "true";
}
let Pe;
function zn(e) {
  const n = e || (typeof window < "u" ? window : void 0);
  try {
    Pe = !!(typeof n < "u" && n.document && n.document.activeElement);
  } catch {
    Pe = !1;
  }
}
const Wn = { className: "react-tabs", focus: !1 }, Yn = process.env.NODE_ENV !== "production" ? { children: xt, direction: b.oneOf(["rtl", "ltr"]), className: b.oneOfType([b.string, b.array, b.object]), disabledTabClassName: b.string, disableUpDownKeys: b.bool, disableLeftRightKeys: b.bool, domRef: b.func, focus: b.bool, forceRenderTabPanel: b.bool, onSelect: b.func.isRequired, selectedIndex: b.number.isRequired, selectedTabClassName: b.string, selectedTabPanelClassName: b.string, environment: b.object } : {}, Pt = (e) => {
  let n = Te([]), t = Te([]);
  const r = Te();
  function l(m, f) {
    if (m < 0 || m >= v()) return;
    const { onSelect: g, selectedIndex: w } = e;
    g(m, w, f);
  }
  function a(m) {
    const f = v();
    for (let g = m + 1; g < f; g++)
      if (!ie(d(g)))
        return g;
    for (let g = 0; g < m; g++)
      if (!ie(d(g)))
        return g;
    return m;
  }
  function h(m) {
    let f = m;
    for (; f--; )
      if (!ie(d(f)))
        return f;
    for (f = v(); f-- > m; )
      if (!ie(d(f)))
        return f;
    return m;
  }
  function i() {
    const m = v();
    for (let f = 0; f < m; f++)
      if (!ie(d(f)))
        return f;
    return null;
  }
  function y() {
    let m = v();
    for (; m--; )
      if (!ie(d(m)))
        return m;
    return null;
  }
  function v() {
    const { children: m } = e;
    return St(m);
  }
  function d(m) {
    return n.current[`tabs-${m}`];
  }
  function C() {
    let m = 0;
    const { children: f, disabledTabClassName: g, focus: w, forceRenderTabPanel: j, selectedIndex: V, selectedTabClassName: G, selectedTabPanelClassName: o, environment: p } = e;
    t.current = t.current || [];
    let A = t.current.length - v();
    const O = nn();
    for (; A++ < 0; )
      t.current.push(`${O}${t.current.length}`);
    return We(f, (_) => {
      let R = _;
      if (Ne(_)) {
        let T = 0, I = !1;
        Pe == null && zn(p);
        const B = p || (typeof window < "u" ? window : void 0);
        Pe && B && (I = pe.Children.toArray(_.props.children).filter(he).some((L, $) => B.document.activeElement === d($))), R = _e(_, { children: We(_.props.children, (L) => {
          const $ = `tabs-${T}`, Y = V === T, c = { tabRef: (Z) => {
            n.current[$] = Z;
          }, id: t.current[T], selected: Y, focus: Y && (w || I) };
          return G && (c.selectedClassName = G), g && (c.disabledClassName = g), T++, _e(L, c);
        }) });
      } else if (Ie(_)) {
        const T = { id: t.current[m], selected: V === m };
        j && (T.forceRender = j), o && (T.selectedClassName = o), m++, R = _e(_, T);
      }
      return R;
    });
  }
  function k(m) {
    const { direction: f, disableUpDownKeys: g, disableLeftRightKeys: w } = e;
    if (N(m.target)) {
      let { selectedIndex: j } = e, V = !1, G = !1;
      (m.code === "Space" || m.keyCode === 32 || m.code === "Enter" || m.keyCode === 13) && (V = !0, G = !1, P(m)), !w && (m.keyCode === 37 || m.code === "ArrowLeft") || !g && (m.keyCode === 38 || m.code === "ArrowUp") ? (f === "rtl" ? j = a(j) : j = h(j), V = !0, G = !0) : !w && (m.keyCode === 39 || m.code === "ArrowRight") || !g && (m.keyCode === 40 || m.code === "ArrowDown") ? (f === "rtl" ? j = h(j) : j = a(j), V = !0, G = !0) : m.keyCode === 35 || m.code === "End" ? (j = y(), V = !0, G = !0) : (m.keyCode === 36 || m.code === "Home") && (j = i(), V = !0, G = !0), V && m.preventDefault(), G && l(j, m);
    }
  }
  function P(m) {
    let f = m.target;
    do
      if (N(f)) {
        if (ie(f))
          return;
        const g = [].slice.call(f.parentNode.children).filter(dt).indexOf(f);
        l(g, m);
        return;
      }
    while ((f = f.parentNode) != null);
  }
  function N(m) {
    if (!dt(m))
      return !1;
    let f = m.parentElement;
    do {
      if (f === r.current) return !0;
      if (f.getAttribute("data-rttabs")) break;
      f = f.parentElement;
    } while (f);
    return !1;
  }
  const { children: S, className: F, disabledTabClassName: q, domRef: Q, focus: z, forceRenderTabPanel: U, onSelect: u, selectedIndex: ee, selectedTabClassName: ne, selectedTabPanelClassName: le, environment: ce, disableUpDownKeys: J, disableLeftRightKeys: oe, ...ae } = { ...Wn, ...e };
  return pe.createElement("div", Object.assign({}, ae, { className: Oe(F), onClick: P, onKeyDown: k, ref: (m) => {
    r.current = m, Q && Q(m);
  }, "data-rttabs": !0 }), C());
};
Pt.propTypes = process.env.NODE_ENV !== "production" ? Yn : {};
const qn = 0, xe = 1, Vn = process.env.NODE_ENV !== "production" ? { children: xt, className: b.oneOfType([b.string, b.array, b.object]), defaultFocus: b.bool, defaultIndex: b.number, direction: b.oneOf(["rtl", "ltr"]), disabledTabClassName: b.string, disableUpDownKeys: b.bool, disableLeftRightKeys: b.bool, domRef: b.func, environment: b.object, focusTabOnClick: b.bool, forceRenderTabPanel: b.bool, onSelect: Fn, selectedIndex: Un, selectedTabClassName: b.string, selectedTabPanelClassName: b.string } : {}, Kn = { defaultFocus: !1, focusTabOnClick: !0, forceRenderTabPanel: !1, selectedIndex: null, defaultIndex: null, environment: null, disableUpDownKeys: !1, disableLeftRightKeys: !1 }, wt = (e) => e.selectedIndex === null ? xe : qn, Hn = (e, n) => {
  if (process.env.NODE_ENV !== "production" && n != null && n !== wt(e))
    throw new Error("Switching between controlled mode (by using `selectedIndex`) and uncontrolled mode is not supported in `Tabs`.\nFor more information about controlled and uncontrolled mode of react-tabs see https://github.com/reactjs/react-tabs#controlled-vs-uncontrolled-mode.");
}, He = (e) => {
  const { children: n, defaultFocus: t, defaultIndex: r, focusTabOnClick: l, onSelect: a, ...h } = { ...Kn, ...e }, [i, y] = te(t), [v] = te(wt(h)), [d, C] = te(v === xe ? r || 0 : null);
  if (se(() => {
    y(!1);
  }, []), v === xe) {
    const N = St(n);
    se(() => {
      if (d != null) {
        const S = Math.max(0, N - 1);
        C(Math.min(d, S));
      }
    }, [N]);
  }
  Hn(h, v);
  const k = (N, S, F) => {
    typeof a == "function" && a(N, S, F) === !1 || (l && y(!0), v === xe && C(N));
  };
  let P = { ...e, ...h };
  return P.focus = i, P.onSelect = k, d != null && (P.selectedIndex = d), delete P.defaultFocus, delete P.defaultIndex, delete P.focusTabOnClick, pe.createElement(Pt, P, n);
};
He.propTypes = process.env.NODE_ENV !== "production" ? Vn : {};
He.tabsRole = "Tabs";
const Gn = { className: "react-tabs__tab-list" }, Xn = process.env.NODE_ENV !== "production" ? { children: b.oneOfType([b.object, b.array]), className: b.oneOfType([b.string, b.array, b.object]) } : {}, Ge = (e) => {
  const { children: n, className: t, ...r } = { ...Gn, ...e };
  return pe.createElement("ul", Object.assign({}, r, { className: Oe(t), role: "tablist" }), n);
};
Ge.tabsRole = "TabList";
Ge.propTypes = process.env.NODE_ENV !== "production" ? Xn : {};
const De = "react-tabs__tab", Jn = { className: De, disabledClassName: `${De}--disabled`, focus: !1, id: null, selected: !1, selectedClassName: `${De}--selected` }, Zn = process.env.NODE_ENV !== "production" ? { children: b.oneOfType([b.array, b.object, b.string]), className: b.oneOfType([b.string, b.array, b.object]), disabled: b.bool, disabledClassName: b.string, focus: b.bool, id: b.string, selected: b.bool, selectedClassName: b.string, tabIndex: b.string, tabRef: b.func } : {}, de = (e) => {
  let n = Te();
  const { children: t, className: r, disabled: l, disabledClassName: a, focus: h, id: i, selected: y, selectedClassName: v, tabIndex: d, tabRef: C, ...k } = { ...Jn, ...e };
  return se(() => {
    y && h && n.current.focus();
  }, [y, h]), pe.createElement("li", Object.assign({}, k, { className: Oe(r, { [v]: y, [a]: l }), ref: (P) => {
    n.current = P, C && C(P);
  }, role: "tab", id: `tab${i}`, "aria-selected": y ? "true" : "false", "aria-disabled": l ? "true" : "false", "aria-controls": `panel${i}`, tabIndex: d || (y ? "0" : null), "data-rttab": !0 }), t);
};
de.propTypes = process.env.NODE_ENV !== "production" ? Zn : {};
de.tabsRole = "Tab";
const ft = "react-tabs__tab-panel", Qn = { className: ft, forceRender: !1, selectedClassName: `${ft}--selected` }, er = process.env.NODE_ENV !== "production" ? { children: b.node, className: b.oneOfType([b.string, b.array, b.object]), forceRender: b.bool, id: b.string, selected: b.bool, selectedClassName: b.string } : {}, fe = (e) => {
  const { children: n, className: t, forceRender: r, id: l, selected: a, selectedClassName: h, ...i } = { ...Qn, ...e };
  return pe.createElement("div", Object.assign({}, i, { className: Oe(t, { [h]: a }), role: "tabpanel", id: `panel${l}`, "aria-labelledby": `tab${l}` }), r || a ? n : null);
};
fe.tabsRole = "TabPanel";
fe.propTypes = process.env.NODE_ENV !== "production" ? er : {};
(function() {
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode('._FileExplorer_lr5mr_1{--header-height: 3.5rem;--sidebar-width: 10rem;--footer-height: 1.75rem;--scale: 1.15rem;display:flex;flex-direction:column;width:100%;height:100%}._Header_lr5mr_13{display:flex;gap:1rem;align-items:center;width:100%;height:var(--header-height);padding:1rem;background-color:var(--background-color-0)}._IconButton_lr5mr_23{--color: var(--foreground-color-0);position:relative;height:1.25rem;width:auto;padding:0;background:none;border:none;outline:none;aspect-ratio:1;cursor:pointer}._IconButton_lr5mr_23:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff0;border-radius:var(--border-radius-99);transform:scale(1);transform-origin:center;transition:all var(--transition-duration-1) var(--ease-in-out-default)}._IconButton_lr5mr_23:hover:after,._IconButton_lr5mr_23:focus-visible:after{background-color:#ffffff1a;transform:scale(1.5)}._IconButton_lr5mr_23:disabled{--color: var(--background-color-1)}._IconButton_lr5mr_23 svg{height:100%}._IconButton_lr5mr_23 svg path{fill:var(--color);transition:fill var(--transition-duration-0) var(--ease-in-out-default)}._PathInput_lr5mr_69{flex:1;padding:.25rem .5rem;background-color:var(--background-color-2);border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._Body_lr5mr_80{flex:1;display:flex;width:100%;height:calc(100% - var(--header-height));background-color:var(--background-color-2)}._Sidebar_lr5mr_88{display:flex;gap:.25rem;flex-direction:column;min-width:calc(var(--sidebar-width) / 2);width:var(--sidebar-width);height:100%;max-width:50%;padding:.5rem;background-color:var(--background-color-1);resize:horizontal;overflow:hidden}._NavButton_lr5mr_102{display:flex;gap:.5rem;align-items:center;width:100%;padding:.5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;cursor:pointer;transition:background-color var(--transition-duration-0) var(--ease-in-out-default)}._NavButton_lr5mr_102:hover,._NavButton_lr5mr_102:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._NavButton_lr5mr_102 svg{height:1.35rem;aspect-ratio:1}._Main_lr5mr_125{--scale: inherit !important;position:relative;flex:1;display:flex;flex-wrap:wrap;align-content:flex-start;height:100%;padding:.5rem;padding-bottom:calc(.5rem + var(--footer-height));overflow:auto}._Footer_lr5mr_139{position:absolute;display:flex;justify-content:flex-start;align-items:center;bottom:0;left:0;width:100%;height:var(--footer-height);padding:0 .75rem;border-top:.25rem solid var(--background-color-0);background-color:var(--background-color-2)}._Footer_lr5mr_139 p{margin:0;font-size:.875em}._Selector_lr5mr_158{--footer-height: 4rem}._FileProperties_xi8b6_1{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;padding:1rem}._Icon_xi8b6_9{width:3rem;height:3rem}._Icon_xi8b6_9 div{width:inherit;height:inherit;object-fit:contain}._Icon_xi8b6_9 svg{max-width:100%;max-height:100%}._Section_xi8b6_25{--divider-width: .25rem;position:relative;display:flex;gap:.25rem;justify-content:flex-start;align-items:flex-start;flex-direction:column;width:100%;padding:1rem 0;padding-bottom:calc(1rem + var(--divider-width))}._Section_xi8b6_25:first-child{gap:.5rem;align-items:center;flex-direction:row;padding-top:0}._Section_xi8b6_25:first-child ._Line_xi8b6_46{font-size:1.25rem}._Section_xi8b6_25:not(:last-child):after{content:"";position:absolute;bottom:0;left:0;width:100%;height:var(--divider-width);border-radius:var(--border-radius-0);background-color:var(--background-color-0)}._Line_xi8b6_46{margin:0;text-align:left;padding-left:2rem;text-indent:-2rem}._AppIcon_xi8b6_68{display:inline-block;width:2rem;height:2rem;vertical-align:middle;margin-left:.5rem;margin-right:.25rem}._AppIcon_xi8b6_68 div{position:relative;width:inherit;height:inherit;object-fit:contain}._AppIcon_xi8b6_68 svg{position:absolute;top:0;left:0;max-width:100%;max-height:100%}')), document.head.appendChild(e);
    }
  } catch (n) {
    console.error("vite-plugin-css-injected-by-js", n);
  }
})();
const tr = "_FileExplorer_lr5mr_1", nr = "_Header_lr5mr_13", rr = "_IconButton_lr5mr_23", or = "_PathInput_lr5mr_69", ar = "_Body_lr5mr_80", ir = "_Sidebar_lr5mr_88", sr = "_NavButton_lr5mr_102", lr = "_Main_lr5mr_125", cr = "_Footer_lr5mr_139", ur = "_Selector_lr5mr_158", W = {
  FileExplorer: tr,
  Header: nr,
  IconButton: rr,
  PathInput: or,
  Body: ar,
  Sidebar: ir,
  NavButton: sr,
  Main: lr,
  Footer: cr,
  Selector: ur
};
function ge({ onClick: e, icon: n, name: t }) {
  return /* @__PURE__ */ x(
    "button",
    {
      tabIndex: 0,
      className: `${W.NavButton} ${H.TextSemibold}`,
      onClick: e,
      children: [
        /* @__PURE__ */ s(X, { icon: n }),
        t
      ]
    }
  );
}
function dr({ directory: e }) {
  const n = (t) => {
    const r = t.target.files;
    r != null && Array.from(r).forEach((l) => {
      const { name: a, extension: h } = Lt.splitId(l.name), i = new FileReader();
      i.onload = (y) => {
        const { result: v } = y.target;
        e.createFile(a, h, (d) => {
          d.setSource(v);
        });
      }, i.readAsDataURL(l);
    });
  };
  return /* @__PURE__ */ x("label", { title: "Import", tabIndex: 0, className: W.IconButton, children: [
    /* @__PURE__ */ s(
      "input",
      {
        type: "file",
        id: "import",
        multiple: !0,
        style: { display: "none" },
        onChange: n
      }
    ),
    /* @__PURE__ */ s(X, { icon: Xt })
  ] });
}
const pt = {
  NONE: 0,
  SINGLE: 1,
  MULTIPLE: 2
}, fr = "_FileProperties_xi8b6_1", pr = "_Icon_xi8b6_9", br = "_Section_xi8b6_25", mr = "_Line_xi8b6_46", hr = "_AppIcon_xi8b6_68", K = {
  FileProperties: fr,
  Icon: pr,
  Section: br,
  Line: mr,
  AppIcon: hr
};
function vr({ modal: e, params: n, file: t, ...r }) {
  const { appsConfig: l } = me(), a = t.extension != null ? l.getAppByFileExtension(t.extension) : null;
  return /* @__PURE__ */ x(Bt, { className: K.FileProperties, modal: e, params: n, ...r, children: [
    /* @__PURE__ */ x("span", { className: K.Section, children: [
      /* @__PURE__ */ s(Ue, { className: K.Icon, source: t.getIconUrl() }),
      /* @__PURE__ */ s("p", { className: `${K.Line} ${H.TextBold}`, children: t.id })
    ] }),
    /* @__PURE__ */ x("span", { className: K.Section, children: [
      /* @__PURE__ */ x("p", { className: K.Line, children: [
        "Type: ",
        t.getType()
      ] }),
      a != null && /* @__PURE__ */ x("span", { className: K.Line, children: [
        "Opens with:",
        /* @__PURE__ */ s(Ue, { className: K.AppIcon, source: a.iconUrl ?? "" }),
        a.name
      ] })
    ] }),
    /* @__PURE__ */ x("span", { className: K.Section, children: [
      /* @__PURE__ */ x("p", { className: K.Line, children: [
        "Location: ",
        t.path
      ] }),
      /* @__PURE__ */ x("p", { className: K.Line, children: [
        "Size: ",
        ue.getByteSize(t.source ?? t.content),
        " bytes"
      ] }),
      /* @__PURE__ */ x("p", { className: K.Line, children: [
        "Size on drive: ",
        ue.getByteSize(t.toString()),
        " bytes"
      ] })
    ] }),
    /* @__PURE__ */ s("span", { className: K.Section, children: /* @__PURE__ */ x("p", { className: K.Line, children: [
      "Attributes: ",
      t.isProtected ? "Protected" : "N/A"
    ] }) })
  ] });
}
function yr({ app: e, path: n, selectorMode: t, Footer: r, onSelectionChange: l, onSelectionFinish: a }) {
  const h = r != null && t != null && t !== pt.NONE, i = we(), y = Ye(), { windowsConfig: v } = me(), [d, C] = te(i == null ? void 0 : i.navigate(n ?? "~")), [k, P] = te((d == null ? void 0 : d.path) ?? ""), [N] = te(!0), { history: S, stateIndex: F, pushState: q, undo: Q, redo: z, undoAvailable: U, redoAvailable: u } = Ot(d.path), { alert: ee } = At(), { openWindowedModal: ne } = ht(), { onContextMenu: le } = Me({
    Actions: (f) => {
      var g;
      return /* @__PURE__ */ x(Fe, { ...f, children: [
        /* @__PURE__ */ s(re, { label: h ? "Select" : "Open", onTrigger: (w, j) => {
          if (h) {
            l == null || l({ files: [j.id], directory: d }), a == null || a();
            return;
          }
          y != null && j.open(y);
        } }),
        ((g = f.triggerParams) == null ? void 0 : g.isDownloadable()) && /* @__PURE__ */ s(re, { label: "Export", icon: Mt, onTrigger: (w, j) => {
          j.download();
        } }),
        /* @__PURE__ */ s(re, { label: "Delete", icon: et, onTrigger: (w, j) => {
          j.delete();
        } }),
        /* @__PURE__ */ s(re, { label: "Properties", icon: yt, onTrigger: (w, j) => {
          ne({
            title: `${j.id} ${v.titleSeparator} Properties`,
            iconUrl: j.getIconUrl(),
            size: new be(400, 500),
            Modal: (V) => /* @__PURE__ */ s(vr, { file: j, ...V })
          });
        } })
      ] });
    }
  }), { onContextMenu: ce } = Me({
    Actions: (f) => /* @__PURE__ */ x(Fe, { ...f, children: [
      /* @__PURE__ */ s(re, { label: "Open", onTrigger: (g, w) => {
        J(w.linkedPath ?? w.name);
      } }),
      /* @__PURE__ */ s(Rt, {}),
      /* @__PURE__ */ s(re, { label: "Delete", icon: et, onTrigger: (g, w) => {
        w.delete();
      } })
    ] })
  }), J = rn((f, g = !1) => {
    if (f == null)
      return;
    d == null && (g = !0);
    const w = g ? i == null ? void 0 : i.navigate(f) : d.navigate(f);
    w != null && (C(w), P(w.root ? "/" : w.path), q(w.path));
  }, [d, q, i]);
  se(() => {
    if (S.length === 0)
      return;
    const f = S[F], g = i == null ? void 0 : i.navigate(f);
    g != null && (C(g), P(g.root ? "/" : g.path));
  }, [S, F, i]), se(() => {
    const f = (g) => {
      ee({
        title: g.message,
        text: "You have exceeded the virtual drive capacity. Files and folders will not be saved until more storage is freed.",
        iconUrl: e == null ? void 0 : e.iconUrl,
        size: new be(300, 200),
        single: !0
      });
    };
    return i == null || i.on(Je.EVENT_NAMES.error, f), () => {
      i == null || i.off(Je.EVENT_NAMES.error, f);
    };
  }, []);
  const oe = (f) => {
    P(f.target.value);
  }, ae = (f) => {
    let g = f.target.value;
    if (f.key === "Enter") {
      g === "" && (g = "~");
      const w = i == null ? void 0 : i.navigate(g);
      if (w == null) {
        ne({
          title: "Error",
          iconUrl: e == null ? void 0 : e.iconUrl,
          size: new be(300, 150),
          Modal: (j) => /* @__PURE__ */ x(Ze, { ...j, children: [
            /* @__PURE__ */ x("p", { children: [
              'Invalid path: "',
              g,
              '"'
            ] }),
            /* @__PURE__ */ s("button", { "data-type": Qe.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
          ] })
        });
        return;
      }
      C(w), P(w.root ? "/" : w.path);
    }
  }, m = d.getItemCount(N);
  return /* @__PURE__ */ x("div", { className: h ? `${W.FileExplorer} ${W.Selector}` : W.FileExplorer, children: [
    /* @__PURE__ */ x("div", { className: W.Header, children: [
      /* @__PURE__ */ s(
        "button",
        {
          title: "Back",
          tabIndex: 0,
          className: W.IconButton,
          onClick: () => {
            Q();
          },
          disabled: !U,
          children: /* @__PURE__ */ s(X, { icon: Ft })
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          title: "Forward",
          tabIndex: 0,
          className: W.IconButton,
          onClick: () => {
            z();
          },
          disabled: !u,
          children: /* @__PURE__ */ s(X, { icon: Ut })
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          title: "Up",
          tabIndex: 0,
          className: W.IconButton,
          onClick: () => {
            J("..");
          },
          disabled: d.isRoot != null && d.isRoot,
          children: /* @__PURE__ */ s(X, { icon: zt })
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          title: "New",
          tabIndex: 0,
          className: W.IconButton,
          onClick: () => {
            ne({
              title: "Error",
              iconUrl: e == null ? void 0 : e.iconUrl,
              size: new be(300, 150),
              Modal: (f) => /* @__PURE__ */ x(Ze, { ...f, children: [
                /* @__PURE__ */ s("p", { children: "This folder is protected." }),
                /* @__PURE__ */ s("button", { "data-type": Qe.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
              ] })
            });
          },
          disabled: !d.canBeEdited,
          children: /* @__PURE__ */ s(X, { icon: Wt })
        }
      ),
      /* @__PURE__ */ s(
        "input",
        {
          value: k,
          type: "text",
          "aria-label": "Path",
          className: W.PathInput,
          tabIndex: 0,
          onChange: oe,
          onKeyDown: ae,
          placeholder: "Enter a path..."
        }
      ),
      /* @__PURE__ */ s(dr, { directory: d }),
      /* @__PURE__ */ s("button", { title: "Search", tabIndex: 0, className: W.IconButton, children: /* @__PURE__ */ s(X, { icon: Yt }) }),
      /* @__PURE__ */ s("button", { title: "Settings", tabIndex: 0, className: W.IconButton, children: /* @__PURE__ */ s(X, { icon: qt }) })
    ] }),
    /* @__PURE__ */ x("div", { className: W.Body, children: [
      /* @__PURE__ */ x("div", { className: W.Sidebar, children: [
        /* @__PURE__ */ s(ge, { name: "Home", onClick: () => {
          J("~");
        }, icon: Vt }),
        /* @__PURE__ */ s(ge, { name: "Desktop", onClick: () => {
          J("~/Desktop");
        }, icon: Kt }),
        /* @__PURE__ */ s(ge, { name: "Images", onClick: () => {
          J("~/Pictures");
        }, icon: Ht }),
        /* @__PURE__ */ s(ge, { name: "Documents", onClick: () => {
          J("~/Documents");
        }, icon: Gt })
      ] }),
      /* @__PURE__ */ s(
        $t,
        {
          directory: d,
          id: "main",
          className: W.Main,
          showHidden: N,
          onOpenFile: (f, g) => {
            if (f.preventDefault(), h)
              return void (a == null ? void 0 : a());
            const w = {};
            (g.extension === "md" || g.extension != null && jt.includes(g.extension)) && (w.mode = "view"), y == null || y.openFile(g, w);
          },
          onOpenFolder: (f, g) => {
            J(g.linkedPath ?? g.name);
          },
          onContextMenuFile: le,
          onContextMenuFolder: ce,
          allowMultiSelect: t !== pt.SINGLE,
          onSelectionChange: l
        }
      )
    ] }),
    h ? /* @__PURE__ */ s("div", { className: W.Footer, children: /* @__PURE__ */ s(r, {}) }) : /* @__PURE__ */ s("span", { className: W.Footer, children: /* @__PURE__ */ s("p", { className: H.TextLight, children: m === 1 ? m + " item" : m + " items" }) })
  ] });
}
var Nt = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.Single = 1] = "Single", e[e.Multi = 2] = "Multi", e))(Nt || {});
const It = new bt("File Explorer", "file-explorer", yr).setIconUrl("https://os.prozilla.dev/assets/apps/icons/file-explorer.svg").setRole(mt.APP_ROLES.fileExplorer).setCategory("Utilities & tools");
It.setMetadata({ name: "@prozilla-os/file-explorer", version: "1.1.17", author: "Prozilla" });
const gr = "~/Pictures/Wallpapers";
function _r() {
  var k, P;
  const { modalsConfig: e } = me(), n = we(), t = qe(), [r, l] = te(tt.Dark), [a, h] = te(null), i = t == null ? void 0 : t.getSettings(Ee.VIRTUAL_PATHS.desktop), y = t == null ? void 0 : t.getSettings(Ee.VIRTUAL_PATHS.theme), { openWindowedModal: v } = ht();
  se(() => {
    i == null || i.get("wallpaper", h), y == null || y.get("theme", (N) => {
      l(parseInt(N));
    });
  }, [i, y]);
  const d = (N) => {
    const S = N.target.value;
    i == null || i.set("wallpaper", S);
  }, C = (N) => {
    const S = N.target.value;
    y == null || y.set("theme", S);
  };
  return /* @__PURE__ */ x(vt, { children: [
    /* @__PURE__ */ x("div", { className: E.Option, children: [
      /* @__PURE__ */ s("p", { className: E.Label, children: "Theme" }),
      /* @__PURE__ */ s("div", { className: E.Input, children: /* @__PURE__ */ s("select", { className: E.Dropdown, "aria-label": "theme", value: r, onChange: C, children: Object.entries(tt).map(
        ([N, S]) => /* @__PURE__ */ s("option", { value: N, children: S }, N)
      ) }) })
    ] }),
    /* @__PURE__ */ x("div", { className: E.Option, children: [
      /* @__PURE__ */ s("p", { className: E.Label, children: "Wallpaper" }),
      /* @__PURE__ */ s(
        Se,
        {
          className: `${E.Button} ${H.TextBold}`,
          onClick: () => {
            v({
              size: e.defaultFileSelectorSize,
              Modal: (N) => /* @__PURE__ */ s(
                It.WindowContent,
                {
                  type: Nt.Single,
                  allowedFormats: kt,
                  onFinish: (S) => {
                    S.source != null && (i == null || i.set("wallpaper", S.source));
                  },
                  ...N
                }
              )
            });
          },
          children: "Browse"
        }
      ),
      /* @__PURE__ */ s("div", { className: `${E.Input} ${E.ImageSelectContainer}`, children: (P = (k = n == null ? void 0 : n.navigate(gr)) == null ? void 0 : k.getFiles()) == null ? void 0 : P.map(
        ({ id: N, source: S }) => /* @__PURE__ */ x("label", { className: E.ImageSelect, children: [
          /* @__PURE__ */ s(
            "input",
            {
              type: "radio",
              value: S ?? "",
              "aria-label": "Wallpaper image",
              checked: S === a,
              onChange: d,
              tabIndex: 0
            }
          ),
          /* @__PURE__ */ s("img", { src: S ?? "", alt: N, draggable: "false" })
        ] }, N)
      ) })
    ] })
  ] });
}
function Tr() {
  const { systemName: e } = me(), n = Ye(), t = we();
  return /* @__PURE__ */ x("div", { className: E.Option, children: [
    /* @__PURE__ */ x("p", { className: E.Label, children: [
      "About ",
      e
    ] }),
    /* @__PURE__ */ x("p", { className: H.TextLight, children: [
      e,
      " is a web-based operating system inspired by Ubuntu Linux and Windows made with React.js by Prozilla."
    ] }),
    /* @__PURE__ */ x("div", { className: E.ButtonGroup, children: [
      /* @__PURE__ */ s(
        Se,
        {
          className: `${E.Button} ${H.TextBold}`,
          onClick: (r) => {
            r.preventDefault(), n == null || n.open("text-editor", {
              mode: "view",
              file: t == null ? void 0 : t.navigate("~/Documents/Info.md"),
              size: new be(575, 675)
            });
          },
          children: "Open Info.md"
        }
      ),
      /* @__PURE__ */ s(
        Se,
        {
          className: `${E.Button} ${H.TextBold}`,
          href: "https://github.com/prozilla-os/ProzillaOS",
          children: "View source"
        }
      )
    ] })
  ] });
}
function xr() {
  const e = we(), n = ue.MAX_BYTES, t = ue.getByteSize((e == null ? void 0 : e.toString()) ?? ""), r = ue.byteToKilobyte(n), l = ue.byteToKilobyte(t), a = r - l;
  return /* @__PURE__ */ x(vt, { children: [
    /* @__PURE__ */ x("div", { className: `${E.Option} ${E.ProgressBarContainer}`, children: [
      /* @__PURE__ */ x("p", { className: E.Label, children: [
        "Virtual Drive (",
        Ae(r, 1),
        " KB)"
      ] }),
      /* @__PURE__ */ s(Dt, { fillPercentage: l / r * 100, className: E.ProgressBar }),
      /* @__PURE__ */ x("span", { className: E.ProgressBarLabels, children: [
        /* @__PURE__ */ x("p", { className: H.TextLight, children: [
          Ae(l, 1),
          " KB used"
        ] }),
        /* @__PURE__ */ x("p", { className: H.TextLight, children: [
          Ae(a, 1),
          " KB free"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ x("div", { className: E.Option, children: [
      /* @__PURE__ */ s("p", { className: E.Label, children: "Manage data" }),
      /* @__PURE__ */ s(
        Se,
        {
          className: `${E.Button} ${E.ButtonDanger} ${H.TextBold}`,
          onClick: () => {
            e == null || e.reset();
          },
          children: "Reset"
        }
      )
    ] })
  ] });
}
function Er({ app: e, pins: n, setPins: t }) {
  const r = n.includes(e.id), l = qe(), a = Ye(), { onContextMenu: h } = Me({
    Actions: (i) => /* @__PURE__ */ x(Fe, { ...i, children: [
      /* @__PURE__ */ s(re, { label: "Launch", icon: e.iconUrl, onTrigger: () => a == null ? void 0 : a.open(e.id) }),
      /* @__PURE__ */ s(re, { label: r ? "Unpin from taskbar" : "Pin to taskbar", icon: Jt, onTrigger: () => {
        const y = [...n];
        r ? on(e.id, n) : y.push(e.id);
        const v = l == null ? void 0 : l.getSettings(Ee.VIRTUAL_PATHS.taskbar);
        v == null || v.set("pins", y.join(","));
      } })
    ] })
  });
  return /* @__PURE__ */ x("div", { className: `${E.Option} ${E.OptionHorizontal}`, children: [
    /* @__PURE__ */ x("span", { className: E.Label, children: [
      /* @__PURE__ */ s(Ue, { className: E.Icon, source: e.iconUrl }),
      e.name
    ] }),
    /* @__PURE__ */ s("button", { className: E.IconButton, onClick: h, children: /* @__PURE__ */ s(X, { icon: Zt }) })
  ] });
}
function Sr() {
  const { appsConfig: e } = me(), n = qe(), [t, r] = te([]);
  return se(() => {
    const l = n == null ? void 0 : n.getSettings(Ee.VIRTUAL_PATHS.taskbar);
    l == null || l.get("pins", (a) => {
      r(a.split(","));
    });
  }, [n]), /* @__PURE__ */ x("div", { className: `${E.Option} ${E.OptionList}`, children: [
    /* @__PURE__ */ s("p", { className: E.Label, children: "Apps" }),
    e.apps.sort(
      (l, a) => l.name.toLowerCase().localeCompare(a.name.toLowerCase())
    ).map(
      (l) => /* @__PURE__ */ s(Er, { app: l, pins: t, setPins: r }, l.id)
    )
  ] });
}
function Cr({ tab: e }) {
  return /* @__PURE__ */ s("div", { className: E.SettingsContainer, children: /* @__PURE__ */ x(
    He,
    {
      defaultIndex: e ?? 0,
      className: E.Settings,
      selectedTabClassName: E.ActiveTab,
      selectedTabPanelClassName: E.ActivePanel,
      children: [
        /* @__PURE__ */ x(Ge, { className: E.Tabs, children: [
          /* @__PURE__ */ x(de, { className: E.TabButton, tabIndex: "0", children: [
            /* @__PURE__ */ s(X, { icon: Qt }),
            /* @__PURE__ */ s("p", { className: H.TextSemibold, children: "Apps" })
          ] }),
          /* @__PURE__ */ x(de, { className: E.TabButton, tabIndex: "0", children: [
            /* @__PURE__ */ s(X, { icon: en }),
            /* @__PURE__ */ s("p", { className: H.TextSemibold, children: "Appearance" })
          ] }),
          /* @__PURE__ */ x(de, { className: E.TabButton, tabIndex: "0", children: [
            /* @__PURE__ */ s(X, { icon: tn }),
            /* @__PURE__ */ s("p", { className: H.TextSemibold, children: "Storage" })
          ] }),
          /* @__PURE__ */ x(de, { className: E.TabButton, tabIndex: "0", children: [
            /* @__PURE__ */ s(X, { icon: yt }),
            /* @__PURE__ */ s("p", { className: H.TextSemibold, children: "About" })
          ] })
        ] }),
        /* @__PURE__ */ s(fe, { className: E.TabPanel, children: /* @__PURE__ */ s(Sr, {}) }),
        /* @__PURE__ */ s(fe, { className: E.TabPanel, children: /* @__PURE__ */ s(_r, {}) }),
        /* @__PURE__ */ s(fe, { className: E.TabPanel, children: /* @__PURE__ */ s(xr, {}) }),
        /* @__PURE__ */ s(fe, { className: E.TabPanel, children: /* @__PURE__ */ s(Tr, {}) })
      ]
    }
  ) });
}
const Pr = new bt("Settings", "settings", Cr).setIconUrl("https://os.prozilla.dev/assets/apps/icons/settings.svg").setRole(mt.APP_ROLES.settings).setCategory("Personalization");
Pr.setMetadata({ name: "@prozilla-os/settings", version: "1.1.17", author: "Prozilla" });
export {
  Pr as settings
};
//# sourceMappingURL=main.js.map
