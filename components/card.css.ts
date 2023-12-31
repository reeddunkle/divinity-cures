import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const IMAGE_SIZE_PX = 64;

export const card = style({
  display: "grid",
  gap: scale.fluid.xxs,
  gridTemplateColumns: `${scale.fluid.xxxl} 5fr 2fr`,
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
  // paddingInline: scale.fluid.xxxs,
});

export const skillImage = style({
  aspectRatio: "1/1",
  height: "auto",
  width: "80%",
});

export const listTitle = style({
  fontWeight: 500,
});

export const list = style({
  marginLeft: scale.fluid.md,
});

export const cureLink = style({
  color: theme.color.link,

  textDecoration: "underline",
  textTransform: "capitalize",

  ":hover": {
    color: theme.color.tertiary,
    textDecoration: "underline",
  },
});

export const activeCureLink = style({
  color: theme.color.secondary,
  fontWeight: 500,
  textDecoration: "none",
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

export const title = style({
  color: theme.color.primary,
  fontSize: scale.fluid.md,
  fontWeight: 450,
  textTransform: "uppercase",
});
