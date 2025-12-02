import { C as e } from "./command-nBL1aO7T.js";
const s = new e().setManual({
  purpose: "Display path of the current directory"
}).setExecute(function(o, r) {
  const { currentDirectory: t } = r;
  return t.root ? "/" : t.absolutePath;
});
export {
  s as pwd
};
//# sourceMappingURL=pwd-CSapfDtw.js.map
