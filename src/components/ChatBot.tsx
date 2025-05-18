
import React from 'react';
import ZeroBot3 from './ai/ZeroBot3';

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
  version = 3 // Default to version 3
}) => {
  // Use version 3 as default, and only render v5 if specifically requested
  if (version === 5) {
    // Import is done dynamically to avoid loading v5 when not needed
    const ZeroBot5 = React.lazy(() => import('./ai/ZeroBot5'));
    
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ZeroBot5
          initialPrompt={initialPrompt}
          showInitially={showInitially}
          enableVoice={enableVoice}
          enableRealtime={enableRealtime}
          showAnalytics={showAnalytics}
          sellerMode={sellerMode}
          theme={theme}
        />
      </React.Suspense>
    );
  }
  
  // Default to ZeroBot3
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
