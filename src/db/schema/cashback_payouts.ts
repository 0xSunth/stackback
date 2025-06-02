import { numeric, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { cashbackRequests } from '@/schema/cashback_requests';
import { timestamps } from '@/schema/column_helper';

export const cashbackPayouts = pgTable('cashback_payouts', {
  id: serial().primaryKey(),
  cashbackRequestId: serial()
    .references(() => cashbackRequests.id, { onDelete: 'cascade' })
    .notNull(),
  amountBTC: numeric({ precision: 16, scale: 8 }).notNull(),
  payoutDate: timestamp().defaultNow(),
  txId: varchar({ length: 255 }).notNull().unique(),
  ...timestamps,
});
