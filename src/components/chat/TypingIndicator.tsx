
import React from 'react';
import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { MessageCategory } from '@/types/chat';

interface TypingIndicatorProps {
  context?: MessageCategory;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ context = 'general' }) => {
  // Get contextual label
  const getContextLabel = () => {
    switch(context) {
      case 'sustainability':
        return 'Eco tips';
      case 'climate':
        return 'Climate data';
      case 'tracking':
        return 'Tracking info';
      case 'order':
        return 'Order details';
      case 'product':
        return 'Product info';
      case 'invoice':
        return 'Invoicing';
      case 'personal':
        return 'Personal';
      default:
        return '';
    }
  };
  
  return (
    <motion.div 
      className="flex justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Avatar className="h-8 w-8 mr-2">
        <AvatarFallback className="bg-zwm-accent text-white flex items-center justify-center">
          <Bot size={14} />
        </AvatarFallback>
      </Avatar>
      <div className="bot-message-gradient p-3 rounded-xl flex items-center space-x-1">
        <div className="w-2 h-2 rounded-full bg-zwm-accent typing-dot"></div>
        <div className="w-2 h-2 rounded-full bg-zwm-accent typing-dot"></div>
        <div className="w-2 h-2 rounded-full bg-zwm-accent typing-dot"></div>
        
        {context !== 'general' && (
          <span className="ml-2 text-[10px] text-gray-500 uppercase">
            {getContextLabel()}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
