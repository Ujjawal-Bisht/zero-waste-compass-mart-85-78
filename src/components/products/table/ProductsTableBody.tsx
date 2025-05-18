
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        staggerChildren: 0.08,
        delayChildren: 0.1
      } 
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  if (products.length === 0) {
    return (
      <motion.tbody
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <EmptyProductsView handleAddProduct={handleAddProduct} />
      </motion.tbody>
    );
  }

  return (
    <motion.tbody
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AnimatePresence>
        {products.map((product, index) => (
          <ProductRow 
            key={product.id}
            product={product}
            getCategoryBadgeColor={getCategoryBadgeColor}
            getStatusBadgeColor={getStatusBadgeColor}
            formatDate={formatDate}
          />
        ))}
      </AnimatePresence>
    </motion.tbody>
  );
};

export default ProductsTableBody;
