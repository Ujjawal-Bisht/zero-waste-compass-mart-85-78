
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductManagement } from '@/hooks/products/useProductManagement';
import ProductsHeader from '@/components/products/headers/ProductsHeader';
import CategoryFilters from '@/components/products/filters/CategoryFilters';
import ProductsCard from '@/components/products/containers/ProductsCard';

const SellerProducts: React.FC = () => {
  const navigate = useNavigate();
  const { filteredProducts, activeFilter, handleFilterByCategory } = useProductManagement();
  
  const handleAddProduct = () => {
    navigate('/items/add');
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProductsHeader 
        products={filteredProducts} 
        onAddProduct={handleAddProduct} 
      />
      
      <CategoryFilters 
        activeFilter={activeFilter} 
        onFilterChange={handleFilterByCategory} 
      />
      
      <ProductsCard 
        products={filteredProducts} 
        activeFilter={activeFilter}
        handleAddProduct={handleAddProduct}
      />
    </motion.div>
  );
};

export default SellerProducts;
