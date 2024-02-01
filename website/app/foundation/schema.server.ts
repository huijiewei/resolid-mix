import { mysqlTableCreator } from 'drizzle-orm/mysql-core';

export const resolidMysqlTable = mysqlTableCreator((name) => {
  const tablePrefix = process.env.RX_DB_TABLE_PREFIX ?? '';

  return tablePrefix + name;
});
