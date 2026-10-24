import { css } from "../../styled-system/css";
import { visuallyHidden } from "../../styled-system/patterns";
import type { Skill } from "../catalog/catalog.ts";
import { cooldownGlyph, cooldownLabel } from "../skill-details/skill-details.ts";

export function CooldownDial(props: { readonly cooldown: Skill["cooldown"] }) {
  const label = cooldownLabel(props.cooldown);

  return (
    <span className={css({ display: "inline-flex" })}>
      <svg
        aria-hidden="true"
        className={css({ height: "icon.cooldown", width: "icon.cooldown" })}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 48 48"
      >
        <path className={css({ stroke: "text.default" })} d="M24 42A18 18 0 1 1 42 24" />
        <path
          className={css({ stroke: "text.muted" })}
          d="M42 24A18 18 0 0 1 24 42"
          strokeDasharray="2 4"
        />
        <path className={css({ stroke: "text.default" })} d="M37 19.5L42 25L47 19.5" />
        <text
          className={css({ fill: "text.default", fontFamily: "mono", fontSize: "cooldown" })}
          dominantBaseline="central"
          textAnchor="middle"
          x="24"
          y="24"
        >
          {cooldownGlyph(props.cooldown)}
        </text>
      </svg>
      <span className={visuallyHidden()}>{label}</span>
    </span>
  );
}
