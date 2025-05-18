
import React from 'react';
import { Bot, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ZeroBotHeaderProps {
  isOpen: boolean;
  sellerMode: boolean;
  realtimeActive: boolean;
  toggleRealtimeMode: () => void;
  onClose: () => void;
}

const ZeroBotHeader: React.FC<ZeroBotHeaderProps> = ({
  sellerMode,
  realtimeActive,
  toggleRealtimeMode,
  onClose
}) => {
  return (
    <div className={`p-3 flex justify-between items-center ${
      sellerMode 
        ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
        : 'bg-gradient-to-r from-emerald-500 to-teal-600'
    } text-white`}>
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8 border-2 border-white/30">
          <AvatarImage src="/logo-icon.svg" />
          <AvatarFallback className="bg-white/20 text-white">
            <Bot size={16} />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-sm flex items-center gap-1">
            ZeroBot AI
            <span className="ml-1 bg-white/20 text-white text-xs px-1.5 rounded">v4.0</span>
          </h3>
          <p className="text-xs text-white/70">
            {sellerMode ? 'Seller Assistant' : 'Shopping Assistant'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleRealtimeMode}
                className={`h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/20 ${realtimeActive ? 'bg-white/20' : ''}`}
              >
                <Sparkles size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                {realtimeActive ? 'Disable' : 'Enable'} real-time responses
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ZeroBotHeader;
