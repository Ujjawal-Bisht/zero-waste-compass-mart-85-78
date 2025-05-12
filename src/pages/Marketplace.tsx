
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
import { AlertCircle, Phone, Mail, MapPin, Clock, Contact } from 'lucide-react';
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

// Mock data for marketplace items - only food and household items
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
    originalPrice: 5.99,
    currentPrice: 3.99,
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
      address: '456 Oak St, City',
      lat: 40.7129,
      lng: -74.007,
    },
    originalPrice: 4.50,
    currentPrice: 2.25,
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
      address: '101 Elm St, City',
      lat: 40.7131,
      lng: -74.009,
    },
    originalPrice: 25.99,
    currentPrice: 25.99,
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
      address: '202 Cedar St, City',
      lat: 40.7132,
      lng: -74.01,
    },
    originalPrice: 32.50,
    currentPrice: 28.99,
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
      address: '303 Maple St, City',
      lat: 40.7133,
      lng: -74.011,
    },
    originalPrice: 8.99,
    currentPrice: 6.75,
    quantity: 15
  },
];

const categories: { value: ItemCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'household', label: 'Household' },
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
                <SelectItem key={category.value} value={category.value}>
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
              <Card key={item.id} className="overflow-hidden flex flex-col card-hover">
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
                    <Badge className="bg-zwm-primary hover:bg-zwm-secondary transition-colors">
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
                          <span className="text-sm line-through text-muted-foreground">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                          <span className="ml-1.5 text-lg font-bold text-zwm-primary">
                            ${item.currentPrice?.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-zwm-primary">
                          ${item.currentPrice?.toFixed(2)}
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
        <DialogContent className="sm:max-w-md">
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
