import { __DEV__, dataAttr } from '@resolid-remix/utils';
import { cloneElement, forwardRef, type ReactElement } from 'react';
import { useMergeRefs } from '../../hooks';
import { useFloatingReference } from './FloatingReferenceContext';

type FloatingTriggerProps = {
  children: ReactElement;
};

export const FloatingTrigger = forwardRef<HTMLDivElement, FloatingTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { setReference, getReferenceProps, opened } = useFloatingReference();

  const refs = useMergeRefs(setReference, ref);

  return cloneElement(children, {
    'data-active': dataAttr(opened),
    ref: refs,
    ...getReferenceProps({
      ...rest,
    }),
  });
});

if (__DEV__) {
  FloatingTrigger.displayName = 'FloatingTrigger';
}
