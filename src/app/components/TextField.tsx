import React from 'react';
import { cn } from '../../lib/utils';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
}

export function TextField({
  className,
  startIcon,
  endIcon,
  error,
  helperText,
  ...props
}: TextFieldProps) {
  return (
    <div className="w-full">
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-secondary">
            {startIcon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-3 rounded-xl border transition-all',
            'bg-bg-secondary dark:bg-bg-secondary',
            'text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-error focus:ring-error/20'
              : 'border-border focus:border-brand-300 dark:focus:border-brand-500 focus:ring-brand-300/20 dark:focus:ring-brand-500/20',
            startIcon && 'pl-11',
            endIcon && 'pr-11',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-icon-secondary">
            {endIcon}
          </div>
        )}
      </div>
      {helperText && (
        <p className={cn('text-xs mt-1', error ? 'text-error' : 'text-text-secondary')}>
          {helperText}
        </p>
      )}
    </div>
  );
}