
import { useState } from 'react';
import { toast } from 'sonner';

interface CartItem {
  product_id: string;
  quantity: number;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItemToCart = (item: CartItem) => {
    setItems(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(i => i.product_id === item.product_id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prev, item];
      }
    });
  };

  const removeItemFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product_id !== productId));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  return {
    items,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
};
