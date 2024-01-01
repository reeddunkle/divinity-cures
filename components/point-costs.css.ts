import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";

export const point = style({
  borderRadius: "50%",
  boxShadow: `0 0 15px .01px ${theme.color.foregroundDark}`,
});

export const pointCosts = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});
