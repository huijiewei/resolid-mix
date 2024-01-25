import { createContext } from '../../utils/context';
import type { ButtonStyles } from './Button.styles';

export type ButtonBaseProps = {
  /**
   * Size
   * @default 'md'
   */
  size?: ButtonStyles['size'];

  /**
   * Color
   * @default 'primary'
   */
  color?: ButtonStyles['color'];

  /**
   * Variant
   * @default 'solid'
   */
  variant?: ButtonStyles['variant'];

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
