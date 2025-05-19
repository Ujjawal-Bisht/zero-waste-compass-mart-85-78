
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMessages: any[];
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  filteredMessages,
  isSearching
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isSearching) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearching]);

  if (!isSearching) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="p-2 bg-gray-50 flex items-center gap-2">
        <Input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversation..."
          className="w-full h-8 text-sm"
          autoComplete="off"
        />
        {searchQuery && (
          <Button
            variant="ghost" 
            size="icon"
            onClick={() => setSearchQuery('')}
            className="h-6 w-6"
          >
            <X size={14} />
          </Button>
        )}
      </div>
      
      {searchQuery && (
        <div className="px-3 py-1 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Found {filteredMessages.length} {filteredMessages.length === 1 ? 'result' : 'results'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar;
