import { getTableConfig } from 'drizzle-orm/mysql-core';
import { insertClosure } from '~/common/treeService.server';
import { db } from '~/foundation/db.server';
import { districts, type DistrictInsert, type DistrictSelect } from '~/modules/district/districtSchema.server';

export const insertDistrict = async (district: DistrictInsert) => {
  const inserted = await db.insert(districts).values(district);

  const { name } = getTableConfig(districts);

  const result = { ...district, id: inserted[0].insertId } as DistrictSelect;

  await insertClosure(result, name);

  return result;
};
