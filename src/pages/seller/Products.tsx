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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

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

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Editing product",
      description: `You're now editing product ${productId}`,
      duration: 3000,
    });
    // navigate(`/items/edit/${productId}`);
  };

  const handleViewDetails = (productId: string) => {
    toast({
      title: "Viewing product details",
      description: `Viewing details for product ${productId}`,
      duration: 3000,
    });
    // navigate(`/items/${productId}`);
  };

  const handleDuplicateProduct = (product: Item) => {
    toast({
      title: "Product duplicated",
      description: `"${product.name}" has been duplicated`,
      duration: 3000,
    });
  };

  const handleToggleVisibility = (product: Item, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'flagged' : 'available';
    toast({
      title: "Status updated",
      description: `Product "${product.name}" is now ${newStatus}`,
      duration: 3000,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Confirm deletion",
      description: `Product ID: ${productId} would be deleted`,
      variant: "destructive",
      duration: 3000,
    });
  };

  // Animation variants for framer-motion
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
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
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              <span>All Products</span>
            </CardTitle>
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
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                          >
                            <Package className="h-12 w-12 text-gray-300 mb-2" />
                          </motion.div>
                          <p>No products found</p>
                          <Button variant="link" onClick={handleAddProduct} className="mt-2">
                            Add your first product
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <motion.tbody
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {products.map((product) => (
                        <motion.tr 
                          key={product.id}
                          className="table-row-animate hover:bg-gray-50"
                          variants={itemVariants}
                          whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)", x: 3 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <motion.div 
                                className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 overflow-hidden"
                                whileHover={{ scale: 1.1 }}
                              >
                                {product.imageUrl && (
                                  <img src={product.imageUrl} alt={product.name} className="h-10 w-10 rounded object-cover" />
                                )}
                              </motion.div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge className={`${getCategoryBadgeColor(product.category)} badge-animate`}>
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                              </Badge>
                            </motion.div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <IndianRupee size={14} className="mr-1" />
                              <motion.span 
                                className={product.dynamicPricingEnabled ? "price-pulse" : ""}
                              >
                                {product.currentPrice.toFixed(2)}
                              </motion.span>
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
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge className={`${getStatusBadgeColor(product.status)} badge-animate`}>
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                              </Badge>
                            </motion.div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 menu-icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="table-dropdown-content">
                                <DropdownMenuItem 
                                  onClick={() => handleViewDetails(product.id)}
                                  className="flex items-center cursor-pointer action-view"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleEditProduct(product.id)}
                                  className="flex items-center cursor-pointer action-edit"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDuplicateProduct(product)}
                                  className="flex items-center cursor-pointer"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleToggleVisibility(product, product.status)}
                                  className="flex items-center cursor-pointer"
                                >
                                  {product.status === 'available' ? (
                                    <>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m1 1 22 22"/></svg>
                                      Hide product
                                    </>
                                  ) : (
                                    <>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                      Show product
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="flex items-center cursor-pointer text-red-600 action-delete"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      ))}
                    </motion.tbody>
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
