import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { createAppRouter } from "./router.ts";

import "./styles.css";

const renderApp = async (initialEntry: string) => {
  const history = createMemoryHistory({ initialEntries: [initialEntry] });
  const router = createAppRouter({ history, scrollRestoration: false });

  await router.load();

  const screen = await render(<RouterProvider router={router} />);

  return { router, screen };
};

const canonicalHref = () =>
  document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null;

const isScrollable = (element: Element) =>
  getComputedStyle(element).overflowY === "auto" && element.scrollHeight > element.clientHeight;

const pageScrolls = () => {
  const root = document.scrollingElement ?? document.documentElement;

  return root.scrollHeight > root.clientHeight;
};

describe("about route", () => {
  it("sets its title and canonical link", async () => {
    const { screen } = await renderApp("/about");

    await expect.element(screen.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
    await expect.poll(() => document.title).toBe("About - Divinity Cures");
    await expect.poll(canonicalHref).toBe("https://divinitycures.com/about");
  });

  it("links to a prefilled search", async () => {
    const { router, screen } = await renderApp("/about");

    await screen.getByRole("link", { name: "and more" }).click();

    expect(router.state.location.href).toBe("/?search=first+aid");
    await expect
      .element(screen.getByRole("searchbox", { name: "Find cures for" }))
      .toHaveValue("first aid");
  });
});

describe("not-found route", () => {
  it("shows the not-found page without a canonical link", async () => {
    const { screen } = await renderApp("/missing");

    await expect
      .element(screen.getByRole("heading", { level: 1, name: "Page not found" }))
      .toBeVisible();
    await expect.poll(() => document.title).toBe("Page not found - Divinity Cures");
    expect(canonicalHref()).toBeNull();
  });
});

describe("focus management", () => {
  it("focuses the main landmark after navigating to another page", async () => {
    const { screen } = await renderApp("/");

    await screen.getByRole("link", { name: "About" }).click();

    await expect.element(screen.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
    await expect.element(screen.getByRole("main")).toHaveFocus();
  });

  it("keeps focus in the search box while the query changes", async () => {
    const { screen } = await renderApp("/");
    const input = screen.getByRole("searchbox", { name: "Find cures for" });

    await input.fill("burn");

    await expect.element(input).toHaveFocus();
  });

  it("points the skip link at the focusable main landmark", async () => {
    const { screen } = await renderApp("/");
    const main = screen.getByRole("main").element();

    await expect
      .element(screen.getByRole("link", { name: "Skip to content" }))
      .toHaveAttribute("href", `#${main.id}`);
    expect(main.getAttribute("tabindex")).toBe("-1");
  });
});

describe("results layout", () => {
  afterEach(async () => {
    await page.viewport(414, 896);
  });

  it("scrolls the results list inside a fixed-height page on wide screens", async () => {
    await page.viewport(1280, 720);
    const { screen } = await renderApp("/");
    const list = screen.getByRole("list", { name: "Cure skills" });

    await expect.element(list).toBeVisible();
    await expect.poll(() => isScrollable(list.element())).toBe(true);
    expect(pageScrolls()).toBe(false);
  });

  it("scrolls the whole page on narrow screens", async () => {
    await page.viewport(375, 812);
    const { screen } = await renderApp("/");
    const list = screen.getByRole("list", { name: "Cure skills" });

    await expect.element(list).toBeVisible();
    await expect.poll(pageScrolls).toBe(true);
    expect(isScrollable(list.element())).toBe(false);
  });
});
