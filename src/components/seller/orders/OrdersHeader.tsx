
import React from 'react';
import { motion } from 'framer-motion';

const OrdersHeader: React.FC = () => {
  return (
    <div>
      <motion.h2 
        className="text-3xl font-bold tracking-tight"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Orders
      </motion.h2>
      <motion.p 
        className="text-muted-foreground"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Manage customer orders and shipments
      </motion.p>
    </div>
  );
};

export default OrdersHeader;
