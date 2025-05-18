
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
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export type ItemCategory = 
  | 'food'
  | 'clothing'
  | 'electronics'
  | 'household'
  | 'furniture'
  | 'other'
  | 'books'
  | 'toys'
  | 'medicine'
  | 'beauty'
  | 'sports'
  | 'automotive'
  | 'garden'
  | 'pet_supplies'
  | 'office';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  imageUrl: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  status: ItemStatus;
  userId: string;
  userName: string;
  userPhoto: string | null;
  quantity: number;
  currentPrice: number;
  originalPrice?: number;
  dynamicPricingEnabled?: boolean;
  dynamicPricingSettings?: {
    minPrice: number;
    maxPrice: number;
    strategy: string;
    automaticAdjustment: boolean;
  };
  location: {
    lat: number;
    lng: number;
    address: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

export type ItemStatus = 'available' | 'sold' | 'expired' | 'donated' | 'flagged' | 'reserved';

export interface ItemStatusInterface {
  available: string;
  sold: string;
  expired: string;
  donated: string;
  flagged: string;
  reserved: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'out-for-delivery';

export interface Order {
  id: string;
  userId: string;
  buyerId?: string;
  sellerId?: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  buyerName?: string;
  sellerName?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  shippingAddress: string;
  trackingInfo?: {
    trackingId?: string;
    carrier?: string;
    estimatedDelivery?: string;
    currentLocation?: string;
    status?: string;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  productName?: string;
  productImage?: string;
  imageUrl?: string;
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

export interface CartItem {
  id: string;
  productId?: string;
  user_id?: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  expiryDate?: string;
  sellerId?: string;
}

// For Task Scheduler
export interface Task {
  id: string;
  name: string;
  task_type: string;
  schedule: string;
  parameters: Record<string, any>;
  enabled: boolean;
  last_run: string;
  next_run: string;
  created_at: string;
  updated_at: string;
}
