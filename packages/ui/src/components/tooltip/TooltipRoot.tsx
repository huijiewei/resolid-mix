import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react';
import { __DEV__ } from '@resolid/mix-utils';
import { useMemo, useRef, type ReactNode } from 'react';
import { useDisclosure } from '../../hooks';
import type { Color } from '../../utils/types';
import { FloatingArrowProvider, type FloatingArrowContext } from '../floating/FloatingArrowContext';
import { FloatingReferenceProvider, type FloatingReferenceContext } from '../floating/FloatingReferenceContext';
import { TooltipFloatingProvider, type TooltipContext } from './TooltipContext';

export type TooltipProps = {
  /**
   * Color
   * @default 'neutral'
   */
  color?: Color;

  /**
   * Placement
   * @default 'auto'
   */
  placement?: 'auto' | Placement;

  /**
   * Opened
   */
  opened?: boolean;

  /**
   * Animation Duration
   * @default '250'
   */
  duration?: number;

  /**
   * @ignore
   */
  children?: ReactNode;
};

const tooltipColorStyles = {
  primary: {
    content: 'border-bg-primary-emphasis-hovered bg-bg-primary-emphasis-hovered',
    arrow: 'fill-bg-primary-emphasis-hovered [&>path:first-of-type]:stroke-bg-primary-emphasis-hovered',
  },
  neutral: {
    content: 'border-bg-neutral-emphasis-hovered bg-bg-neutral-emphasis-hovered',
    arrow: 'fill-bg-neutral-emphasis-hovered [&>path:first-of-type]:stroke-bg-neutral-emphasis-hovered',
  },
  success: {
    content: 'border-bg-success-emphasis-hovered bg-bg-success-emphasis-hovered',
    arrow: 'fill-bg-success-emphasis-hovered [&>path:first-of-type]:stroke-bg-success-emphasis-hovered',
  },
  warning: {
    content: 'border-bg-warning-emphasis-hovered bg-bg-warning-emphasis-hovered',
    arrow: 'fill-bg-warning-emphasis-hovered [&>path:first-of-type]:stroke-bg-warning-emphasis-hovered',
  },
  danger: {
    content: 'border-bg-danger-emphasis-hovered bg-bg-danger-emphasis-hovered',
    arrow: 'fill-bg-danger-emphasis-hovered [&>path:first-of-type]:stroke-bg-danger-emphasis-hovered',
  },
};

export const TooltipRoot = (props: TooltipProps) => {
  const { children, opened, duration = 250, placement = 'auto', color = 'neutral' } = props;

  const { opened: openedState, open, close } = useDisclosure({ opened });

  const arrowRef = useRef<SVGSVGElement>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      offset(8),
      placement == 'auto' ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
        padding: 4,
      }),
    ],
    open: openedState,
    onOpenChange: (opened) => {
      opened ? open() : close();
    },
    placement: placement == 'auto' ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context, { move: false }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const colorStyle = tooltipColorStyles[color];

  const referenceContext = useMemo<FloatingReferenceContext>(
    () => ({
      opened: openedState,
      setReference: refs.setReference,
      setPositionReference: refs.setPositionReference,
      getReferenceProps,
    }),
    [getReferenceProps, openedState, refs.setPositionReference, refs.setReference],
  );

  const floatingContext = useMemo<TooltipContext>(
    () => ({
      opened: openedState,
      duration,
      context,
      floatingStyles,
      setFloating: refs.setFloating,
      getFloatingProps,
      floatingClass: colorStyle.content,
    }),
    [openedState, duration, context, floatingStyles, refs.setFloating, getFloatingProps, colorStyle.content],
  );

  const arrowContext = useMemo<FloatingArrowContext>(
    () => ({
      context,
      setArrow: arrowRef,
      className: colorStyle.arrow,
    }),
    [colorStyle.arrow, context],
  );

  return (
    <FloatingArrowProvider value={arrowContext}>
      <FloatingReferenceProvider value={referenceContext}>
        <TooltipFloatingProvider value={floatingContext}>{children}</TooltipFloatingProvider>
      </FloatingReferenceProvider>
    </FloatingArrowProvider>
  );
};

if (__DEV__) {
  TooltipRoot.displayName = 'TooltipRoot';
}
