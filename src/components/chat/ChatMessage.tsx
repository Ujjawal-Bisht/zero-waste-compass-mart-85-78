
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Message } from '@/types/chat';
import { useAuth } from '@/contexts/auth';

interface ChatMessageProps {
  message: Message;
  index: number;
  highlightSearch?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index, highlightSearch }) => {
  const { currentUser } = useAuth();
  
  // Function to highlight search text in message content
  const highlightText = (text: string, query: string) => {
    if (!query || !query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={i} className="bg-yellow-200 font-medium">{part}</span> : 
        part
    );
  };
  
  // Get category-specific styles
  const getCategoryStyle = () => {
    if (message.sender === 'user') return {};
    
    switch (message.category) {
      case 'sustainability':
        return { borderLeft: '3px solid #48BB78' }; // Green
      case 'climate':
        return { borderLeft: '3px solid #4299E1' }; // Blue
      case 'tracking':
        return { borderLeft: '3px solid #ED8936' }; // Orange
      case 'order':
        return { borderLeft: '3px solid #9F7AEA' }; // Purple
      case 'product':
        return { borderLeft: '3px solid #F56565' }; // Red
      case 'invoice':
        return { borderLeft: '3px solid #ECC94B' }; // Yellow
      case 'personal':
        return { borderLeft: '3px solid #ED64A6' }; // Pink
      default:
        return {}; // No special styling
    }
  };
  
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
        style={getCategoryStyle()}
      >
        <p className="text-sm">
          {highlightSearch ? 
            highlightText(message.content, highlightSearch) : 
            message.content}
        </p>
        {message.referencedLinks && message.referencedLinks.length > 0 && (
          <div className="mt-2">
            {message.referencedLinks.map((link, i) => (
              <a 
                key={i} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-blue-600 hover:underline block"
              >
                {link.length > 40 ? `${link.substring(0, 40)}...` : link}
              </a>
            ))}
          </div>
        )}
        <span className="text-xs mt-1 block opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {message.category && message.sender === 'bot' && (
            <span className="ml-2 text-xxs uppercase opacity-50">
              {message.category}
            </span>
          )}
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
