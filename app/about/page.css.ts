import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const main = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  gap: scale.fluid.md,
  marginInline: "auto",
  maxWidth: 768,
  minHeight: 0,
  paddingBlock: scale.fluid.xxxs,
  paddingInline: scale.fluid.md,
});

export const title = style({
  fontSize: scale.fluid.lg,
  paddingBlock: scale.fluid.md,
  textAlign: "center",
});

export const link = style({
  color: theme.color.link,
  textDecoration: "underline",

  ":hover": {
    color: theme.color.tertiary,
    textDecoration: "underline",
  },
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

export const list = style({
  marginLeft: scale.static.sm,
});

export const listItem = style({
  textWrap: "pretty",
});

export const multiParagraph = style({
  display: "grid",
  gap: scale.fluid.xs,
});
