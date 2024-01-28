import type { MetaFunction } from '@remix-run/node';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { NotFound } from '~/components/NotFound';
import { mergeMeta } from '~/extensions/meta/mergeMeta';

// noinspection JSUnusedGlobalSymbols
export const loader = async () => {
  throw new Response('Not Found', { status: 404 });
};

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction = mergeMeta(() => {
  return [
    {
      title: '页面未找到',
    },
  ];
});

export default function Catchall() {
  return null;
}

// noinspection JSUnusedGlobalSymbols
export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <NotFound />;
  }

  throw error;
};
