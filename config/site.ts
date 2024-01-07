/* eslint-disable sort-keys */

export type Nav = {
  href: string;
  title: string;
  isExternal?: boolean;
};

const nav = {
  home: {
    href: "/",
    title: "Cures",
  },
  about: {
    href: "/about",
    title: "About",
  },
  github: {
    href: "https://github.com/reeddunkle/divinity-cures",
    title: "GitHub",
    isExternal: true,
  },
  issues: {
    href: "https://github.com/reeddunkle/divinity-cures/issues",
    title: "Issues",
    isExternal: true,
  },
};

type NavKey = keyof typeof nav;

export type SiteConfig = {
  name: string;
  description: string;
  external: Nav[];
  mainNav: Nav[];
  nav: Record<NavKey, Nav>;
};

export const siteConfig: SiteConfig = {
  name: "Divinity Cures",
  description: "Find cures in Divinity: Original Sin 2",
  external: [nav.github, nav.issues],
  mainNav: [nav.home, nav.about],
  nav,
};
