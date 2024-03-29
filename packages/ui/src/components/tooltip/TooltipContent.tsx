import { useTransitionStatus } from '@floating-ui/react';
import { __DEV__ } from '@resolid/mix-utils';
import { forwardRef, type CSSProperties } from 'react';
import { useMergeRefs } from '../../hooks';
import { clsx } from '../../utils/classed';
import { Portal } from '../portal/Portal';
import type { Props } from '../slot/Slot';
import { useTooltipFloating } from './TooltipContext';

export const TooltipContent = forwardRef<HTMLDivElement, Props<'div'>>((props, ref) => {
  const { children, className, ...rest } = props;

  const { floatingStyles, floatingClass, duration, setFloating, context, getFloatingProps } = useTooltipFloating();

  const refs = useMergeRefs(setFloating, ref);

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  return (
    <>
      {isMounted && (
        <Portal>
          <div
            className={clsx(
              'z-50 inline-block rounded border px-2 py-1 text-sm text-fg-emphasized shadow',
              floatingClass,
              'transition-opacity duration-[--duration-var]',
              status == 'open' ? 'opacity-1' : 'opacity-0',
              className,
            )}
            ref={refs}
            style={
              {
                ...floatingStyles,
                '--duration-var': `${duration}ms`,
              } as CSSProperties
            }
            {...getFloatingProps({
              ...rest,
            })}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
});

if (__DEV__) {
  TooltipContent.displayName = 'TooltipContent';
}
