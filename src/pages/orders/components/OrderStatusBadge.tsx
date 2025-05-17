
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Order } from '@/types';

interface OrderStatusBadgeProps {
  status: Order['status'];
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: Order['status']) => {
    const configs = {
      'pending': {
        color: 'bg-amber-100 text-amber-800',
        label: 'Pending'
      },
      'processing': {
        color: 'bg-blue-100 text-blue-800',
        label: 'Processing'
      },
      'shipped': {
        color: 'bg-purple-100 text-purple-800',
        label: 'Shipped'
      },
      'out-for-delivery': {
        color: 'bg-orange-100 text-orange-800',
        label: 'Out for Delivery'
      },
      'delivered': {
        color: 'bg-green-100 text-green-800',
        label: 'Delivered'
      },
      'cancelled': {
        color: 'bg-red-100 text-red-800',
        label: 'Cancelled'
      }
    };
    
    return configs[status] || { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
  };

  const { color, label } = getStatusConfig(status);

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      transition={{ duration: 0.2 }}
    >
      <Badge className={`${color} badge-animate`}>
        {label}
      </Badge>
    </motion.div>
  );
};
