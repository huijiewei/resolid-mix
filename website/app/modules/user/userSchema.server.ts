import { relations, sql } from 'drizzle-orm';
import { datetime, index, int, unique, varchar } from 'drizzle-orm/mysql-core';
import { resolidMysqlTable } from '~/foundation/schema.server';

export const users = resolidMysqlTable(
  'user',
  {
    id: int('id').autoincrement().primaryKey(),
    userGroupId: int('userGroupId').notNull().default(0),
    email: varchar('email', { length: 90 }).notNull().default(''),
    emailVerified: datetime('emailVerified'),
    username: varchar('username', { length: 32 }).notNull().default(''),
    password: varchar('password', { length: 191 }).notNull().default(''),
    nickname: varchar('nickname', { length: 32 }).notNull().default(''),
    avatar: varchar('avatar', { length: 191 }).notNull().default(''),
    createdAt: datetime('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updatedAt'),
    deletedAt: datetime('deletedAt'),
  },
  (users) => ({
    emailIndex: unique('emailIndex').on(users.email),
    usernameIndex: unique('usernameIndex').on(users.username),
    userGroupIdIndex: index('userGroupIdIndex').on(users.userGroupId),
    deletedAtIndex: index('deletedAtIndex').on(users.deletedAt),
  }),
);

export type UserSelect = typeof users.$inferSelect;
export type UserSelectWithGroup = UserSelect & { userGroup: UserGroupSelect };
export type UserInsert = typeof users.$inferInsert;

export const userGroups = resolidMysqlTable('user_group', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 32 }).notNull().default(''),
  color: varchar('color', { length: 32 }).notNull().default(''),
  icon: varchar('icon', { length: 191 }).notNull().default(''),
});

export type UserGroupSelect = typeof userGroups.$inferSelect;
export type UserGroupInsert = typeof userGroups.$inferInsert;

export const usersRelations = relations(users, ({ one }) => ({
  userGroup: one(userGroups, {
    fields: [users.userGroupId],
    references: [userGroups.id],
  }),
}));
