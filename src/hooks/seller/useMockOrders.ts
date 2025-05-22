
import { useState } from 'react';
import { Order } from '@/types';

export const useMockOrders = () => {
  // Mock data that would normally come from an API
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      buyerId: 'buyer123',
      buyerName: 'John Doe',
      sellerId: 'seller123',
      userId: 'seller123',
      items: [
        { 
          id: '1', 
          name: 'Organic Bananas', 
          quantity: 2, 
          price: 299.99, 
          productId: 'product1', 
          orderId: 'ORD001',
          imageUrl: undefined,
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
      userId: 'seller123',
      items: [
        { 
          id: '2', 
          name: 'T-shirts Pack', 
          quantity: 1, 
          price: 2499.00, 
          productId: 'product2', 
          orderId: 'ORD002',
          imageUrl: undefined,
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
      userId: 'seller123',
      items: [
        { 
          id: '3', 
          name: 'Wireless Earbuds', 
          quantity: 1, 
          price: 1999.00, 
          productId: 'product3', 
          orderId: 'ORD003',
          imageUrl: undefined,
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

  return {
    orders,
    setOrders
  };
};
