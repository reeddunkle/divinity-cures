import "server-only";
import "@/styles/theme.css.ts";
import "@/styles/globals.css.ts";

import type { Metadata } from "next";
import Link from "next/link";

import * as styles from "./layout.css.ts";

export const metadata: Metadata = {
  description: "Find cures in Divinity: Original Sin 2",
  title: "About | Divinity Cures",
};

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
        </footer>
      </body>
    </html>
  );
}
