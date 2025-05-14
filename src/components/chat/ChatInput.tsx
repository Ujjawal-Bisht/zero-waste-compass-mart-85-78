
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="p-3 border-t bg-gray-50">
      <div className="flex gap-2 items-center">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className="flex-1 border-gray-200 focus:border-zwm-primary shadow-sm"
        />
        <Button 
          onClick={handleSendMessage} 
          className="zwm-gradient"
          disabled={!message.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
      <div className="text-center mt-2">
        <Collapsible>
          <CollapsibleTrigger className="text-xs text-gray-500 hover:text-zwm-primary flex justify-center w-full">
            Suggested questions
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "How to donate?", 
                "Nearby drop-offs?", 
                "Impact statistics", 
                "How does it work?", 
                "Benefits of Zero Waste",
                "Sustainability tips"
              ].map(q => (
                <Button 
                  key={q} 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-auto py-1"
                  onClick={() => {
                    setMessage(q);
                  }}
                >
                  {q}
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ChatInput;
