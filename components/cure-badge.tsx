import { clsx } from "clsx";
import Link from "next/link";

import type { ClassName } from "@/types/react.ts";

import * as styles from "./cure-badge.css.ts";

export function CureBadge(
  props: ClassName & {
    cure: string;
    href: string;
    isActive?: (text: string) => boolean;
  },
) {
  return (
    <Link
      className={clsx(styles.badgeLink, props.className, {
        [styles.activeLink]: props.isActive?.(props.cure),
      })}
      href={props.href}
      prefetch={false}
    >
      {props.cure}
    </Link>
  );
}
