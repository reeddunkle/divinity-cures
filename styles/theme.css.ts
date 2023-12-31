import { createGlobalTheme } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

// https://paletton.com/#uid=14n0u0ktPiAlqqgpXmxBddWN28G

const twViolet = {
  50: "#f5f3ff",
  100: "#ede9fe",
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

export const theme = createGlobalTheme(":root", {
  color: {
    background: twViolet[1100],
    foreground: twViolet[100],
    foregroundDark: twViolet[600],
    link: twViolet[300],
    primary: "hsl(121 95% 65%)", // rgb(81, 251, 84)
    secondary: "#ff5252",
    tertiary: "rgb(0, 255, 255)",
    violet: twViolet,
    yellow: "#fff0ad",

    hover: {
      grey: "#504950",
      violet: twViolet[900],
    },
  },
  font: {
    sansSerif: "system-ui, 'Segoe UI', sans-serif",
  },
});
