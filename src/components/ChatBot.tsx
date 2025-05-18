
import React from 'react';
import ZeroBot5 from './ai/ZeroBot5';

interface ChatBotProps {
  initialPrompt?: string;
  showInitially?: boolean;
  sellerMode?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  enableVoice?: boolean;
  enableRealtime?: boolean;
  showAnalytics?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ 
  initialPrompt, 
  showInitially = false,
  sellerMode = false,
  theme = 'auto',
  enableVoice = true,
  enableRealtime = true,
  showAnalytics = true
}) => {
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
};

export default ChatBot;
