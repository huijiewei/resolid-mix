import { hashSync } from '@node-rs/bcrypt';
import { db } from '~/foundation/db.server';
import { status } from '~/modules/system/systemSchema.server';
import { userGroups, users } from '~/modules/user/userSchema.server';

export const dbSeed = async () => {
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
    createdIp: '127.0.0.1',
  });

  await db.insert(status).values({
    id: 1,
    message: '系统初始化成功',
  });

  console.log('初始数据填充成功!');

  process.exit();
};
