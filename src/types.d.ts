
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

export type ItemCategory = 
  | 'food'
  | 'clothing'
  | 'electronics'
  | 'household'
  | 'furniture'
  | 'other'
  | 'books'
  | 'toys'
  | 'medicine';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
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

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'out-for-delivery';

export interface Order {
  id: string;
  userId: string;
  buyerId?: string;
  sellerId?: string;  // Added for order tracking
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  buyerName?: string;
  sellerName?: string; // Added for order display
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
  name: string;  // Changed from productName
  productName?: string; // For backward compatibility
  productImage?: string;
  imageUrl?: string; // For consistency
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

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
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
