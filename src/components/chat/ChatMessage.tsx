
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Message } from '@/types/chat';
import { useAuth } from '@/contexts/auth';

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  const { currentUser } = useAuth();
  
  return (
    <motion.div
      key={message.id}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-appear message-delay-${(index % 3) + 1}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message.sender === 'bot' && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarFallback className="bg-zwm-accent text-white flex items-center justify-center">
            <Bot size={14} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`max-w-[80%] p-3 ${
          message.sender === 'user'
            ? 'bg-zwm-primary text-white chat-bubble-user shadow-md'
            : 'bot-message-gradient text-gray-800 chat-bubble-bot shadow-sm'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs mt-1 block opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {message.sender === 'user' && (
        <Avatar className="h-8 w-8 ml-2 mt-1">
          {currentUser?.photoURL ? (
            <AvatarImage src={currentUser.photoURL} />
          ) : (
            <AvatarFallback className="bg-zwm-primary text-white flex items-center justify-center">
              <User size={14} />
            </AvatarFallback>
          )}
        </Avatar>
      )}
    </motion.div>
  );
};

export default ChatMessage;
