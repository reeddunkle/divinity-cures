import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";
import { hsl, px } from "@/util/styles";

export const SPELL_IMAGE_SIZE_PX = 64;

/* Card */
export const wrapper = style({
  display: "flex",
  gap: scale.fluid.xxs,
  justifyContent: "space-between",
  width: "100%",
});

export const body = style({
  flexGrow: 1,
});

export const gutter = style({
  flexShrink: 0,
});

export const mainGrid = style({
  display: "grid",
  gap: scale.fluid.xxs,
  // gridTemplateColumns: "1fr 4fr",
  gridTemplateColumns: `minmax(${scale.minorThirds[15]}, 1fr) 5fr`,
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
  gap: scale.static.xs,
  justifyContent: "flex-start",
});

export const skillImage = style({
  aspectRatio: "1/1",
  height: "auto",
  width: "80%",
});

export const title = style({
  color: hsl(121, 53, 75),
  fontSize: scale.fluidThirdHalfSteps[10],
  fontWeight: 450,
  lineHeight: 1,
  textTransform: "uppercase",

  paddingBlock: scale.static.xxxs,
  paddingInline: scale.fluid.xxxs,
});

export const description = style({
  backgroundColor: theme.color.gray[400],
  border: `1px solid ${theme.color.gray[200]}`,
  color: theme.color.foreground,

  ":hover": {
    backgroundColor: theme.color.gray[500],
    border: `1px solid ${theme.color.gray[300]}`,
  },

  selectors: {
    "&[open]": {
      backgroundColor: theme.color.violet[1000],
      borderBottom: "1px solid #aaa",
    },
  },
});

export const clock = style({});
