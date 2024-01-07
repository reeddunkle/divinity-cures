import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const main = style({
  marginInline: "auto",
  maxWidth: 768,
  paddingBlock: scale.fluid.xxxs,
  paddingInline: 5,
});

export const title = style({
  fontSize: scale.fluid.lg,
  paddingBlock: scale.fluid.md,
  textAlign: "center",
  textWrap: "pretty",
});

export const siteLink = style({
  color: theme.color.link,
  textDecoration: "underline",
  textTransform: "capitalize",

  ":hover": {
    color: theme.color.tertiary,
    textDecoration: "underline",
  },
});
