import { C as n } from "./command-nBL1aO7T.js";
const s = new n().setManual({
  purpose: "Clear terminal screen"
}).setExecute(function(t, r) {
  const { pushHistory: e } = r;
  return e == null || e({
    clear: !0,
    isInput: !1
  }), { blank: !0 };
});
export {
  s as clear
};
//# sourceMappingURL=clear-DtYBxmDr.js.map
