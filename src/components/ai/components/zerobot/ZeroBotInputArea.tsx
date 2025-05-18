
import React from 'react';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ZeroBotInputAreaProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  trainingMode?: boolean;
}

const ZeroBotInputArea: React.FC<ZeroBotInputAreaProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  trainingMode
}) => {
  if (trainingMode) return null;
  
  return (
    <div className="flex items-end w-full gap-2">
      <Textarea
        className="min-h-8 resize-none"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        rows={1}
      />
      <Button 
        size="icon" 
        className="h-9 w-9 shrink-0 rounded bg-indigo-500 hover:bg-indigo-600"
        onClick={handleSendMessage}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ZeroBotInputArea;
