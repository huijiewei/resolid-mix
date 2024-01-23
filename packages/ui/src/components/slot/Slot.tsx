import { __DEV__, hasOwnProperty, type Assign } from '@resolid-remix/utils';
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type FunctionComponentElement,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from 'react';
import { mergeRefs } from '../../hooks';

export type AsChildProps<T extends keyof JSX.IntrinsicElements, P extends object = never> = Assign<
  ComponentPropsWithoutRef<T>,
  P
> & {
  asChild?: boolean;
};

type SlotProps = {
  children: ReactNode;
};

export const Slot = forwardRef<unknown, SlotProps>((props, ref) => {
  const { children, ...rest } = props;

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...mergeProps(rest, children.props),
      ref: ref
        ? mergeRefs(ref, (children as FunctionComponentElement<unknown>).ref)
        : (children as FunctionComponentElement<unknown>).ref,
    });
  }

  return Children.count(children) > 1 ? Children.only(null) : null;
});

if (__DEV__) {
  Slot.displayName = 'Slot';
}

const mergeProps = <T extends HTMLAttributes<Element>>(base: T, overrides: T) => {
  const props = { ...base };

  for (const key in overrides) {
    if (!hasOwnProperty(overrides, key)) continue;

    if (key === 'className') {
      const prop = 'className';
      props[prop] = base[prop] ? `${base[prop]} ${overrides[prop]}` : overrides[prop];
      continue;
    }

    if (key === 'style') {
      const prop = 'style';
      props[prop] = base[prop] ? { ...base[prop], ...overrides[prop] } : overrides[prop];
      continue;
    }

    const overrideValue = overrides[key];

    if (typeof overrideValue === 'function' && key.startsWith('on')) {
      const baseValue = base[key];

      if (typeof baseValue === 'function') {
        type EventKey = Extract<keyof HTMLAttributes<Element>, `on${string}`>;
        props[key as EventKey] = (...args) => {
          overrideValue(...args);
          baseValue(...args);
        };
        continue;
      }
    }

    props[key] = overrideValue;
  }

  return props;
};