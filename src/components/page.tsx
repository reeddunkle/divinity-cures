import type { ReactNode } from "react";

import { css } from "../../styled-system/css";

export function Page(props: { readonly children: ReactNode; readonly title: string }) {
  return (
    <div className={css({ display: "grid", gap: "6" })}>
      <h1 className={css({ fontSize: { base: "2xl", md: "3xl" }, fontWeight: "bold" })}>
        {props.title}
      </h1>
      {props.children}
    </div>
  );
}
