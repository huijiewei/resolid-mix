import { Await, defer, useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { clsx } from '@resolid/mix-ui';
import { Suspense } from 'react';
import { getStatus } from '~/modules/system/systemService.server';

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const status = async () => {
    try {
      await getStatus();

      return { success: true, message: '数据库访问正常' };
    } catch {
      return { success: false, message: '数据库访问失败' };
    }
  };

  return defer({
    ssr: {
      success: true,
      message: 'SSR 访问正常',
      now: Date.now(),
      agent: request.headers.get('user-agent'),
      ip: context.remoteAddress,
    },
    db: status(),
  });
};

export default function Status() {
  const { ssr, db } = useLoaderData<typeof loader>();

  return (
    <div className={'prose mx-auto mt-8 dark:prose-invert'}>
      <h1 className={'text-center'}>状态页面</h1>
      <p className={'rounded-lg bg-green-50/60 p-4 font-bold text-green-500'}>静态页面访问正常</p>
      <p className={'rounded-lg bg-green-50/60 p-4 font-bold text-green-500'}>{ssr.message}</p>
      <Suspense
        fallback={<p className="rounded-lg bg-yellow-50/60 p-4 font-bold text-yellow-500">正在查询数据库状态</p>}
      >
        <Await resolve={db}>
          {(db) => (
            <p
              className={clsx(
                'rounded-lg p-4 font-bold',
                db.success ? 'bg-green-50/60 text-green-500' : 'bg-red-50/60 text-red-500',
              )}
            >
              {db.message}
            </p>
          )}
        </Await>
      </Suspense>
      <p className={'bg-blue-50/60 p-4'}>
        客户端地址: {ssr.ip}
        <br />
        服务器时间: {new Date(ssr.now).toLocaleString()}
      </p>
    </div>
  );
}
