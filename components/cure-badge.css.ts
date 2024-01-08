import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const badgeColor = "teal";

export const badgeLink = style({
  backgroundColor: badgeColor,
  border: "2px solid gray",
  borderRadius: 7,
  color: theme.color.link,
  fontWeight: 600,
  padding: scale.fluid.half.min.xxxs,
  textAlign: "center",
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
