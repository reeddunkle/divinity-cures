import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const SPELL_IMAGE_SIZE_PX = 64;
export const SCHOOL_IMAGE_SIZE_PX = 45;

export const card = style({
  display: "grid",
  gap: scale.fluid.xxs,
  gridTemplateColumns: `[col1-start] ${scale.fluid.xxxl} [col2-start] 1fr [end]`,
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

  "@media": {
    [scale.media.sm]: {
      gridColumn: "col1-start / end",
    },
  },
});

// Col 1
export const skillImage = style({
  aspectRatio: "1/1",
  height: "auto",
  width: "80%",
});

export const point = style({
  height: scale.fluid.half.min.md,
  width: scale.fluid.half.min.md,
});

export const pointCostCol = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

// Col 2
export const title = style({
  color: theme.color.primary,
  fontSize: scale.fluid.md,
  fontWeight: 450,
  lineHeight: 1,
  textTransform: "uppercase",
});

export const titleRow = style({
  display: "flex",
  justifyContent: "space-between",
});

export const schoolIconGroup = style({
  display: "flex",
  gap: scale.fluid.half.min.xxxs,
  justifyContent: "flex-end",

  // "@media": {
  //   [scale.media.sm]: {
  //     flexDirection: "column",
  //   },
  // },
});

export const schoolIcon = style({
  height: scale.fluid.xl,
  width: scale.fluid.xl,
});

const autoFitWidthMin = "7.5rem";

export const listGrid = style({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${autoFitWidthMin}, 1fr));`,
});

export const listGridColumn = style({});

export const requirementsList = style({
  justifySelf: "end",
});

export const listTitle = style({
  fontWeight: 500,
});

export const list = style({
  marginLeft: scale.fluid.md,
});

export const statusEffectItem = style({
  padding: scale.minorSixths[0],
});

export const statusEffectLink = style({
  color: theme.color.link,
  fontSize: scale.fluid.sm,

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

// export const curesWrapper = style({});
