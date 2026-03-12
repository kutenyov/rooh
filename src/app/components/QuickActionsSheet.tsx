import React from 'react';
import { Utensils, Droplet, Calendar, MapPin, Bot, X } from 'lucide-react';

interface QuickActionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  {
    id: 'food',
    icon: Utensils,
    label: 'Add Food',
    description: 'Log meal or snack',
    color: 'brand' as const,
  },
  {
    id: 'water',
    icon: Droplet,
    label: 'Log Water',
    description: 'Track hydration',
    color: 'info' as const,
  },
  {
    id: 'booking',
    icon: Calendar,
    label: 'Book Session',
    description: 'Trainer, doctor, massage',
    color: 'success' as const,
  },
  {
    id: 'venue',
    icon: MapPin,
    label: 'Find Venue',
    description: 'Gyms, clinics nearby',
    color: 'warning' as const,
  },
  {
    id: 'ai',
    icon: Bot,
    label: 'AI Assistant',
    description: 'Get personalized advice',
    color: 'brand' as const,
  },
];

const colorClasses = {
  brand: 'bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-500',
  info: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
  success: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400',
  warning: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400',
};

export function QuickActionsSheet({ isOpen, onClose }: QuickActionsSheetProps) {
  if (!isOpen) return null;

  const handleAction = (actionId: string) => {
    console.log('Action clicked:', actionId);
    onClose();
    // TODO: Navigate to respective screens
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-overlay z-40 transition-opacity"
        onClick={onClose}
        style={{
          animation: isOpen ? 'fadeIn 0.2s ease-out' : 'fadeOut 0.2s ease-out',
        }}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-[24px] z-50 max-w-[390px] mx-auto shadow-2xl"
        style={{
          animation: isOpen ? 'slideUp 0.3s ease-out' : 'slideDown 0.3s ease-out',
        }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-9 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-icon-secondary" />
          </button>
        </div>

        {/* Actions List */}
        <div className="px-4 pb-6 space-y-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-bg-secondary transition-colors"
              >
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colorClasses[action.color]}`}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="flex-1 text-left">
                  <div className="text-base font-semibold text-text-primary">
                    {action.label}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {action.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  );
}
