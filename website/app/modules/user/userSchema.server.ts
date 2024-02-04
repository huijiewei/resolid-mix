import { relations } from 'drizzle-orm';
import { index, integer, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { resolidTable } from '~/foundation/schema.server';

export const users = resolidTable(
  'user',
  {
    id: serial('id').primaryKey(),
    userGroupId: integer('userGroupId').notNull().default(0),
    email: text('email').notNull().default(''),
    emailVerified: timestamp('emailVerified'),
    username: text('username').notNull().default(''),
    password: text('password').notNull().default(''),
    nickname: text('nickname').notNull().default(''),
    avatar: text('avatar').notNull().default(''),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt'),
    deletedAt: timestamp('deletedAt'),
  },
  (users) => ({
    emailIndex: uniqueIndex('emailIndex').on(users.email),
    usernameIndex: uniqueIndex('usernameIndex').on(users.username),
    userGroupIdIndex: index('userGroupIdIndex').on(users.userGroupId),
    deletedAtIndex: index('deletedAtIndex').on(users.deletedAt),
  }),
);

export type UserSelect = typeof users.$inferSelect;
export type UserSelectWithGroup = UserSelect & { userGroup: UserGroupSelect };
export type UserInsert = typeof users.$inferInsert;

export const userGroups = resolidTable('user_group', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().default(''),
  color: text('color').notNull().default(''),
  icon: text('icon').notNull().default(''),
});

export type UserGroupSelect = typeof userGroups.$inferSelect;
export type UserGroupInsert = typeof userGroups.$inferInsert;

export const usersRelations = relations(users, ({ one }) => ({
  userGroup: one(userGroups, {
    fields: [users.userGroupId],
    references: [userGroups.id],
  }),
}));
