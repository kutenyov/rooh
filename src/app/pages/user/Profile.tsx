import React from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { ChevronRight } from 'lucide-react';

export function UserProfile() {
  return (
    <div className="min-h-full">
      <div className="px-4 py-6 space-y-6">
        {/* User Info */}
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar
            size="xl"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop"
            alt="Anna"
          />
          <div>
            <h2 className="text-text-primary mb-1">Anna Kovalenko</h2>
            <p className="text-sm text-text-secondary">anna.k@example.com</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-text-primary">Theme</span>
            <ThemeToggle />
          </div>
        </Card>

        {/* Settings Menu */}
        <div className="space-y-2">
          <Card className="flex items-center justify-between cursor-pointer hover:bg-bg-tertiary transition-colors">
            <span className="text-text-primary">My Specialists</span>
            <ChevronRight size={20} className="text-icon-secondary" />
          </Card>
          <Card className="flex items-center justify-between cursor-pointer hover:bg-bg-tertiary transition-colors">
            <span className="text-text-primary">Subscription</span>
            <ChevronRight size={20} className="text-icon-secondary" />
          </Card>
          <Card className="flex items-center justify-between cursor-pointer hover:bg-bg-tertiary transition-colors">
            <span className="text-text-primary">Privacy Settings</span>
            <ChevronRight size={20} className="text-icon-secondary" />
          </Card>
          <Card className="flex items-center justify-between cursor-pointer hover:bg-bg-tertiary transition-colors">
            <span className="text-text-primary">Notifications</span>
            <ChevronRight size={20} className="text-icon-secondary" />
          </Card>
        </div>
      </div>
    </div>
  );
}
