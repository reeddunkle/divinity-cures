"use client";

import { clsx } from "clsx";

import * as styles from "./collapsible-section.css.ts";

type CollapsibleSection = {
  className?: string;
  open?: boolean;
  title: string;
  text: string;
};

export function CollapsibleSection(props: CollapsibleSection) {
  return (
    <details className={clsx(styles.details, props.className)} open>
      <summary className={styles.summary}>
        <div className={styles.title}>{props.title}</div>
      </summary>
      <div className={styles.rest}>{props.text}</div>
    </details>
  );
}
