"use client";

import { clsx } from "clsx";
import React from "react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import { theme } from "@/styles/theme.css";

import * as styles from "./search-input.css";

function CrossIcon(props: {
  background?: string;
  className?: string;
  foreground?: string;
  pathClass?: string;
}) {
  return (
    <svg
      className={props.className}
      width="50px"
      height="50px"
      viewBox="0 0 24 24"
    >
      <path
        className={props.pathClass}
        d="M16 8L8 16M8.00001 8L16 16"
        stroke={props.foreground}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type FormValues = {
  searchText: string;
};

type SearchInputProps = UseControllerProps<FormValues> & {
  className: string;
  canClear?: boolean;
  id: string;
  onClear?: () => void;
  placeholder: string;
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { field } = useController(props);

    return (
      <div className={styles.inputWrapper}>
        <input
          {...field}
          className={clsx(styles.input, props.className)}
          placeholder={props.placeholder}
          ref={ref}
          id={props.id}
        />
        <button
          className={styles.clearButton}
          disabled={!props.canClear}
          onClick={() => {
            props.onClear?.();
          }}
          type="button"
        >
          <CrossIcon
            className={styles.crossIcon}
            foreground={theme.color.foreground}
          />
        </button>
        {/* <button
          className={styles.clearButton}
          onClick={() => {
            props.onClear?.();
          }}
          type="button"
        >
          <CrossIcon className={styles.crossIcon} />
        </button> */}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
