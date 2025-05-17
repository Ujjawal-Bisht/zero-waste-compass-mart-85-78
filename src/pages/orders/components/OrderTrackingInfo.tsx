
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Package, MapPin, CheckCircle, Loader, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface OrderTrackingInfoProps {
  orders: Order[];
  onTrackOrder: (orderId: string) => void;
  formatDate: (date: string) => string;
}

export const OrderTrackingInfo: React.FC<OrderTrackingInfoProps> = ({
  orders,
  onTrackOrder,
  formatDate
}) => {
  const shippedOrders = orders.filter(order => order.status === 'shipped');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  if (shippedOrders.length === 0) {
    return null;
  }

  // Function to get progress based on current status
  const getProgressValue = (status: string): number => {
    const statusValues: Record<string, number> = {
      'pending': 0,
      'processing': 25,
      'shipped': 65,
      'delivered': 100,
      'cancelled': 0
    };
    return statusValues[status] || 0;
  };

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b flex flex-row items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="mr-2"
            >
              <Truck className="h-5 w-5 text-purple-600" />
            </motion.div>
            <CardTitle>Shipment Tracking</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <AnimatePresence>
            {shippedOrders.map(order => (
              <motion.div 
                key={`shipping-${order.id}`} 
                className="border-b last:border-b-0"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 cursor-pointer" onClick={() => toggleExpandOrder(order.id)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-indigo-100 rounded-full"
                      >
                        <Package className="h-5 w-5 text-indigo-600" />
                      </motion.div>
                      <div>
                        <h3 className="font-medium">Order #{order.id.split('-')[1]}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Shipped on {formatDate(order.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-3 md:mt-0">
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTrackOrder(order.id);
                          }} 
                          className="transition-all bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg"
                        >
                          Track Package
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedOrderId === order.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Shipping Progress</h4>
                            <span className="text-xs text-gray-500">Estimated delivery: {new Date(new Date(order.updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                          </div>
                          <Progress value={getProgressValue(order.status)} className="h-2 bg-gray-200" indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Order Placed</span>
                            <span>Processing</span>
                            <span>Shipped</span>
                            <span>Delivered</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Tracking Timeline</h4>
                          <div className="space-y-3">
                            <motion.div 
                              className="flex items-start space-x-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="mt-0.5">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Order Confirmed</p>
                                <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-start space-x-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="mt-0.5">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Processing Started</p>
                                <p className="text-xs text-gray-500">{formatDate(new Date(new Date(order.createdAt).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString())}</p>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-start space-x-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="mt-0.5">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Shipped</p>
                                <p className="text-xs text-gray-500">{formatDate(order.updatedAt)}</p>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-start space-x-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="mt-0.5">
                                <Loader className="h-4 w-4 text-blue-500 animate-spin" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">In Transit</p>
                                <p className="text-xs text-gray-500">Package is on its way</p>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-start space-x-2 opacity-50"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 0.5 }}
                              transition={{ delay: 0.5 }}
                            >
                              <div className="mt-0.5">
                                <Clock className="h-4 w-4 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Estimated Delivery</p>
                                <p className="text-xs text-gray-500">{new Date(new Date(order.updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-indigo-700">Delivery Location</h4>
                              <p className="text-xs text-indigo-600 mt-1">
                                123 Main Street, Apt 4B, City Name, State, 123456
                              </p>
                              <motion.div 
                                className="mt-2"
                                whileHover={{ scale: 1.02 }}
                              >
                                <Button size="sm" variant="outline" className="text-xs h-7 border-indigo-200 text-indigo-700 hover:bg-indigo-100">
                                  View on Map
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex items-center text-indigo-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`mailto:support@example.com?subject=Question about order ${order.id}`);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M7 9l5 3.5L17 9"/><path d="M2 7v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
                              Contact Support
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};
