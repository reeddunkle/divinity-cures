"use client";

import { useSearchParams } from "next/navigation";
import type { z } from "zod";

export function useUrlState<TSchema extends z.ZodTypeAny>(schema: TSchema) {
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

  // https://github.com/colinhacks/zod/issues/2153#issuecomment-1457510901
  const parsedUrlState = schema.safeParse(entities) as ReturnType<
    TSchema["safeParse"]
  >;

  if (!parsedUrlState.success) {
    throw parsedUrlState.error;
  }

  const state = parsedUrlState.data as z.infer<TSchema>;

  return state; // eslint-disable-line @typescript-eslint/no-unsafe-return
}
