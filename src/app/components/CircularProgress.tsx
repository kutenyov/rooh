import React from 'react';
import { cn } from '../../lib/utils';

export type ProgressSize = 'sm' | 'md' | 'lg' | 'xl' | 'small' | 'medium' | 'large';

interface CircularProgressProps {
  value: number; // 0-100
  size?: ProgressSize;
  label?: string;
  className?: string;
  color?: 'brand' | 'info' | 'warning' | 'error';
  showLabel?: boolean;
  children?: React.ReactNode;
}

export function CircularProgress({
  value,
  size = 'large',
  label,
  className,
  color = 'brand',
  showLabel = true,
  children,
}: CircularProgressProps) {
  const sizeMap = {
    sm: { diameter: 32, stroke: 4, fontSize: '10px' },
    small: { diameter: 32, stroke: 4, fontSize: '10px' },
    md: { diameter: 48, stroke: 5, fontSize: '12px' },
    medium: { diameter: 48, stroke: 5, fontSize: '12px' },
    lg: { diameter: 80, stroke: 6, fontSize: '16px' },
    large: { diameter: 80, stroke: 6, fontSize: '16px' },
    xl: { diameter: 100, stroke: 8, fontSize: '20px' },
  };

  const { diameter, stroke, fontSize } = sizeMap[size];
  const radius = (diameter - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  const colorMap = {
    brand: 'var(--brand-300)',
    info: 'var(--info)',
    warning: 'var(--warning)',
    error: 'var(--error)',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={diameter} height={diameter} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ? (
          children
        ) : showLabel ? (
          <>
            <span
              className="font-bold text-text-primary"
              style={{ fontSize }}
            >
              {Math.round(value)}%
            </span>
            {label && (
              <span
                className="text-text-secondary mt-0.5"
                style={{ fontSize: '10px' }}
              >
                {label}
              </span>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}