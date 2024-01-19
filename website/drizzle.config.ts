import type { Config } from 'drizzle-kit';

import 'dotenv/config';

// noinspection JSUnusedGlobalSymbols
export default {
  schema: ['./app/foundation/schema.server.ts', './app/modules/*/*Schema.server.ts'],
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: `mysql://${process.env.RR_DB_USER}:${process.env.RR_DB_PASSWORD}@${process.env.RR_DB_HOST}:${process.env.RR_DB_PORT}/${process.env.RR_DB_DATABASE}?ssl={"rejectUnauthorized":true}`,
  },
} satisfies Config;
