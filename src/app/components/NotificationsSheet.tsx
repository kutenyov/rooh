import React from 'react';
import { Drawer } from 'vaul';
import { X, Check, Trash2, Dumbbell, Utensils, Trophy, Calendar, MessageCircle, Heart, Bell, Clock, XCircle, CheckCircle } from 'lucide-react';
import { Avatar } from './Avatar';
import { Button } from './Button';

interface QuickAction {
  id: string;
  label: string;
  icon?: React.ElementType;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface Notification {
  id: number;
  type: 'workout' | 'meal' | 'achievement' | 'appointment' | 'message' | 'reminder' | 'health';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  quickActions?: QuickAction[];
}

interface NotificationsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: number) => void;
  onQuickAction?: (notificationId: number, actionId: string) => void;
}

const notificationIcons = {
  workout: { icon: Dumbbell, color: 'text-brand-500', bg: 'bg-brand-100 dark:bg-brand-500/10' },
  meal: { icon: Utensils, color: 'text-warning', bg: 'bg-warning/10' },
  achievement: { icon: Trophy, color: 'text-success', bg: 'bg-success/10' },
  appointment: { icon: Calendar, color: 'text-info', bg: 'bg-info/10' },
  message: { icon: MessageCircle, color: 'text-brand-300', bg: 'bg-brand-100 dark:bg-brand-500/10' },
  reminder: { icon: Bell, color: 'text-warning', bg: 'bg-warning/10' },
  health: { icon: Heart, color: 'text-error', bg: 'bg-error/10' },
};

export function NotificationsSheet({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onQuickAction,
}: NotificationsSheetProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-surface dark:bg-surface rounded-t-[24px] z-50 flex flex-col max-h-[85vh]"
          style={{ boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.12)' }}
          aria-describedby="notifications-description"
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-border-primary rounded-full" />
          </div>

          {/* Header */}
          <div className="px-4 py-3 border-b border-border-primary flex items-center justify-between">
            <div>
              <Drawer.Title className="text-[20px] font-bold text-text-primary">
                Notifications
              </Drawer.Title>
              <Drawer.Description id="notifications-description" className="sr-only">
                View and manage your notifications
              </Drawer.Description>
              {unreadCount > 0 && (
                <p className="text-[13px] text-text-secondary mt-0.5">
                  {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center hover:bg-bg-hover transition-colors"
            >
              <X size={18} className="text-icon-secondary" />
            </button>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="px-4 py-2 border-b border-border-primary">
              <button
                onClick={onMarkAllAsRead}
                className="text-[13px] text-brand-300 dark:text-brand-500 font-semibold hover:opacity-80 transition-opacity flex items-center gap-1.5"
              >
                <Check size={16} />
                Mark all as read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-4">
                  <Bell size={28} className="text-icon-tertiary" />
                </div>
                <h3 className="text-text-primary font-semibold mb-1">No notifications</h3>
                <p className="text-[13px] text-text-secondary text-center">
                  You're all caught up! Check back later for updates.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border-primary">
                {notifications.map((notification) => {
                  const iconConfig = notificationIcons[notification.type];
                  const Icon = iconConfig.icon;

                  return (
                    <div
                      key={notification.id}
                      className={`px-4 py-4 transition-colors ${
                        !notification.isRead ? 'bg-brand-50/50 dark:bg-brand-500/5' : 'hover:bg-bg-secondary'
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Icon or Avatar */}
                        {notification.avatar ? (
                          <Avatar size="md" src={notification.avatar} alt={notification.title} />
                        ) : (
                          <div className={`w-10 h-10 rounded-full ${iconConfig.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={20} className={iconConfig.color} />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`text-[15px] font-semibold ${!notification.isRead ? 'text-text-primary' : 'text-text-secondary'}`}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 rounded-full bg-brand-300 dark:bg-brand-500 flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-[13px] text-text-secondary leading-[18px] mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] text-text-tertiary">{notification.time}</span>
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <button
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className="text-[12px] text-brand-300 dark:text-brand-500 font-medium hover:opacity-80 transition-opacity"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => onDelete(notification.id)}
                                className="p-1.5 rounded-lg hover:bg-bg-tertiary transition-colors"
                              >
                                <Trash2 size={14} className="text-icon-tertiary hover:text-error transition-colors" />
                              </button>
                            </div>
                          </div>
                          {notification.quickActions && notification.quickActions.length > 0 && (
                            <div className="flex gap-2 mt-3">
                              {notification.quickActions.map(action => {
                                const ActionIcon = action.icon;
                                return (
                                  <button
                                    key={action.id}
                                    onClick={() => onQuickAction?.(notification.id, action.id)}
                                    className={`
                                      flex-1 px-3 py-2 rounded-full text-[12px] font-semibold transition-all
                                      flex items-center justify-center gap-1.5
                                      ${action.variant === 'primary' 
                                        ? 'bg-success text-white hover:bg-success/90 dark:bg-success dark:hover:bg-success/90' 
                                        : action.variant === 'secondary'
                                        ? 'bg-bg-tertiary text-text-primary hover:bg-bg-hover border border-border-primary dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
                                        : action.variant === 'danger'
                                        ? 'bg-transparent text-error hover:bg-error/10 border border-error/30'
                                        : 'bg-bg-tertiary text-text-primary hover:bg-bg-hover'
                                      }
                                    `}
                                  >
                                    {ActionIcon && <ActionIcon size={14} />}
                                    <span className="truncate">{action.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-border-primary">
              <Button
                variant="ghost"
                fullWidth
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}