
import React from 'react';
import { Item } from '@/types';
import ProductsTable from './table/ProductsTable';
import { motion } from 'framer-motion';

interface ProductTableProps {
  products: Item[];
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
  handleAddProduct: () => void;
}

const ProductTable: React.FC<ProductTableProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="product-table-container"
    >
      <ProductsTable {...props} />
    </motion.div>
  );
};

export default ProductTable;
