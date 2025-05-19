
import { useState, useEffect } from 'react';
import { useDeviceType, useOrientation } from '@/hooks/use-mobile';

export function useUIState() {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'analytics'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  
  // Get device type and orientation from our hooks
  const deviceType = useDeviceType();
  const orientation = useOrientation();
  const isMobileView = deviceType === 'mobile';
  
  // Handle responsiveness
  useEffect(() => {
    // Close the chat on mobile when orientation changes (to prevent UI issues)
    if (isMobileView && isOpen) {
      const handleOrientationChange = () => {
        // Add a small delay to allow the UI to adjust first
        setTimeout(() => {
          // Force re-render the UI to adjust to new orientation
          setActiveTab(prev => prev);
        }, 300);
      };
      
      window.addEventListener('orientationchange', handleOrientationChange);
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }
  }, [isMobileView, isOpen, orientation]);
  
  // Auto-close the chat when window resizes below a certain threshold
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480 && window.innerHeight < 480) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
    orientation,
  };
}
