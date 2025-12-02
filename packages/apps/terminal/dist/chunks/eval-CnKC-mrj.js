import { C as Command } from "./command-nBL1aO7T.js";
const evalCommand = new Command().setRequireArgs(!0).setManual({
  purpose: "Evaluate and execute JavaScript code",
  usage: "eval [input]"
}).setRequireArgs(!0).setExecute(function(args) {
  if (args == null || args.length == 0)
    return;
  const output = eval(args[0]) ?? { blank: !0 };
  return output;
});
export {
  evalCommand as eval
};
//# sourceMappingURL=eval-CnKC-mrj.js.map
