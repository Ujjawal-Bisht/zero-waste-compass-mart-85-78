
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Order } from '@/types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderItemsList } from './OrderItemsList';
import { OrderActionButtons } from './OrderActionButtons';

interface OrdersTableProps {
  orders: Order[];
  formatDate: (date: string) => string;
  onCancelOrder: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  formatDate,
  onCancelOrder,
  onTrackOrder
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
