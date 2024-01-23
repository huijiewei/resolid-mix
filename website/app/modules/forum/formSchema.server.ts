import { relations, sql } from 'drizzle-orm';
import { datetime, index, int, unique, varchar } from 'drizzle-orm/mysql-core';
import { resolidMysqlTable } from '~/foundation/schema.server';
import { users } from '~/modules/user/userSchema.server';

export const forumBoards = resolidMysqlTable(
  'forum_board',
  {
    id: int('id').autoincrement().primaryKey(),
    parentId: int('parentId').notNull().default(0),
    slug: varchar('slug', { length: 32 }).notNull().default(''),
    name: varchar('name', { length: 32 }).notNull().default(''),
    icon: varchar('name', { length: 191 }).notNull().default(''),
  },
  (forumBoards) => ({
    slugIndex: unique('slugIndex').on(forumBoards.slug),
    parentIdIndex: index('parentIdIndex').on(forumBoards.parentId),
  }),
);

export const forumTopics = resolidMysqlTable(
  'forum_topic',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('userId').notNull().default(0),
    forumBoardId: int('forumBoardId').notNull().default(0),
    title: varchar('title', { length: 191 }).notNull().default(''),
    createdAt: datetime('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updatedAt'),
    deletedAt: datetime('deletedAt'),
  },
  (forumTopics) => ({
    userIdIndex: index('userIdIndex').on(forumTopics.userId),
    forumBoardIdIndex: index('forumBoardIdIndex').on(forumTopics.forumBoardId),
    deletedAtIndex: index('deletedAtIndex').on(forumTopics.deletedAt),
  }),
);

export const forumTopicsRelations = relations(forumTopics, ({ one }) => ({
  user: one(users, {
    fields: [forumTopics.userId],
    references: [users.id],
  }),
  forumBoard: one(forumBoards, {
    fields: [forumTopics.forumBoardId],
    references: [forumBoards.id],
  }),
}));
