import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconPosition = 'left', className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-text-secondary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-icon-secondary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-12 px-4 rounded-[var(--radius-input)]',
              'bg-bg-secondary border-[1.5px] border-border',
              'text-text-primary placeholder:text-text-tertiary',
              'transition-colors',
              'focus:outline-none focus:bg-bg-primary focus:border-border-focus',
              'dark:bg-bg-tertiary dark:border-border dark:focus:bg-bg-secondary dark:focus:border-border-focus',
              error && 'border-error dark:border-error focus:border-error dark:focus:border-error',
              icon && iconPosition === 'left' && 'pl-12',
              icon && iconPosition === 'right' && 'pr-12',
              props.disabled && 'bg-bg-tertiary text-text-tertiary cursor-not-allowed dark:bg-bg-tertiary',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-icon-secondary">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-error" style={{ fontSize: '12px' }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
