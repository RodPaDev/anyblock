import { json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import genId from "../utils/generate-id";
import { Fragment } from "react";

export const messageRoleEnum = pgEnum("message_role", ["user", "assistant"]);
export const messageTypeEnum = pgEnum("message_type", ["result", "error"]);

export const messagesTable = pgTable("messages", {
  id: text("id").primaryKey().$defaultFn(genId),
  content: text("content").notNull(),
  role: messageRoleEnum("role").notNull(),
  type: messageTypeEnum("type").notNull(),
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
    .references(() => messagesTable.id, { onDelete: "cascade" })
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

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  fragment: one(fragmentsTable, {
    fields: [messagesTable.id],
    references: [fragmentsTable.messageId],
  }),
}));
