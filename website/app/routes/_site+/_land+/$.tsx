import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { HistoryBackButton } from '~/components/HistoryBackButton';

// noinspection JSUnusedGlobalSymbols
export const loader = async () => {
  throw new Response('Not Found', { status: 404 });
};

export default function Catchall() {
  return null;
}

// noinspection JSUnusedGlobalSymbols
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-bold">{error.status}</div>
        <div>{error.statusText || 'Not Found'}</div>
        <HistoryBackButton />
      </div>
    );
  }

  throw error;
}
