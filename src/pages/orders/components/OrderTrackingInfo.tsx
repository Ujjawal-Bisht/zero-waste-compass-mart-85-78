
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Order } from '@/types';

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
  
  if (shippedOrders.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
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
            {shippedOrders.map(order => (
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
                    onClick={() => onTrackOrder(order.id)} 
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
  );
};
