
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="sm" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="sm" className="flex items-center">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{totalItems}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </motion.div>
        <div>
          <motion.nav 
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" 
            aria-label="Pagination"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="rounded-l-md flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="ml-1 rounded-r-md flex items-center">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          </motion.nav>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
