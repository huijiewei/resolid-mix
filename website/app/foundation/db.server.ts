import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as systemSchema from '~/modules/system/systemSchema.server';
import * as userSchema from '~/modules/user/userSchema.server';

process.env.TZ = 'UTC';

const pg = postgres(
  `postgres://${process.env.RX_DB_USER}:${process.env.RX_DB_PASSWORD}@${process.env.RX_DB_HOST}/${process.env.RX_DB_DATABASE}?sslmode=require`,
  {
    max: process.env.VERCEL ? 1 : 10,
    transform: {
      undefined: null,
    },
  },
);

export const db = drizzle(pg, {
  schema: { ...userSchema, ...systemSchema },
  logger: process.env.NODE_ENV == 'development',
});
