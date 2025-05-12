
// Mock barcode data for demonstration
export const barcodeDatabase: Record<string, {
  name: string;
  description: string;
  category: 'food' | 'household' | 'medicine' | 'other';
  originalPrice: number;
  currentPrice: number;
  expiryDays?: number; // Days until expiry from current date
}> = {
  '9780140157376': {
    name: 'Organic Milk',
    description: 'Fresh organic milk from local farms',
    category: 'food',
    originalPrice: 4.99,
    currentPrice: 3.99,
    expiryDays: 7,
  },
  '7350053850019': {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread',
    category: 'food',
    originalPrice: 3.49,
    currentPrice: 2.99,
    expiryDays: 5,
  },
  '5901234123457': {
    name: 'Bananas (Bunch)',
    description: 'Organic fair trade bananas',
    category: 'food',
    originalPrice: 2.99,
    currentPrice: 2.49,
    expiryDays: 10,
  },
  '0123456789012': {
    name: 'Paracetamol',
    description: 'Pain relief medication - 500mg tablets',
    category: 'medicine',
    originalPrice: 5.99,
    currentPrice: 4.99,
    expiryDays: 365,
  },
  '9876543210987': {
    name: 'Hand Sanitizer',
    description: 'Antibacterial hand sanitizer with aloe vera',
    category: 'household',
    originalPrice: 3.99,
    currentPrice: 2.99,
    expiryDays: 730, 
  },
  '1234567890128': {
    name: 'Canned Soup',
    description: 'Vegetable soup in recyclable can',
    category: 'food',
    originalPrice: 2.49,
    currentPrice: 1.99,
    expiryDays: 180,
  },
  '2345678901234': {
    name: 'Toilet Paper',
    description: 'Pack of 12 rolls, 100% recycled paper',
    category: 'household',
    originalPrice: 8.99,
    currentPrice: 7.99,
  },
  '3456789012345': {
    name: 'Vitamin C Supplements',
    description: '1000mg tablets, immune system support',
    category: 'medicine',
    originalPrice: 12.99,
    currentPrice: 9.99,
    expiryDays: 365,
  }
};
