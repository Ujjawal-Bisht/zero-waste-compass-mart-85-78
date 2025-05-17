
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  onAddToCart?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  productId, 
  productName, 
  price,
  onAddToCart 
}) => {
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = () => {
    // In a real app, this would dispatch to a cart context/store
    setIsAdded(true);
    
    // Show success toast
    toast({
      title: "Added to cart!",
      description: `${productName} has been added to your cart.`,
    });
    
    // Call the parent's callback if provided
    if (onAddToCart) {
      onAddToCart();
    }
    
    // Reset the button after a delay
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        size="sm" 
        onClick={handleAddToCart} 
        disabled={isAdded}
        className={`
          ${isAdded 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
          } 
          text-white transition-all duration-300
        `}
      >
        {isAdded ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center"
          >
            <Check className="h-4 w-4 mr-1" /> Added
          </motion.div>
        ) : (
          <motion.div className="flex items-center">
            <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};

export default AddToCartButton;
