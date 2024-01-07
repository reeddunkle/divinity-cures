import { createGlobalTheme } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

import { hsl } from "@/util/styles";

// https://paletton.com/#uid=14n0u0ktPiAlqqgpXmxBddWN28G

const twViolet = {
  50: "#f5f3ff",
  100: "#ede9fe", // rgb(237, 233, 254)
  200: "#ddd6fe",
  300: "#c4b5fd",
  400: "#a78bfa",
  500: "#8b5cf6",
  600: "#7c3aed",
  700: "#6d28d9",
  800: "#5b21b6",
  900: "#4c1d95",
  950: "#2e1065",
  1100: "#1f064c",
  1200: "#12022F",
};

const gray = {
  100: "#cacacc",
  200: "#c0bdc9",
  300: "#a2a1a6",
  400: "#7b7a80",
  500: "#6c6b6e",
};

const violet2 = {
  100: hsl(291, 77, 80),
  200: hsl(288, 77, 61),
  400: hsl(288, 77, 48),
  600: hsl(287, 77, 30),
  800: hsl(285, 77, 15),
};

const yellow = {
  100: "#e3e2de",
  200: "#f5edc9",
  400: "#fff0ad",
  600: "#fce788",
  800: "#d9c050",
  900: "#a18a25",
};

const violetTheme = {
  background: "#350944",
};

export const theme = createGlobalTheme(":root", {
  color: {
    // background: twViolet[1100],
    background: violetTheme.background,
    foreground: twViolet[100],
    foregroundDark: twViolet[600],
    link: twViolet[300],
    primary: "hsl(121 95% 65%)", // rgb(81, 251, 84)
    secondary: "#ff5252",
    tertiary: "rgb(0, 255, 255)",

    gray,
    violet: twViolet,
    violet2,
    yellow,

    hover: {
      grey: "#504950",
      violet: twViolet[900],
    },
  },
  font: {
    mono: "monospace",
    sansSerif: "system-ui, 'Segoe UI', sans-serif",
  },
});
