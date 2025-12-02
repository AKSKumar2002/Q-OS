import { ANSI as t } from "@prozilla-os/shared";
import { C as e, f as a } from "./main-CtddTNml.js";
import { C as s } from "./command-nBL1aO7T.js";
const p = new s().setRequireArgs(!0).setManual({
  purpose: "Show information about a command"
}).setExecute(function(m) {
  var r;
  const o = m[0].toLowerCase(), n = e.find(o);
  return n ? (r = n.manual) != null && r.purpose ? `${o} - ${t.fg.green}${n.manual.purpose}` : a(this.name, `${o}: No information found`) : a(this.name, `${o}: Command not found`);
});
export {
  p as whatis
};
//# sourceMappingURL=whatis-BNrqZD9A.js.map
