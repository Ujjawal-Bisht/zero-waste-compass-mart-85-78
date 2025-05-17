
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Filter, Package, Star } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { Item, ItemCategory } from '@/types';
import mockItems from '@/data/mockData';

const Marketplace: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter items based on search, category, and availability
  const filteredItems = mockItems
    .filter(item => item.status === 'available') // Only show available items
    .filter(item => 
      searchQuery 
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter(item => 
      selectedCategory !== 'all' 
        ? item.category === selectedCategory 
        : true
    );
  
  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'price_low') {
      return (a.currentPrice || 0) - (b.currentPrice || 0);
    }
    if (sortBy === 'price_high') {
      return (b.currentPrice || 0) - (a.currentPrice || 0);
    }
    return 0;
  });

  const handleAddToCart = (item: Item) => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
      variant: "success",
    });
  };

  const categories: { value: ItemCategory | 'all', label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'food', label: 'Food' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'household', label: 'Household' },
    { value: 'books', label: 'Books' },
    { value: 'toys', label: 'Toys' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'other', label: 'Other' }
  ];

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Today';
    if (diffDays <= 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="text-muted-foreground mt-1">Browse available items</p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search items..." 
                className="pl-10 md:w-[250px] bg-gray-50 border-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ItemCategory | 'all')}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Available
                      </Badge>
                    </div>
                    {item.dynamicPricingEnabled && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                          Dynamic Pricing
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span className="text-xs ml-1">4.5</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Package className="h-3 w-3 mr-1" /> {item.category}
                      <span className="mx-2">•</span>
                      {formatDate(item.createdAt)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Price</span>
                        <span className="font-bold text-xl">
                          ${item.currentPrice?.toFixed(2) || item.originalPrice?.toFixed(2) || "N/A"}
                        </span>
                      </div>
                      
                      <Button 
                        onClick={() => handleAddToCart(item)} 
                        className="buyer-button-gradient"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium">No items found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We couldn't find any items matching your search criteria. Try adjusting your filters or check back later.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }} 
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Marketplace;
