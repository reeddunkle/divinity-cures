import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const autoFitWidthMin = "6rem";
const listFontSize = scale.fluidThirdHalfSteps[7];

export const listGrid = style({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${autoFitWidthMin}, 1fr));`,
  rowGap: scale.static.xs,
});

export const listTitle = style({
  fontSize: listFontSize,
  fontWeight: 500,
});

export const list = style({
  marginLeft: scale.static.sm,
});

export const statusEffectItem = style({
  fontSize: listFontSize,
  padding: scale.minorSixths[0],
});

export const statusEffectLink = style({
  color: theme.color.link,
  textDecoration: "underline",
  textTransform: "capitalize",

  ":hover": {
    color: theme.color.tertiary,
    textDecoration: "underline",
  },
});

export const activeLink = style({
  color: theme.color.secondary,
  fontWeight: 500,
  textDecoration: "none",
});
