
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Order } from '@/types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderItemsList } from './OrderItemsList';
import { OrderActionButtons } from './OrderActionButtons';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  formatDate: (date: string) => string;
  onCancelOrder: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
  onChatWithSeller?: (sellerId: string, sellerName?: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  formatDate,
  onCancelOrder,
  onTrackOrder,
  onChatWithSeller
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
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
              <OrderItemsList items={order.items} />
            </TableCell>
            <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
            <TableCell>
              <OrderStatusBadge status={order.status} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span>{order.sellerName || "Unknown Seller"}</span>
                {onChatWithSeller && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-blue-500" 
                    onClick={() => onChatWithSeller(order.sellerId, order.sellerName)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <OrderActionButtons
                status={order.status}
                onCancel={() => onCancelOrder(order.id)}
                onTrack={() => onTrackOrder(order.id)}
              />
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  );
};
