
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Product {
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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  showExpiryAlerts: boolean;
  getAiExpiryAlert: (days: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  showExpiryAlerts, 
  getAiExpiryAlert 
}) => {
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

export default ProductCard;
