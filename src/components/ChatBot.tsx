
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
  
  // Use ZeroBotAssistant as default for the new version 5
  if (version === 5) {
    return (
      <ZeroBotAssistant
        initialPrompt={initialPrompt}
        showInitially={showInitially}
      />
    );
  }
  
  // Fallback to ZeroBot3
  return (
    <ZeroBot3
      initialPrompt={initialPrompt}
      showInitially={showInitially}
      sellerMode={sellerMode}
      theme={theme}
      enableVoice={enableVoice}
      enableRealtime={enableRealtime}
      showAnalytics={showAnalytics}
    />
  );
};

export default ChatBot;
