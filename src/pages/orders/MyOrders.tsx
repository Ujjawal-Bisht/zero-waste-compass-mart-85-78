
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OrdersHeader } from './components/OrdersHeader';
import { OrdersContent } from './components/OrdersContent';
import { OrderTrackingInfo } from './components/OrderTrackingInfo';
import { useOrderManagement } from './hooks/useOrderManagement';
import { ChatDrawer } from '../chat/ChatDrawer';
import TopNavbar from '@/components/layouts/TopNavbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingDown, TrendingUp } from 'lucide-react';

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

  // Calculate order statistics
  const totalOrders = filteredOrders.length;
  const deliveredOrders = filteredOrders.filter(order => order.status === 'delivered').length;
  const pendingOrders = filteredOrders.filter(order => ['pending', 'processing', 'shipped', 'out-for-delivery'].includes(order.status)).length;
  const totalSpent = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <>
      <TopNavbar />
      <div className="container mx-auto py-8 max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div 
              variants={containerVariants}
              whileHover={{ translateY: -5 }}
              className="transition-all"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-600">Total Orders</span>
                    <Package className="h-8 w-8 text-blue-500 opacity-70" />
                  </div>
                  <div className="text-2xl font-bold mt-2">{totalOrders}</div>
                  <p className="text-xs text-blue-600 mt-2">
                    {pendingOrders > 0 && `${pendingOrders} orders in progress`}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              whileHover={{ translateY: -5 }}
              className="transition-all"
            >
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">Delivered Orders</span>
                    <Badge className="bg-green-100 text-green-800 border border-green-200">
                      {deliveredOrders > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mt-2">{deliveredOrders}</div>
                  <p className="text-xs text-green-600 mt-2">
                    {(deliveredOrders / totalOrders * 100).toFixed(0)}% of total orders
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              whileHover={{ translateY: -5 }}
              className="transition-all"
            >
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-600">Total Spent</span>
                    <Badge className="bg-purple-100 text-purple-800 border border-purple-200">
                      {totalOrders} orders
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mt-2">₹{totalSpent.toFixed(2)}</div>
                  <p className="text-xs text-purple-600 mt-2">
                    Avg ₹{(totalSpent / totalOrders || 0).toFixed(2)} per order
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

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
    </>
  );
};

export default MyOrders;
