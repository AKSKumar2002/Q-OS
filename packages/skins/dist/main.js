var r = Object.defineProperty;
var t = (s, e, p) => e in s ? r(s, e, { enumerable: !0, configurable: !0, writable: !0, value: p }) : s[e] = p;
var a = (s, e, p) => t(s, typeof e != "symbol" ? e + "" : e, p);
class l {
  constructor(e = {}) {
    a(this, "systemIcon");
    a(this, "appIcons");
    a(this, "appNames");
    a(this, "wallpapers");
    a(this, "defaultWallpaper");
    a(this, "fileIcons");
    a(this, "folderIcons");
    a(this, "loadStyleSheet");
    a(this, "defaultTheme");
    this.systemIcon = e.systemIcon ?? "https://os.prozilla.dev/icon.svg", this.appIcons = e.appIcons, this.appNames = e.appNames, this.wallpapers = e.wallpapers ?? [
      "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png",
      "https://os.prozilla.dev/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
      "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-purple-yellow.png",
      "https://os.prozilla.dev/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
      "https://os.prozilla.dev/assets/wallpapers/colorful-abstract-wallpaper-blue-red-green.png",
      "https://os.prozilla.dev/assets/wallpapers/mesh-gradient-wallpaper-red-purple.png",
      "https://os.prozilla.dev/assets/wallpapers/colorful-mesh-gradient-red-green.png",
      "https://os.prozilla.dev/assets/wallpapers/flame-abstract-wallpaper-orange.png",
      "https://os.prozilla.dev/assets/wallpapers/wave-abstract-wallpaper-teal.png",
      "https://os.prozilla.dev/assets/wallpapers/abstract-wallpaper-gradient-blue-dark.png",
      "https://os.prozilla.dev/assets/wallpapers/abstract-wallpaper-gradient-red.png"
    ], this.defaultWallpaper = e.defaultWallpaper ?? "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png", this.fileIcons = e.fileIcons ?? {
      generic: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file.svg",
      text: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-text.svg",
      info: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-info.svg",
      code: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-code.svg",
      external: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-external.svg",
      video: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-video.svg",
      audio: "https://os.prozilla.dev/assets/apps/file-explorer/icons/file-audio.svg"
    }, this.folderIcons = e.folderIcons ?? {
      generic: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder.svg",
      images: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-images.svg",
      text: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-text.svg",
      link: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-link.svg",
      video: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-video.svg",
      audio: "https://os.prozilla.dev/assets/apps/file-explorer/icons/folder-audio.svg"
    }, this.loadStyleSheet = e.loadStyleSheet, this.defaultTheme = e.defaultTheme;
  }
}
const o = new l({
  appIcons: {
    "ball-maze": "/assets/skins/mac/apps/icons/ball-maze.svg",
    browser: "/assets/skins/mac/apps/icons/browser.svg",
    calculator: "/assets/skins/mac/apps/icons/calculator.svg",
    "file-explorer": "/assets/skins/mac/apps/icons/file-explorer.svg",
    "media-viewer": "/assets/skins/mac/apps/icons/media-viewer.svg",
    minesweeper: "/assets/skins/mac/apps/icons/minesweeper.svg",
    settings: "/assets/skins/mac/apps/icons/settings.svg",
    terminal: "/assets/skins/mac/apps/icons/terminal.svg",
    "text-editor": "/assets/skins/mac/apps/icons/text-editor.svg",
    wordle: "/assets/skins/mac/apps/icons/wordle.svg",
    "app-center": "/assets/skins/mac/apps/icons/app-center.svg"
  },
  appNames: {
    browser: "Safari",
    calculator: "Calculator",
    "file-explorer": "Finder",
    "media-viewer": "Photos",
    terminal: "Terminal",
    "text-editor": "Notes",
    "app-center": "Launchpad"
  },
  wallpapers: [
    "/assets/skins/mac/wallpapers/macos-monterey.jpg",
    "/assets/skins/mac/wallpapers/macos-big-sur.jpg",
    "/assets/skins/mac/wallpapers/macos-sequoia.jpg",
    "/assets/skins/mac/wallpapers/macos-sonoma.jpg",
    "/assets/skins/mac/wallpapers/macos-ventura.jpg"
  ],
  defaultWallpaper: "/assets/skins/mac/wallpapers/macos-monterey.jpg",
  fileIcons: {
    generic: "/assets/skins/mac/apps/file-explorer/file.svg"
  },
  folderIcons: {
    generic: "/assets/skins/mac/apps/file-explorer/folder.svg"
  },
  loadStyleSheet: () => {
    import(
      /*'./chunks/macOs-DrzxegJ4.js'*/
      "./assets/macOs.css"
    );
  }
}), c = new l({
  appIcons: {
    browser: "/assets/skins/minimal/apps/icons/browser.svg",
    calculator: "/assets/skins/minimal/apps/icons/calculator.svg",
    "file-explorer": "/assets/skins/minimal/apps/icons/file-explorer.svg",
    "media-viewer": "/assets/skins/minimal/apps/icons/media-viewer.svg",
    settings: "/assets/skins/minimal/apps/icons/settings.svg",
    terminal: "/assets/skins/minimal/apps/icons/terminal.svg",
    "text-editor": "/assets/skins/minimal/apps/icons/text-editor.svg",
    "ball-maze": "/assets/skins/minimal/apps/icons/ball-maze.svg",
    minesweeper: "/assets/skins/minimal/apps/icons/minesweeper.svg",
    wordle: "/assets/skins/minimal/apps/icons/wordle.svg",
    "logic-sim": "/assets/skins/minimal/apps/icons/logic-sim.svg"
  },
  defaultWallpaper: "/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
  fileIcons: {
    generic: "/assets/skins/minimal/apps/file-explorer/file.svg"
  },
  folderIcons: {
    generic: "/assets/skins/minimal/apps/file-explorer/folder.svg"
  },
  loadStyleSheet: () => {
    import(
      /*'./chunks/minimal-Be8X8qbA.js'*/
      "./assets/minimal.css"
    );
  }
}), d = new l({
  appIcons: {
    "ball-maze": "/assets/skins/pixel/apps/icons/ball-maze.png",
    browser: "/assets/skins/pixel/apps/icons/browser.png",
    calculator: "/assets/skins/pixel/apps/icons/calculator.png",
    "file-explorer": "/assets/skins/pixel/apps/icons/file-explorer.png",
    "logic-sim": "/assets/skins/pixel/apps/icons/logic-sim.png",
    "media-viewer": "/assets/skins/pixel/apps/icons/media-viewer.png",
    minesweeper: "/assets/skins/pixel/apps/icons/minesweeper.png",
    settings: "/assets/skins/pixel/apps/icons/settings.png",
    terminal: "/assets/skins/pixel/apps/icons/terminal.png",
    "text-editor": "/assets/skins/pixel/apps/icons/text-editor.png",
    wordle: "/assets/skins/pixel/apps/icons/wordle.png"
  },
  wallpapers: [
    "/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png",
    "/assets/skins/pixel/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
    "/assets/skins/pixel/wallpapers/vibrant-wallpaper-purple-yellow.png",
    "/assets/skins/pixel/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
    "/assets/skins/pixel/wallpapers/colorful-abstract-wallpaper-blue-red-green.png",
    "/assets/skins/pixel/wallpapers/mesh-gradient-wallpaper-red-purple.png",
    "/assets/skins/pixel/wallpapers/colorful-mesh-gradient-red-green.png",
    "/assets/skins/pixel/wallpapers/flame-abstract-wallpaper-orange.png",
    "/assets/skins/pixel/wallpapers/wave-abstract-wallpaper-teal.png"
  ],
  defaultWallpaper: "/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png",
  fileIcons: {
    generic: "/assets/skins/pixel/apps/file-explorer/file.png"
  },
  folderIcons: {
    generic: "/assets/skins/pixel/apps/file-explorer/folder.png"
  },
  loadStyleSheet: () => {
    import(
      /*'./chunks/pixel-C1In9WJY.js'*/
      "./assets/pixel.css"
    );
  }
});
var i = /* @__PURE__ */ ((s) => (s[s.Dark = 0] = "Dark", s[s.Light = 1] = "Light", s[s.Cherry = 2] = "Cherry", s[s.Mango = 3] = "Mango", s[s.Aqua = 4] = "Aqua", s[s.Grape = 5] = "Grape", s))(i || {});
const g = new l({
  systemIcon: "/assets/skins/windows95/system-icon.png",
  appIcons: {
    browser: "/assets/skins/windows95/apps/icons/browser.svg",
    calculator: "/assets/skins/windows95/apps/icons/calculator.svg",
    "file-explorer": "/assets/skins/windows95/apps/icons/file-explorer.svg",
    "media-viewer": "/assets/skins/windows95/apps/icons/media-viewer.svg",
    minesweeper: "/assets/skins/windows95/apps/icons/minesweeper.svg",
    settings: "/assets/skins/windows95/apps/icons/settings.svg",
    terminal: "/assets/skins/windows95/apps/icons/terminal.svg",
    "text-editor": "/assets/skins/windows95/apps/icons/text-editor.svg"
  },
  appNames: {
    browser: "Internet Explorer",
    calculator: "Calculator",
    "file-explorer": "Windows Explorer",
    "media-viewer": "Imaging",
    terminal: "MS-DOS Prompt",
    "text-editor": "Notepad"
  },
  wallpapers: [
    "/assets/skins/windows95/wallpapers/default.png",
    "/assets/skins/windows95/wallpapers/clouds.png"
  ],
  defaultWallpaper: "/assets/skins/windows95/wallpapers/default.png",
  fileIcons: {
    generic: "/assets/skins/windows95/apps/file-explorer/file.svg"
  },
  folderIcons: {
    generic: "/assets/skins/windows95/apps/file-explorer/folder.svg"
  },
  defaultTheme: i.Light,
  loadStyleSheet: () => {
    import(
      /*'./chunks/windows95-DpoqVYG-.js'*/
      "./assets/windows95.css"
    );
  }
});
export {
  l as Skin,
  i as Theme,
  o as macOsSkin,
  c as minimalSkin,
  d as pixelSkin,
  g as windows95Skin
};
//# sourceMappingURL=main.js.map
