import { clsx } from "clsx";
import Link from "next/link";

import type { SiteConfig } from "@/config/site";
import { siteConfig } from "@/config/site";
import type { ClassName } from "@/types/react.ts";

import * as styles from "./footer.css.ts";

export type Nav = SiteConfig["mainNav"]["0"];

export function Footer(props: ClassName) {
  return (
    <footer className={clsx(styles.footer, props.className)}>
      {[...siteConfig.mainNav, ...siteConfig.external].map((nav: Nav) => {
        return (
          <Link className={styles.footerLink} href={nav.href} key={nav.href}>
            {nav.title}
          </Link>
        );
      })}
    </footer>
  );
}
