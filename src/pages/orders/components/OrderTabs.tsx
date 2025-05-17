
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface OrderTabsProps {
  selectedTab: 'all' | 'active' | 'completed';
  setSelectedTab: (tab: 'all' | 'active' | 'completed') => void;
}

export const OrderTabs: React.FC<OrderTabsProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="flex space-x-2 mt-4 md:mt-0"
    >
      <Button 
        variant={selectedTab === 'all' ? 'default' : 'outline'}
        onClick={() => setSelectedTab('all')}
        className="rounded-full"
      >
        All Orders
      </Button>
      <Button 
        variant={selectedTab === 'active' ? 'default' : 'outline'}
        onClick={() => setSelectedTab('active')}
        className="rounded-full"
      >
        Active
      </Button>
      <Button 
        variant={selectedTab === 'completed' ? 'default' : 'outline'}
        onClick={() => setSelectedTab('completed')}
        className="rounded-full"
      >
        Completed
      </Button>
    </motion.div>
  );
};
