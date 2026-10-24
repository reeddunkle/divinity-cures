import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";

import { renderApp } from "@/tests/common/render-app.tsx";

const tooltipText = () => document.querySelector(".tooltip__popup")?.textContent ?? null;

const renderFirstAid = async () => {
  const { screen } = await renderApp("/?search=first+aid");
  const schoolLink = screen.getByRole("link", { name: "Search Huntsman skills" });

  return { schoolLink, screen };
};

describe("school requirement tooltip", () => {
  it("shows the requirement on hover", async () => {
    const { schoolLink } = await renderFirstAid();

    await userEvent.hover(schoolLink);

    await expect.poll(tooltipText, { timeout: 2000 }).toBe("Huntsman 1");
  });

  it("shows the requirement on keyboard focus and dismisses on Escape", async () => {
    const { schoolLink, screen } = await renderFirstAid();

    await userEvent.click(screen.getByRole("searchbox"));
    for (let tabs = 0; tabs < 20 && document.activeElement !== schoolLink.element(); tabs++) {
      await userEvent.tab();
    }

    await expect.element(schoolLink).toHaveFocus();
    await expect.poll(tooltipText).toBe("Huntsman 1");

    await userEvent.keyboard("{Escape}");

    await expect.poll(tooltipText).toBeNull();
  });
});
