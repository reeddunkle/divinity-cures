import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";
import { hsl, px } from "@/util/styles";

export const SPELL_IMAGE_SIZE_PX = 64;

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
  color: hsl(121, 53, 75),
  fontSize: scale.fluidThirdHalfSteps[10],
  fontWeight: 450,
  lineHeight: 1,
  textTransform: "uppercase",
});
