import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const footer = style({
  borderTop: "1px solid white",
  display: "flex",
  gap: scale.fluid.md,
  justifyContent: "center",
  // marginTop: "0.5rem",
  padding: "0.5rem",
});

export const footerLink = style({
  color: theme.color.yellow[200],
  textDecoration: "underline",
  textTransform: "capitalize",

  ":hover": {
    color: theme.color.tertiary,
    textDecoration: "underline",
  },
});
