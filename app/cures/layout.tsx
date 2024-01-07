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

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>{children}</div>
        <footer className={styles.footer}>
          <Link className={styles.footerLink} href="/cures">
            Cures
          </Link>
          <Link className={styles.footerLink} href="/about">
            About
          </Link>
          <Link className={styles.footerLink} href="/about">
            GitHub
          </Link>
        </footer>
      </body>
    </html>
  );
}
