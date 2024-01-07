import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const body = style({
  display: "flex",
  flexDirection: "column",
  height: "100svh",
  scrollSnapType: "y mandatory",
});

export const section = style({
  scrollSnapAlign: "start",
});

export const header = style({});

export const footer = style({});
