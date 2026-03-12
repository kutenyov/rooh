import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Avatar } from '../../components/Avatar';
import { ChevronLeft, ChevronRight, Activity, Utensils, Users, Pill, Heart, Clock, MapPin, Video, User } from 'lucide-react';
import { AddEventSheet } from '../../components/calendar/AddEventSheet';

// Mock events data
const eventsData = [
  {
    id: 1,
    title: 'Morning Yoga Session',
    type: 'workout' as const,
    date: '2026-03-12',
    time: '07:00',
    duration: '60 min',
    trainer: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
    },
    location: 'Fitness Studio A',
    isOnline: false,
    color: 'success' as const,
  },
  {
    id: 2,
    title: 'Nutritionist Consultation',
    type: 'consultation' as const,
    date: '2026-03-12',
    time: '14:00',
    duration: '45 min',
    trainer: {
      name: 'Dr. Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
    },
    location: 'Online',
    isOnline: true,
    color: 'warning' as const,
  },
  {
    id: 3,
    title: 'HIIT Training',
    type: 'workout' as const,
    date: '2026-03-13',
    time: '18:00',
    duration: '45 min',
    trainer: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&h=120&fit=crop',
    },
    location: 'Fitness Studio B',
    isOnline: false,
    color: 'success' as const,
  },
  {
    id: 4,
    title: 'Meal Prep Workshop',
    type: 'workshop' as const,
    date: '2026-03-14',
    time: '10:00',
    duration: '120 min',
    trainer: {
      name: 'Chef Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    },
    location: 'Cooking Studio',
    isOnline: false,
    color: 'info' as const,
  },
  {
    id: 5,
    title: 'Cardio Check-up',
    type: 'health' as const,
    date: '2026-03-15',
    time: '09:30',
    duration: '30 min',
    trainer: {
      name: 'Dr. Lisa Brown',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop',
    },
    location: 'Medical Center',
    isOnline: false,
    color: 'error' as const,
  },
  {
    id: 6,
    title: 'Pilates Class',
    type: 'workout' as const,
    date: '2026-03-16',
    time: '17:00',
    duration: '60 min',
    trainer: {
      name: 'Olena Kovalenko',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    },
    location: 'Fitness Studio C',
    isOnline: false,
    color: 'success' as const,
  },
];

type EventType = 'all' | 'workout' | 'consultation' | 'workshop' | 'health';

const eventTypeFilters = [
  { id: 'all' as EventType, label: 'All', icon: null },
  { id: 'workout' as EventType, label: 'Workouts', icon: Activity },
  { id: 'consultation' as EventType, label: 'Consultations', icon: Users },
  { id: 'workshop' as EventType, label: 'Workshops', icon: Utensils },
  { id: 'health' as EventType, label: 'Health', icon: Heart },
];

export function UserCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 12)); // March 12, 2026
  const [selectedDate, setSelectedDate] = useState<string>('2026-03-12');
  const [filterType, setFilterType] = useState<EventType>('all');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [events, setEvents] = useState(eventsData);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = generateCalendarDays();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number | null) => {
    if (day) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setSelectedDate(dateStr);
    }
  };

  const getEventsForDate = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  const upcomingEvents = filteredEvents.filter(event => event.date >= selectedDate).slice(0, 5);

  const handleAddEvent = (newEvent: any) => {
    setEvents([...events, newEvent]);
  };

  // Listen for header quick actions
  useEffect(() => {
    const handleHeaderAction = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail === 'add_event') {
        setIsAddEventOpen(true);
      }
    };

    window.addEventListener('headerQuickAction', handleHeaderAction);
    return () => window.removeEventListener('headerQuickAction', handleHeaderAction);
  }, []);

  return (
    <div className="px-4 pt-2 pb-6 space-y-6">
      {/* Calendar Card */}
      <Card>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-semibold text-text-primary">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center hover:bg-bg-tertiary/70 transition-colors"
            >
              <ChevronLeft size={18} className="text-icon-primary" />
            </button>
            <button
              onClick={handleNextMonth}
              className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center hover:bg-bg-tertiary/70 transition-colors"
            >
              <ChevronRight size={18} className="text-icon-primary" />
            </button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-[11px] text-text-secondary font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dateStr = day 
              ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              : null;
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === '2026-03-12';
            const hasEvents = day && getEventsForDate(day).length > 0;

            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                disabled={!day}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[14px] transition-all ${
                  !day
                    ? 'invisible'
                    : isSelected
                      ? 'bg-brand-300 text-white font-semibold scale-105'
                      : isToday
                        ? 'bg-brand-100 dark:bg-brand-500/10 text-brand-700 dark:text-brand-500 font-semibold'
                        : 'text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <span>{day}</span>
                {hasEvents && (
                  <div className="flex gap-0.5 mt-0.5">
                    {getEventsForDate(day).slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          isSelected ? 'bg-white' : `bg-${event.color}`
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Event Type Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {eventTypeFilters.map(filter => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                filterType === filter.id
                  ? 'bg-brand-300 text-white'
                  : 'bg-surface text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              {Icon && <Icon size={16} strokeWidth={2} />}
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-text-primary mb-3">Upcoming Events</h3>
        <div className="space-y-3">
          {upcomingEvents.length === 0 ? (
            <Card>
              <p className="text-center text-text-secondary py-4">No events scheduled</p>
            </Card>
          ) : (
            upcomingEvents.map(event => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex gap-3">
                  {/* Event Color Indicator */}
                  <div className={`w-1 h-full bg-${event.color} rounded-full flex-shrink-0`} />

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h4 className="text-text-primary font-semibold mb-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[13px] text-text-secondary">
                          <Clock size={14} />
                          <span>{event.time} • {event.duration}</span>
                        </div>
                      </div>
                      <Chip variant={event.color} size="sm">
                        {event.type}
                      </Chip>
                    </div>

                    {/* Trainer Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar
                        size="sm"
                        src={event.trainer.avatar}
                        alt={event.trainer.name}
                      />
                      <span className="text-[13px] text-text-primary font-medium">
                        {event.trainer.name}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-[13px] text-text-secondary">
                      {event.isOnline ? (
                        <>
                          <Video size={14} />
                          <span>Online Session</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add Event Sheet */}
      <AddEventSheet
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}