import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer, createServerModuleRunner } from "vite";

import type * as EntryServer from "../src/entry-server.tsx";

process.env["NODE_ENV"] = "production";

const outDir = "dist";
const emptyRoot = `<div id="root"></div>`;

const vite = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { hmr: false, middlewareMode: true },
});

const runner = createServerModuleRunner(vite.environments.ssr);

try {
  const { prerenderedPages, renderPage, renderRobots, renderSitemap } =
    await runner.import<typeof EntryServer>("/src/entry-server.tsx");
  const template = await readFile(join(outDir, "index.html"), "utf8");

  if (!template.includes(emptyRoot) || !template.includes("</head>")) {
    throw new Error(`${outDir}/index.html has no empty root element or closing head tag`);
  }

  for (const page of prerenderedPages) {
    const { body, head, key } = await renderPage(page.url);
    const html = template
      .replace("</head>", `${head}</head>`)
      .replace(emptyRoot, `<div id="root" data-prerendered="${key}">${body}</div>`);
    const file = join(outDir, page.file);

    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  }

  await writeFile(join(outDir, "sitemap.xml"), renderSitemap());
  await writeFile(join(outDir, "robots.txt"), renderRobots());
} finally {
  await runner.close();
  await vite.close();
}
