import 'dotenv/config';

import { faker } from '@faker-js/faker';
import { hashSync } from '@node-rs/bcrypt';
import { wait } from '@resolid/mix-utils';
import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { db } from '~/foundation/db.server';
import { districts, districtsClosure } from '~/modules/district/districtSchema.server';
import { insertDistrict } from '~/modules/district/districtService.server';
import { status } from '~/modules/system/systemSchema.server';
import { userGroups, users } from '~/modules/user/userSchema.server';
import { checkExistByEmail, checkExistByUsername, createUser, getUserByLast } from '~/modules/user/userService.server';

const program = new Command();

program.name('resolid-cli').description('Resolid Mix 终端工具').version('0.1.0');

program
  .command('seed')
  .description('初始数据填充')
  .action(async () => {
    await db.delete(users);
    await db.delete(userGroups);

    await db.insert(userGroups).values([
      { id: 1, name: '管理员' },
      { id: 2, name: '普通用户' },
    ]);

    await db.insert(users).values({
      id: 1,
      userGroupId: 1,
      email: 'admin@resolid.tech',
      emailVerified: new Date(),
      username: 'admin',
      nickname: '管理账号',
      password: hashSync('123456'),
    });

    await db.insert(status).values({
      id: 1,
      message: '系统初始化成功',
    });

    console.log('初始数据填充成功!');

    process.exit();
  });

type District = {
  code: string;
  name: string;
  children?: District[];
};

const createDistrict = async (district: District, parentId: number) => {
  const newDistrict = await insertDistrict({
    parentId: parentId,
    name: district.name,
    code: district.code,
  });

  console.log(`插入区域数据 ${district.name} 成功!`);

  if (district.children) {
    for (const child of district.children) {
      await createDistrict(child, newDistrict.id);
    }
  }
};

program
  .command('district-import')
  .description('从 JSON 文件导入区域数据')
  .action(async () => {
    const json = JSON.parse(readFileSync(join(process.cwd(), './runtime/data/pcas-code.json'), 'utf8')) as District[];

    console.log('加载区域数据 JSON 文件成功!');

    await db.delete(districts);
    await db.delete(districtsClosure);

    console.log('清除旧的区域数据!');

    for (const item of json) {
      await createDistrict(item, 0);
    }

    process.exit();
  });

program
  .command('user-fake')
  .description('用户生成')
  .argument('[number]', '用户数量', (value) => parseInt(value, 10), 20)
  .action(async (number: number) => {
    const lastUser = await getUserByLast();

    let fakeCreatedAtTimestamp =
      lastUser && lastUser.id > 2000 ? lastUser.createdAt.getTime() / 1000 : new Date('2023-01-01').getTime() / 1000;

    for (let i = 0; i < number; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet.userName({ firstName, lastName });
      const email = faker.internet.email({ firstName, lastName, allowSpecialCharacters: false });

      if (await checkExistByUsername(username)) {
        console.log(`用户名: ${username} 已存在, 忽略.`);
        continue;
      }

      if (await checkExistByEmail(email)) {
        console.log(`邮件: ${email} 已存在, 忽略.`);
        continue;
      }

      const password = faker.internet.password();

      fakeCreatedAtTimestamp += faker.number.int({ max: 28800 - 30 + 1 });

      const avatar = faker.number.int({ max: 100 }) > 11 ? faker.image.avatar() : '';

      const createdAt = new Date(fakeCreatedAtTimestamp * 1000);

      await createUser({
        userGroupId: 2,
        email: email,
        emailVerified: faker.number.int({ max: 100 }) > 66 ? null : createdAt,
        username: username,
        password: hashSync(password),
        avatar: avatar,
        nickname: faker.internet.displayName({ firstName, lastName }),
        createdAt: createdAt,
      });

      console.log(`插入用户 ${email} 成功!`);

      await wait(300);
    }

    process.exit();
  });

await program.parseAsync(process.argv);
