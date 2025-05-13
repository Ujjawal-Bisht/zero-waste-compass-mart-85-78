
import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (initialSeconds: number = 30) => {
  const [countdownTime, setCountdownTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const startCountdown = useCallback(() => {
    setIsActive(true);
    setCountdownTime(initialSeconds);
  }, [initialSeconds]);

  const stopCountdown = useCallback(() => {
    setIsActive(false);
    setCountdownTime(0);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive && countdownTime > 0) {
      timer = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, countdownTime]);

  return {
    countdownTime,
    isActive,
    startCountdown,
    stopCountdown
  };
};

export default useCountdown;
