import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { CircularProgress } from '../../components/CircularProgress';
import { ThreeQuarterCircleProgress } from '../../components/ThreeQuarterCircleProgress';
import { LinearProgress } from '../../components/LinearProgress';
import { Button } from '../../components/Button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Chip } from '../../components/Chip';
import { Plus, Search, TrendingUp, TrendingDown, Minus, Flame, Droplets, Apple, Coffee, Cookie, UtensilsCrossed, ChevronDown, Sparkles, ArrowRight, Beef, Wheat, Egg } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AddFoodSheet } from '../../components/nutrition/AddFoodSheet';
import { WaterSheet } from '../../components/nutrition/WaterSheet';
import { FoodDetailsSheet } from '../../components/nutrition/FoodDetailsSheet';
import { QuickLogSheet } from '../../components/nutrition/QuickLogSheet';
import fatIcon from '@/assets/20079a9356b149dcd970a4d50a9221e82c491450.png';

const weeklyCaloriesData = [
  { day: 'Mon', calories: 1800, goal: 2000 },
  { day: 'Tue', calories: 2100, goal: 2000 },
  { day: 'Wed', calories: 1900, goal: 2000 },
  { day: 'Thu', calories: 2200, goal: 2000 },
  { day: 'Fri', calories: 1950, goal: 2000 },
  { day: 'Sat', calories: 2400, goal: 2000 },
  { day: 'Sun', calories: 1700, goal: 2000 },
];

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  image?: string;
  // Micronutrients
  cholesterol?: number; // mg
  sodium?: number; // mg
  fiber?: number; // g
  sugar?: number; // g
}

interface Meal {
  id: string;
  name: string;
  icon: React.ElementType;
  time: string;
  items: FoodItem[];
  totalCalories: number;
}

const initialMeals: Meal[] = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: Coffee,
    time: '08:00',
    items: [
      {
        id: 1,
        name: 'Oatmeal with Berries',
        calories: 380,
        protein: 11,
        carbs: 68,
        fat: 8,
        time: '08:15',
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=200&h=200&fit=crop',
        cholesterol: 0,
        sodium: 80,
        fiber: 8,
        sugar: 15,
      },
      {
        id: 2,
        name: 'Greek Yogurt',
        calories: 190,
        protein: 20,
        carbs: 15,
        fat: 6,
        time: '08:30',
        cholesterol: 15,
        sodium: 60,
        fiber: 0,
        sugar: 10,
      },
    ],
    totalCalories: 570,
  },
  {
    id: 'lunch',
    name: 'Lunch',
    icon: UtensilsCrossed,
    time: '13:00',
    items: [
      {
        id: 3,
        name: 'Grilled Chicken Salad',
        calories: 420,
        protein: 40,
        carbs: 32,
        fat: 14,
        time: '13:20',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
        cholesterol: 95,
        sodium: 480,
        fiber: 5,
        sugar: 9,
      },
      {
        id: 4,
        name: 'Whole Grain Bread',
        calories: 150,
        protein: 6,
        carbs: 28,
        fat: 2.5,
        time: '13:25',
        cholesterol: 0,
        sodium: 200,
        fiber: 4,
        sugar: 4,
      },
    ],
    totalCalories: 570,
  },
  {
    id: 'snack',
    name: 'Snack',
    icon: Cookie,
    time: '16:00',
    items: [
      {
        id: 5,
        name: 'Protein Bar',
        calories: 250,
        protein: 20,
        carbs: 28,
        fat: 9,
        time: '16:10',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop',
        cholesterol: 5,
        sodium: 150,
        fiber: 3,
        sugar: 12,
      },
      {
        id: 6,
        name: 'Apple',
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3,
        time: '16:20',
        cholesterol: 0,
        sodium: 2,
        fiber: 4,
        sugar: 19,
      },
    ],
    totalCalories: 345,
  },
  {
    id: 'dinner',
    name: 'Dinner',
    icon: Apple,
    time: '19:00',
    items: [
      {
        id: 7,
        name: 'Salmon with Quinoa',
        calories: 550,
        protein: 45,
        carbs: 52,
        fat: 16,
        time: '19:20',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
        cholesterol: 85,
        sodium: 380,
        fiber: 6,
        sugar: 4,
      },
      {
        id: 8,
        name: 'Roasted Vegetables',
        calories: 120,
        protein: 4,
        carbs: 22,
        fat: 3.2,
        time: '19:25',
        cholesterol: 0,
        sodium: 50,
        fiber: 5,
        sugar: 8,
      },
      {
        id: 9,
        name: 'Avocado',
        calories: 160,
        protein: 2,
        carbs: 9,
        fat: 15,
        time: '19:30',
        cholesterol: 0,
        sodium: 7,
        fiber: 7,
        sugar: 1,
      },
    ],
    totalCalories: 830,
  },
];

export function UserNutrition() {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(
    new Set()
  );
  
  // Modal states
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isWaterOpen, setIsWaterOpen] = useState(false);
  const [isFoodDetailsOpen, setIsFoodDetailsOpen] = useState(false);
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [selectedMealForAdd, setSelectedMealForAdd] = useState<string | undefined>(undefined);
  const [selectedFoodForDetails, setSelectedFoodForDetails] = useState<{ food: FoodItem; mealId: string } | null>(null);
  const [waterIntake, setWaterIntake] = useState(1500);
  const waterGoal = 2500;

  const toggleMeal = (mealId: string) => {
    const newExpanded = new Set(expandedMeals);
    if (newExpanded.has(mealId)) {
      newExpanded.delete(mealId);
    } else {
      newExpanded.add(mealId);
    }
    setExpandedMeals(newExpanded);
  };

  // Handlers for modals
  const handleAddFood = (food: FoodItem, mealType: string, quantity: number) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newFood: FoodItem = {
      ...food,
      id: Date.now(),
      time: timeString,
    };

    setMeals(meals.map(meal => {
      if (meal.id === mealType) {
        return {
          ...meal,
          items: [...meal.items, newFood],
          totalCalories: meal.totalCalories + newFood.calories,
        };
      }
      return meal;
    }));
  };

  const handleUpdateFood = (foodId: number, multiplier: number) => {
    if (!selectedFoodForDetails) return;

    setMeals(meals.map(meal => {
      if (meal.id === selectedFoodForDetails.mealId) {
        const updatedItems = meal.items.map(item => {
          if (item.id === foodId) {
            const originalMultiplier = 1; // In real app, track this
            const ratio = multiplier / originalMultiplier;
            return {
              ...item,
              calories: Math.round(item.calories * ratio),
              protein: Math.round(item.protein * ratio * 10) / 10,
              carbs: Math.round(item.carbs * ratio * 10) / 10,
              fat: Math.round(item.fat * ratio * 10) / 10,
              cholesterol: item.cholesterol ? Math.round(item.cholesterol * ratio) : undefined,
              sodium: item.sodium ? Math.round(item.sodium * ratio) : undefined,
              fiber: item.fiber ? Math.round(item.fiber * ratio * 10) / 10 : undefined,
              sugar: item.sugar ? Math.round(item.sugar * ratio * 10) / 10 : undefined,
            };
          }
          return item;
        });

        return {
          ...meal,
          items: updatedItems,
          totalCalories: updatedItems.reduce((sum, item) => sum + item.calories, 0),
        };
      }
      return meal;
    }));
  };

  const handleDeleteFood = (foodId: number) => {
    if (!selectedFoodForDetails) return;

    setMeals(meals.map(meal => {
      if (meal.id === selectedFoodForDetails.mealId) {
        const updatedItems = meal.items.filter(item => item.id !== foodId);
        return {
          ...meal,
          items: updatedItems,
          totalCalories: updatedItems.reduce((sum, item) => sum + item.calories, 0),
        };
      }
      return meal;
    }));
  };

  const handleAddWater = (amount: number) => {
    setWaterIntake(prev => Math.min(waterGoal * 2, prev + amount));
  };

  const handleRemoveWater = () => {
    setWaterIntake(prev => Math.max(0, prev - 250));
  };

  const handleOpenAddFood = (mealId?: string) => {
    setSelectedMealForAdd(mealId);
    setIsAddFoodOpen(true);
  };

  const handleOpenFoodDetails = (food: FoodItem, mealId: string) => {
    setSelectedFoodForDetails({ food, mealId });
    setIsFoodDetailsOpen(true);
  };

  // Dynamic color based on percentage
  const getProgressColor = (percentage: number): 'success' | 'warning' | 'orange' | 'info' => {
    if (percentage < 70) return 'info'; // Недобор - синий
    if (percentage <= 100) return 'success'; // В цели - зеленый
    if (percentage <= 120) return 'warning'; // Небольшой перебор - желтый
    return 'orange'; // Превышение - мягкий оранжевый (вместо красного)
  };
  
  // Calculate total nutrition
  const totalCalories = meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const totalProtein = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((itemSum, item) => itemSum + item.protein, 0), 0
  );
  const totalCarbs = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((itemSum, item) => itemSum + item.carbs, 0), 0
  );
  const totalFat = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((itemSum, item) => itemSum + item.fat, 0), 0
  );

  // Calculate micronutrients
  const totalCholesterol = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((itemSum, item) => itemSum + (item.cholesterol || 0), 0), 0
  );
  const totalSodium = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((itemSum, item) => itemSum + (item.sodium || 0), 0), 0
  );
  const totalFiber = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((itemSum, item) => itemSum + (item.fiber || 0), 0), 0
  );
  const totalSugar = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((itemSum, item) => itemSum + (item.sugar || 0), 0), 0
  );

  const calorieGoal = 2000;
  const proteinGoal = 150;
  const carbsGoal = 250;
  const fatGoal = 67;

  // Micronutrient goals
  const cholesterolGoal = 300; // mg
  const sodiumGoal = 2300; // mg
  const fiberGoal = 30; // g
  const sugarGoal = 50; // g

  const calorieProgress = Math.round((totalCalories / calorieGoal) * 100);
  const remaining = calorieGoal - totalCalories;

  // Calculate progress percentages
  const proteinProgress = Math.round((totalProtein / proteinGoal) * 100);
  const carbsProgress = Math.round((totalCarbs / carbsGoal) * 100);
  const fatProgress = Math.round((totalFat / fatGoal) * 100);
  const cholesterolProgress = Math.round((totalCholesterol / cholesterolGoal) * 100);
  const sodiumProgress = Math.round((totalSodium / sodiumGoal) * 100);
  const fiberProgress = Math.round((totalFiber / fiberGoal) * 100);
  const sugarProgress = Math.round((totalSugar / sugarGoal) * 100);

  return (
    <div className="px-4 pt-2 pb-6 space-y-6">
      {/* Compact Promo Banner */}
      <div className="relative h-[100px] rounded-2xl overflow-hidden group cursor-pointer">
        {/* Background Image */}
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1638328740227-1c4b1627614d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbnV0cml0aW9uJTIwY29sb3JmdWwlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MzMzMTg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Nutrition Premium"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-brand-300/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} className="text-brand-300" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-white text-[15px] font-bold leading-[20px]">
                Premium Meal Plans
              </h4>
              <p className="text-white/80 text-[12px] leading-[16px]">
                Get personalized nutrition advice
              </p>
            </div>
          </div>
          
          <button className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[12px] font-semibold flex items-center gap-1.5 hover:bg-white/30 transition-colors flex-shrink-0">
            Try Free
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Header Stats with Macros */}
      <Card className={`${
        calorieProgress < 70 
          ? 'bg-info/10' 
          : calorieProgress <= 100 
            ? 'bg-success/10' 
            : calorieProgress <= 120 
              ? 'bg-warning/10' 
              : 'bg-orange/10'
      }`}>
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
                    {Math.round(totalProtein)}g / {proteinGoal}g
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
                    {Math.max(0, proteinGoal - Math.round(totalProtein))}g
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
                    {Math.round(totalCarbs)}g / {carbsGoal}g
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
                    {Math.max(0, carbsGoal - Math.round(totalCarbs))}g
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
                    {Math.round(totalFat)}g / {fatGoal}g
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
                    {Math.max(0, fatGoal - Math.round(totalFat))}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Water Intake */}
      <Card>
        <button 
          onClick={() => setIsWaterOpen(true)}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                <Droplets size={20} className="text-info" />
              </div>
              <div className="text-left">
                <h4 className="text-text-primary font-semibold">Water Intake</h4>
                <p className="text-[13px] text-text-secondary">{waterIntake}ml / {waterGoal}ml</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveWater();
                }}
                className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center hover:bg-bg-hover transition-colors"
              >
                <Minus size={16} className="text-text-primary" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddWater(250);
                }}
                className="w-8 h-8 rounded-full bg-brand-300 dark:bg-brand-500 flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Plus size={16} className="text-text-on-brand dark:text-text-on-brand" />
              </button>
            </div>
          </div>
        </button>
        <LinearProgress value={Math.round((waterIntake / waterGoal) * 100)} color="info" />
      </Card>

      {/* Weekly Chart */}
      <Card className="overflow-hidden">
        <h3 className="text-text-secondary mb-4">Weekly Overview</h3>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyCaloriesData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="nutritionCaloriesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-300)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--brand-300)" stopOpacity={0}/>
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
                key="nutrition-area-calories"
                type="monotone" 
                dataKey="calories" 
                stroke="var(--brand-300)" 
                strokeWidth={2}
                fill="url(#nutritionCaloriesGradient)"
                name="Calories"
              />
              <Area 
                key="nutrition-area-goal"
                type="monotone" 
                dataKey="goal" 
                stroke="var(--text-tertiary)" 
                strokeWidth={1}
                strokeDasharray="5 5"
                fill="none"
                name="Goal"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Meals List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-text-primary">Today's Meals</h3>
          <button className="text-sm text-icon-active hover:opacity-80 flex items-center gap-1">
            <Search size={16} />
            Search Food
          </button>
        </div>

        <div className="space-y-3">
          {meals.map((meal) => {
            const isExpanded = expandedMeals.has(meal.id);
            
            return (
              <Card key={meal.id}>
                {/* Header - Always Visible */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => toggleMeal(meal.id)}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <meal.icon size={20} className="text-brand-700 dark:text-brand-500" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="text-text-primary font-semibold">{meal.name}</h4>
                      <p className="text-[13px] text-text-secondary">{meal.time}</p>
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right mr-1">
                      <div className="text-text-primary font-semibold">{meal.totalCalories}</div>
                      <div className="text-[12px] text-text-secondary">kcal</div>
                    </div>
                    
                    {/* Quick Add Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAddFood(meal.id);
                      }}
                      className="w-8 h-8 rounded-full bg-brand-300 dark:bg-brand-500 flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
                    >
                      <Plus size={16} className="text-text-on-brand dark:text-text-on-brand" />
                    </button>
                  </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="mt-3">
                    {/* Food Items */}
                    {meal.items.length > 0 ? (
                      <div className="space-y-2 mb-3">
                        {meal.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleOpenFoodDetails(item, meal.id)}
                            className="w-full flex items-center gap-3 p-2 rounded-xl bg-bg-secondary dark:bg-bg-tertiary/50 hover:bg-bg-tertiary dark:hover:bg-border transition-colors"
                          >
                            {item.image ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <ImageWithFallback 
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-bg-tertiary flex items-center justify-center flex-shrink-0">
                                <Apple size={20} className="text-icon-secondary" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0 text-left">
                              <div className="text-text-primary font-medium text-[14px]">{item.name}</div>
                              <div className="text-[12px] text-text-secondary">
                                P: {item.protein}g  C: {item.carbs}g · F: {item.fat}g
                              </div>
                            </div>
                            <div className="text-text-primary font-semibold text-[14px] flex-shrink-0">
                              {item.calories}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-text-tertiary text-[13px]">
                        No items added yet
                      </div>
                    )}

                    {/* Add Food Button */}
                    <button 
                      onClick={() => handleOpenAddFood(meal.id)}
                      className="w-full py-2.5 rounded-xl border-2 border-dashed border-border-color text-text-secondary hover:border-brand-300 hover:text-brand-300 dark:hover:border-brand-500 dark:hover:text-brand-500 transition-colors flex items-center justify-center gap-2 text-[14px] font-medium"
                    >
                      <Plus size={16} />
                      Add Food
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Micronutrients */}
      <Card>
        <h3 className="text-text-secondary mb-4">Micronutrients</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Cholesterol</span>
              <span className="text-text-primary font-medium">{totalCholesterol}mg / {cholesterolGoal}mg</span>
            </div>
            <LinearProgress value={cholesterolProgress} color={getProgressColor(cholesterolProgress)} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Sodium</span>
              <span className="text-text-primary font-medium">{totalSodium}mg / {sodiumGoal}mg</span>
            </div>
            <LinearProgress value={sodiumProgress} color={getProgressColor(sodiumProgress)} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Fiber</span>
              <span className="text-text-primary font-medium">{totalFiber}g / {fiberGoal}g</span>
            </div>
            <LinearProgress value={fiberProgress} color={getProgressColor(fiberProgress)} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Sugar</span>
              <span className="text-text-primary font-medium">{totalSugar}g / {sugarGoal}g</span>
            </div>
            <LinearProgress value={sugarProgress} color={getProgressColor(sugarProgress)} />
          </div>
        </div>
      </Card>

      {/* Modals */}
      <AddFoodSheet 
        isOpen={isAddFoodOpen}
        onClose={() => setIsAddFoodOpen(false)}
        onAddFood={handleAddFood}
        mealId={selectedMealForAdd}
      />
      <WaterSheet 
        isOpen={isWaterOpen}
        onClose={() => setIsWaterOpen(false)}
        onAddWater={handleAddWater}
        onRemoveWater={handleRemoveWater}
        waterIntake={waterIntake}
        waterGoal={waterGoal}
      />
      <FoodDetailsSheet 
        isOpen={isFoodDetailsOpen}
        onClose={() => setIsFoodDetailsOpen(false)}
        onUpdateFood={handleUpdateFood}
        onDeleteFood={handleDeleteFood}
        food={selectedFoodForDetails?.food}
        mealId={selectedFoodForDetails?.mealId}
      />
      <QuickLogSheet 
        isOpen={isQuickLogOpen}
        onClose={() => setIsQuickLogOpen(false)}
        onAddFood={handleAddFood}
      />
    </div>
  );
}