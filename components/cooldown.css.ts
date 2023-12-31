import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const borderThickness = 2;
const tickLength = 10;

export const wrapper = style({
  aspectRatio: "1 / 1",
  padding: tickLength / 2 - borderThickness / 2,
  position: "relative",
});

export const border = style({
  aspectRatio: "1 / 1",
  borderColor: theme.color.foreground,
  borderRadius: "50%",
  borderStyle: "dotted solid dotted dotted",
  borderWidth: borderThickness,
  height: "100%",

  rotate: "-45deg",
});

export const cooldownText = style({
  fontFamily: "monospace",
  fontSize: scale.fluid.half.min.md,
  lineHeight: 1,
  padding: scale.fluid.half.min.xxs,
  textAlign: "center",

  rotate: "45deg",
});

export const tick = style({
  backgroundColor: theme.color.foreground,
  height: 1,
  width: 10,

  position: "absolute",
});

export const tickTop = style({
  backgroundColor: theme.color.foreground,
  height: tickLength,
  width: borderThickness,

  position: "absolute",
  top: 0,

  left: "50%",
  translate: "-50%",
});

export const tickRight = style({
  backgroundColor: theme.color.foreground,
  height: borderThickness,
  width: tickLength,

  position: "absolute",
  right: 0,

  top: "50%",
  translate: "none -50%",
});
