import { boolean, integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const merchants = pgTable('merchants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  cashbackPercent: integer('cashback_percent').notNull(),
  logoUrl: varchar('logo_url', { length: 255 }).notNull(),
  affiliateUrl: varchar('affiliate_url', { length: 500 }),
  partner: boolean('partner').default(false),
  highlight: boolean('highlight').default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
