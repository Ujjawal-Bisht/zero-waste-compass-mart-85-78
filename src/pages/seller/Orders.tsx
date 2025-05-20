
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Order } from '@/types';
import OrdersCard from '@/components/orders/OrdersCard';
import { generateInvoice } from '@/utils/exportUtils';
import { ChatDrawer } from '../chat/ChatDrawer';

const SellerOrders: React.FC = () => {
  // This would be replaced with actual data from a database
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      buyerId: 'buyer123',
      buyerName: 'John Doe',
      sellerId: 'seller123',
      items: [
        { 
          id: '1', 
          name: 'Organic Bananas', 
          quantity: 2, 
          price: 299.99, 
          productId: 'product1', 
          orderId: 'ORD001' 
        },
      ],
      status: 'pending',
      paymentStatus: 'paid',
      totalAmount: 599.98,
      createdAt: '2023-05-20T10:30:00',
      updatedAt: '2023-05-20T10:30:00',
      shippingAddress: '123 Main St, City, Country',
    },
    {
      id: 'ORD002',
      buyerId: 'buyer456',
      buyerName: 'Jane Smith',
      sellerId: 'seller123',
      items: [
        { 
          id: '2', 
          name: 'T-shirts Pack', 
          quantity: 1, 
          price: 2499.00, 
          productId: 'product2', 
          orderId: 'ORD002' 
        },
      ],
      status: 'shipped',
      paymentStatus: 'paid',
      totalAmount: 2499.00,
      createdAt: '2023-05-19T14:15:00',
      updatedAt: '2023-05-19T14:15:00',
      shippingAddress: '456 Oak St, City, Country',
    },
    {
      id: 'ORD003',
      buyerId: 'buyer789',
      buyerName: 'Alex Johnson',
      sellerId: 'seller123',
      items: [
        { 
          id: '3', 
          name: 'Wireless Earbuds', 
          quantity: 1, 
          price: 1999.00, 
          productId: 'product3', 
          orderId: 'ORD003' 
        },
      ],
      status: 'out-for-delivery',
      paymentStatus: 'paid',
      totalAmount: 1999.00,
      createdAt: '2023-05-18T09:30:00',
      updatedAt: '2023-05-18T09:30:00',
      shippingAddress: '789 Pine St, City, Country',
    },
  ]);

  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<{ buyerId: string, buyerName: string }>({ buyerId: '', buyerName: '' });

  const handleViewDetails = (orderId: string) => {
    toast({
      title: "View Order Details",
      description: `Viewing details for order ${orderId}`,
      duration: 3000,
    });
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
      )
    );
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} is now ${newStatus.replace('-', ' ')}`,
      duration: 3000,
    });
  };

  const handleContactBuyer = (buyerId: string, buyerName: string) => {
    setCurrentChat({ buyerId, buyerName });
    setChatOpen(true);
  };

  const handlePrintInvoice = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      if (order.status === 'out-for-delivery' || order.status === 'delivered') {
        generateInvoice(order);
        toast({
          title: "Invoice Generated",
          description: `Invoice for order ${orderId} has been generated.`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Cannot Generate Invoice",
          description: "Invoices can only be generated for orders that are out for delivery or delivered.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const handleSendShippingUpdate = (orderId: string) => {
    toast({
      title: "Shipping Update",
      description: `Sending shipping update for order ${orderId}`,
      duration: 3000,
    });
  };

  const handleCancelOrder = (orderId: string) => {
    toast({
      title: "Cancel Order",
      description: `Order ${orderId} has been cancelled`,
      variant: "destructive",
      duration: 3000,
    });
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? {...order, status: 'cancelled'} : order
      )
    );
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
        open={chatOpen} 
        onClose={() => setChatOpen(false)} 
        recipientId={currentChat.buyerId}
        recipientName={currentChat.buyerName}
        recipientType="buyer"
      />
    </motion.div>
  );
};

export default SellerOrders;
