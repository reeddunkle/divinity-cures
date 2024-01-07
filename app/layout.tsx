import "server-only";
import "@/styles/theme.css.ts";
import "@/styles/globals.css.ts";

import type { Metadata } from "next";

import { Footer } from "@/components/footer.tsx";
import { Header } from "@/components/header.tsx";
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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header
          className={styles.header}
          title="Divinity Original Sin: 2"
          href="/"
        />
        <section className={styles.section}>{props.children}</section>
        <Footer className={styles.footer} />
      </body>
    </html>
  );
}
