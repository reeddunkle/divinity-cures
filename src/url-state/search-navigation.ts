import type { RegisteredRouter } from "@tanstack/react-router";
import * as O from "effect/Option";

import { type ScrollScope, scrollNavigationOptions } from "../scroll/scroll-policy.ts";
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

const navigateToQuery = (
  router: RegisteredRouter,
  query: string,
  intent: SearchIntent,
  scope: ScrollScope,
): Promise<void> =>
  O.match(planSearchNavigation(currentEntry(router), query, intent), {
    onNone: () => Promise.resolve(),
    onSome: (navigation) =>
      router.navigate({
        ...scrollNavigationOptions(router, scope),
        replace: navigation.replace,
        search: navigation.search,
        state: { searchDraft: navigation.isDraft },
        to: "/",
      }),
  });

export const searchFromInput = (router: RegisteredRouter, query: string, intent: SearchIntent) =>
  navigateToQuery(router, query, intent, "results");

export const followSearchLink = (router: RegisteredRouter, query: string) =>
  navigateToQuery(router, query, "commit", "page");
