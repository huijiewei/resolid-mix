import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { db } from '~/foundation/db.server';
import { districts } from '~/modules/district/districtSchema.server';
import { insertDistrict } from '~/modules/district/districtService.server';

type District = {
  code: bigint;
  name: string;
  children?: District[];
};

const createDistrict = async (district: District) => {
  await insertDistrict({
    code: district.code,
    name: district.name,
  });

  console.log(`插入区域数据 ${district.name} 成功!`);

  if (district.children) {
    for (const child of district.children) {
      await createDistrict(child);
    }
  }
};

export const districtImport = async () => {
  const json = JSON.parse(await readFile(join(process.cwd(), './runtime/data/pcas-code.json'), 'utf8')) as District[];

  console.log('加载区域数据 JSON 文件成功!');

  await db.delete(districts);

  console.log('清除旧的区域数据!');

  for (const item of json) {
    await createDistrict(item);
  }
};
