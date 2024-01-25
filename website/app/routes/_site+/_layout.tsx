import { Link, Outlet } from '@remix-run/react';

import { Button, clsx, noScrollbarsClassName } from '@resolid-remix/ui';
import { Github } from '~/assets/icons/Github';
import ResolidBanner from '~/assets/images/resolid-banner.svg';
import { HistoryNavLink } from '~/components/HistoryNavLink';

export default function Layout() {
  return (
    <>
      <header
        className={clsx('bg-bg-default/75 fixed inset-x-0 z-20 w-full border-b backdrop-blur', noScrollbarsClassName)}
      >
        <nav className={'desktop:max-w-6xl mx-auto flex h-16 items-center justify-between px-4'}>
          <div className={'flex items-center gap-4'}>
            <Link to={''}>
              <img width={130} height={30} alt={'Resolid Remix'} src={ResolidBanner} />
            </Link>
          </div>
          <div className={'flex items-center gap-4'}>
            <div
              className={
                'bg-bg-default tablet:relative tablet:top-0 tablet:block tablet:h-auto tablet:bg-inherit absolute inset-x-0 top-[calc(4rem+1px)] z-20 hidden h-screen p-0'
              }
            >
              <ul
                className={
                  'tablet:max-w-none tablet:flex-row tablet:p-0 mx-auto flex max-w-xs list-none flex-col p-4 font-medium tracking-wide'
                }
              >
                <li className={''}>
                  <HistoryNavLink
                    className={({ isActive }) => {
                      return clsx('hover:text-link-pressed tablet:px-4 block p-2', isActive && 'text-link');
                    }}
                    to={''}
                    end
                  >
                    主页
                  </HistoryNavLink>
                </li>
                <li>
                  <HistoryNavLink
                    className={({ isActive }) => {
                      return clsx('hover:text-link-pressed tablet:px-4 block p-2', isActive && 'text-link');
                    }}
                    to={'ui'}
                  >
                    组件库
                  </HistoryNavLink>
                </li>
                <li>
                  <HistoryNavLink
                    className={({ isActive }) => {
                      return clsx('hover:text-link-pressed tablet:px-4 block p-2', isActive && 'text-link');
                    }}
                    to={'blog'}
                  >
                    博客
                  </HistoryNavLink>
                </li>
                <li>
                  <HistoryNavLink
                    className={({ isActive }) => {
                      return clsx('hover:text-link-pressed tablet:px-4 block p-2', isActive && 'text-link');
                    }}
                    to={'forum'}
                  >
                    论坛
                  </HistoryNavLink>
                </li>
                <li>
                  <HistoryNavLink
                    className={({ isActive }) => {
                      return clsx('hover:text-link-pressed tablet:px-4 block p-2', isActive && 'text-link');
                    }}
                    to={'about'}
                  >
                    关于
                  </HistoryNavLink>
                </li>
              </ul>
            </div>
            <div className={'flex flex-row items-center gap-1'}>
              <Button aspectSquare variant={'subtle'} asChild>
                <a
                  aria-label={'Go to Resolid Remix on Github'}
                  rel="noreferrer"
                  target="_blank"
                  href={'https://github.com/huijiewei/resolid-remix'}
                >
                  <Github size={'sm'} />
                </a>
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <div className={'pt-16'}>
        <Outlet />
      </div>
    </>
  );
}
