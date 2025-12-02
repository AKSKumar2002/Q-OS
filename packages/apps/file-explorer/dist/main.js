(function(){"use strict";try{if(typeof document<"u"){var r=document.createElement("style");r.appendChild(document.createTextNode('._FileExplorer_lr5mr_1{--header-height: 3.5rem;--sidebar-width: 10rem;--footer-height: 1.75rem;--scale: 1.15rem;display:flex;flex-direction:column;width:100%;height:100%}._Header_lr5mr_13{display:flex;gap:1rem;align-items:center;width:100%;height:var(--header-height);padding:1rem;background-color:var(--background-color-0)}._IconButton_lr5mr_23{--color: var(--foreground-color-0);position:relative;height:1.25rem;width:auto;padding:0;background:none;border:none;outline:none;aspect-ratio:1;cursor:pointer}._IconButton_lr5mr_23:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff0;border-radius:var(--border-radius-99);transform:scale(1);transform-origin:center;transition:all var(--transition-duration-1) var(--ease-in-out-default)}._IconButton_lr5mr_23:hover:after,._IconButton_lr5mr_23:focus-visible:after{background-color:#ffffff1a;transform:scale(1.5)}._IconButton_lr5mr_23:disabled{--color: var(--background-color-1)}._IconButton_lr5mr_23 svg{height:100%}._IconButton_lr5mr_23 svg path{fill:var(--color);transition:fill var(--transition-duration-0) var(--ease-in-out-default)}._PathInput_lr5mr_69{flex:1;padding:.25rem .5rem;background-color:var(--background-color-2);border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._Body_lr5mr_80{flex:1;display:flex;width:100%;height:calc(100% - var(--header-height));background-color:var(--background-color-2)}._Sidebar_lr5mr_88{display:flex;gap:.25rem;flex-direction:column;min-width:calc(var(--sidebar-width) / 2);width:var(--sidebar-width);height:100%;max-width:50%;padding:.5rem;background-color:var(--background-color-1);resize:horizontal;overflow:hidden}._NavButton_lr5mr_102{display:flex;gap:.5rem;align-items:center;width:100%;padding:.5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;cursor:pointer;transition:background-color var(--transition-duration-0) var(--ease-in-out-default)}._NavButton_lr5mr_102:hover,._NavButton_lr5mr_102:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._NavButton_lr5mr_102 svg{height:1.35rem;aspect-ratio:1}._Main_lr5mr_125{--scale: inherit !important;position:relative;flex:1;display:flex;flex-wrap:wrap;align-content:flex-start;height:100%;padding:.5rem;padding-bottom:calc(.5rem + var(--footer-height));overflow:auto}._Footer_lr5mr_139{position:absolute;display:flex;justify-content:flex-start;align-items:center;bottom:0;left:0;width:100%;height:var(--footer-height);padding:0 .75rem;border-top:.25rem solid var(--background-color-0);background-color:var(--background-color-2)}._Footer_lr5mr_139 p{margin:0;font-size:.875em}._Selector_lr5mr_158{--footer-height: 4rem}._FileProperties_xi8b6_1{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;padding:1rem}._Icon_xi8b6_9{width:3rem;height:3rem}._Icon_xi8b6_9 div{width:inherit;height:inherit;object-fit:contain}._Icon_xi8b6_9 svg{max-width:100%;max-height:100%}._Section_xi8b6_25{--divider-width: .25rem;position:relative;display:flex;gap:.25rem;justify-content:flex-start;align-items:flex-start;flex-direction:column;width:100%;padding:1rem 0;padding-bottom:calc(1rem + var(--divider-width))}._Section_xi8b6_25:first-child{gap:.5rem;align-items:center;flex-direction:row;padding-top:0}._Section_xi8b6_25:first-child ._Line_xi8b6_46{font-size:1.25rem}._Section_xi8b6_25:not(:last-child):after{content:"";position:absolute;bottom:0;left:0;width:100%;height:var(--divider-width);border-radius:var(--border-radius-0);background-color:var(--background-color-0)}._Line_xi8b6_46{margin:0;text-align:left;padding-left:2rem;text-indent:-2rem}._AppIcon_xi8b6_68{display:inline-block;width:2rem;height:2rem;vertical-align:middle;margin-left:.5rem;margin-right:.25rem}._AppIcon_xi8b6_68 div{position:relative;width:inherit;height:inherit;object-fit:contain}._AppIcon_xi8b6_68 svg{position:absolute;top:0;left:0;max-width:100%;max-height:100%}')),document.head.appendChild(r)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { utilStyles as w, VirtualFile as ne, useSystemManager as W, WindowedModal as oe, ImagePreview as D, StorageManager as M, useVirtualRoot as re, useWindowsManager as ie, useHistory as le, useAlert as ae, useWindowedModal as se, useContextMenu as O, Actions as U, ClickAction as b, Vector2 as E, Divider as ce, VirtualRoot as F, DialogBox as z, ModalsConfig as $, DirectoryList as de, CODE_EXTENSIONS as ue, App as me, AppsConfig as pe } from "@prozilla-os/core";
import { jsxs as l, jsx as e } from "react/jsx-runtime";
import { useState as S, useCallback as he, useEffect as H } from "react";
import { FontAwesomeIcon as h } from "@fortawesome/react-fontawesome";
import { faDownload as _e, faUpload as Ne, faTrash as V, faCircleInfo as ge, faCaretLeft as Ie, faCaretRight as xe, faArrowUp as be, faPlus as fe, faSearch as Ee, faCog as ye, faHouse as ve, faDesktop as Be, faImage as Ce, faFileLines as Pe } from "@fortawesome/free-solid-svg-icons";
const Ae = "_FileExplorer_lr5mr_1", Se = "_Header_lr5mr_13", we = "_IconButton_lr5mr_23", Le = "_PathInput_lr5mr_69", Te = "_Body_lr5mr_80", ke = "_Sidebar_lr5mr_88", De = "_NavButton_lr5mr_102", Me = "_Main_lr5mr_125", Oe = "_Footer_lr5mr_139", Ue = "_Selector_lr5mr_158", s = {
  FileExplorer: Ae,
  Header: Se,
  IconButton: we,
  PathInput: Le,
  Body: Te,
  Sidebar: ke,
  NavButton: De,
  Main: Me,
  Footer: Oe,
  Selector: Ue
};
function y({ onClick: n, icon: _, name: a }) {
  return /* @__PURE__ */ l(
    "button",
    {
      tabIndex: 0,
      className: `${s.NavButton} ${w.TextSemibold}`,
      onClick: n,
      children: [
        /* @__PURE__ */ e(h, { icon: _ }),
        a
      ]
    }
  );
}
function Fe({ directory: n }) {
  const _ = (a) => {
    const N = a.target.files;
    N != null && Array.from(N).forEach((p) => {
      const { name: u, extension: g } = ne.splitId(p.name), o = new FileReader();
      o.onload = (I) => {
        const { result: v } = I.target;
        n.createFile(u, g, (c) => {
          c.setSource(v);
        });
      }, o.readAsDataURL(p);
    });
  };
  return /* @__PURE__ */ l("label", { title: "Import", tabIndex: 0, className: s.IconButton, children: [
    /* @__PURE__ */ e(
      "input",
      {
        type: "file",
        id: "import",
        multiple: !0,
        style: { display: "none" },
        onChange: _
      }
    ),
    /* @__PURE__ */ e(h, { icon: _e })
  ] });
}
const G = {
  NONE: 0,
  SINGLE: 1,
  MULTIPLE: 2
}, ze = "_FileProperties_xi8b6_1", $e = "_Icon_xi8b6_9", He = "_Section_xi8b6_25", Ve = "_Line_xi8b6_46", Ge = "_AppIcon_xi8b6_68", d = {
  FileProperties: ze,
  Icon: $e,
  Section: He,
  Line: Ve,
  AppIcon: Ge
};
function We({ modal: n, params: _, file: a, ...N }) {
  const { appsConfig: p } = W(), u = a.extension != null ? p.getAppByFileExtension(a.extension) : null;
  return /* @__PURE__ */ l(oe, { className: d.FileProperties, modal: n, params: _, ...N, children: [
    /* @__PURE__ */ l("span", { className: d.Section, children: [
      /* @__PURE__ */ e(D, { className: d.Icon, source: a.getIconUrl() }),
      /* @__PURE__ */ e("p", { className: `${d.Line} ${w.TextBold}`, children: a.id })
    ] }),
    /* @__PURE__ */ l("span", { className: d.Section, children: [
      /* @__PURE__ */ l("p", { className: d.Line, children: [
        "Type: ",
        a.getType()
      ] }),
      u != null && /* @__PURE__ */ l("span", { className: d.Line, children: [
        "Opens with:",
        /* @__PURE__ */ e(D, { className: d.AppIcon, source: u.iconUrl ?? "" }),
        u.name
      ] })
    ] }),
    /* @__PURE__ */ l("span", { className: d.Section, children: [
      /* @__PURE__ */ l("p", { className: d.Line, children: [
        "Location: ",
        a.path
      ] }),
      /* @__PURE__ */ l("p", { className: d.Line, children: [
        "Size: ",
        M.getByteSize(a.source ?? a.content),
        " bytes"
      ] }),
      /* @__PURE__ */ l("p", { className: d.Line, children: [
        "Size on drive: ",
        M.getByteSize(a.toString()),
        " bytes"
      ] })
    ] }),
    /* @__PURE__ */ e("span", { className: d.Section, children: /* @__PURE__ */ l("p", { className: d.Line, children: [
      "Attributes: ",
      a.isProtected ? "Protected" : "N/A"
    ] }) })
  ] });
}
function Ye({ app: n, path: _, selectorMode: a, Footer: N, onSelectionChange: p, onSelectionFinish: u }) {
  const g = N != null && a != null && a !== G.NONE, o = re(), I = ie(), { windowsConfig: v } = W(), [c, B] = S(o == null ? void 0 : o.navigate(_ ?? "~")), [Y, f] = S((c == null ? void 0 : c.path) ?? ""), [L] = S(!0), { history: C, stateIndex: T, pushState: k, undo: j, redo: K, undoAvailable: Q, redoAvailable: X } = le(c.path), { alert: q } = ae(), { openWindowedModal: P } = se(), { onContextMenu: J } = O({
    Actions: (r) => {
      var t;
      return /* @__PURE__ */ l(U, { ...r, children: [
        /* @__PURE__ */ e(b, { label: g ? "Select" : "Open", onTrigger: (i, m) => {
          if (g) {
            p == null || p({ files: [m.id], directory: c }), u == null || u();
            return;
          }
          I != null && m.open(I);
        } }),
        ((t = r.triggerParams) == null ? void 0 : t.isDownloadable()) && /* @__PURE__ */ e(b, { label: "Export", icon: Ne, onTrigger: (i, m) => {
          m.download();
        } }),
        /* @__PURE__ */ e(b, { label: "Delete", icon: V, onTrigger: (i, m) => {
          m.delete();
        } }),
        /* @__PURE__ */ e(b, { label: "Properties", icon: ge, onTrigger: (i, m) => {
          P({
            title: `${m.id} ${v.titleSeparator} Properties`,
            iconUrl: m.getIconUrl(),
            size: new E(400, 500),
            Modal: (te) => /* @__PURE__ */ e(We, { file: m, ...te })
          });
        } })
      ] });
    }
  }), { onContextMenu: Z } = O({
    Actions: (r) => /* @__PURE__ */ l(U, { ...r, children: [
      /* @__PURE__ */ e(b, { label: "Open", onTrigger: (t, i) => {
        x(i.linkedPath ?? i.name);
      } }),
      /* @__PURE__ */ e(ce, {}),
      /* @__PURE__ */ e(b, { label: "Delete", icon: V, onTrigger: (t, i) => {
        i.delete();
      } })
    ] })
  }), x = he((r, t = !1) => {
    if (r == null)
      return;
    c == null && (t = !0);
    const i = t ? o == null ? void 0 : o.navigate(r) : c.navigate(r);
    i != null && (B(i), f(i.root ? "/" : i.path), k(i.path));
  }, [c, k, o]);
  H(() => {
    if (C.length === 0)
      return;
    const r = C[T], t = o == null ? void 0 : o.navigate(r);
    t != null && (B(t), f(t.root ? "/" : t.path));
  }, [C, T, o]), H(() => {
    const r = (t) => {
      q({
        title: t.message,
        text: "You have exceeded the virtual drive capacity. Files and folders will not be saved until more storage is freed.",
        iconUrl: n == null ? void 0 : n.iconUrl,
        size: new E(300, 200),
        single: !0
      });
    };
    return o == null || o.on(F.EVENT_NAMES.error, r), () => {
      o == null || o.off(F.EVENT_NAMES.error, r);
    };
  }, []);
  const R = (r) => {
    f(r.target.value);
  }, ee = (r) => {
    let t = r.target.value;
    if (r.key === "Enter") {
      t === "" && (t = "~");
      const i = o == null ? void 0 : o.navigate(t);
      if (i == null) {
        P({
          title: "Error",
          iconUrl: n == null ? void 0 : n.iconUrl,
          size: new E(300, 150),
          Modal: (m) => /* @__PURE__ */ l(z, { ...m, children: [
            /* @__PURE__ */ l("p", { children: [
              'Invalid path: "',
              t,
              '"'
            ] }),
            /* @__PURE__ */ e("button", { "data-type": $.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
          ] })
        });
        return;
      }
      B(i), f(i.root ? "/" : i.path);
    }
  }, A = c.getItemCount(L);
  return /* @__PURE__ */ l("div", { className: g ? `${s.FileExplorer} ${s.Selector}` : s.FileExplorer, children: [
    /* @__PURE__ */ l("div", { className: s.Header, children: [
      /* @__PURE__ */ e(
        "button",
        {
          title: "Back",
          tabIndex: 0,
          className: s.IconButton,
          onClick: () => {
            j();
          },
          disabled: !Q,
          children: /* @__PURE__ */ e(h, { icon: Ie })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          title: "Forward",
          tabIndex: 0,
          className: s.IconButton,
          onClick: () => {
            K();
          },
          disabled: !X,
          children: /* @__PURE__ */ e(h, { icon: xe })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          title: "Up",
          tabIndex: 0,
          className: s.IconButton,
          onClick: () => {
            x("..");
          },
          disabled: c.isRoot != null && c.isRoot,
          children: /* @__PURE__ */ e(h, { icon: be })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          title: "New",
          tabIndex: 0,
          className: s.IconButton,
          onClick: () => {
            P({
              title: "Error",
              iconUrl: n == null ? void 0 : n.iconUrl,
              size: new E(300, 150),
              Modal: (r) => /* @__PURE__ */ l(z, { ...r, children: [
                /* @__PURE__ */ e("p", { children: "This folder is protected." }),
                /* @__PURE__ */ e("button", { "data-type": $.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
              ] })
            });
          },
          disabled: !c.canBeEdited,
          children: /* @__PURE__ */ e(h, { icon: fe })
        }
      ),
      /* @__PURE__ */ e(
        "input",
        {
          value: Y,
          type: "text",
          "aria-label": "Path",
          className: s.PathInput,
          tabIndex: 0,
          onChange: R,
          onKeyDown: ee,
          placeholder: "Enter a path..."
        }
      ),
      /* @__PURE__ */ e(Fe, { directory: c }),
      /* @__PURE__ */ e("button", { title: "Search", tabIndex: 0, className: s.IconButton, children: /* @__PURE__ */ e(h, { icon: Ee }) }),
      /* @__PURE__ */ e("button", { title: "Settings", tabIndex: 0, className: s.IconButton, children: /* @__PURE__ */ e(h, { icon: ye }) })
    ] }),
    /* @__PURE__ */ l("div", { className: s.Body, children: [
      /* @__PURE__ */ l("div", { className: s.Sidebar, children: [
        /* @__PURE__ */ e(y, { name: "Home", onClick: () => {
          x("~");
        }, icon: ve }),
        /* @__PURE__ */ e(y, { name: "Desktop", onClick: () => {
          x("~/Desktop");
        }, icon: Be }),
        /* @__PURE__ */ e(y, { name: "Images", onClick: () => {
          x("~/Pictures");
        }, icon: Ce }),
        /* @__PURE__ */ e(y, { name: "Documents", onClick: () => {
          x("~/Documents");
        }, icon: Pe })
      ] }),
      /* @__PURE__ */ e(
        de,
        {
          directory: c,
          id: "main",
          className: s.Main,
          showHidden: L,
          onOpenFile: (r, t) => {
            if (r.preventDefault(), g)
              return void (u == null ? void 0 : u());
            const i = {};
            (t.extension === "md" || t.extension != null && ue.includes(t.extension)) && (i.mode = "view"), I == null || I.openFile(t, i);
          },
          onOpenFolder: (r, t) => {
            x(t.linkedPath ?? t.name);
          },
          onContextMenuFile: J,
          onContextMenuFolder: Z,
          allowMultiSelect: a !== G.SINGLE,
          onSelectionChange: p
        }
      )
    ] }),
    g ? /* @__PURE__ */ e("div", { className: s.Footer, children: /* @__PURE__ */ e(N, {}) }) : /* @__PURE__ */ e("span", { className: s.Footer, children: /* @__PURE__ */ e("p", { className: w.TextLight, children: A === 1 ? A + " item" : A + " items" }) })
  ] });
}
var je = /* @__PURE__ */ ((n) => (n[n.None = 0] = "None", n[n.Single = 1] = "Single", n[n.Multi = 2] = "Multi", n))(je || {});
const Ke = new me("File Explorer", "file-explorer", Ye).setIconUrl("https://os.prozilla.dev/assets/apps/icons/file-explorer.svg").setRole(pe.APP_ROLES.fileExplorer).setCategory("Utilities & tools");
Ke.setMetadata({ name: "@prozilla-os/file-explorer", version: "1.1.17", author: "Prozilla" });
export {
  je as FileSelectorMode,
  Ke as fileExplorer
};
//# sourceMappingURL=main.js.map
