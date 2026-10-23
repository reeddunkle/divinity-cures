import { createRootRoute, HeadContent, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { css } from "../../styled-system/css";
import { NotFound, RouteError } from "../components/route-fallbacks.tsx";
import { SiteFooter } from "../components/site-footer.tsx";
import { SiteHeader } from "../components/site-header.tsx";
import { pageTitle } from "../site.ts";

function useFocusMainOnPageChange() {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      mainRef.current?.focus();
    }
  }, [pathname]);

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
          gridTemplateRows: "auto 1fr auto",
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
  head: ({ matches }) => ({
    meta: [{ title: pageTitle(matches.length === 1 ? "Page not found" : undefined) }],
  }),
  notFoundComponent: NotFound,
});
