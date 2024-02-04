import { drizzle } from 'drizzle-orm/postgres-js';

import postgres from 'postgres';
import * as userSchema from '~/modules/user/userSchema.server';

process.env.TZ = 'UTC';

const pg = postgres(
  `postgres://${process.env.RX_DB_USER}:${process.env.RX_DB_PASSWORD}@${process.env.RX_DB_HOST}/${process.env.RX_DB_DATABASE}?sslmode=require`,
);

export const db = drizzle(pg, {
  schema: { ...userSchema },
  logger: process.env.NODE_ENV == 'development',
});
