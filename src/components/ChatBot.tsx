
import React from 'react';
import ZeroBotAssistant from './ai/ZeroBotAssistant';
import { useDeviceType } from '@/hooks/use-mobile';

interface ChatBotProps {
  initialPrompt?: string;
  showInitially?: boolean;
  sellerMode?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  enableVoice?: boolean;
  enableRealtime?: boolean;
  showAnalytics?: boolean;
  version?: number;
}

const ChatBot: React.FC<ChatBotProps> = ({ 
  initialPrompt, 
  showInitially = false,
  sellerMode = false,
  theme = 'auto',
  enableVoice = true,
  enableRealtime = true,
  showAnalytics = true,
  version = 5 // Default to version 5 now
}) => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  return (
    <ZeroBotAssistant
      initialPrompt={initialPrompt}
      showInitially={showInitially}
      sellerMode={sellerMode}
    />
  );
};

export default ChatBot;
