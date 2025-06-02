import { index, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@/schema/users';
import { merchants } from '@/schema/merchants';
import { timestamps } from '@/schema/column_helper';

export const affiliateClicks = pgTable(
  'affiliate_clicks',
  {
    id: serial().primaryKey(),
    userId: serial().references(() => users.id),
    merchantId: serial().references(() => merchants.id, { onDelete: 'cascade' }),
    clickTime: timestamp().defaultNow(),
    userAgent: text(),
    ...timestamps,
  },
  (table) => [
    index('afiliate_user_idx').on(table.userId),
    index('afiliate_merchant_idx').on(table.merchantId),
    index('afiliate_click_time_idx').on(table.clickTime),
  ],
);
