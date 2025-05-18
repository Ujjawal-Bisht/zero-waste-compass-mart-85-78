
import { useState, useEffect } from 'react';

export function useUIState() {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'analytics'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  
  return {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    hasUnreadMessages,
    setHasUnreadMessages,
  };
}
