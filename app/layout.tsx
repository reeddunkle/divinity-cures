import "server-only";
import "@/styles/theme.css.ts";
import "@/styles/globals.css.ts";

import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";

import * as styles from "./layout.css.ts";

/* eslint-disable sort-keys */
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
  },
};
/* eslint-enable sort-keys */

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} href="/">
        Cures
      </Link>
      <Link className={styles.footerLink} href="/about">
        About
      </Link>
      <Link
        className={styles.footerLink}
        href={siteConfig.links.github}
        rel="noreferrer"
        target="_blank"
      >
        GitHub
      </Link>
    </footer>
  );
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>{props.children}</div>
        <Footer />
      </body>
    </html>
  );
}
