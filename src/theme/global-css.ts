import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  html: {
    colorScheme: "dark",
    fontFamily: "sans",
    lineHeight: "normal",
  },
  body: {
    backgroundColor: "canvas",
    color: "text.default",
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
