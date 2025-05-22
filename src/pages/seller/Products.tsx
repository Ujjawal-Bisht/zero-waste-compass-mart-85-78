
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Item } from '@/types';
import TopNavbar from '@/components/layouts/TopNavbar';
import ProductsHeader from '@/components/products/headers/ProductsHeader';
import CategoryFilters from '@/components/products/filters/CategoryFilters';
import ProductTable from '@/components/products/ProductTable';
import { useToast } from '@/components/ui/use-toast';
import { generateMockSellerProducts } from '@/utils/seller/mockProducts';

const SellerProducts: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Item[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  
  // Use the enhanced mock products
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = generateMockSellerProducts();
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);
  
  const handleFilterByCategory = (category: string) => {
    setActiveFilter(category);
  };
  
  // Filter products based on active category filter
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);
  
  const handleAddProduct = () => {
    navigate('/items/add');
  };
  
  // Utility functions for product table
  const getCategoryBadgeColor = (category: string) => {
    const colorMap: Record<string, string> = {
      food: 'bg-green-100 text-green-800 border-green-200',
      clothing: 'bg-blue-100 text-blue-800 border-blue-200',
      electronics: 'bg-purple-100 text-purple-800 border-purple-200',
      household: 'bg-amber-100 text-amber-800 border-amber-200',
      furniture: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      books: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      toys: 'bg-pink-100 text-pink-800 border-pink-200',
      medicine: 'bg-red-100 text-red-800 border-red-200',
      beauty: 'bg-rose-100 text-rose-800 border-rose-200',
      sports: 'bg-teal-100 text-teal-800 border-teal-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };
  
  const getStatusBadgeColor = (status: string) => {
    const colorMap: Record<string, string> = {
      available: 'bg-green-100 text-green-800 border-green-200',
      sold: 'bg-blue-100 text-blue-800 border-blue-200',
      expired: 'bg-red-100 text-red-800 border-red-200',
      donated: 'bg-purple-100 text-purple-800 border-purple-200',
      flagged: 'bg-amber-100 text-amber-800 border-amber-200',
      reserved: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <TopNavbar />
      <div className="container mx-auto py-6 px-4">
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
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ProductTable 
              products={filteredProducts} 
              getCategoryBadgeColor={getCategoryBadgeColor}
              getStatusBadgeColor={getStatusBadgeColor}
              formatDate={formatDate}
              handleAddProduct={handleAddProduct}
            />
          )}
        </motion.div>
      </div>
    </>
  );
};

export default SellerProducts;
