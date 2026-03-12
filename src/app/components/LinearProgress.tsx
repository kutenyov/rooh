import React from 'react';
import { cn } from '../../lib/utils';

interface LinearProgressProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'success' | 'warning' | 'error' | 'info' | 'orange';
  className?: string;
  showPercentage?: boolean;
}

export function LinearProgress({
  value,
  size = 'md',
  color = 'info',
  className,
  showPercentage = false,
}: LinearProgressProps) {
  const colorMap = {
    success: 'bg-[#4CAF50]',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    orange: 'bg-[#FF9800]',
  };

  const sizeMap = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-text-secondary" style={{ fontSize: '12px' }}>
            {Math.round(value)}%
          </span>
        </div>
      )}
      <div
        className={cn(
          'rounded-full bg-bg-tertiary dark:bg-border overflow-hidden',
          sizeMap[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            colorMap[color]
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}