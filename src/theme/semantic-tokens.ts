import { defineSemanticTokens, defineTokens } from "@pandacss/dev";

const typeStep = (step: number) => ({
  value: `calc(var(--type-base) * pow(var(--type-ratio), ${step}))`,
});

export const fontSizes = defineTokens.fontSizes({
  xs: typeStep(-2),
  sm: typeStep(-1),
  md: typeStep(0),
  lg: typeStep(1),
  xl: typeStep(2),
  "2xl": typeStep(3),
  "3xl": typeStep(4),
});

export const tokens = defineTokens({
  colors: {
    plum: {
      700: { value: "#5a1873" },
      800: { value: "#43105a" },
      900: { value: "#350944" },
      950: { value: "#22042d" },
    },
  },
  sizes: {
    content: { value: "48rem" },
  },
});

export const semanticTokens = defineSemanticTokens({
  colors: {
    canvas: { value: "{colors.plum.900}" },
    surface: {
      raised: { value: "{colors.plum.800}" },
      sunken: { value: "{colors.plum.950}" },
      hover: { value: "{colors.plum.700}" },
      tint: { value: "rgb(255 255 255 / 0.05)" },
      tintHover: { value: "rgb(255 255 255 / 0.1)" },
      inset: { value: "rgb(0 0 0 / 0.3)" },
    },
    text: {
      default: { value: "{colors.violet.100}" },
      muted: { value: "{colors.violet.300}" },
      onAccent: { value: "{colors.plum.950}" },
      skillName: { value: "{colors.green.300}" },
    },
    border: {
      subtle: { value: "{colors.violet.900}" },
      default: { value: "{colors.violet.700}" },
      strong: { value: "{colors.violet.400}" },
      tint: { value: "rgb(255 255 255 / 0.15)" },
      tintHover: { value: "rgb(255 255 255 / 0.25)" },
    },
    link: {
      default: { value: "{colors.violet.200}" },
      hover: { value: "{colors.cyan.300}" },
    },
    focusRing: { value: "{colors.cyan.300}" },
    match: {
      background: { value: "{colors.yellow.300}" },
      backgroundHover: { value: "{colors.yellow.200}" },
      border: { value: "{colors.yellow.100}" },
      foreground: { value: "{colors.plum.950}" },
    },
    cure: {
      removes: {
        background: { value: "{colors.violet.600}" },
        backgroundHover: { value: "{colors.violet.500}" },
        border: { value: "{colors.violet.400}" },
        borderHover: { value: "{colors.violet.200}" },
        foreground: { value: "{colors.white}" },
      },
      immunity: {
        background: { value: "{colors.teal.700}" },
        backgroundHover: { value: "{colors.teal.600}" },
        border: { value: "{colors.teal.400}" },
        borderHover: { value: "{colors.teal.200}" },
        foreground: { value: "{colors.white}" },
      },
    },
  },
  shadows: {
    results: { value: "0 0 1.5rem 0.125rem rgb(139 92 246 / 0.35)" },
  },
  radii: {
    card: { value: "{radii.lg}" },
    control: { value: "{radii.md}" },
    pill: { value: "{radii.full}" },
  },
  fontSizes: {
    cooldown: { value: "1rem" },
  },
  sizes: {
    icon: {
      logo: { value: "{sizes.10}" },
      skill: { value: "{sizes.14}" },
      school: { value: "{sizes.6}" },
      schoolGutter: { value: "{sizes.8}" },
      cooldown: { value: "{sizes.8}" },
      point: { value: "{sizes.5}" },
      control: { value: "{sizes.5}" },
    },
  },
  spacing: {
    page: { value: { base: "{spacing.4}", md: "{spacing.6}" } },
  },
});
