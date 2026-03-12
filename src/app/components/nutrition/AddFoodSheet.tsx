import React, { useState } from 'react';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { Chip } from '../Chip';
import { Search, Flame, Scale, Apple, Coffee, Cookie, UtensilsCrossed } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  cholesterol?: number;
  sodium?: number;
  fiber?: number;
  sugar?: number;
}

// Mock database of foods
const foodDatabase: FoodItem[] = [
  {
    id: 1,
    name: 'Oatmeal',
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 3,
    servingSize: '100g',
    cholesterol: 0,
    sodium: 5,
    fiber: 4,
    sugar: 1,
  },
  {
    id: 2,
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    servingSize: '100g',
    cholesterol: 85,
    sodium: 74,
    fiber: 0,
    sugar: 0,
  },
  {
    id: 3,
    name: 'Brown Rice',
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fat: 0.9,
    servingSize: '100g',
    cholesterol: 0,
    sodium: 5,
    fiber: 1.8,
    sugar: 0.4,
  },
  {
    id: 4,
    name: 'Greek Yogurt',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    servingSize: '100g',
    cholesterol: 5,
    sodium: 36,
    fiber: 0,
    sugar: 3.2,
  },
  {
    id: 5,
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    servingSize: '1 medium (118g)',
    cholesterol: 0,
    sodium: 1,
    fiber: 2.6,
    sugar: 12,
  },
  {
    id: 6,
    name: 'Salmon',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    servingSize: '100g',
    cholesterol: 55,
    sodium: 59,
    fiber: 0,
    sugar: 0,
  },
  {
    id: 7,
    name: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    servingSize: '100g',
    cholesterol: 0,
    sodium: 33,
    fiber: 2.6,
    sugar: 1.7,
  },
  {
    id: 8,
    name: 'Almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    servingSize: '100g',
    cholesterol: 0,
    sodium: 1,
    fiber: 12.5,
    sugar: 4.4,
  },
  {
    id: 9,
    name: 'Whole Wheat Bread',
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 3.4,
    servingSize: '100g',
    cholesterol: 0,
    sodium: 400,
    fiber: 7,
    sugar: 6,
  },
  {
    id: 10,
    name: 'Eggs',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    servingSize: '2 large',
    cholesterol: 372,
    sodium: 124,
    fiber: 0,
    sugar: 1.1,
  },
];

interface AddFoodSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: FoodItem, mealType: string, quantity: number) => void;
  mealId?: string;
}

export function AddFoodSheet({ isOpen, onClose, onAddFood, mealId }: AddFoodSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedMeal, setSelectedMeal] = useState(mealId || 'breakfast');
  const [quantity, setQuantity] = useState('1');

  const mealOptions = [
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'lunch', label: 'Lunch', icon: UtensilsCrossed },
    { id: 'snack', label: 'Snack', icon: Cookie },
    { id: 'dinner', label: 'Dinner', icon: Apple },
  ];

  const filteredFoods = foodDatabase.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedFood) {
      const multiplier = parseFloat(quantity) || 1;
      const adjustedFood = {
        ...selectedFood,
        calories: Math.round(selectedFood.calories * multiplier),
        protein: Math.round(selectedFood.protein * multiplier * 10) / 10,
        carbs: Math.round(selectedFood.carbs * multiplier * 10) / 10,
        fat: Math.round(selectedFood.fat * multiplier * 10) / 10,
        cholesterol: selectedFood.cholesterol ? Math.round(selectedFood.cholesterol * multiplier) : undefined,
        sodium: selectedFood.sodium ? Math.round(selectedFood.sodium * multiplier) : undefined,
        fiber: selectedFood.fiber ? Math.round(selectedFood.fiber * multiplier * 10) / 10 : undefined,
        sugar: selectedFood.sugar ? Math.round(selectedFood.sugar * multiplier * 10) / 10 : undefined,
      };
      onAddFood(adjustedFood, selectedMeal, multiplier);
      handleClose();
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedFood(null);
    setQuantity('1');
    if (!mealId) {
      setSelectedMeal('breakfast');
    }
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose} title="Add Food">
      <div className="flex flex-col gap-4 pb-6">
        {/* Search */}
        <TextField
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startIcon={<Search className="w-5 h-5" />}
        />

        {/* Food selection or list */}
        {selectedFood ? (
          <div className="flex flex-col gap-4">
            {/* Selected food card */}
            <div className="bg-bg-secondary dark:bg-bg-secondary rounded-2xl p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{selectedFood.name}</h3>
                  <p className="text-sm text-text-secondary">{selectedFood.servingSize}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFood(null)}
                >
                  Change
                </Button>
              </div>

              {/* Macros preview */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-bg-primary dark:bg-bg-primary rounded-xl p-2 text-center">
                  <Flame className="w-4 h-4 mx-auto mb-1 text-brand-300 dark:text-brand-500" />
                  <p className="text-xs font-semibold text-text-primary">
                    {Math.round(selectedFood.calories * (parseFloat(quantity) || 1))}
                  </p>
                  <p className="text-xs text-text-tertiary">kcal</p>
                </div>
                <div className="bg-bg-primary dark:bg-bg-primary rounded-xl p-2 text-center">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B6B] mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-text-primary">
                    {Math.round(selectedFood.protein * (parseFloat(quantity) || 1) * 10) / 10}g
                  </p>
                  <p className="text-xs text-text-tertiary">Protein</p>
                </div>
                <div className="bg-bg-primary dark:bg-bg-primary rounded-xl p-2 text-center">
                  <div className="w-2 h-2 rounded-full bg-[#4ECDC4] mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-text-primary">
                    {Math.round(selectedFood.carbs * (parseFloat(quantity) || 1) * 10) / 10}g
                  </p>
                  <p className="text-xs text-text-tertiary">Carbs</p>
                </div>
                <div className="bg-bg-primary dark:bg-bg-primary rounded-xl p-2 text-center">
                  <div className="w-2 h-2 rounded-full bg-[#FFD93D] mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-text-primary">
                    {Math.round(selectedFood.fat * (parseFloat(quantity) || 1) * 10) / 10}g
                  </p>
                  <p className="text-xs text-text-tertiary">Fat</p>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Servings
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setQuantity(String(Math.max(0.5, parseFloat(quantity) - 0.5)))}
                >
                  -
                </Button>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="flex-1 text-center"
                  step="0.5"
                  min="0.5"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setQuantity(String(parseFloat(quantity) + 0.5))}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Meal selection */}
            {!mealId && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Add to meal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {mealOptions.map((meal) => {
                    const Icon = meal.icon;
                    return (
                      <button
                        key={meal.id}
                        onClick={() => setSelectedMeal(meal.id)}
                        className={`p-3 rounded-xl border transition-all ${
                          selectedMeal === meal.id
                            ? 'bg-brand-300 dark:bg-brand-500 border-brand-300 dark:border-brand-500'
                            : 'bg-bg-secondary dark:bg-bg-secondary border-border'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 mx-auto mb-1 ${
                            selectedMeal === meal.id
                              ? 'text-white'
                              : 'text-text-secondary'
                          }`}
                        />
                        <p
                          className={`text-sm font-medium ${
                            selectedMeal === meal.id
                              ? 'text-white'
                              : 'text-text-primary'
                          }`}
                        >
                          {meal.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add button */}
            <Button
              variant="primary"
              fullWidth
              onClick={handleAdd}
              disabled={!selectedFood || !quantity || parseFloat(quantity) <= 0}
            >
              Add to {mealOptions.find((m) => m.id === selectedMeal)?.label}
            </Button>
          </div>
        ) : (
          /* Food list */
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => setSelectedFood(food)}
                  className="bg-bg-secondary dark:bg-bg-secondary hover:bg-bg-tertiary dark:hover:bg-border rounded-xl p-3 border border-border transition-colors text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-text-primary">{food.name}</h4>
                      <p className="text-xs text-text-tertiary">{food.servingSize}</p>
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
                <Search className="w-12 h-12 mx-auto mb-2 opacity-40" />
                <p>No foods found</p>
                <p className="text-xs mt-1">Try a different search</p>
              </div>
            )}
          </div>
        )}
      </div>
    </BottomSheet>
  );
}