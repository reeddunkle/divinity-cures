import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const input = style({});

export const inputWrapper = style({
  position: "relative",
});

const buttonSizePercent = "60%";

export const clearButton = style({
  backgroundColor: "inherit",
  border: "none",
  height: buttonSizePercent,
  padding: "0.5%",
  position: "absolute",
  right: "1rem",
  top: "50%",
  translate: "0 -50%",
  width: "auto",
});

export const crossIcon = style({
  aspectRatio: "1 / 1",
  backgroundColor: theme.color.gray[300],
  borderRadius: "50%",
  filter: "drop-shadow(1px 1px 2px rgb(0 0 0 / 0.4))",
  height: "100%",
  width: "100%",

  selectors: {
    [`${clearButton}:active &`]: {
      backgroundColor: theme.color.gray[400],
      filter: "drop-shadow(0px 0px 2px rgb(0 0 0 / 0.4))",
    },
    [`${clearButton}:disabled &`]: {
      backgroundColor: theme.color.gray[100],
      filter: "none",
    },
  },
});
