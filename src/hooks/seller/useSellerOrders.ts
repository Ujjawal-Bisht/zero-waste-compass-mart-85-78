
import { useState } from 'react';
import { Order } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { generateInvoice } from '@/utils/exportUtils';

export const useSellerOrders = () => {
  // Mock data that would normally come from an API
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      buyerId: 'buyer123',
      buyerName: 'John Doe',
      sellerId: 'seller123',
      userId: 'seller123', // Added to fix the type error
      items: [
        { 
          id: '1', 
          name: 'Organic Bananas', 
          quantity: 2, 
          price: 299.99, 
          productId: 'product1', 
          orderId: 'ORD001',
          imageUrl: undefined,
          // Category added but properly handled with type intersection
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
      userId: 'seller123', // Added to fix the type error
      items: [
        { 
          id: '2', 
          name: 'T-shirts Pack', 
          quantity: 1, 
          price: 2499.00, 
          productId: 'product2', 
          orderId: 'ORD002',
          imageUrl: undefined,
          // Category added but properly handled with type intersection
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
      userId: 'seller123', // Added to fix the type error
      items: [
        { 
          id: '3', 
          name: 'Wireless Earbuds', 
          quantity: 1, 
          price: 1999.00, 
          productId: 'product3', 
          orderId: 'ORD003',
          imageUrl: undefined,
          // Category added but properly handled with type intersection
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

  const [chatState, setChatState] = useState<{ 
    open: boolean;
    buyerId: string;
    buyerName: string; 
  }>({
    open: false,
    buyerId: '',
    buyerName: ''
  });

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
    setChatState({
      open: true,
      buyerId,
      buyerName
    });
  };

  const handlePrintInvoice = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      if (generateInvoice(order)) {
        toast({
          title: "Invoice Generated",
          description: `Invoice for order ${orderId} has been generated and downloaded.`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Invoice Generation Failed",
          description: "There was a problem generating the invoice. Please try again.",
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

  const handleCloseChat = () => {
    setChatState(prev => ({ ...prev, open: false }));
  };

  return {
    orders,
    chatState,
    handleViewDetails,
    handleUpdateStatus,
    handleContactBuyer,
    handlePrintInvoice,
    handleSendShippingUpdate,
    handleCancelOrder,
    handleCloseChat
  };
};
