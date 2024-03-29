import { __DEV__, dataAttr } from '@resolid/mix-utils';
import { forwardRef, type JSX } from 'react';
import { clsx } from '../../utils/classed';
import { Slot, type AsChildProps } from '../slot/Slot';
import { buttonStyles } from './Button.styles';
import { useButtonGroup, type ButtonBaseProps } from './ButtonGroupContext';
import { ButtonSpinner } from './ButtonSpinner';

export type ButtonProps = ButtonBaseProps & {
  /**
   * 是否激活
   * @default false
   */
  active?: boolean;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 是否方形按钮
   * @default false
   */
  aspectSquare?: boolean;

  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;

  /**
   * 加载文本
   * @default ''
   */
  loadingText?: string;

  /**
   * 加载器
   * @default Spinner
   */
  spinner?: JSX.Element;

  /**
   * 加载器位置
   * @default 'start'
   */
  spinnerPlacement?: 'start' | 'end';
};

export const Button = forwardRef<HTMLButtonElement, AsChildProps<'button', ButtonProps>>((props, ref) => {
  const group = useButtonGroup();

  const {
    asChild,
    color = group?.color ?? 'primary',
    size = group?.size ?? 'md',
    variant = group?.variant ?? 'solid',
    type,
    active = false,
    disabled = false,
    fullWidth = false,
    aspectSquare = false,
    loading = false,
    loadingText,
    spinner,
    spinnerPlacement = 'start',
    className,
    children,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={clsx(
        buttonStyles({ variant, size, color, disabled, loading, aspectSquare, fullWidth }),
        group
          ? group.vertical
            ? 'border-y-[0.5px] first:rounded-t first:border-t last:rounded-b last:border-b'
            : 'border-x-[0.5px] first:rounded-s first:border-s last:rounded-e last:border-e'
          : 'rounded',
        className,
      )}
      type={type ?? asChild ? undefined : 'button'}
      ref={ref}
      disabled={Boolean(disabled) || loading}
      data-active={dataAttr(active)}
      {...rest}
    >
      {loading ? (
        <div
          className={clsx(
            'relative inline-flex items-center justify-center gap-2',
            loadingText && spinnerPlacement == 'end' && 'flex-row-reverse',
          )}
        >
          <ButtonSpinner label={loadingText} size={size}>
            {spinner}
          </ButtonSpinner>
          {loadingText || <span className={'opacity-0'}>{children}</span>}
        </div>
      ) : (
        children
      )}
    </Comp>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
