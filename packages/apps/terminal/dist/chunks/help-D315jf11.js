import { ANSI as t } from "@prozilla-os/shared";
import { C as u, f } from "./main-CtddTNml.js";
import { C as i } from "./command-nBL1aO7T.js";
const d = new i().setExecute(function(n) {
  var m;
  if ((n == null ? void 0 : n.length) === 0)
    return u.COMMANDS.map((e) => {
      var a;
      return (a = e.manual) != null && a.purpose ? `${e.name} - ${t.fg.green}${t.decoration.dim}${e.manual.purpose}${t.reset}` : e.name;
    }).sort().join(`
`);
  const o = n[0].toLowerCase(), r = u.find(o);
  return r ? (m = r.manual) != null && m.purpose ? r.manual.purpose : f(this.name, `${o}: No manual found`) : f(this.name, `${o}: Command not found`);
});
export {
  d as help
};
//# sourceMappingURL=help-D315jf11.js.map
