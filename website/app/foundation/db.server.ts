import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import * as userSchema from '~/modules/user/userSchema.server';

process.env.TZ = 'UTC';

const pool = mysql.createPool({
  host: process.env.RR_DB_HOST,
  port: process.env.RR_DB_PORT as unknown as number,
  user: process.env.RR_DB_USER,
  password: process.env.RR_DB_PASSWORD,
  database: process.env.RR_DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool, {
  schema: { ...userSchema },
  mode: 'planetscale',
  logger: process.env.NODE_ENV == 'development',
});
