import { globalStyle } from "@vanilla-extract/css";

import { theme } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body", {
  fontFamily: theme.font.sansSerif,
  fontSize: 16,
});

globalStyle("body", {
  background: theme.color.background,
  color: theme.color.foreground,
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("img, picture, svg", {
  display: "block",
  maxWidth: "100%",
});
