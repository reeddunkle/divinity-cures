"use client";

import { clsx } from "clsx";
import React from "react";

import * as styles from "./input.css";

type Input = React.InputHTMLAttributes<HTMLInputElement>;

type InputProps = Input & {
  className: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <div className={styles.inputWrapper}>
        <input className={clsx(styles.input, className)} ref={ref} {...rest} />
      </div>
    );
  },
);

Input.displayName = "Input";
