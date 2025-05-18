
import React from 'react';
import { motion } from 'framer-motion';
import ProductActions from '../actions/ProductActions';
import { Item } from '@/types';

interface ProductsHeaderProps {
  products: Item[];
  onAddProduct: () => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ products, onAddProduct }) => {
  return (
    <div className="flex justify-between items-center">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Your Products</h2>
        <p className="text-muted-foreground">Manage your product listings</p>
      </motion.div>
      
      <ProductActions 
        products={products}
        onAddProduct={onAddProduct}
      />
    </div>
  );
};

export default ProductsHeader;
