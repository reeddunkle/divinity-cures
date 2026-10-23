import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { catalog } from "virtual:bundled-catalog";

import { css } from "../../styled-system/css";
import { button } from "../../styled-system/recipes";
import { Page } from "../components/page.tsx";
import { SkillCard } from "../components/skill-card.tsx";
import { prepareCureSkills, searchCures } from "../search/search.ts";
import { pageHead } from "../site.ts";
import { latestQuery, navigateToQuery } from "../url-state/search-navigation.ts";
import { decodeSearchParams, queryOf, syncFormQuery } from "../url-state/search-params.ts";

const cureSkills = prepareCureSkills(catalog.skills, catalog.statusEffects);

const resultSummary = (count: number, query: string) => {
  if (query === "") {
    return `All ${count} cure skills`;
  }

  if (count === 0) {
    return `No skills match “${query}”.`;
  }

  return `${count} ${count === 1 ? "skill matches" : "skills match"} “${query}”`;
};

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
    <Page fillHeight title="Find a cure">
      <form
        className={css({ display: "grid", flexShrink: "0", gap: "2" })}
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
        role="search"
      >
        <form.Field name="query">
          {(field) => (
            <>
              <label className={css({ fontWeight: "semibold" })} htmlFor={field.name}>
                Find cures for
              </label>
              <div className={css({ display: "flex", flexWrap: "wrap", gap: "2" })}>
                <input
                  autoComplete="off"
                  className={css({
                    backgroundColor: "surface.sunken",
                    borderColor: "border.default",
                    borderRadius: "control",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    flexBasis: "60",
                    flexGrow: "1",
                    fontSize: "lg",
                    minHeight: "11",
                    minWidth: "0",
                    paddingInline: "3",
                    _placeholder: { color: "text.muted" },
                  })}
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
                <button
                  className={button({ tone: "quiet" })}
                  disabled={query === ""}
                  onClick={clear}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </form.Field>
      </form>
      <div
        className={css({
          alignItems: "baseline",
          color: "text.muted",
          columnGap: "4",
          display: "flex",
          flexShrink: "0",
          flexWrap: "wrap",
          fontSize: "sm",
          justifyContent: "space-between",
          rowGap: "1",
        })}
      >
        <p aria-live="polite" role="status">
          {resultSummary(results.length, query)}
        </p>
        <p>
          <span aria-hidden="true">*</span> Grants immunity
        </p>
      </div>
      {results.length > 0 && (
        <ol
          aria-label="Cure skills"
          className={css({
            backgroundColor: "surface.sunken",
            borderColor: "border.strong",
            borderRadius: "card",
            borderStyle: "solid",
            borderWidth: "2px",
            boxShadow: "results",
            listStyleType: "none",
            position: "relative",
            md: {
              flexGrow: "1",
              minHeight: "0",
              overflowY: "auto",
              scrollbarGutter: "stable",
            },
          })}
          key={query}
        >
          {results.map((result) => (
            <li
              className={css({
                "& + &": {
                  borderTopColor: "border.default",
                  borderTopStyle: "solid",
                  borderTopWidth: "1px",
                },
              })}
              key={result.skill.id}
            >
              <SkillCard result={result} />
            </li>
          ))}
        </ol>
      )}
    </Page>
  );
}

export const Route = createFileRoute("/")({
  component: HomeRoute,
  head: () => pageHead({ path: "/" }),
  validateSearch: decodeSearchParams,
});
