"use client";

import { clsx } from "clsx";

import * as styles from "./collapsible-section.ts";

type CollapsibleSection = {
  className?: string;
  title: number;
  text: string;
};

export function CollapsibleSection(props: CollapsibleSection) {
  return (
    <details className={clsx(styles.details, props.className)}>
      <summary className={styles.summary}>{props.title}</summary>
      <div className={styles.rest}>{props.text}</div>
    </details>
  );
}
