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
    <details
      className={clsx(styles.details, props.className)}
      open={props.open}
    >
      <summary className={styles.summary}>
        <h3 className={styles.title}>{props.title}</h3>
      </summary>
      <p className={styles.summaryContents}>{props.text}</p>
    </details>
  );
}
