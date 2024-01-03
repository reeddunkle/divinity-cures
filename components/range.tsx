"use client";

import { clsx } from "clsx";
import React from "react";

import * as styles from "./range.css";

function LeftArrow(props: { className: string; arrowPathClass?: string }) {
  return (
    <svg
      className={props.className}
      fill="none"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={props.arrowPathClass}
        d="M4 4V20M8 12H20M8 12L12 8M8 12L12 16"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function RightArrow(props: { className: string; arrowPathClass?: string }) {
  return (
    <svg
      className={props.className}
      fill="none"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={props.arrowPathClass}
        d="M20 4V20M4 12H16M16 12L12 8M16 12L12 16"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const rangeText = (range: number) => {
  return `${range}m`;
};

export function Range(props: { className?: string; range: number }) {
  return (
    <div className={clsx(styles.outerWrapper, props.className)}>
      <div className={styles.innerWrapper}>
        <LeftArrow arrowPathClass={styles.arrowPath} className={styles.arrow} />
        <div className={styles.range}>{rangeText(props.range)}</div>
        <RightArrow
          arrowPathClass={styles.arrowPath}
          className={styles.arrow}
        />
      </div>
    </div>
  );
}
