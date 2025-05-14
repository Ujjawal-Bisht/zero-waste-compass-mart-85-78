
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, IndianRupee, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Order } from '@/types';
import OrderActionMenu from './OrderActionMenu';

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (orderId: string) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onContactBuyer: (buyerName: string) => void;
  onPrintInvoice: (orderId: string) => void;
  onSendShippingUpdate: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onViewDetails,
  onUpdateStatus,
  onContactBuyer,
  onPrintInvoice,
  onSendShippingUpdate,
  onCancelOrder
}) => {
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
      <TableBody>
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
              initial="hidden"
              animate="visible"
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
                <OrderActionMenu 
                  order={order}
                  onViewDetails={onViewDetails}
                  onUpdateStatus={onUpdateStatus}
                  onContactBuyer={onContactBuyer}
                  onPrintInvoice={onPrintInvoice}
                  onSendShippingUpdate={onSendShippingUpdate}
                  onCancelOrder={onCancelOrder}
                />
              </TableCell>
            </motion.tr>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
