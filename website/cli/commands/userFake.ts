import { faker } from '@faker-js/faker';
import { hashSync } from '@node-rs/bcrypt';
import { isEmpty, wait } from '@resolid/mix-utils';
import {
  checkExistByEmail,
  checkExistByNickname,
  checkExistByUsername,
  createUser,
  getUserByLast,
} from '~/modules/user/userService.server';

export const userFake = async (count: number) => {
  const lastUser = await getUserByLast();

  let createdAtTimestamp =
    lastUser && lastUser.id > 2000 ? lastUser.createdAt.getTime() / 1000 : new Date('2023-01-01').getTime() / 1000;

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = firstName.toLowerCase() + '.' + lastName.toLowerCase();
    const nickname = faker.number.int({ max: 100 }) > 20 ? firstName + ' ' + lastName : '';
    const email =
      username +
      '@' +
      faker.internet
        .email({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          allowSpecialCharacters: false,
        })
        .split('@')[1];

    if (await checkExistByUsername(username)) {
      console.log(`用户名: ${username} 已存在, 忽略.`);
      continue;
    }

    if (!isEmpty(nickname) && (await checkExistByNickname(nickname))) {
      console.log(`昵称: ${username} 已存在, 忽略.`);
      continue;
    }

    if (await checkExistByEmail(email)) {
      console.log(`邮件: ${email} 已存在, 忽略.`);
      continue;
    }

    const password = faker.internet.password();

    createdAtTimestamp += faker.number.int({ max: 28800 - 30 + 1 });

    const avatar = faker.number.int({ max: 100 }) > 10 ? faker.image.avatar() : '';

    const createdAt = new Date(createdAtTimestamp * 1000);
    const createdIp = faker.internet.ipv4();

    await createUser({
      userGroupId: 2,
      email: email,
      emailVerified: faker.number.int({ max: 100 }) > 30 ? null : createdAt,
      password: hashSync(password),
      username: username,
      nickname: nickname,
      avatar: avatar,
      createdAt: createdAt,
      createdIp: createdIp,
    });

    console.log(`插入用户 ${email} 成功!`);

    await wait(200);
  }
};
