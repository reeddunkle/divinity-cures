import { style } from "@vanilla-extract/css";

import scale from "@/util/scale";

export const main = style({
  marginInline: "auto",
  maxWidth: 768,
  paddingBlock: scale.fluid.xxxs,
  paddingInline: 5,
});

export const h1 = style({
  fontSize: scale.fluid.lg,
  paddingBlock: scale.fluid.md,
  textAlign: "center",
  textWrap: "pretty",
});
