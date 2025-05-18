
import { toast } from 'sonner';
import { MessageCategory } from '@/types/chat';
import { useState } from 'react';

interface UseSettingsProps {
  addBotMessage: (content: string, category?: MessageCategory, metadata?: any) => void;
}

export function useSettings({ addBotMessage }: UseSettingsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [realtimeActive, setRealtimeActive] = useState(true);

  const toggleRealtimeMode = () => {
    const newMode = !realtimeActive;
    setRealtimeActive(newMode);
    toast.success(`${newMode ? 'Enabled' : 'Disabled'} real-time response mode`);
  };
  
  const clearChat = (sellerMode: boolean) => {
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
