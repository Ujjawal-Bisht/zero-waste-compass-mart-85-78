
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Item } from '@/types';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  item: Item;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  item,
  variant = 'default',
  size = 'default',
  className = ''
}) => {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(cartItem => cartItem.productId === item.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    addToCart({
      id: crypto.randomUUID(), // Generate a unique ID for the cart item
      productId: item.id,
      name: item.name,
      price: item.currentPrice,
      image: item.imageUrl || 'https://via.placeholder.com/150',
      expiryDate: item.expiryDate,
      sellerId: item.userId,
      quantity: 1
    });
    
    toast.success(`Added ${item.name} to cart`);
  };
  
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button 
        onClick={handleAddToCart}
        variant={isInCart ? 'outline' : variant}
        size={size}
        className={`${className} ${isInCart ? 'border-green-500 text-green-500' : ''}`}
        disabled={isInCart}
      >
        {isInCart ? (
          <>
            <Check className="w-4 h-4 mr-1" />
            Added
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default AddToCartButton;
