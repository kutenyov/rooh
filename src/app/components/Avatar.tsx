import React from 'react';
import { cn } from '../../lib/utils';

export type AvatarSize = 'tiny' | 'sm' | 'small' | 'md' | 'medium' | 'large' | 'xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
}

export function Avatar({
  src,
  alt,
  initials,
  size = 'medium',
  online = false,
  className,
}: AvatarProps) {
  const sizeMap = {
    tiny: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    small: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    medium: 'w-10 h-10 text-sm',
    large: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const indicatorSizeMap = {
    tiny: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    small: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    medium: 'w-2.5 h-2.5',
    large: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden border-2 border-bg-primary dark:border-surface',
          'flex items-center justify-center',
          sizeMap[size],
          !src && 'bg-brand-100 dark:bg-brand-500/15'
        )}
      >
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <span className="font-bold text-brand-700 dark:text-brand-500">
            {initials || '?'}
          </span>
        )}
      </div>
      {online && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full',
            'bg-success border-2 border-bg-primary dark:border-surface',
            indicatorSizeMap[size]
          )}
        />
      )}
    </div>
  );
}