import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const wrapper = style({});

export const footer = style({
  border: "1px solid white",
  display: "flex",
  gap: scale.fluid.md,
  justifyContent: "flex-start",
});

export const footerLink = style({
  color: theme.color.link,
  textDecoration: "underline",
  textTransform: "capitalize",

  ":hover": {
    color: theme.color.tertiary,
    textDecoration: "underline",
  },
});

export const pageTitle = style({
  fontSize: scale.fluid.lg,
  paddingBlock: scale.fluid.md,
  textAlign: "center",
  textWrap: "pretty",
});
