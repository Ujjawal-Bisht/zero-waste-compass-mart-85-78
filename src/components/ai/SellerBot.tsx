
import React from 'react';
import ZeroBot4 from './ZeroBot4';

interface SellerBotProps {
  initialPrompt?: string;
  showInitially?: boolean;
}

const SellerBot: React.FC<SellerBotProps> = ({ initialPrompt, showInitially = false }) => {
  return (
    <ZeroBot4
      initialPrompt={initialPrompt}
      showInitially={showInitially}
      enableVoice={true}
      enableRealtime={true}
      showAnalytics={true}
      sellerMode={true}
    />
  );
};

export default SellerBot;
