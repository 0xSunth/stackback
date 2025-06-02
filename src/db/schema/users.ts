import { relations } from 'drizzle-orm';
import { index, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { cashbackRequests } from '@/schema/cashback_requests';
import { timestamps } from '@/schema/column_helper';

export const users = pgTable(
  'users',
  {
    id: serial().primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    passwordHash: varchar({ length: 255 }).notNull(),
    btcAddress: varchar({ length: 35 }),
    ...timestamps,
  },
  (table) => [index('user_btc_address_idx').on(table.btcAddress)],
);

export const usersRelations = relations(users, ({ many }) => ({
  cashbackRequests: many(cashbackRequests),
}));
