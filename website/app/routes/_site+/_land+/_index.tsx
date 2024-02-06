import { Button } from '@resolid/mix-ui';
import { HistoryLink } from '~/components/HistoryLink';
import { SpriteIcon } from '~/components/SpriteIcon';

export default function _index() {
  return (
    <main className={'prose mx-auto max-w-3xl dark:prose-invert'}>
      <h1
        className={
          'mt-20 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-center text-[4rem] font-[800] leading-normal text-transparent laptop:text-[5rem]'
        }
      >
        Resolid Mix
      </h1>
      <p className={'text-center'}>
        Resolid Mix 是一个引人入胜的 Remix 全栈站点。旨在展示使用 Remix、React、Tailwind CSS、Vite、Drizzle
        ORM、PostgreSQL、Hono、Node.js 和 Vercel 等现代 Web 技术构建高性能、可扩展和用户友好的 Web 应用程序的最佳实践。
      </p>
      <div className={'not-prose mt-10 flex flex-row justify-center gap-9'}>
        <Button size={'xl'} asChild>
          <HistoryLink to={'/ui'}>快速开始</HistoryLink>
        </Button>
        <Button size={'xl'} variant={'outline'} color={'neutral'} asChild>
          <a rel="noreferrer noopener" target="_blank" href={'https://github.com/huijiewei/resolid-mix'}>
            <SpriteIcon name={'github'} className={'me-2'} />
            Github
          </a>
        </Button>
      </div>
    </main>
  );
}
