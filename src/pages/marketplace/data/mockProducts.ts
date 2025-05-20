
import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  sellerId: string;
  rating: number;
  image: string;
  expiryDate: string;
  discountPercentage?: number;
  inStock?: boolean;
}

// Expanded product list with more categories and items
export const mockProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Organic Apples',
    price: 299,
    category: 'Food',
    seller: 'Fresh Farms',
    sellerId: 'seller-1',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=100',
    expiryDate: '2025-05-27',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Wireless Headphones',
    price: 4999,
    category: 'Electronics',
    seller: 'Tech World',
    sellerId: 'seller-2',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Fresh Milk (1L)',
    price: 79,
    category: 'Food',
    seller: 'Dairy Delight',
    sellerId: 'seller-3',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=100',
    expiryDate: '2025-05-19',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Smart Watch',
    price: 6999,
    category: 'Electronics',
    seller: 'Tech Galaxy',
    sellerId: 'seller-4',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=100',
    expiryDate: '2026-10-15',
    inStock: true
  },
  // New products in existing categories
  {
    id: uuidv4(),
    name: 'Organic Bananas',
    price: 99,
    category: 'Food',
    seller: 'Fresh Farms',
    sellerId: 'seller-1',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=100',
    expiryDate: '2025-05-22',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Cotton T-Shirt Pack',
    price: 999,
    category: 'Clothing',
    seller: 'Fashion Hub',
    sellerId: 'seller-5',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=100',
    expiryDate: '2026-05-15',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Recycled Paper Notebooks',
    price: 399,
    category: 'Stationery',
    seller: 'Eco Supplies',
    sellerId: 'seller-6',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Reusable Water Bottle',
    price: 699,
    category: 'Household',
    seller: 'Green Living',
    sellerId: 'seller-7',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  // New products with new categories
  {
    id: uuidv4(),
    name: 'Yoga Mat',
    price: 1499,
    category: 'Sports',
    seller: 'Fitness Gear',
    sellerId: 'seller-8',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Essential Oil Diffuser',
    price: 1999,
    category: 'Wellness',
    seller: 'Aroma Haven',
    sellerId: 'seller-9',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Indoor Plants Set',
    price: 1299,
    category: 'Garden',
    seller: 'Green Thumb',
    sellerId: 'seller-10',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=100',
    expiryDate: '2025-07-15',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Handmade Soap Set',
    price: 599,
    category: 'Beauty',
    seller: 'Natural Essence',
    sellerId: 'seller-11',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=100',
    expiryDate: '2026-03-10',
    inStock: true
  },
  
  // Adding more diverse products
  {
    id: uuidv4(),
    name: 'Organic Spinach',
    price: 149,
    category: 'Food',
    seller: 'Fresh Farms',
    sellerId: 'seller-1',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=100',
    expiryDate: '2025-05-25',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Recycled Paper Notebooks (3-pack)',
    price: 399,
    category: 'Stationery',
    seller: 'Green Office',
    sellerId: 'seller-12',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Bamboo Toothbrushes (4-pack)',
    price: 299,
    category: 'Household',
    seller: 'Eco Living',
    sellerId: 'seller-13',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Reusable Stainless Steel Straws',
    price: 199,
    category: 'Household',
    seller: 'Green Living',
    sellerId: 'seller-7',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1576011185442-9a96deacc87c?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Organic Almond Milk',
    price: 179,
    category: 'Food',
    seller: 'Dairy Alternatives',
    sellerId: 'seller-14',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=100',
    expiryDate: '2025-06-01',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Biodegradable Plant Pots (5-pack)',
    price: 349,
    category: 'Garden',
    seller: 'Green Thumb',
    sellerId: 'seller-10',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1622507514852-577d4b632fde?q=80&w=100',
    expiryDate: '2026-10-15',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Natural Organic Honey',
    price: 499,
    category: 'Food',
    seller: 'Beekeepers Co-op',
    sellerId: 'seller-15',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=100',
    expiryDate: '2025-08-30',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Recycled Glass Water Bottle',
    price: 599,
    category: 'Household',
    seller: 'Sustainable Living',
    sellerId: 'seller-16',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=100',
    expiryDate: '2026-12-31',
    inStock: true
  }
];
