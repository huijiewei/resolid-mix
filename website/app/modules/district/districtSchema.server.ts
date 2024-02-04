import { index, integer, serial, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { resolidTable } from '~/foundation/schema.server';

export const districts = resolidTable(
  'district',
  {
    id: serial('id').primaryKey(),
    parentId: integer('parentId').notNull().default(0),
    name: text('name').notNull().default(''),
    code: text('code').notNull().default(''),
    zipCode: text('zipCode').notNull().default(''),
    areaCode: text('areaCode').notNull().default(''),
  },
  (districts) => ({
    codeIndex: uniqueIndex('codeIndex').on(districts.code),
    parentIdIndex: index('parentIdIndex').on(districts.parentId),
    nameIndex: index('nameIndex').on(districts.name),
  }),
);

export type DistrictSelect = typeof districts.$inferSelect;
export type DistrictInsert = typeof districts.$inferInsert;

export const districtsClosure = resolidTable(
  'district_closure',
  {
    id: serial('id').primaryKey(),
    ancestor: integer('ancestor').notNull().default(0),
    descendant: integer('descendant').notNull().default(0),
    distance: integer('distance').notNull().default(0),
  },
  (districts) => ({
    distanceIndex: index('distanceIndex').on(districts.distance),
    ancestorIndex: index('ancestorIndex').on(districts.ancestor, districts.descendant),
    descendantIndex: index('descendantIndex').on(districts.descendant, districts.distance),
  }),
);
