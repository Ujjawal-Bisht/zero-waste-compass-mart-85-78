
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
        <div className="bg-emerald-100 p-1.5 rounded-full mr-2">
          <Bot className="h-4 w-4 text-emerald-600" />
        </div>
        ZeroBot Assistant
        <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">v5.0</span>
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
