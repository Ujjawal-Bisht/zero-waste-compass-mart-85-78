
import { Order, OrderItem } from '@/types';

export const filterOrdersByStatus = (
  orders: Order[],
  selectedTab: 'all' | 'active' | 'completed'
): Order[] => {
  return orders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return ['pending', 'processing', 'shipped', 'out-for-delivery'].includes(order.status);
    if (selectedTab === 'completed') return order.status === 'delivered' || order.status === 'cancelled';
    return true;
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Helper function to create order items with all required properties
export const createOrderItem = (
  id: string,
  name: string,
  quantity: number,
  price: number,
  orderId: string
): OrderItem => {
  return {
    id,
    name,
    quantity,
    price,
    productId: `product-${id}`,
    orderId,
    imageUrl: undefined
  };
};
