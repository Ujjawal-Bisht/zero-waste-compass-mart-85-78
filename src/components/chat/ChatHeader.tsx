
import React from 'react';
import { Bot, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="zwm-gradient p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border-2 border-white">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-zwm-accent text-white flex items-center justify-center">
            <Bot size={14} />
          </AvatarFallback>
        </Avatar>
        <div>
          <span className="text-white font-medium flex items-center gap-1">
            Zero Bot AI <Sparkles size={14} className="ml-1" />
          </span>
          <span className="text-white/70 text-xs">AI assistant</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-white hover:bg-white/20"
      >
        <X size={18} />
      </Button>
    </div>
  );
};

export default ChatHeader;
