(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._CircuitView_dfvf4_1{display:flex;width:100%;height:calc(100% - var(--header-height));flex-grow:1}._Canvas_dfvf4_8{flex:1;width:100%;height:100%}._LogicSim_k1eu4_1{display:flex;flex-direction:column;width:100%;height:100%}._LogicSim_k1eu4_1{--black-0: hsl(210, 15%, 55%);--black-1: hsl(210, 15%, 40%);--black-2: hsl(210, 15%, 30%);--black-3: hsl(210, 15%, 20%);--black-4: hsl(210, 15%, 12.5%)}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
var F = Object.defineProperty;
var Z = (P, i, t) => i in P ? F(P, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : P[i] = t;
var o = (P, i, t) => Z(P, typeof i != "symbol" ? i + "" : i, t);
import { Vector2 as h, useAppFolder as q, HeaderMenu as K, DropdownAction as j, ClickAction as k, openUrl as X, App as Y } from "@prozilla-os/core";
import { jsxs as D, Fragment as G, jsx as w } from "react/jsx-runtime";
import { useState as _, useRef as Q, useEffect as ii } from "react";
import { clamp as ti } from "@prozilla-os/shared";
const si = "_CircuitView_dfvf4_1", ei = "_Canvas_dfvf4_8", J = {
  CircuitView: si,
  Canvas: ei
}, O = class O {
  constructor(i) {
    o(this, "value");
    this.value = i;
  }
  static invert(i) {
    return new O(1 - i.value);
  }
  isEqual(i) {
    return this.value === i.value;
  }
};
o(O, "LOW", new O(0)), o(O, "HIGH", new O(1));
let C = O;
const S = {
  default: "default",
  pointer: "pointer"
}, A = "outfit", $ = {
  padding: 30,
  borderWidth: 7.5
}, a = {
  radius: 25,
  borderWidth: 5,
  pinOffset: 42.5,
  connectorWidth: 7.5,
  handleWidth: 15,
  handleTrackWidth: 22.5,
  placingOpacity: 0.5
}, H = {
  width: 5,
  snappingSensitivity: 10,
  cornerRadius: 25,
  resolution: 8
}, d = {
  radius: 10,
  label: {
    offset: 10,
    fontSize: 15,
    padding: 5
  }
}, m = {
  BorderWidth: 5,
  padding: 10,
  fontSize: 35,
  placingOutline: 10
}, g = {
  pin: {
    fill: "black-4",
    fillHover: "black-3",
    labelText: "white-0",
    labelBackground: "black-4"
  },
  controller: {
    stroke: "black-4",
    connector: "black-4",
    on: "red-0",
    off: "red-2",
    hover: "white-0",
    handle: "black-3",
    handleHover: "black-4"
  },
  background: {
    border: "black-0",
    outer: "black-1",
    inner: "black-2",
    margin: "black-2"
  },
  wire: {
    placing: "black-1"
  },
  chip: {
    text: "black-4",
    outline: "white-0"
  }
};
class L {
  constructor(i, t, s, e, n) {
    o(this, "id");
    o(this, "name");
    o(this, "position", h.ZERO);
    o(this, "attachedChip");
    o(this, "circuit");
    o(this, "state", C.LOW);
    o(this, "isInput");
    o(this, "isControlled", !1);
    o(this, "outputWires", []);
    Object.assign(this, { circuit: i, name: t, isInput: s, attachedChip: e }), this.id = n ?? this.circuit.getUniqueId();
  }
  addOutputWire(i) {
    this.outputWires.push(i), i.setState(this.state);
  }
  setState(i) {
    this.state.isEqual(i) || (this.state = i, this.update());
  }
  update() {
    var i;
    this.outputWires.forEach((t) => {
      t.setState(this.state);
    }), (i = this.attachedChip) == null || i.update();
  }
  get isPointingRight() {
    return this.isInput === this.isControlled;
  }
  draw(i) {
    let t = g.pin.fill;
    if (this.circuit.inputHandler.mousePosition.getDistance(this.position.x, this.position.y) <= d.radius) {
      this.circuit.cursor = S.pointer, t = g.pin.fillHover;
      let s = this.position.x;
      const e = this.isPointingRight, n = this.circuit.getTextRect(d.label.fontSize, this.name);
      e ? s += d.radius + d.label.offset : s -= d.radius + d.label.offset;
      const r = {
        x: n.x + d.label.padding * 2,
        y: n.y + d.label.padding * 2
      };
      this.circuit.drawRect(
        this.circuit.getColor(g.pin.labelBackground),
        e ? s : s - r.x,
        this.position.y - n.y / 2 - d.label.padding,
        r.x,
        r.y
      ), e ? s += d.label.padding : s -= d.label.padding, this.circuit.drawText(
        this.circuit.getColor(g.pin.labelText),
        e ? "left" : "right",
        s,
        this.position.y,
        d.label.fontSize,
        this.name
      );
    }
    i && this.circuit.setDrawingOpacity(a.placingOpacity), this.circuit.drawCircle(
      this.circuit.getColor(t),
      this.position.x,
      this.position.y,
      d.radius
    ), i && this.circuit.resetDrawingOpacity();
  }
  toJson() {
    return {
      name: this.name,
      id: this.id,
      position: this.position
    };
  }
}
class I {
  constructor(i, t, s, e, n, r) {
    o(this, "color");
    o(this, "name");
    o(this, "position", h.ZERO);
    o(this, "size");
    o(this, "circuit");
    o(this, "isCircuit", !1);
    o(this, "isBlueprint", !1);
    o(this, "inputCount", 0);
    o(this, "outputCount", 0);
    o(this, "inputPins");
    o(this, "outputPins");
    o(this, "logic");
    if (Object.assign(this, { circuit: i, name: t, color: s, isBlueprint: e, inputCount: n, outputCount: r }), this.circuit == null && !e && (this.circuit = this, this.isCircuit = !0), !(this.isCircuit || this.isBlueprint)) {
      if (this.circuit != null) {
        const c = this.circuit.getTextRect(m.fontSize, this.name), l = c.x + (m.padding + m.BorderWidth) * 2, f = c.y + (m.padding + m.BorderWidth) * 2;
        this.size = new h(l, f);
      }
      this.inputPins = [];
      for (let c = 0; c < n; c++) {
        const l = new L(this.circuit, "IN " + c, !0, this);
        this.inputPins.push(l), this.isCircuit && (l.isControlled = !0);
      }
      this.outputPins = [];
      for (let c = 0; c < r; c++) {
        const l = new L(this.circuit, "OUT " + c, !1, this);
        this.outputPins.push(l), this.isCircuit && (l.isControlled = !0);
      }
    }
  }
  setCircuit(i) {
    this.circuit = i, this.inputPins.concat(this.outputPins).forEach((t) => {
      t.circuit = i;
    });
  }
  setLogic(i) {
    return this.logic = i, this;
  }
  update() {
    if (this.logic == null)
      return;
    const i = [];
    for (let s = 0; s < this.inputCount; s++) {
      const e = this.inputPins[s].state ?? C.LOW;
      i.push(e);
    }
    const t = this.logic(i);
    for (let s = 0; s < this.outputCount; s++)
      this.outputPins[s].setState(t[s]);
  }
  drawPins(i = !0) {
    this.inputPins.forEach((t, s) => {
      if (i) {
        const n = (this.size.y - this.inputCount * d.radius * 2) / (this.inputCount + 1);
        t.position.x = this.position.x, t.position.y = this.position.y + n * (s + 1) + d.radius * (2 * s + 1);
      }
      const e = this.circuit.inputHandler.isPlacingPin(t, s);
      t.draw(e);
    }), this.outputPins.forEach((t, s) => {
      if (i) {
        const n = (this.size.y - this.outputCount * d.radius * 2) / (this.outputCount + 1);
        t.position.x = this.position.x + this.size.x, t.position.y = this.position.y + n * (s + 1) + d.radius * (2 * s + 1);
      }
      const e = this.circuit.inputHandler.isPlacingPin(t, s);
      t.draw(e);
    });
  }
  draw(i) {
    this.circuit.drawRect(
      this.circuit.getColor(this.color + "-1"),
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    ), this.circuit.drawRect(
      this.circuit.getColor(this.color + "-0"),
      this.position.x + m.BorderWidth,
      this.position.y + m.BorderWidth,
      this.size.x - m.BorderWidth * 2,
      this.size.y - m.BorderWidth * 2
    ), this.circuit.drawText(
      this.circuit.getColor(g.chip.text),
      "center",
      this.position.x + this.size.x / 2,
      this.position.y + this.size.y / 2,
      m.fontSize,
      this.name
    ), i && (this.circuit.setDrawingOpacity(0.25), this.circuit.drawRect(
      this.circuit.getColor(g.chip.outline),
      this.position.x - m.placingOutline,
      this.position.y - m.placingOutline,
      this.size.x + m.placingOutline * 2,
      this.size.y + m.placingOutline * 2
    ), this.circuit.resetDrawingOpacity()), this.drawPins();
  }
  toJson() {
    const i = {
      color: this.color,
      name: this.name,
      position: {
        x: this.position.x,
        y: this.position.y
      }
    };
    return this.inputPins.length > 0 && (i.inputPins = this.inputPins.map((t) => t.toJson())), this.outputPins.length > 0 && (i.outputPins = this.outputPins.map((t) => t.toJson())), i;
  }
}
class U extends L {
  constructor(i, t, s, e) {
    super(i, t, s, i, e), this.isControlled = !0;
  }
  drawControllerHandle(i) {
    const t = { x: a.handleWidth, y: a.radius * 2 };
    let s = this.position.x;
    const e = this.position.y - t.y / 2;
    this.isInput ? s -= a.pinOffset + a.handleTrackWidth + a.radius : s += a.pinOffset + (a.handleTrackWidth - a.handleWidth) + a.radius;
    const n = {
      position: { x: s, y: e },
      size: { x: t.x, y: t.y }
    };
    let r;
    this.circuit.isPointInsideRect(n, this.circuit.inputHandler.mousePosition) ? (r = g.controller.handleHover, this.circuit.cursor = S.pointer) : r = g.controller.handle, i && this.circuit.setDrawingOpacity(a.placingOpacity), this.circuit.drawRect(
      this.circuit.getColor(r),
      n.position.x,
      n.position.y,
      n.size.x,
      n.size.y
    ), i && this.circuit.resetDrawingOpacity();
  }
  drawController(i) {
    const t = this.isInput ? this.position.x - a.pinOffset : this.position.x + a.pinOffset, s = this.position.y;
    let e;
    this.state.value === 1 ? e = g.controller.on : e = g.controller.off, i && this.circuit.setDrawingOpacity(a.placingOpacity), this.circuit.drawCircle(
      this.circuit.getColor(g.controller.stroke),
      t,
      s,
      a.radius
    ), this.circuit.drawCircle(
      this.circuit.getColor(e),
      t,
      s,
      a.radius - a.borderWidth
    ), this.isInput && this.isControlled && !i && this.circuit.inputHandler.mousePosition.getDistance(t, s) <= a.radius && (this.circuit.setDrawingOpacity(0.125), this.circuit.drawCircle(
      this.circuit.getColor(g.controller.hover),
      t,
      s,
      a.radius - a.borderWidth
    ), this.circuit.resetDrawingOpacity(), this.circuit.cursor = S.pointer), i && this.circuit.resetDrawingOpacity();
  }
  drawConnector(i) {
    if (i)
      return;
    const t = this.isInput ? this.position.x - a.pinOffset : this.position.x, s = this.position.y;
    i && this.circuit.setDrawingOpacity(a.placingOpacity), this.circuit.drawRect(
      this.circuit.getColor(g.controller.connector),
      t,
      s - a.connectorWidth / 2,
      a.pinOffset,
      a.connectorWidth
    ), i && this.circuit.resetDrawingOpacity();
  }
  draw(i) {
    this.drawConnector(i), this.drawController(i), this.drawControllerHandle(i), super.draw(i);
  }
}
class V {
  constructor(i, t, s, e, n) {
    o(this, "color");
    o(this, "state", C.LOW);
    o(this, "inputPin");
    o(this, "outputPin");
    o(this, "anchorPoints");
    o(this, "circuit");
    o(this, "placedBackwards", !1);
    Object.assign(this, { circuit: i, color: t, inputPin: s, outputPin: e, anchorPoints: n });
  }
  setState(i) {
    this.state.isEqual(i) || (this.state = i, this.update());
  }
  update() {
    this.outputPin != null && this.outputPin.setState(this.state);
  }
  draw(i) {
    const t = [...this.anchorPoints];
    this.inputPin != null && (this.placedBackwards ? t.push(this.inputPin.position) : t.unshift(this.inputPin.position)), this.outputPin != null && (this.placedBackwards ? t.unshift(this.outputPin.position) : t.push(this.outputPin.position));
    let s;
    i ? s = `${this.color}-2` : this.state.value === 1 ? s = `${this.color}-0` : s = `${this.color}-2`, this.circuit.drawCurvedLine(this.circuit.getColor(s), t, H.width, H.cornerRadius, H.resolution);
  }
  toJson() {
    const i = {
      color: this.color
    };
    return this.inputPin != null && (i.inputId = this.inputPin.id), this.outputPin != null && (i.outputId = this.outputPin.id), this.anchorPoints != null && (i.anchorPoints = this.anchorPoints), i;
  }
}
class ni {
  constructor(i) {
    o(this, "circuit");
    o(this, "canvas");
    o(this, "mousePosition", h.ZERO);
    o(this, "isPlacing", !1);
    o(this, "snapping", !1);
    o(this, "placingOffset", h.ZERO);
    o(this, "previousPlacement");
    o(this, "placingWire");
    o(this, "placingChip");
    o(this, "placingPin");
    o(this, "onMouseMove", (i) => {
      if (i != null && this.setMousePosition(i), this.placingWire != null) {
        this.updateWirePlacement();
        return;
      }
      if (this.placingChip != null) {
        this.updateChipPlacement();
        return;
      }
      const t = (s) => {
        const e = s.position.y - a.radius, n = s.position.y + a.radius;
        return this.mousePosition.y > e && this.mousePosition.y < n;
      };
      if (this.placingPin != null) {
        let s = this.mousePosition.x > a.handleTrackWidth && this.mousePosition.x < this.circuit.size.x - a.handleTrackWidth;
        if (s) {
          this.cancelPinPlacement();
          return;
        }
        this.placingPin.isInput ? this.circuit.inputPins.forEach((e, n) => {
          s || n == this.circuit.inputPins.length - 1 || t(e) && (s = !0);
        }) : this.circuit.outputPins.forEach((e, n) => {
          s || n == this.circuit.outputPins.length - 1 || t(e) && (s = !0);
        }), s ? this.cancelPinPlacement() : this.updatePinPlacement();
      } else if (this.mousePosition.x < a.handleTrackWidth) {
        let s = !1;
        this.circuit.inputPins.forEach((e) => {
          s || t(e) && (s = !0);
        }), s || this.startPinPlacement(!0);
      } else if (this.mousePosition.x > this.circuit.size.x - a.handleTrackWidth) {
        let s = !1;
        this.circuit.outputPins.forEach((e) => {
          s || t(e) && (s = !0);
        }), s || this.startPinPlacement(!1);
      }
    });
    o(this, "onMouseUp", (i) => {
      if (i.preventDefault(), this.setMousePosition(i), i.button === 2)
        this.placingWire != null && this.cancelWirePlacement(), this.placingChip != null && this.cancelChipPlacement();
      else if (i.button === 0) {
        let t = !1;
        if (this.circuit.inputPins.forEach((s) => {
          this.mousePosition.getDistance(s.position.x - a.pinOffset, s.position.y) <= a.radius ? (s.setState(C.invert(s.state)), t = !0) : this.mousePosition.getDistance(s.position.x, s.position.y) <= d.radius && (this.onClickPin(s), t = !0);
        }), t || (this.circuit.outputPins.forEach((s) => {
          this.mousePosition.getDistance(s.position.x, s.position.y) <= d.radius && (this.onClickPin(s), t = !0);
        }), t) || (this.circuit.chips.forEach((s) => {
          s.inputPins.concat(s.outputPins).forEach((e) => {
            this.mousePosition.getDistance(e.position.x, e.position.y) <= d.radius && (this.onClickPin(e), t = !0);
          });
        }), t))
          return;
        this.placingWire != null && this.anchorWirePlacement(), this.placingChip != null && this.endChipPlacement(), this.placingPin != null && this.endPinPlacement();
      }
    });
    o(this, "onMouseDown", (i) => {
      i.preventDefault(), this.setMousePosition(i), !(i.button !== 0 || this.isPlacing) && this.circuit.chips.forEach((t, s) => {
        if (!this.isPlacing && this.circuit.isPointInsideRect(t, this.mousePosition)) {
          let e = !1;
          t.inputPins.concat(t.outputPins).forEach((n) => {
            n.position.getDistance(this.mousePosition.x, this.mousePosition.y) <= d.radius && (e = !0);
          }), e || this.editChipPlacement(t, s);
        }
      });
    });
    o(this, "onKeyDown", (i) => {
      switch (i.key) {
        case "Shift":
          i.preventDefault(), this.snapping = !0, this.onMouseMove();
          break;
        case "Backspace":
        case "Delete":
        case "Escape":
          i.preventDefault(), this.placingWire != null && this.cancelWirePlacement(), this.placingChip != null && this.cancelChipPlacement();
          break;
      }
    });
    o(this, "onKeyUp", (i) => {
      switch (i.key) {
        case "Shift":
          i.preventDefault(), this.snapping = !1, this.onMouseMove();
          break;
      }
    });
    Object.assign(this, { circuit: i });
  }
  setMousePosition(i) {
    const t = this.canvas.getBoundingClientRect();
    this.mousePosition.x = i.clientX - t.left, this.mousePosition.y = i.clientY - t.top;
  }
  init() {
    this.canvas = this.circuit.canvas, this.mousePosition = h.ZERO, this.canvas.addEventListener("mousemove", this.onMouseMove), this.canvas.addEventListener("mouseup", this.onMouseUp), this.canvas.addEventListener("contextmenu", this.onMouseUp), this.canvas.addEventListener("mousedown", this.onMouseDown), window.addEventListener("keydown", this.onKeyDown), window.addEventListener("keyup", this.onKeyUp);
  }
  cleanup() {
    this.canvas.removeEventListener("mousemove", this.onMouseMove), this.canvas.removeEventListener("mouseup", this.onMouseUp), this.canvas.removeEventListener("contextmenu", this.onMouseUp), this.canvas.removeEventListener("mousedown", this.onMouseDown), window.removeEventListener("keydown", this.onKeyDown), window.removeEventListener("keyup", this.onKeyUp);
  }
  reset() {
    this.placingWire = null, this.placingChip = null, this.placingPin = null, this.previousPlacement = null, this.placingOffset = h.ZERO, this.isPlacing = !1;
  }
  onClickPin(i) {
    this.placingWire != null ? this.endWirePlacement(i) : this.startWirePlacement(i);
  }
  startWirePlacement(i) {
    const t = i.isPointingRight, s = t ? i : void 0, e = t ? void 0 : i, n = this.mousePosition.clone;
    this.placingWire = new V(this.circuit, "red", s, e, [n]), t || (this.placingWire.placedBackwards = !0), this.circuit.wires.push(this.placingWire);
  }
  snapWireHorizontally(i, t) {
    i.x = this.mousePosition.x, i.y = t.y;
    let s = [];
    this.circuit.wires.forEach((r, c) => {
      c < this.circuit.wires.length - 1 && (s = s.concat(r.anchorPoints));
    });
    let e, n;
    s.forEach((r) => {
      const c = Math.abs(this.mousePosition.x - r.x);
      (n == null || n > c) && (e = r.x, n = c);
    }), n != null && e != null && n < H.snappingSensitivity && (i.x = e);
  }
  snapWireVertically(i, t) {
    var r;
    i.x = t.x, i.y = this.mousePosition.y;
    let s;
    (r = this.placingWire) != null && r.placedBackwards ? (s = this.circuit.inputPins, this.circuit.chips.forEach((c) => {
      s = s.concat(c.outputPins);
    })) : (s = this.circuit.outputPins, this.circuit.chips.forEach((c) => {
      s = s.concat(c.inputPins);
    }));
    let e, n;
    s.forEach((c) => {
      const l = Math.abs(this.mousePosition.y - c.position.y);
      (n == null || n > l) && (e = c.position.y, n = l);
    }), n != null && e != null && n < H.snappingSensitivity && (i.y = e);
  }
  updateWirePlacement() {
    var s, e, n, r, c, l;
    const i = (s = this.placingWire) == null ? void 0 : s.anchorPoints.length;
    if (i == null) return;
    const t = (e = this.placingWire) == null ? void 0 : e.anchorPoints[i - 1];
    if (t != null)
      if (!this.snapping)
        t.x = this.mousePosition.x, t.y = this.mousePosition.y;
      else {
        let f;
        if (i >= 2 ? f = (n = this.placingWire) == null ? void 0 : n.anchorPoints[i - 2] : (r = this.placingWire) != null && r.placedBackwards ? f = (l = this.placingWire) == null ? void 0 : l.outputPin.position : f = (c = this.placingWire) == null ? void 0 : c.inputPin.position, f == null) return;
        const z = Math.abs(this.mousePosition.x - f.x), b = Math.abs(this.mousePosition.y - f.y);
        z > b ? this.snapWireHorizontally(t, f) : this.snapWireVertically(t, f);
      }
  }
  anchorWirePlacement() {
    var i;
    (i = this.placingWire) == null || i.anchorPoints.push(this.mousePosition.clone);
  }
  cancelWirePlacement() {
    this.placingWire = null, this.isPlacing = !1, this.circuit.wires.pop();
  }
  endWirePlacement(i) {
    const t = i.isPointingRight;
    if (this.placingWire == null) return;
    let s = !1;
    !t && !this.placingWire.placedBackwards ? (this.placingWire.outputPin = i, s = !0) : t && this.placingWire.placedBackwards && (this.placingWire.inputPin = i, s = !0), s && (this.placingWire.anchorPoints.pop(), this.placingWire.inputPin.addOutputWire(this.placingWire), this.placingWire.inputPin.update(), this.placingWire = null, this.isPlacing = !1);
  }
  startChipPlacement(i) {
    const t = new I(this.circuit, i.name, i.color, !1, i.inputCount, i.outputCount);
    t.setLogic(i.logic), t.position = new h(
      this.mousePosition.x - t.size.x / 2,
      this.mousePosition.y - t.size.y / 2
    ), this.placingChip = t, this.isPlacing = !0, this.circuit.chips.push(t);
  }
  editChipPlacement(i, t) {
    this.placingOffset = new h(
      i.position.x + i.size.x / 2 - this.mousePosition.x,
      i.position.y + i.size.y / 2 - this.mousePosition.y
    ), this.previousPlacement = i.position.clone, this.circuit.chips.push(this.circuit.chips.splice(t, 1)[0]), this.placingChip = i, this.isPlacing = !0;
  }
  updateChipPlacement() {
    this.placingChip != null && (this.placingChip.position.x = this.mousePosition.x - this.placingChip.size.x / 2 + this.placingOffset.x, this.placingChip.position.y = this.mousePosition.y - this.placingChip.size.y / 2 + this.placingOffset.y);
  }
  cancelChipPlacement() {
    this.placingChip != null && (this.previousPlacement != null ? (this.placingChip.position = this.previousPlacement, this.previousPlacement = null) : this.circuit.chips.pop(), this.placingChip = null, this.isPlacing = !1);
  }
  endChipPlacement() {
    this.placingChip = null, this.isPlacing = !1, this.placingOffset = h.ZERO;
  }
  startPinPlacement(i) {
    const t = new U(this.circuit, "PIN", i);
    t.position.x = a.handleTrackWidth + a.pinOffset + a.radius, t.position.y = this.mousePosition.y, i ? this.circuit.inputPins.push(t) : (t.position.x = this.circuit.size.x - t.position.x, this.circuit.outputPins.push(t)), this.placingPin = t;
  }
  updatePinPlacement() {
    this.placingPin != null && (this.placingPin.position.y = this.mousePosition.y);
  }
  cancelPinPlacement() {
    var i;
    (i = this.placingPin) != null && i.isInput ? this.circuit.inputPins.pop() : this.circuit.outputPins.pop(), this.placingPin = null;
  }
  endPinPlacement() {
    this.placingPin = null;
  }
  isPlacingPin(i, t) {
    return !i.isControlled || this.placingPin == null || this.placingPin.isInput != i.isInput ? !1 : i.isInput ? t == this.circuit.inputPins.length - 1 : t == this.circuit.outputPins.length - 1;
  }
}
class oi extends I {
  constructor(t, s, e, n) {
    super(null, t, s, !1, e, n);
    o(this, "canvas");
    o(this, "size", h.ZERO);
    o(this, "context");
    o(this, "colors", {});
    o(this, "inputHandler");
    o(this, "inputPins", []);
    o(this, "outputPins", []);
    o(this, "wires", []);
    o(this, "chips", []);
    o(this, "cursor", S.default);
    o(this, "lastId", 0);
    this.inputHandler = new ni(this);
  }
  resize() {
    this.size.x = this.canvas.clientWidth, this.size.y = this.canvas.clientHeight;
  }
  init(t) {
    this.canvas = t, this.context = this.canvas.getContext("2d"), this.resize(), new ResizeObserver((e) => {
      e.forEach(({ target: n }) => {
        n === this.canvas && (n.clientWidth != this.size.x || n.clientHeight != this.size.y) && this.resize();
      });
    }).observe(this.canvas), this.inputHandler.init(), this.render();
  }
  cleanup() {
    this.inputHandler.cleanup();
  }
  reset() {
    this.inputPins = [], this.outputPins = [], this.wires = [], this.chips = [], this.inputHandler.reset();
  }
  getColor(t) {
    if (this.colors[t] != null)
      return this.colors[t];
    const s = getComputedStyle(this.canvas).getPropertyValue("--" + t);
    return this.colors[t] = s, s;
  }
  isPointInsideRect(t, s) {
    return s.x > t.position.x && s.y > t.position.y && s.x < t.position.x + t.size.x && s.y < t.position.y + t.size.y;
  }
  getUniqueId() {
    return this.lastId++;
  }
  getTextRect(t, s) {
    this.context.textBaseline = "middle", this.context.font = `bold ${t}px ${A}`;
    const e = this.context.measureText(s), n = e.actualBoundingBoxRight + e.actualBoundingBoxLeft, r = e.actualBoundingBoxAscent + e.actualBoundingBoxDescent;
    return { x: n, y: r };
  }
  drawRect(t, s, e, n, r) {
    this.context.fillStyle = t, this.context.fillRect(s, e, n, r);
  }
  drawCircle(t, s, e, n) {
    this.context.beginPath(), this.context.arc(s, e, n, 0, 2 * Math.PI), this.context.fillStyle = t, this.context.fill();
  }
  drawCurvedLine(t, s, e, n, r) {
    if (s.length < 2)
      return;
    this.context.lineWidth = e, this.context.lineJoin = "round", this.context.lineCap = "round";
    const c = [];
    c.push(s[0]);
    for (let l = 1; l < s.length - 1; l++) {
      const f = s[l], z = h.normalize(h.subtract(s[l], s[l - 1])), b = h.magnitude(h.subtract(s[l], s[l - 1])), T = Math.max(b - n, b / 2), B = h.normalize(h.subtract(s[l + 1], s[l])), u = h.magnitude(h.subtract(s[l + 1], s[l])), p = h.add(s[l - 1], h.scale(z, T)), E = h.add(f, h.scale(B, Math.min(n, u / 2)));
      for (let v = 0; v < r; v++) {
        const x = v / (r - 1), M = h.lerp(p, f, x), y = h.lerp(f, E, x), W = h.lerp(M, y, x);
        h.sqrDistance(W, c[c.length - 1]) > 1e-3 && c.push(W);
      }
    }
    c.push(s[s.length - 1]), this.context.beginPath(), this.context.moveTo(c[0].x, c[0].y);
    for (let l = 1; l < c.length; l++)
      this.context.lineTo(c[l].x, c[l].y);
    this.context.strokeStyle = t, this.context.stroke();
  }
  drawText(t, s, e, n, r, c) {
    this.context.fillStyle = t, this.context.textAlign = s, this.context.textBaseline = "middle", this.context.font = `bold ${r}px ${A}`, this.context.fillText(c, e, n);
  }
  setDrawingOpacity(t) {
    this.context.globalAlpha = ti(t, 0, 1);
  }
  resetDrawingOpacity() {
    this.setDrawingOpacity(1);
  }
  drawBackground() {
    const t = a.handleTrackWidth, s = $.padding;
    this.drawRect(this.getColor(g.background.margin), 0, 0, this.size.x, this.size.y);
    let e = 0;
    this.drawRect(
      this.getColor(g.background.outer),
      e + t,
      e,
      this.size.x - t * 2,
      this.size.y
    ), e = s - $.borderWidth, this.drawRect(
      this.getColor(g.background.border),
      e + t,
      e,
      this.size.x - e * 2 - t * 2,
      this.size.y - e * 2
    ), e = s, this.drawRect(
      this.getColor(g.background.inner),
      e + t,
      e,
      this.size.x - e * 2 - t * 2,
      this.size.y - e * 2
    );
  }
  drawWires() {
    this.wires.forEach((t, s) => {
      const e = this.inputHandler.placingWire != null && s == this.wires.length - 1;
      t.draw(e);
    });
  }
  drawChips() {
    this.chips.forEach((t, s) => {
      const e = this.inputHandler.placingChip != null && s == this.chips.length - 1;
      t.draw(e);
    });
  }
  draw() {
    this.drawBackground(), this.drawWires(), this.drawChips(), super.drawPins(!1);
  }
  render() {
    this.canvas.width != this.size.x && (this.canvas.width = this.size.x), this.canvas.height != this.size.y && (this.canvas.height = this.size.y), this.cursor = S.default, this.draw(), this.inputHandler.isPlacing ? this.canvas.style.cursor = S.default : this.canvas.style.cursor = this.cursor, window.requestAnimationFrame(() => {
      this.render();
    });
  }
  toJson() {
    const t = super.toJson();
    return this.wires.length > 0 && (t.wires = this.wires.map((s) => s.toJson())), this.chips.length > 0 && (t.chips = this.chips.map((s) => s.toJson())), t;
  }
  toString() {
    const t = this.toJson();
    return JSON.stringify(t);
  }
}
const N = class N {
  static saveCircuit(i, t) {
    t.createFile(i.name, "json", (s) => {
      s.setContent(i.toString());
    });
  }
  static loadCircuit(i, t) {
    var e;
    i.reset();
    const s = t.findFile(i.name, "json");
    s != null && ((e = s.read()) == null || e.then((n) => {
      var l, f, z, b, T, B;
      const r = JSON.parse(n);
      i.color = r.color, i.name = r.name;
      const c = {};
      i.inputCount = ((l = r.inputPins) == null ? void 0 : l.length) ?? 0, (f = r.inputPins) == null || f.forEach((u) => {
        const p = new U(i, u.name, !0, u.id);
        p.position = u.position, i.inputPins.push(p), c[u.id] = p;
      }), i.outputCount = ((z = r.outputPins) == null ? void 0 : z.length) ?? 0, (b = r.outputPins) == null || b.forEach((u) => {
        const p = new U(i, u.name, !1, u.id);
        p.position = u.position, i.outputPins.push(p), c[u.id] = p;
      }), (T = r.chips) == null || T.forEach((u) => {
        var E, v, x, M;
        const p = new I(i, u.name, u.color, !1, 0, 0);
        p.position = u.position, p.inputCount = ((E = u.inputPins) == null ? void 0 : E.length) ?? 0, (v = u.inputPins) == null || v.forEach((y) => {
          const W = new L(i, y.name, !0, p, y.id);
          p.inputPins.push(W), c[y.id] = W;
        }), p.outputCount = ((x = u.outputPins) == null ? void 0 : x.length) ?? 0, (M = u.outputPins) == null || M.forEach((y) => {
          const W = new L(i, y.name, !1, p, y.id);
          p.outputPins.push(W), c[y.id] = W;
        }), p.setLogic(N.CHIPS[u.name].logic), p.update(), i.chips.push(p);
      }), (B = r.wires) == null || B.forEach((u) => {
        const p = c[u.inputId], E = c[u.outputId], v = u.anchorPoints ?? [], x = new V(i, u.color, p, E, v);
        p == null || p.addOutputWire(x), i.wires.push(x);
      });
    }).catch((n) => {
      console.error(n);
    }));
  }
};
o(N, "CHIPS", {
  and: new I(null, "AND", "blue", !0, 2, 1).setLogic((i) => i[0].value === 1 && i[1].value === 1 ? [C.HIGH] : [C.LOW]),
  not: new I(null, "NOT", "red", !0, 1, 1).setLogic((i) => [C.invert(i[0])])
});
let R = N;
function ci({ app: P }) {
  const i = q(P), [t] = _(new oi("Chip", "#000", 2, 1)), s = Q(null);
  return ii(() => {
    if (!(s.current == null && t.canvas != null))
      return t.init(s.current), () => {
        t.cleanup();
      };
  }, [s, t]), /* @__PURE__ */ D(G, { children: [
    /* @__PURE__ */ D(K, { children: [
      /* @__PURE__ */ D(j, { label: "Circuit", showOnHover: !1, children: [
        /* @__PURE__ */ w(k, { label: "New", onTrigger: () => {
          t.reset();
        } }),
        /* @__PURE__ */ w(k, { label: "Save", onTrigger: () => {
          i != null && R.saveCircuit(t, i);
        } }),
        /* @__PURE__ */ w(k, { label: "Load", onTrigger: () => {
          i != null && R.loadCircuit(t, i);
        } })
      ] }),
      /* @__PURE__ */ D(j, { label: "Add", showOnHover: !1, children: [
        /* @__PURE__ */ w(k, { label: "AND gate", onTrigger: () => {
          t.inputHandler.startChipPlacement(R.CHIPS.and);
        } }),
        /* @__PURE__ */ w(k, { label: "NOT gate", onTrigger: () => {
          t.inputHandler.startChipPlacement(R.CHIPS.not);
        } })
      ] }),
      /* @__PURE__ */ w(j, { label: "Help", showOnHover: !1, children: /* @__PURE__ */ w(k, { label: "Digital Electronics Glossary", onTrigger: () => {
        X("http://www.pmcgibbon.net/teachcte/electron/degloss1.htm");
      } }) })
    ] }),
    /* @__PURE__ */ w("div", { className: J.CircuitView, children: /* @__PURE__ */ w("canvas", { ref: s, className: J.Canvas }) })
  ] });
}
const ri = "_LogicSim_k1eu4_1", ai = {
  LogicSim: ri
};
function li({ app: P }) {
  return /* @__PURE__ */ w("div", { className: ai.LogicSim, children: /* @__PURE__ */ w(ci, { app: P }) });
}
const hi = new Y("Logic Sim", "logic-sim", li).setIconUrl("https://os.prozilla.dev/assets/apps/icons/logic-sim.svg").setPinnedByDefault(!1).setCategory("Education");
hi.setMetadata({ name: "@prozilla-os/logic-sim", version: "1.1.17", author: "Prozilla" });
export {
  hi as logicSim
};
//# sourceMappingURL=main.js.map
