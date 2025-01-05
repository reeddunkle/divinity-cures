import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

const borderThickness = 2;
const tickLength = 10;

export const wrapper = style({
  aspectRatio: "1 / 1",
  position: "relative",
});

const dashStyle = "dashed";

const circleDark = theme.color.gray[300];
const circleLight = theme.color.foreground;

export const border = style({
  alignItems: "center",
  aspectRatio: "1 / 1",
  borderColor: `${circleLight} ${circleLight} ${circleDark} ${circleLight}`,
  borderRadius: "50%",
  borderStyle: `solid solid ${dashStyle} solid`,
  borderWidth: borderThickness,
  display: "flex",
  height: "100%",
  justifyContent: "center",

  rotate: "-45deg",
});

export const cooldownText = style({
  fontFamily: theme.font.mono,
  fontSize: scale.fluid.half.min.md,
  lineHeight: 1,
  padding: scale.fluid.half.min.xxs,
  textAlign: "center",

  rotate: "45deg",
});

export const arrowHeadRight = style({
  backgroundColor: theme.color.foreground,
  borderRadius: 20,
  height: tickLength,
  position: "absolute",
  right: -1.25 * borderThickness,
  top: `calc(50% - ${tickLength}px + 1px)`,
  width: borderThickness,

  rotate: "-155deg",
});

export const arrowHeadLeft = style({
  backgroundColor: theme.color.foreground,
  borderRadius: 20,
  height: tickLength,
  position: "absolute",
  right: borderThickness + 1,
  top: `calc(50% - ${tickLength}px + 2px)`,
  width: borderThickness,

  rotate: "130deg",
});
