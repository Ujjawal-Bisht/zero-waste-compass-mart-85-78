
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar: React.FC = () => {
  return (
    <div className="flex-1 max-w-md navbar-item">
      <div className="relative w-full search-bar-focus rounded-md overflow-hidden">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground search-icon-animated" />
        <Input 
          type="search" 
          placeholder="Search..." 
          className="pl-10 w-full bg-gray-50 border-gray-100 transition-all duration-300 focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 focus:border-blue-400" 
        />
      </div>
    </div>
  );
};

export default SearchBar;
