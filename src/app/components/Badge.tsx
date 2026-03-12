import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  count?: number;
  variant?: 'notification' | 'dot';
  className?: string;
  children?: React.ReactNode;
}

export function Badge({ count, variant = 'notification', className, children }: BadgeProps) {
  if (variant === 'dot') {
    return (
      <div className={cn('w-1.5 h-1.5 rounded-full bg-brand-300 dark:bg-brand-500', className)} />
    );
  }

  // If used as wrapper with children
  if (children) {
    return (
      <div className="relative inline-block">
        {children}
        {count !== undefined && count > 0 && (
          <div
            className={cn(
              'absolute -top-1 -right-1',
              'min-w-[18px] h-[18px] px-1',
              'rounded-full bg-error',
              'flex items-center justify-center',
              'text-white font-bold',
              className
            )}
            style={{ fontSize: '11px' }}
          >
            {count > 99 ? '99+' : count}
          </div>
        )}
      </div>
    );
  }

  // Standalone badge
  return (
    <div
      className={cn(
        'min-w-[18px] h-[18px] px-1',
        'rounded-full bg-error',
        'flex items-center justify-center',
        'text-white font-bold',
        className
      )}
      style={{ fontSize: '11px' }}
    >
      {count !== undefined && (count > 99 ? '99+' : count)}
      {children}
    </div>
  );
}