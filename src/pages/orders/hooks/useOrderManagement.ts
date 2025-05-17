
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Order } from '@/types';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ord-123456",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-001",
    sellerName: "Fresh Farms",
    items: [
      { itemId: "item-001", quantity: 2, price: 1299, name: "Organic Apples" },
      { itemId: "item-002", quantity: 1, price: 799, name: "Fresh Bread" }
    ],
    status: "processing",
    paymentStatus: "paid",
    totalAmount: 3397,
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-15T10:35:00Z"
  },
  {
    id: "ord-789012",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-002",
    sellerName: "Tech World",
    items: [
      { itemId: "item-003", quantity: 1, price: 6999, name: "Wireless Headphones" }
    ],
    status: "shipped",
    paymentStatus: "paid",
    totalAmount: 6999,
    createdAt: "2025-05-10T14:20:00Z",
    updatedAt: "2025-05-11T09:15:00Z"
  },
  {
    id: "ord-345678",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-003",
    sellerName: "Dairy Delight",
    items: [
      { itemId: "item-004", quantity: 3, price: 499, name: "Organic Bananas" },
      { itemId: "item-005", quantity: 2, price: 299, name: "Fresh Milk" }
    ],
    status: "delivered",
    paymentStatus: "paid",
    totalAmount: 2095,
    createdAt: "2025-05-05T16:45:00Z",
    updatedAt: "2025-05-07T12:30:00Z"
  },
  {
    id: "ord-901234",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-004",
    sellerName: "Fashion Styles",
    items: [
      { itemId: "item-006", quantity: 1, price: 2499, name: "Cotton T-Shirt" }
    ],
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 2499,
    createdAt: "2025-05-16T09:10:00Z",
    updatedAt: "2025-05-16T09:10:00Z"
  }
];

export const useOrderManagement = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');

  // Filter orders based on selected tab
  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return ['pending', 'processing', 'shipped'].includes(order.status);
    if (selectedTab === 'completed') return order.status === 'delivered' || order.status === 'cancelled';
    return true;
  });

  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would call an API to cancel the order
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      )
    );
    
    toast({
      title: "Order Cancelled",
      description: `Order #${orderId.split('-')[1]} has been cancelled successfully.`,
      variant: "destructive",
    });
  };

  const handleTrackOrder = (orderId: string) => {
    toast({
      title: "Tracking Information",
      description: `Tracking details for order #${orderId.split('-')[1]} have been sent to your email.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return {
    orders,
    filteredOrders,
    selectedTab,
    setSelectedTab,
    handleCancelOrder,
    handleTrackOrder,
    formatDate
  };
};
