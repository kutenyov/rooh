import React from 'react';
import { Bell, Plus, Search, Calendar as CalendarIcon, Settings, Activity } from 'lucide-react';
import { useLocation } from 'react-router';
import logo from '@/assets/267bfba205e7b111cd1cd8eed86a3e179c66d213.png';

interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onQuickActionClick?: (action: string) => void;
}

export function Header({
  title = 'Dashboard',
  showNotifications = true,
  notificationCount = 0,
  onNotificationClick,
  onQuickActionClick,
}: HeaderProps) {
  const location = useLocation();

  // Define quick actions for each page
  const getQuickActions = () => {
    switch (location.pathname) {
      case '/':
        return (
          <>
            <button
              className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Activity"
              onClick={() => onQuickActionClick?.('activity')}
            >
              <Activity size={18} className="text-brand-700 dark:text-brand-500" strokeWidth={2} />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Search"
              onClick={() => onQuickActionClick?.('search')}
            >
              <Search size={18} className="text-brand-700 dark:text-brand-500" strokeWidth={2} />
            </button>
          </>
        );
      case '/nutrition':
        return (
          <>
            <button
              className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Search Food"
              onClick={() => onQuickActionClick?.('search_food')}
            >
              <Search size={18} className="text-brand-700 dark:text-brand-500" strokeWidth={2} />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Add Meal"
              onClick={() => onQuickActionClick?.('add_meal')}
            >
              <Plus size={18} className="text-brand-700 dark:text-brand-500" strokeWidth={2} />
            </button>
          </>
        );
      case '/calendar':
        return (
          <>
            <button
              className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Search Events"
              onClick={() => onQuickActionClick?.('search_events')}
            >
              <Search size={18} className="text-brand-700 dark:text-brand-500" strokeWidth={2} />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Add Event"
              onClick={() => onQuickActionClick?.('add_event')}
            >
              <Plus size={18} className="text-brand-700 dark:text-brand-500" strokeWidth={2} />
            </button>
          </>
        );
      case '/profile':
        return (
          <button
            className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105"
            aria-label="Settings"
            onClick={() => onQuickActionClick?.('settings')}
          >
            <Settings size={18} className="text-brand-700 dark:text-brand-500" strokeWidth={2} />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <header className="h-[72px] px-4 pt-4 flex items-start justify-between bg-transparent">
      {/* App Logo */}
      <div className="flex items-center gap-2">
        <img 
          src={logo} 
          alt="Rooh" 
          className="h-10 w-auto object-contain"
        />
      </div>
      
      {/* Quick Actions + Notifications */}
      <div className="flex items-center gap-2">
        {getQuickActions()}
        
        {showNotifications && (
          <button
            onClick={onNotificationClick}
            className="relative w-9 h-9 rounded-full bg-bg-tertiary flex items-center justify-center transition-opacity hover:opacity-70"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-icon-primary" strokeWidth={2} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 bg-error text-white text-[11px] font-semibold rounded-full flex items-center justify-center">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}