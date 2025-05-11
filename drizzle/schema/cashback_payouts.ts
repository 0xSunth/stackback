import { numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { cashbackRequests } from '@/drizzle/schema';

export const cashbackPayouts = pgTable('cashback_payouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  cashbackRequestId: uuid('cashback_request_id')
    .references(() => cashbackRequests.id, { onDelete: 'cascade' })
    .notNull(),
  amountBTC: numeric('amount_btc', { precision: 16, scale: 8 }).notNull(),
  payoutDate: timestamp('payout_date').defaultNow(),
  txId: varchar({ length: 255 }).notNull().unique(),
});
