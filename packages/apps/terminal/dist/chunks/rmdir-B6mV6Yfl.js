import { f as s } from "./main-CtddTNml.js";
import { C as u } from "./command-nBL1aO7T.js";
const m = new u().setRequireArgs(!0).setManual({
  purpose: "Remove a directory"
}).setExecute(function(t, o) {
  const { currentDirectory: n } = o, r = t[0], e = n.findSubFolder(r);
  return e ? (e.delete(), { blank: !0 }) : s(this.name, `${r}: No such directory`);
});
export {
  m as rmdir
};
//# sourceMappingURL=rmdir-B6mV6Yfl.js.map
