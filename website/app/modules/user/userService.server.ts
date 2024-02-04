import { desc, eq } from 'drizzle-orm';
import { db } from '~/foundation/db.server';
import { users, type UserInsert, type UserSelect, type UserSelectWithGroup } from './userSchema.server';

export const getUserByLast = async (): Promise<UserSelect | null> => {
  const result = await db.select().from(users).orderBy(desc(users.id)).limit(1);

  return result[0] ?? null;
};

export const getUserById = async (id: number): Promise<UserSelectWithGroup | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      userGroup: true,
    },
  });

  return user ?? null;
};

export const getUserByEmail = async (email: string): Promise<UserSelectWithGroup | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      userGroup: true,
    },
  });

  return user ?? null;
};

export const checkExistByEmail = async (email: string) => {
  return Boolean(await db.query.users.findFirst({ where: eq(users.email, email) }));
};

export const checkExistByUsername = async (username: string) => {
  return Boolean(await db.query.users.findFirst({ where: eq(users.username, username) }));
};

export const createUser = async (user: UserInsert) => {
  const inserted = await db.insert(users).values(user).returning();

  return inserted[0] as UserSelect;
};
