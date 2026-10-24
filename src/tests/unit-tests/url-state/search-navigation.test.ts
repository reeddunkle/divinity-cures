import * as O from "effect/Option";
import { describe, expect, it } from "vitest";

import { createTestRouter } from "@/tests/common/test-router.ts";
import {
  followSearchLink,
  latestQuery,
  planSearchNavigation,
  searchFromInput,
} from "@/url-state/search-navigation.ts";

const committed = (search: string) => ({
  isDraft: false,
  search: search === "" ? {} : { search },
});

const draft = (search: string) => ({ ...committed(search), isDraft: true });

describe("planSearchNavigation", () => {
  it("pushes a draft entry for the first edit after a committed search", () => {
    expect(planSearchNavigation(committed("burn"), "poi", "edit")).toEqual(
      O.some({ isDraft: true, replace: false, search: { search: "poi" } }),
    );
  });

  it("replaces the draft entry while editing continues", () => {
    expect(planSearchNavigation(draft("poi"), "pois", "edit")).toEqual(
      O.some({ isDraft: true, replace: true, search: { search: "pois" } }),
    );
  });

  it("skips edits that do not change the query", () => {
    expect(planSearchNavigation(draft("poi"), "poi ", "edit")).toEqual(O.none());
    expect(planSearchNavigation(committed("poi"), " poi", "edit")).toEqual(O.none());
  });

  it("commits a draft in place on submit", () => {
    expect(planSearchNavigation(draft("poi"), "poi", "commit")).toEqual(
      O.some({ isDraft: false, replace: true, search: { search: "poi" } }),
    );
  });

  it("skips submitting an already committed query", () => {
    expect(planSearchNavigation(committed("poi"), "poi", "commit")).toEqual(O.none());
  });

  it("pushes a committed empty search when clearing a committed search", () => {
    expect(planSearchNavigation(committed("poi"), "", "commit")).toEqual(
      O.some({ isDraft: false, replace: false, search: {} }),
    );
  });

  it("replaces a draft when clearing it", () => {
    expect(planSearchNavigation(draft("poi"), "", "commit")).toEqual(
      O.some({ isDraft: false, replace: true, search: {} }),
    );
  });
});

const setup = async (initialEntry: string) => {
  const { history, router } = await createTestRouter(initialEntry, {
    isServer: false,
    origin: "http://localhost",
  });

  const type = async (...queries: readonly string[]) => {
    for (const query of queries) {
      await searchFromInput(router, query, "edit");
    }
  };

  const traverse = async (direction: "back" | "forward") => {
    history[direction]();
    await router.load();
  };

  const snapshot = () => ({
    href: router.state.location.href,
    entries: history.length,
    query: latestQuery(router),
  });

  return { history, router, snapshot, traverse, type };
};

describe("search navigation", () => {
  it("restores the query from a shared URL", async () => {
    const { router, snapshot } = await setup("/?search=first+aid");

    expect(router.state.matches.at(-1)?.search).toEqual({ search: "first aid" });
    expect(snapshot()).toMatchObject({ href: "/?search=first+aid", query: "first aid" });
  });

  it("normalizes an empty search parameter", async () => {
    const { router } = await setup("/?search=++");

    expect(router.state.matches.at(-1)?.search).toEqual({});
  });

  it("keeps one history entry per search while typing", async () => {
    const { snapshot, type } = await setup("/");

    await type("b", "bu", "bur");

    expect(snapshot()).toEqual({ href: "/?search=bur", entries: 2, query: "bur" });
  });

  it("starts a new history entry after submitting", async () => {
    const { router, snapshot, traverse, type } = await setup("/");

    await type("b", "bur");
    await searchFromInput(router, "bur", "commit");
    await type("p", "poi");

    expect(snapshot()).toEqual({ href: "/?search=poi", entries: 3, query: "poi" });

    await traverse("back");

    expect(snapshot()).toEqual({ href: "/?search=bur", entries: 3, query: "bur" });

    await traverse("back");

    expect(snapshot()).toEqual({ href: "/", entries: 3, query: "" });

    await traverse("forward");
    await traverse("forward");

    expect(snapshot()).toEqual({ href: "/?search=poi", entries: 3, query: "poi" });
  });

  it("does not add an entry when submitting twice", async () => {
    const { router, snapshot, type } = await setup("/");

    await type("burn");
    await searchFromInput(router, "burn", "commit");
    await searchFromInput(router, "burn", "commit");

    expect(snapshot()).toEqual({ href: "/?search=burn", entries: 2, query: "burn" });
  });

  it("starts a new entry when editing a restored URL", async () => {
    const { snapshot, traverse, type } = await setup("/?search=burn");

    await type("poi", "poison");

    expect(snapshot()).toEqual({ href: "/?search=poison", entries: 2, query: "poison" });

    await traverse("back");

    expect(snapshot()).toEqual({ href: "/?search=burn", entries: 2, query: "burn" });
  });

  it("clears a committed search into a new entry", async () => {
    const { router, snapshot, traverse } = await setup("/?search=burn");

    await searchFromInput(router, "", "commit");

    expect(snapshot()).toEqual({ href: "/", entries: 2, query: "" });

    await traverse("back");

    expect(snapshot()).toEqual({ href: "/?search=burn", entries: 2, query: "burn" });
  });

  it("does not add an entry when clearing an empty search", async () => {
    const { router, snapshot } = await setup("/");

    await searchFromInput(router, "", "commit");

    expect(snapshot()).toEqual({ href: "/", entries: 1, query: "" });
  });
});

describe("following a search link", () => {
  it("pushes a committed entry after a committed search", async () => {
    const { router, snapshot, traverse } = await setup("/?search=burn");

    await followSearchLink(router, "Poisoned");

    expect(snapshot()).toEqual({ href: "/?search=Poisoned", entries: 2, query: "Poisoned" });

    await traverse("back");

    expect(snapshot()).toEqual({ href: "/?search=burn", entries: 2, query: "burn" });
  });

  it("replaces a draft entry", async () => {
    const { router, snapshot, type } = await setup("/");

    await type("bu", "burn");
    await followSearchLink(router, "Poisoned");

    expect(snapshot()).toEqual({ href: "/?search=Poisoned", entries: 2, query: "Poisoned" });
  });

  it("does not add an entry when following a link to the current search", async () => {
    const { router, snapshot } = await setup("/?search=Poisoned");

    await followSearchLink(router, "Poisoned");

    expect(snapshot()).toEqual({ href: "/?search=Poisoned", entries: 1, query: "Poisoned" });
  });
});
