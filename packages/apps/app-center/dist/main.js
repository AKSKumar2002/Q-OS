(function(){"use strict";try{if(typeof document<"u"){var r=document.createElement("style");r.appendChild(document.createTextNode("._AppCenter_i8u9y_1{display:flex;gap:.5rem;flex-direction:column;height:100%}._Header_13ehb_1{display:flex;gap:.75rem;flex-wrap:nowrap;height:2rem;min-height:2rem;margin:1rem;overflow:hidden}._SearchInput_13ehb_11{flex:1;width:auto;max-width:100%;padding:.25rem .5rem;height:100%;background-color:var(--background-color-2);border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._CategoryInput_13ehb_25{flex:.25;width:auto;max-width:100%;padding:.25rem .5rem;height:100%;color:var(--text-color);background-color:var(--background-color-1);border:none;border-radius:var(--border-radius-1);outline:none;font-size:inherit;font-family:inherit}._CategoryInput_13ehb_25>*{color:inherit;background-color:inherit;border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._List_j2dmd_1{--gap: 1rem;--columns: 6;display:flex;gap:var(--gap);flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-items:flex-start;margin:1rem;max-height:100%;overflow:auto}._App_j2dmd_16{display:flex;justify-content:space-evenly;align-items:center;flex-direction:column;width:calc((100% - var(--gap) * (var(--columns) - 1)) / var(--columns));height:auto;background-color:var(--background-color-1);border-radius:var(--border-radius-1);overflow:hidden;aspect-ratio:16 / 14;transition:background-color var(--transition-duration-1) var(--ease-in-out-default);cursor:pointer}._App_j2dmd_16:hover,._App_j2dmd_16:focus-visible{background-color:var(--background-color-0)}._AppIcon_j2dmd_35{flex-grow:0;width:50%;height:auto;aspect-ratio:1;filter:drop-shadow(.1rem .1rem .2rem color-mix(in srgb,var(--black-4) 75%,transparent))}._AppIcon_j2dmd_35 div,._AppIcon_j2dmd_35 svg{width:100%;height:100%;aspect-ratio:inherit;border-radius:var(--border-radius-1)}._AppName_j2dmd_50{margin:0;font-size:1.25rem;font-weight:500}")),document.head.appendChild(r)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { useSystemManager as u, APP_CATEGORIES as A, Image as m, App as _ } from "@prozilla-os/core";
import { jsxs as l, jsx as t } from "react/jsx-runtime";
import { useState as d } from "react";
const C = "_AppCenter_i8u9y_1", g = {
  AppCenter: C
}, y = "_Header_13ehb_1", I = "_SearchInput_13ehb_11", v = "_CategoryInput_13ehb_25", i = {
  Header: y,
  SearchInput: I,
  CategoryInput: v
};
function N({ searchQuery: o, setSearchQuery: a, category: s, setCategory: p }) {
  const { appsConfig: n } = u(), r = (e) => {
    a(e.target.value);
  }, h = (e) => {
    p(e.target.value);
  };
  return /* @__PURE__ */ l("div", { className: i.Header, children: [
    /* @__PURE__ */ t("input", { className: i.SearchInput, value: o, onChange: r, type: "text", placeholder: "Search..." }),
    /* @__PURE__ */ l("select", { className: i.CategoryInput, value: s, onChange: h, children: [
      /* @__PURE__ */ t("option", { value: "All", children: "All" }),
      A.filter((e) => n.getAppsByCategory(e).length > 0).map(
        (e) => /* @__PURE__ */ t("option", { value: e, children: e }, e)
      )
    ] })
  ] });
}
const f = "_List_j2dmd_1", S = "_App_j2dmd_16", L = "_AppIcon_j2dmd_35", j = "_AppName_j2dmd_50", c = {
  List: f,
  App: S,
  AppIcon: L,
  AppName: j
};
function $({ apps: o, searchQuery: a, category: s }) {
  return /* @__PURE__ */ t("div", { className: c.List, children: o.filter(({ name: p, id: n, category: r }) => (p.toLowerCase().includes(a) || n.toLowerCase().replaceAll("-", " ").includes(a)) && (s == "All" || r == s)).map(
    ({ name: p, id: n, iconUrl: r }) => /* @__PURE__ */ l("div", { className: c.App, children: [
      /* @__PURE__ */ t("div", { className: c.AppIcon, children: r && /* @__PURE__ */ t(m, { src: r }) }),
      /* @__PURE__ */ t("p", { className: c.AppName, children: p })
    ] }, n)
  ) });
}
function H() {
  const { appsConfig: o } = u(), [a, s] = d(""), [p, n] = d("All");
  return /* @__PURE__ */ l("div", { className: g.AppCenter, children: [
    /* @__PURE__ */ t(N, { searchQuery: a, setSearchQuery: s, category: p, setCategory: n }),
    /* @__PURE__ */ t($, { apps: o.apps, searchQuery: a, category: p })
  ] });
}
const x = new _("AppCenter", "app-center", H).setIconUrl("https://os.prozilla.dev/assets/apps/icons/app-center.svg").setPinnedByDefault(!0).setCategory("Utilities & tools");
x.setMetadata({ name: "@prozilla-os/app-center", version: "1.0.10", author: "Prozilla" });
export {
  x as appCenter
};
//# sourceMappingURL=main.js.map
