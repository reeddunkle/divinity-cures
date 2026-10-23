import { defineRecipe, defineSlotRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  base: {
    alignItems: "center",
    borderColor: "border.default",
    borderRadius: "control",
    borderStyle: "solid",
    borderWidth: "1px",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: "0",
    fontWeight: "semibold",
    gap: "2",
    justifyContent: "center",
    minHeight: "11",
    minWidth: "11",
    paddingInline: "4",
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
    _motionSafe: {
      transitionDuration: "fast",
      transitionProperty: "background-color, border-color, color",
    },
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: "violet.300",
        borderColor: "violet.300",
        color: "text.onAccent",
        _enabled: {
          _hover: {
            backgroundColor: "violet.200",
          },
        },
      },
      quiet: {
        backgroundColor: "surface.sunken",
        color: "text.default",
        _enabled: {
          _hover: {
            backgroundColor: "surface.hover",
          },
        },
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const textLink = defineRecipe({
  className: "text-link",
  base: {
    color: "link.default",
    textDecorationLine: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "0.2em",
    _hover: {
      color: "link.hover",
    },
  },
  variants: {
    emphasis: {
      inline: {},
      nav: {
        color: "text.muted",
        fontWeight: "medium",
        textDecorationLine: "none",
        _currentPage: {
          color: "text.default",
          textDecorationLine: "underline",
        },
      },
    },
  },
  defaultVariants: {
    emphasis: "inline",
  },
});

export const cureBadge = defineRecipe({
  className: "cure-badge",
  base: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: "pill",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "inline-flex",
    fontSize: "sm",
    gap: "1",
    lineHeight: "tight",
    paddingBlock: "1",
    paddingInline: "2.5",
    textDecorationLine: "none",
    _hover: {
      borderColor: "border.strong",
      textDecorationLine: "underline",
    },
  },
  variants: {
    effect: {
      removes: {
        backgroundColor: "cure.removes.background",
        color: "cure.removes.foreground",
      },
      immunity: {
        backgroundColor: "cure.immunity.background",
        color: "cure.immunity.foreground",
      },
    },
    matched: {
      false: {},
      true: {},
    },
  },
  compoundVariants: [
    {
      css: {
        backgroundColor: "match.background",
        color: "match.foreground",
        fontWeight: "semibold",
      },
      matched: true,
    },
  ],
  defaultVariants: {
    effect: "removes",
    matched: false,
  },
});

export const card = defineSlotRecipe({
  className: "card",
  slots: ["root", "header", "icon", "title", "section", "sectionTitle"],
  base: {
    root: {
      backgroundColor: "surface.raised",
      borderColor: "border.subtle",
      borderRadius: "card",
      borderStyle: "solid",
      borderWidth: "1px",
      display: "grid",
      gap: "4",
      padding: "4",
    },
    header: {
      alignItems: "center",
      display: "flex",
      gap: "3",
    },
    icon: {
      borderRadius: "control",
      flexShrink: "0",
      height: "icon.skill",
      width: "icon.skill",
    },
    title: {
      fontSize: "xl",
      fontWeight: "bold",
    },
    section: {
      display: "grid",
      gap: "2",
    },
    sectionTitle: {
      color: "text.muted",
      fontSize: "xs",
      fontWeight: "semibold",
      letterSpacing: "wider",
      textTransform: "uppercase",
    },
  },
});
