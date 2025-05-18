
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, PauseCircle, Loader2 } from 'lucide-react';
import { MessageCategory } from '@/types/chat';
import { motion } from 'framer-motion';

interface StreamingMessageProps {
  streamedResponse: string;
  currentContext: MessageCategory;
  sellerMode: boolean;
  onCancel: () => void;
}

const StreamingMessage: React.FC<StreamingMessageProps> = ({
  streamedResponse,
  currentContext,
  sellerMode,
  onCancel
}) => {
  if (!streamedResponse) return null;
  
  return (
    <motion.div 
      className="flex justify-start message-appear"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="h-8 w-8 mr-2 mt-1">
        <AvatarFallback className={`${sellerMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white flex items-center justify-center`}>
          <Bot size={14} />
        </AvatarFallback>
      </Avatar>
      
      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-100 rounded-tl-none shadow-sm">
        <p className="text-sm whitespace-pre-wrap relative">
          {streamedResponse}
          <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse"></span>
        </p>
        
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="outline" className="text-xs bg-gray-50 flex items-center gap-1">
            <Loader2 className="h-2 w-2 animate-spin" />
            <span>{currentContext}</span>
          </Badge>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            onClick={onCancel}
            title="Stop generating"
          >
            <PauseCircle size={12} />
          </Button>
        </div>
        
        <span className="text-xs mt-1 block opacity-70">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default StreamingMessage;
