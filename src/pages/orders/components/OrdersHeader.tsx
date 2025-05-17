
import React from 'react';
import { motion } from 'framer-motion';
import { OrderTabs } from './OrderTabs';

interface OrdersHeaderProps {
  selectedTab: 'all' | 'active' | 'completed';
  setSelectedTab: (tab: 'all' | 'active' | 'completed') => void;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-muted-foreground mt-1">Track and manage your orders</p>
      </motion.div>
      
      <OrderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
};
