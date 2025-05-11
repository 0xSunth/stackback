import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users, merchants } from '@/drizzle/schema';

export const affiliateClicks = pgTable('affiliate_clicks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  merchantId: uuid('merchant_id').references(() => merchants.id, { onDelete: 'cascade' }),
  clickTime: timestamp('click_time').defaultNow(),
  ipAddress: varchar({ length: 255 }).notNull(),
  userAgent: text('user_agent'),
});
