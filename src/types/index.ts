
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

export type ItemStatus = 'available' | 'donated' | 'expired' | 'flagged';

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
}

export interface ItemFormData {
  name: string;
  description: string;
  category: ItemCategory;
  image: File | null;
  expiryDate: Date;
  address: string;
}
