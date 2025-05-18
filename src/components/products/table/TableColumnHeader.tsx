
import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion';

interface TableColumnHeaderProps {
  label: string;
  field: string;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  handleSortChange: (field: string) => void;
  animateSort?: boolean;
}

const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  label,
  field,
  sortField,
  sortDirection,
  handleSortChange,
  animateSort = false
}) => {
  const isActive = sortField === field;
  
  return (
    <th 
      scope="col" 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSortChange(field)}
    >
      <div className="flex items-center">
        {label}
        {isActive ? (
          <motion.div
            className={animateSort && isActive ? 'sort-animation' : ''}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {sortDirection === 'asc' ? 
              <SortAsc className="ml-1 h-3 w-3 text-blue-500" /> : 
              <SortDesc className="ml-1 h-3 w-3 text-blue-500" />
            }
          </motion.div>
        ) : (
          <div className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-30 transition-opacity">
            <SortAsc className="h-3 w-3" />
          </div>
        )}
      </div>
    </th>
  );
};

export default TableColumnHeader;
