import { classed, type VariantProps } from '../../utils/classed';

export const buttonStyles = classed(
  [
    'inline-flex items-center justify-center',
    'select-none appearance-none outline-none',
    'whitespace-nowrap border transition-colors',
    'focus-visible:ring',
  ].join(' '),
  {
    variants: {
      color: {
        primary: 'focus-visible:ring-bg-primary-emphasis/35',
        neutral: 'focus-visible:ring-bg-neutral-emphasis/35',
        success: 'focus-visible:ring-bg-success-emphasis/35',
        warning: 'focus-visible:ring-bg-warning-emphasis/35',
        danger: 'focus-visible:ring-bg-danger-emphasis/35',
      },
      variant: {
        solid: 'text-fg-emphasized border-transparent',
        outline: 'bg-bg-default border-current',
        light: 'border-transparent',
        subtle: 'border-transparent bg-bg-default',
        link: 'border-transparent underline underline-offset-2',
      },
      size: {
        xs: 'h-6 text-sm',
        sm: 'h-7',
        md: 'h-8',
        lg: 'h-9',
        xl: 'h-10 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      aspectSquare: {
        true: 'aspect-square',
        false: 'px-4',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
      variant: 'solid',
      fullWidth: false,
      aspectSquare: false,
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'solid',
        className: 'bg-bg-primary-emphasis hover:bg-bg-primary-emphasis-hovered active:bg-bg-primary-emphasis-pressed',
      },
      {
        color: 'primary',
        variant: ['outline', 'subtle', 'light'],
        className: 'text-fg-primary',
      },
      {
        color: 'primary',
        variant: 'outline',
        className: 'hover:bg-bg-primary active:bg-bg-primary-hovered',
      },
      {
        color: 'primary',
        variant: 'light',
        className: 'bg-bg-primary hover:bg-bg-primary-hovered active:bg-bg-primary-pressed',
      },
      {
        color: 'primary',
        variant: 'subtle',
        className: 'hover:bg-bg-primary active:bg-bg-primary-hovered',
      },
      {
        color: 'primary',
        variant: 'link',
        className: 'hover:text-fg-primary-hovered active:text-fg-primary-pressed',
      },
      {
        color: 'neutral',
        variant: 'solid',
        className: 'bg-bg-neutral-emphasis hover:bg-bg-neutral-emphasis-hovered active:bg-bg-neutral-emphasis-pressed',
      },
      {
        color: 'neutral',
        variant: ['outline', 'subtle', 'light'],
        className: 'text-fg-default',
      },
      {
        color: 'neutral',
        variant: 'outline',
        className: 'hover:bg-bg-neutral active:bg-bg-neutral-hovered',
      },
      {
        color: 'neutral',
        variant: 'light',
        className: 'bg-bg-neutral hover:bg-bg-neutral-hovered active:bg-bg-neutral-pressed',
      },
      {
        color: 'neutral',
        variant: 'subtle',
        className: 'hover:bg-bg-neutral active:bg-bg-neutral-hovered',
      },
      {
        color: 'neutral',
        variant: 'link',
        className: 'hover:text-fg-neutral-hovered active:text-fg-neutral-pressed',
      },
      {
        color: 'success',
        variant: 'solid',
        className: 'bg-bg-success-emphasis hover:bg-bg-success-emphasis-hovered active:bg-bg-success-emphasis-pressed',
      },
      {
        color: 'success',
        variant: ['outline', 'subtle', 'light'],
        className: 'text-fg-success',
      },
      {
        color: 'success',
        variant: 'outline',
        className: 'hover:bg-bg-success active:bg-bg-success-hovered',
      },
      {
        color: 'success',
        variant: 'light',
        className: 'bg-bg-success hover:bg-bg-success-hovered active:bg-bg-success-pressed',
      },
      {
        color: 'success',
        variant: 'subtle',
        className: 'hover:bg-bg-success active:bg-bg-success-hovered',
      },
      {
        color: 'success',
        variant: 'link',
        className: 'hover:text-fg-success-hovered active:text-fg-success-pressed',
      },
      {
        color: 'warning',
        variant: 'solid',
        className: 'bg-bg-warning-emphasis hover:bg-bg-warning-emphasis-hovered active:bg-bg-warning-emphasis-pressed',
      },
      {
        color: 'warning',
        variant: ['outline', 'subtle', 'light'],
        className: 'text-fg-warning',
      },
      {
        color: 'warning',
        variant: 'outline',
        className: 'hover:bg-bg-warning active:bg-bg-warning-hovered',
      },
      {
        color: 'warning',
        variant: 'light',
        className: 'bg-bg-warning hover:bg-bg-warning-hovered active:bg-bg-warning-pressed',
      },
      {
        color: 'warning',
        variant: 'subtle',
        className: 'hover:bg-bg-warning active:bg-bg-warning-hovered',
      },
      {
        color: 'warning',
        variant: 'link',
        className: 'hover:text-fg-warning-hovered active:text-fg-warning-pressed',
      },
      {
        color: 'danger',
        variant: 'solid',
        className: 'bg-bg-danger-emphasis hover:bg-bg-danger-emphasis-hovered active:bg-bg-danger-emphasis-pressed',
      },
      {
        color: 'danger',
        variant: ['outline', 'subtle', 'light'],
        className: 'text-fg-danger',
      },
      {
        color: 'danger',
        variant: 'outline',
        className: 'hover:bg-bg-danger active:bg-bg-danger-hovered',
      },
      {
        color: 'danger',
        variant: 'light',
        className: 'bg-bg-danger hover:bg-bg-danger-hovered active:bg-bg-danger-pressed',
      },
      {
        color: 'danger',
        variant: 'subtle',
        className: 'hover:bg-bg-danger active:bg-bg-danger-hovered',
      },
      {
        color: 'danger',
        variant: 'link',
        className: 'hover:text-fg-danger-hovered active:text-fg-danger-pressed',
      },
      {
        size: 'xs',
        aspectSquare: false,
        className: 'px-2',
      },
      {
        size: 'sm',
        aspectSquare: false,
        className: 'px-3',
      },
      {
        size: 'xl',
        aspectSquare: false,
        className: 'px-5',
      },
    ],
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;
