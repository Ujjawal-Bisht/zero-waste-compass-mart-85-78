
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';

export interface CartItem {
  id: string;
  product_id?: string;
  user_id?: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  expiryDate?: string;
  sellerId?: string;
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
      // Load from localStorage if not logged in
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (e) {
          console.error("Error parsing stored cart:", e);
          setCartItems([]);
        }
      }
      setLoading(false);
    }
  }, [currentUser]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

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
          name: "Organic Apples",
          price: 5.99,
          image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=100&h=100"
        },
        {
          id: "mock-cart-item-2",
          product_id: "product-2",
          user_id: currentUser.id,
          quantity: 1,
          name: "Free-Range Eggs",
          price: 3.49,
          image: "https://images.unsplash.com/photo-1598965766601-5f2c89c2a1ad?auto=format&fit=crop&q=80&w=100&h=100"
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

  const addToCart = async (item: CartItem | string, quantity: number = 1) => {
    if (!currentUser && typeof item === 'string') {
      toast.error("Please log in to add items to your cart");
      return;
    }
    
    try {
      // Check if the parameter is a string (product ID) or a CartItem object
      if (typeof item === 'string') {
        // Handle as product ID
        const productId = item;
        
        // Check if item is already in cart
        const existingItem = cartItems.find(item => item.product_id === productId);
        
        if (existingItem) {
          // Update quantity
          const newQuantity = existingItem.quantity + quantity;
          
          // Update cart items
          const updatedItems = cartItems.map(item => 
            item.product_id === productId ? { ...item, quantity: newQuantity } : item
          );
          setCartItems(updatedItems);
          
          toast.success("Cart updated successfully");
        } else {
          // Add new item with mock data (in a real implementation, you would fetch the product details)
          const mockProduct = {
            id: `mock-cart-item-${Date.now()}`,
            product_id: productId,
            user_id: currentUser?.id,
            quantity,
            name: "New Product",
            price: 9.99,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100&h=100"
          };
          
          setCartItems([...cartItems, mockProduct]);
          toast.success("Item added to cart");
        }
      } else {
        // Handle as CartItem object
        const cartItem = { ...item, quantity: quantity || 1 };
        
        // Check if item already in cart
        const existingItemIndex = cartItems.findIndex(i => i.id === cartItem.id);
        
        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...cartItems];
          updatedItems[existingItemIndex].quantity += cartItem.quantity;
          setCartItems(updatedItems);
        } else {
          // Add new item
          setCartItems([...cartItems, cartItem]);
        }
        
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      // Remove item
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
      // Update quantity
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
      // Clear cart
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };
  
  // Calculate total items in cart
  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };
  
  // Calculate total price of items in cart
  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return {
    cartItems,
    loading,
    isLoading: loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    refresh: fetchCartItems
  };
};

export default useCart;
