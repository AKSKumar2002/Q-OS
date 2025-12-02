import { VirtualFile as m } from "@prozilla-os/core";
import { f } from "./main-CtddTNml.js";
import { C as u } from "./command-nBL1aO7T.js";
const p = new u().setRequireArgs(!0).setManual({
  purpose: "Remove a file"
}).setExecute(function(t, o) {
  const { currentDirectory: n } = o, e = t[0], { name: i, extension: s } = m.splitId(e), r = n.findFile(i, s);
  return r ? (r.delete(), { blank: !0 }) : f(this.name, `${e}: No such file`);
});
export {
  p as rm
};
//# sourceMappingURL=rm-DWh0ri41.js.map
