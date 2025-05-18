
import React from 'react';
import { Button } from '@/components/ui/button';

interface TablePaginationProps {
  totalItems: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({ totalItems }) => {
  if (totalItems === 0) {
    return null;
  }
  
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{totalItems}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <Button variant="outline" size="sm" className="rounded-l-md">Previous</Button>
            <Button variant="outline" size="sm" className="ml-1 rounded-r-md">Next</Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
