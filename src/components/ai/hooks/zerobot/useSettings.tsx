import { toast } from 'sonner';
import { MessageCategory } from '@/types/chat';
import { useState } from 'react';

interface UseSettingsProps {
  sellerMode: boolean;
  addBotMessage: (content: string, category?: MessageCategory, metadata?: any) => void;
}

export function useSettings(sellerMode: boolean, addBotMessage: UseSettingsProps['addBotMessage']) {
  const [showSettings, setShowSettings] = useState(false);
  const [realtimeActive, setRealtimeActive] = useState(true);

  const toggleRealtimeMode = () => {
    const newMode = !realtimeActive;
    setRealtimeActive(newMode);
    toast.success(`${newMode ? 'Enabled' : 'Disabled'} real-time response mode`);
  };
  
  const clearChat = () => {
    // Re-add welcome message
    setTimeout(() => {
      addBotMessage(
        sellerMode
          ? "Chat cleared. What else can I help you with regarding your seller account?"
          : "Chat cleared. How else can I help you today?",
        'general'
      );
    }, 100);
    
    toast.success("Chat history cleared");
    setShowSettings(false);
  };
  
  return {
    toggleRealtimeMode,
    clearChat,
    showSettings,
    setShowSettings,
    realtimeActive,
    setRealtimeActive
  };
}
