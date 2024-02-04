import { getTableConfig } from 'drizzle-orm/pg-core';
import { insertClosure } from '~/common/treeService.server';
import { db } from '~/foundation/db.server';
import { districts, type DistrictInsert, type DistrictSelect } from '~/modules/district/districtSchema.server';

export const insertDistrict = async (district: DistrictInsert) => {
  const inserted = await db.insert(districts).values(district).returning();

  const { name } = getTableConfig(districts);

  await insertClosure<DistrictSelect>(inserted[0], name);

  return inserted[0] as DistrictSelect;
};
