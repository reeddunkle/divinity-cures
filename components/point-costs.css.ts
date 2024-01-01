import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const point = style({
  borderRadius: "50%",
  boxShadow: `0 0 15px .01px ${theme.color.foregroundDark}`,
  height: scale.fluid.half.max.md,
  width: scale.fluid.half.max.md,
});

export const pointCosts = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});
