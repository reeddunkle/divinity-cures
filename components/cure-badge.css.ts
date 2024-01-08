import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";
import { hsl } from "@/util/styles";

export const badgeLink = style({
  backgroundColor: theme.color.violet2[500],
  borderRadius: 7,
  boxShadow: `1px 1px 5px 0px ${hsl(0, 4, 30)}`,
  color: theme.color.yellow[100],
  fontWeight: 600,
  padding: scale.fluid.half.min.xxxs,
  textAlign: "center",
  textTransform: "capitalize",

  ":hover": {
    backgroundColor: theme.color.violet2[400],
  },

  ":active": {
    backgroundColor: theme.color.violet2[600],
    boxShadow: "none",
  },
});

export const highlightedLink = style({
  backgroundColor: theme.color.secondary,
  color: theme.color.secondary,
});
