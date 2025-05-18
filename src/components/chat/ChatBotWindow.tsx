
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { Message, MessageCategory } from '@/types/chat';

interface ChatBotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  conversationContext?: MessageCategory;
  suggestedQuestions: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredMessages?: Message[];
}

const ChatBotWindow: React.FC<ChatBotWindowProps> = ({
  isOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  messagesEndRef,
  conversationContext = 'general',
  suggestedQuestions,
  searchQuery,
  onSearchChange,
  filteredMessages
}) => {
  const displayMessages = searchQuery ? filteredMessages || [] : messages;
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Handle scroll to show/hide the scroll to bottom button
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Show button when scrolled up more than 100px from bottom
    setShowScrollButton(scrollTop < scrollHeight - clientHeight - 100);
  };

  // Scroll to bottom function for manual triggering
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed bottom-6 right-6 w-[90vw] max-w-[450px] h-[80vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header with context indication */}
          <ChatHeader 
            onClose={onClose} 
            context={conversationContext} 
          />

          {/* Messages area with search results handling */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-gray-50"
            onScroll={handleScroll}
          >
            {searchQuery && displayMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>No messages matching "{searchQuery}"</p>
              </div>
            ) : searchQuery ? (
              <div className="mb-4 pb-2 border-b border-gray-100">
                <p className="text-xs text-gray-500">
                  Found {displayMessages.length} results for "{searchQuery}"
                </p>
              </div>
            ) : null}
            
            {displayMessages.map((msg, index) => (
              <ChatMessage 
                key={msg.id || `msg-${index}`}
                message={msg} 
                index={index} 
                highlightSearch={searchQuery}
              />
            ))}
            
            {/* Typing indicator */}
            {isTyping && <TypingIndicator context={conversationContext} />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to bottom button */}
          <AnimatePresence>
            {showScrollButton && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 right-4 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                onClick={scrollToBottom}
              >
                ↓
              </motion.button>
            )}
          </AnimatePresence>

          {/* Enhanced input with context and search */}
          <ChatInput 
            onSendMessage={onSendMessage} 
            conversationContext={conversationContext}
            suggestedQuestions={suggestedQuestions}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBotWindow;
