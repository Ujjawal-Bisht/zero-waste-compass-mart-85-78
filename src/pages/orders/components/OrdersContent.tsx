
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { Order } from '@/types';
import { OrdersTable } from './OrdersTable';
import { EmptyOrdersState } from './EmptyOrdersState';
import { motion } from 'framer-motion';

interface OrdersContentProps {
  filteredOrders: Order[];
  selectedTab: 'all' | 'active' | 'completed';
  formatDate: (date: string) => string;
  onCancelOrder: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
  onChatWithSeller?: (sellerId: string, sellerName?: string) => void;
}

export const OrdersContent: React.FC<OrdersContentProps> = ({
  filteredOrders,
  selectedTab,
  formatDate,
  onCancelOrder,
  onTrackOrder,
  onChatWithSeller
}) => {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 border-b">
          <CardTitle className="flex items-center">
            <Truck className="mr-2 h-5 w-5 text-primary" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredOrders.length > 0 ? (
            <OrdersTable 
              orders={filteredOrders}
              formatDate={formatDate}
              onCancelOrder={onCancelOrder}
              onTrackOrder={onTrackOrder}
              onChatWithSeller={onChatWithSeller}
            />
          ) : (
            <EmptyOrdersState selectedTab={selectedTab} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
