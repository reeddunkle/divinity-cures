/* eslint-disable sort-keys */

export type SiteConfig = typeof siteConfig;
export type Nav = SiteConfig["mainNav"]["0"];

export const siteConfig = {
  name: "Divinity Cures",
  description: "Find cures in Divinity: Original Sin 2",
  mainNav: [
    {
      href: "/",
      title: "Cures",
    },
    {
      href: "/about",
      title: "About",
    },
  ],
  external: [
    {
      href: "https://github.com/reeddunkle/divinity-cures",
      title: "GitHub",
    },
  ],
};
