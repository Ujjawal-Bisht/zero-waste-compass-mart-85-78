
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
import { AlertCircle, Phone, Mail, MapPin, Clock, Contact, IndianRupee, PillBottle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { differenceInDays } from 'date-fns';
import { toast } from 'sonner';

// Mock data for marketplace items - including food, household items, and medicines
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
      address: 'Mumbai, Maharashtra',
      lat: 19.0760,
      lng: 72.8777,
    },
    originalPrice: 399,
    currentPrice: 299,
    quantity: 12
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
      address: 'Delhi, Delhi',
      lat: 28.6139,
      lng: 77.2090,
    },
    originalPrice: 150,
    currentPrice: 99,
    quantity: 5
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
      address: 'Bangalore, Karnataka',
      lat: 12.9716,
      lng: 77.5946,
    },
    originalPrice: 1199,
    currentPrice: 1199,
    quantity: 3
  },
  {
    id: '5',
    name: 'Eco-friendly Cleaning Supplies',
    description: 'Set of organic cleaning products, unopened',
    category: 'household',
    imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2025-12-31',
    createdAt: '2025-05-05',
    updatedAt: '2025-05-05',
    status: 'available',
    userId: 'user202',
    userName: 'Sarah Brown',
    userPhoto: null,
    location: {
      address: 'Hyderabad, Telangana',
      lat: 17.3850,
      lng: 78.4867,
    },
    originalPrice: 1250,
    currentPrice: 999,
    quantity: 2
  },
  {
    id: '6',
    name: 'Organic Pasta',
    description: 'Italian organic pasta, multiple varieties',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&q=80&w=2565&ixlib=rb-4.0.3',
    expiryDate: '2025-10-31',
    createdAt: '2025-05-06',
    updatedAt: '2025-05-06',
    status: 'available',
    userId: 'user303',
    userName: 'Emma Davis',
    userPhoto: null,
    location: {
      address: 'Chennai, Tamil Nadu',
      lat: 13.0827,
      lng: 80.2707,
    },
    originalPrice: 450,
    currentPrice: 350,
    quantity: 15
  },
  // Adding new items - Medicines
  {
    id: '7',
    name: 'Paracetamol Tablets',
    description: 'Sealed pack of paracetamol tablets, fever and pain relief',
    category: 'medicine',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2025-08-15',
    createdAt: '2025-05-07',
    updatedAt: '2025-05-07',
    status: 'available',
    userId: 'user404',
    userName: 'Dr. Rajeev Kumar',
    userPhoto: null,
    location: {
      address: 'Mumbai, Maharashtra',
      lat: 19.0760,
      lng: 72.8777,
    },
    originalPrice: 120,
    currentPrice: 99,
    quantity: 20
  },
  {
    id: '8',
    name: 'Vitamin C Supplements',
    description: 'Immunity boosting vitamin C tablets, sealed bottle',
    category: 'medicine',
    imageUrl: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2026-01-10',
    createdAt: '2025-05-08',
    updatedAt: '2025-05-08',
    status: 'available',
    userId: 'user505',
    userName: 'Priya Sharma',
    userPhoto: null,
    location: {
      address: 'Delhi, Delhi',
      lat: 28.6139,
      lng: 77.2090,
    },
    originalPrice: 550,
    currentPrice: 450,
    quantity: 8
  },
  {
    id: '9',
    name: 'First Aid Kit',
    description: 'Complete first aid kit with bandages, antiseptics and more',
    category: 'medicine',
    imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2026-05-20',
    createdAt: '2025-05-09',
    updatedAt: '2025-05-09',
    status: 'available',
    userId: 'user606',
    userName: 'Amit Patel',
    userPhoto: null,
    location: {
      address: 'Bangalore, Karnataka',
      lat: 12.9716,
      lng: 77.5946,
    },
    originalPrice: 1500,
    currentPrice: 1299,
    quantity: 5
  },
  {
    id: '10',
    name: 'Diabetic Glucose Monitor',
    description: 'Unused blood glucose monitoring system with test strips',
    category: 'medicine',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2025-12-31',
    createdAt: '2025-05-10',
    updatedAt: '2025-05-10',
    status: 'available',
    userId: 'user707',
    userName: 'Divya Reddy',
    userPhoto: null,
    location: {
      address: 'Chennai, Tamil Nadu',
      lat: 13.0827,
      lng: 80.2707,
    },
    originalPrice: 3500,
    currentPrice: 2999,
    quantity: 2
  },
  {
    id: '11',
    name: 'Ayurvedic Supplements',
    description: 'Traditional Ayurvedic health supplements, sealed bottles',
    category: 'medicine',
    imageUrl: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    expiryDate: '2025-11-15',
    createdAt: '2025-05-11',
    updatedAt: '2025-05-11',
    status: 'available',
    userId: 'user808',
    userName: 'Vikram Mehta',
    userPhoto: null,
    location: {
      address: 'Kolkata, West Bengal',
      lat: 22.5726, 
      lng: 88.3639,
    },
    originalPrice: 850,
    currentPrice: 699,
    quantity: 10
  }
];

const categories: { value: ItemCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'household', label: 'Household' },
  { value: 'medicine', label: 'Medicines' },
];

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  const getDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return differenceInDays(expiry, today);
  };

  const getDiscountPercentage = (originalPrice?: number, currentPrice?: number): number => {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
      return 0;
    }
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const isNearExpiry = (expiryDate: string): boolean => {
    const daysUntil = getDaysUntilExpiry(expiryDate);
    return daysUntil <= 7 && daysUntil >= 0;
  };

  const handleContact = (item: Item) => {
    setSelectedItem(item);
  };

  const handleContactSend = (method: 'phone' | 'email') => {
    if (selectedItem) {
      toast.success(`Contact request sent to ${selectedItem.userName} via ${method}`);
      setSelectedItem(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category === 'medicine') {
      return <PillBottle className="h-4 w-4 mr-1" />;
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
            className="w-full transition-all focus:ring-2 focus:ring-zwm-primary focus:border-transparent"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ItemCategory | 'all')}
          >
            <SelectTrigger className="transition-all">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value} className="flex items-center">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const discountPercent = getDiscountPercentage(item.originalPrice, item.currentPrice);
            const isItemNearExpiry = isNearExpiry(item.expiryDate);
            const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
            
            return (
              <Card key={item.id} className="overflow-hidden flex flex-col card-hover animate-fade-in hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all hover:scale-105 duration-300"
                  />
                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 bg-zwm-primary text-white rounded-full px-2 py-1 text-xs font-bold animate-pulse-slow">
                      {discountPercent}% OFF
                    </div>
                  )}
                  {isItemNearExpiry && (
                    <div className="absolute bottom-2 right-2 bg-zwm-warning/90 text-white rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 
                      {daysUntilExpiry === 0 ? 'Expires today!' : `${daysUntilExpiry} days left`}
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{item.name}</CardTitle>
                    <Badge className={`flex items-center ${item.category === 'medicine' ? 'bg-blue-500' : item.category === 'food' ? 'bg-green-500' : 'bg-amber-500'} hover:bg-opacity-90 transition-colors`}>
                      {getCategoryIcon(item.category)}
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm gap-1.5">
                      <MapPin className="h-4 w-4 text-zwm-primary" />
                      <span className="text-muted-foreground">{item.location.address}</span>
                    </div>
                    <div className="flex items-center text-sm gap-1.5">
                      <Clock className="h-4 w-4 text-zwm-secondary" />
                      <span className="text-muted-foreground">{formatDate(item.expiryDate)}</span>
                    </div>
                    <div className="flex items-center text-sm gap-1.5">
                      <Contact className="h-4 w-4 text-zwm-accent" />
                      <span className="text-muted-foreground">{item.userName}</span>
                    </div>
                    <div className="flex items-center mt-3 gap-2">
                      {item.originalPrice !== item.currentPrice && item.originalPrice ? (
                        <div className="flex items-baseline">
                          <span className="text-sm line-through text-muted-foreground flex items-center">
                            <IndianRupee className="h-3 w-3 mr-0.5" />{item.originalPrice.toFixed(2)}
                          </span>
                          <span className="ml-1.5 text-lg font-bold text-zwm-primary flex items-center">
                            <IndianRupee className="h-3.5 w-3.5 mr-0.5" />{item.currentPrice?.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-zwm-primary flex items-center">
                          <IndianRupee className="h-3.5 w-3.5 mr-0.5" />{item.currentPrice?.toFixed(2)}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        • {item.quantity} available
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="default" 
                    className="w-full zwm-gradient-hover button-glow transition-all"
                    onClick={() => handleContact(item)}
                  >
                    Contact Seller
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle>Contact {selectedItem?.userName}</DialogTitle>
            <DialogDescription>
              Select how you would like to contact the seller about "{selectedItem?.name}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button 
              onClick={() => handleContactSend('phone')}
              variant="outline" 
              className="w-full flex justify-center items-center gap-2 py-6 hover:bg-zwm-primary/10 transition-all"
            >
              <Phone className="h-5 w-5 text-zwm-primary" />
              <span>Call Seller</span>
            </Button>
            
            <Button 
              onClick={() => handleContactSend('email')}
              variant="outline" 
              className="w-full flex justify-center items-center gap-2 py-6 hover:bg-zwm-secondary/10 transition-all"
            >
              <Mail className="h-5 w-5 text-zwm-secondary" />
              <span>Email Seller</span>
            </Button>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedItem(null)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
