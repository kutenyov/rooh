import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Loader } from './components/Loader';
import { Onboarding } from './components/Onboarding';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  // Initialize theme from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Check if user has seen onboarding
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }, 5000); // Show loader for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <RouterProvider router={router} />;
}