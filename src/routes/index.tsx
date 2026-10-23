import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { catalog } from "../catalog/index.ts";
import { prepareCureSkills, searchCures, type SearchResult } from "../search/search.ts";
import { latestQuery, navigateToQuery } from "../url-state/search-navigation.ts";
import { decodeSearchParams, queryOf, syncFormQuery } from "../url-state/search-params.ts";

const cureSkills = prepareCureSkills(catalog.skills);

function SearchResultItem({ result }: { readonly result: SearchResult }) {
  return (
    <li>
      <h2>{result.isNameMatch ? <mark>{result.skill.name}</mark> : result.skill.name}</h2>
      <p>
        {result.skill.actionPoints} AP, {result.skill.sourcePoints} SP
      </p>
      <ul aria-label={`Cures from ${result.skill.name}`}>
        {result.cures.map((cure) => {
          const label = cure.grantsImmunity ? `${cure.status} (grants immunity)` : cure.status;

          return <li key={cure.status}>{cure.isMatch ? <mark>{label}</mark> : label}</li>;
        })}
      </ul>
    </li>
  );
}

function HomeRoute() {
  const router = useRouter();
  const query = Route.useSearch({ select: queryOf });
  const results = searchCures(cureSkills, query);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: { query },
    onSubmit: ({ value }) => navigateToQuery(router, value.query, "commit"),
  });

  useEffect(() => {
    if (latestQuery(router) === query) {
      form.setFieldValue("query", (value) => syncFormQuery(value, query), {
        dontUpdateMeta: true,
      });
    }
  }, [form, query, router]);

  const clear = () => {
    form.setFieldValue("query", "", { dontUpdateMeta: true });
    void navigateToQuery(router, "", "commit");
    inputRef.current?.focus();
  };

  return (
    <main>
      <h1>Divinity Cures</h1>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.Field name="query">
          {(field) => (
            <>
              <label htmlFor={field.name}>Find cures for</label>
              <input
                autoComplete="off"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  void navigateToQuery(router, event.target.value, "edit");
                }}
                placeholder="Burning, Decaying, First Aid…"
                ref={inputRef}
                type="search"
                value={field.state.value}
              />
            </>
          )}
        </form.Field>
        <button type="submit">Search</button>
        <button disabled={query === ""} onClick={clear} type="button">
          Clear
        </button>
      </form>
      <p aria-live="polite" role="status">
        {results.length === 0
          ? `No cures match “${query}”.`
          : `${results.length} ${results.length === 1 ? "cure" : "cures"}`}
      </p>
      <ol>
        {results.map((result) => (
          <SearchResultItem key={result.skill.id} result={result} />
        ))}
      </ol>
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: HomeRoute,
  validateSearch: decodeSearchParams,
});
