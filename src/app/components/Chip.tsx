import React from 'react';
import { cn } from '../../lib/utils';

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  variant?: 'default' | 'status';
}

export function Chip({ selected = false, variant = 'default', className, children, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-3.5 py-1.5',
        'rounded-[var(--radius-chip)]',
        'transition-colors cursor-pointer',
        'text-text-secondary',
        !selected && 'bg-bg-secondary dark:bg-bg-tertiary',
        selected && cn(
          'bg-brand-100 text-text-primary border border-brand-300',
          'dark:bg-brand-500/15 dark:text-brand-500 dark:border-brand-500'
        ),
        className
      )}
      style={{ fontSize: '12px', fontWeight: 500 }}
      {...props}
    >
      {children}
    </div>
  );
}
