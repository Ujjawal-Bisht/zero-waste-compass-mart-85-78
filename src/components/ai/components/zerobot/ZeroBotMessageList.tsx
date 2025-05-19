
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/types/chat';
import ZeroBotMessage from './ZeroBotMessage';
import ZeroBotTypingIndicator from './ZeroBotTypingIndicator';

interface ZeroBotMessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isMobile?: boolean;
}

const ZeroBotMessageList: React.FC<ZeroBotMessageListProps> = ({ 
  messages, 
  isTyping, 
  messagesEndRef,
  isMobile = false
}) => {
  // Generate a safe key for messages by ensuring we never have undefined
  const getMessageKey = (message: Message, index: number): string => {
    if (message.id === undefined || message.id === null) {
      // Fallback to using index if id is not available
      return `message-${index}`;
    }
    return String(message.id); // Convert to string to avoid toString() on undefined
  };

  return (
    <motion.div 
      className={`space-y-4 ${isMobile ? 'px-2' : 'px-1'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-gray-500">No messages yet. Start a conversation!</p>
        </div>
      ) : (
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={getMessageKey(message, index)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={isMobile ? 'mobile-touch-feedback' : ''}
            >
              <ZeroBotMessage message={message} isMobile={isMobile} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {isTyping && (
          <motion.div
            key="typing-indicator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ZeroBotTypingIndicator isMobile={isMobile} />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default ZeroBotMessageList;
