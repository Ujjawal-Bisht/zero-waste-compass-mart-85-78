
import React from 'react';
import { motion } from 'framer-motion';
import { OrdersHeader } from './components/OrdersHeader';
import { OrdersContent } from './components/OrdersContent';
import { OrderTrackingInfo } from './components/OrderTrackingInfo';
import { useOrderManagement } from './hooks/useOrderManagement';

const MyOrders: React.FC = () => {
  const {
    filteredOrders,
    selectedTab,
    setSelectedTab,
    handleCancelOrder,
    handleTrackOrder,
    formatDate
  } = useOrderManagement();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <OrdersHeader 
          selectedTab={selectedTab} 
          setSelectedTab={setSelectedTab} 
        />

        <OrdersContent 
          filteredOrders={filteredOrders}
          selectedTab={selectedTab}
          formatDate={formatDate}
          onCancelOrder={handleCancelOrder}
          onTrackOrder={handleTrackOrder}
        />

        {/* Order Tracking Information */}
        <OrderTrackingInfo 
          orders={filteredOrders}
          onTrackOrder={handleTrackOrder}
          formatDate={formatDate}
        />
      </motion.div>
    </div>
  );
};

export default MyOrders;
