(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._MediaViewer_vkowo_1{display:flex;justify-content:center;align-items:center;width:100%;height:100%;padding:2rem}._MediaViewer_vkowo_1 img{width:100%;height:100%;object-fit:contain}._VideoViewer_vkowo_16,._AudioViewer_vkowo_16{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%}._VideoViewer_vkowo_16 h3{margin:0}._VideoViewer_vkowo_16>*{width:100%;height:100%;border:none;background:transparent}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
import { useSystemManager as x, useWindowsManager as E, AUDIO_EXTENSIONS as a, VIDEO_EXTENSIONS as d, AppsConfig as m, MEDIA_EXTENSIONS as V, IMAGE_EXTENSIONS as _, App as h } from "@prozilla-os/core";
import { jsx as r, jsxs as l } from "react/jsx-runtime";
import { useRef as p, useEffect as w } from "react";
const y = "_MediaViewer_vkowo_1", A = "_VideoViewer_vkowo_16", N = "_AudioViewer_vkowo_16", n = {
  MediaViewer: y,
  VideoViewer: A,
  AudioViewer: N
};
function g({ file: e, close: t, setTitle: s }) {
  const { appsConfig: v } = x(), u = E(), o = p(null), i = p(null);
  if (w(() => {
    e != null && (s == null || s(e.id));
  }, [e, s]), w(() => {
    if (!(e == null || e.source == null))
      return e.extension && a.includes(e.extension) && o.current && (o.current.src = e.source, o.current.play()), e.extension && d.includes(e.extension) && i.current && (i.current.src = e.source, i.current.play()), () => {
        o.current && (o.current.pause(), o.current.currentTime = 0), i.current && (i.current.pause(), i.current.currentTime = 0);
      };
  }, [e]), e == null) {
    const c = v.getAppByRole(m.APP_ROLES.fileExplorer);
    return setTimeout(() => {
      c != null && (u == null || u.open(c.id, { path: "~/Pictures" })), t == null || t();
    }, 10), null;
  }
  return e.extension == null || !V.includes(e.extension) ? /* @__PURE__ */ r("p", { children: "Invalid file format." }) : e.source == null ? /* @__PURE__ */ r("p", { children: "File failed to load." }) : _.includes(e.extension) ? /* @__PURE__ */ r("div", { className: n.MediaViewer, children: /* @__PURE__ */ r("img", { src: e.source, alt: e.id, draggable: "false" }) }) : a.includes(e.extension) ? /* @__PURE__ */ r("div", { className: n.AudioViewer, children: /* @__PURE__ */ l("audio", { ref: o, controls: !0, children: [
    /* @__PURE__ */ r("source", { src: e.source, type: `video/${e.extension}` }),
    "Your browser does not support audio."
  ] }) }) : d.includes(e.extension) ? e.extension === "yt" ? /* @__PURE__ */ r("div", { className: n.VideoViewer, children: /* @__PURE__ */ r(
    "iframe",
    {
      src: e.source.replace("watch?v=", "embed/"),
      title: e.id,
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: !0,
      allowTransparency: !0
    }
  ) }) : /* @__PURE__ */ r("div", { className: n.VideoViewer, children: /* @__PURE__ */ l("video", { ref: i, controls: !0, className: n.VideoPlayer, children: [
    /* @__PURE__ */ r("source", { src: e.source, type: `video/${e.extension}` }),
    "Your browser does not support videos."
  ] }) }) : /* @__PURE__ */ r("div", { className: n.MediaViewer, children: /* @__PURE__ */ r("img", { src: e.source, alt: e.id, draggable: "false" }) });
}
const S = new h("Media Viewer", "media-viewer", g).setIconUrl("https://os.prozilla.dev/assets/apps/icons/media-viewer.svg").setRole(m.APP_ROLES.mediaViewer).setAssociatedExtensions(V).setCategory("Photo & video");
S.setMetadata({ name: "@prozilla-os/media-viewer", version: "1.1.17", author: "Prozilla" });
export {
  S as mediaViewer
};
//# sourceMappingURL=main.js.map
