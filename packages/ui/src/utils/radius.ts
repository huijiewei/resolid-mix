import type { BorderRadius } from '@resolid/mix-tailwind';
import { isBoolean, isNumber } from '@resolid/mix-utils';
import type { Styled } from './types';

export type Radius = boolean | number | BorderRadius;

const radiusStyles = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const toRounded = (radius: Radius): Styled => {
  if (isBoolean(radius)) {
    return {
      value: undefined,
      style: radius ? 'rounded' : undefined,
    };
  }

  if (isNumber(radius)) {
    const valid = radius > 0;

    return {
      value: valid ? `${radius}px` : undefined,
      style: valid ? 'rounded-[--rounded-var]' : undefined,
    };
  }

  return {
    value: undefined,
    style: radiusStyles[radius as BorderRadius],
  };
};
