import Link from "next/link";

import type { Nav, SiteConfig } from "@/config/site";
import { siteConfig } from "@/config/site";

import * as styles from "./footer.css.ts";

export function Footer2() {
  return (
    <footer>
      {siteConfig.mainNav.map((nav: Nav) => {
        return (
          <Link className={styles.footerLink} href={nav.href} key={nav.href}>
            {nav.title}
          </Link>
        );
      })}
      {Object.entries(siteConfig.external).map((nav: Nav) => {
        return (
          <Link className={styles.footerLink} href={nav.href} key={nav.href}>
            {nav.title}
          </Link>
        );
      })}
    </footer>
  );
}
