import S from "@vitejs/plugin-react-swc";
import F from "vite-plugin-dts";
import U from "vite-plugin-css-injected-by-js";
import { resolve as w, sep as x, posix as j } from "path";
import { ANSI as f } from "@prozilla-os/shared";
import { readFileSync as y } from "fs";
function h(e, t, o) {
  if (o && console.log(""), t == null)
    return console.log(e);
  switch (t) {
    case "start":
      console.log(`${f.fg.yellow}${e}...${f.reset}`);
      break;
    case "file":
      console.log(`- ${f.fg.cyan}${e}${f.reset}`);
      break;
    case "success":
      console.log(`${f.fg.green}✓ ${e}${f.reset}`);
      break;
    case "error":
      console.error(`${f.fg.red}⚠ ${e}${f.reset}`);
      break;
    default:
      console.log(e);
      break;
  }
}
function $(e) {
  return e.replace(/\r\n/g, `
`);
}
function z(e) {
  const { imageUrls: t, appsConfig: o, baseUrl: c } = e, r = /* @__PURE__ */ new Date(), g = r.getFullYear(), p = r.getMonth() + 1, a = r.getDate(), s = p >= 10 ? p.toString() : "0" + p, i = a >= 10 ? a.toString() : "0" + a, m = `${g}-${s}-${i}`, l = t.map(
    (d) => `
		<image:image>
			<image:loc>${c.slice(0, -1) + d}</image:loc>
		</image:image>`
  ), u = o.apps.map(
    ({ id: d }) => `
	<url>
		<loc>${c + d}</loc>
		<lastmod>${m}</lastmod>
	</url>`
  ), n = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xml>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
	<url>
		<loc>${c}</loc>
		<lastmod>${m}</lastmod>
		${l.join("")}
	</url>
	${u.join("")}
</urlset>`;
  return $(n.trim());
}
function C(e) {
  const { baseUrl: t } = e;
  return $(`# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
Sitemap: ${t}sitemap.xml`);
}
function R(e) {
  return e.domain;
}
function D(e, t) {
  const { baseUrl: o } = t, c = new RegExp('(?<=")https?:\\/\\/[a-z0-9-]+(\\.)([a-zA-Z0-9-]+(\\.))*[a-z]{2,3}\\/(?=.*")', "gi");
  e = e.replaceAll(c, o);
  const r = /<!--.*?-->/g;
  e = e.replaceAll(r, "");
  const g = /^\s*$\n/gm;
  return e = e.replaceAll(g, ""), $(e);
}
function I(e, t) {
  e.emitFile({
    type: "asset",
    fileName: "404.html",
    source: t
  });
}
function T(e, t, o) {
  const { appsConfig: c, favicon: r, siteName: g, siteTagLine: p, baseUrl: a } = o;
  for (const s of c.apps) {
    const i = s.id, m = s.name, l = s.description ?? p, u = s.iconUrl ?? r;
    if (i === "index") {
      h("Invalid app ID found: " + i, "error");
      return;
    }
    let n = t;
    const d = new RegExp('(?<=(<title>|<meta property="og:title" content="|<meta name="twitter:title" content="))(([a-zA-Z|-]|\\s)+)(?=(<\\/title>|"\\/?>))', "g");
    n = n.replaceAll(d, `${m} | ${g}`);
    const b = new RegExp('(?<=(<meta name="description" content="|<meta property="og:description" content="|<meta name="twitter:description" content="))(([a-zA-Z-.]|\\s)+)(?=("\\/?>))', "g");
    n = n.replaceAll(b, l);
    const A = new RegExp('(?<=(<link rel="canonical" href="|<meta name="twitter:url" content="|<meta property="og:url" content="))(http(s)?:\\/\\/[a-zA-Z-.]+\\/)(?=("\\/?>))', "g");
    n = n.replaceAll(A, a + i);
    const k = new RegExp('(?<=<link [^>]*rel="(apple-touch-)?icon" [^>]*href=")[^"]+(?="[^>]*>)', "g");
    n = n.replaceAll(k, `${u}?x=${Math.round(Date.now() / 36e5)}`);
    const N = /(<!-- FAQ -->.*?)?<script type="application\/ld\+json">.*?<\/script>/gs;
    n = n.replaceAll(N, ""), e.emitFile({
      type: "asset",
      fileName: `${i}.html`,
      source: n
    });
  }
}
function v(e, t, { appsConfig: o, favicon: c, siteName: r, siteTagLine: g, domain: p, imageUrls: a = [] }) {
  try {
    h("Staging build...", "start", !0);
    const s = `https://${p}/`, i = {
      sitemapXml: "sitemap.xml",
      robotsTxt: "robots.txt",
      indexHtml: "index.html",
      cname: "CNAME"
    }, m = [
      [i.sitemapXml, z],
      [i.robotsTxt, C],
      [i.cname, R]
    ], l = {
      appsConfig: o,
      favicon: c,
      siteName: r,
      siteTagLine: g,
      domain: p,
      baseUrl: s,
      imageUrls: a,
      paths: i
    };
    m.forEach(([n, d]) => {
      e.emitFile({
        type: "asset",
        fileName: n,
        source: d(l)
      });
    });
    const u = t["index.html"];
    if (u && u.type == "asset") {
      const n = D(u.source, l);
      e.emitFile({
        type: "asset",
        fileName: "index.html",
        source: n
      }), I(e, n), T(e, n, l);
    }
    h("Staging complete", "success", !0);
  } catch (s) {
    console.error(s), h("Staging failed", "error"), process.exit(1);
  }
}
function X(e) {
  return {
    name: "vite-plugin-stage-site",
    generateBundle(t, o) {
      v(this, o, e);
    }
  };
}
function M({ entryPath: e }) {
  return {
    name: "vite-plugin-app-metadata",
    apply: "build",
    load(t) {
      if (!t.includes(e)) return null;
      const o = process.cwd(), c = w(o, "package.json");
      let r = null;
      try {
        const l = y(c, "utf-8");
        r = JSON.parse(l);
      } catch (l) {
        this.error(l);
      }
      if (!r)
        return null;
      const { name: g, version: p } = r;
      let { author: a = "Unknown" } = r;
      typeof a == "string" ? a = a.replace(/<[^>]*>|\([^)]*\)/g, "").trim() : a = a.name;
      let s = null;
      try {
        s = y(t, "utf-8");
      } catch (l) {
        this.error(l);
      }
      if (s == null)
        return null;
      const i = /const\s+(\w+)\s*=\s*new\s+App(?:<[\w\s,]+>)?\s*\(([^;]*)\)\s*(\.[\w]+\([^)]*\)\s*)*;/, m = s.match(i);
      if (m) {
        const u = `
${m[1]}.setMetadata({ name: "${g}", version: "${p}", author: "${a}" });
`;
        return s.replace(i, m[0] + u);
      } else
        return this.warn("No App instance found in the entry file."), null;
    }
  };
}
const B = (e, t) => {
  let o = w(e, t);
  return x === "\\" && (o = o.split(x).join(j.sep)), console.log("Using Vite config for app"), console.log("Entry: " + o), {
    plugins: [
      M({
        entryPath: t
      }),
      S(),
      U(),
      F({
        outDir: "dist",
        rollupTypes: !0,
        strictOutput: !0,
        pathsToAliases: !1,
        tsconfigPath: "tsconfig.build.json"
      })
    ],
    build: {
      lib: {
        entry: o,
        formats: ["es"]
      },
      rollupOptions: {
        external: ["react", "react/jsx-runtime", "@prozilla-os/core", "@prozilla-os/shared", "@prozilla-os/skins", /@fortawesome\/*/g],
        output: {
          assetFileNames: "assets/[name][extname]",
          chunkFileNames: "chunks/[name]-[hash].js",
          entryFileNames: "[name].js"
        }
      },
      sourcemap: !0
    }
  };
};
export {
  M as appMetadataPlugin,
  B as appViteConfig,
  h as print,
  X as stageSitePlugin
};
//# sourceMappingURL=main.js.map
