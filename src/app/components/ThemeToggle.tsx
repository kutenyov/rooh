import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './Button';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="medium"
      onClick={toggleTheme}
      icon={isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    >
      {isDark ? 'Dark' : 'Light'}
    </Button>
  );
}
