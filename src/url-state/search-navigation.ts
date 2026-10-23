import type { RegisteredRouter } from "@tanstack/react-router";
import * as O from "effect/Option";

import { decodeSearchParams, queryOf, type SearchParams, toSearchParams } from "./search-params.ts";

declare module "@tanstack/react-router" {
  interface HistoryState {
    readonly searchDraft?: boolean;
  }
}

export type SearchIntent = "commit" | "edit";

export type SearchEntry = {
  readonly isDraft: boolean;
  readonly search: SearchParams;
};

export type SearchNavigation = SearchEntry & {
  readonly replace: boolean;
};

export const planSearchNavigation = (
  current: SearchEntry,
  query: string,
  intent: SearchIntent,
): O.Option<SearchNavigation> => {
  const search = toSearchParams(query);
  const isDraft = intent === "edit";
  const isSameSearch = queryOf(search) === queryOf(current.search);

  if (isSameSearch && (isDraft || !current.isDraft)) {
    return O.none();
  }

  return O.some({
    isDraft,
    replace: current.isDraft,
    search,
  });
};

const currentEntry = (router: RegisteredRouter): SearchEntry => ({
  isDraft: router.latestLocation.state.searchDraft === true,
  search: decodeSearchParams(router.latestLocation.search),
});

export const latestQuery = (router: RegisteredRouter) => queryOf(currentEntry(router).search);

export const navigateToQuery = (
  router: RegisteredRouter,
  query: string,
  intent: SearchIntent,
  options: { readonly resetScroll?: boolean } = {},
): Promise<void> =>
  O.match(planSearchNavigation(currentEntry(router), query, intent), {
    onNone: () => Promise.resolve(),
    onSome: (navigation) =>
      router.navigate({
        replace: navigation.replace,
        resetScroll: options.resetScroll ?? false,
        search: navigation.search,
        state: { searchDraft: navigation.isDraft },
        to: "/",
      }),
  });
