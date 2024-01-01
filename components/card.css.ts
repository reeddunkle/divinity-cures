import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const SPELL_IMAGE_SIZE_PX = 64;
export const SCHOOL_IMAGE_SIZE_PX = 45;

/* Card */
export const card = style({
  display: "grid",
  gap: scale.fluid.xxs,
  gridTemplateColumns: `${scale.fluid.xxxl} repeat(auto-fit, minmax(1rem, auto))`,
  width: "100%",

  // "@media": {
  //   [scale.media.sm]: {
  //     gridTemplateColumns: "[col1-start] 1fr [col2-start] 4fr [end]",
  //   },
  // },
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

  // "@media": {
  //   [scale.media.sm]: {
  //     gridColumn: "col1-start / end",
  //   },
  // },
});

export const skillImage = style({
  aspectRatio: "1/1",
  height: "auto",
  width: "80%",
});

export const title = style({
  color: theme.color.primary,
  fontSize: scale.fluidThirdHalfSteps[10],
  fontWeight: 450,
  lineHeight: 1,
  textTransform: "uppercase",

  hyphens: "auto",

  // wordBreak: "break-all",
  // overflowWrap: "break-word",
  // textWrap: "balance",
  // wordWrap: "break-word",
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

export const pair = style({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap-reverse",
  fontSize: scale.fluidThirdHalfSteps[7],
  gap: scale.fluid.half.min.xxxs,
  justifyContent: "flex-end",
});

export const numberAndImage = style({
  alignItems: "center",
  display: "flex",
  gap: scale.fluid.half.min.xxxs,
  justifyContent: "flex-end",
});

export const schoolsAndReqs = style({
  display: "flex",
  flexDirection: "column",
  gap: scale.fluid.half.min.xxxs,
});

export const requireNumber = style({
  flexShrink: 0,
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
