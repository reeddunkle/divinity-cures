import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";
import { hsl } from "@/util/styles";

export const badgeLink = style({
  backgroundColor: theme.color.violet[1200],
  border: "1px solid transparent", // Hack: Occupy space
  borderRadius: "3px 3px 3px 3px",
  boxShadow: "0px 2px 7px 0px rgba(255, 255, 255, 0.3)",
  color: theme.color.yellow[100],
  fontWeight: 600,
  lineHeight: 1,
  padding: scale.fluid.half.min.xxs,
  textAlign: "center",
  textTransform: "capitalize",
  transition: "all ease 0.2s",

  ":hover": {
    backgroundColor: theme.color.violet[1100],
    border: "1px solid hsl(285 40% 40%)",
    boxShadow: "0px 0px 10px 2px rgba(255, 255, 255, 0.25)",
    // translate: "0 -2px",
  },

  ":active": {
    backgroundColor: theme.color.violet[1000],
    boxShadow: `inset 0px 0px 5px 1px ${hsl(0, 4, 30)}`,
  },
});

export const highlightedLink = style({
  border: `1px solid ${theme.color.primary}`,
  color: theme.color.primary,

  ":hover": {
    border: `1px solid ${theme.color.primary}`,
    color: theme.color.primary,
  },
});
