
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Item, ItemCategory } from '@/types';
import { 
  Plus, 
  Package, 
  Printer, 
  Filter, 
  ArrowUpDown,
  FileDown, 
  FileUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductTable from '@/components/products/ProductTable';
import { getCategoryBadgeColor, getStatusBadgeColor, formatDate } from '@/components/products/productUtils';
import { exportProducts } from '@/utils/exportUtils';
import { useLocalStorage } from '@/pages/items/hooks/useLocalStorage';
import { toast } from '@/components/ui/use-toast';

const SellerProducts: React.FC = () => {
  const navigate = useNavigate();
  
  // Use local storage to retrieve saved products
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);
  const [products, setProducts] = useState<Item[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Initialize with sample products if no saved products
  useEffect(() => {
    const sampleProducts: Item[] = [
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
    ];
    
    // Combine sample products with saved products
    const allProducts = [...sampleProducts];
    if (savedProducts && savedProducts.length > 0) {
      savedProducts.forEach(product => {
        // Add only if not already in the list
        if (!allProducts.some(p => p.id === product.id)) {
          allProducts.push(product);
        }
      });
    }
    
    setProducts(allProducts);
  }, [savedProducts]);

  const handleAddProduct = () => {
    navigate('/items/add');
  };
  
  const handleExportProducts = () => {
    exportProducts(products);
    toast({
      title: "Products exported",
      description: "CSV file has been downloaded",
      duration: 3000
    });
  };

  const handleImportProducts = () => {
    // This would open a file picker in a real app
    toast({
      title: "Import functionality",
      description: "This would open a file picker to import products",
      duration: 3000
    });
  };

  const handleFilterByCategory = (category: ItemCategory | null) => {
    if (category === activeFilter) {
      setActiveFilter(null); // Clear filter if clicking the active one
    } else {
      setActiveFilter(category);
    }
  };
  
  // Get filtered products
  const filteredProducts = activeFilter 
    ? products.filter(p => p.category === activeFilter) 
    : products;

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
            <Button variant="outline" onClick={handleImportProducts} className="button-shimmer flex items-center">
              <FileUp className="mr-2 h-4 w-4" /> Import
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" onClick={handleExportProducts} className="button-shimmer flex items-center">
              <FileDown className="mr-2 h-4 w-4" /> Export
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={handleAddProduct} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 button-shimmer text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Category quick filters */}
      <motion.div 
        className="flex flex-wrap gap-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {['food', 'clothing', 'electronics', 'furniture', 'household'].map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterByCategory(category as ItemCategory)}
            className="rounded-full"
          >
            <span 
              className={`h-2 w-2 rounded-full ${
                category === 'food' ? 'bg-green-500' : 
                category === 'clothing' ? 'bg-blue-500' :
                category === 'electronics' ? 'bg-yellow-500' :
                category === 'furniture' ? 'bg-purple-500' :
                'bg-cyan-500'
              } mr-2`}
            ></span>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
        {activeFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="text-gray-500"
          >
            Clear filter
          </Button>
        )}
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="product-card border-0 shadow-md">
          <CardHeader className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-indigo-600" />
              <span>All Products {activeFilter && `(${activeFilter})`}</span>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </Button>
              <Button variant="ghost" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-1" /> Sort
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              <ProductTable
                products={filteredProducts}
                getCategoryBadgeColor={getCategoryBadgeColor}
                getStatusBadgeColor={getStatusBadgeColor}
                formatDate={formatDate}
                handleAddProduct={handleAddProduct}
              />
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SellerProducts;
