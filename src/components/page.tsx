import type { ReactNode } from "react";

import { css } from "../../styled-system/css";

export function Page(props: {
  readonly children: ReactNode;
  readonly fillHeight?: boolean;
  readonly title: string;
}) {
  return (
    <div
      className={css(
        { display: "flex", flexDirection: "column", gap: "6" },
        props.fillHeight === true && { height: { md: "full" } },
      )}
    >
      <h1 className={css({ fontSize: { base: "2xl", md: "3xl" }, fontWeight: "bold" })}>
        {props.title}
      </h1>
      {props.children}
    </div>
  );
}
