
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/ui/logo';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="zwm-gradient p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo size="sm" showText={false} animated={false} />
        <div>
          <span className="text-white font-medium flex items-center gap-1">
            Zero Bot AI <span className="ml-1 text-yellow-200 text-xs">v2.0</span>
          </span>
          <span className="text-white/70 text-xs">AI sustainability assistant</span>
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
