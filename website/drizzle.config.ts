import type { Config } from 'drizzle-kit';

import 'dotenv/config';

// noinspection JSUnusedGlobalSymbols
export default {
  schema: ['./app/foundation/schema.server.ts', './app/modules/*/*Schema.server.ts'],
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgres://${process.env.RX_DB_USER}:${process.env.RX_DB_PASSWORD}@${process.env.RX_DB_HOST}/${process.env.RX_DB_DATABASE}?sslmode=require`,
  },
} satisfies Config;
