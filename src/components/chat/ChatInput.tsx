
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
  
  // Suggestion categories
  const [currentCategory, setCurrentCategory] = useState<'general' | 'sustainability' | 'climate' | 'personal'>('general');
  
  // Suggested questions by category
  const suggestions = {
    general: [
      "How does Zero Waste Mart work?", 
      "Where are nearby drop-offs?", 
      "What impact have we made?", 
      "How to donate items?", 
      "Benefits of Zero Waste",
      "Best ways to reduce waste"
    ],
    sustainability: [
      "Tips for sustainable living?",
      "How to start composting?",
      "Zero waste kitchen ideas?",
      "Eco-friendly alternatives?",
      "Plastic-free options?",
      "Sustainable fashion?"
    ],
    climate: [
      "How does reusing help climate?",
      "Carbon footprint of recycling?",
      "Climate impact of food waste?",
      "Individual vs corporate impact?",
      "Local climate initiatives?",
      "Water conservation tips?"
    ],
    personal: [
      "Track my waste reduction?",
      "Start my zero waste journey?",
      "Find local sustainability groups?",
      "Create sustainable habits?",
      "Save money while being eco-friendly?",
      "Teach kids about sustainability?"
    ]
  };

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
          placeholder="Ask me anything about sustainability..."
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
            <div className="pt-2 pb-1">
              <div className="flex justify-center space-x-1 mb-2">
                {(Object.keys(suggestions) as Array<keyof typeof suggestions>).map(category => (
                  <Button
                    key={category}
                    variant={currentCategory === category ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={() => setCurrentCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {suggestions[currentCategory].map(q => (
                  <Button 
                    key={q} 
                    variant="outline" 
                    size="sm"
                    className="text-xs h-auto py-1 justify-start text-left"
                    onClick={() => {
                      setMessage(q);
                    }}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ChatInput;
