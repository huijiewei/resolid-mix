import { createRequestHandler, type ServerBuild } from '@remix-run/server-runtime';
import { createMiddleware } from 'hono/factory';

export const remix = (build: ServerBuild) =>
  createMiddleware(async (c) => {
    const requestHandler = createRequestHandler(build, 'production');

    return await requestHandler(c.req.raw);
  });
