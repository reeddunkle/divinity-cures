import { clsx } from "clsx";
import Link from "next/link";

import type { ClassName } from "@/types/react.ts";

import * as styles from "./cure-badge.css.ts";

export function CureBadge(
  props: ClassName & {
    cure: string;
    href: string;
    isHighlighted?: (text: string) => boolean;
  },
) {
  const isHighlighted = props.isHighlighted?.(props.cure);

  return (
    <Link
      className={clsx(styles.badgeLink, props.className, {
        [styles.highlightedLink]: isHighlighted,
      })}
      href={props.href}
      prefetch={false}
    >
      {props.cure}
    </Link>
  );
}
