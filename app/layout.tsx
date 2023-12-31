import "server-only";
import "@/styles/theme.css.ts";
import "@/styles/globals.css.ts";

import type { Metadata } from "next";

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

import * as styles from "./_styles/layout.css.ts";

export const metadata: Metadata = {
  description: "Find cures in Divinity: Original Sin 2",
  title: "Divinity Cures",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>{children}</div>
      </body>
    </html>
  );
}
