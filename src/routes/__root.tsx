import { createRootRoute, HeadContent, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { css } from "../../styled-system/css";
import { NotFound, RouteError } from "../components/route-fallbacks.tsx";
import { SiteFooter } from "../components/site-footer.tsx";
import { SiteHeader } from "../components/site-header.tsx";
import { pageHead } from "../site.ts";

function useFocusMainOnPageChange() {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (state) => state.resolvedLocation?.pathname });
  const href = useRouterState({ select: (state) => state.resolvedLocation?.href });
  const previousPathname = useRef(pathname);
  const previousHref = useRef(href);

  useEffect(() => {
    if (previousHref.current === href) {
      return;
    }

    const isFirstLoad = previousHref.current === undefined;
    const isNewPage = previousPathname.current !== pathname;
    const isFocusLost = document.activeElement === null || document.activeElement === document.body;
    previousPathname.current = pathname;
    previousHref.current = href;

    if (!isFirstLoad && (isNewPage || isFocusLost)) {
      mainRef.current?.focus();
    }
  }, [href, pathname]);

  return mainRef;
}

function RootLayout() {
  const mainRef = useFocusMainOnPageChange();

  return (
    <>
      <HeadContent />
      <div
        className={css({
          display: "grid",
          gridTemplateRows: "auto minmax(0, 1fr) auto",
          height: { md: "dvh" },
          minHeight: "dvh",
        })}
      >
        <a
          className={css({
            backgroundColor: "surface.sunken",
            borderRadius: "control",
            insetInlineStart: "4",
            paddingBlock: "2",
            paddingInline: "4",
            position: "absolute",
            top: "2",
            transform: "translateY(-200%)",
            zIndex: "skipLink",
            _focus: { transform: "none" },
          })}
          href="#main"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main
          className={css({
            marginInline: "auto",
            maxWidth: "content",
            outlineStyle: "none",
            overflowY: { md: "auto" },
            paddingBlock: "8",
            paddingInline: "page",
            width: "full",
          })}
          id="main"
          ref={mainRef}
          tabIndex={-1}
        >
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RouteError,
  head: ({ matches }) =>
    matches.some((match) => match._notFound === true) ? pageHead({ title: "Page not found" }) : {},
  notFoundComponent: NotFound,
});
