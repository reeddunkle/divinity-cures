import "server-only";
import "@/styles/theme.css.ts";
import "@/styles/globals.css.ts";

import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer.tsx";
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

function Header(props: { title: string; href: string }) {
  return (
    <header>
      <h1 className={styles.pageTitle}>
        <Link href="/" prefetch={false}>
          Divinity Original Sin: 2
        </Link>
      </h1>
    </header>
  );
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header title="Divinity Original Sin: 2" href="/" />
        <div className={styles.wrapper}>{props.children}</div>
        <Footer />
      </body>
    </html>
  );
}
