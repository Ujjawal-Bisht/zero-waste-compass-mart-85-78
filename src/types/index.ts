
// Type definitions for the application
export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  isAdmin?: boolean;
  isSeller?: boolean;
  createdAt?: string;
  updatedAt?: string;
  location?: Location;
  businessName?: string;
  businessType?: string;
  gstin?: string; // Added GSTIN field
  businessAddress?: string; // Added business address field
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export type ItemCategory = 
  | 'food' 
  | 'clothing' 
  | 'electronics' 
  | 'household' 
  | 'furniture' 
  | 'books' 
  | 'toys' 
  | 'medicine' 
  | 'beauty'
  | 'sports'
  | 'fitness'
  | 'stationery' 
  | 'other';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  imageUrl: string;
  expiryDate: string | null;
  createdAt: string;
  updatedAt: string;
  status: ItemStatus;
  userId: string;
  userName: string;
  userPhoto: string | null;
  location: Location;
  quantity: number;
  originalPrice: number;
  currentPrice: number;
  dynamicPricingEnabled?: boolean;
}

export type ItemStatus = 'available' | 'sold' | 'expired' | 'donated' | 'flagged' | 'reserved';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productId: string;
  orderId: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  userId: string;
  sellerName?: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  parameters?: Record<string, any>;
}
