import Link from "next/link";

import * as styles from "./header.css.ts";

export function Header(props: { title: string; href: string }) {
  return (
    <header>
      <h1 className={styles.title}>
        <Link href={props.href} prefetch={false}>
          {props.title}
        </Link>
      </h1>
    </header>
  );
}
