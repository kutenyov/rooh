import React, { useState } from 'react';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { Flame, Trash2, Edit3 } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  cholesterol?: number;
  sodium?: number;
  fiber?: number;
  sugar?: number;
}

interface FoodDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  food: FoodItem | null | undefined;
  onUpdateFood: (foodId: number, multiplier: number) => void;
  onDeleteFood: (foodId: number) => void;
  mealId: string | undefined;
}

export function FoodDetailsSheet({
  isOpen,
  onClose,
  food,
  onUpdateFood,
  onDeleteFood,
  mealId,
}: FoodDetailsSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [multiplier, setMultiplier] = useState('1');

  if (!food) return null;

  const currentMultiplier = isEditing ? parseFloat(multiplier) || 1 : 1;

  const handleSave = () => {
    const newMultiplier = parseFloat(multiplier);
    if (newMultiplier > 0) {
      onUpdateFood(food.id, newMultiplier);
      setIsEditing(false);
      onClose();
    }
  };

  const handleDelete = () => {
    onDeleteFood(food.id);
    onClose();
  };

  const macros = [
    {
      name: 'Protein',
      value: Math.round(food.protein * currentMultiplier * 10) / 10,
      unit: 'g',
      color: '#FF6B6B',
    },
    {
      name: 'Carbs',
      value: Math.round(food.carbs * currentMultiplier * 10) / 10,
      unit: 'g',
      color: '#4ECDC4',
    },
    {
      name: 'Fat',
      value: Math.round(food.fat * currentMultiplier * 10) / 10,
      unit: 'g',
      color: '#FFD93D',
    },
  ];

  const micronutrients = [
    { name: 'Cholesterol', value: food.cholesterol, unit: 'mg' },
    { name: 'Sodium', value: food.sodium, unit: 'mg' },
    { name: 'Fiber', value: food.fiber, unit: 'g' },
    { name: 'Sugar', value: food.sugar, unit: 'g' },
  ].filter((item) => item.value !== undefined);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Food Details">
      <div className="flex flex-col gap-6 pb-6">
        {/* Header with calories */}
        <div className="bg-gradient-to-br from-brand-300 to-brand-400 dark:from-brand-500 dark:to-brand-600 rounded-2xl p-4 text-white">
          <h2 className="text-xl font-bold mb-1">{food.name}</h2>
          <p className="text-sm opacity-75 mb-4">Added at {food.time}</p>
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8" />
            <div>
              <p className="text-3xl font-bold">
                {Math.round(food.calories * currentMultiplier)}
              </p>
              <p className="text-sm opacity-75">calories</p>
            </div>
          </div>
        </div>

        {/* Servings editor */}
        {isEditing ? (
          <div className="bg-bg-secondary dark:bg-bg-secondary rounded-xl p-4 border border-border">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Servings
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMultiplier(String(Math.max(0.5, parseFloat(multiplier) - 0.5)))}
              >
                -
              </Button>
              <TextField
                type="number"
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
                className="flex-1 text-center"
                step="0.5"
                min="0.5"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMultiplier(String(parseFloat(multiplier) + 0.5))}
              >
                +
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="secondary" fullWidth onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              fullWidth
              startIcon={<Edit3 className="w-4 h-4" />}
              onClick={() => {
                setMultiplier('1');
                setIsEditing(true);
              }}
            >
              Edit Serving
            </Button>
            <Button
              variant="secondary"
              fullWidth
              startIcon={<Trash2 className="w-4 h-4" />}
              onClick={handleDelete}
              className="text-error hover:bg-error/10"
            >
              Delete
            </Button>
          </div>
        )}

        {/* Macronutrients */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Macronutrients</h3>
          <div className="grid grid-cols-3 gap-3">
            {macros.map((macro) => (
              <div
                key={macro.name}
                className="bg-bg-secondary dark:bg-bg-secondary rounded-xl p-3 border border-border text-center"
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: macro.color }}
                />
                <p className="text-lg font-bold text-text-primary">
                  {macro.value}
                  <span className="text-sm font-normal text-text-tertiary">{macro.unit}</span>
                </p>
                <p className="text-xs text-text-secondary mt-1">{macro.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Micronutrients */}
        {micronutrients.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Micronutrients</h3>
            <div className="bg-bg-secondary dark:bg-bg-secondary rounded-xl border border-border overflow-hidden">
              {micronutrients.map((nutrient, index) => (
                <div
                  key={nutrient.name}
                  className={`flex justify-between items-center p-3 ${
                    index !== micronutrients.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-sm text-text-secondary">{nutrient.name}</span>
                  <span className="text-sm font-semibold text-text-primary">
                    {Math.round((nutrient.value || 0) * currentMultiplier * 10) / 10} {nutrient.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nutritional info disclaimer */}
        <div className="bg-bg-secondary dark:bg-bg-secondary rounded-xl p-3 border border-border">
          <p className="text-xs text-text-tertiary text-center">
            Nutritional values are approximate and may vary based on preparation method and specific
            product brands.
          </p>
        </div>
      </div>
    </BottomSheet>
  );
}