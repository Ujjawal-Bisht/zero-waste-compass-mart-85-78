
import React, { useState, useEffect } from 'react';
import { useChatMessages } from '@/hooks/useChatMessages';
import ChatBotButton from './chat/ChatBotButton';
import ChatBotWindow from './chat/ChatBotWindow';
import { Message } from '@/types/chat';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    messages, 
    isTyping, 
    sendMessage, 
    messagesEndRef,
    conversationContext,
    getSuggestedQuestions,
    searchQuery,
    setSearchQuery,
    searchMessages
  } = useChatMessages();
  
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  
  // Handle search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setFilteredMessages(searchMessages(query));
    } else {
      setFilteredMessages([]);
    }
  };
  
  // Track unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1 && messages[messages.length - 1].sender === 'bot') {
      setHasUnreadMessages(true);
    }
  }, [messages, isOpen]);
  
  // Reset unread when opening chat
  useEffect(() => {
    if (isOpen) {
      setHasUnreadMessages(false);
    }
  }, [isOpen]);
  
  // Render button with unread indicator
  const renderChatButton = () => {
    return (
      <ChatBotButton 
        onClick={() => setIsOpen(true)} 
        isOpen={isOpen}
        hasUnread={hasUnreadMessages}
      />
    );
  };

  return (
    <>
      {/* Chat button */}
      {renderChatButton()}

      {/* Chat window with enhanced features */}
      <ChatBotWindow 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
        conversationContext={conversationContext}
        suggestedQuestions={getSuggestedQuestions()}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filteredMessages={filteredMessages}
      />
    </>
  );
};

export default ChatBot;
