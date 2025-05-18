
import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';

interface TableColumnHeaderProps {
  label: string;
  field: string;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  handleSortChange: (field: string) => void;
}

const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  label,
  field,
  sortField,
  sortDirection,
  handleSortChange,
}) => {
  return (
    <th 
      scope="col" 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => handleSortChange(field)}
    >
      <div className="flex items-center">
        {label}
        {sortField === field && (
          sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
        )}
      </div>
    </th>
  );
};

export default TableColumnHeader;
