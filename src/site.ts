import { uiImages } from "./assets.ts";

export const site = {
  description: "Find cures in Divinity: Original Sin 2",
  game: "Divinity: Original Sin 2",
  links: {
    issues: "https://github.com/reeddunkle/divinity-cures/issues",
    source: "https://github.com/reeddunkle/divinity-cures",
  },
  name: "Divinity Cures",
  origin: "https://divinitycures.com",
} as const;

export const pageTitle = (title?: string) =>
  title === undefined ? site.name : `${title} - ${site.name}`;

export const absoluteUrl = (path: string) => new URL(path, site.origin).href;

export const pageHead = (page: { readonly path?: string; readonly title?: string }) => {
  const title = pageTitle(page.title);
  const url = page.path === undefined ? undefined : absoluteUrl(page.path);

  return {
    links: url === undefined ? [] : [{ href: url, rel: "canonical" }],
    meta: [
      { title },
      { content: site.description, name: "description" },
      { content: "website", property: "og:type" },
      { content: site.name, property: "og:site_name" },
      { content: title, property: "og:title" },
      { content: site.description, property: "og:description" },
      ...(url === undefined ? [] : [{ content: url, property: "og:url" }]),
      { content: absoluteUrl(uiImages.shareImage), property: "og:image" },
      { content: `${site.name} logo`, property: "og:image:alt" },
      { content: "summary", name: "twitter:card" },
    ],
  };
};
