import { App as Hn, AppsConfig as Lt, useVirtualRoot as Nr, useWindowsManager as qn, useSystemManager as Ft, useHistory as Mr, useAlert as Rr, useWindowedModal as Lr, useContextMenu as Jt, Actions as Qt, ClickAction as Ae, Vector2 as Be, Divider as Fr, VirtualRoot as Zt, DialogBox as en, ModalsConfig as tn, DirectoryList as zr, CODE_EXTENSIONS as jr, utilStyles as zt, WindowedModal as Dr, ImagePreview as nn, StorageManager as rn, VirtualFile as Yr, MEDIA_EXTENSIONS as Gn, AUDIO_EXTENSIONS as an, VIDEO_EXTENSIONS as on, IMAGE_EXTENSIONS as $r } from "@prozilla-os/core";
export * from "@prozilla-os/core";
import { jsxs as W, jsx as b } from "react/jsx-runtime";
import Xn, { useState as at, useCallback as Ur, useEffect as Xe, useRef as sn } from "react";
export * from "@prozilla-os/terminal";
export * from "@prozilla-os/text-editor";
export * from "@prozilla-os/settings";
export * from "@prozilla-os/browser";
export * from "@prozilla-os/calculator";
export * from "@prozilla-os/app-center";
const ln = () => {
};
let jt = {}, Kn = {}, Jn = null, Qn = {
  mark: ln,
  measure: ln
};
try {
  typeof window < "u" && (jt = window), typeof document < "u" && (Kn = document), typeof MutationObserver < "u" && (Jn = MutationObserver), typeof performance < "u" && (Qn = performance);
} catch {
}
const {
  userAgent: cn = ""
} = jt.navigator || {}, de = jt, U = Kn, fn = Jn, We = Qn;
de.document;
const ce = !!U.documentElement && !!U.head && typeof U.addEventListener == "function" && typeof U.createElement == "function", Zn = ~cn.indexOf("MSIE") || ~cn.indexOf("Trident/");
var B = "classic", er = "duotone", X = "sharp", K = "sharp-duotone", Br = [B, er, X, K], Wr = {
  classic: {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  sharp: {
    900: "fass",
    400: "fasr",
    300: "fasl",
    100: "fast"
  },
  "sharp-duotone": {
    900: "fasds"
  }
}, un = {
  kit: {
    fak: "kit",
    "fa-kit": "kit"
  },
  "kit-duotone": {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
  }
}, Vr = ["kit"], Hr = /fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/, qr = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i, Gr = {
  "Font Awesome 5 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 5 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal"
  },
  "Font Awesome 5 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 5 Duotone": {
    900: "fad"
  }
}, Xr = {
  "Font Awesome 6 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 6 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  "Font Awesome 6 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 6 Duotone": {
    900: "fad"
  },
  "Font Awesome 6 Sharp": {
    900: "fass",
    400: "fasr",
    normal: "fasr",
    300: "fasl",
    100: "fast"
  },
  "Font Awesome 6 Sharp Duotone": {
    900: "fasds"
  }
}, Kr = {
  classic: {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  },
  sharp: {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl",
    "fa-thin": "fast"
  },
  "sharp-duotone": {
    "fa-solid": "fasds"
  }
}, Jr = {
  classic: ["fas", "far", "fal", "fat"],
  sharp: ["fass", "fasr", "fasl", "fast"],
  "sharp-duotone": ["fasds"]
}, Qr = {
  classic: {
    fab: "fa-brands",
    fad: "fa-duotone",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  },
  sharp: {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light",
    fast: "fa-thin"
  },
  "sharp-duotone": {
    fasds: "fa-solid"
  }
}, Zr = {
  classic: {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    duotone: "fad",
    brands: "fab"
  },
  sharp: {
    solid: "fass",
    regular: "fasr",
    light: "fasl",
    thin: "fast"
  },
  "sharp-duotone": {
    solid: "fasds"
  }
}, tr = {
  classic: {
    fa: "solid",
    fas: "solid",
    "fa-solid": "solid",
    far: "regular",
    "fa-regular": "regular",
    fal: "light",
    "fa-light": "light",
    fat: "thin",
    "fa-thin": "thin",
    fad: "duotone",
    "fa-duotone": "duotone",
    fab: "brands",
    "fa-brands": "brands"
  },
  sharp: {
    fa: "solid",
    fass: "solid",
    "fa-solid": "solid",
    fasr: "regular",
    "fa-regular": "regular",
    fasl: "light",
    "fa-light": "light",
    fast: "thin",
    "fa-thin": "thin"
  },
  "sharp-duotone": {
    fa: "solid",
    fasds: "solid",
    "fa-solid": "solid"
  }
}, ea = ["solid", "regular", "light", "thin", "duotone", "brands"], nr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ta = nr.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), Re = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, na = [...Object.keys(Jr), ...ea, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Re.GROUP, Re.SWAP_OPACITY, Re.PRIMARY, Re.SECONDARY].concat(nr.map((e) => "".concat(e, "x"))).concat(ta.map((e) => "w-".concat(e))), ra = {
  "Font Awesome Kit": {
    400: "fak",
    normal: "fak"
  },
  "Font Awesome Kit Duotone": {
    400: "fakd",
    normal: "fakd"
  }
}, aa = {
  kit: {
    "fa-kit": "fak"
  },
  "kit-duotone": {
    "fa-kit-duotone": "fakd"
  }
}, ia = {
  kit: {
    fak: "fa-kit"
  },
  "kit-duotone": {
    fakd: "fa-kit-duotone"
  }
}, dn = {
  kit: {
    kit: "fak"
  },
  "kit-duotone": {
    "kit-duotone": "fakd"
  }
};
const se = "___FONT_AWESOME___", yt = 16, rr = "fa", ar = "svg-inline--fa", xe = "data-fa-i2svg", bt = "data-fa-pseudo-element", oa = "data-fa-pseudo-element-pending", Dt = "data-prefix", Yt = "data-icon", mn = "fontawesome-i2svg", sa = "async", la = ["HTML", "HEAD", "STYLE", "SCRIPT"], ir = (() => {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return !1;
  }
})(), or = [B, X, K];
function Ye(e) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : t[B];
    }
  });
}
const sr = {
  ...tr
};
sr[B] = {
  ...tr[B],
  ...un.kit,
  ...un["kit-duotone"]
};
const be = Ye(sr), vt = {
  ...Zr
};
vt[B] = {
  ...vt[B],
  ...dn.kit,
  ...dn["kit-duotone"]
};
const je = Ye(vt), xt = {
  ...Qr
};
xt[B] = {
  ...xt[B],
  ...ia.kit
};
const ve = Ye(xt), _t = {
  ...Kr
};
_t[B] = {
  ..._t[B],
  ...aa.kit
};
const ca = Ye(_t), fa = Hr, lr = "fa-layers-text", ua = qr, da = {
  ...Wr
};
Ye(da);
const ma = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], it = Re, ke = /* @__PURE__ */ new Set();
Object.keys(je[B]).map(ke.add.bind(ke));
Object.keys(je[X]).map(ke.add.bind(ke));
Object.keys(je[K]).map(ke.add.bind(ke));
const pa = [...Vr, ...na], Fe = de.FontAwesomeConfig || {};
function ha(e) {
  var t = U.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function ga(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
U && typeof U.querySelector == "function" && [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach((t) => {
  let [n, r] = t;
  const a = ga(ha(n));
  a != null && (Fe[r] = a);
});
const cr = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: rr,
  replacementClass: ar,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};
Fe.familyPrefix && (Fe.cssPrefix = Fe.familyPrefix);
const Ce = {
  ...cr,
  ...Fe
};
Ce.autoReplaceSvg || (Ce.observeMutations = !1);
const g = {};
Object.keys(cr).forEach((e) => {
  Object.defineProperty(g, e, {
    enumerable: !0,
    set: function(t) {
      Ce[e] = t, ze.forEach((n) => n(g));
    },
    get: function() {
      return Ce[e];
    }
  });
});
Object.defineProperty(g, "familyPrefix", {
  enumerable: !0,
  set: function(e) {
    Ce.cssPrefix = e, ze.forEach((t) => t(g));
  },
  get: function() {
    return Ce.cssPrefix;
  }
});
de.FontAwesomeConfig = g;
const ze = [];
function ya(e) {
  return ze.push(e), () => {
    ze.splice(ze.indexOf(e), 1);
  };
}
const fe = yt, ae = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function ba(e) {
  if (!e || !ce)
    return;
  const t = U.createElement("style");
  t.setAttribute("type", "text/css"), t.innerHTML = e;
  const n = U.head.childNodes;
  let r = null;
  for (let a = n.length - 1; a > -1; a--) {
    const i = n[a], s = (i.tagName || "").toUpperCase();
    ["STYLE", "LINK"].indexOf(s) > -1 && (r = i);
  }
  return U.head.insertBefore(t, r), e;
}
const va = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function De() {
  let e = 12, t = "";
  for (; e-- > 0; )
    t += va[Math.random() * 62 | 0];
  return t;
}
function Ie(e) {
  const t = [];
  for (let n = (e || []).length >>> 0; n--; )
    t[n] = e[n];
  return t;
}
function $t(e) {
  return e.classList ? Ie(e.classList) : (e.getAttribute("class") || "").split(" ").filter((t) => t);
}
function fr(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function xa(e) {
  return Object.keys(e || {}).reduce((t, n) => t + "".concat(n, '="').concat(fr(e[n]), '" '), "").trim();
}
function Ze(e) {
  return Object.keys(e || {}).reduce((t, n) => t + "".concat(n, ": ").concat(e[n].trim(), ";"), "");
}
function Ut(e) {
  return e.size !== ae.size || e.x !== ae.x || e.y !== ae.y || e.rotate !== ae.rotate || e.flipX || e.flipY;
}
function _a(e) {
  let {
    transform: t,
    containerWidth: n,
    iconWidth: r
  } = e;
  const a = {
    transform: "translate(".concat(n / 2, " 256)")
  }, i = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), s = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), o = "rotate(".concat(t.rotate, " 0 0)"), l = {
    transform: "".concat(i, " ").concat(s, " ").concat(o)
  }, c = {
    transform: "translate(".concat(r / 2 * -1, " -256)")
  };
  return {
    outer: a,
    inner: l,
    path: c
  };
}
function wa(e) {
  let {
    transform: t,
    width: n = yt,
    height: r = yt,
    startCentered: a = !1
  } = e, i = "";
  return a && Zn ? i += "translate(".concat(t.x / fe - n / 2, "em, ").concat(t.y / fe - r / 2, "em) ") : a ? i += "translate(calc(-50% + ".concat(t.x / fe, "em), calc(-50% + ").concat(t.y / fe, "em)) ") : i += "translate(".concat(t.x / fe, "em, ").concat(t.y / fe, "em) "), i += "scale(".concat(t.size / fe * (t.flipX ? -1 : 1), ", ").concat(t.size / fe * (t.flipY ? -1 : 1), ") "), i += "rotate(".concat(t.rotate, "deg) "), i;
}
var Ea = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function ur() {
  const e = rr, t = ar, n = g.cssPrefix, r = g.replacementClass;
  let a = Ea;
  if (n !== e || r !== t) {
    const i = new RegExp("\\.".concat(e, "\\-"), "g"), s = new RegExp("\\--".concat(e, "\\-"), "g"), o = new RegExp("\\.".concat(t), "g");
    a = a.replace(i, ".".concat(n, "-")).replace(s, "--".concat(n, "-")).replace(o, ".".concat(r));
  }
  return a;
}
let pn = !1;
function ot() {
  g.autoAddCss && !pn && (ba(ur()), pn = !0);
}
var Aa = {
  mixout() {
    return {
      dom: {
        css: ur,
        insertCss: ot
      }
    };
  },
  hooks() {
    return {
      beforeDOMElementCreation() {
        ot();
      },
      beforeI2svg() {
        ot();
      }
    };
  }
};
const le = de || {};
le[se] || (le[se] = {});
le[se].styles || (le[se].styles = {});
le[se].hooks || (le[se].hooks = {});
le[se].shims || (le[se].shims = []);
var ie = le[se];
const dr = [], mr = function() {
  U.removeEventListener("DOMContentLoaded", mr), Ke = 1, dr.map((e) => e());
};
let Ke = !1;
ce && (Ke = (U.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(U.readyState), Ke || U.addEventListener("DOMContentLoaded", mr));
function Sa(e) {
  ce && (Ke ? setTimeout(e, 0) : dr.push(e));
}
function $e(e) {
  const {
    tag: t,
    attributes: n = {},
    children: r = []
  } = e;
  return typeof e == "string" ? fr(e) : "<".concat(t, " ").concat(xa(n), ">").concat(r.map($e).join(""), "</").concat(t, ">");
}
function hn(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
var st = function(t, n, r, a) {
  var i = Object.keys(t), s = i.length, o = n, l, c, f;
  for (r === void 0 ? (l = 1, f = t[i[0]]) : (l = 0, f = r); l < s; l++)
    c = i[l], f = o(f, t[c], c, t);
  return f;
};
function Oa(e) {
  const t = [];
  let n = 0;
  const r = e.length;
  for (; n < r; ) {
    const a = e.charCodeAt(n++);
    if (a >= 55296 && a <= 56319 && n < r) {
      const i = e.charCodeAt(n++);
      (i & 64512) == 56320 ? t.push(((a & 1023) << 10) + (i & 1023) + 65536) : (t.push(a), n--);
    } else
      t.push(a);
  }
  return t;
}
function wt(e) {
  const t = Oa(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function Ta(e, t) {
  const n = e.length;
  let r = e.charCodeAt(t), a;
  return r >= 55296 && r <= 56319 && n > t + 1 && (a = e.charCodeAt(t + 1), a >= 56320 && a <= 57343) ? (r - 55296) * 1024 + a - 56320 + 65536 : r;
}
function gn(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n];
    return !!r.icon ? t[r.iconName] = r.icon : t[n] = r, t;
  }, {});
}
function Et(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    skipHooks: r = !1
  } = n, a = gn(t);
  typeof ie.hooks.addPack == "function" && !r ? ie.hooks.addPack(e, gn(t)) : ie.styles[e] = {
    ...ie.styles[e] || {},
    ...a
  }, e === "fas" && Et("fa", t);
}
const {
  styles: ye,
  shims: Pa
} = ie, ka = {
  [B]: Object.values(ve[B]),
  [X]: Object.values(ve[X]),
  [K]: Object.values(ve[K])
};
let Bt = null, pr = {}, hr = {}, gr = {}, yr = {}, br = {};
const Ca = {
  [B]: Object.keys(be[B]),
  [X]: Object.keys(be[X]),
  [K]: Object.keys(be[K])
};
function Ia(e) {
  return ~pa.indexOf(e);
}
function Na(e, t) {
  const n = t.split("-"), r = n[0], a = n.slice(1).join("-");
  return r === e && a !== "" && !Ia(a) ? a : null;
}
const vr = () => {
  const e = (r) => st(ye, (a, i, s) => (a[s] = st(i, r, {}), a), {});
  pr = e((r, a, i) => (a[3] && (r[a[3]] = i), a[2] && a[2].filter((o) => typeof o == "number").forEach((o) => {
    r[o.toString(16)] = i;
  }), r)), hr = e((r, a, i) => (r[i] = i, a[2] && a[2].filter((o) => typeof o == "string").forEach((o) => {
    r[o] = i;
  }), r)), br = e((r, a, i) => {
    const s = a[2];
    return r[i] = i, s.forEach((o) => {
      r[o] = i;
    }), r;
  });
  const t = "far" in ye || g.autoFetchSvg, n = st(Pa, (r, a) => {
    const i = a[0];
    let s = a[1];
    const o = a[2];
    return s === "far" && !t && (s = "fas"), typeof i == "string" && (r.names[i] = {
      prefix: s,
      iconName: o
    }), typeof i == "number" && (r.unicodes[i.toString(16)] = {
      prefix: s,
      iconName: o
    }), r;
  }, {
    names: {},
    unicodes: {}
  });
  gr = n.names, yr = n.unicodes, Bt = et(g.styleDefault, {
    family: g.familyDefault
  });
};
ya((e) => {
  Bt = et(e.styleDefault, {
    family: g.familyDefault
  });
});
vr();
function Wt(e, t) {
  return (pr[e] || {})[t];
}
function Ma(e, t) {
  return (hr[e] || {})[t];
}
function ue(e, t) {
  return (br[e] || {})[t];
}
function xr(e) {
  return gr[e] || {
    prefix: null,
    iconName: null
  };
}
function Ra(e) {
  const t = yr[e], n = Wt("fas", e);
  return t || (n ? {
    prefix: "fas",
    iconName: n
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function me() {
  return Bt;
}
const Vt = () => ({
  prefix: null,
  iconName: null,
  rest: []
});
function et(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    family: n = B
  } = t, r = be[n][e], a = je[n][e] || je[n][r], i = e in ie.styles ? e : null;
  return a || i || null;
}
const La = {
  [B]: Object.keys(ve[B]),
  [X]: Object.keys(ve[X]),
  [K]: Object.keys(ve[K])
};
function tt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    skipLookups: n = !1
  } = t, r = {
    [B]: "".concat(g.cssPrefix, "-").concat(B),
    [X]: "".concat(g.cssPrefix, "-").concat(X),
    [K]: "".concat(g.cssPrefix, "-").concat(K)
  };
  let a = null, i = B;
  const s = Br.filter((l) => l !== er);
  s.forEach((l) => {
    (e.includes(r[l]) || e.some((c) => La[l].includes(c))) && (i = l);
  });
  const o = e.reduce((l, c) => {
    const f = Na(g.cssPrefix, c);
    if (ye[c] ? (c = ka[i].includes(c) ? ca[i][c] : c, a = c, l.prefix = c) : Ca[i].indexOf(c) > -1 ? (a = c, l.prefix = et(c, {
      family: i
    })) : f ? l.iconName = f : c !== g.replacementClass && !s.some((p) => c === r[p]) && l.rest.push(c), !n && l.prefix && l.iconName) {
      const p = a === "fa" ? xr(l.iconName) : {}, y = ue(l.prefix, l.iconName);
      p.prefix && (a = null), l.iconName = p.iconName || y || l.iconName, l.prefix = p.prefix || l.prefix, l.prefix === "far" && !ye.far && ye.fas && !g.autoFetchSvg && (l.prefix = "fas");
    }
    return l;
  }, Vt());
  return (e.includes("fa-brands") || e.includes("fab")) && (o.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (o.prefix = "fad"), !o.prefix && i === X && (ye.fass || g.autoFetchSvg) && (o.prefix = "fass", o.iconName = ue(o.prefix, o.iconName) || o.iconName), !o.prefix && i === K && (ye.fasds || g.autoFetchSvg) && (o.prefix = "fasds", o.iconName = ue(o.prefix, o.iconName) || o.iconName), (o.prefix === "fa" || a === "fa") && (o.prefix = me() || "fas"), o;
}
class Fa {
  constructor() {
    this.definitions = {};
  }
  add() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    const a = n.reduce(this._pullDefinitions, {});
    Object.keys(a).forEach((i) => {
      this.definitions[i] = {
        ...this.definitions[i] || {},
        ...a[i]
      }, Et(i, a[i]);
      const s = ve[B][i];
      s && Et(s, a[i]), vr();
    });
  }
  reset() {
    this.definitions = {};
  }
  _pullDefinitions(t, n) {
    const r = n.prefix && n.iconName && n.icon ? {
      0: n
    } : n;
    return Object.keys(r).map((a) => {
      const {
        prefix: i,
        iconName: s,
        icon: o
      } = r[a], l = o[2];
      t[i] || (t[i] = {}), l.length > 0 && l.forEach((c) => {
        typeof c == "string" && (t[i][c] = o);
      }), t[i][s] = o;
    }), t;
  }
}
let yn = [], Oe = {};
const Pe = {}, za = Object.keys(Pe);
function ja(e, t) {
  let {
    mixoutsTo: n
  } = t;
  return yn = e, Oe = {}, Object.keys(Pe).forEach((r) => {
    za.indexOf(r) === -1 && delete Pe[r];
  }), yn.forEach((r) => {
    const a = r.mixout ? r.mixout() : {};
    if (Object.keys(a).forEach((i) => {
      typeof a[i] == "function" && (n[i] = a[i]), typeof a[i] == "object" && Object.keys(a[i]).forEach((s) => {
        n[i] || (n[i] = {}), n[i][s] = a[i][s];
      });
    }), r.hooks) {
      const i = r.hooks();
      Object.keys(i).forEach((s) => {
        Oe[s] || (Oe[s] = []), Oe[s].push(i[s]);
      });
    }
    r.provides && r.provides(Pe);
  }), n;
}
function At(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    r[a - 2] = arguments[a];
  return (Oe[e] || []).forEach((s) => {
    t = s.apply(null, [t, ...r]);
  }), t;
}
function _e(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  (Oe[e] || []).forEach((i) => {
    i.apply(null, n);
  });
}
function pe() {
  const e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return Pe[e] ? Pe[e].apply(null, t) : void 0;
}
function St(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  let {
    iconName: t
  } = e;
  const n = e.prefix || me();
  if (t)
    return t = ue(n, t) || t, hn(_r.definitions, n, t) || hn(ie.styles, n, t);
}
const _r = new Fa(), Da = () => {
  g.autoReplaceSvg = !1, g.observeMutations = !1, _e("noAuto");
}, Ya = {
  i2svg: function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return ce ? (_e("beforeI2svg", e), pe("pseudoElements2svg", e), pe("i2svg", e)) : Promise.reject(new Error("Operation requires a DOM of some kind."));
  },
  watch: function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      autoReplaceSvgRoot: t
    } = e;
    g.autoReplaceSvg === !1 && (g.autoReplaceSvg = !0), g.observeMutations = !0, Sa(() => {
      Ua({
        autoReplaceSvgRoot: t
      }), _e("watch", e);
    });
  }
}, $a = {
  icon: (e) => {
    if (e === null)
      return null;
    if (typeof e == "object" && e.prefix && e.iconName)
      return {
        prefix: e.prefix,
        iconName: ue(e.prefix, e.iconName) || e.iconName
      };
    if (Array.isArray(e) && e.length === 2) {
      const t = e[1].indexOf("fa-") === 0 ? e[1].slice(3) : e[1], n = et(e[0]);
      return {
        prefix: n,
        iconName: ue(n, t) || t
      };
    }
    if (typeof e == "string" && (e.indexOf("".concat(g.cssPrefix, "-")) > -1 || e.match(fa))) {
      const t = tt(e.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: t.prefix || me(),
        iconName: ue(t.prefix, t.iconName) || t.iconName
      };
    }
    if (typeof e == "string") {
      const t = me();
      return {
        prefix: t,
        iconName: ue(t, e) || e
      };
    }
  }
}, J = {
  noAuto: Da,
  config: g,
  dom: Ya,
  parse: $a,
  library: _r,
  findIconDefinition: St,
  toHtml: $e
}, Ua = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    autoReplaceSvgRoot: t = U
  } = e;
  (Object.keys(ie.styles).length > 0 || g.autoFetchSvg) && ce && g.autoReplaceSvg && J.dom.i2svg({
    node: t
  });
};
function nt(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map((n) => $e(n));
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (!ce) return;
      const n = U.createElement("div");
      return n.innerHTML = e.html, n.children;
    }
  }), e;
}
function Ba(e) {
  let {
    children: t,
    main: n,
    mask: r,
    attributes: a,
    styles: i,
    transform: s
  } = e;
  if (Ut(s) && n.found && !r.found) {
    const {
      width: o,
      height: l
    } = n, c = {
      x: o / l / 2,
      y: 0.5
    };
    a.style = Ze({
      ...i,
      "transform-origin": "".concat(c.x + s.x / 16, "em ").concat(c.y + s.y / 16, "em")
    });
  }
  return [{
    tag: "svg",
    attributes: a,
    children: t
  }];
}
function Wa(e) {
  let {
    prefix: t,
    iconName: n,
    children: r,
    attributes: a,
    symbol: i
  } = e;
  const s = i === !0 ? "".concat(t, "-").concat(g.cssPrefix, "-").concat(n) : i;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: {
        ...a,
        id: s
      },
      children: r
    }]
  }];
}
function Ht(e) {
  const {
    icons: {
      main: t,
      mask: n
    },
    prefix: r,
    iconName: a,
    transform: i,
    symbol: s,
    title: o,
    maskId: l,
    titleId: c,
    extra: f,
    watchable: p = !1
  } = e, {
    width: y,
    height: v
  } = n.found ? n : t, L = r === "fak", w = [g.replacementClass, a ? "".concat(g.cssPrefix, "-").concat(a) : ""].filter((d) => f.classes.indexOf(d) === -1).filter((d) => d !== "" || !!d).concat(f.classes).join(" ");
  let x = {
    children: [],
    attributes: {
      ...f.attributes,
      "data-prefix": r,
      "data-icon": a,
      class: w,
      role: f.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(y, " ").concat(v)
    }
  };
  const k = L && !~f.classes.indexOf("fa-fw") ? {
    width: "".concat(y / v * 16 * 0.0625, "em")
  } : {};
  p && (x.attributes[xe] = ""), o && (x.children.push({
    tag: "title",
    attributes: {
      id: x.attributes["aria-labelledby"] || "title-".concat(c || De())
    },
    children: [o]
  }), delete x.attributes.title);
  const $ = {
    ...x,
    prefix: r,
    iconName: a,
    main: t,
    mask: n,
    maskId: l,
    transform: i,
    symbol: s,
    styles: {
      ...k,
      ...f.styles
    }
  }, {
    children: T,
    attributes: F
  } = n.found && t.found ? pe("generateAbstractMask", $) || {
    children: [],
    attributes: {}
  } : pe("generateAbstractIcon", $) || {
    children: [],
    attributes: {}
  };
  return $.children = T, $.attributes = F, s ? Wa($) : Ba($);
}
function bn(e) {
  const {
    content: t,
    width: n,
    height: r,
    transform: a,
    title: i,
    extra: s,
    watchable: o = !1
  } = e, l = {
    ...s.attributes,
    ...i ? {
      title: i
    } : {},
    class: s.classes.join(" ")
  };
  o && (l[xe] = "");
  const c = {
    ...s.styles
  };
  Ut(a) && (c.transform = wa({
    transform: a,
    startCentered: !0,
    width: n,
    height: r
  }), c["-webkit-transform"] = c.transform);
  const f = Ze(c);
  f.length > 0 && (l.style = f);
  const p = [];
  return p.push({
    tag: "span",
    attributes: l,
    children: [t]
  }), i && p.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [i]
  }), p;
}
function Va(e) {
  const {
    content: t,
    title: n,
    extra: r
  } = e, a = {
    ...r.attributes,
    ...n ? {
      title: n
    } : {},
    class: r.classes.join(" ")
  }, i = Ze(r.styles);
  i.length > 0 && (a.style = i);
  const s = [];
  return s.push({
    tag: "span",
    attributes: a,
    children: [t]
  }), n && s.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [n]
  }), s;
}
const {
  styles: lt
} = ie;
function Ot(e) {
  const t = e[0], n = e[1], [r] = e.slice(4);
  let a = null;
  return Array.isArray(r) ? a = {
    tag: "g",
    attributes: {
      class: "".concat(g.cssPrefix, "-").concat(it.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(g.cssPrefix, "-").concat(it.SECONDARY),
        fill: "currentColor",
        d: r[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(g.cssPrefix, "-").concat(it.PRIMARY),
        fill: "currentColor",
        d: r[1]
      }
    }]
  } : a = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: r
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: a
  };
}
const Ha = {
  found: !1,
  width: 512,
  height: 512
};
function qa(e, t) {
  !ir && !g.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function Tt(e, t) {
  let n = t;
  return t === "fa" && g.styleDefault !== null && (t = me()), new Promise((r, a) => {
    if (n === "fa") {
      const i = xr(e) || {};
      e = i.iconName || e, t = i.prefix || t;
    }
    if (e && t && lt[t] && lt[t][e]) {
      const i = lt[t][e];
      return r(Ot(i));
    }
    qa(e, t), r({
      ...Ha,
      icon: g.showMissingIcons && e ? pe("missingIconAbstract") || {} : {}
    });
  });
}
const vn = () => {
}, Pt = g.measurePerformance && We && We.mark && We.measure ? We : {
  mark: vn,
  measure: vn
}, Le = 'FA "6.6.0"', Ga = (e) => (Pt.mark("".concat(Le, " ").concat(e, " begins")), () => wr(e)), wr = (e) => {
  Pt.mark("".concat(Le, " ").concat(e, " ends")), Pt.measure("".concat(Le, " ").concat(e), "".concat(Le, " ").concat(e, " begins"), "".concat(Le, " ").concat(e, " ends"));
};
var qt = {
  begin: Ga,
  end: wr
};
const qe = () => {
};
function xn(e) {
  return typeof (e.getAttribute ? e.getAttribute(xe) : null) == "string";
}
function Xa(e) {
  const t = e.getAttribute ? e.getAttribute(Dt) : null, n = e.getAttribute ? e.getAttribute(Yt) : null;
  return t && n;
}
function Ka(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(g.replacementClass);
}
function Ja() {
  return g.autoReplaceSvg === !0 ? Ge.replace : Ge[g.autoReplaceSvg] || Ge.replace;
}
function Qa(e) {
  return U.createElementNS("http://www.w3.org/2000/svg", e);
}
function Za(e) {
  return U.createElement(e);
}
function Er(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    ceFn: n = e.tag === "svg" ? Qa : Za
  } = t;
  if (typeof e == "string")
    return U.createTextNode(e);
  const r = n(e.tag);
  return Object.keys(e.attributes || []).forEach(function(i) {
    r.setAttribute(i, e.attributes[i]);
  }), (e.children || []).forEach(function(i) {
    r.appendChild(Er(i, {
      ceFn: n
    }));
  }), r;
}
function ei(e) {
  let t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
const Ge = {
  replace: function(e) {
    const t = e[0];
    if (t.parentNode)
      if (e[1].forEach((n) => {
        t.parentNode.insertBefore(Er(n), t);
      }), t.getAttribute(xe) === null && g.keepOriginalSource) {
        let n = U.createComment(ei(t));
        t.parentNode.replaceChild(n, t);
      } else
        t.remove();
  },
  nest: function(e) {
    const t = e[0], n = e[1];
    if (~$t(t).indexOf(g.replacementClass))
      return Ge.replace(e);
    const r = new RegExp("".concat(g.cssPrefix, "-.*"));
    if (delete n[0].attributes.id, n[0].attributes.class) {
      const i = n[0].attributes.class.split(" ").reduce((s, o) => (o === g.replacementClass || o.match(r) ? s.toSvg.push(o) : s.toNode.push(o), s), {
        toNode: [],
        toSvg: []
      });
      n[0].attributes.class = i.toSvg.join(" "), i.toNode.length === 0 ? t.removeAttribute("class") : t.setAttribute("class", i.toNode.join(" "));
    }
    const a = n.map((i) => $e(i)).join(`
`);
    t.setAttribute(xe, ""), t.innerHTML = a;
  }
};
function _n(e) {
  e();
}
function Ar(e, t) {
  const n = typeof t == "function" ? t : qe;
  if (e.length === 0)
    n();
  else {
    let r = _n;
    g.mutateApproach === sa && (r = de.requestAnimationFrame || _n), r(() => {
      const a = Ja(), i = qt.begin("mutate");
      e.map(a), i(), n();
    });
  }
}
let Gt = !1;
function Sr() {
  Gt = !0;
}
function kt() {
  Gt = !1;
}
let Je = null;
function wn(e) {
  if (!fn || !g.observeMutations)
    return;
  const {
    treeCallback: t = qe,
    nodeCallback: n = qe,
    pseudoElementsCallback: r = qe,
    observeMutationsRoot: a = U
  } = e;
  Je = new fn((i) => {
    if (Gt) return;
    const s = me();
    Ie(i).forEach((o) => {
      if (o.type === "childList" && o.addedNodes.length > 0 && !xn(o.addedNodes[0]) && (g.searchPseudoElements && r(o.target), t(o.target)), o.type === "attributes" && o.target.parentNode && g.searchPseudoElements && r(o.target.parentNode), o.type === "attributes" && xn(o.target) && ~ma.indexOf(o.attributeName))
        if (o.attributeName === "class" && Xa(o.target)) {
          const {
            prefix: l,
            iconName: c
          } = tt($t(o.target));
          o.target.setAttribute(Dt, l || s), c && o.target.setAttribute(Yt, c);
        } else Ka(o.target) && n(o.target);
    });
  }), ce && Je.observe(a, {
    childList: !0,
    attributes: !0,
    characterData: !0,
    subtree: !0
  });
}
function ti() {
  Je && Je.disconnect();
}
function ni(e) {
  const t = e.getAttribute("style");
  let n = [];
  return t && (n = t.split(";").reduce((r, a) => {
    const i = a.split(":"), s = i[0], o = i.slice(1);
    return s && o.length > 0 && (r[s] = o.join(":").trim()), r;
  }, {})), n;
}
function ri(e) {
  const t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), r = e.innerText !== void 0 ? e.innerText.trim() : "";
  let a = tt($t(e));
  return a.prefix || (a.prefix = me()), t && n && (a.prefix = t, a.iconName = n), a.iconName && a.prefix || (a.prefix && r.length > 0 && (a.iconName = Ma(a.prefix, e.innerText) || Wt(a.prefix, wt(e.innerText))), !a.iconName && g.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (a.iconName = e.firstChild.data)), a;
}
function ai(e) {
  const t = Ie(e.attributes).reduce((a, i) => (a.name !== "class" && a.name !== "style" && (a[i.name] = i.value), a), {}), n = e.getAttribute("title"), r = e.getAttribute("data-fa-title-id");
  return g.autoA11y && (n ? t["aria-labelledby"] = "".concat(g.replacementClass, "-title-").concat(r || De()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function ii() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: ae,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function En(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  };
  const {
    iconName: n,
    prefix: r,
    rest: a
  } = ri(e), i = ai(e), s = At("parseNodeAttributes", {}, e);
  let o = t.styleParser ? ni(e) : [];
  return {
    iconName: n,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: r,
    transform: ae,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: a,
      styles: o,
      attributes: i
    },
    ...s
  };
}
const {
  styles: oi
} = ie;
function Or(e) {
  const t = g.autoReplaceSvg === "nest" ? En(e, {
    styleParser: !1
  }) : En(e);
  return ~t.extra.classes.indexOf(lr) ? pe("generateLayersText", e, t) : pe("generateSvgReplacementMutation", e, t);
}
let oe = /* @__PURE__ */ new Set();
or.map((e) => {
  oe.add("fa-".concat(e));
});
Object.keys(be[B]).map(oe.add.bind(oe));
Object.keys(be[X]).map(oe.add.bind(oe));
Object.keys(be[K]).map(oe.add.bind(oe));
oe = [...oe];
function An(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!ce) return Promise.resolve();
  const n = U.documentElement.classList, r = (f) => n.add("".concat(mn, "-").concat(f)), a = (f) => n.remove("".concat(mn, "-").concat(f)), i = g.autoFetchSvg ? oe : or.map((f) => "fa-".concat(f)).concat(Object.keys(oi));
  i.includes("fa") || i.push("fa");
  const s = [".".concat(lr, ":not([").concat(xe, "])")].concat(i.map((f) => ".".concat(f, ":not([").concat(xe, "])"))).join(", ");
  if (s.length === 0)
    return Promise.resolve();
  let o = [];
  try {
    o = Ie(e.querySelectorAll(s));
  } catch {
  }
  if (o.length > 0)
    r("pending"), a("complete");
  else
    return Promise.resolve();
  const l = qt.begin("onTree"), c = o.reduce((f, p) => {
    try {
      const y = Or(p);
      y && f.push(y);
    } catch (y) {
      ir || y.name === "MissingIcon" && console.error(y);
    }
    return f;
  }, []);
  return new Promise((f, p) => {
    Promise.all(c).then((y) => {
      Ar(y, () => {
        r("active"), r("complete"), a("pending"), typeof t == "function" && t(), l(), f();
      });
    }).catch((y) => {
      l(), p(y);
    });
  });
}
function si(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  Or(e).then((n) => {
    n && Ar([n], t);
  });
}
function li(e) {
  return function(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = (t || {}).icon ? t : St(t || {});
    let {
      mask: a
    } = n;
    return a && (a = (a || {}).icon ? a : St(a || {})), e(r, {
      ...n,
      mask: a
    });
  };
}
const ci = function(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    transform: n = ae,
    symbol: r = !1,
    mask: a = null,
    maskId: i = null,
    title: s = null,
    titleId: o = null,
    classes: l = [],
    attributes: c = {},
    styles: f = {}
  } = t;
  if (!e) return;
  const {
    prefix: p,
    iconName: y,
    icon: v
  } = e;
  return nt({
    type: "icon",
    ...e
  }, () => (_e("beforeDOMElementCreation", {
    iconDefinition: e,
    params: t
  }), g.autoA11y && (s ? c["aria-labelledby"] = "".concat(g.replacementClass, "-title-").concat(o || De()) : (c["aria-hidden"] = "true", c.focusable = "false")), Ht({
    icons: {
      main: Ot(v),
      mask: a ? Ot(a.icon) : {
        found: !1,
        width: null,
        height: null,
        icon: {}
      }
    },
    prefix: p,
    iconName: y,
    transform: {
      ...ae,
      ...n
    },
    symbol: r,
    title: s,
    maskId: i,
    titleId: o,
    extra: {
      attributes: c,
      styles: f,
      classes: l
    }
  })));
};
var fi = {
  mixout() {
    return {
      icon: li(ci)
    };
  },
  hooks() {
    return {
      mutationObserverCallbacks(e) {
        return e.treeCallback = An, e.nodeCallback = si, e;
      }
    };
  },
  provides(e) {
    e.i2svg = function(t) {
      const {
        node: n = U,
        callback: r = () => {
        }
      } = t;
      return An(n, r);
    }, e.generateSvgReplacementMutation = function(t, n) {
      const {
        iconName: r,
        title: a,
        titleId: i,
        prefix: s,
        transform: o,
        symbol: l,
        mask: c,
        maskId: f,
        extra: p
      } = n;
      return new Promise((y, v) => {
        Promise.all([Tt(r, s), c.iconName ? Tt(c.iconName, c.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then((L) => {
          let [w, x] = L;
          y([t, Ht({
            icons: {
              main: w,
              mask: x
            },
            prefix: s,
            iconName: r,
            transform: o,
            symbol: l,
            maskId: f,
            title: a,
            titleId: i,
            extra: p,
            watchable: !0
          })]);
        }).catch(v);
      });
    }, e.generateAbstractIcon = function(t) {
      let {
        children: n,
        attributes: r,
        main: a,
        transform: i,
        styles: s
      } = t;
      const o = Ze(s);
      o.length > 0 && (r.style = o);
      let l;
      return Ut(i) && (l = pe("generateAbstractTransformGrouping", {
        main: a,
        transform: i,
        containerWidth: a.width,
        iconWidth: a.width
      })), n.push(l || a.icon), {
        children: n,
        attributes: r
      };
    };
  }
}, ui = {
  mixout() {
    return {
      layer(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          classes: n = []
        } = t;
        return nt({
          type: "layer"
        }, () => {
          _e("beforeDOMElementCreation", {
            assembler: e,
            params: t
          });
          let r = [];
          return e((a) => {
            Array.isArray(a) ? a.map((i) => {
              r = r.concat(i.abstract);
            }) : r = r.concat(a.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(g.cssPrefix, "-layers"), ...n].join(" ")
            },
            children: r
          }];
        });
      }
    };
  }
}, di = {
  mixout() {
    return {
      counter(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          title: n = null,
          classes: r = [],
          attributes: a = {},
          styles: i = {}
        } = t;
        return nt({
          type: "counter",
          content: e
        }, () => (_e("beforeDOMElementCreation", {
          content: e,
          params: t
        }), Va({
          content: e.toString(),
          title: n,
          extra: {
            attributes: a,
            styles: i,
            classes: ["".concat(g.cssPrefix, "-layers-counter"), ...r]
          }
        })));
      }
    };
  }
}, mi = {
  mixout() {
    return {
      text(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          transform: n = ae,
          title: r = null,
          classes: a = [],
          attributes: i = {},
          styles: s = {}
        } = t;
        return nt({
          type: "text",
          content: e
        }, () => (_e("beforeDOMElementCreation", {
          content: e,
          params: t
        }), bn({
          content: e,
          transform: {
            ...ae,
            ...n
          },
          title: r,
          extra: {
            attributes: i,
            styles: s,
            classes: ["".concat(g.cssPrefix, "-layers-text"), ...a]
          }
        })));
      }
    };
  },
  provides(e) {
    e.generateLayersText = function(t, n) {
      const {
        title: r,
        transform: a,
        extra: i
      } = n;
      let s = null, o = null;
      if (Zn) {
        const l = parseInt(getComputedStyle(t).fontSize, 10), c = t.getBoundingClientRect();
        s = c.width / l, o = c.height / l;
      }
      return g.autoA11y && !r && (i.attributes["aria-hidden"] = "true"), Promise.resolve([t, bn({
        content: t.innerHTML,
        width: s,
        height: o,
        transform: a,
        title: r,
        extra: i,
        watchable: !0
      })]);
    };
  }
};
const pi = new RegExp('"', "ug"), Sn = [1105920, 1112319], On = {
  FontAwesome: {
    normal: "fas",
    400: "fas"
  },
  ...Xr,
  ...Gr,
  ...ra
}, Ct = Object.keys(On).reduce((e, t) => (e[t.toLowerCase()] = On[t], e), {}), hi = Object.keys(Ct).reduce((e, t) => {
  const n = Ct[t];
  return e[t] = n[900] || [...Object.entries(n)][0][1], e;
}, {});
function gi(e) {
  const t = e.replace(pi, ""), n = Ta(t, 0), r = n >= Sn[0] && n <= Sn[1], a = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: wt(a ? t[0] : t),
    isSecondary: r || a
  };
}
function yi(e, t) {
  const n = e.replace(/^['"]|['"]$/g, "").toLowerCase(), r = parseInt(t), a = isNaN(r) ? "normal" : r;
  return (Ct[n] || {})[a] || hi[n];
}
function Tn(e, t) {
  const n = "".concat(oa).concat(t.replace(":", "-"));
  return new Promise((r, a) => {
    if (e.getAttribute(n) !== null)
      return r();
    const s = Ie(e.children).filter((y) => y.getAttribute(bt) === t)[0], o = de.getComputedStyle(e, t), l = o.getPropertyValue("font-family"), c = l.match(ua), f = o.getPropertyValue("font-weight"), p = o.getPropertyValue("content");
    if (s && !c)
      return e.removeChild(s), r();
    if (c && p !== "none" && p !== "") {
      const y = o.getPropertyValue("content");
      let v = yi(l, f);
      const {
        value: L,
        isSecondary: w
      } = gi(y), x = c[0].startsWith("FontAwesome");
      let k = Wt(v, L), $ = k;
      if (x) {
        const T = Ra(L);
        T.iconName && T.prefix && (k = T.iconName, v = T.prefix);
      }
      if (k && !w && (!s || s.getAttribute(Dt) !== v || s.getAttribute(Yt) !== $)) {
        e.setAttribute(n, $), s && e.removeChild(s);
        const T = ii(), {
          extra: F
        } = T;
        F.attributes[bt] = t, Tt(k, v).then((d) => {
          const Q = Ht({
            ...T,
            icons: {
              main: d,
              mask: Vt()
            },
            prefix: v,
            iconName: $,
            extra: F,
            watchable: !0
          }), Z = U.createElementNS("http://www.w3.org/2000/svg", "svg");
          t === "::before" ? e.insertBefore(Z, e.firstChild) : e.appendChild(Z), Z.outerHTML = Q.map((he) => $e(he)).join(`
`), e.removeAttribute(n), r();
        }).catch(a);
      } else
        r();
    } else
      r();
  });
}
function bi(e) {
  return Promise.all([Tn(e, "::before"), Tn(e, "::after")]);
}
function vi(e) {
  return e.parentNode !== document.head && !~la.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(bt) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function Pn(e) {
  if (ce)
    return new Promise((t, n) => {
      const r = Ie(e.querySelectorAll("*")).filter(vi).map(bi), a = qt.begin("searchPseudoElements");
      Sr(), Promise.all(r).then(() => {
        a(), kt(), t();
      }).catch(() => {
        a(), kt(), n();
      });
    });
}
var xi = {
  hooks() {
    return {
      mutationObserverCallbacks(e) {
        return e.pseudoElementsCallback = Pn, e;
      }
    };
  },
  provides(e) {
    e.pseudoElements2svg = function(t) {
      const {
        node: n = U
      } = t;
      g.searchPseudoElements && Pn(n);
    };
  }
};
let kn = !1;
var _i = {
  mixout() {
    return {
      dom: {
        unwatch() {
          Sr(), kn = !0;
        }
      }
    };
  },
  hooks() {
    return {
      bootstrap() {
        wn(At("mutationObserverCallbacks", {}));
      },
      noAuto() {
        ti();
      },
      watch(e) {
        const {
          observeMutationsRoot: t
        } = e;
        kn ? kt() : wn(At("mutationObserverCallbacks", {
          observeMutationsRoot: t
        }));
      }
    };
  }
};
const Cn = (e) => {
  let t = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return e.toLowerCase().split(" ").reduce((n, r) => {
    const a = r.toLowerCase().split("-"), i = a[0];
    let s = a.slice(1).join("-");
    if (i && s === "h")
      return n.flipX = !0, n;
    if (i && s === "v")
      return n.flipY = !0, n;
    if (s = parseFloat(s), isNaN(s))
      return n;
    switch (i) {
      case "grow":
        n.size = n.size + s;
        break;
      case "shrink":
        n.size = n.size - s;
        break;
      case "left":
        n.x = n.x - s;
        break;
      case "right":
        n.x = n.x + s;
        break;
      case "up":
        n.y = n.y - s;
        break;
      case "down":
        n.y = n.y + s;
        break;
      case "rotate":
        n.rotate = n.rotate + s;
        break;
    }
    return n;
  }, t);
};
var wi = {
  mixout() {
    return {
      parse: {
        transform: (e) => Cn(e)
      }
    };
  },
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-transform");
        return n && (e.transform = Cn(n)), e;
      }
    };
  },
  provides(e) {
    e.generateAbstractTransformGrouping = function(t) {
      let {
        main: n,
        transform: r,
        containerWidth: a,
        iconWidth: i
      } = t;
      const s = {
        transform: "translate(".concat(a / 2, " 256)")
      }, o = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "), l = "scale(".concat(r.size / 16 * (r.flipX ? -1 : 1), ", ").concat(r.size / 16 * (r.flipY ? -1 : 1), ") "), c = "rotate(".concat(r.rotate, " 0 0)"), f = {
        transform: "".concat(o, " ").concat(l, " ").concat(c)
      }, p = {
        transform: "translate(".concat(i / 2 * -1, " -256)")
      }, y = {
        outer: s,
        inner: f,
        path: p
      };
      return {
        tag: "g",
        attributes: {
          ...y.outer
        },
        children: [{
          tag: "g",
          attributes: {
            ...y.inner
          },
          children: [{
            tag: n.icon.tag,
            children: n.icon.children,
            attributes: {
              ...n.icon.attributes,
              ...y.path
            }
          }]
        }]
      };
    };
  }
};
const ct = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function In(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function Ei(e) {
  return e.tag === "g" ? e.children : [e];
}
var Ai = {
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-mask"), r = n ? tt(n.split(" ").map((a) => a.trim())) : Vt();
        return r.prefix || (r.prefix = me()), e.mask = r, e.maskId = t.getAttribute("data-fa-mask-id"), e;
      }
    };
  },
  provides(e) {
    e.generateAbstractMask = function(t) {
      let {
        children: n,
        attributes: r,
        main: a,
        mask: i,
        maskId: s,
        transform: o
      } = t;
      const {
        width: l,
        icon: c
      } = a, {
        width: f,
        icon: p
      } = i, y = _a({
        transform: o,
        containerWidth: f,
        iconWidth: l
      }), v = {
        tag: "rect",
        attributes: {
          ...ct,
          fill: "white"
        }
      }, L = c.children ? {
        children: c.children.map(In)
      } : {}, w = {
        tag: "g",
        attributes: {
          ...y.inner
        },
        children: [In({
          tag: c.tag,
          attributes: {
            ...c.attributes,
            ...y.path
          },
          ...L
        })]
      }, x = {
        tag: "g",
        attributes: {
          ...y.outer
        },
        children: [w]
      }, k = "mask-".concat(s || De()), $ = "clip-".concat(s || De()), T = {
        tag: "mask",
        attributes: {
          ...ct,
          id: k,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        },
        children: [v, x]
      }, F = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: $
          },
          children: Ei(p)
        }, T]
      };
      return n.push(F, {
        tag: "rect",
        attributes: {
          fill: "currentColor",
          "clip-path": "url(#".concat($, ")"),
          mask: "url(#".concat(k, ")"),
          ...ct
        }
      }), {
        children: n,
        attributes: r
      };
    };
  }
}, Si = {
  provides(e) {
    let t = !1;
    de.matchMedia && (t = de.matchMedia("(prefers-reduced-motion: reduce)").matches), e.missingIconAbstract = function() {
      const n = [], r = {
        fill: "currentColor"
      }, a = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      n.push({
        tag: "path",
        attributes: {
          ...r,
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        }
      });
      const i = {
        ...a,
        attributeName: "opacity"
      }, s = {
        tag: "circle",
        attributes: {
          ...r,
          cx: "256",
          cy: "364",
          r: "28"
        },
        children: []
      };
      return t || s.children.push({
        tag: "animate",
        attributes: {
          ...a,
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        }
      }, {
        tag: "animate",
        attributes: {
          ...i,
          values: "1;0;1;1;0;1;"
        }
      }), n.push(s), n.push({
        tag: "path",
        attributes: {
          ...r,
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        },
        children: t ? [] : [{
          tag: "animate",
          attributes: {
            ...i,
            values: "1;0;0;0;0;1;"
          }
        }]
      }), t || n.push({
        tag: "path",
        attributes: {
          ...r,
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        },
        children: [{
          tag: "animate",
          attributes: {
            ...i,
            values: "0;0;1;1;0;0;"
          }
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: n
      };
    };
  }
}, Oi = {
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-symbol"), r = n === null ? !1 : n === "" ? !0 : n;
        return e.symbol = r, e;
      }
    };
  }
}, Ti = [Aa, fi, ui, di, mi, xi, _i, wi, Ai, Si, Oi];
ja(Ti, {
  mixoutsTo: J
});
J.noAuto;
J.config;
J.library;
J.dom;
const It = J.parse;
J.findIconDefinition;
J.toHtml;
const Pi = J.icon;
J.layer;
J.text;
J.counter;
function ki(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Nt = { exports: {} }, Ve = { exports: {} }, j = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nn;
function Ci() {
  if (Nn) return j;
  Nn = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, o = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, L = e ? Symbol.for("react.lazy") : 60116, w = e ? Symbol.for("react.block") : 60121, x = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function T(d) {
    if (typeof d == "object" && d !== null) {
      var Q = d.$$typeof;
      switch (Q) {
        case t:
          switch (d = d.type, d) {
            case l:
            case c:
            case r:
            case i:
            case a:
            case p:
              return d;
            default:
              switch (d = d && d.$$typeof, d) {
                case o:
                case f:
                case L:
                case v:
                case s:
                  return d;
                default:
                  return Q;
              }
          }
        case n:
          return Q;
      }
    }
  }
  function F(d) {
    return T(d) === c;
  }
  return j.AsyncMode = l, j.ConcurrentMode = c, j.ContextConsumer = o, j.ContextProvider = s, j.Element = t, j.ForwardRef = f, j.Fragment = r, j.Lazy = L, j.Memo = v, j.Portal = n, j.Profiler = i, j.StrictMode = a, j.Suspense = p, j.isAsyncMode = function(d) {
    return F(d) || T(d) === l;
  }, j.isConcurrentMode = F, j.isContextConsumer = function(d) {
    return T(d) === o;
  }, j.isContextProvider = function(d) {
    return T(d) === s;
  }, j.isElement = function(d) {
    return typeof d == "object" && d !== null && d.$$typeof === t;
  }, j.isForwardRef = function(d) {
    return T(d) === f;
  }, j.isFragment = function(d) {
    return T(d) === r;
  }, j.isLazy = function(d) {
    return T(d) === L;
  }, j.isMemo = function(d) {
    return T(d) === v;
  }, j.isPortal = function(d) {
    return T(d) === n;
  }, j.isProfiler = function(d) {
    return T(d) === i;
  }, j.isStrictMode = function(d) {
    return T(d) === a;
  }, j.isSuspense = function(d) {
    return T(d) === p;
  }, j.isValidElementType = function(d) {
    return typeof d == "string" || typeof d == "function" || d === r || d === c || d === i || d === a || d === p || d === y || typeof d == "object" && d !== null && (d.$$typeof === L || d.$$typeof === v || d.$$typeof === s || d.$$typeof === o || d.$$typeof === f || d.$$typeof === x || d.$$typeof === k || d.$$typeof === $ || d.$$typeof === w);
  }, j.typeOf = T, j;
}
var D = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mn;
function Ii() {
  return Mn || (Mn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, o = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, y = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, L = e ? Symbol.for("react.lazy") : 60116, w = e ? Symbol.for("react.block") : 60121, x = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function T(m) {
      return typeof m == "string" || typeof m == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      m === r || m === c || m === i || m === a || m === p || m === y || typeof m == "object" && m !== null && (m.$$typeof === L || m.$$typeof === v || m.$$typeof === s || m.$$typeof === o || m.$$typeof === f || m.$$typeof === x || m.$$typeof === k || m.$$typeof === $ || m.$$typeof === w);
    }
    function F(m) {
      if (typeof m == "object" && m !== null) {
        var te = m.$$typeof;
        switch (te) {
          case t:
            var Ue = m.type;
            switch (Ue) {
              case l:
              case c:
              case r:
              case i:
              case a:
              case p:
                return Ue;
              default:
                var Kt = Ue && Ue.$$typeof;
                switch (Kt) {
                  case o:
                  case f:
                  case L:
                  case v:
                  case s:
                    return Kt;
                  default:
                    return te;
                }
            }
          case n:
            return te;
        }
      }
    }
    var d = l, Q = c, Z = o, he = s, Ne = t, ee = f, we = r, Me = L, ge = v, z = n, R = i, C = a, V = p, Ee = !1;
    function rt(m) {
      return Ee || (Ee = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), u(m) || F(m) === l;
    }
    function u(m) {
      return F(m) === c;
    }
    function h(m) {
      return F(m) === o;
    }
    function P(m) {
      return F(m) === s;
    }
    function S(m) {
      return typeof m == "object" && m !== null && m.$$typeof === t;
    }
    function _(m) {
      return F(m) === f;
    }
    function I(m) {
      return F(m) === r;
    }
    function E(m) {
      return F(m) === L;
    }
    function O(m) {
      return F(m) === v;
    }
    function N(m) {
      return F(m) === n;
    }
    function Y(m) {
      return F(m) === i;
    }
    function M(m) {
      return F(m) === a;
    }
    function q(m) {
      return F(m) === p;
    }
    D.AsyncMode = d, D.ConcurrentMode = Q, D.ContextConsumer = Z, D.ContextProvider = he, D.Element = Ne, D.ForwardRef = ee, D.Fragment = we, D.Lazy = Me, D.Memo = ge, D.Portal = z, D.Profiler = R, D.StrictMode = C, D.Suspense = V, D.isAsyncMode = rt, D.isConcurrentMode = u, D.isContextConsumer = h, D.isContextProvider = P, D.isElement = S, D.isForwardRef = _, D.isFragment = I, D.isLazy = E, D.isMemo = O, D.isPortal = N, D.isProfiler = Y, D.isStrictMode = M, D.isSuspense = q, D.isValidElementType = T, D.typeOf = F;
  }()), D;
}
var Rn;
function Tr() {
  return Rn || (Rn = 1, process.env.NODE_ENV === "production" ? Ve.exports = Ci() : Ve.exports = Ii()), Ve.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ft, Ln;
function Ni() {
  if (Ln) return ft;
  Ln = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, o = 0; o < 10; o++)
        s["_" + String.fromCharCode(o)] = o;
      var l = Object.getOwnPropertyNames(s).map(function(f) {
        return s[f];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        c[f] = f;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ft = a() ? Object.assign : function(i, s) {
    for (var o, l = r(i), c, f = 1; f < arguments.length; f++) {
      o = Object(arguments[f]);
      for (var p in o)
        t.call(o, p) && (l[p] = o[p]);
      if (e) {
        c = e(o);
        for (var y = 0; y < c.length; y++)
          n.call(o, c[y]) && (l[c[y]] = o[c[y]]);
      }
    }
    return l;
  }, ft;
}
var ut, Fn;
function Xt() {
  if (Fn) return ut;
  Fn = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ut = e, ut;
}
var dt, zn;
function Pr() {
  return zn || (zn = 1, dt = Function.call.bind(Object.prototype.hasOwnProperty)), dt;
}
var mt, jn;
function Mi() {
  if (jn) return mt;
  jn = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Xt(), n = {}, r = Pr();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function a(i, s, o, l, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in i)
        if (r(i, f)) {
          var p;
          try {
            if (typeof i[f] != "function") {
              var y = Error(
                (l || "React class") + ": " + o + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw y.name = "Invariant Violation", y;
            }
            p = i[f](s, f, l, o, null, t);
          } catch (L) {
            p = L;
          }
          if (p && !(p instanceof Error) && e(
            (l || "React class") + ": type specification of " + o + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in n)) {
            n[p.message] = !0;
            var v = c ? c() : "";
            e(
              "Failed " + o + " type: " + p.message + (v ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, mt = a, mt;
}
var pt, Dn;
function Ri() {
  if (Dn) return pt;
  Dn = 1;
  var e = Tr(), t = Ni(), n = Xt(), r = Pr(), a = Mi(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(o) {
    var l = "Warning: " + o;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return pt = function(o, l) {
    var c = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function p(u) {
      var h = u && (c && u[c] || u[f]);
      if (typeof h == "function")
        return h;
    }
    var y = "<<anonymous>>", v = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: $(),
      arrayOf: T,
      element: F(),
      elementType: d(),
      instanceOf: Q,
      node: ee(),
      objectOf: he,
      oneOf: Z,
      oneOfType: Ne,
      shape: Me,
      exact: ge
    };
    function L(u, h) {
      return u === h ? u !== 0 || 1 / u === 1 / h : u !== u && h !== h;
    }
    function w(u, h) {
      this.message = u, this.data = h && typeof h == "object" ? h : {}, this.stack = "";
    }
    w.prototype = Error.prototype;
    function x(u) {
      if (process.env.NODE_ENV !== "production")
        var h = {}, P = 0;
      function S(I, E, O, N, Y, M, q) {
        if (N = N || y, M = M || O, q !== n) {
          if (l) {
            var m = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw m.name = "Invariant Violation", m;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var te = N + ":" + O;
            !h[te] && // Avoid spamming the console because they are often not actionable except for lib authors
            P < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + M + "` prop on `" + N + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), h[te] = !0, P++);
          }
        }
        return E[O] == null ? I ? E[O] === null ? new w("The " + Y + " `" + M + "` is marked as required " + ("in `" + N + "`, but its value is `null`.")) : new w("The " + Y + " `" + M + "` is marked as required in " + ("`" + N + "`, but its value is `undefined`.")) : null : u(E, O, N, Y, M);
      }
      var _ = S.bind(null, !1);
      return _.isRequired = S.bind(null, !0), _;
    }
    function k(u) {
      function h(P, S, _, I, E, O) {
        var N = P[S], Y = C(N);
        if (Y !== u) {
          var M = V(N);
          return new w(
            "Invalid " + I + " `" + E + "` of type " + ("`" + M + "` supplied to `" + _ + "`, expected ") + ("`" + u + "`."),
            { expectedType: u }
          );
        }
        return null;
      }
      return x(h);
    }
    function $() {
      return x(s);
    }
    function T(u) {
      function h(P, S, _, I, E) {
        if (typeof u != "function")
          return new w("Property `" + E + "` of component `" + _ + "` has invalid PropType notation inside arrayOf.");
        var O = P[S];
        if (!Array.isArray(O)) {
          var N = C(O);
          return new w("Invalid " + I + " `" + E + "` of type " + ("`" + N + "` supplied to `" + _ + "`, expected an array."));
        }
        for (var Y = 0; Y < O.length; Y++) {
          var M = u(O, Y, _, I, E + "[" + Y + "]", n);
          if (M instanceof Error)
            return M;
        }
        return null;
      }
      return x(h);
    }
    function F() {
      function u(h, P, S, _, I) {
        var E = h[P];
        if (!o(E)) {
          var O = C(E);
          return new w("Invalid " + _ + " `" + I + "` of type " + ("`" + O + "` supplied to `" + S + "`, expected a single ReactElement."));
        }
        return null;
      }
      return x(u);
    }
    function d() {
      function u(h, P, S, _, I) {
        var E = h[P];
        if (!e.isValidElementType(E)) {
          var O = C(E);
          return new w("Invalid " + _ + " `" + I + "` of type " + ("`" + O + "` supplied to `" + S + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return x(u);
    }
    function Q(u) {
      function h(P, S, _, I, E) {
        if (!(P[S] instanceof u)) {
          var O = u.name || y, N = rt(P[S]);
          return new w("Invalid " + I + " `" + E + "` of type " + ("`" + N + "` supplied to `" + _ + "`, expected ") + ("instance of `" + O + "`."));
        }
        return null;
      }
      return x(h);
    }
    function Z(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function h(P, S, _, I, E) {
        for (var O = P[S], N = 0; N < u.length; N++)
          if (L(O, u[N]))
            return null;
        var Y = JSON.stringify(u, function(q, m) {
          var te = V(m);
          return te === "symbol" ? String(m) : m;
        });
        return new w("Invalid " + I + " `" + E + "` of value `" + String(O) + "` " + ("supplied to `" + _ + "`, expected one of " + Y + "."));
      }
      return x(h);
    }
    function he(u) {
      function h(P, S, _, I, E) {
        if (typeof u != "function")
          return new w("Property `" + E + "` of component `" + _ + "` has invalid PropType notation inside objectOf.");
        var O = P[S], N = C(O);
        if (N !== "object")
          return new w("Invalid " + I + " `" + E + "` of type " + ("`" + N + "` supplied to `" + _ + "`, expected an object."));
        for (var Y in O)
          if (r(O, Y)) {
            var M = u(O, Y, _, I, E + "." + Y, n);
            if (M instanceof Error)
              return M;
          }
        return null;
      }
      return x(h);
    }
    function Ne(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var h = 0; h < u.length; h++) {
        var P = u[h];
        if (typeof P != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Ee(P) + " at index " + h + "."
          ), s;
      }
      function S(_, I, E, O, N) {
        for (var Y = [], M = 0; M < u.length; M++) {
          var q = u[M], m = q(_, I, E, O, N, n);
          if (m == null)
            return null;
          m.data && r(m.data, "expectedType") && Y.push(m.data.expectedType);
        }
        var te = Y.length > 0 ? ", expected one of type [" + Y.join(", ") + "]" : "";
        return new w("Invalid " + O + " `" + N + "` supplied to " + ("`" + E + "`" + te + "."));
      }
      return x(S);
    }
    function ee() {
      function u(h, P, S, _, I) {
        return z(h[P]) ? null : new w("Invalid " + _ + " `" + I + "` supplied to " + ("`" + S + "`, expected a ReactNode."));
      }
      return x(u);
    }
    function we(u, h, P, S, _) {
      return new w(
        (u || "React class") + ": " + h + " type `" + P + "." + S + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + _ + "`."
      );
    }
    function Me(u) {
      function h(P, S, _, I, E) {
        var O = P[S], N = C(O);
        if (N !== "object")
          return new w("Invalid " + I + " `" + E + "` of type `" + N + "` " + ("supplied to `" + _ + "`, expected `object`."));
        for (var Y in u) {
          var M = u[Y];
          if (typeof M != "function")
            return we(_, I, E, Y, V(M));
          var q = M(O, Y, _, I, E + "." + Y, n);
          if (q)
            return q;
        }
        return null;
      }
      return x(h);
    }
    function ge(u) {
      function h(P, S, _, I, E) {
        var O = P[S], N = C(O);
        if (N !== "object")
          return new w("Invalid " + I + " `" + E + "` of type `" + N + "` " + ("supplied to `" + _ + "`, expected `object`."));
        var Y = t({}, P[S], u);
        for (var M in Y) {
          var q = u[M];
          if (r(u, M) && typeof q != "function")
            return we(_, I, E, M, V(q));
          if (!q)
            return new w(
              "Invalid " + I + " `" + E + "` key `" + M + "` supplied to `" + _ + "`.\nBad object: " + JSON.stringify(P[S], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(u), null, "  ")
            );
          var m = q(O, M, _, I, E + "." + M, n);
          if (m)
            return m;
        }
        return null;
      }
      return x(h);
    }
    function z(u) {
      switch (typeof u) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !u;
        case "object":
          if (Array.isArray(u))
            return u.every(z);
          if (u === null || o(u))
            return !0;
          var h = p(u);
          if (h) {
            var P = h.call(u), S;
            if (h !== u.entries) {
              for (; !(S = P.next()).done; )
                if (!z(S.value))
                  return !1;
            } else
              for (; !(S = P.next()).done; ) {
                var _ = S.value;
                if (_ && !z(_[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function R(u, h) {
      return u === "symbol" ? !0 : h ? h["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && h instanceof Symbol : !1;
    }
    function C(u) {
      var h = typeof u;
      return Array.isArray(u) ? "array" : u instanceof RegExp ? "object" : R(h, u) ? "symbol" : h;
    }
    function V(u) {
      if (typeof u > "u" || u === null)
        return "" + u;
      var h = C(u);
      if (h === "object") {
        if (u instanceof Date)
          return "date";
        if (u instanceof RegExp)
          return "regexp";
      }
      return h;
    }
    function Ee(u) {
      var h = V(u);
      switch (h) {
        case "array":
        case "object":
          return "an " + h;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + h;
        default:
          return h;
      }
    }
    function rt(u) {
      return !u.constructor || !u.constructor.name ? y : u.constructor.name;
    }
    return v.checkPropTypes = a, v.resetWarningCache = a.resetWarningCache, v.PropTypes = v, v;
  }, pt;
}
var ht, Yn;
function Li() {
  if (Yn) return ht;
  Yn = 1;
  var e = Xt();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, ht = function() {
    function r(s, o, l, c, f, p) {
      if (p !== e) {
        var y = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw y.name = "Invariant Violation", y;
      }
    }
    r.isRequired = r;
    function a() {
      return r;
    }
    var i = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: a,
      element: r,
      elementType: r,
      instanceOf: a,
      node: r,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, ht;
}
if (process.env.NODE_ENV !== "production") {
  var Fi = Tr(), zi = !0;
  Nt.exports = Ri()(Fi.isElement, zi);
} else
  Nt.exports = Li()();
var ji = Nt.exports;
const A = /* @__PURE__ */ ki(ji);
function $n(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ne(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $n(Object(n), !0).forEach(function(r) {
      Te(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $n(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Qe(e) {
  "@babel/helpers - typeof";
  return Qe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qe(e);
}
function Te(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Di(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), a, i;
  for (i = 0; i < r.length; i++)
    a = r[i], !(t.indexOf(a) >= 0) && (n[a] = e[a]);
  return n;
}
function Yi(e, t) {
  if (e == null) return {};
  var n = Di(e, t), r, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      r = i[a], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Mt(e) {
  return $i(e) || Ui(e) || Bi(e) || Wi();
}
function $i(e) {
  if (Array.isArray(e)) return Rt(e);
}
function Ui(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Bi(e, t) {
  if (e) {
    if (typeof e == "string") return Rt(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Rt(e, t);
  }
}
function Rt(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Wi() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Vi(e) {
  var t, n = e.beat, r = e.fade, a = e.beatFade, i = e.bounce, s = e.shake, o = e.flash, l = e.spin, c = e.spinPulse, f = e.spinReverse, p = e.pulse, y = e.fixedWidth, v = e.inverse, L = e.border, w = e.listItem, x = e.flip, k = e.size, $ = e.rotation, T = e.pull, F = (t = {
    "fa-beat": n,
    "fa-fade": r,
    "fa-beat-fade": a,
    "fa-bounce": i,
    "fa-shake": s,
    "fa-flash": o,
    "fa-spin": l,
    "fa-spin-reverse": f,
    "fa-spin-pulse": c,
    "fa-pulse": p,
    "fa-fw": y,
    "fa-inverse": v,
    "fa-border": L,
    "fa-li": w,
    "fa-flip": x === !0,
    "fa-flip-horizontal": x === "horizontal" || x === "both",
    "fa-flip-vertical": x === "vertical" || x === "both"
  }, Te(t, "fa-".concat(k), typeof k < "u" && k !== null), Te(t, "fa-rotate-".concat($), typeof $ < "u" && $ !== null && $ !== 0), Te(t, "fa-pull-".concat(T), typeof T < "u" && T !== null), Te(t, "fa-swap-opacity", e.swapOpacity), t);
  return Object.keys(F).map(function(d) {
    return F[d] ? d : null;
  }).filter(function(d) {
    return d;
  });
}
function Hi(e) {
  return e = e - 0, e === e;
}
function kr(e) {
  return Hi(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, function(t, n) {
    return n ? n.toUpperCase() : "";
  }), e.substr(0, 1).toLowerCase() + e.substr(1));
}
var qi = ["style"];
function Gi(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Xi(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var r = n.indexOf(":"), a = kr(n.slice(0, r)), i = n.slice(r + 1).trim();
    return a.startsWith("webkit") ? t[Gi(a)] = i : t[a] = i, t;
  }, {});
}
function Cr(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof t == "string")
    return t;
  var r = (t.children || []).map(function(l) {
    return Cr(e, l);
  }), a = Object.keys(t.attributes || {}).reduce(function(l, c) {
    var f = t.attributes[c];
    switch (c) {
      case "class":
        l.attrs.className = f, delete t.attributes.class;
        break;
      case "style":
        l.attrs.style = Xi(f);
        break;
      default:
        c.indexOf("aria-") === 0 || c.indexOf("data-") === 0 ? l.attrs[c.toLowerCase()] = f : l.attrs[kr(c)] = f;
    }
    return l;
  }, {
    attrs: {}
  }), i = n.style, s = i === void 0 ? {} : i, o = Yi(n, qi);
  return a.attrs.style = ne(ne({}, a.attrs.style), s), e.apply(void 0, [t.tag, ne(ne({}, a.attrs), o)].concat(Mt(r)));
}
var Ir = !1;
try {
  Ir = process.env.NODE_ENV === "production";
} catch {
}
function Ki() {
  if (!Ir && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function Un(e) {
  if (e && Qe(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (It.icon)
    return It.icon(e);
  if (e === null)
    return null;
  if (e && Qe(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
function gt(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? Te({}, e, t) : {};
}
var Bn = {
  border: !1,
  className: "",
  mask: null,
  maskId: null,
  fixedWidth: !1,
  inverse: !1,
  flip: !1,
  icon: null,
  listItem: !1,
  pull: null,
  pulse: !1,
  rotation: null,
  size: null,
  spin: !1,
  spinPulse: !1,
  spinReverse: !1,
  beat: !1,
  fade: !1,
  beatFade: !1,
  bounce: !1,
  shake: !1,
  symbol: !1,
  title: "",
  titleId: null,
  transform: null,
  swapOpacity: !1
}, re = /* @__PURE__ */ Xn.forwardRef(function(e, t) {
  var n = ne(ne({}, Bn), e), r = n.icon, a = n.mask, i = n.symbol, s = n.className, o = n.title, l = n.titleId, c = n.maskId, f = Un(r), p = gt("classes", [].concat(Mt(Vi(n)), Mt((s || "").split(" ")))), y = gt("transform", typeof n.transform == "string" ? It.transform(n.transform) : n.transform), v = gt("mask", Un(a)), L = Pi(f, ne(ne(ne(ne({}, p), y), v), {}, {
    symbol: i,
    title: o,
    titleId: l,
    maskId: c
  }));
  if (!L)
    return Ki("Could not find icon", f), null;
  var w = L.abstract, x = {
    ref: t
  };
  return Object.keys(n).forEach(function(k) {
    Bn.hasOwnProperty(k) || (x[k] = n[k]);
  }), Ji(w[0], x);
});
re.displayName = "FontAwesomeIcon";
re.propTypes = {
  beat: A.bool,
  border: A.bool,
  beatFade: A.bool,
  bounce: A.bool,
  className: A.string,
  fade: A.bool,
  flash: A.bool,
  mask: A.oneOfType([A.object, A.array, A.string]),
  maskId: A.string,
  fixedWidth: A.bool,
  inverse: A.bool,
  flip: A.oneOf([!0, !1, "horizontal", "vertical", "both"]),
  icon: A.oneOfType([A.object, A.array, A.string]),
  listItem: A.bool,
  pull: A.oneOf(["right", "left"]),
  pulse: A.bool,
  rotation: A.oneOf([0, 90, 180, 270]),
  shake: A.bool,
  size: A.oneOf(["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"]),
  spin: A.bool,
  spinPulse: A.bool,
  spinReverse: A.bool,
  symbol: A.oneOfType([A.bool, A.string]),
  title: A.string,
  titleId: A.string,
  transform: A.oneOfType([A.string, A.object]),
  swapOpacity: A.bool
};
var Ji = Cr.bind(null, Xn.createElement);
const Qi = {
  prefix: "fas",
  iconName: "file-lines",
  icon: [384, 512, [128441, 128462, 61686, "file-alt", "file-text"], "f15c", "M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"]
}, Zi = {
  prefix: "fas",
  iconName: "caret-right",
  icon: [256, 512, [], "f0da", "M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"]
}, eo = {
  prefix: "fas",
  iconName: "caret-left",
  icon: [256, 512, [], "f0d9", "M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"]
}, to = {
  prefix: "fas",
  iconName: "image",
  icon: [512, 512, [], "f03e", "M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"]
}, Wn = {
  prefix: "fas",
  iconName: "trash",
  icon: [448, 512, [], "f1f8", "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"]
}, no = {
  prefix: "fas",
  iconName: "circle-info",
  icon: [512, 512, ["info-circle"], "f05a", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]
}, ro = {
  prefix: "fas",
  iconName: "gear",
  icon: [512, 512, [9881, "cog"], "f013", "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"]
}, ao = ro, io = {
  prefix: "fas",
  iconName: "download",
  icon: [512, 512, [], "f019", "M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"]
}, oo = {
  prefix: "fas",
  iconName: "house",
  icon: [576, 512, [127968, 63498, 63500, "home", "home-alt", "home-lg-alt"], "f015", "M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]
}, so = {
  prefix: "fas",
  iconName: "upload",
  icon: [512, 512, [], "f093", "M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]
}, lo = {
  prefix: "fas",
  iconName: "magnifying-glass",
  icon: [512, 512, [128269, "search"], "f002", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]
}, co = lo, fo = {
  prefix: "fas",
  iconName: "arrow-up",
  icon: [384, 512, [8593], "f062", "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"]
}, uo = {
  prefix: "fas",
  iconName: "plus",
  icon: [448, 512, [10133, 61543, "add"], "2b", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"]
}, mo = {
  prefix: "fas",
  iconName: "desktop",
  icon: [576, 512, [128421, 61704, "desktop-alt"], "f390", "M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"]
};
(function() {
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode('._FileExplorer_lr5mr_1{--header-height: 3.5rem;--sidebar-width: 10rem;--footer-height: 1.75rem;--scale: 1.15rem;display:flex;flex-direction:column;width:100%;height:100%}._Header_lr5mr_13{display:flex;gap:1rem;align-items:center;width:100%;height:var(--header-height);padding:1rem;background-color:var(--background-color-0)}._IconButton_lr5mr_23{--color: var(--foreground-color-0);position:relative;height:1.25rem;width:auto;padding:0;background:none;border:none;outline:none;aspect-ratio:1;cursor:pointer}._IconButton_lr5mr_23:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff0;border-radius:var(--border-radius-99);transform:scale(1);transform-origin:center;transition:all var(--transition-duration-1) var(--ease-in-out-default)}._IconButton_lr5mr_23:hover:after,._IconButton_lr5mr_23:focus-visible:after{background-color:#ffffff1a;transform:scale(1.5)}._IconButton_lr5mr_23:disabled{--color: var(--background-color-1)}._IconButton_lr5mr_23 svg{height:100%}._IconButton_lr5mr_23 svg path{fill:var(--color);transition:fill var(--transition-duration-0) var(--ease-in-out-default)}._PathInput_lr5mr_69{flex:1;padding:.25rem .5rem;background-color:var(--background-color-2);border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._Body_lr5mr_80{flex:1;display:flex;width:100%;height:calc(100% - var(--header-height));background-color:var(--background-color-2)}._Sidebar_lr5mr_88{display:flex;gap:.25rem;flex-direction:column;min-width:calc(var(--sidebar-width) / 2);width:var(--sidebar-width);height:100%;max-width:50%;padding:.5rem;background-color:var(--background-color-1);resize:horizontal;overflow:hidden}._NavButton_lr5mr_102{display:flex;gap:.5rem;align-items:center;width:100%;padding:.5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;cursor:pointer;transition:background-color var(--transition-duration-0) var(--ease-in-out-default)}._NavButton_lr5mr_102:hover,._NavButton_lr5mr_102:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._NavButton_lr5mr_102 svg{height:1.35rem;aspect-ratio:1}._Main_lr5mr_125{--scale: inherit !important;position:relative;flex:1;display:flex;flex-wrap:wrap;align-content:flex-start;height:100%;padding:.5rem;padding-bottom:calc(.5rem + var(--footer-height));overflow:auto}._Footer_lr5mr_139{position:absolute;display:flex;justify-content:flex-start;align-items:center;bottom:0;left:0;width:100%;height:var(--footer-height);padding:0 .75rem;border-top:.25rem solid var(--background-color-0);background-color:var(--background-color-2)}._Footer_lr5mr_139 p{margin:0;font-size:.875em}._Selector_lr5mr_158{--footer-height: 4rem}._FileProperties_xi8b6_1{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;padding:1rem}._Icon_xi8b6_9{width:3rem;height:3rem}._Icon_xi8b6_9 div{width:inherit;height:inherit;object-fit:contain}._Icon_xi8b6_9 svg{max-width:100%;max-height:100%}._Section_xi8b6_25{--divider-width: .25rem;position:relative;display:flex;gap:.25rem;justify-content:flex-start;align-items:flex-start;flex-direction:column;width:100%;padding:1rem 0;padding-bottom:calc(1rem + var(--divider-width))}._Section_xi8b6_25:first-child{gap:.5rem;align-items:center;flex-direction:row;padding-top:0}._Section_xi8b6_25:first-child ._Line_xi8b6_46{font-size:1.25rem}._Section_xi8b6_25:not(:last-child):after{content:"";position:absolute;bottom:0;left:0;width:100%;height:var(--divider-width);border-radius:var(--border-radius-0);background-color:var(--background-color-0)}._Line_xi8b6_46{margin:0;text-align:left;padding-left:2rem;text-indent:-2rem}._AppIcon_xi8b6_68{display:inline-block;width:2rem;height:2rem;vertical-align:middle;margin-left:.5rem;margin-right:.25rem}._AppIcon_xi8b6_68 div{position:relative;width:inherit;height:inherit;object-fit:contain}._AppIcon_xi8b6_68 svg{position:absolute;top:0;left:0;max-width:100%;max-height:100%}')), document.head.appendChild(e);
    }
  } catch (t) {
    console.error("vite-plugin-css-injected-by-js", t);
  }
})();
const po = "_FileExplorer_lr5mr_1", ho = "_Header_lr5mr_13", go = "_IconButton_lr5mr_23", yo = "_PathInput_lr5mr_69", bo = "_Body_lr5mr_80", vo = "_Sidebar_lr5mr_88", xo = "_NavButton_lr5mr_102", _o = "_Main_lr5mr_125", wo = "_Footer_lr5mr_139", Eo = "_Selector_lr5mr_158", H = {
  FileExplorer: po,
  Header: ho,
  IconButton: go,
  PathInput: yo,
  Body: bo,
  Sidebar: vo,
  NavButton: xo,
  Main: _o,
  Footer: wo,
  Selector: Eo
};
function He({ onClick: e, icon: t, name: n }) {
  return /* @__PURE__ */ W(
    "button",
    {
      tabIndex: 0,
      className: `${H.NavButton} ${zt.TextSemibold}`,
      onClick: e,
      children: [
        /* @__PURE__ */ b(re, { icon: t }),
        n
      ]
    }
  );
}
function Ao({ directory: e }) {
  const t = (n) => {
    const r = n.target.files;
    r != null && Array.from(r).forEach((a) => {
      const { name: i, extension: s } = Yr.splitId(a.name), o = new FileReader();
      o.onload = (l) => {
        const { result: c } = l.target;
        e.createFile(i, s, (f) => {
          f.setSource(c);
        });
      }, o.readAsDataURL(a);
    });
  };
  return /* @__PURE__ */ W("label", { title: "Import", tabIndex: 0, className: H.IconButton, children: [
    /* @__PURE__ */ b(
      "input",
      {
        type: "file",
        id: "import",
        multiple: !0,
        style: { display: "none" },
        onChange: t
      }
    ),
    /* @__PURE__ */ b(re, { icon: io })
  ] });
}
const Vn = {
  NONE: 0,
  SINGLE: 1,
  MULTIPLE: 2
}, So = "_FileProperties_xi8b6_1", Oo = "_Icon_xi8b6_9", To = "_Section_xi8b6_25", Po = "_Line_xi8b6_46", ko = "_AppIcon_xi8b6_68", G = {
  FileProperties: So,
  Icon: Oo,
  Section: To,
  Line: Po,
  AppIcon: ko
};
function Co({ modal: e, params: t, file: n, ...r }) {
  const { appsConfig: a } = Ft(), i = n.extension != null ? a.getAppByFileExtension(n.extension) : null;
  return /* @__PURE__ */ W(Dr, { className: G.FileProperties, modal: e, params: t, ...r, children: [
    /* @__PURE__ */ W("span", { className: G.Section, children: [
      /* @__PURE__ */ b(nn, { className: G.Icon, source: n.getIconUrl() }),
      /* @__PURE__ */ b("p", { className: `${G.Line} ${zt.TextBold}`, children: n.id })
    ] }),
    /* @__PURE__ */ W("span", { className: G.Section, children: [
      /* @__PURE__ */ W("p", { className: G.Line, children: [
        "Type: ",
        n.getType()
      ] }),
      i != null && /* @__PURE__ */ W("span", { className: G.Line, children: [
        "Opens with:",
        /* @__PURE__ */ b(nn, { className: G.AppIcon, source: i.iconUrl ?? "" }),
        i.name
      ] })
    ] }),
    /* @__PURE__ */ W("span", { className: G.Section, children: [
      /* @__PURE__ */ W("p", { className: G.Line, children: [
        "Location: ",
        n.path
      ] }),
      /* @__PURE__ */ W("p", { className: G.Line, children: [
        "Size: ",
        rn.getByteSize(n.source ?? n.content),
        " bytes"
      ] }),
      /* @__PURE__ */ W("p", { className: G.Line, children: [
        "Size on drive: ",
        rn.getByteSize(n.toString()),
        " bytes"
      ] })
    ] }),
    /* @__PURE__ */ b("span", { className: G.Section, children: /* @__PURE__ */ W("p", { className: G.Line, children: [
      "Attributes: ",
      n.isProtected ? "Protected" : "N/A"
    ] }) })
  ] });
}
function Io({ app: e, path: t, selectorMode: n, Footer: r, onSelectionChange: a, onSelectionFinish: i }) {
  const s = r != null && n != null && n !== Vn.NONE, o = Nr(), l = qn(), { windowsConfig: c } = Ft(), [f, p] = at(o == null ? void 0 : o.navigate(t ?? "~")), [y, v] = at((f == null ? void 0 : f.path) ?? ""), [L] = at(!0), { history: w, stateIndex: x, pushState: k, undo: $, redo: T, undoAvailable: F, redoAvailable: d } = Mr(f.path), { alert: Q } = Rr(), { openWindowedModal: Z } = Lr(), { onContextMenu: he } = Jt({
    Actions: (z) => {
      var R;
      return /* @__PURE__ */ W(Qt, { ...z, children: [
        /* @__PURE__ */ b(Ae, { label: s ? "Select" : "Open", onTrigger: (C, V) => {
          if (s) {
            a == null || a({ files: [V.id], directory: f }), i == null || i();
            return;
          }
          l != null && V.open(l);
        } }),
        ((R = z.triggerParams) == null ? void 0 : R.isDownloadable()) && /* @__PURE__ */ b(Ae, { label: "Export", icon: so, onTrigger: (C, V) => {
          V.download();
        } }),
        /* @__PURE__ */ b(Ae, { label: "Delete", icon: Wn, onTrigger: (C, V) => {
          V.delete();
        } }),
        /* @__PURE__ */ b(Ae, { label: "Properties", icon: no, onTrigger: (C, V) => {
          Z({
            title: `${V.id} ${c.titleSeparator} Properties`,
            iconUrl: V.getIconUrl(),
            size: new Be(400, 500),
            Modal: (Ee) => /* @__PURE__ */ b(Co, { file: V, ...Ee })
          });
        } })
      ] });
    }
  }), { onContextMenu: Ne } = Jt({
    Actions: (z) => /* @__PURE__ */ W(Qt, { ...z, children: [
      /* @__PURE__ */ b(Ae, { label: "Open", onTrigger: (R, C) => {
        ee(C.linkedPath ?? C.name);
      } }),
      /* @__PURE__ */ b(Fr, {}),
      /* @__PURE__ */ b(Ae, { label: "Delete", icon: Wn, onTrigger: (R, C) => {
        C.delete();
      } })
    ] })
  }), ee = Ur((z, R = !1) => {
    if (z == null)
      return;
    f == null && (R = !0);
    const C = R ? o == null ? void 0 : o.navigate(z) : f.navigate(z);
    C != null && (p(C), v(C.root ? "/" : C.path), k(C.path));
  }, [f, k, o]);
  Xe(() => {
    if (w.length === 0)
      return;
    const z = w[x], R = o == null ? void 0 : o.navigate(z);
    R != null && (p(R), v(R.root ? "/" : R.path));
  }, [w, x, o]), Xe(() => {
    const z = (R) => {
      Q({
        title: R.message,
        text: "You have exceeded the virtual drive capacity. Files and folders will not be saved until more storage is freed.",
        iconUrl: e == null ? void 0 : e.iconUrl,
        size: new Be(300, 200),
        single: !0
      });
    };
    return o == null || o.on(Zt.EVENT_NAMES.error, z), () => {
      o == null || o.off(Zt.EVENT_NAMES.error, z);
    };
  }, []);
  const we = (z) => {
    v(z.target.value);
  }, Me = (z) => {
    let R = z.target.value;
    if (z.key === "Enter") {
      R === "" && (R = "~");
      const C = o == null ? void 0 : o.navigate(R);
      if (C == null) {
        Z({
          title: "Error",
          iconUrl: e == null ? void 0 : e.iconUrl,
          size: new Be(300, 150),
          Modal: (V) => /* @__PURE__ */ W(en, { ...V, children: [
            /* @__PURE__ */ W("p", { children: [
              'Invalid path: "',
              R,
              '"'
            ] }),
            /* @__PURE__ */ b("button", { "data-type": tn.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
          ] })
        });
        return;
      }
      p(C), v(C.root ? "/" : C.path);
    }
  }, ge = f.getItemCount(L);
  return /* @__PURE__ */ W("div", { className: s ? `${H.FileExplorer} ${H.Selector}` : H.FileExplorer, children: [
    /* @__PURE__ */ W("div", { className: H.Header, children: [
      /* @__PURE__ */ b(
        "button",
        {
          title: "Back",
          tabIndex: 0,
          className: H.IconButton,
          onClick: () => {
            $();
          },
          disabled: !F,
          children: /* @__PURE__ */ b(re, { icon: eo })
        }
      ),
      /* @__PURE__ */ b(
        "button",
        {
          title: "Forward",
          tabIndex: 0,
          className: H.IconButton,
          onClick: () => {
            T();
          },
          disabled: !d,
          children: /* @__PURE__ */ b(re, { icon: Zi })
        }
      ),
      /* @__PURE__ */ b(
        "button",
        {
          title: "Up",
          tabIndex: 0,
          className: H.IconButton,
          onClick: () => {
            ee("..");
          },
          disabled: f.isRoot != null && f.isRoot,
          children: /* @__PURE__ */ b(re, { icon: fo })
        }
      ),
      /* @__PURE__ */ b(
        "button",
        {
          title: "New",
          tabIndex: 0,
          className: H.IconButton,
          onClick: () => {
            Z({
              title: "Error",
              iconUrl: e == null ? void 0 : e.iconUrl,
              size: new Be(300, 150),
              Modal: (z) => /* @__PURE__ */ W(en, { ...z, children: [
                /* @__PURE__ */ b("p", { children: "This folder is protected." }),
                /* @__PURE__ */ b("button", { "data-type": tn.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
              ] })
            });
          },
          disabled: !f.canBeEdited,
          children: /* @__PURE__ */ b(re, { icon: uo })
        }
      ),
      /* @__PURE__ */ b(
        "input",
        {
          value: y,
          type: "text",
          "aria-label": "Path",
          className: H.PathInput,
          tabIndex: 0,
          onChange: we,
          onKeyDown: Me,
          placeholder: "Enter a path..."
        }
      ),
      /* @__PURE__ */ b(Ao, { directory: f }),
      /* @__PURE__ */ b("button", { title: "Search", tabIndex: 0, className: H.IconButton, children: /* @__PURE__ */ b(re, { icon: co }) }),
      /* @__PURE__ */ b("button", { title: "Settings", tabIndex: 0, className: H.IconButton, children: /* @__PURE__ */ b(re, { icon: ao }) })
    ] }),
    /* @__PURE__ */ W("div", { className: H.Body, children: [
      /* @__PURE__ */ W("div", { className: H.Sidebar, children: [
        /* @__PURE__ */ b(He, { name: "Home", onClick: () => {
          ee("~");
        }, icon: oo }),
        /* @__PURE__ */ b(He, { name: "Desktop", onClick: () => {
          ee("~/Desktop");
        }, icon: mo }),
        /* @__PURE__ */ b(He, { name: "Images", onClick: () => {
          ee("~/Pictures");
        }, icon: to }),
        /* @__PURE__ */ b(He, { name: "Documents", onClick: () => {
          ee("~/Documents");
        }, icon: Qi })
      ] }),
      /* @__PURE__ */ b(
        zr,
        {
          directory: f,
          id: "main",
          className: H.Main,
          showHidden: L,
          onOpenFile: (z, R) => {
            if (z.preventDefault(), s)
              return void (i == null ? void 0 : i());
            const C = {};
            (R.extension === "md" || R.extension != null && jr.includes(R.extension)) && (C.mode = "view"), l == null || l.openFile(R, C);
          },
          onOpenFolder: (z, R) => {
            ee(R.linkedPath ?? R.name);
          },
          onContextMenuFile: he,
          onContextMenuFolder: Ne,
          allowMultiSelect: n !== Vn.SINGLE,
          onSelectionChange: a
        }
      )
    ] }),
    s ? /* @__PURE__ */ b("div", { className: H.Footer, children: /* @__PURE__ */ b(r, {}) }) : /* @__PURE__ */ b("span", { className: H.Footer, children: /* @__PURE__ */ b("p", { className: zt.TextLight, children: ge === 1 ? ge + " item" : ge + " items" }) })
  ] });
}
var No = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.Single = 1] = "Single", e[e.Multi = 2] = "Multi", e))(No || {});
const Mo = new Hn("File Explorer", "file-explorer", Io).setIconUrl("https://os.prozilla.dev/assets/apps/icons/file-explorer.svg").setRole(Lt.APP_ROLES.fileExplorer).setCategory("Utilities & tools");
Mo.setMetadata({ name: "@prozilla-os/file-explorer", version: "1.1.17", author: "Prozilla" });
(function() {
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.appendChild(document.createTextNode("._MediaViewer_vkowo_1{display:flex;justify-content:center;align-items:center;width:100%;height:100%;padding:2rem}._MediaViewer_vkowo_1 img{width:100%;height:100%;object-fit:contain}._VideoViewer_vkowo_16,._AudioViewer_vkowo_16{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%}._VideoViewer_vkowo_16 h3{margin:0}._VideoViewer_vkowo_16>*{width:100%;height:100%;border:none;background:transparent}")), document.head.appendChild(e);
    }
  } catch (t) {
    console.error("vite-plugin-css-injected-by-js", t);
  }
})();
const Ro = "_MediaViewer_vkowo_1", Lo = "_VideoViewer_vkowo_16", Fo = "_AudioViewer_vkowo_16", Se = {
  MediaViewer: Ro,
  VideoViewer: Lo,
  AudioViewer: Fo
};
function zo({ file: e, close: t, setTitle: n }) {
  const { appsConfig: r } = Ft(), a = qn(), i = sn(null), s = sn(null);
  if (Xe(() => {
    e != null && (n == null || n(e.id));
  }, [e, n]), Xe(() => {
    if (!(e == null || e.source == null))
      return e.extension && an.includes(e.extension) && i.current && (i.current.src = e.source, i.current.play()), e.extension && on.includes(e.extension) && s.current && (s.current.src = e.source, s.current.play()), () => {
        i.current && (i.current.pause(), i.current.currentTime = 0), s.current && (s.current.pause(), s.current.currentTime = 0);
      };
  }, [e]), e == null) {
    const o = r.getAppByRole(Lt.APP_ROLES.fileExplorer);
    return setTimeout(() => {
      o != null && (a == null || a.open(o.id, { path: "~/Pictures" })), t == null || t();
    }, 10), null;
  }
  return e.extension == null || !Gn.includes(e.extension) ? /* @__PURE__ */ b("p", { children: "Invalid file format." }) : e.source == null ? /* @__PURE__ */ b("p", { children: "File failed to load." }) : $r.includes(e.extension) ? /* @__PURE__ */ b("div", { className: Se.MediaViewer, children: /* @__PURE__ */ b("img", { src: e.source, alt: e.id, draggable: "false" }) }) : an.includes(e.extension) ? /* @__PURE__ */ b("div", { className: Se.AudioViewer, children: /* @__PURE__ */ W("audio", { ref: i, controls: !0, children: [
    /* @__PURE__ */ b("source", { src: e.source, type: `video/${e.extension}` }),
    "Your browser does not support audio."
  ] }) }) : on.includes(e.extension) ? e.extension === "yt" ? /* @__PURE__ */ b("div", { className: Se.VideoViewer, children: /* @__PURE__ */ b(
    "iframe",
    {
      src: e.source.replace("watch?v=", "embed/"),
      title: e.id,
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: !0,
      allowTransparency: !0
    }
  ) }) : /* @__PURE__ */ b("div", { className: Se.VideoViewer, children: /* @__PURE__ */ W("video", { ref: s, controls: !0, className: Se.VideoPlayer, children: [
    /* @__PURE__ */ b("source", { src: e.source, type: `video/${e.extension}` }),
    "Your browser does not support videos."
  ] }) }) : /* @__PURE__ */ b("div", { className: Se.MediaViewer, children: /* @__PURE__ */ b("img", { src: e.source, alt: e.id, draggable: "false" }) });
}
const jo = new Hn("Media Viewer", "media-viewer", zo).setIconUrl("https://os.prozilla.dev/assets/apps/icons/media-viewer.svg").setRole(Lt.APP_ROLES.mediaViewer).setAssociatedExtensions(Gn).setCategory("Photo & video");
jo.setMetadata({ name: "@prozilla-os/media-viewer", version: "1.1.17", author: "Prozilla" });
export {
  No as FileSelectorMode,
  Mo as fileExplorer,
  jo as mediaViewer
};
//# sourceMappingURL=main.js.map
