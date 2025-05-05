import { relations } from 'drizzle-orm';
import { numeric, pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users, merchants } from '@/db/schemas';

export const statusEnum = pgEnum('status', ['pending', 'approved', 'rejected']);

export const cashbackRequests = pgTable('cashback_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  merchantId: uuid('merchant_id')
    .references(() => merchants.id, { onDelete: 'cascade' })
    .notNull(),
  amountBTC: numeric('amount_btc', { precision: 16, scale: 8 }).notNull(),
  status: statusEnum().default('pending'),
  receiptUrl: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const cashbackRequestsRelations = relations(cashbackRequests, ({ one }) => ({
  user: one(users, {
    fields: [cashbackRequests.userId],
    references: [users.id],
  }),
}));
