import { Link, Outlet } from '@remix-run/react';
import { Button, Tooltip, clsx, noScrollbarsClassName, useColorModeState } from '@resolid-remix/ui';
import { Suspense, useState, type MouseEventHandler } from 'react';
import { Close } from '~/assets/icons/Close';
import { Github } from '~/assets/icons/Github';
import { Menu } from '~/assets/icons/Menu';
import { UserCircle } from '~/assets/icons/UserCircle';
import ResolidBannerDark from '~/assets/images/resolid-banner-dark.svg';
import ResolidBanner from '~/assets/images/resolid-banner.svg';
import { HistoryNavLink } from '~/components/HistoryNavLink';
import { LazySpinner } from '~/components/LazySpinner';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';

// noinspection JSUnusedGlobalSymbols
export const meta = () => {
  return [{ title: 'Resolid Remix' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Layout() {
  return (
    <>
      <header
        className={clsx('fixed inset-x-0 z-20 w-full border-b bg-bg-default/75 backdrop-blur', noScrollbarsClassName)}
      >
        <HeaderNav />
      </header>
      <div className={'pt-16'}>
        <Suspense fallback={<LazySpinner height={'calc(100vh - 5em)'} />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

const HeaderNav = () => {
  const [opened, setOpened] = useState(false);

  return (
    <nav className={'mx-auto flex h-16 items-center justify-between px-4 desktop:max-w-6xl'}>
      <button title={'导航菜单'} className={'p-2 tablet:hidden'} onClick={() => setOpened((prev) => !prev)}>
        {opened ? <Close size={'sm'} /> : <Menu size={'sm'} />}
      </button>
      <Link to={''}>
        <HeaderBanner />
      </Link>
      <div className={'flex items-center gap-4'}>
        <div
          className={clsx(
            'absolute inset-x-0 top-[calc(4rem+1px)] z-20 h-screen bg-bg-default p-0 tablet:relative tablet:top-0 tablet:block tablet:h-auto tablet:bg-inherit',
            opened ? 'block' : 'hidden',
          )}
        >
          <HeaderNavMenu onClick={() => setOpened(false)} />
        </div>
        <div className={'flex flex-row items-center gap-1'}>
          <Button aspectSquare variant={'subtle'} color={'neutral'}>
            <UserCircle size={'sm'} />
          </Button>
          <ThemeSwitcher />
          <Tooltip.Root placement={'bottom'}>
            <Tooltip.Trigger asChild>
              <Button aspectSquare variant={'subtle'} color={'neutral'} asChild>
                <a
                  aria-label={'Go to Resolid Remix on Github'}
                  rel="noreferrer noopener"
                  target="_blank"
                  href={'https://github.com/huijiewei/resolid-remix'}
                >
                  <Github size={'sm'} />
                </a>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              访问 Github 上的 Resolid Remix
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
    </nav>
  );
};

const HeaderBanner = () => {
  const { darkMode } = useColorModeState();

  return <img height={30} width={130} alt={'Resolid Remix'} src={darkMode ? ResolidBannerDark : ResolidBanner} />;
};

const HeaderNavMenu = ({ onClick }: { onClick: MouseEventHandler<HTMLAnchorElement> }) => {
  return (
    <ul
      className={
        'mx-auto flex max-w-xs list-none flex-col p-4 font-medium tracking-wide tablet:max-w-none tablet:flex-row tablet:p-0'
      }
    >
      {[
        { name: '主页', href: '', end: true },
        { name: '组件库', href: 'ui' },
        { name: '论坛', href: 'forum' },
        { name: '博客', href: 'blog' },
        { name: '关于', href: 'about' },
      ].map((menu) => {
        return (
          <li key={menu.name}>
            <HistoryNavLink
              className={({ isActive }) => {
                return clsx('block p-2 text-lg hover:text-link-pressed tablet:px-4', isActive && 'text-link');
              }}
              onClick={onClick}
              to={menu.href}
              end={menu.end}
            >
              {menu.name}
            </HistoryNavLink>
          </li>
        );
      })}
    </ul>
  );
};
