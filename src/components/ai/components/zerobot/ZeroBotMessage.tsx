
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
      transition={{ duration: 0.3 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-3/4 rounded-lg p-3 shadow-sm ${
          message.sender === 'user' 
            ? 'bg-indigo-600 text-white rounded-br-none' 
            : 'bg-white rounded-bl-none border border-gray-100'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className="mt-1 text-xs opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default ZeroBotMessage;
