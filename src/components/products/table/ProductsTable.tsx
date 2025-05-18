
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TableHeader from './TableHeader';
import ProductsTableBody from './ProductsTableBody';
import TablePagination from './TablePagination';
import { Item } from '@/types';

interface ProductsTableProps {
  products: Item[];
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
  handleAddProduct: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  getCategoryBadgeColor,
  getStatusBadgeColor,
  formatDate,
  handleAddProduct
}) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedProducts, setSortedProducts] = useState<Item[]>(products);
  const [animateSort, setAnimateSort] = useState(false);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const handleSortChange = (field: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortField === field) {
      direction = sortDirection === 'asc' ? 'desc' : 'asc';
    }
    
    setSortField(field);
    setSortDirection(direction);
    setAnimateSort(true);

    // Sort the products
    const sorted = [...sortedProducts].sort((a, b) => {
      if (field === 'name') {
        return direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (field === 'price') {
        return direction === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      } else if (field === 'category') {
        return direction === 'asc' 
          ? a.category.localeCompare(b.category) 
          : b.category.localeCompare(a.category);
      } else if (field === 'status') {
        return direction === 'asc' 
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      } else if (field === 'createdAt') {
        return direction === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
    
    setSortedProducts(sorted);

    setTimeout(() => setAnimateSort(false), 300);
  };

  return (
    <motion.div 
      className="bg-white shadow rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            handleSortChange={handleSortChange}
            animateSort={animateSort}
          />
          <ProductsTableBody 
            products={sortedProducts}
            getCategoryBadgeColor={getCategoryBadgeColor}
            getStatusBadgeColor={getStatusBadgeColor}
            formatDate={formatDate}
            handleAddProduct={handleAddProduct}
          />
        </table>
      </div>
      <TablePagination totalItems={sortedProducts.length} />
    </motion.div>
  );
};

export default ProductsTable;
