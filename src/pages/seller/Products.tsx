
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Item } from '@/types';
import { Plus, Package, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductTable from '@/components/products/ProductTable';
import { getCategoryBadgeColor, getStatusBadgeColor, formatDate } from '@/components/products/productUtils';
import { exportProducts } from '@/utils/exportUtils';

const SellerProducts: React.FC = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Item[]>([
    {
      id: '1',
      name: 'Organic Bananas',
      description: 'Bundle of organic bananas, slightly ripened',
      category: 'food',
      imageUrl: 'https://via.placeholder.com/150',
      expiryDate: '2023-06-01',
      createdAt: '2023-05-15',
      updatedAt: '2023-05-15',
      status: 'available',
      userId: 'seller123',
      userName: 'Demo Business',
      userPhoto: null,
      location: {
        address: '123 Main St',
        lat: 40.7128,
        lng: -74.006,
      },
      quantity: 20,
      originalPrice: 399.99,
      currentPrice: 299.99,
      dynamicPricingEnabled: true,
    },
    {
      id: '2',
      name: 'T-shirts Pack',
      description: 'Pack of 5 plain t-shirts, various sizes',
      category: 'clothing',
      imageUrl: 'https://via.placeholder.com/150',
      expiryDate: '2024-05-15',
      createdAt: '2023-05-10',
      updatedAt: '2023-05-10',
      status: 'available',
      userId: 'seller123',
      userName: 'Demo Business',
      userPhoto: null,
      location: {
        address: '123 Main St',
        lat: 40.7128,
        lng: -74.006,
      },
      quantity: 10,
      originalPrice: 3499.00,
      currentPrice: 2499.00,
      dynamicPricingEnabled: false,
    },
  ]);

  const handleAddProduct = () => {
    navigate('/items/add');
  };
  
  const handleExportProducts = () => {
    exportProducts(products);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Your Products</h2>
          <p className="text-muted-foreground">Manage your product listings</p>
        </motion.div>
        <motion.div
          className="flex gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" onClick={handleExportProducts} className="button-shimmer flex items-center">
              <Printer className="mr-2 h-4 w-4" /> Export
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={handleAddProduct} className="zwm-gradient button-shimmer">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="product-card">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              <span>All Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTable
              products={products}
              getCategoryBadgeColor={getCategoryBadgeColor}
              getStatusBadgeColor={getStatusBadgeColor}
              formatDate={formatDate}
              handleAddProduct={handleAddProduct}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SellerProducts;
