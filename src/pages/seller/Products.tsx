import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Item, ItemCategory } from '@/types';
import { Plus, Package, MoreVertical, IndianRupee, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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

  const getCategoryBadgeColor = (category: ItemCategory) => {
    const colors: Record<ItemCategory, string> = {
      food: 'bg-green-100 text-green-800',
      clothing: 'bg-blue-100 text-blue-800',
      electronics: 'bg-purple-100 text-purple-800',
      furniture: 'bg-amber-100 text-amber-800',
      household: 'bg-cyan-100 text-cyan-800',
      books: 'bg-indigo-100 text-indigo-800',
      toys: 'bg-pink-100 text-pink-800',
      medicine: 'bg-red-100 text-red-800', // Added missing medicine category
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category];
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      available: 'bg-green-100 text-green-800',
      donated: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800',
      flagged: 'bg-amber-100 text-amber-800',
      sold: 'bg-purple-100 text-purple-800',
    };
    return colors[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

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
      <div className="flex justify-between items-center">
        <div>
          <motion.h2 
            className="text-3xl font-bold tracking-tight"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Products
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Manage your product listings
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={handleAddProduct} className="zwm-gradient button-shimmer">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="product-card">
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                        <div className="flex flex-col items-center py-8">
                          <Package className="h-12 w-12 text-gray-300 mb-2" />
                          <p>No products found</p>
                          <Button variant="link" onClick={handleAddProduct}>
                            Add your first product
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => (
                      <motion.tr 
                        key={product.id}
                        className="table-row-animate"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100">
                              {product.imageUrl && (
                                <img src={product.imageUrl} alt={product.name} className="h-10 w-10 rounded object-cover" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getCategoryBadgeColor(product.category)} badge-animate`}>
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <IndianRupee size={14} className="mr-1" />
                            {product.currentPrice.toFixed(2)}
                          </div>
                          {product.dynamicPricingEnabled && (
                            <div className="text-xs text-green-600">Dynamic pricing</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(product.expiryDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getStatusBadgeColor(product.status)} badge-animate`}>
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 menu-icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dropdown-menu-animate">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SellerProducts;
