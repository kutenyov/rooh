import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Home, Utensils, Calendar, User, Plus } from 'lucide-react';
import { Avatar } from './Avatar';

interface BottomTabBarProps {
  onQuickActionClick?: () => void;
}

export function BottomTabBar({ onQuickActionClick }: BottomTabBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const leftTabs = [
    {
      id: 'dashboard',
      path: '/',
      icon: Home,
      label: 'Dashboard',
    },
    {
      id: 'nutrition',
      path: '/nutrition',
      icon: Utensils,
      label: 'Nutrition',
    },
  ];

  const rightTabs = [
    {
      id: 'calendar',
      path: '/calendar',
      icon: Calendar,
      label: 'Calendar',
    },
    {
      id: 'profile',
      path: '/profile',
      icon: User,
      label: 'Profile',
      isAvatar: true,
    },
  ];

  const renderTab = (tab: any) => {
    const active = location.pathname === tab.path;
    const Icon = tab.icon;

    return (
      <button
        key={tab.id}
        onClick={() => navigate(tab.path)}
        className="flex flex-col items-center justify-center gap-1 py-2 flex-1 transition-all duration-300"
        aria-label={tab.label}
      >
        <div className="relative flex items-center justify-center h-10">
          {tab.isAvatar ? (
            <div className={`relative transition-all duration-300 ${active ? 'scale-110' : ''}`}>
              {active && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-300/30 to-brand-500/30 blur-lg" />
              )}
              <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop"
                alt="Profile"
              />
            </div>
          ) : Icon ? (
            <div className={`relative transition-all duration-300 ${active ? 'scale-110' : ''}`}>
              {active && (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-300/30 to-brand-500/30 blur-xl rounded-full" />
              )}
              <div className={`relative rounded-2xl p-2 transition-all duration-300 ${
                active 
                  ? 'bg-gradient-to-br from-brand-300/20 to-brand-500/20 backdrop-blur-sm' 
                  : 'bg-transparent'
              }`}>
                <Icon
                  size={22}
                  className={`relative z-10 transition-colors duration-300 ${
                    active ? 'text-brand-400 dark:text-brand-300' : 'text-icon-secondary'
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
              </div>
            </div>
          ) : null}
        </div>
        <span
          className={`text-[10px] font-semibold leading-[12px] transition-all duration-300 ${
            active ? 'text-brand-400 dark:text-brand-300' : 'text-icon-secondary'
          }`}
        >
          {tab.label}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full relative z-30">
      {/* Tab Bar with enhanced glassmorphism */}
      <div className="relative bg-surface/70 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/10 dark:border-white/5 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
          {/* Notch cutout using clip-path */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent dark:from-white/3"
            style={{
              clipPath: 'polygon(0 0, 0 100%, 43% 100%, 43% 0, 44% 0, 44% 20%, 46% 28%, 47% 32%, 49% 34%, 50% 35%, 51% 34%, 53% 32%, 54% 28%, 56% 20%, 56% 0, 57% 0, 57% 100%, 100% 100%, 100% 0)'
            }}
          />

          <div className="relative flex items-center h-[76px]">
            {/* Left tabs */}
            <div className="flex flex-1">
              {leftTabs.map(renderTab)}
            </div>

            {/* Center spacer for FAB - reduced width */}
            <div className="w-16" />

            {/* Right tabs */}
            <div className="flex flex-1">
              {rightTabs.map(renderTab)}
            </div>
          </div>
        </div>

        {/* FAB button with enhanced effects */}
        <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 z-10">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-300 to-brand-500 dark:from-brand-400 dark:to-brand-300 rounded-full blur-2xl opacity-60 animate-pulse" />
          
          <button
            onClick={onQuickActionClick}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-300 to-brand-500 dark:from-brand-500 dark:to-brand-300 flex items-center justify-center shadow-[0_8px_32px_rgba(159,213,38,0.5)] dark:shadow-[0_8px_32px_rgba(211,255,85,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 ring-[6px] ring-bg-secondary/90 backdrop-blur-sm"
            aria-label="Quick actions"
          >
            <Plus size={28} className="text-text-on-brand drop-shadow-lg" strokeWidth={2.5} />
          </button>
      </div>
    </div>
  );
}