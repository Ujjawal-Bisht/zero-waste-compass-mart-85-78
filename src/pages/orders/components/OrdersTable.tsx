
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Order } from '@/types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderItemsList } from './OrderItemsList';
import { OrderActionButtons } from './OrderActionButtons';
import { Button } from '@/components/ui/button';
import { MessageCircle, Package, Truck, Calendar, IndianRupee, Info, MapPin } from 'lucide-react';
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm"
    >
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="py-3 px-4 w-[150px]">Order Details</TableHead>
            <TableHead className="py-3 px-4 hidden md:table-cell">Items</TableHead>
            <TableHead className="py-3 px-4 text-right">Total</TableHead>
            <TableHead className="py-3 px-4">Status</TableHead>
            <TableHead className="py-3 px-4 hidden md:table-cell">Seller</TableHead>
            <TableHead className="py-3 px-4 text-right w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <motion.tr
                key={order.id}
                className="hover:bg-gray-50 border-b transition-colors duration-200 group"
                variants={itemVariants}
                whileHover={{ 
                  backgroundColor: "rgba(243, 244, 246, 0.5)", 
                  transition: { duration: 0.2 } 
                }}
              >
                <TableCell className="font-medium py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <span className="text-md font-semibold">#{order.id.slice(-6)}</span>
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-600">
                        {order.paymentStatus || "Paid"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar size={14} className="mr-1" /> 
                      {formatDate(order.createdAt)}
                    </span>
                    <span className="text-xs text-gray-500 italic">
                      {getTimeAgo(order.createdAt)}
                    </span>
                    <div className="mt-2 hidden sm:flex sm:items-center text-xs text-gray-600">
                      <MapPin size={14} className="mr-1" /> 
                      {order.shippingAddress ? order.shippingAddress.split(',')[0] : "Address unavailable"}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 hidden md:table-cell">
                  <div className="flex items-start">
                    <Package size={16} className="mr-2 mt-1 text-gray-400" />
                    <OrderItemsList items={order.items} />
                    <span className="ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 font-medium text-right">
                  <div className="flex flex-col items-end">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      className="flex items-center text-green-600 font-bold"
                    >
                      <IndianRupee size={16} className="mr-1" />
                      <span>{order.totalAmount.toFixed(2)}</span>
                    </motion.div>
                    <span className="text-xs text-gray-500 mt-1">
                      {order.paymentMethod || "Credit Card"}
                    </span>
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
                    {order.trackingInfo && order.trackingInfo.estimatedDelivery && (
                      <div className="text-xs text-gray-600 mt-1">
                        Est. delivery: {formatDate(order.trackingInfo.estimatedDelivery)}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      {(order.sellerName || "Unknown").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">{order.sellerName || "Unknown Seller"}</span>
                      {onChatWithSeller && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 text-xs text-blue-500 p-0 hover:text-blue-700" 
                          onClick={() => onChatWithSeller(order.sellerId || "", order.sellerName)}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      )}
                    </div>
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-gray-500">
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
    </motion.div>
  );
};
