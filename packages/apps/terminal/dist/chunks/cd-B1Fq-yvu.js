import { VirtualFile as a } from "@prozilla-os/core";
import { f as c } from "./main-CtddTNml.js";
import { C as s } from "./command-nBL1aO7T.js";
const d = new s().setManual({
  purpose: "Change the current directory",
  usage: "cd [PATH]",
  description: "Change working directory to given path (the home directory by default)."
}).setExecute(function(r, o) {
  const { currentDirectory: n, setCurrentDirectory: e } = o, i = r[0] ?? "~";
  let t = n.navigate(i);
  return t ? (t instanceof a && (t = t.parent), e == null || e(t), { blank: !0 }) : c(this.name, `${r[0]}: No such file or directory`);
});
export {
  d as cd
};
//# sourceMappingURL=cd-B1Fq-yvu.js.map
