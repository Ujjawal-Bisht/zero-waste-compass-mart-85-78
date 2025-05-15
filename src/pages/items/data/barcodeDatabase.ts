
// A mock database of barcodes and their associated products
// In a real application, this would be fetched from an API or a real database

import { ItemCategory } from '@/types';

interface BarcodeProduct {
  name: string;
  description?: string;
  category: ItemCategory;
  originalPrice: number;
  currentPrice: number;
  quantity?: number;
  expiryDays?: number; // Days until expiry from current date
  imageUrl?: string;
}

export const barcodeDatabase: Record<string, BarcodeProduct> = {
  // Food items
  "5901234123457": {
    name: "Organic Bananas",
    description: "Bundle of organic bananas, slightly ripened",
    category: "food",
    originalPrice: 199.99,
    currentPrice: 149.99,
    quantity: 5,
    expiryDays: 7,
    imageUrl: "https://via.placeholder.com/150"
  },
  "7622210704436": {
    name: "Fresh Apples",
    description: "Pack of 4 fresh green apples",
    category: "food",
    originalPrice: 249.99,
    currentPrice: 199.99,
    quantity: 10,
    expiryDays: 14,
    imageUrl: "https://via.placeholder.com/150"
  },
  "8906009580889": {
    name: "Brown Bread",
    description: "Whole grain bread, freshly baked",
    category: "food",
    originalPrice: 99.99,
    currentPrice: 79.99,
    quantity: 2,
    expiryDays: 5,
    imageUrl: "https://via.placeholder.com/150"
  },
  
  // Electronics
  "4901780188901": {
    name: "Wireless Headphones",
    description: "Bluetooth over-ear headphones",
    category: "electronics",
    originalPrice: 2999.99,
    currentPrice: 2499.99,
    quantity: 3,
    expiryDays: 365,
    imageUrl: "https://via.placeholder.com/150"
  },
  "0845973051396": {
    name: "USB-C Cable",
    description: "1.5m USB-C to USB-A charging cable",
    category: "electronics",
    originalPrice: 599.99,
    currentPrice: 499.99,
    quantity: 20,
    expiryDays: 730,
    imageUrl: "https://via.placeholder.com/150"
  },
  
  // Clothing
  "0614141762855": {
    name: "Cotton T-Shirt",
    description: "Plain white cotton t-shirt, medium size",
    category: "clothing",
    originalPrice: 799.99,
    currentPrice: 599.99,
    quantity: 15,
    expiryDays: 1095,
    imageUrl: "https://via.placeholder.com/150"
  },
  "0742365207213": {
    name: "Denim Jeans",
    description: "Blue denim jeans, slim fit, size 32",
    category: "clothing",
    originalPrice: 1699.99,
    currentPrice: 1399.99,
    quantity: 8,
    expiryDays: 1095,
    imageUrl: "https://via.placeholder.com/150"
  },
  
  // Household
  "8906057620199": {
    name: "Dish Soap",
    description: "Eco-friendly dish washing liquid",
    category: "household",
    originalPrice: 149.99,
    currentPrice: 129.99,
    quantity: 25,
    expiryDays: 365,
    imageUrl: "https://via.placeholder.com/150"
  },
  "8901058851908": {
    name: "Hand Wash",
    description: "Antibacterial hand wash, 250ml",
    category: "household",
    originalPrice: 169.99,
    currentPrice: 149.99,
    quantity: 30,
    expiryDays: 365,
    imageUrl: "https://via.placeholder.com/150"
  },
  
  // Common test barcodes (for easy testing)
  "1234567890128": {
    name: "Test Product 1",
    description: "This is a test product with a common barcode",
    category: "other",
    originalPrice: 999.99,
    currentPrice: 799.99,
    quantity: 10,
    expiryDays: 30,
    imageUrl: "https://via.placeholder.com/150"
  },
  "1234567890005": {
    name: "Test Product 2",
    description: "Another test product with a simple barcode",
    category: "other",
    originalPrice: 499.99,
    currentPrice: 399.99,
    quantity: 5,
    expiryDays: 14,
    imageUrl: "https://via.placeholder.com/150"
  }
};

// Helper function to look up a product by barcode
export const getProductByBarcode = (barcode: string): BarcodeProduct | null => {
  return barcodeDatabase[barcode] || null;
};

// Helper function to get all available barcodes
export const getAllBarcodes = (): string[] => {
  return Object.keys(barcodeDatabase);
};
