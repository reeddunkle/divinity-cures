import { pipe } from "effect/Function";
import * as O from "effect/Option";
import * as P from "effect/Predicate";
import * as R from "effect/Record";
import * as Schema from "effect/Schema";
import * as Str from "effect/String";

const SearchParams = Schema.Struct({
  search: Schema.optional(Schema.String),
});

export type SearchParams = typeof SearchParams.Type;

const decodeUnknownSearchParams = Schema.decodeUnknownOption(SearchParams);

export const formatQuery = (query: string) => pipe(query, Str.replace(/\s+/gu, " "), Str.trim);

export const toSearchParams = (query: string): SearchParams =>
  pipe(
    formatQuery(query),
    O.liftPredicate(Str.isNonEmpty),
    O.match({
      onNone: () => ({ search: undefined }),
      onSome: (search) => ({ search }),
    }),
  );

export const decodeSearchParams = (input: unknown): SearchParams =>
  pipe(
    decodeUnknownSearchParams(input),
    O.flatMapNullishOr((params) => params.search),
    O.match({
      onNone: () => toSearchParams(""),
      onSome: toSearchParams,
    }),
  );

export const queryOf = (params: SearchParams) => params.search ?? "";

export const parseSearch = (searchString: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(searchString));

export const stringifySearch = (search: Record<string, unknown>) => {
  const searchString = new URLSearchParams(R.filter(search, P.isString)).toString();

  return Str.isEmpty(searchString) ? "" : `?${searchString}`;
};

export const syncFormQuery = (formQuery: string, urlQuery: string) =>
  formatQuery(formQuery) === urlQuery ? formQuery : urlQuery;
