import { Tooltip } from "@base-ui/react/tooltip";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { css } from "styled-system/css";

import { NotFound, RouteError } from "@/components/route-fallbacks.tsx";
import { SiteFooter } from "@/components/site-footer.tsx";
import { SiteHeader } from "@/components/site-header.tsx";
import { mainId } from "@/focus/focus-policy.ts";
import { pageHead } from "@/site.ts";

function RootLayout() {
  return (
    <Tooltip.Provider>
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
          href={`#${mainId}`}
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
            paddingBlock: { base: "8", md: "4" },
            paddingInline: "page",
            width: "full",
          })}
          id={mainId}
          tabIndex={-1}
        >
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </Tooltip.Provider>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RouteError,
  head: ({ matches }) =>
    matches.some((match) => match._notFound === true) ? pageHead({ title: "Page not found" }) : {},
  notFoundComponent: NotFound,
});
