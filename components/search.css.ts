import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const VERTICAL_SPACING = scale.static.xxxs;
const RESULT_PADDING = scale.fluid.xxs;

export const searchWrapper = style({
  display: "grid",
  gap: VERTICAL_SPACING,
});

export const input = style({
  backgroundColor: theme.color.foreground,
  border: "none",
  borderRadius: 3,
  fontFamily: "inherit",
  fontSize: scale.fluid.half.max.sm,
  padding: scale.fluid.xs,
  width: "100%",
});

export const inputLabel = style({
  display: "block",
  fontFamily: "inherit",
  fontSize: scale.fluid.half.max.sm,
});

export const searchResults = style({
  blockSize: "75svh", // Magic Number
  border: "1px solid orange",
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
