import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";
import { hsl, px } from "@/util/styles";

export const SPELL_IMAGE_SIZE_PX = 64;
export const SCHOOL_IMAGE_SIZE_PX = 45;

/* Card */
export const card = style({
  display: "grid",
  gap: scale.fluid.xxs,
  gridTemplateColumns: `${scale.fluid.xxxl} minmax(min(60%, 70%), 2fr) auto`,
  width: "100%",
});

export const col1 = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: scale.static.xxxs,
  justifyContent: "flex-start",
});

export const col2 = style({
  display: "flex",
  flexDirection: "column",
  gap: scale.static.xxxs,
  justifyContent: "flex-start",
});

export const col3 = style({
  display: "flex",
  flexDirection: "column",
  gap: scale.static.xxxs,
  justifyContent: "flex-start",
});

export const skillImage = style({
  aspectRatio: "1/1",
  height: "auto",
  width: "80%",
});

export const title = style({
  color: theme.color.primary,
  color: hsl(121, 53, 75),
  fontSize: scale.fluidThirdHalfSteps[10],
  fontWeight: 450,
  lineHeight: 1,
  textTransform: "uppercase",
});

/* School Icons */
export const schoolIcons = style({
  display: "flex",
  gap: scale.fluid.half.min.xxxs,
  justifyContent: "flex-end",
});

export const schoolImage = style({
  aspectRatio: "1 / 1",
  height: "auto",
  width: scale.fluid.xl,
});

export const schoolsAndReqs = style({
  display: "flex",
  flexDirection: "column",
  gap: scale.fluid.half.min.xxxs,
});

export const schoolRow = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
});

/* Cures List */
const autoFitWidthMin = "6rem";

export const listGrid = style({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${autoFitWidthMin}, 1fr));`,
  rowGap: scale.static.xs,
});

/* Cures List & Requirements */
const listFontSize = scale.fluidThirdHalfSteps[7];

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
