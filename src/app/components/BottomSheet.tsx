import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ isOpen, onClose, title, children, className }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[101] bg-bg-primary dark:bg-bg-primary rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col',
          className
        )}
        style={{
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-bg-secondary dark:bg-bg-secondary flex items-center justify-center hover:bg-bg-tertiary dark:hover:bg-border transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-4 pt-4">
          {children}
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}