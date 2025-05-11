
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
  businessName?: string;
  businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual';
  isSeller?: boolean;
  trustScore?: number;
  verified?: boolean;
}

export type ItemStatus = 'available' | 'donated' | 'expired' | 'flagged' | 'sold';

export type ItemCategory = 
  | 'food'
  | 'clothing'
  | 'electronics'
  | 'furniture'
  | 'household'
  | 'books'
  | 'toys'
  | 'other';

export interface ItemLocation {
  address: string;
  lat: number;
  lng: number;
}

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
  location: ItemLocation;
  quantity?: number;
  originalPrice?: number;
  currentPrice?: number;
  dynamicPricingEnabled?: boolean;
}

export interface ItemFormData {
  name: string;
  description: string;
  category: ItemCategory;
  image: File | null;
  expiryDate: Date;
  address: string;
  quantity?: number;
  originalPrice?: number;
  dynamicPricingEnabled?: boolean;
}

export interface Review {
  id: string;
  sellerId: string;
  buyerId: string;
  orderId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  items: {
    itemId: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}
