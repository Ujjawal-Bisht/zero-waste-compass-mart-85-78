
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGlobalZeroBot() {
  const [isEnabled, setIsEnabled] = useState(true);
  const location = useLocation();

  // Enable/disable based on user preferences or page context
  useEffect(() => {
    // You could extend this to check user preferences from localStorage
    const savedPreference = localStorage.getItem('zerobot-enabled');
    if (savedPreference !== null) {
      setIsEnabled(savedPreference === 'true');
    }

    // Optional: Disable on certain routes if needed
    // const disabledRoutes = ['/some-specific-route'];
    // if (disabledRoutes.includes(location.pathname)) {
    //   setIsEnabled(false);
    // }
  }, [location]);

  const toggleZeroBot = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('zerobot-enabled', String(newState));
  };

  return {
    isEnabled,
    toggleZeroBot
  };
}

export default useGlobalZeroBot;
