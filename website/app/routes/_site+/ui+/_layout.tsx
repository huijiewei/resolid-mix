import { Outlet } from '@remix-run/react';
import { HistoryLink } from '~/components/HistoryLink';

export const meta = () => {
  return [
    {
      title: '组件库',
    },
  ];
};

export default function Layout() {
  return (
    <div className={'desktop:max-w-6xl mx-auto'}>
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
      <div className={'p-4'}>
        <Outlet />
      </div>
    </div>
  );
}
