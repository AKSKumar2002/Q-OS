import { f } from "./main-CtddTNml.js";
import { C as l } from "./command-nBL1aO7T.js";
import { ANSI as i } from "@prozilla-os/shared";
const p = new l().setManual({
  purpose: "List directory contents",
  usage: "ls [options] [files]",
  description: "List information about directories or files (the current directory by default)."
}).setExecute(function(t, s) {
  const { currentDirectory: r } = s;
  let e = r;
  if (t != null && t.length > 0 && (e = r.navigate(t[0])), !e)
    return f(this.name, `Cannot access '${t[0]}': No such file or directory`);
  const c = e.subFolders.map((o) => `${i.fg.blue}${o.id}${i.reset}`), a = e.files.map((o) => o.id), n = c.concat(a);
  return n.length === 0 ? { blank: !0 } : n.sort().join("  ");
});
export {
  p as ls
};
//# sourceMappingURL=ls-iadOT5Yu.js.map
