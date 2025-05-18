
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string | null;
  isSeller?: boolean;
  isAdmin?: boolean;
  businessName?: string;
  businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual';
  trustScore?: number;
  verified?: boolean;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: 'food' | 'clothing' | 'electronics' | 'household' | 'other';
  imageUrl: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  status: 'available' | 'sold' | 'expired' | 'donated' | 'flagged' | 'reserved';
  userId: string;
  userName: string;
  userPhoto: string | null;
  quantity: number;
  currentPrice: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'out-for-delivery';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  buyerName?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productImage: string;
}

export interface ItemStatus {
  available: string;
  sold: string;
  expired: string;
  donated: string;
  flagged: string;
  reserved: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
  icon?: string;
}
