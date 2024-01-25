import { createContext } from '../../utils/context';
import type { ButtonStyleProps } from './Button.styles';

export type ButtonBaseProps = {
  /**
   * Size
   * @default 'md'
   */
  size?: ButtonStyleProps['size'];

  /**
   * Color
   * @default 'primary'
   */
  color?: ButtonStyleProps['color'];

  /**
   * Variant
   * @default 'solid'
   */
  variant?: ButtonStyleProps['variant'];

  /**
   * Disabled
   * @default false
   */
  disabled?: boolean;
};

export type ButtonGroupContext = ButtonBaseProps & {
  /**
   * Vertical
   * @default false
   */
  vertical?: boolean;
};

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { ButtonGroupProvider, useButtonGroup };
