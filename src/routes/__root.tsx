import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { css } from "../../styled-system/css";

function RootLayout() {
  return (
    <div
      className={css({
        backgroundColor: "background",
        color: "foreground",
        minHeight: "dvh",
        padding: "6",
      })}
    >
      <header>
        <nav aria-label="Primary navigation">
          <Link to="/">Divinity Cures</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
