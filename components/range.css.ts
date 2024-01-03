import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const outerWrapper = style({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

export const innerWrapper = style({
  alignItems: "center",
  display: "inline-flex",
  // justifyContent: "space-evenly",
  gap: 2,

  // width: "70%",
});

export const arrowPath = style({
  stroke: "#ffffff",
});

export const arrow = style({
  // position: "absolute",
  height: "auto",
  width: scale.fluid.half.min.md,
});

export const arrowLeft = style({
  // position: "absolute",
});

export const arrowRight = style({
  // position: "absolute",
});

export const range = style({
  fontFamily: theme.font.mono,
  fontSize: scale.fluid.half.max.sm,
  lineHeight: 1,
});
