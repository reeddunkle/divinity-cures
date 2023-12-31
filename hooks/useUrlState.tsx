"use client";

import { useSearchParams } from "next/navigation";
import type { z } from "zod";

export function useUrlState<T extends z.ZodTypeAny>(schema: T) {
  const searchParams = useSearchParams();
  // const schemaKeys = Object.keys(schema);

  const entities = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: value,
      };
    },
    {},
  );

  const parsedUrlState = schema.safeParse(entities);

  if (!parsedUrlState.success) {
    throw parsedUrlState.error;
  }

  const state = parsedUrlState.data as z.infer<typeof schema>;

  return state; // eslint-disable-line @typescript-eslint/no-unsafe-return
}
