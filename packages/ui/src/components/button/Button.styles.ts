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
        solid: '',
        outline: '',
        light: '',
        subtle: 'border-transparent bg-bg-default',
        link: '',
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
