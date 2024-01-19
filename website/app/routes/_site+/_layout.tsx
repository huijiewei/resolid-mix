import { Link, Outlet } from '@remix-run/react';
import { colors } from '@resolid-remix/stylex/colors.stylex';
import * as stylex from '@stylexjs/stylex';

import ResolidBanner from '~/assets/images/resolid-banner.svg';

const styles = stylex.create({
  headers: {
    position: 'fixed',
    borderBottom: `1px solid ${colors.gray200}`,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(6px)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '80rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    alignItems: 'center',
    height: '4rem',
  },
  main: {
    paddingTop: '4rem',
  },
});

export default function Layout() {
  return (
    <>
      <header {...stylex.props([styles.headers])}>
        <nav {...stylex.props([styles.nav])}>
          <div>
            <Link to={''}>
              <img width={129} alt={'Resolid Remix'} src={ResolidBanner} />
            </Link>
          </div>
          <div></div>
        </nav>
      </header>
      <div {...stylex.props([styles.main])}>
        <Outlet />
      </div>
    </>
  );
}
