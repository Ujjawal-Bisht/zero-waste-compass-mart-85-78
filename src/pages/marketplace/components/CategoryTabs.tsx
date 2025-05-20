
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  children: React.ReactNode;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  children 
}) => {
  return (
    <Tabs defaultValue={activeCategory} className="mb-8">
      <TabsList className="mb-8 overflow-x-auto flex whitespace-nowrap p-1 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
        {categories.map((category) => (
          <TabsTrigger 
            key={category}
            value={category} 
            className="tab-animate capitalize"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default CategoryTabs;
