
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ItemCategory } from '@/types';

interface CategoryFiltersProps {
  activeFilter: string | null;
  onFilterChange: (category: ItemCategory | null) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  activeFilter, 
  onFilterChange 
}) => {
  return (
    <motion.div 
      className="flex flex-wrap gap-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      {['food', 'clothing', 'electronics', 'furniture', 'household'].map((category) => (
        <Button
          key={category}
          variant={activeFilter === category ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(category as ItemCategory)}
          className="rounded-full"
        >
          <span 
            className={`h-2 w-2 rounded-full ${
              category === 'food' ? 'bg-green-500' : 
              category === 'clothing' ? 'bg-blue-500' :
              category === 'electronics' ? 'bg-yellow-500' :
              category === 'furniture' ? 'bg-purple-500' :
              'bg-cyan-500'
            } mr-2`}
          ></span>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
      {activeFilter && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(null)}
          className="text-gray-500"
        >
          Clear filter
        </Button>
      )}
    </motion.div>
  );
};

export default CategoryFilters;
