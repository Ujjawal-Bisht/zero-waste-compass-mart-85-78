
import { Item, ItemStatus } from '@/types';

// Mock data for dashboard (100+ entries)
const mockItems: Item[] = [
  {
    id: '1',
    name: 'Canned Vegetables',
    description: 'Unopened canned vegetables, expiring soon',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1597113366853-1d22fb824e8a?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2025-05-20',
    createdAt: '2025-05-01',
    updatedAt: '2025-05-01',
    status: 'available',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '123 Main St, City',
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: '2',
    name: 'Bread',
    description: 'Fresh bread from local bakery',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    expiryDate: '2025-05-14',
    createdAt: '2025-05-02',
    updatedAt: '2025-05-02',
    status: 'available',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '456 Oak St, City',
      lat: 40.7129,
      lng: -74.007,
    },
  },
  {
    id: '3',
    name: 'Winter Jacket',
    description: 'Barely used winter jacket, size L',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&q=80&w=2565&ixlib=rb-4.0.3',
    expiryDate: '2025-12-31',
    createdAt: '2025-05-03',
    updatedAt: '2025-05-03',
    status: 'donated',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '789 Pine St, City',
      lat: 40.713,
      lng: -74.008,
    },
  },
  {
    id: '4',
    name: 'Rice (10kg)',
    description: 'Unopened bag of rice',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=2530&ixlib=rb-4.0.3',
    expiryDate: '2025-09-15',
    createdAt: '2025-05-04',
    updatedAt: '2025-05-04',
    status: 'available',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '101 Elm St, City',
      lat: 40.7131,
      lng: -74.009,
    },
  },
  {
    id: '5',
    name: 'Table Lamp',
    description: 'Working table lamp, no longer needed',
    category: 'household',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    expiryDate: '2025-12-31',
    createdAt: '2025-05-05',
    updatedAt: '2025-05-05',
    status: 'expired',
    userId: 'user123',
    userName: 'John Doe',
    userPhoto: null,
    location: {
      address: '202 Cedar St, City',
      lat: 40.7132,
      lng: -74.01,
    },
  },
];

// Generate additional mock items (for a total of 100+ entries)
for (let i = 6; i <= 105; i++) {
  const categories = ['food', 'household', 'medicine', 'clothing'] as const;
  const statuses = ['available', 'donated', 'expired', 'flagged'] as const;
  const category = categories[Math.floor(Math.random() * categories.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Generate random expiration date (between today and 6 months from now)
  const today = new Date();
  const futureDate = new Date();
  futureDate.setMonth(today.getMonth() + 6);
  const expiryDate = new Date(
    today.getTime() + Math.random() * (futureDate.getTime() - today.getTime())
  ).toISOString().split('T')[0];
  
  // Generate random creation date (between 3 months ago and today)
  const pastDate = new Date();
  pastDate.setMonth(today.getMonth() - 3);
  const createdAt = new Date(
    pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime())
  ).toISOString().split('T')[0];
  
  // Generate random price data
  const originalPrice = Math.floor(Math.random() * 5000) + 100; // Between ₹100 - ₹5000
  const discountPercent = Math.random() < 0.7 ? Math.floor(Math.random() * 50) + 5 : 0; // 70% chance of discount (5-50%)
  const currentPrice = discountPercent > 0 
    ? Math.floor(originalPrice * (1 - discountPercent / 100)) 
    : originalPrice;

  const locations = [
    { address: 'Mumbai, Maharashtra', lat: 19.0760, lng: 72.8777 },
    { address: 'Delhi, Delhi', lat: 28.6139, lng: 77.2090 },
    { address: 'Bangalore, Karnataka', lat: 12.9716, lng: 77.5946 },
    { address: 'Hyderabad, Telangana', lat: 17.3850, lng: 78.4867 },
    { address: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    { address: 'Kolkata, West Bengal', lat: 22.5726, lng: 88.3639 }
  ];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  const userNames = ['Raj Kumar', 'Priya Singh', 'Amit Patel', 'Divya Sharma', 'Vikram Mehta', 'Meera Reddy'];

  // Generate item name based on category
  let name = '';
  let description = '';
  let imageUrl = '';
  
  if (category === 'food') {
    const foodItems = ['Rice Bag', 'Wheat Flour', 'Cooking Oil', 'Dal', 'Sugar', 'Tea Leaves', 'Packaged Spices', 'Canned Food', 'Packaged Snacks', 'Dairy Products'];
    name = foodItems[Math.floor(Math.random() * foodItems.length)];
    description = `Unused ${name.toLowerCase()}, in good condition`;
    imageUrl = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  } else if (category === 'household') {
    const householdItems = ['Table Lamp', 'Kitchen Utensils', 'Bedsheets', 'Curtains', 'Wall Clock', 'Storage Containers', 'Cushions', 'Floor Mat', 'Cleaning Supplies'];
    name = householdItems[Math.floor(Math.random() * householdItems.length)];
    description = `Lightly used ${name.toLowerCase()}, still in good condition`;
    imageUrl = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  } else if (category === 'medicine') {
    const medicineItems = ['Paracetamol', 'Vitamin Supplements', 'First Aid Kit', 'Antiseptic Cream', 'Cough Syrup', 'Insulin', 'Antibiotics', 'Pain Relievers'];
    name = medicineItems[Math.floor(Math.random() * medicineItems.length)];
    description = `Sealed ${name.toLowerCase()}, not expired`;
    imageUrl = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  } else {
    const clothingItems = ['Winter Jacket', 'Cotton Shirts', 'Formal Wear', 'Traditional Clothes', 'Woolen Sweaters', 'Kids Clothes', 'School Uniforms'];
    name = clothingItems[Math.floor(Math.random() * clothingItems.length)];
    description = `Gently used ${name.toLowerCase()}, clean and ready to wear`;
    imageUrl = 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3';
  }
  
  mockItems.push({
    id: `${i}`,
    name: name,
    description: description,
    category: category,
    imageUrl: imageUrl,
    expiryDate: expiryDate,
    createdAt: createdAt,
    updatedAt: createdAt,
    status: status,
    userId: `user${Math.floor(Math.random() * 999) + 100}`,
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    userPhoto: null,
    location: randomLocation,
    originalPrice: originalPrice,
    currentPrice: currentPrice,
    quantity: Math.floor(Math.random() * 20) + 1
  });
}

export default mockItems;
