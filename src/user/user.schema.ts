import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { urls } from 'src/url/url.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').unique().notNull(),
});

export const uersToUrls = relations(users, ({ many }) => ({
  url: many(urls),
}));
