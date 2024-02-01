import { __DEV__, ariaAttr } from '@resolid/mix-utils';
import { forwardRef, useCallback, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { useControllableState, useFormReset, useMergeRefs } from '../../hooks';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';
import { inputGroupStyle, inputSizeStyles } from './Input.style';
import { useInputGroup, type InputGroupContext } from './InputGroupContext';

export type InputProps = Partial<InputGroupContext> & {
  /**
   * Value
   */
  value?: string | number;

  /**
   * Default Value
   */
  defaultValue?: string | number;

  /**
   * Disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Required
   * @default false
   */
  required?: boolean;

  /**
   * Invalid
   * @default false
   */
  invalid?: boolean;

  /**
   * ReadOnly
   * @default false
   */
  readOnly?: boolean;

  /**
   * FullWidth
   * @default false
   */
  fullWidth?: boolean;

  /**
   * onChange callback
   */
  onChange?: (value: string | number) => void;

  /**
   * onClear callback
   */
  onClear?: () => void;

  /**
   * onPressEnter callback
   */
  onPressEnter?: () => void;

  /**
   * The native HTML size attribute to be passed to the input
   */
  htmlSize?: number;

  /**
   * Placeholder text
   */
  placeholder?: string;
};

export const Input = forwardRef<HTMLInputElement, Props<'input', InputProps>>((props, ref) => {
  const group = useInputGroup();

  const {
    size = group?.size ?? 'md',
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    fullWidth = false,
    className,
    value,
    defaultValue = '',
    onChange,
    onPressEnter,
    htmlSize,
    placeholder,
    ...rest
  } = props;

  const [state, setState] = useControllableState({ value, defaultValue: defaultValue, onChange });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      setState(event.target.value);
    },
    [readOnly, disabled, setState],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (event.key == 'Enter') {
        onPressEnter && onPressEnter();
      }
    },
    [onPressEnter],
  );

  const refs = useMergeRefs(inputRef, ref);

  useFormReset({
    ref: inputRef,
    handler: () => {
      setState(defaultValue);
    },
  });

  return (
    <input
      ref={refs}
      className={clsx(
        'resize-none appearance-none text-left outline-none',
        'rounded border bg-bg-default transition-colors',
        'disabled:cursor-not-allowed disabled:bg-bg-subtlest disabled:opacity-50',
        'focus:border-bg-primary-emphasis focus:ring-1 focus:ring-bg-primary-emphasis',
        inputSizeStyles[size],
        fullWidth ? 'w-full' : 'w-full',
        invalid && 'border-border-invalid',
        !disabled && !invalid && 'hover:border-border-hovered',
        group && inputGroupStyle,
        className,
      )}
      size={htmlSize}
      placeholder={placeholder}
      aria-invalid={ariaAttr(invalid)}
      aria-readonly={ariaAttr(readOnly)}
      aria-required={ariaAttr(required)}
      aria-disabled={ariaAttr(disabled)}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={state}
      {...rest}
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}
