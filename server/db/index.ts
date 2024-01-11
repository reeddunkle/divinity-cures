import Database from "better-sqlite3";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

const sqliteDb = new Database("sqlite.db");

sqliteDb.pragma("journal_mode = WAL");

export const db: BetterSQLite3Database = drizzle(sqliteDb, { schema });
