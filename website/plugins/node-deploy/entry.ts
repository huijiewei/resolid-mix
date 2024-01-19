import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { createRequestHandler } from '@remix-run/server-runtime';
import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import os from 'node:os';

// @ts-expect-error Cannot find module
import * as build from './index.js';

const cache = (seconds: number) =>
  createMiddleware(async (c, next) => {
    await next();

    if (!c.res.ok) {
      return;
    }

    c.res.headers.set('cache-control', `public, immutable, max-age=${seconds}`);
  });

const app = new Hono();

app.use('/assets/*', cache(31536000), serveStatic({ root: build.assetsBuildDirectory }));

app.use('*', cache(3600), serveStatic({ root: build.assetsBuildDirectory }));

app.use(
  createMiddleware(async (c) => {
    const requestHandler = createRequestHandler(build, 'production');

    return await requestHandler(c.req.raw);
  }),
);

serve(
  {
    ...app,
    port: Number(process.env.PORT) || 3000,
  },
  async (info) => {
    console.log(`🚀 Hono Server started on port ${info.port}`);

    const address =
      process.env.HOST ||
      Object.values(os.networkInterfaces())
        .flat()
        .find((ip) => String(ip?.family).includes('4') && !ip?.internal)?.address;

    if (!address) {
      console.log(`[remix-hono-serve] http://localhost:${info.port}`);
    } else {
      console.log(`[remix-hono-serve] http://localhost:${info.port} (http://${address}:${info.port})`);
    }
  },
);
