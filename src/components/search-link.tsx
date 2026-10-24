import { Link, useRouter } from "@tanstack/react-router";
import type { ComponentPropsWithRef, MouseEvent } from "react";

import { followSearchLink } from "@/url-state/search-navigation.ts";

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;

export function SearchLink(
  props: Omit<ComponentPropsWithRef<"a">, "href" | "target"> & { readonly query: string },
) {
  const router = useRouter();
  const { onClick, query, ...anchorProps } = props;

  return (
    <Link
      {...anchorProps}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && isPlainClick(event)) {
          event.preventDefault();
          void followSearchLink(router, query);
        }
      }}
      search={{ search: query }}
      to="/"
    />
  );
}
