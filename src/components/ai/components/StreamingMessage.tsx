
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, PauseCircle } from 'lucide-react';
import { MessageCategory } from '@/types/chat';

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
    <div className="flex justify-start message-appear">
      <Avatar className="h-8 w-8 mr-2 mt-1">
        <AvatarFallback className={`${sellerMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white flex items-center justify-center`}>
          <Bot size={14} />
        </AvatarFallback>
      </Avatar>
      
      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-100 rounded-tl-none shadow-sm">
        <p className="text-sm whitespace-pre-wrap">
          {streamedResponse}
          <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse"></span>
        </p>
        
        <div className="mt-1 flex items-center justify-between">
          <Badge variant="outline" className="text-xs bg-gray-50">
            {currentContext}
          </Badge>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full hover:bg-gray-100 text-gray-400"
            onClick={onCancel}
          >
            <PauseCircle size={12} />
          </Button>
        </div>
        
        <span className="text-xs mt-1 block opacity-70">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default StreamingMessage;
