import Link from "next/link";

import type { SiteConfig } from "@/config/site";
import { siteConfig } from "@/config/site";

import * as styles from "./footer.css.ts";

export type Nav = SiteConfig["mainNav"]["0"];

export function Footer() {
  return (
    <footer>
      {siteConfig.mainNav.map((nav: Nav) => {
        return (
          <Link className={styles.footerLink} href={nav.href} key={nav.href}>
            {nav.title}
          </Link>
        );
      })}
      {siteConfig.external.map((nav: Nav) => {
        return (
          <Link className={styles.footerLink} href={nav.href} key={nav.href}>
            {nav.title}
          </Link>
        );
      })}
    </footer>
  );
}
