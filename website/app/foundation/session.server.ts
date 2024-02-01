import { createCookieSessionStorage } from '@remix-run/node';
import { omit } from '@resolid-mix/utils';
import { cache } from '~/foundation/cache.server';
import type { UserSelect, UserSelectWithGroup } from '~/modules/user/userSchema.server';
import { getUserById } from '~/modules/user/userService.server';

export type SessionUser = Omit<UserSelectWithGroup, 'password' | 'updatedAt' | 'deletedAt'>;

export const omitUser = (user: UserSelectWithGroup | UserSelect): SessionUser => {
  return omit(user, ['password', 'updatedAt', 'deletedAt']) as SessionUser;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secrets: [process.env.RR_COOKIE_SECRET ?? 'vroc8ldharqniihf'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const createUserSession = async (request: Request, userId: number) => {
  const session = await getSession(request.headers.get('Cookie'));
  session.set('userId', userId);

  return session;
};

export const getSessionUser = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    const userId = session.get('userId');
    const userCacheKey = `userSession_${userId}`;
    let user: UserSelectWithGroup | undefined | null = await cache.get<UserSelectWithGroup>(userCacheKey);

    if (user == undefined) {
      user = await getUserById(userId);

      if (user != null) {
        await cache.set(userCacheKey, omitUser(user));
      }
    }

    return user;
  }

  return null;
};

export { commitSession, destroySession, getSession };
