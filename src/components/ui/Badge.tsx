/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-display transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900',
        secondary:
          'border-transparent bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-slate-100',
        outline: 'text-slate-950 border-slate-200 dark:text-slate-100 dark:border-slate-800',
        accent:
          'border-transparent bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/10',
        gold:
          'border-transparent bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-500/20 dark:border-amber-500/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
