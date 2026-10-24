import { describe, expect, it } from "vitest";

import {
  decodeSearchParams,
  parseSearch,
  stringifySearch,
  syncFormQuery,
  toSearchParams,
} from "@/url-state/search-params.ts";

describe("decodeSearchParams", () => {
  it("decodes a search query", () => {
    expect(decodeSearchParams({ search: "first aid" })).toEqual({ search: "first aid" });
  });

  it("trims and collapses whitespace while preserving casing", () => {
    expect(decodeSearchParams({ search: "  First   Aid " })).toEqual({ search: "First Aid" });
  });

  it("omits missing, empty, and whitespace-only queries", () => {
    expect(decodeSearchParams({})).toEqual({});
    expect(decodeSearchParams({ search: "" })).toEqual({});
    expect(decodeSearchParams({ search: "   " })).toEqual({});
  });

  it("ignores values that are not strings", () => {
    expect(decodeSearchParams({ search: 42 })).toEqual({});
    expect(decodeSearchParams(null)).toEqual({});
  });

  it("drops unknown parameters", () => {
    expect(decodeSearchParams({ search: "burn", utm_source: "x" })).toEqual({ search: "burn" });
  });
});

describe("toSearchParams", () => {
  it("omits the parameter for an empty query", () => {
    expect(toSearchParams(" ")).toEqual({});
    expect(toSearchParams(" burn ")).toEqual({ search: "burn" });
  });
});

describe("search serialization", () => {
  it("parses every value as a string", () => {
    expect(parseSearch("?search=first+aid")).toEqual({ search: "first aid" });
    expect(parseSearch("?search=123")).toEqual({ search: "123" });
    expect(parseSearch("?search=true")).toEqual({ search: "true" });
  });

  it("writes plain, readable query strings", () => {
    expect(stringifySearch({ search: "first aid" })).toBe("?search=first+aid");
    expect(stringifySearch({ search: "123" })).toBe("?search=123");
    expect(stringifySearch({})).toBe("");
  });

  it("round-trips queries", () => {
    const search = { search: `Burning & "Poisoned"` };

    expect(parseSearch(stringifySearch(search))).toEqual(search);
  });
});

describe("syncFormQuery", () => {
  it("keeps the form value when it already represents the URL query", () => {
    expect(syncFormQuery("first ", "first")).toBe("first ");
  });

  it("adopts the URL query when it differs", () => {
    expect(syncFormQuery("first", "burning")).toBe("burning");
    expect(syncFormQuery("first", "")).toBe("");
  });
});
