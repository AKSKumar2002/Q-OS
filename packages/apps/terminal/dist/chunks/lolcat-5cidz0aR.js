import { ANSI as n } from "@prozilla-os/shared";
import { r as O } from "./main-CtddTNml.js";
import { C as b } from "./command-nBL1aO7T.js";
const o = 5, i = 2, u = [
  n.fg.red,
  n.fg.yellow,
  n.fg.green,
  n.fg.cyan,
  n.fg.blue,
  n.fg.magenta
], N = new b().setManual({
  purpose: "Display text with a rainbow effect"
}).setExecute(function(C, m) {
  const { rawInputValue: l, timestamp: g } = m;
  if (l == null) return;
  let e = O(l).split(`
`);
  const p = g / 100;
  return e = e.map((r, w) => {
    const f = [], a = w + p, s = o - i * a % o;
    let d = Math.floor(a / (o / i));
    const c = (t, h) => {
      const I = r.substring(t, h), x = u[d++ % u.length];
      f.push(x + I);
    };
    s > 0 && c(0, s);
    for (let t = s; t < r.length; t += o + 1)
      c(t, t + o + 1);
    return r.length === 0 ? "" : f.join("");
  }), e.join(`
`);
});
export {
  N as lolcat
};
//# sourceMappingURL=lolcat-5cidz0aR.js.map
