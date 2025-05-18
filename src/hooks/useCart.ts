
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';

interface CartItem {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Fetch cart items
  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [currentUser]);

  const fetchCartItems = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Mock cart items for now
      const mockCartItems: CartItem[] = [
        {
          id: "mock-cart-item-1",
          product_id: "product-1",
          user_id: currentUser.id,
          quantity: 2,
          product: {
            id: "product-1",
            name: "Organic Apples",
            price: 5.99,
            image_url: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=100&h=100"
          }
        },
        {
          id: "mock-cart-item-2",
          product_id: "product-2",
          user_id: currentUser.id,
          quantity: 1,
          product: {
            id: "product-2",
            name: "Free-Range Eggs",
            price: 3.49,
            image_url: "https://images.unsplash.com/photo-1598965766601-5f2c89c2a1ad?auto=format&fit=crop&q=80&w=100&h=100"
          }
        }
      ];
      
      setCartItems(mockCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load your cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!currentUser) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    
    try {
      // Check if item is already in cart
      const existingItem = cartItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + quantity;
        
        // Mock update
        const updatedItems = cartItems.map(item => 
          item.product_id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        
        toast.success("Cart updated successfully");
      } else {
        // Mock add new item
        const mockProduct = {
          id: productId,
          name: "New Product",
          price: 9.99,
          image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100&h=100"
        };
        
        const newItem: CartItem = {
          id: `mock-cart-item-${Date.now()}`,
          product_id: productId,
          user_id: currentUser.id,
          quantity,
          product: mockProduct
        };
        
        setCartItems([...cartItems, newItem]);
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      // Mock remove
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      return removeFromCart(itemId);
    }
    
    try {
      // Mock update
      const updatedItems = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      toast.success("Cart updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update cart");
    }
  };

  const clearCart = async () => {
    try {
      // Mock clear
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.quantity * (item.product?.price || 0));
  }, 0);

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    refresh: fetchCartItems
  };
};

export default useCart;
