import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

// const autoFitWidthMin = "6rem";
const listFontSize = scale.fluidThirdHalfSteps[7];

export const listGrid = style({
  display: "grid",
  gap: scale.fluid.half.min.xxxs,
});

export const listTitle = style({
  // backgroundColor: "blue",
  fontSize: listFontSize,
  fontWeight: 500,
});

export const list = style({
  display: "flex",
  flexWrap: "wrap",
  gap: scale.fluid.half.min.xxxs,
});

export const green = style({
  color: theme.color.primary,
});
