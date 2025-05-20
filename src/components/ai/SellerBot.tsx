
import React from 'react';

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
  // This component has been disabled as requested
  return null;
};

export default SellerBot;
