import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const summaryPadding = scale.fluid.xxs;

export const details = style({
  border: "1px solid #aaa",
  borderRadius: "4px",
  fontSize: scale.fluid.half.min.sm,

  selectors: {
    "&[open]": {
      backgroundColor: theme.color.violet[1000],
      borderBottom: "1px solid #aaa",
    },
  },
});

export const summary = style({
  fontWeight: "500",
  paddingBottom: calc.add(summaryPadding, "2px"),
  paddingLeft: summaryPadding,
  paddingTop: summaryPadding,

  selectors: {
    [`${details}[open] &`]: {
      borderBottom: "1px solid #aaa",
      borderRadius: "4px",
      paddingBottom: summaryPadding,
    },
  },
});

export const title = style({
  fontSize: scale.fluidThirdHalfSteps[6],
});

export const summaryContents = style({
  padding: summaryPadding,
});
