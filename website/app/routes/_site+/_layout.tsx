import { Link, Outlet, createPath, useFetcher, useLocation, type Location } from '@remix-run/react';
import { Avatar, Button, DropdownMenu, Tooltip, clsx, noScrollbarsClassName, useColorModeState } from '@resolid/mix-ui';
import { omit } from '@resolid/mix-utils';
import { Suspense, useState, type MouseEventHandler } from 'react';
import ResolidBannerDark from '~/assets/images/resolid-banner-dark.svg';
import ResolidBanner from '~/assets/images/resolid-banner.svg';
import { HistoryLink, HistoryNavLink } from '~/components/HistoryLink';
import { LazySpinner } from '~/components/LazySpinner';
import { SpriteIcon } from '~/components/SpriteIcon';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { useTypeRouteLoaderData } from '~/extensions/remix/useData';
import type { SessionUser } from '~/foundation/session.server';
import { userDisplayName, userIsAdmin } from '~/modules/user/userUtils';
import type { loader } from '~/root';

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
  const { user } = useTypeRouteLoaderData<{ user: SessionUser }, typeof loader>('root');
  const [opened, setOpened] = useState(false);

  return (
    <nav className={'mx-auto flex h-16 items-center justify-between px-4 desktop:max-w-6xl'}>
      <button title={'导航菜单'} className={'p-2 tablet:hidden'} onClick={() => setOpened((prev) => !prev)}>
        {opened ? <SpriteIcon name={'close'} size={'24'} /> : <SpriteIcon name={'menu'} size={'24'} />}
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
          <HeaderNavUser user={user} />
          <ThemeSwitcher />
          <Tooltip.Root placement={'bottom'}>
            <Tooltip.Trigger asChild>
              <Button aspectSquare variant={'subtle'} color={'neutral'} asChild>
                <a
                  aria-label={'Go to Resolid Mix on Github'}
                  rel="noreferrer noopener"
                  target="_blank"
                  href={'https://github.com/huijiewei/resolid-mix'}
                >
                  <SpriteIcon size={22} name={'github'} />
                </a>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              访问 Github 上的 Resolid Mix
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
    </nav>
  );
};

const HeaderBanner = () => {
  const { darkMode } = useColorModeState();

  return <img height={30} width={130} alt={'Resolid Mix'} src={darkMode ? ResolidBannerDark : ResolidBanner} />;
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

const HeaderNavUser = ({ user }: { user: SessionUser }) => {
  const location = useLocation();
  const fetcher = useFetcher();

  if (user) {
    return (
      <DropdownMenu.Root placement={'bottom'}>
        <DropdownMenu.Trigger asChild>
          <Button aspectSquare variant={'subtle'} color={'neutral'}>
            <Avatar size={26} src={user.avatar} name={userDisplayName(user)} />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={'z-50'}>
          <DropdownMenu.Arrow />
          <DropdownMenu.Item disabled>{user.email}</DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <HistoryLink to={`user/${user.username}`}>
              <SpriteIcon size={'1em'} name={'user'} className={'me-1.5'} />
              个人主页
            </HistoryLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <HistoryLink to={'settings'}>
              <SpriteIcon size={'1em'} name={'setting'} className={'me-1.5'} />
              用户设置
            </HistoryLink>
          </DropdownMenu.Item>
          {userIsAdmin(user) && (
            <DropdownMenu.Item asChild>
              <HistoryLink to={'/admin'} target={'_blank'}>
                <SpriteIcon name={'dashboard'} size={'1em'} className={'me-1.5'} />
                管理面板
              </HistoryLink>
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Divider />
          <DropdownMenu.Item
            onClick={() => {
              fetcher.submit(null, {
                method: 'post',
                action: '/logout',
              });
            }}
          >
            <SpriteIcon size={'1em'} name={'logout'} className={'me-1.5'} />
            退出登录
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }

  return (
    <Tooltip.Root placement={'bottom'}>
      <Tooltip.Trigger asChild>
        <Button asChild aspectSquare aria-label={'用户登录或注册'} color={'neutral'} variant={'subtle'}>
          <HistoryLink to={getLoginTo('login', location)}>
            <SpriteIcon name={'user'} size={22} />
          </HistoryLink>
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        用户登录或注册
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

const getLoginTo = (pathname: string, location: Location) => {
  const to = {
    pathname: pathname,
    search: location.search,
  };

  if (
    !location.pathname.endsWith('login') &&
    !location.pathname.endsWith('signup') &&
    !location.pathname.endsWith('forgot-password')
  ) {
    to.search = new URLSearchParams({ redirect: createPath(omit(location, ['hash'])) }).toString();
  }

  return to;
};
