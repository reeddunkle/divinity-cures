import { clsx } from "clsx";
import Link from "next/link";

import type { Nav } from "@/config/site";
import { siteConfig } from "@/config/site";
import type { ClassName } from "@/types/react.ts";

import * as styles from "./footer.css.ts";

export function Footer(props: ClassName) {
  return (
    <footer className={clsx(styles.footer, props.className)}>
      {[...siteConfig.mainNav, ...siteConfig.external]
        .filter(Boolean)
        .map((nav: Nav) => {
          const externalProps =
            nav.isExternal ?
              {
                rel: "noreferrer",
                target: "_blank",
              }
            : {};

          return (
            <Link
              className={styles.footerLink}
              href={nav.href}
              key={nav.href}
              {...externalProps}
            >
              {nav.title}
            </Link>
          );
        })}
    </footer>
  );
}
