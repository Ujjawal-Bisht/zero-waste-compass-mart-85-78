
import { useState } from 'react';
import { Order } from '@/types';
import { filterOrdersByStatus, formatDate } from '@/utils/order/orderUtils';
import { generateMockOrders } from '@/utils/order/mockOrders';
import { useOrderActions } from '@/utils/order/orderActions';

export const useOrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>(generateMockOrders());
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');
  const { handleCancelOrder, handleTrackOrder } = useOrderActions();

  // Filter orders based on selected tab
  const filteredOrders = filterOrdersByStatus(orders, selectedTab);

  return {
    orders,
    filteredOrders,
    selectedTab,
    setSelectedTab,
    handleCancelOrder: (orderId: string) => handleCancelOrder(orderId, setOrders),
    handleTrackOrder: (orderId: string) => handleTrackOrder(orderId, orders),
    formatDate
  };
};
