import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";

import { createAppRouter, prerenderKey } from "./router.ts";
import { absoluteUrl } from "./site.ts";

export const prerenderedPages = [
  { file: "index.html", inSitemap: true, url: "/" },
  { file: "about/index.html", inSitemap: true, url: "/about" },
  { file: "404.html", inSitemap: false, url: "/__not-found__" },
] as const;

const hoistedHead = /^(?:<(?:link|meta)\b[^>]*>|<title>[^<]*<\/title>)+/u;

export const renderPage = (url: string) => {
  const router = createAppRouter({
    history: createMemoryHistory({ initialEntries: [url] }),
    isServer: true,
    scrollRestoration: false,
  });

  return router.load().then(() => {
    const html = renderToString(<RouterProvider router={router} />);
    const head = html.match(hoistedHead)?.[0] ?? "";

    return {
      body: html.slice(head.length),
      head: head.replaceAll(/<(link|meta|title)\b/gu, "<$1 data-prerendered"),
      key: prerenderKey(router),
    };
  });
};

export const renderRobots = () =>
  ["User-agent: *", "Allow: /", "", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ""].join("\n");

export const renderSitemap = () =>
  [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...prerenderedPages
      .filter((page) => page.inSitemap)
      .map((page) => `  <url><loc>${absoluteUrl(page.url)}</loc></url>`),
    `</urlset>`,
    "",
  ].join("\n");
