
import React from 'react';
import { 
  DropdownMenuSub, 
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryMenuProps } from './types';

const CategoryMenu: React.FC<CategoryMenuProps> = ({ selectedCategory, onCategoryChange }) => {
  const itemAnimation = {
    whileHover: { x: 5, backgroundColor: "rgba(243, 244, 246, 0.8)" },
    transition: { type: "spring", stiffness: 300, damping: 10 }
  };

  const categories = [
    { value: 'food', color: 'bg-green-500', label: 'Food' },
    { value: 'clothing', color: 'bg-blue-500', label: 'Clothing' },
    { value: 'electronics', color: 'bg-yellow-500', label: 'Electronics' },
    { value: 'furniture', color: 'bg-purple-500', label: 'Furniture' },
    { value: 'household', color: 'bg-cyan-500', label: 'Household' },
    { value: 'books', color: 'bg-indigo-500', label: 'Books' },
    { value: 'toys', color: 'bg-pink-500', label: 'Toys' },
    { value: 'medicine', color: 'bg-red-500', label: 'Medicine' },
    { value: 'other', color: 'bg-gray-500', label: 'Other' }
  ];

  return (
    <DropdownMenuSub>
      <motion.div {...itemAnimation}>
        <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
          <Tag className="h-4 w-4 mr-2" />
          Change Category
        </DropdownMenuSubTrigger>
      </motion.div>
      <DropdownMenuSubContent className="min-w-[180px]">
        <DropdownMenuRadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
          {categories.map(category => (
            <motion.div key={category.value} {...itemAnimation}>
              <DropdownMenuRadioItem value={category.value} className="cursor-pointer">
                <span className={`h-2 w-2 rounded-full ${category.color} mr-2 inline-block`}></span> {category.label}
              </DropdownMenuRadioItem>
            </motion.div>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default CategoryMenu;
