import { bigint, index, text } from 'drizzle-orm/pg-core';
import { resolidTable } from '~/foundation/schema.server';

export const districts = resolidTable(
  'district',
  {
    code: bigint('code', { mode: 'bigint' }).primaryKey(),
    name: text('name').notNull().default(''),
    zipCode: text('zipCode').notNull().default(''),
    areaCode: text('areaCode').notNull().default(''),
  },
  (districts) => ({
    nameIndex: index('nameIndex').on(districts.name),
  }),
);

export type DistrictSelect = typeof districts.$inferSelect;
export type DistrictInsert = typeof districts.$inferInsert;
