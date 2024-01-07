import { style } from "@vanilla-extract/css";

import { theme } from "@/styles/theme.css";
import scale from "@/util/scale";

export const SCHOOL_IMAGE_SIZE_PX = 45;

export const schoolImage = style({
  aspectRatio: "1 / 1",
  height: "auto",
  width: scale.fluid.xl,
});

export const schoolsAndReqs = style({
  display: "flex",
  flexDirection: "column",
  gap: scale.fluid.half.min.xxxs,
});

export const schoolRow = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
});
