import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { BottomTabBar } from '../components/BottomTabBar';
import { Header } from '../components/Header';
import { QuickActionsSheet } from '../components/QuickActionsSheet';
import { NotificationsSheet } from '../components/NotificationsSheet';

// Mock notifications data
const initialNotifications = [
  {
    id: 1,
    type: 'workout' as const,
    title: 'Workout Reminder',
    message: 'Time for your evening yoga session! 🧘‍♀️',
    time: '10 min ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'achievement' as const,
    title: 'New Achievement Unlocked!',
    message: 'Congratulations! You completed 7 days streak 🔥',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'appointment' as const,
    title: 'Upcoming Session',
    message: 'Training with Olena starts in 2 hours',
    time: '2 hours ago',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    quickActions: [
      { id: 'on-time', label: 'Буду вовремя', variant: 'primary' as const },
      { id: 'late', label: 'Опаздываю', variant: 'secondary' as const },
      { id: 'cancel', label: 'Отменить', variant: 'danger' as const },
    ],
  },
  {
    id: 4,
    type: 'meal' as const,
    title: 'Meal Logged',
    message: 'You logged your lunch - 650 calories',
    time: '3 hours ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'health' as const,
    title: 'Heart Rate Alert',
    message: 'Your resting heart rate improved by 5 BPM this week!',
    time: '5 hours ago',
    isRead: true,
  },
  {
    id: 6,
    type: 'reminder' as const,
    title: 'Hydration Reminder',
    message: 'Don\'t forget to drink water! You\'re at 1.2L today 💧',
    time: '6 hours ago',
    isRead: true,
  },
];

export function UserLayout() {
  const location = useLocation();
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleQuickAction = (notificationId: number, actionId: string) => {
    // Handle quick action - for now just mark as read and show console
    console.log(`Quick action: ${actionId} for notification ${notificationId}`);
    handleMarkAsRead(notificationId);
    
    // You can add more logic here like API calls
    switch (actionId) {
      case 'on-time':
        // Send confirmation to trainer
        console.log('Confirmed: Will be on time');
        break;
      case 'late':
        // Notify trainer about delay
        console.log('Confirmed: Running late');
        break;
      case 'cancel':
        // Cancel appointment
        console.log('Cancelled appointment');
        handleDelete(notificationId);
        break;
    }
  };

  const handleHeaderQuickAction = (action: string) => {
    console.log('Header quick action:', action);
    // Dispatch custom event that pages can listen to
    window.dispatchEvent(new CustomEvent('headerQuickAction', { detail: action }));
  };

  return (
    <div className="h-dvh bg-bg-secondary flex justify-center overflow-hidden">
      {/* Mobile container - centered on larger screens */}
      <div className="relative w-full max-w-[600px] bg-bg-secondary h-dvh flex flex-col">
        {/* Header */}
        <Header
          notificationCount={unreadCount}
          onNotificationClick={() => setIsNotificationsOpen(true)}
          onQuickActionClick={handleHeaderQuickAction}
        />

        {/* Main content - scrollable area */}
        <main className="flex-1 overflow-y-auto pb-24">
          <Outlet />
        </main>

        {/* Bottom Tab Bar - fixed at bottom, centered */}
        <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center">
          <div className="w-full max-w-[600px]">
            <BottomTabBar onQuickActionClick={() => setIsQuickActionsOpen(true)} />
          </div>
        </div>

        {/* Quick Actions Bottom Sheet */}
        <QuickActionsSheet
          isOpen={isQuickActionsOpen}
          onClose={() => setIsQuickActionsOpen(false)}
        />

        {/* Notifications Bottom Sheet */}
        <NotificationsSheet
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onDelete={handleDelete}
          onQuickAction={handleQuickAction}
        />
      </div>
    </div>
  );
}