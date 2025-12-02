import { C as s } from "./command-nBL1aO7T.js";
const r = new s().setManual({
  purpose: "Display the current uptime of the system"
}).setExecute(function(m, e) {
  const { systemManager: t } = e;
  return `Uptime: ${t.getUptime(2)}`;
});
export {
  r as uptime
};
//# sourceMappingURL=uptime-BYmCcOUM.js.map
