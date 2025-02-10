import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from 'src/user/user.schema';

export const urls = pgTable('urls', {
  id: uuid('id').primaryKey(),
  longUrl: text('longUrl').notNull(),
  shortUrl: text('shortUrl').notNull(),
  userId: uuid('user_id').references(() => users.id),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const urlsRelations = relations(urls, ({ one }) => ({
  user: one(users, {
    fields: [urls.userId],
    references: [users.id],
  }),
}));
