"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";

import * as styles from "./collapsible-section.css.ts";

type CollapsibleSection = {
  className?: string;
  open?: boolean;
  title: string;
  text: string;
};

export function CollapsibleSection(props: CollapsibleSection) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (props.open && detailsRef.current) {
      detailsRef.current.open = true;
    }
  }, [detailsRef, props.open]);

  return (
    <details className={clsx(styles.details, props.className)} ref={detailsRef}>
      <summary className={styles.summary}>{props.title}</summary>
      <div className={styles.rest}>{props.text}</div>
    </details>
  );
}
