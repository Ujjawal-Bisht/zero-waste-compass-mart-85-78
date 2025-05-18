
import React from 'react';
import { motion } from 'framer-motion';
import ProductRow from '../ProductRow';
import EmptyProductsView from './EmptyProductsView';
import { Item } from '@/types';

interface ProductsTableBodyProps {
  products: Item[];
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
  handleAddProduct: () => void;
}

const ProductsTableBody: React.FC<ProductsTableBodyProps> = ({
  products,
  getCategoryBadgeColor,
  getStatusBadgeColor,
  formatDate,
  handleAddProduct
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  if (products.length === 0) {
    return (
      <tbody>
        <EmptyProductsView handleAddProduct={handleAddProduct} />
      </tbody>
    );
  }

  return (
    <motion.tbody
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductRow 
          key={product.id}
          product={product}
          getCategoryBadgeColor={getCategoryBadgeColor}
          getStatusBadgeColor={getStatusBadgeColor}
          formatDate={formatDate}
        />
      ))}
    </motion.tbody>
  );
};

export default ProductsTableBody;
