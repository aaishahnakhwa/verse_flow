/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold-500/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer duration-200 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-600 font-semibold shadow-xs',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-950 dark:text-slate-100',
        outline: 'border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 dark:border-gold-500/20 dark:bg-[#11141a] dark:hover:bg-gold-950/20 dark:hover:text-gold-200 dark:text-stone-300 shadow-xs',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200/80 dark:bg-gold-950/30 dark:text-gold-200 dark:border dark:border-gold-500/10 dark:hover:bg-gold-950/50',
        ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-gold-950/20 dark:hover:text-gold-200 dark:text-stone-400',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        accent: 'bg-gold-500 text-slate-950 hover:bg-gold-600 font-bold dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-slate-950 shadow-md hover:shadow-gold-500/15 hover:translate-y-[-1px]',
        gold: 'bg-gold-600 text-white hover:bg-gold-700 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-600 font-semibold shadow-xs hover:shadow-gold-500/10 hover:translate-y-[-1px]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
