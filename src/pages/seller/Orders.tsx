
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Order } from '@/types';
import OrdersCard from '@/components/orders/OrdersCard';

const SellerOrders: React.FC = () => {
  // This would be replaced with actual data from a database
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      buyerId: 'buyer123',
      buyerName: 'John Doe',
      items: [
        { itemId: '1', name: 'Organic Bananas', quantity: 2, price: 299.99 },
      ],
      status: 'pending',
      paymentStatus: 'paid',
      totalAmount: 599.98,
      createdAt: '2023-05-20T10:30:00',
    },
    {
      id: 'ORD002',
      buyerId: 'buyer456',
      buyerName: 'Jane Smith',
      items: [
        { itemId: '2', name: 'T-shirts Pack', quantity: 1, price: 2499.00 },
      ],
      status: 'shipped',
      paymentStatus: 'paid',
      totalAmount: 2499.00,
      createdAt: '2023-05-19T14:15:00',
    },
  ]);

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
      description: `Order ${orderId} is now ${newStatus}`,
      duration: 3000,
    });
  };

  const handleContactBuyer = (buyerName: string) => {
    toast({
      title: "Contact Buyer",
      description: `Sending message to ${buyerName}`,
      duration: 3000,
    });
  };

  const handlePrintInvoice = (orderId: string) => {
    toast({
      title: "Print Invoice",
      description: `Printing invoice for order ${orderId}`,
      duration: 3000,
    });
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
    </motion.div>
  );
};

export default SellerOrders;
