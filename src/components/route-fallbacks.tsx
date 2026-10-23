import { type ErrorComponentProps, Link, useRouter } from "@tanstack/react-router";

import { css } from "../../styled-system/css";
import { button, textLink } from "../../styled-system/recipes";
import { Page } from "./page.tsx";

export function NotFound() {
  return (
    <Page title="Page not found">
      <p>
        There is nothing at this address.{" "}
        <Link className={textLink()} to="/">
          Browse every cure
        </Link>{" "}
        instead.
      </p>
    </Page>
  );
}

export function RouteError(props: ErrorComponentProps) {
  const router = useRouter();

  return (
    <Page title="Something went wrong">
      <p>This page failed to load. Try again, or return to the cure list.</p>
      <div className={css({ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "4" })}>
        <button
          className={button()}
          onClick={() => {
            props.reset();
            void router.invalidate();
          }}
          type="button"
        >
          Try again
        </button>
        <Link className={textLink()} to="/">
          Go to cures
        </Link>
      </div>
    </Page>
  );
}
