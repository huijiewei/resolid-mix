import { useListItem } from '@floating-ui/react';
import { __DEV__, ariaAttr, dataAttr } from '@resolid/mix-utils';
import { forwardRef } from 'react';
import { useMergeRefs } from '../../hooks';
import { clsx } from '../../utils/classed';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';
import { useFloatingReference } from '../floating/FloatingReferenceContext';
import type { AsChildProps, EmptyProps } from '../slot/Slot';
import { useMenuSelect } from './MenuContext';

export const MenuItemTrigger = forwardRef<HTMLButtonElement, AsChildProps<'button', EmptyProps, 'type' | 'role'>>(
  (props, ref) => {
    const { children, className, disabled, ...rest } = props;

    const { setReference, getReferenceProps, opened } = useFloatingReference();
    const { close } = useFloatingDispatch();

    const { getItemProps, activeIndex } = useMenuSelect();
    const { ref: itemRef, index } = useListItem();

    const isActive = index === activeIndex && index !== null;

    const refs = useMergeRefs(ref, itemRef, setReference);

    return (
      <button
        ref={refs}
        role={'menuitem'}
        type={'button'}
        disabled={disabled}
        aria-disabled={ariaAttr(disabled)}
        data-disabled={dataAttr(disabled)}
        data-opened={dataAttr(opened)}
        tabIndex={isActive ? 0 : -1}
        className={clsx(
          'flex w-full cursor-default items-center justify-between rounded px-2 py-1 pe-0 outline-none transition-colors',
          'focus:bg-bg-subtle disabled:text-fg-muted opened:[&:not(:focus)]:bg-bg-subtlest',
          className,
        )}
        {...getReferenceProps({
          ...rest,
          onKeyDown: (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              close();
            }
          },
        })}
        {...getItemProps({
          onClick: (event) => {
            event.stopPropagation();
          },
        })}
      >
        {children}
        <span className={clsx('ml-3', disabled ? 'text-fg-subtle' : 'text-fg-muted')}>
          <svg
            className={'h-4 w-4'}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    );
  },
);

if (__DEV__) {
  MenuItemTrigger.displayName = 'MenuItemTrigger';
}
