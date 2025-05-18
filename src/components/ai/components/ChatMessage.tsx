
import React, { useState } from 'react';
import { Bot, ThumbsDown, ThumbsUp, Copy, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/types/chat';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ChatMessageProps {
  message: Message;
  searchQuery: string;
  sellerMode: boolean;
  currentUser?: any;
  handleMessageReaction: (messageId: number | string, reaction: 'like' | 'dislike') => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  searchQuery,
  sellerMode,
  currentUser,
  handleMessageReaction
}) => {
  const [copied, setCopied] = useState(false);
  const isBot = message.sender === 'bot';
  const isHighlighted = searchQuery && message.content.toLowerCase().includes(searchQuery.toLowerCase());
  
  // Function to highlight search term in text
  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchQuery.toLowerCase() ? 
            <span key={i} className="bg-yellow-200 font-medium">{part}</span> : 
            part
        )}
      </>
    );
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Message copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <motion.div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} message-appear`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isBot && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarFallback className={`${sellerMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white flex items-center justify-center`}>
            <Bot size={14} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot
            ? `bg-white border shadow-sm ${isHighlighted ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100'}`
            : `${sellerMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white`
        } ${isBot ? 'rounded-tl-none' : 'rounded-tr-none'}`}
      >
        <p className="text-sm">
          {highlightText(message.content)}
        </p>
        
        {/* Category badge and controls for bot messages */}
        {isBot && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              {message.category && (
                <Badge variant="outline" className="text-xs bg-gray-50 mr-2">
                  {message.category}
                </Badge>
              )}
              
              {/* Copy button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 rounded-full hover:bg-gray-100"
                onClick={copyToClipboard}
              >
                {copied ? 
                  <CheckCheck size={12} className="text-green-500" /> : 
                  <Copy size={12} className="text-gray-400" />
                }
              </Button>
            </div>
            
            {/* Feedback buttons */}
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 rounded-full hover:bg-gray-100"
                onClick={() => handleMessageReaction(message.id, 'like')}
              >
                <ThumbsUp 
                  size={12} 
                  className={message.reaction === 'like' ? 'text-blue-500 fill-blue-500' : 'text-gray-400'}
                />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 rounded-full hover:bg-gray-100"
                onClick={() => handleMessageReaction(message.id, 'dislike')}
              >
                <ThumbsDown 
                  size={12} 
                  className={message.reaction === 'dislike' ? 'text-red-500 fill-red-500' : 'text-gray-400'}
                />
              </Button>
            </div>
          </div>
        )}
        
        {/* Processing metadata for bot messages */}
        {isBot && message.metadata?.processingTime && (
          <span className="text-xxs text-gray-400 block mt-1">
            Processed in {Math.round(message.metadata.processingTime / 100) / 10}s
          </span>
        )}
        
        <span className="text-xs mt-1 block opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {!isBot && (
        <Avatar className="h-8 w-8 ml-2 mt-1">
          {currentUser?.photoURL ? (
            <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName || 'User'} />
          ) : (
            <AvatarFallback className="bg-gray-200 text-gray-600">
              {currentUser?.displayName?.[0] || 'U'}
            </AvatarFallback>
          )}
        </Avatar>
      )}
    </motion.div>
  );
};

export default ChatMessage;
