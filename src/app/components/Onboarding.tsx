import React, { useState } from 'react';
import { Button } from './Button';
import { Heart, Utensils, Trophy, Sparkles } from 'lucide-react';
import logo from '@/assets/267bfba205e7b111cd1cd8eed86a3e179c66d213.png';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Heart,
    title: 'Welcome to Rooh',
    description: 'Your personal health and fitness companion. Track your progress and achieve your goals with ease.',
    color: 'from-pink-400 to-red-400',
  },
  {
    icon: Utensils,
    title: 'Smart Nutrition',
    description: 'Log your meals, track calories and macros. Get AI-powered recommendations tailored to you.',
    color: 'from-orange-400 to-amber-400',
  },
  {
    icon: Trophy,
    title: 'Achieve Your Goals',
    description: 'Set goals, track progress, and stay motivated every single day on your wellness journey.',
    color: 'from-brand-300 to-brand-500',
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    description: 'Personalized recommendations based on your unique data, habits, and preferences.',
    color: 'from-purple-400 to-indigo-400',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 bg-bg-primary z-50 flex flex-col">
      {/* Skip button */}
      {!isLastSlide && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
          >
            Skip
          </button>
        </div>
      )}

      {/* Logo */}
      <div className="pt-8 px-4 flex justify-center">
        <img 
          src={logo} 
          alt="Rooh" 
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Icon with animated gradient background */}
        <div className="relative mb-12">
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} rounded-full blur-2xl opacity-30 animate-pulse-slow`} />
          <div className={`relative bg-gradient-to-br ${slide.color} rounded-3xl p-8 shadow-2xl`}>
            <Icon size={64} className="text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-text-primary text-center mb-4 px-4">
          {slide.title}
        </h1>

        {/* Description */}
        <p className="text-base text-text-secondary text-center max-w-sm px-4 leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Bottom section */}
      <div className="pb-8 px-6 space-y-6">
        {/* Pagination dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-brand-500'
                  : 'w-2 bg-bg-tertiary'
              }`}
            />
          ))}
        </div>

        {/* Action button */}
        <Button
          onClick={handleNext}
          variant="primary"
          size="large"
          className="w-full"
        >
          {isLastSlide ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
}