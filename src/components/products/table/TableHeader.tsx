
import React from 'react';
import { Filter, RefreshCw, SortAsc, SortDesc, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TableHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isRefreshing: boolean;
  handleRefresh: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  isRefreshing, 
  handleRefresh 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          title="Filter"
          className="transition-all hover:bg-gray-100"
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          title="Refresh"
          className={`transition-all hover:bg-gray-100 ${isRefreshing ? 'animate-spin' : ''}`}
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TableHeader;
