
export type ItemCategory = 
  | 'food'
  | 'clothing'
  | 'electronics'
  | 'furniture'
  | 'household'
  | 'books'
  | 'toys'
  | 'medicine'
  | 'other';

export type ItemStatus = 
  | 'available' 
  | 'sold' 
  | 'reserved' 
  | 'flagged' 
  | 'donated' 
  | 'expired';

export interface Item {
  id: string;
  name: string;
  description?: string;
  category: ItemCategory;
  imageUrl?: string;
  expiryDate: string;
  createdAt: string;
  updatedAt?: string;
  status: ItemStatus;
  userId: string;
  userName: string;
  userPhoto: string | null;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  quantity: number;
  originalPrice?: number;
  currentPrice: number;
  dynamicPricingEnabled?: boolean;
  dynamicPricingSettings?: {
    minPrice: number;
    maxPrice: number;
    strategy: string;
    automaticAdjustment: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string | null;
  isSeller?: boolean;
  isAdmin?: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  productName?: string;
  productImage?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'out-for-delivery';
  createdAt: string;
  updatedAt: string;
  paymentMethod?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  shippingAddress: string;
  buyerName?: string;
  sellerName?: string;
  trackingInfo?: {
    trackingId?: string;
    carrier?: string;
    estimatedDelivery?: string;
    currentLocation?: string;
    status?: string;
  };
}
