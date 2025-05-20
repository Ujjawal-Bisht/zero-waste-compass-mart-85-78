
import React from 'react';
import { useDeviceType } from '@/hooks/use-mobile';

interface ChatBotProps {
  initialPrompt?: string;
  showInitially?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

const ChatBot: React.FC<ChatBotProps> = ({ 
  initialPrompt, 
  showInitially = false,
  theme = 'auto'
}) => {
  // This component has been disabled as requested
  return null;
};

export default ChatBot;
