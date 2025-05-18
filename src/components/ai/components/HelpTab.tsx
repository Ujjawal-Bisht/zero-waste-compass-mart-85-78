
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Bot, Mic, ShoppingCart } from 'lucide-react';

interface HelpTopicProps {
  title: string;
  description: string;
}

interface HelpTabProps {
  helpTopics: HelpTopicProps[];
  sellerMode: boolean;
  onGetStartedClick: () => void;
  onTopicClick: (title: string) => void;
}

const HelpTab: React.FC<HelpTabProps> = ({
  helpTopics,
  sellerMode,
  onGetStartedClick,
  onTopicClick
}) => {
  return (
    <div className="p-2 space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {helpTopics.map((topic, i) => (
            <Card key={i} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-3" onClick={() => onTopicClick(topic.title)}>
                <h4 className="font-medium text-sm">{topic.title}</h4>
                <p className="text-xs text-gray-500">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">ZeroBot AI v4.0 Features</h3>
        <ul className="space-y-2 text-xs">
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <Sparkles size={10} />
            </Badge>
            <span>Real-time responses with streaming API</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <Bot size={10} />
            </Badge>
            <span>Context-aware shopping assistance</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <Mic size={10} />
            </Badge>
            <span>Voice input for hands-free operation</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <ShoppingCart size={10} />
            </Badge>
            <span>{sellerMode ? 'Seller inventory management' : 'Shopping preferences memory'}</span>
          </li>
        </ul>
      </div>
      
      <Button 
        variant="default" 
        className={`w-full ${sellerMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        onClick={onGetStartedClick}
      >
        Get Started
      </Button>
    </div>
  );
};

export default HelpTab;
