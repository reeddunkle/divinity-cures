import { visuallyHidden } from "styled-system/patterns";
import { cureBadge } from "styled-system/recipes";

import type { MatchedCure } from "@/search/search.ts";

import { SearchLink } from "./search-link.tsx";

export function CureBadge(props: { readonly cure: MatchedCure }) {
  const { grantsImmunity, isMatch, status } = props.cure;

  return (
    <SearchLink
      className={cureBadge({ effect: grantsImmunity ? "immunity" : "removes", matched: isMatch })}
      query={status}
    >
      {status}
      {grantsImmunity ? (
        <>
          <span aria-hidden="true">*</span>
          <span className={visuallyHidden()}>(grants immunity)</span>
        </>
      ) : null}
    </SearchLink>
  );
}
