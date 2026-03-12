import React from 'react';
import { cn } from '../../lib/utils';

interface SemicircleProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: 'brand' | 'info' | 'warning' | 'error';
  children?: React.ReactNode;
}

export function SemicircleProgress({
  value,
  size = 100,
  strokeWidth = 8,
  className,
  color = 'brand',
  children,
}: SemicircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  const colorMap = {
    brand: 'var(--brand-300)',
    info: 'var(--info)',
    warning: 'var(--warning)',
    error: 'var(--error)',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg 
        width={size} 
        height={size / 2 + strokeWidth / 2} 
        className="overflow-visible"
      >
        {/* Track */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ 
            transition: 'stroke-dashoffset 0.3s ease',
            transformOrigin: 'center',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        {children}
      </div>
    </div>
  );
}
