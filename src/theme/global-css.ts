import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  ":root": {
    "--fluid-min": "360px",
    "--fluid-max": "1024px",
    "--type-base-min": "1rem",
    "--type-base-max": "1.125rem",
    "--type-ratio-min": "1.2",
    "--type-ratio-max": "1.25",
    "--fluid":
      "clamp(0, tan(atan2(100vw - var(--fluid-min), var(--fluid-max) - var(--fluid-min))), 1)",
    "--type-base":
      "calc(var(--type-base-min) + (var(--type-base-max) - var(--type-base-min)) * var(--fluid))",
    "--type-ratio":
      "calc(var(--type-ratio-min) + (var(--type-ratio-max) - var(--type-ratio-min)) * var(--fluid))",
  },
  html: {
    colorScheme: "dark",
    fontFamily: "sans",
    lineHeight: "normal",
  },
  body: {
    backgroundColor: "canvas",
    color: "text.default",
    fontSize: "md",
  },
  "h1, h2, h3": {
    lineHeight: "tight",
    textWrap: "balance",
  },
  p: {
    textWrap: "pretty",
  },
  mark: {
    backgroundColor: "match.background",
    borderRadius: "sm",
    color: "match.foreground",
  },
  ":focus-visible": {
    outlineColor: "focusRing",
    outlineOffset: "0.5",
    outlineStyle: "solid",
    outlineWidth: "2px",
  },
  "@media (prefers-reduced-motion: no-preference)": {
    html: {
      scrollBehavior: "smooth",
    },
  },
});
