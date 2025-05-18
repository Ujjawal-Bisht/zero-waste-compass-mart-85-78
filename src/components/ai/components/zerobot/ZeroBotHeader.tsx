
import React from 'react';
import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';

interface ZeroBotHeaderProps {
  onClose: () => void;
}

const ZeroBotHeader: React.FC<ZeroBotHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="text-base font-medium flex items-center">
        <Bot className="mr-2 h-5 w-5" />
        ZeroBot Assistant
      </CardTitle>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-white hover:bg-white/20 rounded-full" 
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ZeroBotHeader;
