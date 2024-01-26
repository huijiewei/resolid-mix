import { Icon, type IconProps } from '@resolid-remix/ui';

export const Menu = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Icon>
  );
};