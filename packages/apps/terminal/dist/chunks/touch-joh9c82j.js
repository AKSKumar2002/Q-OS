import { VirtualFile as s } from "@prozilla-os/core";
import { f as a } from "./main-CtddTNml.js";
import { C as c } from "./command-nBL1aO7T.js";
const l = new c().setRequireArgs(!0).setManual({
  purpose: "Change file timestamps",
  usage: "touch [options] files",
  description: `Update the access and modification times of each FILE to the current time.

A file argument that does not exist is created empty.`
}).setExecute(function(e, n) {
  const { currentDirectory: t } = n, i = e[0];
  if (i === "girls\\" && e[1] === "boo**")
    return a(this.name, "Cannot touch 'girls boo**': Permission denied");
  const { name: o, extension: r } = s.splitId(i);
  return t.findFile(o, r) ? { blank: !0 } : (t.createFile(o, r), { blank: !0 });
});
export {
  l as touch
};
//# sourceMappingURL=touch-joh9c82j.js.map
