
import React from 'react';
import { motion } from 'framer-motion';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { CartItem as CartItemType } from '@/hooks/useCart';

interface CartItemsProps {
  cartItems: CartItemType[];
  removeFromCart: (id: string) => void;
  updateItemQuantity: (id: string, delta: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ 
  cartItems, 
  removeFromCart, 
  updateItemQuantity 
}) => {
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

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {cartItems.map(item => (
        <CartItem 
          key={item.id}
          item={item}
          onRemove={removeFromCart}
          onUpdateQuantity={updateItemQuantity}
        />
      ))}
    </motion.div>
  );
};

export default CartItems;
