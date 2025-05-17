
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Package, Check, AlertTriangle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Order } from '@/types';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ord-123456",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-001",
    items: [
      { itemId: "item-001", quantity: 2, price: 1299, name: "Organic Apples" },
      { itemId: "item-002", quantity: 1, price: 799, name: "Fresh Bread" }
    ],
    status: "processing",
    paymentStatus: "paid",
    totalAmount: 3397,
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-15T10:35:00Z"
  },
  {
    id: "ord-789012",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-002",
    items: [
      { itemId: "item-003", quantity: 1, price: 6999, name: "Wireless Headphones" }
    ],
    status: "shipped",
    paymentStatus: "paid",
    totalAmount: 6999,
    createdAt: "2025-05-10T14:20:00Z",
    updatedAt: "2025-05-11T09:15:00Z"
  },
  {
    id: "ord-345678",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-003",
    items: [
      { itemId: "item-004", quantity: 3, price: 499, name: "Organic Bananas" },
      { itemId: "item-005", quantity: 2, price: 299, name: "Fresh Milk" }
    ],
    status: "delivered",
    paymentStatus: "paid",
    totalAmount: 2095,
    createdAt: "2025-05-05T16:45:00Z",
    updatedAt: "2025-05-07T12:30:00Z"
  },
  {
    id: "ord-901234",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-004",
    items: [
      { itemId: "item-006", quantity: 1, price: 2499, name: "Cotton T-Shirt" }
    ],
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 2499,
    createdAt: "2025-05-16T09:10:00Z",
    updatedAt: "2025-05-16T09:10:00Z"
  }
];

const MyOrders: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');

  // Filter orders based on selected tab
  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return ['pending', 'processing', 'shipped'].includes(order.status);
    if (selectedTab === 'completed') return order.status === 'delivered' || order.status === 'cancelled';
    return true;
  });

  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would call an API to cancel the order
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      )
    );
    
    toast({
      title: "Order Cancelled",
      description: `Order #${orderId.split('-')[1]} has been cancelled successfully.`,
      variant: "destructive",
    });
  };

  const handleTrackOrder = (orderId: string) => {
    toast({
      title: "Tracking Information",
      description: `Tracking details for order #${orderId.split('-')[1]} have been sent to your email.`,
    });
  };

  const getStatusBadge = (status: Order['status']) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-indigo-100 text-indigo-800">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch(status) {
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-indigo-500" />;
      case 'delivered':
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-muted-foreground mt-1">Track and manage your orders</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex space-x-2 mt-4 md:mt-0"
          >
            <Button 
              variant={selectedTab === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('all')}
              className="rounded-full"
            >
              All Orders
            </Button>
            <Button 
              variant={selectedTab === 'active' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('active')}
              className="rounded-full"
            >
              Active
            </Button>
            <Button 
              variant={selectedTab === 'completed' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('completed')}
              className="rounded-full"
            >
              Completed
            </Button>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 border-b">
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-primary" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        className="hover:bg-gray-50 table-row-animate"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ 
                          backgroundColor: "rgba(243, 244, 246, 0.5)", 
                          transition: { duration: 0.2 } 
                        }}
                      >
                        <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {order.items.map((item, index) => (
                              <span key={item.itemId} className="text-sm">
                                {item.name} x {item.quantity}
                                {index < order.items.length - 1 && <span className="text-gray-300">, </span>}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            {getStatusBadge(order.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {['pending', 'processing'].includes(order.status) && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  Cancel
                                </Button>
                              </motion.div>
                            )}
                            {['processing', 'shipped'].includes(order.status) && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleTrackOrder(order.id)}
                                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  Track
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Truck className="h-12 w-12 text-gray-300 mb-4 animate-bounce" />
                    <h3 className="text-lg font-medium">No orders found</h3>
                    <p className="text-muted-foreground">
                      {selectedTab === 'all' 
                        ? "You haven't placed any orders yet." 
                        : selectedTab === 'active' 
                          ? "You don't have any active orders." 
                          : "You don't have any completed orders."}
                    </p>
                    <Button 
                      onClick={() => navigate('/marketplace')} 
                      className="mt-4 buyer-button-gradient"
                    >
                      Browse Marketplace
                    </Button>
                  </motion.div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Tracking Information */}
        {filteredOrders.some(order => order.status === 'shipped') && (
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-indigo-500" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredOrders
                    .filter(order => order.status === 'shipped')
                    .map(order => (
                      <motion.div 
                        key={`shipping-${order.id}`} 
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-blue-50"
                        whileHover={{ 
                          scale: 1.01,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div>
                          <h3 className="font-medium">Order #{order.id.split('-')[1]}</h3>
                          <p className="text-sm text-muted-foreground">Shipped on {formatDate(order.updatedAt)}</p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            onClick={() => handleTrackOrder(order.id)} 
                            className="mt-2 md:mt-0 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg"
                          >
                            Track Package
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyOrders;
