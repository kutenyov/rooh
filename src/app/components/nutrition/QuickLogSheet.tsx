import React, { useState } from 'react';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { Clock, Star, Calendar, Flame, Coffee, UtensilsCrossed, Cookie, Apple } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize?: string;
  cholesterol?: number;
  sodium?: number;
  fiber?: number;
  sugar?: number;
}

interface QuickLogSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: FoodItem, mealType: string, quantity: number) => void;
}

// Mock recent foods
const recentFoods: FoodItem[] = [
  {
    id: 101,
    name: 'Oatmeal',
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 3,
    servingSize: '100g',
  },
  {
    id: 102,
    name: 'Greek Yogurt',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    servingSize: '100g',
  },
  {
    id: 103,
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    servingSize: '1 medium',
  },
];

// Mock favorite foods
const favoriteFoods: FoodItem[] = [
  {
    id: 201,
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    servingSize: '100g',
  },
  {
    id: 202,
    name: 'Brown Rice',
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fat: 0.9,
    servingSize: '100g',
  },
  {
    id: 203,
    name: 'Almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    servingSize: '100g',
  },
];

export function QuickLogSheet({ isOpen, onClose, onAddFood }: QuickLogSheetProps) {
  const [selectedTab, setSelectedTab] = useState<'recent' | 'favorites'>('recent');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  const tabs = [
    { id: 'recent' as const, label: 'Recent', icon: Clock },
    { id: 'favorites' as const, label: 'Favorites', icon: Star },
  ];

  const mealOptions = [
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'lunch', label: 'Lunch', icon: UtensilsCrossed },
    { id: 'snack', label: 'Snack', icon: Cookie },
    { id: 'dinner', label: 'Dinner', icon: Apple },
  ];

  const foods = selectedTab === 'recent' ? recentFoods : favoriteFoods;

  const handleAddFood = (food: FoodItem) => {
    onAddFood(food, selectedMeal, 1);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Quick Log">
      <div className="flex flex-col gap-4 pb-6">
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-bg-secondary dark:bg-bg-secondary rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-bg-primary dark:bg-bg-primary text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Meal selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Add to meal</label>
          <div className="grid grid-cols-4 gap-2">
            {mealOptions.map((meal) => {
              const Icon = meal.icon;
              return (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    selectedMeal === meal.id
                      ? 'bg-brand-300 dark:bg-brand-500 border-brand-300 dark:border-brand-500'
                      : 'bg-bg-secondary dark:bg-bg-secondary border-border'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mx-auto mb-1 ${
                      selectedMeal === meal.id ? 'text-white' : 'text-text-secondary'
                    }`}
                  />
                  <p
                    className={`text-xs font-medium ${
                      selectedMeal === meal.id ? 'text-white' : 'text-text-primary'
                    }`}
                  >
                    {meal.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Food list */}
        <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto">
          {foods.length > 0 ? (
            foods.map((food) => (
              <button
                key={food.id}
                onClick={() => handleAddFood(food)}
                className="bg-bg-secondary dark:bg-bg-secondary hover:bg-bg-tertiary dark:hover:bg-border rounded-xl p-3 border border-border transition-colors text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-text-primary">{food.name}</h4>
                    {food.servingSize && (
                      <p className="text-xs text-text-tertiary">{food.servingSize}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-brand-300 dark:text-brand-500">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-semibold">{food.calories}</span>
                  </div>
                </div>
                <div className="flex gap-3 text-xs text-text-secondary">
                  <span>P: {food.protein}g</span>
                  <span>C: {food.carbs}g</span>
                  <span>F: {food.fat}g</span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-text-tertiary">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p>No {selectedTab} foods</p>
              <p className="text-xs mt-1">Start logging to see them here</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-bg-secondary dark:bg-bg-secondary rounded-xl p-3 border border-border">
          <p className="text-xs text-text-secondary">
            💡 <span className="font-medium">Tip:</span>{' '}
            {selectedTab === 'recent'
              ? 'Your most recently logged foods appear here for quick access.'
              : 'Tap the star icon on any food to add it to favorites.'}
          </p>
        </div>
      </div>
    </BottomSheet>
  );
}