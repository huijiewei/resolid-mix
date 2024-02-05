import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { networkInterfaces } from 'node:os';
import { remix } from '../base/remix';

import 'dotenv/config';

// @ts-expect-error Cannot find module
import * as build from './index.js';

const cache = (seconds: number, immutable = false) =>
  createMiddleware(async (c, next) => {
    if (!c.req.path.match(/\.[a-zA-Z0-9]+$/)) {
      return next();
    }

    await next();

    if (!c.res.ok) {
      return;
    }

    c.res.headers.set('cache-control', `public, max-age=${seconds}${immutable ? ', immutable' : ''}`);
  });

const app = new Hono();

app
  .use('/assets/*', cache(60 * 60 * 24 * 365, true), serveStatic({ root: build.assetsBuildDirectory }))
  .use('*', cache(60 * 60), serveStatic({ root: build.assetsBuildDirectory }))
  .use('*', remix(build));

serve(
  {
    ...app,
    port: Number(process.env.PORT) || 3000,
  },
  async (info) => {
    console.log(`🚀 Hono Server started on port ${info.port}`);

    const address =
      process.env.HOST ||
      Object.values(networkInterfaces())
        .flat()
        .find((ip) => String(ip?.family).includes('4') && !ip?.internal)?.address;

    if (!address) {
      console.log(`[remix-hono-serve] http://localhost:${info.port}`);
    } else {
      console.log(`[remix-hono-serve] http://localhost:${info.port} (http://${address}:${info.port})`);
    }
  },
);
