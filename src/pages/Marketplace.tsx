import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Filter, PackageOpen, Clock, Star, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/cart';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

type Product = {
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
};

// Expanded product list with more categories and items
const mockProducts: Product[] = [
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

const Marketplace: React.FC = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [showExpiryAlerts, setShowExpiryAlerts] = useState(true);

  // Get all unique categories from products
  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category.toLowerCase())))];

  // Fetch products from Supabase (simulated for now)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // This would be a real Supabase query in production
        // const { data, error } = await supabase
        //   .from('products')
        //   .select('*')
        
        // For now, we'll use our mock data
        const data = mockProducts;
        
        // Apply dynamic pricing algorithm
        const updatedProducts = data.map(product => {
          const discountPercentage = calculateDiscount(product.expiryDate);
          return {
            ...product,
            discountPercentage
          };
        });
        
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({ 
          title: "Error", 
          description: "Failed to load products. Please try again later." 
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);

  // Calculate dynamic pricing based on expiry dates
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

  // AI-driven expiry alert generator
  const getAiExpiryAlert = (daysRemaining: number): string => {
    if (daysRemaining <= 3) {
      return "Act fast! This item expires in just a few days. Perfect for immediate use.";
    } else if (daysRemaining <= 7) {
      return "Limited time offer: Use within a week for optimal quality.";
    } else if (daysRemaining <= 14) {
      return "Plan ahead: This product is best used within two weeks.";
    } else if (daysRemaining <= 30) {
      return "Good value: This product will remain fresh for about a month.";
    }
    return "";
  };

  const handleAddToCart = (product: Product) => {
    const discountedPrice = product.discountPercentage 
      ? product.price - (product.price * product.discountPercentage / 100)
      : product.price;
      
    addToCart({
      id: `cart-${product.id}`,
      product_id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      expiryDate: product.expiryDate,
      sellerId: product.sellerId,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const toggleExpiryAlerts = () => {
    setShowExpiryAlerts(!showExpiryAlerts);
    toast({
      title: showExpiryAlerts ? "Expiry alerts disabled" : "Expiry alerts enabled",
      description: showExpiryAlerts 
        ? "You won't see AI-generated expiry recommendations" 
        : "You'll now see AI-generated expiry recommendations"
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

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8">Marketplace</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden h-full">
              <div className="h-40 bg-gray-100 animate-pulse"></div>
              <CardContent className="pt-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Marketplace</h1>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleExpiryAlerts}
              className={`flex items-center gap-2 ${showExpiryAlerts ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-gray-100'}`}
            >
              <AlertTriangle className={`h-4 w-4 ${showExpiryAlerts ? 'text-amber-500' : ''}`} /> 
              {showExpiryAlerts ? "Expiry Alerts: ON" : "Expiry Alerts: OFF"}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="sm" className="filter-button">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-8 overflow-x-auto flex whitespace-nowrap p-1 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
          {categories.map((category) => (
            <TabsTrigger 
              key={category}
              value={category} 
              className="tab-animate capitalize"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products
                .filter(p => category === 'all' || p.category.toLowerCase() === category)
                .map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                    showExpiryAlerts={showExpiryAlerts}
                    getAiExpiryAlert={getAiExpiryAlert}
                  />
                ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  showExpiryAlerts: boolean;
  getAiExpiryAlert: (days: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, showExpiryAlerts, getAiExpiryAlert }) => {
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

  const remainingDays = daysUntilExpiry();
  const aiExpiryAlert = getAiExpiryAlert(remainingDays);
  const showAlert = showExpiryAlerts && aiExpiryAlert && remainingDays <= 30;

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
          <div className="mb-3 flex-grow">
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
            
            {remainingDays <= 14 && (
              <div className="flex items-center mt-2 text-amber-600 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>Expires in {remainingDays} days</span>
              </div>
            )}

            {showAlert && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className={`mt-2 p-2 text-xs rounded-md flex items-start gap-1.5
                  ${remainingDays <= 3 ? 'bg-red-50 text-red-700' : 
                  remainingDays <= 7 ? 'bg-orange-50 text-orange-700' : 
                  remainingDays <= 14 ? 'bg-amber-50 text-amber-700' : 
                  'bg-green-50 text-green-700'}`}
              >
                <div className="mt-0.5">
                  <AlertTriangle className="h-3 w-3" />
                </div>
                <div>
                  {aiExpiryAlert}
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100">
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
              <Button 
                size="sm" 
                onClick={() => onAddToCart(product)} 
                disabled={!product.inStock}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
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
