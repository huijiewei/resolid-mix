import { Link, Outlet } from '@remix-run/react';
import { colors } from '@resolid-remix/stylex/colors.stylex';
import * as stylex from '@stylexjs/stylex';

import { Button } from '@resolid-remix/ui';
import ResolidBanner from '~/assets/images/resolid-banner.svg';
import { HistoryNavLink } from '~/components/HistoryNavLink';
import { Github } from '~/icons/Github';

const styles = stylex.create({
  headers: {
    position: 'fixed',
    borderBottom: `1px solid ${colors.gray200}`,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: `rgb(from ${colors.white} r g b / 75%)`,
    backdropFilter: 'blur(6px)',
    zIndex: 20,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '70rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    alignItems: 'center',
    height: '4rem',
  },
  banner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  menu: {
    display: 'flex',
    gap: '1rem',
  },
  main: {
    paddingTop: '4rem',
  },
});

export default function Layout() {
  return (
    <>
      <header {...stylex.props(styles.headers)}>
        <nav {...stylex.props(styles.nav)}>
          <div {...stylex.props(styles.banner)}>
            <Link to={''}>
              <img width={130} height={30} alt={'Resolid Remix'} src={ResolidBanner} />
            </Link>
          </div>
          <div {...stylex.props(styles.banner)}>
            <div {...stylex.props(styles.menu)}>
              <HistoryNavLink to={''}>主页</HistoryNavLink>
              <HistoryNavLink to={'ui'}>组件库</HistoryNavLink>
              <HistoryNavLink to={'blog'}>博客</HistoryNavLink>
              <HistoryNavLink to={'forum'}>论坛</HistoryNavLink>
              <HistoryNavLink to={'about'}>关于</HistoryNavLink>
            </div>
            <div>
              <Button variant={'subtle'} color={'gray'} asChild>
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
      <div {...stylex.props([styles.main])}>
        <Outlet />
      </div>
    </>
  );
}
