import { C as r } from "./command-nBL1aO7T.js";
const n = new r().setManual({
  purpose: "Display the reverse of a text"
}).setExecute(function(s, t) {
  const { rawInputValue: e } = t;
  return e == null ? void 0 : e.split("").reverse().join("");
});
export {
  n as rev
};
//# sourceMappingURL=rev-C8qQIyj_.js.map
