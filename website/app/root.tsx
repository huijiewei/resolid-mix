import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/server-runtime';
import { ColorModeScript, ResolidProvider } from '@resolid/mix-ui';
import commonIcon from '~/assets/icons/common.svg';
import { RouteProgressBar } from '~/components/RouteProgressBar';
import { AuthProvider } from '~/extensions/auth/AuthProvider';
import { AuthUserProvider } from '~/extensions/auth/AuthUserProvider';
import { useTypeLoaderData } from '~/extensions/remix/useData';
import { getSessionUser, type SessionUser } from '~/foundation/session.server';

import type { MetaFunction } from '@remix-run/node';
import { trimEnd } from '@resolid/mix-utils';
import './root.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return { user: await getSessionUser(request), url: request.url };
};

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const ogImage = new URL('/images/og-image-v1.png', data?.url).toString();
  const ogUrl = trimEnd(new URL('', data?.url).toString(), '/');
  const siteName = 'Resolid Mix';
  const title = siteName;
  const description =
    '一个引人入胜的 Remix 全栈站点，展示使用现代 Web 技术构建高性能、可扩展和用户友好的 Web 应用程序的最佳实践。';

  return [
    { title: title },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:site_name',
      content: siteName,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:url',
      content: ogUrl,
    },
    {
      property: 'og:image',
      content: ogImage,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
    {
      property: 'twitter:image',
      content: ogImage,
    },
    {
      property: 'twitter:url',
      content: ogUrl,
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ].filter(Boolean);
};

// noinspection JSUnusedGlobalSymbols
export const shouldRevalidate = () => false;

// noinspection JSUnusedGlobalSymbols
export const links: LinksFunction = () => {
  return [
    {
      rel: 'prefetch',
      href: commonIcon,
      as: 'image',
      type: 'image/svg+xml',
    },
  ];
};

// noinspection JSUnusedGlobalSymbols
export default function App() {
  const { user } = useTypeLoaderData<{ user: SessionUser; url: string }, typeof loader>();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0969da" />
        <Meta />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Links />
      </head>
      <body className={'min-h-screen overflow-y-scroll antialiased'}>
        <RouteProgressBar />
        <ResolidProvider>
          <AuthUserProvider user={user}>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </AuthUserProvider>
        </ResolidProvider>
        <ScrollRestoration />
        <Scripts />
        <ColorModeScript />
      </body>
    </html>
  );
}
