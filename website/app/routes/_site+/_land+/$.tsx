import type { MetaFunction } from '@remix-run/node';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { NotFound } from '~/components/NotFound';

// noinspection JSUnusedGlobalSymbols
export const loader = async () => {
  throw new Response('Not Found', { status: 404 });
};

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction = () => {
  return [
    {
      title: '不存在',
    },
  ];
};

export default function Catchall() {
  return null;
}

// noinspection JSUnusedGlobalSymbols
export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  throw error;
};
