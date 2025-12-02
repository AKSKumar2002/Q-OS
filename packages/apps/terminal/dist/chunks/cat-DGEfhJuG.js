import { VirtualFile as u } from "@prozilla-os/core";
import { f as a } from "./main-CtddTNml.js";
import { C as l } from "./command-nBL1aO7T.js";
const d = new l().setRequireArgs(!0).setManual({
  purpose: "Concetenate files and display on the terminal screen",
  usage: "cat [options] [files]",
  description: "Concetenate files to standard output."
}).setExecute(function(r, o) {
  const { currentDirectory: s, options: t } = o, n = r[0], { name: i, extension: c } = u.splitId(n), e = s.findFile(i, c);
  return e ? e.content ? t != null && t.includes("e") ? e.content.split(`
`).join(`$
`) + "$" : e.content : e.source ? `Src: ${e.source}` : { blank: !0 } : a(this.name, `${n}: No such file`);
});
export {
  d as cat
};
//# sourceMappingURL=cat-DGEfhJuG.js.map
