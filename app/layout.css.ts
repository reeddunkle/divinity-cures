import { style } from "@vanilla-extract/css";

export const body = style({
  display: "flex",
  flexDirection: "column",
  height: "100svh",
});

export const header = style({
  flexShrink: 0,
});

export const footer = style({
  flexShrink: 0,
});
