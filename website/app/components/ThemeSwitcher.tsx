import { Button, clsx, DropdownMenu, useColorModeDispatch, useColorModeState } from '@resolid-mix/ui';
import { useEffect, useState } from 'react';
import { SpriteIcon } from '~/components/SpriteIcon';

const colorModes = {
  light: {
    label: '亮色模式',
    icon: 'sun',
  },
  dark: {
    label: '暗色模式',
    icon: 'moon',
  },
  system: {
    label: '跟随系统',
    icon: 'auto',
  },
};

type ColorMode = keyof typeof colorModes;

export const ThemeSwitcher = () => {
  const { colorMode } = useColorModeState();
  const { setColorMode } = useColorModeDispatch();

  const [colorModeState, setColorModeState] = useState(colorModes['system']);

  useEffect(() => {
    setColorModeState(colorModes[colorMode]);
  }, [colorMode]);

  return (
    <DropdownMenu.Root placement={'bottom'}>
      <DropdownMenu.Trigger asChild>
        <Button aria-label={'更改颜色模式'} color={'neutral'} variant={'subtle'} aspectSquare>
          <SpriteIcon name={colorModeState.icon} size={22} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={'z-50'}>
        <DropdownMenu.Arrow />
        {Object.keys(colorModes).map((key) => {
          const mode = colorModes[key as ColorMode];

          return (
            <DropdownMenu.Item
              key={key}
              className={clsx('my-1', colorMode == key && 'text-link')}
              onClick={() => {
                setColorMode(key as ColorMode);
              }}
            >
              <SpriteIcon name={mode.icon} className={'me-1.5'} />
              {mode.label}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
