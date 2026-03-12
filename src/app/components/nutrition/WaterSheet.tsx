import React, { useState } from 'react';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { Droplets, Plus, Minus } from 'lucide-react';

interface WaterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWater: (amount: number) => void;
  onRemoveWater: () => void;
  waterIntake: number;
  waterGoal: number;
}

export function WaterSheet({ isOpen, onClose, onAddWater, onRemoveWater, waterIntake, waterGoal }: WaterSheetProps) {
  const [customAmount, setCustomAmount] = useState('');

  const quickAmounts = [
    { label: 'Glass', amount: 250, icon: '🥤' },
    { label: 'Bottle', amount: 500, icon: '💧' },
    { label: 'Large', amount: 750, icon: '🍶' },
    { label: 'Liter', amount: 1000, icon: '🚰' },
  ];

  const handleQuickAdd = (amount: number) => {
    onAddWater(amount);
    onClose();
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount);
    if (amount > 0) {
      onAddWater(amount);
      setCustomAmount('');
      onClose();
    }
  };

  const remaining = Math.max(0, waterGoal - waterIntake);
  const percentage = Math.round((waterIntake / waterGoal) * 100);
}