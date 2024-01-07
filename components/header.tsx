import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import type { ClassName } from "@/types/react.ts";

import * as styles from "./header.css.ts";

export function Header(props: ClassName & { title: string; href: string }) {
  return (
    <header className={clsx(styles.header, props.className)}>
      <Image
        alt="Divinity Cures site logo"
        className={styles.headerImage}
        height={50}
        src="/images/d-icon.png"
        width={50}
      />
      <h1 className={styles.title}>
        <Link href={props.href} prefetch={false}>
          {props.title}
        </Link>
      </h1>
    </header>
  );
}
