
import React from 'react';
import { Message } from '@/types/chat';
import ZeroBotMessage from './ZeroBotMessage';
import ZeroBotTypingIndicator from './ZeroBotTypingIndicator';

interface ZeroBotMessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ZeroBotMessageList: React.FC<ZeroBotMessageListProps> = ({ 
  messages, 
  isTyping, 
  messagesEndRef 
}) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <ZeroBotMessage key={message.id} message={message} />
      ))}

      {isTyping && <ZeroBotTypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ZeroBotMessageList;
