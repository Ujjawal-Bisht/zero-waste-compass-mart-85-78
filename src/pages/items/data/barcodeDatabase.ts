
// Mock barcode data for demonstration
export const barcodeDatabase: Record<string, {
  name: string;
  description: string;
  category: 'food' | 'household' | 'other';
  originalPrice: number;
  currentPrice: number;
}> = {
  '9780140157376': {
    name: 'Organic Milk',
    description: 'Fresh organic milk from local farms',
    category: 'food',
    originalPrice: 4.99,
    currentPrice: 3.99,
  },
  '7350053850019': {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread',
    category: 'food',
    originalPrice: 3.49,
    currentPrice: 2.99,
  },
  '5901234123457': {
    name: 'Bananas (Bunch)',
    description: 'Organic fair trade bananas',
    category: 'food',
    originalPrice: 2.99,
    currentPrice: 2.49,
  }
};
