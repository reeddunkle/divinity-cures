import { css } from "styled-system/css";

export function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className={css({ flexShrink: "0", height: "3.5", width: "3.5" })}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.5 20 5.5V11c0 5-3.4 9.1-8 10.5C7.4 20.1 4 16 4 11V5.5Z" />
    </svg>
  );
}
