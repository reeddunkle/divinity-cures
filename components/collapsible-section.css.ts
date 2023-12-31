import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const details = style({
  border: "1px solid #aaa",
  borderRadius: "4px",
  fontSize: scale.fluid.half.min.sm,
  paddingBlock: scale.fluid.xxs,

  selectors: {
    "&[open]": {
      backgroundColor: theme.color.violet[950],
      borderBottom: "1px solid #aaa",
    },
  },
});

export const title = style({
  display: "inline-block",
});

export const summary = style({
  fontWeight: "500",
  paddingLeft: scale.fluid.xxs,

  selectors: {
    [`${details}[open] &`]: {
      borderBottom: "1px solid #aaa",
      borderRadius: "4px",
      paddingBottom: scale.fluid.xxs,
    },
  },
});

export const rest = style({
  paddingBlock: scale.fluid.xxxs,
  paddingInline: scale.fluid.xxxs,
});
