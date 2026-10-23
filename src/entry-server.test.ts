import { describe, expect, it } from "vitest";

import { renderPage, renderRobots, renderSitemap } from "./entry-server.tsx";

const metaContent = (head: string, key: string) =>
  head.match(
    new RegExp(`<meta data-prerendered content="([^"]*)" (?:name|property)="${key}"/>`, "u"),
  )?.[1];

const canonical = (head: string) =>
  head.match(/<link data-prerendered href="([^"]*)" rel="canonical"\/>/u)?.[1];

describe("renderPage", () => {
  it.each([
    ["/", "Divinity Cures", "https://divinitycures.com/", "Find a cure"],
    ["/about", "About - Divinity Cures", "https://divinitycures.com/about", "About"],
  ])("renders %s with its metadata and content", async (url, title, href, heading) => {
    const page = await renderPage(url);

    expect(page.key).toBe(url);
    expect(page.head).toContain(`<title data-prerendered>${title}</title>`);
    expect(metaContent(page.head, "description")).toBe("Find cures in Divinity: Original Sin 2");
    expect(canonical(page.head)).toBe(href);
    expect(metaContent(page.head, "og:title")).toBe(title);
    expect(metaContent(page.head, "og:url")).toBe(href);
    expect(metaContent(page.head, "og:image")).toBe("https://divinitycures.com/apple-icon.png");
    expect(metaContent(page.head, "twitter:card")).toBe("summary");
    expect(page.body).toContain(`>${heading}</h1>`);
    expect(page.body).not.toContain("<title");
    expect(`${page.head}${page.body}`).not.toContain("<script");
  });

  it.each(["/__not-found__", "/about/nope"])("renders %s as the not-found page", async (url) => {
    const page = await renderPage(url);

    expect(page.key).toBe("not-found");
    expect(page.head).toContain("<title data-prerendered>Page not found - Divinity Cures</title>");
    expect(canonical(page.head)).toBeUndefined();
    expect(metaContent(page.head, "og:url")).toBeUndefined();
    expect(page.body).toContain(">Page not found</h1>");
  });

  it("keys a search by its full location so the client renders it afresh", async () => {
    expect((await renderPage("/?search=burn")).key).toBe("/?search=burn");
  });
});

describe("crawler files", () => {
  it("lists only real pages in the sitemap", () => {
    expect(renderSitemap()).toContain("<loc>https://divinitycures.com/</loc>");
    expect(renderSitemap()).toContain("<loc>https://divinitycures.com/about</loc>");
    expect(renderSitemap()).not.toContain("not-found");
  });

  it("points robots.txt at the sitemap", () => {
    expect(renderRobots()).toContain("Sitemap: https://divinitycures.com/sitemap.xml");
  });
});
