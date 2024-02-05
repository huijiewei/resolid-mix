import { db } from '~/foundation/db.server';
import { districts, type DistrictInsert, type DistrictSelect } from '~/modules/district/districtSchema.server';

export const insertDistrict = async (district: DistrictInsert) => {
  const inserted = await db.insert(districts).values(district).returning();

  return inserted[0] as DistrictSelect;
};
