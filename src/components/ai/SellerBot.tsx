
import React from 'react';
import ZeroBot5 from './ZeroBot5';

interface SellerBotProps {
  initialPrompt?: string;
  showInitially?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

const SellerBot: React.FC<SellerBotProps> = ({ 
  initialPrompt, 
  showInitially = false,
  theme = 'auto'
}) => {
  return (
    <ZeroBot5
      initialPrompt={initialPrompt}
      showInitially={showInitially}
      enableVoice={true}
      enableRealtime={true}
      showAnalytics={true}
      sellerMode={true}
      theme={theme}
    />
  );
};

export default SellerBot;
