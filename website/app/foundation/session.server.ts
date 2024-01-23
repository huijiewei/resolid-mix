import { createSessionStorage, type SessionIdStorageStrategy, type SessionStorage } from '@remix-run/node';
import { omit } from '@resolid-remix/utils';
import type { UserSelect, UserSelectWithGroup } from '~/modules/user/userSchema.server';
import { getUserBySessionToken, removeUserSession, updateUserSession } from '~/modules/user/userService.server';

export type SessionUser = Omit<UserSelectWithGroup, 'password' | 'updatedAt' | 'deletedAt'>;

export const omitUser = (user: UserSelectWithGroup | UserSelect): SessionUser => {
  return omit(user, ['password', 'updatedAt', 'deletedAt']) as SessionUser;
};

const createDatabaseSessionStorage = ({
  cookie,
}: {
  cookie: SessionIdStorageStrategy['cookie'];
}): SessionStorage<SessionUser> =>
  createSessionStorage({
    cookie,
    async createData(data, expires) {
      const expiredAt = expires ?? new Date(Date.now() + 1000 * 60 * 30);

      return await updateUserSession(data.id as number, expiredAt);
    },
    async readData(id) {
      const user = await getUserBySessionToken(id);

      return user ? omitUser(user) : null;
    },
    async updateData(id, data, expires) {
      const expiredAt = expires ?? new Date(Date.now() + 1000 * 60 * 30);

      await updateUserSession(data.id as number, expiredAt, id);
    },
    async deleteData(id) {
      await removeUserSession(id);
    },
  });

const { getSession, commitSession, destroySession } = createDatabaseSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: false,
  },
});

export const getSessionUser = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'));

  return session.has('id') ? (session.data as SessionUser) : null;
};

export { commitSession, destroySession, getSession };