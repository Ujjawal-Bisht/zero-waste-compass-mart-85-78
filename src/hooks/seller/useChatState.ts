
import { useState } from 'react';

export const useChatState = () => {
  const [chatState, setChatState] = useState<{ 
    open: boolean;
    buyerId: string;
    buyerName: string; 
  }>({
    open: false,
    buyerId: '',
    buyerName: ''
  });

  const handleContactBuyer = (buyerId: string, buyerName: string) => {
    setChatState({
      open: true,
      buyerId,
      buyerName
    });
  };

  const handleCloseChat = () => {
    setChatState(prev => ({ ...prev, open: false }));
  };

  return {
    chatState,
    handleContactBuyer,
    handleCloseChat
  };
};
