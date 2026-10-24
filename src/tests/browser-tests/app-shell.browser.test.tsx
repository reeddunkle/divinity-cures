import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { createAppRouter } from "@/router.ts";
import { renderApp } from "@/tests/common/render-app.tsx";

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
      .element(screen.getByRole("searchbox", { name: "Status, skill, or school" }))
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

  it("titles a missing page below a real route as not found", async () => {
    const { screen } = await renderApp("/about/nope");

    await expect
      .element(screen.getByRole("heading", { level: 1, name: "Page not found" }))
      .toBeVisible();
    await expect.poll(() => document.title).toBe("Page not found - Divinity Cures");
  });
});

describe("focus management", () => {
  it("focuses the main landmark after navigating to another page", async () => {
    const { screen } = await renderApp("/");

    await screen.getByRole("link", { name: "About" }).click();

    await expect.element(screen.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
    await expect.element(screen.getByRole("main")).toHaveFocus();
  });

  it("focuses the main landmark after a followed cure badge is replaced", async () => {
    const { screen } = await renderApp("/?search=first+aid");

    await screen.getByRole("link", { name: "Disarmed" }).click();

    await expect
      .element(screen.getByRole("searchbox", { name: "Status, skill, or school" }))
      .toHaveValue("Disarmed");
    await expect.element(screen.getByRole("main")).toHaveFocus();
  });

  it("leaves focus alone on the first load", async () => {
    const router = createAppRouter({
      history: createMemoryHistory({ initialEntries: ["/about"] }),
      scrollRestoration: false,
    });
    const screen = await render(<RouterProvider router={router} />);

    await expect.element(screen.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
    expect(document.activeElement).toBe(document.body);
  });

  it("keeps focus in the search box while the query changes", async () => {
    const { screen } = await renderApp("/");
    const input = screen.getByRole("searchbox", { name: "Status, skill, or school" });

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

  it("defers loading and decoding every card image", async () => {
    const { screen } = await renderApp("/");
    const list = screen.getByRole("list", { name: "Cure skills" });

    await expect.element(list).toBeVisible();
    const images = [...list.element().querySelectorAll("img")];

    expect(images.length).toBeGreaterThan(0);
    expect(
      images.filter((image) => image.loading !== "lazy" || image.decoding !== "async"),
    ).toEqual([]);
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

const resultsList = () => document.getElementById("results");

const nextFrame = () =>
  // @effect-diagnostics-next-line newPromise:off
  new Promise(requestAnimationFrame);

const nextFrames = async () => {
  await nextFrame();
  await nextFrame();
};

const isInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();

  return rect.top >= 0 && rect.bottom <= innerHeight && rect.left >= 0 && rect.right <= innerWidth;
};

const searchLinks = {
  "cure badge": 'a[href*="search="]:not([aria-label])',
  "school icon": 'a[href*="search="][aria-label^="Search "]',
} as const;

const visibleSearchLink = (kind: keyof typeof searchLinks) => {
  const link = [...(resultsList()?.querySelectorAll(searchLinks[kind]) ?? [])]
    .filter(isInViewport)
    .at(-1);

  if (link === undefined) {
    throw new Error(`No visible ${kind}`);
  }

  return link;
};

const followVisibleSearchLink = async (kind: keyof typeof searchLinks) => {
  const previousList = resultsList();

  await userEvent.click(visibleSearchLink(kind));
  await expect.poll(() => resultsList() !== previousList).toBe(true);
  await nextFrames();
};

describe("scroll", () => {
  afterEach(async () => {
    scrollTo({ behavior: "instant", top: 0 });
    await page.viewport(414, 896);
  });

  describe.each(["cure badge", "school icon"] as const)("following a %s", (kind) => {
    it("resets the results list on wide screens without smooth scrolling", async () => {
      await page.viewport(1280, 720);
      const { screen } = await renderApp("/");

      await expect
        .poll(() => isScrollable(screen.getByRole("list", { name: "Cure skills" }).element()))
        .toBe(true);
      resultsList()?.scrollTo({ behavior: "instant", top: 1200 });

      await followVisibleSearchLink(kind);

      expect(resultsList()?.scrollTop).toBe(0);
      expect(scrollY).toBe(0);
      await expect.element(screen.getByRole("main")).toHaveFocus();
    });

    it("resets the page on narrow screens without smooth scrolling", async () => {
      await page.viewport(375, 812);
      const { screen } = await renderApp("/");

      await expect.poll(pageScrolls).toBe(true);
      scrollTo({ behavior: "instant", top: 2000 });

      await followVisibleSearchLink(kind);

      expect(scrollY).toBe(0);
      await nextFrames();
      expect(scrollY).toBe(0);
      await expect.element(screen.getByRole("main")).toHaveFocus();
    });
  });

  it("resets the results list but not the page while typing on narrow screens", async () => {
    await page.viewport(375, 812);
    const { screen } = await renderApp("/");
    const input = screen.getByRole("searchbox", { name: "Status, skill, or school" });

    await expect.poll(pageScrolls).toBe(true);
    scrollTo({ behavior: "instant", top: 40 });

    await userEvent.type(input, "a");
    await nextFrames();

    expect(scrollY).toBe(40);
    await expect.element(input).toHaveFocus();
  });

  it("resets the results list while typing on wide screens", async () => {
    await page.viewport(1280, 720);
    const { screen } = await renderApp("/");
    const input = screen.getByRole("searchbox", { name: "Status, skill, or school" });

    await expect
      .poll(() => isScrollable(screen.getByRole("list", { name: "Cure skills" }).element()))
      .toBe(true);
    resultsList()?.scrollTo({ behavior: "instant", top: 1200 });

    await userEvent.type(input, "a");
    await nextFrames();

    expect(resultsList()?.scrollTop).toBe(0);
    await expect.element(input).toHaveFocus();
  });

  it("resets the results list on submit on wide screens", async () => {
    await page.viewport(1280, 720);
    const { screen } = await renderApp("/");
    const input = screen.getByRole("searchbox", { name: "Status, skill, or school" });

    await userEvent.type(input, "a");
    await expect
      .poll(() => isScrollable(screen.getByRole("list", { name: "Cure skills" }).element()))
      .toBe(true);
    resultsList()?.scrollTo({ behavior: "instant", top: 600 });

    await userEvent.keyboard("{Enter}");
    await nextFrames();

    expect(resultsList()?.scrollTop).toBe(0);
    await expect.element(input).toHaveFocus();
  });

  it("restores the results list position on Back on wide screens", async () => {
    await page.viewport(1280, 720);
    const { router, screen } = await renderApp("/", { scrollRestoration: true });

    await expect
      .poll(() => isScrollable(screen.getByRole("list", { name: "Cure skills" }).element()))
      .toBe(true);
    resultsList()?.scrollTo({ behavior: "instant", top: 1200 });
    await nextFrames();

    await followVisibleSearchLink("cure badge");
    router.history.back();

    await expect.poll(() => router.state.location.href).toBe("/");
    await expect.poll(() => resultsList()?.scrollTop).toBe(1200);
  });

  it("restores the page position on Back on narrow screens", async () => {
    await page.viewport(375, 812);
    const { router } = await renderApp("/", { scrollRestoration: true });

    await expect.poll(pageScrolls).toBe(true);
    scrollTo({ behavior: "instant", top: 2000 });
    await nextFrames();

    await followVisibleSearchLink("cure badge");
    router.history.back();

    await expect.poll(() => router.state.location.href).toBe("/");
    await expect.poll(() => scrollY).toBe(2000);
  });
});
