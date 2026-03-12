import React from 'react';
import { Card } from '../../components/Card';
import { CircularProgress } from '../../components/CircularProgress';
import { ThreeQuarterCircleProgress } from '../../components/ThreeQuarterCircleProgress';
import { LinearProgress } from '../../components/LinearProgress';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';
import { Chip } from '../../components/Chip';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Utensils, Users, Calendar as CalendarIcon, ArrowRight, Sparkles, Flame, Trophy, Droplets, Activity, Heart, Camera, Beef, Wheat } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import fatIcon from 'figma:asset/20079a9356b149dcd970a4d50a9221e82c491450.png';

const weeklyData = [
  { day: 'Mon', calories: 1800, steps: 8500 },
  { day: 'Tue', calories: 2100, steps: 10200 },
  { day: 'Wed', calories: 1900, steps: 7800 },
  { day: 'Thu', calories: 2200, steps: 12000 },
  { day: 'Fri', calories: 1950, steps: 9500 },
  { day: 'Sat', calories: 2400, steps: 15000 },
  { day: 'Sun', calories: 1700, steps: 6000 },
];

const recentActivities = [
  { id: 1, type: 'workout', title: 'Morning Yoga', time: '2 hours ago', icon: Activity, color: 'text-success' },
  { id: 2, type: 'meal', title: 'Healthy Breakfast', time: '4 hours ago', icon: Utensils, color: 'text-warning' },
  { id: 3, type: 'water', title: 'Hydration Goal', time: '5 hours ago', icon: Droplets, color: 'text-info' },
];

const recentMeals = [
  { id: 1, name: 'Breakfast', calories: 420, image: 'https://images.unsplash.com/photo-1642339800099-921df1a0a958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0JTIwYm93bCUyMHNtb290aGllfGVufDF8fHx8MTc3MzMyNzY5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: 2, name: 'Lunch', calories: 650, image: 'https://images.unsplash.com/photo-1760888549075-0b9727e07735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwZ3JpbGxlZCUyMGNoaWNrZW58ZW58MXx8fHwxNzczMzI3NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: 3, name: 'Snack', calories: 180, image: 'https://images.unsplash.com/photo-1772986799934-6d6209fe05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMG51dHMlMjBoZWFsdGh5JTIwc25hY2t8ZW58MXx8fHwxNzczMzI3NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
];

export function UserDashboard() {
  // Dynamic color based on percentage
  const getProgressColor = (percentage: number): 'success' | 'warning' | 'orange' | 'info' => {
    if (percentage < 70) return 'info'; // Недобор - синий
    if (percentage <= 100) return 'success'; // В цели - зеленый
    if (percentage <= 120) return 'warning'; // Небольшой перебор - желтый
    return 'orange'; // Превышение - мягкий оранжевый
  };

  // Nutrition stats
  const totalCalories = 1200;
  const totalProtein = 45;
  const totalCarbs = 120;
  const totalFat = 30;

  const calorieGoal = 2000;
  const proteinGoal = 150;
  const carbsGoal = 250;
  const fatGoal = 67;

  const calorieProgress = Math.round((totalCalories / calorieGoal) * 100);
  const proteinProgress = Math.round((totalProtein / proteinGoal) * 100);
  const carbsProgress = Math.round((totalCarbs / carbsGoal) * 100);
  const fatProgress = Math.round((totalFat / fatGoal) * 100);

  return (
    <div className="px-4 pt-2 pb-6 space-y-6">
      {/* Hero Banner */}
      <div className="relative h-[180px] rounded-3xl overflow-hidden group cursor-pointer">
        {/* Background Image */}
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1750521280945-c533966f103c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbW90aXZhdGlvbiUyMHdvcmtvdXQlMjBlbmVyZ3l8ZW58MXx8fHwxNzczMzI3MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fitness Motivation"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles size={20} className="text-brand-300 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <div className="flex-1">
              <h3 className="text-white text-[18px] font-bold leading-[24px] mb-1">
                Your Daily Goal is 80% Complete!
              </h3>
              <p className="text-white/90 text-[13px] leading-[18px]">
                Keep pushing! You're doing amazing today 💪
              </p>
            </div>
          </div>
          
          <button className="self-start mt-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[13px] font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors">
            View Details
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Calories Today Card */}
      <Card className={`${
        calorieProgress < 70 
          ? 'bg-info/10' 
          : calorieProgress <= 100 
            ? 'bg-success/10' 
            : calorieProgress <= 120 
              ? 'bg-warning/10' 
              : 'bg-orange/10'
      }`}>
        <h3 className="text-text-secondary mb-4">Calories Today</h3>
        <div className="flex items-center gap-4">
          {/* Three Quarter Circle Progress with percentage below - Dynamic color based on % */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <ThreeQuarterCircleProgress value={calorieProgress} size={110} strokeWidth={10} color={getProgressColor(calorieProgress)}>
              <div className="text-center">
                <div className="text-[28px] font-bold leading-[32px] text-text-primary">
                  {totalCalories}
                </div>
                <div className="text-[11px] text-text-secondary mt-0.5">КСа/Day</div>
              </div>
            </ThreeQuarterCircleProgress>
            <div className={`text-[18px] font-bold -mt-6 ${
              calorieProgress < 70 
                ? 'text-info' 
                : calorieProgress <= 100 
                  ? 'text-success' 
                  : calorieProgress <= 120 
                    ? 'text-warning' 
                    : 'text-orange'
            }`}>
              {calorieProgress}%
            </div>
          </div>

          {/* Macros - No individual backgrounds */}
          <div className="flex-1 space-y-2">
            {/* Protein */}
            <div className="p-2.5 rounded-xl bg-surface/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-text-primary/5 flex items-center justify-center flex-shrink-0">
                  <Beef size={16} className="text-text-secondary" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-text-secondary uppercase tracking-wide">Protein</div>
                  <div className="text-[13px] text-text-primary font-semibold">
                    {totalProtein}g / {proteinGoal}g
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-text-tertiary">Left</div>
                  <div className={`text-[16px] font-bold ${
                    proteinProgress < 70 
                      ? 'text-info' 
                      : proteinProgress <= 100 
                        ? 'text-success' 
                        : proteinProgress <= 120 
                          ? 'text-warning' 
                          : 'text-orange'
                  }`}>
                    {Math.max(0, proteinGoal - totalProtein)}g
                  </div>
                </div>
              </div>
            </div>

            {/* Carbs */}
            <div className="p-2.5 rounded-xl bg-surface/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-text-primary/5 flex items-center justify-center flex-shrink-0">
                  <Wheat size={16} className="text-text-secondary" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-text-secondary uppercase tracking-wide">Carbs</div>
                  <div className="text-[13px] text-text-primary font-semibold">
                    {totalCarbs}g / {carbsGoal}g
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-text-tertiary">Left</div>
                  <div className={`text-[16px] font-bold ${
                    carbsProgress < 70 
                      ? 'text-info' 
                      : carbsProgress <= 100 
                        ? 'text-success' 
                        : carbsProgress <= 120 
                          ? 'text-warning' 
                          : 'text-orange'
                  }`}>
                    {Math.max(0, carbsGoal - totalCarbs)}g
                  </div>
                </div>
              </div>
            </div>

            {/* Fat */}
            <div className="p-2.5 rounded-xl bg-surface/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-text-primary/5 flex items-center justify-center flex-shrink-0">
                  <img src={fatIcon} alt="Fat" className="w-4 h-4 opacity-60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-text-secondary uppercase tracking-wide">Fat</div>
                  <div className="text-[13px] text-text-primary font-semibold">
                    {totalFat}g / {fatGoal}g
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-text-tertiary">Left</div>
                  <div className={`text-[16px] font-bold ${
                    fatProgress < 70 
                      ? 'text-info' 
                      : fatProgress <= 100 
                        ? 'text-success' 
                        : fatProgress <= 120 
                          ? 'text-warning' 
                          : 'text-orange'
                  }`}>
                    {Math.max(0, fatGoal - totalFat)}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Cards Row */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center">
              <Activity size={20} className="text-brand-700 dark:text-brand-500" />
            </div>
            <div className="flex-1">
              <div className="text-[20px] font-semibold text-text-primary">
                7,000
              </div>
              <div className="text-[12px] text-text-secondary">Steps</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
              <Droplets size={20} className="text-info" />
            </div>
            <div className="flex-1">
              <div className="text-[20px] font-semibold text-text-primary">
                1.5L
              </div>
              <div className="text-[12px] text-text-secondary">Water</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Streak and Heart Rate */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Flame size={20} className="text-warning" />
            </div>
            <div className="flex-1">
              <div className="text-[20px] font-semibold text-text-primary">
                12
              </div>
              <div className="text-[12px] text-text-secondary">Day Streak</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
              <Heart size={20} className="text-error" />
            </div>
            <div className="flex-1">
              <div className="text-[20px] font-semibold text-text-primary">
                72
              </div>
              <div className="text-[12px] text-text-secondary">BPM</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-text-primary">Today's Schedule</h3>
          <button className="text-sm text-icon-active hover:opacity-80">
            View all
          </button>
        </div>

        {/* Week Strip */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const isToday = index === 2; // Wednesday
            const date = 9 + index;
            return (
              <button
                key={day}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-[44px] h-[44px] rounded-xl transition-colors ${
                  isToday
                    ? 'bg-brand-300 text-text-on-brand'
                    : 'text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                <div className="text-[12px] leading-[16px]">{day}</div>
                <div className="text-[16px] leading-[22px] font-medium">{date}</div>
              </button>
            );
          })}
        </div>

        {/* Appointment Card */}
        <Card>
          <div className="flex items-start gap-3">
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop"
              alt="Olena K."
            />
            <div className="flex-1">
              <h4 className="text-text-primary font-semibold mb-1">
                Training with Olena
              </h4>
              <p className="text-sm text-text-secondary mb-2">16:00 - 17:00</p>
              <Chip variant="success" size="sm">
                Confirmed
              </Chip>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-text-primary mb-3">Quick Actions</h3>
        <div className="flex justify-around gap-4">
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105">
              <Utensils size={24} className="text-brand-700 dark:text-brand-500" />
            </div>
            <span className="text-[11px] text-text-secondary text-center leading-tight">
              Log Meal
            </span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105">
              <Users size={24} className="text-brand-700 dark:text-brand-500" />
            </div>
            <span className="text-[11px] text-text-secondary text-center leading-tight">
              Find Specialist
            </span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center transition-transform hover:scale-105">
              <CalendarIcon size={24} className="text-brand-700 dark:text-brand-500" />
            </div>
            <span className="text-[11px] text-text-secondary text-center leading-tight">
              Book Session
            </span>
          </button>
        </div>
      </div>

      {/* Weekly Progress */}
      <Card className="overflow-hidden">
        <h3 className="text-text-secondary mb-4">Weekly Progress</h3>
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="dashboardCaloriesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-300)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--brand-300)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="dashboardStepsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                stroke="var(--text-secondary)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Area 
                key="area-calories"
                type="monotone" 
                dataKey="calories" 
                stroke="var(--brand-300)" 
                strokeWidth={2}
                fill="url(#dashboardCaloriesGradient)"
                name="Calories"
              />
              <Area 
                key="area-steps"
                type="monotone" 
                dataKey="steps" 
                stroke="var(--success)" 
                strokeWidth={2}
                fill="url(#dashboardStepsGradient)"
                name="Steps"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Activities */}
      <Card>
        <h3 className="text-text-secondary mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-tertiary/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                <activity.icon size={20} className={activity.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-text-primary font-medium">
                  {activity.title}
                </h4>
                <p className="text-[13px] text-text-secondary">
                  {activity.time}
                </p>
              </div>
              <ArrowRight size={16} className="text-icon-secondary flex-shrink-0" />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Meals */}
      <Card>
        <h3 className="text-text-secondary mb-4">Recent Meals</h3>
        <div className="grid grid-cols-3 gap-3">
          {recentMeals.map(meal => (
            <button 
              key={meal.id}
              className="flex flex-col gap-2 group cursor-pointer"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-tertiary">
                <ImageWithFallback 
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white text-[11px] font-semibold">{meal.name}</div>
                  <div className="text-white/90 text-[10px]">{meal.calories} KCal</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}