import { SettingsManager as d } from "@prozilla-os/core";
import { ANSI as n } from "@prozilla-os/shared";
import { A as I, a as S } from "./main-CtddTNml.js";
import { C as y } from "./command-nBL1aO7T.js";
import { Theme as l } from "@prozilla-os/skins";
const U = new y().setManual({
  purpose: "Fetch system information"
}).setExecute(async function(O, A) {
  const { username: a, hostname: s, app: m, systemManager: f, settingsManager: C } = A, c = S.split(`
`), h = ((a == null ? void 0 : a.length) ?? 0) + ((s == null ? void 0 : s.length) ?? 0) + 1, g = await C.getSettings(d.VIRTUAL_PATHS.theme).get("theme");
  let p = l[l.Dark];
  g != null && parseInt(g) && (p = l[parseInt(g)]);
  const i = navigator.userAgent;
  let o;
  i.match(/Firefox\//) ? o = "Mozilla Firefox" : i.match(/Edg\//) ? o = "Microsoft Edge" : i.match(/Chrome\//) ? o = "Google Chrome" : i.match(/Safari\//) ? o = "Apple Safari" : o = "Unknown";
  const e = (t, r) => n.fg.cyan + t.toUpperCase() + n.reset + ": " + r, u = [
    `${n.fg.cyan + a + n.reset}@${n.fg.cyan + s + n.reset}`,
    "-".repeat(h),
    e("os", f.systemName),
    e("uptime", f.getUptime(2)),
    e("resolution", window.innerWidth + "x" + window.innerHeight),
    e("theme", p),
    e("icons", "Font Awesome"),
    e("terminal", (m == null ? void 0 : m.name) ?? "Unknown"),
    e("browser", o),
    e("platform", navigator.platform),
    e("language", navigator.language),
    "",
    Object.values(n.fg).map((t) => t + "███").join("") + n.reset
  ], w = [];
  for (let t = 1; t < c.length; t++) {
    let r = `${I + c[t] + n.reset}  `;
    t <= u.length ? r += u[t - 1] : r += " ".repeat(h), w.push(r);
  }
  return w.join(`
`);
});
export {
  U as neofetch
};
//# sourceMappingURL=neofetch-B_s_ejF6.js.map
