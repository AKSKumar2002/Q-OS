import { C as s } from "./command-nBL1aO7T.js";
const c = new s().setManual({
  purpose: "List all directories in the current directory"
}).setExecute(function(i, t) {
  const { currentDirectory: o } = t, e = o.subFolders.map((r) => r.id);
  return e.length === 0 ? { blank: !0 } : e.sort((r, n) => r.localeCompare(n)).join(" ");
});
export {
  c as dir
};
//# sourceMappingURL=dir-BlrznBqV.js.map
