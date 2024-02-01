import { clsx } from '@resolid-mix/ui';

const spriteIcons = import.meta.glob('../assets/icons/*.svg', { as: 'url', eager: true });

type SpriteIconProps = {
  name: string;
  size?: string | number;
  className?: string;
  group?: string;
};

export const SpriteIcon = (props: SpriteIconProps) => {
  const { name, group = 'common', size, className } = props;

  const groupModule = `../assets/icons/${group}.svg`;

  const sizeValue = size ?? '1.1em';

  return (
    <svg width={sizeValue} height={sizeValue} className={clsx('inline self-center', className)}>
      <use href={`${spriteIcons[groupModule]}#${name}`} />
    </svg>
  );
};
