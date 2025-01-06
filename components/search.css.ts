import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const VERTICAL_SPACING = scale.static.xxxs;
const RESULT_PADDING = scale.fluid.xxs;

export const searchWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: VERTICAL_SPACING,
  flexGrow: 1,
  minHeight: 0,
});

export const input = style({
  backgroundColor: theme.color.foreground,
  border: "none",
  borderRadius: 3,
  fontFamily: "inherit",
  fontSize: scale.fluid.half.max.sm,
  padding: scale.fluid.half.max.sm,
  width: "100%",
});

export const inputLabel = style({
  display: "block",
  fontFamily: "inherit",
  fontSize: scale.fluid.half.max.sm,
});

const boxShadowBlurRadius = "max(0px, min(6vw - 1.5rem, 1.5rem))" as const;
const boxShadowSpreadRadius =
  "max(0px, min(0.25vw - 0.25rem, 0.25rem))" as const;

export const searchResults = style({
  border: `2px solid ${theme.color.violet2[100]}`,
  borderRadius: 3,
  boxShadow: `0px 0px ${boxShadowBlurRadius} ${boxShadowSpreadRadius} ${theme.color.gray[300]}`,
  flexGrow: 1,
  overflowY: "auto",
  scrollbarGutter: "stable",
});

export const resultWrapper = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
});

export const hr = style({
  borderBottom: "1px solid white",
  width: calc.subtract("100%", calc.multiply(RESULT_PADDING, 2)),
});

export const resultCard = style({
  padding: RESULT_PADDING,
});

export const searchSummary = style({
  flexShrink: 0,
  textAlign: "center",
});

export const form = style({
  flexShrink: 0,
});

export const legend = style({
  flexShrink: 0,
});
