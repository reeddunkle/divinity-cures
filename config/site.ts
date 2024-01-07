/* eslint-disable sort-keys */

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Divinity Cures",
  description: "Find cures in Divinity: Original Sin 2",
  mainNav: [
    {
      href: "/cures",
      title: "Cures",
    },
    {
      href: "/about",
      title: "About",
    },
  ],
  links: {
    github: "https://github.com/reeddunkle/divinity-cures",
  },
};
