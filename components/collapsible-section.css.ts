import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const details = style({
  border: "1px solid #aaa",
  borderRadius: "4px",
  padding: scale.fluid.xxs,

  selectors: {
    "&[open]": {
      borderBottom: "1px solid #aaa",
    },
  },
});

export const summary = style({
  fontWeight: "500",
  // selectors: {
  //   [`${details}[open] &`]: {
  //     borderBottom: "1px solid #aaa",
  //   },
  // },
});

export const rest = style({
  // paddingLeft: scale.fluid.sm,
});
