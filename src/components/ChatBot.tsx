
import React, { useState } from 'react';
import { useChatMessages } from '@/hooks/useChatMessages';
import ChatBotButton from './chat/ChatBotButton';
import ChatBotWindow from './chat/ChatBotWindow';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, sendMessage, messagesEndRef } = useChatMessages();

  return (
    <>
      {/* Chat button */}
      <ChatBotButton 
        onClick={() => setIsOpen(true)} 
        isOpen={isOpen}
      />

      {/* Chat window */}
      <ChatBotWindow 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
      />
    </>
  );
};

export default ChatBot;
