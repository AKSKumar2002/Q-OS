(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode("._Calculator_ufkko_1{display:flex;flex-direction:column;height:100%;--output-height: 20%;--button-gap: .25rem}._Output_ufkko_10{display:flex;gap:.25rem;flex-direction:column;justify-content:center;align-items:flex-end;height:var(--output-height);padding:.5rem}._Calculation_ufkko_20,._Preview_ufkko_20{margin:0}._Calculation_ufkko_20{color:var(--foreground-color-2);height:1.25rem}._Preview_ufkko_20{color:var(--foreground-color-0);font-size:2.5rem}._Input_ufkko_34{display:flex;gap:var(--button-gap);flex-direction:column;height:calc(100% - var(--output-height));padding:.5rem}._InputRow_ufkko_42{flex:1;display:flex;gap:var(--button-gap)}._Button_ufkko_48{flex:1;border-radius:var(--border-radius-0);font-size:1.5rem}._InputRow_ufkko_42:first-of-type ._Button_ufkko_48{--normal-color: var(--background-color-1);--hover-color: var(--background-color-2)}._InputRow_ufkko_42 ._Button_ufkko_48:last-of-type{--text-color: var(--background-color-0);--normal-color: var(--blue-0);--hover-color: var(--blue-1)}._ButtonLarge_ufkko_65{min-width:calc(50% - var(--button-gap) / 2)}")),document.head.appendChild(o)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { Button as a, App as R, Vector2 as $ } from "@prozilla-os/core";
import { jsxs as r, jsx as t } from "react/jsx-runtime";
import { useState as f, useCallback as B, useEffect as F } from "react";
const L = "_Calculator_ufkko_1", O = "_Output_ufkko_10", P = "_Calculation_ufkko_20", g = "_Preview_ufkko_20", E = "_Input_ufkko_34", S = "_InputRow_ufkko_42", z = "_Button_ufkko_48", x = "_ButtonLarge_ufkko_65", e = {
  Calculator: L,
  Output: O,
  Calculation: P,
  Preview: g,
  Input: E,
  InputRow: S,
  Button: z,
  ButtonLarge: x
};
function D({ active: b }) {
  const [l, o] = f("0"), [i, _] = f(null), [k, h] = f(null), [N, w] = f(null), [I, y] = f(!1), d = B(() => {
    o("0"), _(null), h(null), w(null);
  }, []), n = B((s) => {
    let c = !1;
    k != null && (I && l != null ? (_(parseFloat(l)), h(null), o(null)) : d(), c = !0), !(s === "." && (l != null && l.includes("."))) && (s === "-" ? l === "0" ? o("-0") : l != null && o((parseFloat(l) * -1).toString()) : s === "%" && l != null ? o((parseFloat(l) / 100).toString()) : l === "0" || l === "-0" || l == null || c ? o(s === "." ? "0." : l === "-0" ? `-${s}` : s) : o(l + s));
  }, [l, I, d, k]), m = B((s = !1) => {
    if (i != null && l != null) {
      h(parseFloat(l));
      const c = i, C = parseFloat(l);
      let p = 0;
      switch (N) {
        case "×":
          p = c * C;
          break;
        case "÷":
          p = c / C;
          break;
        case "+":
          p = c + C;
          break;
        case "-":
          p = c - C;
          break;
      }
      o(p.toString());
    }
    y(s);
  }, [i, l, N]), u = B((s) => {
    i != null && k == null ? m(!0) : l != null && (_(parseFloat(l)), h(null), o(null)), w(s);
  }, [m, i, l, k]);
  F(() => {
    const s = (c) => {
      if (b)
        switch (c.preventDefault(), c.key) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            n(c.key);
            break;
          case ".":
          case ",":
            n(".");
            break;
          case "Escape":
            d();
            break;
          case "=":
          case "Enter":
            m();
            break;
          case "*":
            u("×");
            break;
          case "/":
            u("÷");
            break;
          case "+":
          case "-":
            u(c.key);
            break;
          case "%":
            n("%");
            break;
          case "Backspace":
            l != null && l.length > 0 && o(l.slice(0, -1));
            break;
        }
    };
    return document.addEventListener("keydown", s), () => {
      document.removeEventListener("keydown", s);
    };
  }, [b, n, m, u, d]);
  let v = "";
  return N != null && (v = `${i} ${N} ${k != null ? k + " =" : ""}`), /* @__PURE__ */ r("div", { className: e.Calculator, children: [
    /* @__PURE__ */ r("div", { className: e.Output, children: [
      /* @__PURE__ */ t("p", { className: e.Calculation, children: v }),
      /* @__PURE__ */ t("p", { className: e.Preview, children: l ?? i })
    ] }),
    /* @__PURE__ */ r("div", { className: e.Input, children: [
      /* @__PURE__ */ r("div", { className: e.InputRow, children: [
        /* @__PURE__ */ t(a, { className: e.Button, onClick: d, children: "C" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("-");
        }, children: "+/-" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("%");
        }, children: "%" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          u("÷");
        }, children: "÷" })
      ] }),
      /* @__PURE__ */ r("div", { className: e.InputRow, children: [
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("7");
        }, children: "7" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("8");
        }, children: "8" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("9");
        }, children: "9" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          u("×");
        }, children: "×" })
      ] }),
      /* @__PURE__ */ r("div", { className: e.InputRow, children: [
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("4");
        }, children: "4" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("5");
        }, children: "5" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("6");
        }, children: "6" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          u("-");
        }, children: "-" })
      ] }),
      /* @__PURE__ */ r("div", { className: e.InputRow, children: [
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("1");
        }, children: "1" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("2");
        }, children: "2" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n("3");
        }, children: "3" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          u("+");
        }, children: "+" })
      ] }),
      /* @__PURE__ */ r("div", { className: e.InputRow, children: [
        /* @__PURE__ */ t(a, { className: `${e.Button} ${e.ButtonLarge}`, onClick: () => {
          n("0");
        }, children: "0" }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          n(".");
        }, children: "." }),
        /* @__PURE__ */ t(a, { className: e.Button, onClick: () => {
          m();
        }, children: "=" })
      ] })
    ] })
  ] });
}
const j = new R("Calculator", "calculator", D, { size: new $(400, 600) }).setIconUrl("https://os.prozilla.dev/assets/apps/icons/calculator.svg").setPinnedByDefault(!1).setCategory("Utilities & tools");
j.setMetadata({ name: "@prozilla-os/calculator", version: "1.1.17", author: "Prozilla" });
export {
  j as calculator
};
//# sourceMappingURL=main.js.map
