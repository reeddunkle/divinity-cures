import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const autoFitWidthMin = "6rem";
const listFontSize = scale.fluidThirdHalfSteps[7];

export const listGrid = style({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${autoFitWidthMin}, 1fr));`,
  columnGap: scale.static.xs,
});

export const listTitle = style({
  fontSize: listFontSize,
  fontWeight: 500,
});

export const list = style({
  display: "grid",
  gap: scale.fluid.half.min.xxxs,
});
