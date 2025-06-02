import { sql } from 'drizzle-orm';
import { boolean, check, index, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '@/schema/column_helper';

export const merchants = pgTable(
  'merchants',
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull().unique(),
    logoUrl: varchar({ length: 255 }).notNull(),
    cashbackPercent: integer().notNull(),
    affiliateUrl: varchar({ length: 500 }),
    partner: boolean().default(false),
    highlight: boolean().default(false),
    ...timestamps,
  },
  (table) => [
    index('merchant_name_idx').on(table.name),
    index('merchant_partner_idx').on(table.partner),
    index('merchant_highlight_idx').on(table.highlight),
    index('merchant_highlight_name_idx').on(table.highlight, table.name),

    check('cashback°percent_check', sql`${table.cashbackPercent} <= 100`),
  ],
);
