import React, { useState } from 'react';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { Input } from '../Input';
import { X, Calendar, Clock, MapPin, Video, User } from 'lucide-react';

interface AddEventSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent?: (event: any) => void;
}

const eventTypes = [
  { id: 'workout', label: 'Workout', color: 'success' },
  { id: 'consultation', label: 'Consultation', color: 'warning' },
  { id: 'workshop', label: 'Workshop', color: 'info' },
  { id: 'health', label: 'Health Check', color: 'error' },
];

export function AddEventSheet({ isOpen, onClose, onAddEvent }: AddEventSheetProps) {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('workout');
  const [date, setDate] = useState('2026-03-12');
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState('60');
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState('');
  const [trainerName, setTrainerName] = useState('');

  const handleSubmit = () => {
    const newEvent = {
      id: Date.now(),
      title,
      type: eventType,
      date,
      time,
      duration: `${duration} min`,
      isOnline,
      location: isOnline ? 'Online' : location,
      trainer: {
        name: trainerName || 'TBA',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
      },
      color: eventTypes.find(t => t.id === eventType)?.color || 'success',
    };

    onAddEvent?.(newEvent);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setTitle('');
    setEventType('workout');
    setDate('2026-03-12');
    setTime('09:00');
    setDuration('60');
    setIsOnline(false);
    setLocation('');
    setTrainerName('');
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className="px-6 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 -mx-6 px-6 pb-4 border-b border-border-color">
          <h2 className="text-[20px] font-semibold text-text-primary">Add New Event</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center hover:bg-bg-tertiary/70 transition-colors"
          >
            <X size={18} className="text-icon-primary" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Event Title */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Event Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Morning Yoga Session"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Event Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setEventType(type.id)}
                  className={`px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${
                    eventType === type.id
                      ? 'bg-brand-300 text-white'
                      : 'bg-surface text-text-secondary hover:bg-bg-tertiary'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-2">
                <Calendar size={14} className="inline mr-1" />
                Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-2">
                <Clock size={14} className="inline mr-1" />
                Time
              </label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Duration (minutes)
            </label>
            <div className="flex gap-2">
              {['30', '45', '60', '90', '120'].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    duration === dur
                      ? 'bg-brand-300 text-white'
                      : 'bg-surface text-text-secondary hover:bg-bg-tertiary'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Location Type Toggle */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Location Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsOnline(false)}
                className={`px-4 py-3 rounded-xl text-[13px] font-medium transition-all flex items-center justify-center gap-2 ${
                  !isOnline
                    ? 'bg-brand-300 text-white'
                    : 'bg-surface text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                <MapPin size={16} />
                In-Person
              </button>
              <button
                onClick={() => setIsOnline(true)}
                className={`px-4 py-3 rounded-xl text-[13px] font-medium transition-all flex items-center justify-center gap-2 ${
                  isOnline
                    ? 'bg-brand-300 text-white'
                    : 'bg-surface text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                <Video size={16} />
                Online
              </button>
            </div>
          </div>

          {/* Location Field (only for in-person) */}
          {!isOnline && (
            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-2">
                <MapPin size={14} className="inline mr-1" />
                Location
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Fitness Studio A"
              />
            </div>
          )}

          {/* Trainer/Specialist Name */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              <User size={14} className="inline mr-1" />
              Trainer/Specialist (Optional)
            </label>
            <Input
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              placeholder="e.g., Sarah Johnson"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button variant="secondary" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1"
          >
            Add Event
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
