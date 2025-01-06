import { style } from "@vanilla-extract/css";

import scale from "@/util/scale";

export const main = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginInline: "auto",
  maxWidth: 768,
  minHeight: 0,
  paddingBlock: scale.fluid.xxxs,
  paddingInline: 5,
});

export const pageTitle = style({
  fontSize: scale.fluid.lg,
  paddingBlock: scale.fluid.md,
  textAlign: "center",
});
