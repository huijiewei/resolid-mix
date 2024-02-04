import { pgTableCreator } from 'drizzle-orm/pg-core';

export const resolidTable = pgTableCreator((name) => {
  const tablePrefix = process.env.RX_DB_TABLE_PREFIX ?? '';

  return tablePrefix + name;
});
