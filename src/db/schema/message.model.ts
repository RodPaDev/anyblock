import { json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import genId from "../utils/generate-id";
import { projectTable } from "./project.model";

export const messageRoleEnum = pgEnum("message_role", ["user", "assistant"]);
export const messageTypeEnum = pgEnum("message_type", ["result", "error"]);

export const messageTable = pgTable("messages", {
  id: text("id").primaryKey().$defaultFn(genId),
  content: text("content").notNull(),
  role: messageRoleEnum("role").notNull(),
  type: messageTypeEnum("type").notNull(),
  projectId: text("project_id")
    .notNull()
    .references(() => projectTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const fragmentsTable = pgTable("fragments", {
  id: text("id").primaryKey().$defaultFn(genId),
  messageId: text("message_id")
    .notNull()
    .references(() => messageTable.id, { onDelete: "cascade" })
    .unique(),
  sandboxUrl: text("sandbox_url").notNull(),
  title: text("title").notNull(),
  files: json("files"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const messagesRelations = relations(messageTable, ({ one }) => ({
  fragment: one(fragmentsTable, {
    fields: [messageTable.id],
    references: [fragmentsTable.messageId],
  }),
  project: one(projectTable, {
    fields: [messageTable.projectId],
    references: [projectTable.id],
  }),
}));
