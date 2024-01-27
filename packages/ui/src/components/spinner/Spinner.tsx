import { __DEV__ } from '@resolid-remix/utils';
import { forwardRef } from 'react';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';
import type { SpinnerStyles } from './Spinner.style';
import { spinnerStyles } from './Spinner.style';

export type SpinnerProps = {
  /**
   * Size
   * @default 'md'
   */
  size?: SpinnerStyles['size'];

  /**
   * Color
   * @default 'primary'
   */
  color?: SpinnerStyles['color'];
  /**
   * Label
   * @default 'Loading…'
   */
  label?: string;
};

export const Spinner = forwardRef<HTMLSpanElement, Props<'span', SpinnerProps>>((props, ref) => {
  const { label = 'Loading', className, size = 'md', color = 'primary', ...rest } = props;

  return (
    <span ref={ref} className={clsx(spinnerStyles({ color, size }), className)} {...rest}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </span>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}
