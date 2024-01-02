"use client";

import { clsx } from "clsx";
import React from "react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import * as styles from "./search-input.css";

type FormValues = {
  searchText: string;
};

type SearchInputProps = UseControllerProps<FormValues> & {
  className: string;
  id: string;
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
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
