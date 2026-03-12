import React from 'react';
import { cn } from '../../lib/utils';

interface ThreeQuarterCircleProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: 'brand' | 'info' | 'warning' | 'error' | 'orange' | 'success';
  children?: React.ReactNode;
}

export function ThreeQuarterCircleProgress({
  value,
  size = 120,
  strokeWidth = 10,
  className,
  color = 'brand',
  children,
}: ThreeQuarterCircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI * 0.75; // 270 degrees = 3/4 circle
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  const colorMap = {
    brand: 'var(--brand-300)',
    info: 'var(--info)',
    warning: 'var(--warning)',
    error: 'var(--error)',
    orange: 'var(--orange)',
    success: 'var(--success)',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg 
        width={size} 
        height={size} 
        className="overflow-visible"
        style={{ transform: 'rotate(135deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${radius * 2 * Math.PI}`}
          strokeLinecap="round"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${radius * 2 * Math.PI}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ 
            transition: 'stroke-dashoffset 0.3s ease',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}