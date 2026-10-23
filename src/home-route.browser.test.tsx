import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { createAppRouter } from "./router.ts";

const renderApp = async (initialEntry: string) => {
  const history = createMemoryHistory({ initialEntries: [initialEntry] });
  const router = createAppRouter({ history, scrollRestoration: false });

  await router.load();

  const screen = await render(<RouterProvider router={router} />);
  const input = screen.getByRole("searchbox", { name: "Status, skill, or school" });
  const status = screen.getByRole("status");
  const href = () => router.state.location.href;

  return { history, href, input, router, screen, status };
};

describe("home route search form", () => {
  it("adopts the query from a deep link", async () => {
    const { input, status } = await renderApp("/?search=first+aid");

    await expect.element(input).toHaveValue("first aid");
    await expect.element(status).toHaveTextContent("1 skill matches “first aid”");
  });

  it("points the canonical link at the production home page without the query", async () => {
    await renderApp("/?search=first+aid");

    await expect
      .poll(() => document.querySelector('link[rel="canonical"]')?.getAttribute("href"))
      .toBe("https://divinitycures.com/");
  });

  it("updates the URL on every edit using one draft history entry", async () => {
    const { history, href, input, status } = await renderApp("/");

    await userEvent.type(input, "burn");

    expect(href()).toBe("/?search=burn");
    expect(history.length).toBe(2);
    await expect.element(status).toHaveTextContent("12 skills match “burn”");
  });

  it("pushes a new entry for the first edit after submitting", async () => {
    const { history, href, input } = await renderApp("/");

    await userEvent.type(input, "burn");
    await userEvent.keyboard("{Enter}");
    await userEvent.type(input, "{Backspace}");

    expect(href()).toBe("/?search=bur");
    expect(history.length).toBe(3);
  });

  it("keeps insignificant whitespace in the input while normalizing the URL", async () => {
    const { href, input } = await renderApp("/");

    await userEvent.type(input, "first  aid ");

    expect(href()).toBe("/?search=first+aid");
    await expect.element(input).toHaveValue("first  aid ");
  });

  it("adopts the URL query after browser navigation", async () => {
    const { history, input, router } = await renderApp("/?search=burn");

    await userEvent.keyboard("{Tab}");
    await userEvent.type(input, "{Backspace}{Backspace}{Backspace}{Backspace}poison");
    await expect.element(input).toHaveValue("poison");

    history.back();
    await router.load();

    await expect.element(input).toHaveValue("burn");
  });

  it("clears the query, the URL, and returns focus to the input", async () => {
    const { href, input, screen } = await renderApp("/?search=burn");

    await screen.getByRole("button", { name: "Clear" }).click();

    expect(href()).toBe("/");
    await expect.element(input).toHaveValue("");
    await expect.element(input).toHaveFocus();
    await expect.element(screen.getByRole("status")).toHaveTextContent("All 26 cure skills");
  });

  it("searches for a cure when its badge is followed", async () => {
    const { href, input, screen } = await renderApp("/?search=first+aid");

    await screen.getByRole("link", { name: "Disarmed" }).click();

    expect(href()).toBe("/?search=Disarmed");
    await expect.element(input).toHaveValue("Disarmed");
  });

  it("searches for a school when its icons are followed", async () => {
    const { history, href, input, screen } = await renderApp("/?search=first+aid");

    await screen.getByRole("link", { name: "Search Huntsman skills" }).click();

    expect(href()).toBe("/?search=Huntsman");
    expect(history.length).toBe(2);
    await expect.element(input).toHaveValue("Huntsman");
    await expect.element(screen.getByRole("status")).toHaveTextContent("5 skills match “Huntsman”");
  });

  it("replaces a draft entry when a school is followed while typing", async () => {
    const { history, href, input, screen } = await renderApp("/");

    await userEvent.type(input, "fortify");
    await screen.getByRole("link", { name: "Search Geomancer skills" }).click();

    expect(href()).toBe("/?search=Geomancer");
    expect(history.length).toBe(2);
    await expect.element(input).toHaveValue("Geomancer");
  });
});
