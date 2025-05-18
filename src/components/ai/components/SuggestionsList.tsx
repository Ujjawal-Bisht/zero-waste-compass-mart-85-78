
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SuggestionsListProps {
  suggestions: string[];
  isSearching: boolean;
  handleSuggestionClick: (suggestion: string) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  isSearching,
  handleSuggestionClick
}) => {
  if (suggestions.length === 0 || isSearching) return null;

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      className="overflow-hidden bg-gray-50 border-t border-gray-100"
    >
      <div className="p-2 overflow-x-auto whitespace-nowrap flex gap-2">
        {suggestions.map((suggestion, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            className="h-7 text-xs bg-white whitespace-nowrap"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestionsList;
