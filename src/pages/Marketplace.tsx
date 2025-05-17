
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Filter, PackageOpen } from 'lucide-react';
import { motion } from 'framer-motion';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  rating: number;
  image: string;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    price: 5.99,
    category: 'Food',
    seller: 'Fresh Farms',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=100',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 89.99,
    category: 'Electronics',
    seller: 'Tech World',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100',
  },
];

const Marketplace: React.FC = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');

  const addToCart = (product: Product) => {
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="clothing">Clothing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="food" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.category.toLowerCase() === 'food')
              .map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="electronics" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.category.toLowerCase() === 'electronics')
              .map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clothing" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="col-span-full text-center py-8">
              <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No clothing items available right now</h3>
              <p className="text-gray-500">Check back soon for new arrivals</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="h-40 bg-gray-100 relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 right-2">{product.category}</Badge>
        </div>
        <CardContent className="pt-4 flex-grow flex flex-col">
          <div className="mb-4 flex-grow">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">Sold by {product.seller}</p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
              <span className="text-xs ml-1 text-gray-500">{product.rating}</span>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="font-bold">${product.price.toFixed(2)}</p>
            <Button size="sm" onClick={() => onAddToCart(product)}>
              <ShoppingCart className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Marketplace;
