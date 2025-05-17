
import React from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SuggestedQuestionsProps {
  suggestions: string[];
  showSearch: boolean;
  onSelectSuggestion: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  suggestions,
  showSearch,
  onSelectSuggestion
}) => {
  return (
    <div className="text-center mt-2">
      <Collapsible>
        <CollapsibleTrigger className="text-xs text-gray-500 hover:text-zwm-primary flex justify-center w-full">
          {showSearch ? "Close search" : "Suggested questions"}
        </CollapsibleTrigger>
        <CollapsibleContent>
          {!showSearch && (
            <div className="pt-2 pb-1">
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map(q => (
                  <Button 
                    key={q} 
                    variant="outline" 
                    size="sm"
                    className="text-xs h-auto py-1 justify-start text-left"
                    onClick={() => onSelectSuggestion(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SuggestedQuestions;
