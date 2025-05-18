
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Order } from '@/types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderItemsList } from './OrderItemsList';
import { OrderActionButtons } from './OrderActionButtons';
import { Button } from '@/components/ui/button';
import { MessageCircle, Package, Truck, Calendar, IndianRupee } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

  const getTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="py-3 px-4">Order ID</TableHead>
            <TableHead className="py-3 px-4">Date</TableHead>
            <TableHead className="py-3 px-4 hidden md:table-cell">Items</TableHead>
            <TableHead className="py-3 px-4 text-right">Total</TableHead>
            <TableHead className="py-3 px-4">Status</TableHead>
            <TableHead className="py-3 px-4 hidden md:table-cell">Seller</TableHead>
            <TableHead className="py-3 px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <motion.tr
              key={order.id}
              className="hover:bg-gray-50 border-b transition-colors duration-200 group"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                backgroundColor: "rgba(243, 244, 246, 0.5)", 
                transition: { duration: 0.2 } 
              }}
            >
              <TableCell className="font-medium py-4 px-4">
                <div className="flex flex-col">
                  <span className="text-md font-semibold">#{order.id.slice(-6)}</span>
                  <span className="text-xs text-gray-500">{getTimeAgo(order.createdAt)}</span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4 hidden md:table-cell">
                <div className="flex items-start">
                  <Package size={16} className="mr-2 mt-1 text-gray-400" />
                  <OrderItemsList items={order.items} />
                </div>
              </TableCell>
              <TableCell className="py-4 px-4 font-medium text-right">
                <div className="flex items-center justify-end">
                  <IndianRupee size={16} className="mr-1" />
                  <motion.span 
                    whileHover={{ scale: 1.05 }} 
                    className="text-green-600 font-bold"
                  >
                    {order.totalAmount.toFixed(2)}
                  </motion.span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="flex flex-col gap-1">
                  <OrderStatusBadge status={order.status} />
                  {order.status === 'shipped' && (
                    <div className="flex items-center text-xs text-blue-600">
                      <Truck size={12} className="mr-1" />
                      <span>In transit</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 px-4 hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{order.sellerName || "Unknown Seller"}</span>
                  {onChatWithSeller && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => onChatWithSeller(order.sellerId, order.sellerName)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <div className="flex justify-end">
                  <OrderActionButtons
                    status={order.status}
                    order={order}
                    onCancel={() => onCancelOrder(order.id)}
                    onTrack={() => onTrackOrder(order.id)}
                  />
                </div>
              </TableCell>
            </motion.tr>
          ))}
          
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <Package size={48} className="text-gray-300 mb-4" />
                  <p className="text-lg font-medium">No orders found</p>
                  <p className="text-sm mt-1">When you place an order, it will appear here</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
