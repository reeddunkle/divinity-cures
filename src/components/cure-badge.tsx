import { Link } from "@tanstack/react-router";

import { visuallyHidden } from "../../styled-system/patterns";
import { cureBadge } from "../../styled-system/recipes";
import type { MatchedCure } from "../search/search.ts";

export function CureBadge(props: { readonly cure: MatchedCure }) {
  const { grantsImmunity, isMatch, status } = props.cure;

  return (
    <Link
      className={cureBadge({ effect: grantsImmunity ? "immunity" : "removes", matched: isMatch })}
      search={{ search: status }}
      to="/"
    >
      {status}
      {grantsImmunity ? (
        <>
          <span aria-hidden="true">*</span>
          <span className={visuallyHidden()}>(grants immunity)</span>
        </>
      ) : null}
    </Link>
  );
}
