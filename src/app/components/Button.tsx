import React from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-colors';
  
  const variantStyles = {
    primary: cn(
      'bg-brand-300 text-text-on-brand',
      'hover:bg-brand-700 active:bg-brand-700',
      'dark:bg-brand-500 dark:text-text-on-brand dark:hover:bg-brand-300 dark:active:bg-brand-300'
    ),
    secondary: cn(
      'bg-transparent border-[1.5px] border-brand-300 text-brand-300',
      'hover:bg-brand-100 active:bg-brand-100',
      'dark:border-brand-500 dark:text-brand-500',
      'dark:hover:bg-brand-500/10 dark:active:bg-brand-500/10'
    ),
    ghost: cn(
      'bg-transparent text-brand-300',
      'hover:bg-bg-secondary active:bg-bg-secondary',
      'dark:text-brand-500',
      'dark:hover:bg-surface dark:active:bg-surface'
    ),
    destructive: cn(
      'bg-error text-white',
      'hover:bg-[#C62828] active:bg-[#C62828]',
      'dark:bg-error dark:hover:bg-[#E53935] dark:active:bg-[#E53935]'
    ),
    danger: cn(
      'bg-red-500 text-white',
      'hover:bg-red-600 active:bg-red-700',
      'dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700'
    ),
  };

  const sizeStyles = {
    small: 'h-9 px-6',
    medium: 'h-11 px-6',
    large: 'h-[52px] px-6',
  };

  const disabledStyles = cn(
    'bg-bg-tertiary text-text-tertiary border-0',
    'dark:bg-bg-tertiary dark:text-text-tertiary',
    'cursor-not-allowed hover:bg-bg-tertiary dark:hover:bg-bg-tertiary'
  );

  return (
    <button
      className={cn(
        baseStyles,
        'rounded-[var(--radius-button)]',
        disabled ? disabledStyles : variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
}