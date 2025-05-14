
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { Message } from '@/types/chat';

interface ChatBotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatBotWindow: React.FC<ChatBotWindowProps> = ({
  isOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  messagesEndRef
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50 bot-entrance"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <ChatHeader onClose={onClose} />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={msg.id} message={msg} index={index} />
            ))}
            
            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput onSendMessage={onSendMessage} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBotWindow;
