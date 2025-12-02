(function(){"use strict";try{if(typeof document<"u"){var r=document.createElement("style");r.appendChild(document.createTextNode('._Browser_rk8bv_1{--header-height: 3.5rem;--nav-bar-height: 2.25rem;display:flex;flex-direction:column;width:100%;height:100%}._Header_rk8bv_11{display:flex;flex-direction:column;width:100%;height:var(--header-height);background-color:var(--background-color-0)}._NavBar_rk8bv_19{display:flex;gap:1rem;justify-content:flex-start;align-items:center;width:100%;height:var(--nav-bar-height);padding:1.25rem}._IconButton_rk8bv_29{--color: var(--foreground-color-0);position:relative;display:flex;justify-content:center;align-items:center;height:1rem;width:auto;padding:0;background:none;border:none;outline:none;aspect-ratio:1;cursor:pointer}._IconButton_rk8bv_29:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff0;border-radius:var(--border-radius-99);transform:scale(1);transform-origin:center;transition:all var(--transition-duration-1) var(--ease-in-out-default)}._IconButton_rk8bv_29:hover:after,._IconButton_rk8bv_29:focus-visible:after{background-color:#ffffff1a;transform:scale(175%)}._IconButton_rk8bv_29:disabled{--color: var(--foreground-color-2)}._IconButton_rk8bv_29 svg{height:100%}._IconButton_rk8bv_29 svg path{fill:var(--color);transition:fill var(--transition-duration-0) var(--ease-in-out-default)}._SearchBar_rk8bv_79{flex:1;padding:.25rem .5rem;background-color:var(--background-color-2);border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:.875em}._Bookmarks_rk8bv_90{height:calc(var(--header-height) - var(--nav-bar-height))}')),document.head.appendChild(r)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { useHistory as x, WebView as R, isValidUrl as H, App as S, Vector2 as y, AppsConfig as A } from "@prozilla-os/core";
import { jsxs as u, jsx as e } from "react/jsx-runtime";
import { useState as h, useRef as z, useEffect as E } from "react";
import { FontAwesomeIcon as a } from "@fortawesome/react-fontawesome";
import { faCaretLeft as L, faCaretRight as P, faRotateRight as V, faHome as W } from "@fortawesome/free-solid-svg-icons";
const $ = "_Browser_rk8bv_1", j = "_Header_rk8bv_11", F = "_NavBar_rk8bv_19", M = "_IconButton_rk8bv_29", O = "_SearchBar_rk8bv_79", U = "_Bookmarks_rk8bv_90", o = {
  Browser: $,
  Header: j,
  NavBar: F,
  IconButton: M,
  SearchBar: O,
  Bookmarks: U
}, p = "https://prozilla.dev/", q = "https://www.google.com/search?igu=1";
function D({ url: s = p, focus: v }) {
  const [c, d] = h(s), [f, m] = h(s), { history: i, pushState: _, stateIndex: b, undo: k, redo: w, undoAvailable: I, redoAvailable: g } = x(s), r = z(null);
  E(() => {
    i.length !== 0 && d(i[b]);
  }, [i, b]);
  const B = () => {
    r.current == null || r.current.contentWindow == null || (r.current.contentWindow.location.href = c);
  }, l = (t) => {
    if (c === t)
      return B();
    d(t), m(t), _(t);
  }, N = (t) => {
    m(t.target.value);
  }, C = (t) => {
    const n = t.target.value;
    t.key === "Enter" && n !== "" && (H(n) ? l(n) : l(`${q}&q=${n}`));
  };
  return /* @__PURE__ */ u("div", { className: o.Browser, children: [
    /* @__PURE__ */ u("div", { className: o.Header, children: [
      /* @__PURE__ */ u("div", { className: o.NavBar, children: [
        /* @__PURE__ */ e(
          "button",
          {
            title: "Back",
            tabIndex: 0,
            className: o.IconButton,
            onClick: () => {
              k();
            },
            disabled: !I,
            children: /* @__PURE__ */ e(a, { icon: L })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            title: "Forward",
            tabIndex: 0,
            className: o.IconButton,
            onClick: () => {
              w();
            },
            disabled: !g,
            children: /* @__PURE__ */ e(a, { icon: P })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            title: "Reload",
            tabIndex: 0,
            className: o.IconButton,
            onClick: B,
            children: /* @__PURE__ */ e(a, { icon: V })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            title: "Home",
            tabIndex: 0,
            className: o.IconButton,
            onClick: () => {
              l(p);
            },
            children: /* @__PURE__ */ e(a, { icon: W })
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            value: f,
            type: "text",
            "aria-label": "Search bar",
            className: o.SearchBar,
            tabIndex: 0,
            onChange: N,
            onKeyDown: C
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: o.Bookmarks })
    ] }),
    /* @__PURE__ */ e(R, { ref: r, source: c, title: "Browser", focus: v })
  ] });
}
const K = new S("Browser", "browser", D, { size: new y(700, 500) }).setIconUrl("https://os.prozilla.dev/assets/apps/icons/browser.svg").setRole(A.APP_ROLES.browser).setCategory("Utilities & tools");
K.setMetadata({ name: "@prozilla-os/browser", version: "1.1.17", author: "Prozilla" });
export {
  K as browser
};
//# sourceMappingURL=main.js.map
