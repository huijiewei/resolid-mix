import { __DEV__, dataAttr } from '@resolid-mix/utils';
import { forwardRef, useEffect, useRef } from 'react';
import { useMergeRefs } from '../../hooks';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';
import { useFloatingReference } from '../floating/FloatingReferenceContext';
import { Slot, type AsChildProps } from '../slot/Slot';

export const ContextMenuTrigger = forwardRef<HTMLDivElement, AsChildProps<'div'>>((props, ref) => {
  const { asChild, children, ...rest } = props;

  const { setPositionReference, opened } = useFloatingReference();
  const { open } = useFloatingDispatch();

  const contextRef = useRef<HTMLElement>();

  useEffect(() => {
    const elem = contextRef.current ?? window;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleContextMenu = (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      setPositionReference({
        getBoundingClientRect() {
          return {
            height: 0,
            width: 0,
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            right: e.clientX,
            bottom: e.clientY,
            left: e.clientX,
          };
        },
      });

      open?.();
    };

    elem.addEventListener('contextmenu', handleContextMenu);

    return () => {
      elem.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [open, setPositionReference]);

  const refs = useMergeRefs(contextRef, ref);

  if (children) {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp data-active={dataAttr(opened)} ref={refs} {...rest}>
        {children}
      </Comp>
    );
  }

  return null;
});

if (__DEV__) {
  ContextMenuTrigger.displayName = 'ContextMenuTrigger';
}
