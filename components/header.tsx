import Link from "next/link";

import type { ClassName } from "@/types/react.ts";

import * as styles from "./header.css.ts";

export function Header(props: ClassName & { title: string; href: string }) {
  return (
    <header className={props.className}>
      <h1 className={styles.title}>
        <Link href={props.href} prefetch={false}>
          {props.title}
        </Link>
      </h1>
    </header>
  );
}
