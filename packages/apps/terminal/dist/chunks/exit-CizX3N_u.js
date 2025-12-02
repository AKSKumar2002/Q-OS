import { C as n } from "./command-nBL1aO7T.js";
const o = new n().setManual({
  purpose: "Quit terminal interface"
}).setExecute(function(r, e) {
  const { exit: t } = e;
  return t == null || t(), { blank: !0 };
});
export {
  o as exit
};
//# sourceMappingURL=exit-CizX3N_u.js.map
