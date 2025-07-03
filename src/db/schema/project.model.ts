import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import genId from "../utils/generate-id";
import { relations } from "drizzle-orm";
import { messageTable } from "./message.model";


export const projectTable = pgTable("project", {
  id: text("id").primaryKey().$defaultFn(genId),
  name: text("name").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const projectRelations = relations(projectTable, ({ many }) => ({
  messages: many(messageTable, {
    relationName: "messages"
  }),
}));
