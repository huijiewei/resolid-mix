import { Outlet } from '@remix-run/react';
import { colors } from '@resolid-remix/stylex/colors.stylex';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '70rem',
  },
  footer: {
    borderTop: `1px solid ${colors.gray200}`,
    marginTop: '3rem',
    textAlign: 'center',
    fontSize: '0.85rem',
    paddingBottom: '1rem',
  },
  flag: {
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
});

export default function Layout() {
  return (
    <>
      <div {...stylex.props([styles.main])}>
        <Outlet />
      </div>
      <footer {...stylex.props([styles.footer])}>
        <p>Released under the MIT License</p>
        <p>
          Proudly made in
          <span {...stylex.props([styles.flag])} aria-label="中国" role="img">
            🇨🇳
          </span>
          by Resolid Tech, 2024
        </p>
      </footer>
    </>
  );
}
