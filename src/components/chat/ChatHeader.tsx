
import React from 'react';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCategory } from '@/types/chat';

interface ChatHeaderProps {
  onClose: () => void;
  context?: MessageCategory;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, context = 'general' }) => {
  // Get contextual title for the header
  const getContextTitle = () => {
    switch(context) {
      case 'sustainability':
        return 'Sustainability Assistant';
      case 'climate':
        return 'Climate Data Assistant';
      case 'tracking':
        return 'Order Tracking Assistant';
      case 'order':
        return 'Order Management';
      case 'product':
        return 'Product Specialist';
      case 'invoice':
        return 'Billing Assistant';
      case 'personal':
        return 'Personal Assistant';
      default:
        return 'AI sustainability assistant';
    }
  };
  
  return (
    <div className="zwm-gradient p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo size="sm" showText={false} animated={false} />
        <div>
          <span className="text-white font-medium flex items-center gap-1">
            Zero Bot AI <span className="ml-1 text-yellow-200 text-xs">v3.0</span>
          </span>
          <span className="text-white/70 text-xs">{getContextTitle()}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Info size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">ZeroBot AI v3.0 with enhanced context awareness and voice input</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
