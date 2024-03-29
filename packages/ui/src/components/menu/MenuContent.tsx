import { FloatingFocusManager, FloatingList, useTransitionStatus } from '@floating-ui/react';
import { __DEV__ } from '@resolid/mix-utils';
import { forwardRef, type CSSProperties } from 'react';
import { useMergeRefs } from '../../hooks';
import { clsx } from '../../utils/classed';
import { Portal } from '../portal/Portal';
import type { Props } from '../slot/Slot';
import { MenuSelectProvider, useMenuFloating } from './MenuContext';

export const MenuContent = forwardRef<HTMLDivElement, Props<'div'>>((props, ref) => {
  const { children, className, ...rest } = props;

  const {
    nested,
    tree,
    duration,
    floatingStyles,
    context,
    setFloating,
    getFloatingProps,
    elementsRef,
    getItemProps,
    activeIndex,
  } = useMenuFloating();

  const refs = useMergeRefs(setFloating, ref);

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  return (
    <>
      {isMounted && (
        <Portal>
          <FloatingFocusManager modal={false} initialFocus={nested ? -1 : 0} returnFocus={!nested} context={context}>
            <div
              className={clsx(
                'rounded border border-bg-muted bg-bg-default p-1.5 shadow outline-none',
                'transition-opacity duration-[--duration-var]',
                status == 'open' ? 'opacity-1' : 'opacity-0',
                className,
              )}
              ref={refs}
              style={{ ...floatingStyles, '--duration-var': `${duration}ms` } as CSSProperties}
              {...getFloatingProps({
                ...rest,
              })}
            >
              <MenuSelectProvider value={{ getItemProps, activeIndex, tree }}>
                <FloatingList elementsRef={elementsRef}>{children}</FloatingList>
              </MenuSelectProvider>
            </div>
          </FloatingFocusManager>
        </Portal>
      )}
    </>
  );
});

if (__DEV__) {
  MenuContent.displayName = 'MenuContent';
}
