import { ErrorComponent } from '~/components/ErrorComponent';
import { mergeMeta } from '~/extensions/meta/mergeMeta';

// noinspection JSUnusedGlobalSymbols
export const loader = async () => {
  throw new Response('Not Found', { status: 404 });
};

// noinspection JSUnusedGlobalSymbols
export const meta = mergeMeta(() => {
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
  return <ErrorComponent />;
};
