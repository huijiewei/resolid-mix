import { clsx, Spinner } from '@resolid-remix/ui';
import { isNumber } from '@resolid-remix/utils';
import type { CSSProperties, HTMLProps } from 'react';

export const LazySpinner = (props: HTMLProps<HTMLDivElement>) => {
  const { className, height, style, ...rest } = props;

  return (
    <div
      style={
        {
          ...style,
          '--height-var': isNumber(height) ? `${height}px` : height,
        } as CSSProperties
      }
      className={clsx(
        'flex w-full items-center justify-center rounded bg-bg-subtle/30 text-lg text-fg-muted transition-opacity',
        height ? 'h-[--height-var]' : 'h-32',
        className,
      )}
      {...rest}
    >
      <Spinner color={'primary'} className={'me-2'} />
      正在加载
    </div>
  );
};
