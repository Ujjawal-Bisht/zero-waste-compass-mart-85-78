
import { useState, useRef } from 'react';

export function useTypingSimulation() {
  const typingSpeed = useRef(30); // Words per minute typing speed
  
  // Calculate typing time based on message length
  const calculateTypingTime = (message: string): number => {
    const wordCount = message.split(' ').length;
    const wordsPerMs = typingSpeed.current / (60 * 1000); // Words per millisecond
    const typingTimeMs = wordCount / wordsPerMs;
    
    // Set minimum and maximum typing time
    const minTime = 1000; // Minimum 1 second
    const maxTime = 3500; // Maximum 3.5 seconds
    
    return Math.max(minTime, Math.min(typingTimeMs, maxTime));
  };

  return { calculateTypingTime };
}
