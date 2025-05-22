
import React from 'react';
import { motion } from 'framer-motion';
import OrdersCard from '@/components/orders/OrdersCard';
import { ChatDrawer } from '../chat/ChatDrawer';
import { useSellerOrders } from '@/hooks/seller/useSellerOrders';
import OrdersHeader from '@/components/seller/orders/OrdersHeader';

const SellerOrders: React.FC = () => {
  const {
    orders,
    chatState,
    handleViewDetails,
    handleUpdateStatus,
    handleContactBuyer,
    handlePrintInvoice,
    handleSendShippingUpdate,
    handleCancelOrder,
    handleCloseChat
  } = useSellerOrders();

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <OrdersHeader />
      
      <OrdersCard 
        orders={orders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={handleUpdateStatus}
        onContactBuyer={handleContactBuyer}
        onPrintInvoice={handlePrintInvoice}
        onSendShippingUpdate={handleSendShippingUpdate}
        onCancelOrder={handleCancelOrder}
      />

      {/* Chat Drawer */}
      <ChatDrawer 
        open={chatState.open} 
        onClose={handleCloseChat} 
        recipientId={chatState.buyerId}
        recipientName={chatState.buyerName}
        recipientType="buyer"
      />
    </motion.div>
  );
};

export default SellerOrders;
