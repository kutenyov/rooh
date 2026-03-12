import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight, Lock } from 'lucide-react';

export type CardVariant = 'default' | 'navigation' | 'locked';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  value?: string;
  progress?: React.ReactNode;
  lockText?: string;
}

export function Card({
  variant = 'default',
  icon,
  title,
  subtitle,
  value,
  progress,
  lockText,
  className,
  children,
  ...props
}: CardProps) {
  const isLocked = variant === 'locked';
  
  return (
    <div
      className={cn(
        'relative rounded-[var(--radius-card)] p-4',
        'bg-surface',
        'shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
        'dark:bg-surface dark:border dark:border-border dark:shadow-none',
        'transition-colors',
        className
      )}
      {...props}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-surface/50 dark:bg-surface/50 rounded-[var(--radius-card)] flex flex-col items-center justify-center z-10">
          <Lock className="w-6 h-6 text-icon-secondary mb-1" />
          {lockText && (
            <span className="text-text-tertiary" style={{ fontSize: '11px' }}>
              {lockText}
            </span>
          )}
        </div>
      )}
      
      <div className={cn('flex items-start gap-3', isLocked && 'opacity-50')}>
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 text-brand-700 dark:text-brand-500">
              {icon}
            </div>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-text-primary mb-0.5">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-text-secondary" style={{ fontSize: '12px' }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
        
        {value && (
          <div className="text-brand-300 dark:text-brand-500 font-bold flex-shrink-0">
            {value}
          </div>
        )}
        
        {progress && (
          <div className="flex-shrink-0">
            {progress}
          </div>
        )}
        
        {variant === 'navigation' && !isLocked && (
          <ChevronRight className="w-5 h-5 text-icon-secondary flex-shrink-0" />
        )}
      </div>
    </div>
  );
}
