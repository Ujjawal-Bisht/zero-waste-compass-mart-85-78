
import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/types/chat';

interface ZeroBotMessageProps {
  message: Message;
}

const ZeroBotMessage: React.FC<ZeroBotMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          message.sender === 'user' 
            ? 'bg-indigo-500 text-white rounded-br-none' 
            : 'bg-white shadow-sm border border-gray-100 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.content || message.text}</p>
        <p className="text-xs opacity-70 mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </div>
    </motion.div>
  );
};

export default ZeroBotMessage;
