
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Package, MoreVertical, ShoppingCart, IndianRupee, Printer, ArrowRight, Clock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Order = {
  id: string;
  buyerId: string;
  buyerName: string;
  items: {
    itemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  totalAmount: number;
  createdAt: string;
};

const SellerOrders: React.FC = () => {
  // This would be replaced with actual data from a database
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      buyerId: 'buyer123',
      buyerName: 'John Doe',
      items: [
        { itemId: '1', name: 'Organic Bananas', quantity: 2, price: 299.99 },
      ],
      status: 'pending',
      paymentStatus: 'paid',
      totalAmount: 599.98,
      createdAt: '2023-05-20T10:30:00',
    },
    {
      id: 'ORD002',
      buyerId: 'buyer456',
      buyerName: 'Jane Smith',
      items: [
        { itemId: '2', name: 'T-shirts Pack', quantity: 1, price: 2499.00 },
      ],
      status: 'shipped',
      paymentStatus: 'paid',
      totalAmount: 2499.00,
      createdAt: '2023-05-19T14:15:00',
    },
  ]);

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewDetails = (orderId: string) => {
    toast({
      title: "View Order Details",
      description: `Viewing details for order ${orderId}`,
      duration: 3000,
    });
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
      )
    );
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} is now ${newStatus}`,
      duration: 3000,
    });
  };

  const handleContactBuyer = (buyerName: string) => {
    toast({
      title: "Contact Buyer",
      description: `Sending message to ${buyerName}`,
      duration: 3000,
    });
  };

  const handlePrintInvoice = (orderId: string) => {
    toast({
      title: "Print Invoice",
      description: `Printing invoice for order ${orderId}`,
      duration: 3000,
    });
  };

  const handleSendShippingUpdate = (orderId: string) => {
    toast({
      title: "Shipping Update",
      description: `Sending shipping update for order ${orderId}`,
      duration: 3000,
    });
  };

  const handleCancelOrder = (orderId: string) => {
    toast({
      title: "Cancel Order",
      description: `Order ${orderId} has been cancelled`,
      variant: "destructive",
      duration: 3000,
    });
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? {...order, status: 'cancelled'} : order
      )
    );
  };

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
      <div>
        <motion.h2 
          className="text-3xl font-bold tracking-tight"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Orders
        </motion.h2>
        <motion.p 
          className="text-muted-foreground"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Manage customer orders and shipments
        </motion.p>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="product-card">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mr-2"
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.div>
              <CardTitle>All Orders</CardTitle>
            </div>
            <motion.div 
              className="ml-auto"
              whileHover={{ scale: 1.05 }}
            >
              <Button variant="outline" className="flex items-center button-shimmer">
                <Printer className="h-4 w-4 mr-2" />
                Export
              </Button>
            </motion.div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                component={TableBody}
              >
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center py-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, type: "spring" }}
                          className="mb-2"
                        >
                          <ShoppingCart className="h-12 w-12 text-gray-300" />
                        </motion.div>
                        <p>No orders yet</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      className="table-row-animate"
                      variants={itemVariants}
                      whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)", x: 3 }}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.buyerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {formatDate(order.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <IndianRupee size={14} className="mr-1" />
                          <motion.span whileHover={{ scale: 1.05 }}>
                            {order.totalAmount.toFixed(2)}
                          </motion.span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={`${getStatusBadgeColor(order.status)} badge-animate`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </motion.div>
                      </TableCell>
                      <TableCell>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={`${getPaymentStatusBadgeColor(order.paymentStatus)} badge-animate`}>
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </Badge>
                        </motion.div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 menu-icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="table-dropdown-content">
                            <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleViewDetails(order.id)}
                              className="flex items-center cursor-pointer action-view"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                              View details
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            {order.status !== 'pending' && (
                              <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(order.id, 'pending')}
                                className="cursor-pointer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                Set as Pending
                              </DropdownMenuItem>
                            )}
                            {order.status !== 'processing' && (
                              <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(order.id, 'processing')}
                                className="cursor-pointer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path d="M9 12.75h6M9 15h6"/><path d="M9 9.75C9 9.34 9.34 9 9.75 9h4.5c.41 0 .75.34.75.75v4.5c0 .41-.34.75-.75.75h-4.5C9.34 15 9 14.66 9 14.25v-4.5Z"/></svg>
                                Set as Processing
                              </DropdownMenuItem>
                            )}
                            {order.status !== 'shipped' && (
                              <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(order.id, 'shipped')}
                                className="cursor-pointer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19a2 2 0 0 1-2-2"/><path d="M17 19a2 2 0 0 0 2-2"/><path d="M3 17h18"/><path d="M6 17V6a1 1 0 0 1 1-1h5"/><path d="M9 5H8"/><path d="M17 8v9"/><path d="M13 8a3 3 0 1 1 6 0v1H13V8Z"/></svg>
                                Set as Shipped
                              </DropdownMenuItem>
                            )}
                            {order.status !== 'delivered' && (
                              <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(order.id, 'delivered')}
                                className="cursor-pointer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 3c-4.8 0-9 3.86-9 9s4.2 9 9 9 9-3.86 9-9-4.2-9-9-9"/></svg>
                                Set as Delivered
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleContactBuyer(order.buyerName)}
                              className="cursor-pointer"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Contact buyer
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handlePrintInvoice(order.id)}
                              className="cursor-pointer"
                            >
                              <Printer className="h-4 w-4 mr-2" />
                              Print invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleSendShippingUpdate(order.id)}
                              className="cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4l2 2"/><path d="M5 19h14"/><path d="M17.7 14.5c1.7-2 2.3-4.5 1.7-7.5"/><path d="M19.4 7c-.4-1.3-1.2-2-3.4-3-3-1.5-6-1.5-9 0-3 1.5-3 6.5-3 8 0 .6.1 1.2.3 1.7"/><path d="M16 19c0-4-1.8-7-4-7s-4 3-4 7"/></svg>
                              Send shipping update
                            </DropdownMenuItem>
                            
                            {order.status !== 'cancelled' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="text-red-600 cursor-pointer action-delete"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                                  Cancel order
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </motion.div>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SellerOrders;
