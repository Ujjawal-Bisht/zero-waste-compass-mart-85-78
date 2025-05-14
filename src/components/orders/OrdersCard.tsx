
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { Order } from '@/types';
import OrdersTable from './OrdersTable';

interface OrdersCardProps {
  orders: Order[];
  onViewDetails: (orderId: string) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onContactBuyer: (buyerName: string) => void;
  onPrintInvoice: (orderId: string) => void;
  onSendShippingUpdate: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
}

const OrdersCard: React.FC<OrdersCardProps> = ({
  orders,
  onViewDetails,
  onUpdateStatus,
  onContactBuyer,
  onPrintInvoice,
  onSendShippingUpdate,
  onCancelOrder
}) => {
  return (
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
          <OrdersTable 
            orders={orders}
            onViewDetails={onViewDetails}
            onUpdateStatus={onUpdateStatus}
            onContactBuyer={onContactBuyer}
            onPrintInvoice={onPrintInvoice}
            onSendShippingUpdate={onSendShippingUpdate}
            onCancelOrder={onCancelOrder}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrdersCard;
