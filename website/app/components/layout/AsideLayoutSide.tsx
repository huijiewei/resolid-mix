import { CloseButton, clsx } from '@resolid-remix/ui';
import { useAsideLayoutDispatch, useAsideLayoutState } from '~/components/layout/AsideLayoutContext';
import { AsideLayoutMenu, type AsideLayoutMenuProps } from './AsideLayoutMenu';

export const AsideLayoutSide = ({ menus }: AsideLayoutMenuProps) => {
  const opened = useAsideLayoutState();
  const setOpened = useAsideLayoutDispatch();

  return (
    <aside
      className={clsx(
        'overflow-y-auto overflow-x-hidden overscroll-contain scrollbar scrollbar-thin',
        'fixed bottom-0 top-16 w-52 border-e bg-bg-default tablet:bg-inherit',
        'z-10 tablet:z-0',
        'transition-transform duration-200 tablet:translate-x-0',
        opened ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <nav role={'navigation'} className={'relative'}>
        <CloseButton onClick={() => setOpened(false)} className={'fixed end-2 top-2 p-2 tablet:hidden'} />
        <AsideLayoutMenu menus={menus} />
      </nav>
    </aside>
  );
};
