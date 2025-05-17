export type ItemCategory = 
  | 'food'
  | 'clothing'
  | 'electronics'
  | 'furniture'
  | 'household';

export type ItemStatus = 
  | 'available' 
  | 'flagged' 
  | 'sold_out' 
  | 'draft';

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
