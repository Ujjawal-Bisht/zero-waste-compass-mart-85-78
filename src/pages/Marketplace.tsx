
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Filter, PackageOpen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  rating: number;
  image: string;
  expiryDate: string;
  discountPercentage?: number;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    price: 299,
    category: 'Food',
    seller: 'Fresh Farms',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=100',
    expiryDate: '2025-05-27'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 4999,
    category: 'Electronics',
    seller: 'Tech World',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100',
    expiryDate: '2026-12-31'
  },
  {
    id: '3',
    name: 'Fresh Milk (1L)',
    price: 79,
    category: 'Food',
    seller: 'Dairy Delight',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=100',
    expiryDate: '2025-05-19'
  },
  {
    id: '4',
    name: 'Smart Watch',
    price: 6999,
    category: 'Electronics',
    seller: 'Tech Galaxy',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=100',
    expiryDate: '2026-10-15'
  },
];

const Marketplace: React.FC = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);

  // Calculate dynamic pricing based on expiry dates
  useEffect(() => {
    // Apply AI dynamic pricing model based on expiry date
    const calculateDiscount = (expiryDate: string): number => {
      const today = new Date();
      const expiry = new Date(expiryDate);
      const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      // Dynamic pricing algorithm
      if (daysUntilExpiry <= 3) {
        return 70; // 70% discount if about to expire in 3 days
      } else if (daysUntilExpiry <= 7) {
        return 50; // 50% discount if expiring within a week
      } else if (daysUntilExpiry <= 14) {
        return 30; // 30% discount if expiring within two weeks
      } else if (daysUntilExpiry <= 30) {
        return 15; // 15% discount if expiring within a month
      }
      return 0; // No discount for items with expiry date far away
    };

    // Update products with discount
    const updatedProducts = mockProducts.map(product => {
      const discountPercentage = calculateDiscount(product.expiryDate);
      return {
        ...product,
        discountPercentage
      };
    });

    setProducts(updatedProducts);
  }, []);

  const addToCart = (product: Product) => {
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Marketplace</h1>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" size="sm" className="filter-button">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </motion.div>
      </motion.div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-8 overflow-x-auto flex whitespace-nowrap p-1 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
          <TabsTrigger value="all" className="tab-animate">All</TabsTrigger>
          <TabsTrigger value="food" className="tab-animate">Food</TabsTrigger>
          <TabsTrigger value="electronics" className="tab-animate">Electronics</TabsTrigger>
          <TabsTrigger value="clothing" className="tab-animate">Clothing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="food" className="mt-6">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products
              .filter(p => p.category.toLowerCase() === 'food')
              .map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="electronics" className="mt-6">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products
              .filter(p => p.category.toLowerCase() === 'electronics')
              .map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="clothing" className="mt-6">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="col-span-full text-center py-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-pulse-slow" />
                <h3 className="text-lg font-medium">No clothing items available right now</h3>
                <p className="text-gray-500">Check back soon for new arrivals</p>
              </motion.div>
            </div>
          </motion.div>
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
  // Calculate discounted price
  const discountedPrice = product.discountPercentage 
    ? product.price - (product.price * product.discountPercentage / 100)
    : product.price;

  const daysUntilExpiry = () => {
    const today = new Date();
    const expiry = new Date(product.expiryDate);
    return Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Define the itemVariants here
  const cardItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={cardItemVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-40 bg-gray-100 relative overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <Badge className="absolute top-2 right-2 category-badge bg-gradient-to-r from-indigo-500 to-purple-500 text-white">{product.category}</Badge>
          
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <CardContent className="pt-4 flex-grow flex flex-col">
          <div className="mb-4 flex-grow">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">Sold by {product.seller}</p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <motion.span 
                  key={i} 
                  className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  ★
                </motion.span>
              ))}
              <span className="text-xs ml-1 text-gray-500">{product.rating}</span>
            </div>
            
            {daysUntilExpiry() <= 14 && (
              <div className="flex items-center mt-2 text-amber-600 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>Expires in {daysUntilExpiry()} days</span>
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div>
              {product.discountPercentage > 0 ? (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
                  <p className="font-bold text-green-600">₹{discountedPrice.toFixed(2)}</p>
                </div>
              ) : (
                <p className="font-bold">₹{product.price.toFixed(2)}</p>
              )}
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button size="sm" onClick={() => onAddToCart(product)} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                <ShoppingCart className="h-4 w-4 mr-1" /> Add
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Marketplace;
