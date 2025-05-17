
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OrdersHeader } from './components/OrdersHeader';
import { OrdersContent } from './components/OrdersContent';
import { OrderTrackingInfo } from './components/OrderTrackingInfo';
import { useOrderManagement } from './hooks/useOrderManagement';
import { ChatDrawer } from '../chat/ChatDrawer';

const MyOrders: React.FC = () => {
  const {
    filteredOrders,
    selectedTab,
    setSelectedTab,
    handleCancelOrder,
    handleTrackOrder,
    formatDate
  } = useOrderManagement();

  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<{ sellerId: string, sellerName?: string }>({ sellerId: '' });

  // Handle opening chat with seller
  const handleChatWithSeller = (sellerId: string, sellerName?: string) => {
    setCurrentChat({ sellerId, sellerName });
    setChatOpen(true);
  };

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
          onChatWithSeller={handleChatWithSeller}
        />

        {/* Order Tracking Information */}
        <OrderTrackingInfo 
          orders={filteredOrders}
          onTrackOrder={handleTrackOrder}
          formatDate={formatDate}
        />
      </motion.div>

      {/* Chat Drawer */}
      <ChatDrawer 
        open={chatOpen} 
        onClose={() => setChatOpen(false)} 
        recipientId={currentChat.sellerId}
        recipientName={currentChat.sellerName || 'Seller'}
        recipientType="seller"
      />
    </div>
  );
};

export default MyOrders;
