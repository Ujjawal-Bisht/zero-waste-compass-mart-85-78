
import { useState, useEffect } from 'react';

export function useUIState() {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'analytics'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  
  // Responsive state
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Check for mobile view on first render and on resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobileView();
    
    // Add resize listener
    window.addEventListener('resize', checkMobileView);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);
  
  return {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    hasUnreadMessages,
    setHasUnreadMessages,
    isMobileView,
  };
}
