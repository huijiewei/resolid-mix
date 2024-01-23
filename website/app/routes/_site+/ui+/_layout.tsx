import { Outlet } from '@remix-run/react';
import * as stylex from '@stylexjs/stylex';
import { HistoryLink } from '~/components/HistoryLink';

export const meta = () => {
  return [
    {
      title: '组件库',
    },
  ];
};

const styles = stylex.create({
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '70rem',
  },
});

export default function Layout() {
  return (
    <div {...stylex.props(styles.main)}>
      <div>
        <ul>
          <li>
            <HistoryLink to={'introduction'}>Introduction</HistoryLink>
          </li>
          <li>
            <HistoryLink to={'getting-started'}>Getting Started</HistoryLink>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
