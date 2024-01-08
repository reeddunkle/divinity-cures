import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";
import { hsl } from "@/util/styles";

export const badgeLink = style({
  backgroundColor: theme.color.violet2[500],
  borderRadius: 7,
  boxShadow: `1px 1px 5px 0px ${hsl(0, 4, 30)}`,
  color: theme.color.yellow,
  fontWeight: 600,
  padding: scale.fluid.half.min.xxxs,
  textAlign: "center",
  textTransform: "capitalize",

  ":hover": {
    // color: theme.color.tertiary,
    // textDecoration: "underline",
    backgroundColor: theme.color.violet2[400],
  },

  ":active": {
    backgroundColor: theme.color.violet2[600],
    boxShadow: "none",
  },
});

export const activeLink = style({
  color: theme.color.secondary,
  fontWeight: 500,
  textDecoration: "none",
});
