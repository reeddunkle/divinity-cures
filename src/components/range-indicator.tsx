import { css } from "../../styled-system/css";
import { visuallyHidden } from "../../styled-system/patterns";
import { rangeLabel } from "../skill-details/skill-details.ts";

const arrow = css({ height: "4", stroke: "text.default", width: "4" });

function Arrow(props: { readonly d: string }) {
  return (
    <svg
      aria-hidden="true"
      className={arrow}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d={props.d} />
    </svg>
  );
}

export function RangeIndicator(props: { readonly range: number }) {
  const label = rangeLabel(props.range);

  return (
    <span
      className={css({ alignItems: "center", display: "inline-flex", gap: "0.5" })}
      title={`Range: ${label}`}
    >
      <Arrow d="M8 12H20M8 12L12 8M8 12L12 16" />
      <span aria-hidden="true" className={css({ fontFamily: "mono", fontSize: "sm" })}>
        {`${props.range}m`}
      </span>
      <Arrow d="M4 12H16M16 12L12 8M16 12L12 16" />
      <span className={visuallyHidden()}>{label}</span>
    </span>
  );
}
