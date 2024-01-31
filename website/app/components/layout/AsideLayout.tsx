import { useState, type PropsWithChildren } from 'react';
import {
  AsideLayoutDispatchProvider,
  AsideLayoutStateProvider,
  useAsideLayoutDispatch,
} from '~/components/layout/AsideLayoutContext';
import { SpriteIcon } from '~/components/SpriteIcon';

const AsideBar = () => {
  const setOpen = useAsideLayoutDispatch();

  return (
    <div
      className={
        'fixed z-10 flex h-12 w-full items-center justify-between border-b bg-bg-default/75 px-2 backdrop-blur tablet:hidden'
      }
    >
      <button onClick={() => setOpen(true)} className={'flex items-center gap-1 p-2'}>
        <SpriteIcon name={'menu'} />
        <span>导航</span>
      </button>
    </div>
  );
};

export const AsideLayout = ({ children }: PropsWithChildren) => {
  const [opened, setOpened] = useState(false);

  return (
    <AsideLayoutDispatchProvider value={setOpened}>
      <AsideLayoutStateProvider value={opened}>
        <AsideBar />
        {children}
      </AsideLayoutStateProvider>
    </AsideLayoutDispatchProvider>
  );
};
