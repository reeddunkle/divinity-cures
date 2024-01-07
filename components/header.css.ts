import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const title = style({
  fontSize: scale.fluidThirds[9],
  lineHeight: 1,
  textAlign: "center",
  textWrap: "pretty",
});

export const header = style({
  alignItems: "center",
  columnGap: "0.5rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: `${scale.fluid.md} 0 ${scale.fluid.sm}`,
});

export const headerImage = style({
  height: "auto",
  marginTop: 4,
  width: scale.fluid.xl,
});
