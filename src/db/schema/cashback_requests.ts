import { relations } from 'drizzle-orm';
import { numeric, pgEnum, pgTable, timestamp, varchar, index, serial } from 'drizzle-orm/pg-core';
import { users } from '@/schema/users';
import { merchants } from '@/schema/merchants';
import { timestamps } from '@/schema/column_helper';

export const statusEnum = pgEnum('status', ['pending', 'approved', 'rejected']);
export const currencyEnum = pgEnum('currency', ['USD', 'EUR', 'GBP', 'JPY']);

export const cashbackRequests = pgTable(
  'cashback_requests',
  {
    id: serial().primaryKey(),
    userId: serial()
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    merchantId: serial()
      .references(() => merchants.id, { onDelete: 'cascade' })
      .notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    currency: currencyEnum().default('USD').notNull(),
    amountBTC: numeric({ precision: 16, scale: 8 }).notNull(),
    receiptUrl: varchar({ length: 255 }).notNull(),
    purchasedAt: timestamp().notNull(),
    status: statusEnum().default('pending'),
    ...timestamps,
  },
  (table) => [
    index('cashback_request_user_idx').on(table.userId),
    index('cashback_request_merchant_idx').on(table.merchantId),
  ],
);

export const cashbackRequestsRelations = relations(cashbackRequests, ({ one }) => ({
  user: one(users, {
    fields: [cashbackRequests.userId],
    references: [users.id],
  }),
  merchant: one(merchants, {
    fields: [cashbackRequests.merchantId],
    references: [merchants.id],
  }),
}));
