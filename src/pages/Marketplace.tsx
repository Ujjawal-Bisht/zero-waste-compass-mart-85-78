
import React, { useState } from 'react';
import { Item, ItemCategory } from '@/types';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for marketplace items
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
    userId: 'user456',
    userName: 'Jane Smith',
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
    status: 'available',
    userId: 'user789',
    userName: 'Chris Johnson',
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
    userId: 'user101',
    userName: 'Mike Wilson',
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
    status: 'available',
    userId: 'user202',
    userName: 'Sarah Brown',
    userPhoto: null,
    location: {
      address: '202 Cedar St, City',
      lat: 40.7132,
      lng: -74.01,
    },
  },
  {
    id: '6',
    name: 'Kids Books',
    description: 'Collection of children\'s books in good condition',
    category: 'books',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    expiryDate: '2025-12-31',
    createdAt: '2025-05-06',
    updatedAt: '2025-05-06',
    status: 'available',
    userId: 'user303',
    userName: 'Emma Davis',
    userPhoto: null,
    location: {
      address: '303 Maple St, City',
      lat: 40.7133,
      lng: -74.011,
    },
  },
];

const categories: { value: ItemCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'household', label: 'Household' },
  { value: 'books', label: 'Books' },
  { value: 'toys', label: 'Toys' },
  { value: 'other', label: 'Other' },
];

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory && item.status === 'available';
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground">Browse available items</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ItemCategory | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{item.name}</CardTitle>
                  <Badge className="bg-zwm-primary hover:bg-zwm-secondary">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Location:</span>
                    <span className="text-muted-foreground">{item.location.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Expires:</span>
                    <span className="text-muted-foreground">{formatDate(item.expiryDate)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Added by:</span>
                    <span className="text-muted-foreground">{item.userName}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full zwm-gradient hover:opacity-90">
                  Contact
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
