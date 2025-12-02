var g = Object.defineProperty;
var m = (t) => {
  throw TypeError(t);
};
var M = (t, n, e) => n in t ? g(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var d = (t, n, e) => M(t, typeof n != "symbol" ? n + "" : n, e), b = (t, n, e) => n.has(t) || m("Cannot " + e);
var i = (t, n, e) => (b(t, n, "read from private field"), e ? e.call(t) : n.get(t)), x = (t, n, e) => n.has(t) ? m("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, e);
const A = {
  fg: {
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m"
  },
  bg: {},
  decoration: {
    dim: "\x1B[2m",
    bold: "\x1B[1m"
  },
  reset: "\x1B[0m"
};
function E(t, n) {
  const e = n.indexOf(t);
  e !== -1 && n.splice(e, 1);
}
function O(t) {
  return t[Math.floor(Math.random() * t.length)];
}
function T(t) {
  return t.filter((n, e) => t.indexOf(n) === e);
}
const p = {
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24,
  w: 1e3 * 60 * 60 * 24 * 7,
  n: 1e3 * 60 * 60 * 24 * 31,
  y: 1e3 * 60 * 60 * 24 * 365,
  c: 1e3 * 60 * 60 * 24 * 365 * 100
};
function y(t, n = 3, e) {
  const s = [], a = (o, f) => {
    if (!e)
      return o.join(", ");
    let u = "", h = "";
    return f ? h = "ago" : u = "in", [u, o.join(", "), h].join(" ").trim();
  };
  let c = !1;
  if (t < 0 && (t = -t, c = !0), Math.abs(t) < p.s)
    return a(["less than a second"], c);
  const l = [], B = {
    s: "seconds",
    m: "minutes",
    h: "hours",
    d: "days",
    n: "months",
    y: "years"
  };
  for (const [o, f] of Object.entries(p).reverse()) {
    if (o === "w" || o === "c")
      continue;
    const u = Math.floor(t / f);
    t -= u * f, u > 0 && l.push({ amount: u, label: B[o] });
  }
  for (let o = 0; o < n; o++) {
    const f = l[o];
    f && s.push(`${f.amount} ${f.label}`);
  }
  return s.length === 0 ? a(["less than a second"], c) : a(s, c);
}
function j(t, n = 3, e) {
  const s = t.valueOf() - Date.now();
  return y(s, n, e);
}
var r;
class I {
  constructor() {
    x(this, r, {});
  }
  /**
   * Add event listener for an event
   */
  on(n, e) {
    i(this, r)[n] || (i(this, r)[n] = []), i(this, r)[n].push(e);
  }
  /**
   * Remove event listener for an event
   */
  off(n, e) {
    i(this, r)[n] && (i(this, r)[n] = i(this, r)[n].filter(
      (s) => s !== e
    ));
  }
  /**
   * Dispatch event
   */
  emit(n, e) {
    i(this, r)[n] && i(this, r)[n].forEach((s) => {
      s(e);
    });
  }
}
r = new WeakMap(), d(I, "EVENT_NAMES", {});
function R(t, n, e) {
  return t < n ? n : t > e ? e : t;
}
function D(t, n) {
  return Math.random() * (n - t) + t;
}
function F(t, n) {
  const e = Math.pow(10, n || 0);
  return Math.round(t * e) / e;
}
function S(t) {
  return typeof t == "number" || parseInt(t) || parseInt(t) === 0;
}
export {
  A as ANSI,
  I as EventEmitter,
  R as clamp,
  j as formatRelativeTime,
  y as formatTime,
  S as isValidInteger,
  O as randomFromArray,
  D as randomRange,
  T as removeDuplicatesFromArray,
  E as removeFromArray,
  F as round
};
//# sourceMappingURL=main.js.map
