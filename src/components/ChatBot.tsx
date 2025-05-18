
import React from 'react';
import ZeroBot3 from './ai/ZeroBot3';
import ZeroBot5 from './ai/ZeroBot5';

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
  version = 3 // Set default version to 3
}) => {
  // Use version prop to determine which bot to render
  if (version === 5) {
    return (
      <ZeroBot5
        initialPrompt={initialPrompt}
        showInitially={showInitially}
        enableVoice={enableVoice}
        enableRealtime={enableRealtime}
        showAnalytics={showAnalytics}
        sellerMode={sellerMode}
        theme={theme}
      />
    );
  }
  
  // Default to ZeroBot3
  return (
    <ZeroBot3
      showInitially={showInitially}
    />
  );
};

export default ChatBot;
