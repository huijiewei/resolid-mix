import type { MetaFunction } from '@remix-run/node';
import { Button } from '@resolid-remix/ui';
import { Github } from '~/assets/icons/Github';
import { HistoryLink } from '~/components/HistoryLink';

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction = () => {
  return [{ title: 'Resolid Remix' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function _index() {
  return (
    <main className={'prose mx-auto max-w-3xl'}>
      <h1
        className={
          'mt-20 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-center text-[5rem] font-[800] leading-normal text-transparent'
        }
      >
        Resolid Remix
      </h1>
      <p>
        这是一个很有趣的 Remix 全栈演示站点，Remix 是一个全栈 Web 框架，可让您专注于用户界面并通过 Web
        标准进行工作，以提供快速、流畅且有弹性的用户体验。人们会喜欢使用你的东西。
      </p>
      <div className={'not-prose mt-10 flex flex-row justify-center gap-9'}>
        <Button size={'xl'} asChild>
          <HistoryLink to={'/ui'}>快速开始</HistoryLink>
        </Button>
        <Button size={'xl'} variant={'outline'} color={'neutral'} asChild>
          <a target={'_blank'} rel={'noopener noreferrer'} href={'https://github.com/huijiewei/resolid-remix'}>
            <Github className={'mr-2'} />
            Github
          </a>
        </Button>
      </div>
    </main>
  );
}
