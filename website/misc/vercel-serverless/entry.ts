import { createMiddleware } from '@hattip/adapter-node/native-fetch';
import { createRequestHandler, type ServerBuild } from '@remix-run/server-runtime';

// @ts-expect-error Cannot find module
import * as build from './index.js';

const remixHandler = createRequestHandler(build as ServerBuild, 'production');

export default createMiddleware((ctx) => remixHandler(ctx.request));
