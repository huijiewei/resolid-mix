import { Link, Outlet } from '@remix-run/react';
import { colors } from '@resolid-remix/stylex/colors.stylex';
import * as stylex from '@stylexjs/stylex';

import { Button } from '@resolid-remix/ui';
import { Github } from '~/assets/icons/Github';
import ResolidBanner from '~/assets/images/resolid-banner.svg';
import { HistoryNavLink } from '~/components/HistoryNavLink';

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
  link: {
    textDecoration: 'none',
    padding: '0.5rem',
    fontWeight: 'bold',
    color: {
      default: colors.gray700,
      ':hover': colors.blue500,
      ':active': colors.blue700,
    },
  },
  linkActive: {
    color: colors.blue500,
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
              <HistoryNavLink {...stylex.props(styles.link)} to={''} end>
                {({ isActive }) => <span {...stylex.props(isActive && styles.linkActive)}>主页</span>}
              </HistoryNavLink>
              <HistoryNavLink {...stylex.props(styles.link)} to={'ui'}>
                {({ isActive }) => <span {...stylex.props(isActive && styles.linkActive)}>组件库</span>}
              </HistoryNavLink>
              <HistoryNavLink {...stylex.props(styles.link)} to={'blog'}>
                {({ isActive }) => <span {...stylex.props(isActive && styles.linkActive)}>博客</span>}
              </HistoryNavLink>
              <HistoryNavLink {...stylex.props(styles.link)} to={'forum'}>
                {({ isActive }) => <span {...stylex.props(isActive && styles.linkActive)}>论坛</span>}
              </HistoryNavLink>
              <HistoryNavLink {...stylex.props(styles.link)} to={'about'}>
                {({ isActive }) => <span {...stylex.props(isActive && styles.linkActive)}>关于</span>}
              </HistoryNavLink>
            </div>
            <div>
              <Button variant={'subtle'} color={'gray'} aspectSquare asChild>
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
