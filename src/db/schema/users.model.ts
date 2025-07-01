import { integer, pgTable, text } from "drizzle-orm/pg-core";
import genId from "../utils/generate-id";
export const usersTable = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(genId),
  name: text().notNull(),
  age: integer().notNull(),
  email: text().notNull().unique(),
});
