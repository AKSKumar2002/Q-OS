var Pe = Object.defineProperty;
var Me = (e, n, s) => n in e ? Pe(e, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[n] = s;
var W = (e, n, s) => Me(e, typeof n != "symbol" ? n + "" : n, s);
import { useSystemManager as De, useVirtualRoot as Re, useSettingsManager as He, App as xe, AppsConfig as je } from "@prozilla-os/core";
import { jsx as L, jsxs as Y } from "react/jsx-runtime";
import * as q from "react";
import { forwardRef as Fe, useState as S, useRef as pe, useEffect as z } from "react";
import { ANSI as _, EventEmitter as Je, clamp as Ve, removeFromArray as de } from "@prozilla-os/shared";
const We = "_Terminal_1n5va_1", ze = "_Prefix_1n5va_26", qe = "_Input_1n5va_32", Ge = "_Output_1n5va_32", Be = "_blink_1n5va_1", N = {
  Terminal: We,
  Prefix: ze,
  Input: qe,
  Output: Ge,
  "Input-container": "_Input-container_1n5va_47",
  blink: Be,
  "ansi-black-fg": "_ansi-black-fg_1n5va_99",
  "ansi-red-fg": "_ansi-red-fg_1n5va_100",
  "ansi-green-fg": "_ansi-green-fg_1n5va_101",
  "ansi-yellow-fg": "_ansi-yellow-fg_1n5va_102",
  "ansi-blue-fg": "_ansi-blue-fg_1n5va_103",
  "ansi-magenta-fg": "_ansi-magenta-fg_1n5va_104",
  "ansi-cyan-fg": "_ansi-cyan-fg_1n5va_105",
  "ansi-white-fg": "_ansi-white-fg_1n5va_106",
  "ansi-bright-black-fg": "_ansi-bright-black-fg_1n5va_108",
  "ansi-bright-red-fg": "_ansi-bright-red-fg_1n5va_109",
  "ansi-bright-green-fg": "_ansi-bright-green-fg_1n5va_110",
  "ansi-bright-yellow-fg": "_ansi-bright-yellow-fg_1n5va_111",
  "ansi-bright-blue-fg": "_ansi-bright-blue-fg_1n5va_112",
  "ansi-bright-magenta-fg": "_ansi-bright-magenta-fg_1n5va_113",
  "ansi-bright-cyan-fg": "_ansi-bright-cyan-fg_1n5va_114",
  "ansi-bright-white-fg": "_ansi-bright-white-fg_1n5va_115",
  "ansi-black-bg": "_ansi-black-bg_1n5va_117",
  "ansi-red-bg": "_ansi-red-bg_1n5va_118",
  "ansi-green-bg": "_ansi-green-bg_1n5va_119",
  "ansi-yellow-bg": "_ansi-yellow-bg_1n5va_120",
  "ansi-blue-bg": "_ansi-blue-bg_1n5va_121",
  "ansi-magenta-bg": "_ansi-magenta-bg_1n5va_122",
  "ansi-cyan-bg": "_ansi-cyan-bg_1n5va_123",
  "ansi-white-bg": "_ansi-white-bg_1n5va_124",
  "ansi-dim": "_ansi-dim_1n5va_126"
};
function Ke(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ve = /* @__PURE__ */ function() {
  function e(n, s) {
    for (var t = 0; t < s.length; t++) {
      var f = s[t];
      f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(n, f.key, f);
    }
  }
  return function(n, s, t) {
    return s && e(n.prototype, s), t && e(n, t), n;
  };
}();
function Ue(e, n) {
  if (!(e instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
var A = [[{ color: "0, 0, 0", class: "ansi-black" }, { color: "187, 0, 0", class: "ansi-red" }, { color: "0, 187, 0", class: "ansi-green" }, { color: "187, 187, 0", class: "ansi-yellow" }, { color: "0, 0, 187", class: "ansi-blue" }, { color: "187, 0, 187", class: "ansi-magenta" }, { color: "0, 187, 187", class: "ansi-cyan" }, { color: "255,255,255", class: "ansi-white" }], [{ color: "85, 85, 85", class: "ansi-bright-black" }, { color: "255, 85, 85", class: "ansi-bright-red" }, { color: "0, 255, 0", class: "ansi-bright-green" }, { color: "255, 255, 85", class: "ansi-bright-yellow" }, { color: "85, 85, 255", class: "ansi-bright-blue" }, { color: "255, 85, 255", class: "ansi-bright-magenta" }, { color: "85, 255, 255", class: "ansi-bright-cyan" }, { color: "255, 255, 255", class: "ansi-bright-white" }]], Xe = /(https?:\/\/(?:[A-Za-z0-9#;/?:@=+$',_.!~*()[\]-]|&amp;|%[A-Fa-f0-9]{2})+)/gm, Ze = function() {
  ve(e, null, [{
    key: "escapeForHtml",
    /**
     * Anser.escapeForHtml
     * Escape the input HTML.
     *
     * This does the minimum escaping of text to make it compliant with HTML.
     * In particular, the '&','<', and '>' characters are escaped. This should
     * be run prior to `ansiToHtml`.
     *
     * @name Anser.escapeForHtml
     * @function
     * @param {String} txt The input text (containing the ANSI snippets).
     * @returns {String} The escaped html.
     */
    value: function(s) {
      return new e().escapeForHtml(s);
    }
    /**
     * Anser.linkify
     * Adds the links in the HTML.
     *
     * This replaces any links in the text with anchor tags that display the
     * link. You should apply this after you have run `ansiToHtml` on the text.
     *
     * @name Anser.linkify
     * @function
     * @param {String} txt The input text.
     * @returns {String} The HTML containing the <a> tags (unescaped).
     */
  }, {
    key: "linkify",
    value: function(s) {
      return new e().linkify(s);
    }
    /**
     * Anser.ansiToHtml
     * This replaces ANSI terminal escape codes with SPAN tags that wrap the
     * content.
     *
     * This function only interprets ANSI SGR (Select Graphic Rendition) codes
     * that can be represented in HTML.
     * For example, cursor movement codes are ignored and hidden from output.
     * The default style uses colors that are very close to the prescribed
     * standard. The standard assumes that the text will have a black
     * background. These colors are set as inline styles on the SPAN tags.
     *
     * Another option is to set `use_classes: true` in the options argument.
     * This will instead set classes on the spans so the colors can be set via
     * CSS. The class names used are of the format `ansi-*-fg/bg` and
     * `ansi-bright-*-fg/bg` where `*` is the color name,
     * i.e black/red/green/yellow/blue/magenta/cyan/white.
     *
     * @name Anser.ansiToHtml
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed to the ansiToHTML method.
     * @returns {String} The HTML output.
     */
  }, {
    key: "ansiToHtml",
    value: function(s, t) {
      return new e().ansiToHtml(s, t);
    }
    /**
     * Anser.ansiToJson
     * Converts ANSI input into JSON output.
     *
     * @name Anser.ansiToJson
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed to the ansiToHTML method.
     * @returns {String} The HTML output.
     */
  }, {
    key: "ansiToJson",
    value: function(s, t) {
      return new e().ansiToJson(s, t);
    }
    /**
     * Anser.ansiToText
     * Converts ANSI input into text output.
     *
     * @name Anser.ansiToText
     * @function
     * @param {String} txt The input text.
     * @returns {String} The text output.
     */
  }, {
    key: "ansiToText",
    value: function(s) {
      return new e().ansiToText(s);
    }
    /**
     * Anser
     * The `Anser` class.
     *
     * @name Anser
     * @function
     * @returns {Anser}
     */
  }]);
  function e() {
    Ue(this, e), this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null, this.bright = 0, this.decorations = [];
  }
  return ve(e, [{
    key: "setupPalette",
    value: function() {
      this.PALETTE_COLORS = [];
      for (var s = 0; s < 2; ++s)
        for (var t = 0; t < 8; ++t)
          this.PALETTE_COLORS.push(A[s][t].color);
      for (var f = [0, 95, 135, 175, 215, 255], y = function(i, b, k) {
        return f[i] + ", " + f[b] + ", " + f[k];
      }, a = 0; a < 6; ++a)
        for (var u = 0; u < 6; ++u)
          for (var c = 0; c < 6; ++c)
            this.PALETTE_COLORS.push(y(a, u, c));
      for (var o = 8, r = 0; r < 24; ++r, o += 10)
        this.PALETTE_COLORS.push(y(o, o, o));
    }
    /**
     * escapeForHtml
     * Escapes the input text.
     *
     * @name escapeForHtml
     * @function
     * @param {String} txt The input text.
     * @returns {String} The escpaed HTML output.
     */
  }, {
    key: "escapeForHtml",
    value: function(s) {
      return s.replace(/[&<>\"]/gm, function(t) {
        return t == "&" ? "&amp;" : t == '"' ? "&quot;" : t == "<" ? "&lt;" : t == ">" ? "&gt;" : "";
      });
    }
    /**
     * linkify
     * Adds HTML link elements.
     *
     * @name linkify
     * @function
     * @param {String} txt The input text.
     * @returns {String} The HTML output containing link elements.
     */
  }, {
    key: "linkify",
    value: function(s) {
      return s.replace(Xe, function(t) {
        return '<a href="' + t + '">' + t + "</a>";
      });
    }
    /**
     * ansiToHtml
     * Converts ANSI input into HTML output.
     *
     * @name ansiToHtml
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed ot the `process` method.
     * @returns {String} The HTML output.
     */
  }, {
    key: "ansiToHtml",
    value: function(s, t) {
      return this.process(s, t, !0);
    }
    /**
     * ansiToJson
     * Converts ANSI input into HTML output.
     *
     * @name ansiToJson
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed ot the `process` method.
     * @returns {String} The JSON output.
     */
  }, {
    key: "ansiToJson",
    value: function(s, t) {
      return t = t || {}, t.json = !0, t.clearLine = !1, this.process(s, t, !0);
    }
    /**
     * ansiToText
     * Converts ANSI input into HTML output.
     *
     * @name ansiToText
     * @function
     * @param {String} txt The input text.
     * @returns {String} The text output.
     */
  }, {
    key: "ansiToText",
    value: function(s) {
      return this.process(s, {}, !1);
    }
    /**
     * process
     * Processes the input.
     *
     * @name process
     * @function
     * @param {String} txt The input text.
     * @param {Object} options An object passed to `processChunk` method, extended with:
     *
     *  - `json` (Boolean): If `true`, the result will be an object.
     *  - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
     *
     * @param {Boolean} markup
     */
  }, {
    key: "process",
    value: function(s, t, f) {
      var y = this, a = this, u = s.split(/\033\[/), c = u.shift();
      t == null && (t = {}), t.clearLine = /\r/.test(s);
      var o = u.map(function(v) {
        return y.processChunk(v, t, f);
      });
      if (t && t.json) {
        var r = a.processChunkJson("");
        return r.content = c, r.clearLine = t.clearLine, o.unshift(r), t.remove_empty && (o = o.filter(function(v) {
          return !v.isEmpty();
        })), o;
      } else
        o.unshift(c);
      return o.join("");
    }
    /**
     * processChunkJson
     * Processes the current chunk into json output.
     *
     * @name processChunkJson
     * @function
     * @param {String} text The input text.
     * @param {Object} options An object containing the following fields:
     *
     *  - `json` (Boolean): If `true`, the result will be an object.
     *  - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
     *
     * @param {Boolean} markup If false, the colors will not be parsed.
     * @return {Object} The result object:
     *
     *  - `content` (String): The text.
     *  - `fg` (String|null): The foreground color.
     *  - `bg` (String|null): The background color.
     *  - `fg_truecolor` (String|null): The foreground true color (if 16m color is enabled).
     *  - `bg_truecolor` (String|null): The background true color (if 16m color is enabled).
     *  - `clearLine` (Boolean): `true` if a carriageReturn \r was fount at end of line.
     *  - `was_processed` (Bolean): `true` if the colors were processed, `false` otherwise.
     *  - `isEmpty` (Function): A function returning `true` if the content is empty, or `false` otherwise.
     *
     */
  }, {
    key: "processChunkJson",
    value: function(s, t, f) {
      t = typeof t > "u" ? {} : t;
      var y = t.use_classes = typeof t.use_classes < "u" && t.use_classes, a = t.key = y ? "class" : "color", u = {
        content: s,
        fg: null,
        bg: null,
        fg_truecolor: null,
        bg_truecolor: null,
        isInverted: !1,
        clearLine: t.clearLine,
        decoration: null,
        decorations: [],
        was_processed: !1,
        isEmpty: function() {
          return !u.content;
        }
      }, c = s.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);
      if (!c) return u;
      u.content = c[4];
      var o = c[2].split(";");
      if (c[1] !== "" || c[3] !== "m" || !f)
        return u;
      for (var r = this; o.length > 0; ) {
        var v = o.shift(), i = parseInt(v);
        if (isNaN(i) || i === 0)
          r.fg = r.bg = null, r.decorations = [];
        else if (i === 1)
          r.decorations.push("bold");
        else if (i === 2)
          r.decorations.push("dim");
        else if (i === 3)
          r.decorations.push("italic");
        else if (i === 4)
          r.decorations.push("underline");
        else if (i === 5)
          r.decorations.push("blink");
        else if (i === 7)
          r.decorations.push("reverse");
        else if (i === 8)
          r.decorations.push("hidden");
        else if (i === 9)
          r.decorations.push("strikethrough");
        else if (i === 21)
          r.removeDecoration("bold");
        else if (i === 22)
          r.removeDecoration("bold"), r.removeDecoration("dim");
        else if (i === 23)
          r.removeDecoration("italic");
        else if (i === 24)
          r.removeDecoration("underline");
        else if (i === 25)
          r.removeDecoration("blink");
        else if (i === 27)
          r.removeDecoration("reverse");
        else if (i === 28)
          r.removeDecoration("hidden");
        else if (i === 29)
          r.removeDecoration("strikethrough");
        else if (i === 39)
          r.fg = null;
        else if (i === 49)
          r.bg = null;
        else if (i >= 30 && i < 38)
          r.fg = A[0][i % 10][a];
        else if (i >= 90 && i < 98)
          r.fg = A[1][i % 10][a];
        else if (i >= 40 && i < 48)
          r.bg = A[0][i % 10][a];
        else if (i >= 100 && i < 108)
          r.bg = A[1][i % 10][a];
        else if (i === 38 || i === 48) {
          var b = i === 38;
          if (o.length >= 1) {
            var k = o.shift();
            if (k === "5" && o.length >= 1) {
              var h = parseInt(o.shift());
              if (h >= 0 && h <= 255)
                if (!y)
                  this.PALETTE_COLORS || r.setupPalette(), b ? r.fg = this.PALETTE_COLORS[h] : r.bg = this.PALETTE_COLORS[h];
                else {
                  var $ = h >= 16 ? "ansi-palette-" + h : A[h > 7 ? 1 : 0][h % 8].class;
                  b ? r.fg = $ : r.bg = $;
                }
            } else if (k === "2" && o.length >= 3) {
              var O = parseInt(o.shift()), M = parseInt(o.shift()), D = parseInt(o.shift());
              if (O >= 0 && O <= 255 && M >= 0 && M <= 255 && D >= 0 && D <= 255) {
                var T = O + ", " + M + ", " + D;
                y ? b ? (r.fg = "ansi-truecolor", r.fg_truecolor = T) : (r.bg = "ansi-truecolor", r.bg_truecolor = T) : b ? r.fg = T : r.bg = T;
              }
            }
          }
        }
      }
      return r.fg === null && r.bg === null && r.decorations.length === 0 || (u.fg = r.fg, u.bg = r.bg, u.fg_truecolor = r.fg_truecolor, u.bg_truecolor = r.bg_truecolor, u.decorations = r.decorations, u.decoration = r.decorations.slice(-1).pop() || null, u.was_processed = !0), u;
    }
    /**
     * processChunk
     * Processes the current chunk of text.
     *
     * @name processChunk
     * @function
     * @param {String} text The input text.
     * @param {Object} options An object containing the following fields:
     *
     *  - `json` (Boolean): If `true`, the result will be an object.
     *  - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
     *
     * @param {Boolean} markup If false, the colors will not be parsed.
     * @return {Object|String} The result (object if `json` is wanted back or string otherwise).
     */
  }, {
    key: "processChunk",
    value: function(s, t, f) {
      var y = this;
      t = t || {};
      var a = this.processChunkJson(s, t, f), u = t.use_classes;
      if (a.decorations = a.decorations.filter(function(b) {
        if (b === "reverse") {
          a.fg || (a.fg = A[0][7][u ? "class" : "color"]), a.bg || (a.bg = A[0][0][u ? "class" : "color"]);
          var k = a.fg;
          a.fg = a.bg, a.bg = k;
          var h = a.fg_truecolor;
          return a.fg_truecolor = a.bg_truecolor, a.bg_truecolor = h, a.isInverted = !0, !1;
        }
        return !0;
      }), t.json)
        return a;
      if (a.isEmpty())
        return "";
      if (!a.was_processed)
        return a.content;
      var c = [], o = [], r = [], v = {}, i = function(k) {
        var h = [], $ = void 0;
        for ($ in k)
          k.hasOwnProperty($) && h.push("data-" + $ + '="' + y.escapeForHtml(k[$]) + '"');
        return h.length > 0 ? " " + h.join(" ") : "";
      };
      return a.isInverted && (v["ansi-is-inverted"] = "true"), a.fg && (u ? (c.push(a.fg + "-fg"), a.fg_truecolor !== null && (v["ansi-truecolor-fg"] = a.fg_truecolor, a.fg_truecolor = null)) : c.push("color:rgb(" + a.fg + ")")), a.bg && (u ? (c.push(a.bg + "-bg"), a.bg_truecolor !== null && (v["ansi-truecolor-bg"] = a.bg_truecolor, a.bg_truecolor = null)) : c.push("background-color:rgb(" + a.bg + ")")), a.decorations.forEach(function(b) {
        if (u) {
          o.push("ansi-" + b);
          return;
        }
        b === "bold" ? o.push("font-weight:bold") : b === "dim" ? o.push("opacity:0.5") : b === "italic" ? o.push("font-style:italic") : b === "hidden" ? o.push("visibility:hidden") : b === "strikethrough" ? r.push("line-through") : r.push(b);
      }), r.length && o.push("text-decoration:" + r.join(" ")), u ? '<span class="' + c.concat(o).join(" ") + '"' + i(v) + ">" + a.content + "</span>" : '<span style="' + c.concat(o).join(";") + '"' + i(v) + ">" + a.content + "</span>";
    }
  }, {
    key: "removeDecoration",
    value: function(s) {
      var t = this.decorations.indexOf(s);
      t >= 0 && this.decorations.splice(t, 1);
    }
  }]), e;
}(), Qe = Ze;
const Ye = /* @__PURE__ */ Ke(Qe);
var te = { exports: {} };
function ne(e) {
  if (!e) return "";
  if (!/\r/.test(e)) return e;
  for (e = e.replace(/\r+\n/gm, `
`); /\r./.test(e); )
    e = e.replace(/^([^\r\n]*)\r+([^\r\n]+)/gm, function(n, s, t) {
      return t + s.slice(t.length);
    });
  return e;
}
function et(e) {
  for (var n = 0, s = 0; s < e.length; s++)
    e[n].length <= e[s].length && (n = s);
  return n;
}
function _e(e) {
  if (!/\r/.test(e)) return e;
  for (var n = e.split("\r"), s = []; n.length > 0; ) {
    var t = et(n);
    s.push(n[t]), n = n.slice(t + 1);
  }
  return s.join("\r");
}
function tt(e) {
  if (!e) return "";
  if (!/\r/.test(e)) return e;
  if (!/\n/.test(e)) return _e(e);
  e = e.replace(/\r+\n/gm, `
`);
  var n = e.lastIndexOf(`
`);
  return ne(e.slice(0, n)) + `
` + _e(e.slice(n + 1));
}
te.exports = ne;
var nt = te.exports.escapeCarriageReturn = ne;
te.exports.escapeCarriageReturnSafe = tt;
function st(e, n) {
  return e = nt(ot(e)), Ye.ansiToJson(e, {
    json: !0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    remove_empty: !0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    use_classes: n
  });
}
function rt(e) {
  const n = [];
  return e.bg && n.push(N[`${e.bg}-bg`]), e.fg && n.push(N[`${e.fg}-fg`]), e.decoration && n.push(N[`ansi-${e.decoration}`]), n.length === 0 ? null : n.join(" ");
}
function at(e) {
  const n = {};
  switch (e.bg && (n.backgroundColor = `rgb(${e.bg})`), e.fg && (n.color = `rgb(${e.fg})`), e.decoration) {
    case "bold":
      n.fontWeight = "bold";
      break;
    case "dim":
      n.opacity = "0.5";
      break;
    case "italic":
      n.fontStyle = "italic";
      break;
    case "hidden":
      n.visibility = "hidden";
      break;
    case "strikethrough":
      n.textDecoration = "line-through";
      break;
    case "underline":
      n.textDecoration = "underline";
      break;
    case "blink":
      n.textDecoration = "blink";
      break;
  }
  return n;
}
function it(e, n, s, t) {
  const f = n ? null : at(s), y = n ? rt(s) : null;
  if (!e)
    return q.createElement(
      "pre",
      { style: f, key: t, className: y },
      s.content
    );
  const a = [], u = /(\s|^)(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;
  let c = 0, o;
  for (; (o = u.exec(s.content)) !== null; ) {
    const [, r, v] = o, i = o.index + r.length;
    i > c && a.push(s.content.substring(c, i));
    const b = v.startsWith("www.") ? `http://${v}` : v;
    a.push(
      q.createElement(
        "a",
        {
          key: c,
          href: b,
          target: "_blank"
        },
        `${v}`
      )
    ), c = u.lastIndex;
  }
  return c < s.content.length && a.push(s.content.substring(c)), q.createElement("span", { style: f, key: t, className: y }, a);
}
function ke(e) {
  const { className: n, useClasses: s, children: t, linkify: f } = e;
  return q.createElement(
    "code",
    { className: n },
    st(t ?? "", s ?? !1).map(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      it.bind(null, f ?? !1, s ?? !1)
    )
  );
}
function ot(e) {
  let n = e;
  do
    e = n, n = e.replace(/[^\n]\x08/gm, "");
  while (n.length < e.length);
  return e;
}
const be = Fe(({ text: e }, n) => {
  const s = e == null ? void 0 : e.split(`
`);
  return /* @__PURE__ */ L("div", { ref: n, children: s == null ? void 0 : s.map(
    (t, f) => /* @__PURE__ */ L(ke, { className: N.Output, useClasses: !0, children: t === "" ? " " : t }, f)
  ) });
});
function lt({ value: e, prefix: n, onChange: s, onKeyUp: t, onKeyDown: f, inputRef: y }) {
  const [a, u] = S(0), c = () => {
    var r;
    const o = (r = y.current) == null ? void 0 : r.selectionStart;
    o != null && u(o);
  };
  return /* @__PURE__ */ Y("span", { className: N.Input, children: [
    n && /* @__PURE__ */ L(ke, { className: N.Prefix, useClasses: !0, children: n }),
    /* @__PURE__ */ Y("span", { className: N["Input-container"], style: { "--cursor-offset": a }, children: [
      /* @__PURE__ */ L("span", { "aria-hidden": "true", children: e }),
      /* @__PURE__ */ L(
        "input",
        {
          id: "input",
          value: e,
          "aria-label": "Command input",
          onChange: (o) => {
            s(o), c();
          },
          ref: y,
          onKeyUp: (o) => {
            t == null || t(o);
          },
          onKeyDown: (o) => {
            f == null || f(o), c();
          },
          onClick: c,
          onTouchEnd: c,
          onSelect: c,
          onCut: c,
          onCopy: c,
          onPaste: c,
          spellCheck: !1,
          autoComplete: "off",
          autoFocus: !0
        }
      )
    ] })
  ] });
}
const Z = "user", Q = "prozilla-os", vt = 50, ye = `${_.fg.cyan + _.decoration.dim}$APP_NAME - Made by Prozilla${_.reset}
${_.decoration.dim}Type 'help' for a list of commands.${_.reset}
`, E = _.fg.cyan, _t = `
              :.           
             -==.          
           .=====:         
   ---::..:=======-.       
   :===+=----------::..    
    =+=---------------:..  
    --------------------:. 
.:-+=----${_.fg.white}*###*${E}--${_.fg.white}*####=${E}---. 
:==+----${_.fg.white}#%+${E}-${_.fg.white}+%#${E}-${_.fg.white}##%*+${E}----:.
  .=----${_.fg.white}#%+${E}-${_.fg.white}+%#${E}-${_.fg.white}*+${E}-${_.fg.white}%#+${E}---:.
   ==----${_.fg.white}*###*${E}--${_.fg.white}*###*${E}----. 
  ==+-------------------:. 
  ...::---------------:.   
       .::---------::..    
          ....::...        `, ct = {
  new: "new",
  start: "start",
  stop: "stop"
};
class P extends Je {
  constructor() {
    super(...arguments);
    W(this, "enabled", !1);
  }
  start(s) {
    return this.enabled ? this : (s == null || s(this), this.enabled = !0, this.emit("start"), this);
  }
  stop() {
    return this.enabled ? (this.enabled = !1, this.emit("stop"), this) : this;
  }
  send(s) {
    return this.enabled && this.emit("new", s), this;
  }
}
W(P, "EVENT_NAMES", ct);
function F(e, n) {
  return `${_.fg.red}${e}: ${n}${_.reset}`;
}
function bt(e) {
  return e.replace(/\u001b\[([0-9]+)m/gm, "");
}
let G = [];
const we = /* @__PURE__ */ Object.assign({ "./commands/cat.ts": () => import("./cat-DGEfhJuG.js"), "./commands/cd.ts": () => import("./cd-B1Fq-yvu.js"), "./commands/clear.ts": () => import("./clear-DtYBxmDr.js"), "./commands/cmatrix.ts": () => import("./cmatrix-ChR3i_Ee.js"), "./commands/compgen.ts": () => import("./compgen-UCl8cqjY.js"), "./commands/cowsay.ts": () => import("./cowsay-EPDcTSkP.js"), "./commands/dir.ts": () => import("./dir-BlrznBqV.js"), "./commands/echo.ts": () => import("./echo-PyZ6XYF6.js"), "./commands/eval.ts": () => import("./eval-CnKC-mrj.js"), "./commands/exit.ts": () => import("./exit-CizX3N_u.js"), "./commands/fortune.ts": () => import("./fortune-Cs0PtMgs.js"), "./commands/help.ts": () => import("./help-D315jf11.js"), "./commands/history.ts": () => import("./history-l0sNRNKZ.js"), "./commands/hostname.ts": () => import("./hostname-BBOQWx6L.js"), "./commands/lolcat.ts": () => import("./lolcat-5cidz0aR.js"), "./commands/ls.ts": () => import("./ls-iadOT5Yu.js"), "./commands/make.ts": () => import("./make-D0lyNbgT.js"), "./commands/man.ts": () => import("./man-9XEPup3r.js"), "./commands/mkdir.ts": () => import("./mkdir-BTSAC1PK.js"), "./commands/neofetch.ts": () => import("./neofetch-B_s_ejF6.js"), "./commands/pwd.ts": () => import("./pwd-CSapfDtw.js"), "./commands/reboot.ts": () => import("./reboot-Bwxhoa8q.js"), "./commands/reload.ts": () => import("./reload-DX4iSOfc.js"), "./commands/rev.ts": () => import("./rev-C8qQIyj_.js"), "./commands/rm.ts": () => import("./rm-DWh0ri41.js"), "./commands/rmdir.ts": () => import("./rmdir-B6mV6Yfl.js"), "./commands/sl.ts": () => import("./sl-BDZbd9GM.js"), "./commands/touch.ts": () => import("./touch-joh9c82j.js"), "./commands/uptime.ts": () => import("./uptime-BYmCcOUM.js"), "./commands/whatis.ts": () => import("./whatis-BNrqZD9A.js"), "./commands/whoami.ts": () => import("./whoami-CQNGmqxL.js") }), Ce = () => {
  G = [];
  for (const e in we)
    we[e]().then((n) => {
      const s = Object.keys(n)[0], t = n[s];
      t != null && (t.setName(s.toLowerCase()), G.push(t));
    });
};
Ce();
const B = class B {
  static find(n) {
    let s = null;
    return this.COMMANDS.forEach((t) => {
      if (t.name === n) {
        s = t;
        return;
      }
    }), s;
  }
  static search(n) {
    return this.COMMANDS.filter((t) => {
      var f;
      return (f = t.name) == null ? void 0 : f.match(n);
    });
  }
  static reload() {
    Ce(), B.COMMANDS = G;
  }
};
W(B, "COMMANDS", G);
let ee = B;
function ut({ app: e, path: n, input: s, setTitle: t, close: f, active: y, focus: a }) {
  const u = De(), [c, o] = S(0), [r, v] = S(s ?? ""), [i, b] = S([{
    text: e ? ye.replace("$APP_NAME", e.name) : ye,
    isInput: !1
  }]), k = Re(), [h, $] = S(k == null ? void 0 : k.navigate(n ?? "~")), O = pe(null), [M, D] = S(0), [T, K] = S(null), [U, se] = S(null), R = pe(null), [re, ae] = S(!1), Ee = He();
  z(() => {
    h != null && (t == null || t(`${Z}@${Q}: ${h.root ? "/" : h.path}`));
  }, [h == null ? void 0 : h.path, h == null ? void 0 : h.root, t]), z(() => {
    !O.current || !y || O.current.focus();
  }, [O, y]);
  const ie = () => {
    R.current.scrollTop = R.current.scrollHeight;
  };
  z(() => {
    re || R.current == null || U == null || (ie(), ae(!0));
  }, [re, U, R]), z(() => {
    R.current == null || T != null || ie();
  }, [r]);
  const oe = `${_.fg.cyan + Z}@${Q + _.reset}:${_.fg.blue + (h != null && h.root || h == null ? "/" : h == null ? void 0 : h.path) + _.reset}$ `, le = i, X = (l) => {
    le.push(l), b(le);
  }, J = (l) => {
    X({
      text: l,
      isInput: !1
    });
  }, $e = (l, p) => {
    K(l), ae(!1);
    const g = (d) => {
      y && (d.ctrlKey || d.metaKey) && d.key === "c" && l.stop();
    };
    let m = null;
    l.on(P.EVENT_NAMES.new, (d) => {
      (async () => {
        let w = d;
        for (const I of p)
          w instanceof P || (w = await ce(w ? `${I} ${w}` : I));
        if (w instanceof P) {
          l.stop(), J(_.fg.red + "Stream failed");
          return;
        }
        m = w, se(w);
      })();
    }), l.on(P.EVENT_NAMES.stop, () => {
      document.removeEventListener("keydown", g), J(m), K(null), se(null);
    }), document.addEventListener("keydown", g);
  }, ce = async (l) => {
    var he;
    const p = l.indexOf(" ") + 1, g = p <= 0 ? "" : l.substr(p), m = Date.now();
    if (l = l.trim(), l === "") return;
    let d = l.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (d == null) return;
    d[0].toLowerCase() === "sudo" && d.length >= 2 && d.shift();
    const w = (he = d.shift()) == null ? void 0 : he.toLowerCase();
    if (w == null) return;
    const I = ee.find(w);
    if (!I) return F(w, "Command not found");
    d = d.map((C) => C.startsWith('"') && C.endsWith('"') ? C.slice(1, -1) : C);
    const H = [], fe = {};
    if (d.filter((C) => C.startsWith("-")).forEach((C) => {
      const ge = (j) => {
        if (H.includes(j))
          return;
        H.push(j);
        const x = I.getOption(H[H.length - 1]);
        if (x != null && x.isInput) {
          const me = d[d.indexOf(C) + 1];
          fe[x.short] = me, de(me, d);
        }
      };
      if (C.startsWith("--")) {
        const j = C.substring(2).toLowerCase();
        ge(j);
      } else
        C.substring(1).split("").forEach((x) => {
          ge(x);
        });
      de(C, d);
    }), I.requireArgs && d.length === 0)
      return F(w, `Incorrect usage: ${w} requires at least 1 argument`);
    if (I.requireOptions && H.length === 0)
      return F(w, `Incorrect usage: ${w} requires at least 1 option`);
    let V = null;
    try {
      if (V = await I.execute(d, {
        promptOutput: J,
        pushHistory: X,
        virtualRoot: k,
        currentDirectory: h,
        setCurrentDirectory: $,
        username: Z,
        hostname: Q,
        rawInputValue: g,
        options: H,
        exit: f,
        inputs: fe,
        timestamp: m,
        settingsManager: Ee,
        systemManager: u,
        app: e
      }), V == null)
        return F(w, "Command failed");
      if (!V.blank)
        return V;
    } catch (C) {
      return console.error(C), F(w, "Command failed");
    }
  }, Oe = () => {
    v(""), D(0);
  }, Se = async (l) => {
    X({
      text: oe + l,
      isInput: !0,
      value: l
    });
    let p = l.split(" | ");
    const g = [];
    let m = null;
    for (const d of p)
      m instanceof P || (m = await ce(m ? `${d} ${m}` : d), g.push(d));
    Oe(), p = p.filter((d) => !g.includes(d)), m && (m instanceof P ? $e(m, p) : J(`${m}
`));
  }, ue = (l) => {
    const p = i.filter(({ isInput: m }) => m), g = Ve(M + l, 0, p.length);
    if (g === M) {
      l < 0 && v("");
      return;
    }
    v(g === 0 ? "" : p[p.length - g].value ?? ""), D(g);
  }, Te = (l) => {
    const p = l.target.value, { key: g } = l;
    g === "Enter" ? (Se(p), o((m) => m + 1)) : g === "ArrowUp" ? (l.preventDefault(), ue(1)) : g === "ArrowDown" ? (l.preventDefault(), ue(-1)) : !T && (l.ctrlKey || l.metaKey) && g === "c" && v((m) => m + "^C");
  }, Ie = (l) => {
    const p = l.target.value;
    return v(p);
  }, Ae = () => {
    const l = i.slice(-16);
    let p = 0;
    return l.forEach((g, m) => {
      g.clear && (p = m + 1);
    }), l.slice(p).map(({ text: g }, m) => /* @__PURE__ */ L(be, { text: g }, m));
  }, Le = (l) => {
    var p, g;
    a == null || a(l), l.button === 2 && (l.preventDefault(), (g = (p = navigator.clipboard).readText) == null || g.call(p).then((m) => {
      v(r + m);
    }).catch((m) => {
      console.error(m);
    }));
  }, Ne = (l) => {
    l.preventDefault();
  };
  return /* @__PURE__ */ Y(
    "div",
    {
      ref: R,
      className: N.Terminal,
      onMouseDown: Le,
      onContextMenu: Ne,
      onClick: (l) => {
        var p, g;
        ((p = window.getSelection()) == null ? void 0 : p.toString()) === "" && (l.preventDefault(), (g = O.current) == null || g.focus());
      },
      children: [
        Ae(),
        T ? /* @__PURE__ */ L(be, { text: U ?? "" }) : /* @__PURE__ */ L(
          lt,
          {
            value: r,
            prefix: oe,
            onKeyDown: Te,
            onChange: Ie,
            inputRef: O
          },
          c
        )
      ]
    }
  );
}
const ft = new xe("Terminal", "terminal", ut).setIconUrl("https://os.prozilla.dev/assets/apps/icons/terminal.svg").setRole(je.APP_ROLES.terminal).setCategory("Utilities & tools");
ft.setMetadata({ name: "@prozilla-os/terminal", version: "1.1.18", author: "Prozilla" });
export {
  E as A,
  ee as C,
  vt as M,
  P as S,
  _t as a,
  F as f,
  bt as r,
  ft as t
};
//# sourceMappingURL=main-CtddTNml.js.map
