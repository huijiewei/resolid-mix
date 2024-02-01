import type { Config } from 'drizzle-kit';

import 'dotenv/config';

// noinspection JSUnusedGlobalSymbols
export default {
  schema: ['./app/foundation/schema.server.ts', './app/modules/*/*Schema.server.ts'],
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: `mysql://${process.env.RX_DB_USER}:${process.env.RX_DB_PASSWORD}@${process.env.RX_DB_HOST}:${process.env.RX_DB_PORT}/${process.env.RX_DB_DATABASE}?ssl={"rejectUnauthorized":true}`,
  },
} satisfies Config;
