
import { useState, useEffect } from 'react';

export function useUIState() {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'analytics'>('chat');
  const [inputValue, setInputValue] = useState('');
  const [realtimeActive, setRealtimeActive] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  return {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    inputValue,
    setInputValue,
    realtimeActive,
    setRealtimeActive,
    hasUnreadMessages,
    setHasUnreadMessages,
    showSettings,
    setShowSettings,
  };
}
