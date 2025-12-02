import { Vector2 as x } from "@prozilla-os/core";
import { randomRange as u, removeFromArray as d, randomFromArray as l, ANSI as m } from "@prozilla-os/shared";
import { C as w } from "./command-nBL1aO7T.js";
import { S as E } from "./main-CtddTNml.js";
const g = 1.25, c = 75, S = 20, z = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.*\\/()#@&$!?%°:<>[]", f = {
  framesBetweenSpawn: 30,
  fallSpeed: 1,
  minSize: 5,
  maxSize: 25
};
function A(s, r, i) {
  if (s % f.framesBetweenSpawn) {
    const o = {
      position: new x(u(0, c), S).round(),
      size: Math.round(u(f.minSize, f.maxSize))
    };
    i.push(o);
  }
  return i.forEach((o) => {
    o.position.y -= f.fallSpeed;
    for (let n = 0; n < f.fallSpeed; n++) {
      const t = o.position.x, e = o.position.y + n + o.size;
      e < S && e >= 0 && (r[e][t] = " ");
    }
    if (o.position.y + o.size <= 0 || o.position.x >= c)
      return d(o, i);
    for (let n = 0; n < o.size; n++) {
      const t = l(z.split(""));
      let e = n == 0 ? m.fg.white : m.fg.green;
      n > o.size / 2 && (e = m.fg.green + m.decoration.dim);
      const a = o.position.x, p = o.position.y + n;
      a < c && p < S && p >= 0 && (r[p][a] = e + t + m.reset);
    }
  }), [...r.map((o) => o.join(""))].reverse().join(`
`);
}
const N = new w().setManual({
  purpose: "Show a scrolling 'Matrix' like screen",
  usage: "cmatrix"
}).setExecute(function() {
  const s = new E(), r = [], i = [];
  for (let t = 0; t < S; t++) {
    const e = [];
    for (let a = 0; a < c; a++)
      e.push(" ");
    i.push(e);
  }
  let o = 0;
  const n = setInterval(() => {
    const t = A(o, i, r);
    s.send(t), o++;
  }, 100 / g);
  return s.on(E.EVENT_NAMES.stop, () => {
    clearInterval(n);
  }), s.start(), s;
});
export {
  N as cmatrix
};
//# sourceMappingURL=cmatrix-ChR3i_Ee.js.map
