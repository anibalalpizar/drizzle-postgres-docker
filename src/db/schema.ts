import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
})

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  userId: integer().notNull(),
})

export type User = typeof usersTable.$inferInsert
export const usersRelations = relations(usersTable, ({ many }) => ({
  post: many(postsTable),
}))

export type Post = typeof postsTable.$inferInsert
export const postsRelations = relations(postsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
}))
