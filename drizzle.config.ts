/* eslint-disable sort-keys */

import { type Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
  verbose: true,
} satisfies Config;
