import { createRequestHandler, type ServerBuild } from '@remix-run/server-runtime';
import { createMiddleware } from 'hono/factory';

export const remix = (build: ServerBuild) =>
  createMiddleware(async (c) => {
    const requestHandler = createRequestHandler(build, 'production');

    const remoteAddress = c.req.header('x-vercel-deployment-url')
      ? c.req.header('x-forwarded-for')
      : c.env.incoming.socket.remoteAddress;

    return await requestHandler(c.req.raw, {
      remoteAddress: remoteAddress,
    });
  });
