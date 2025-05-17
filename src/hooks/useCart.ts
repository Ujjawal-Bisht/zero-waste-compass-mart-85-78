
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/auth';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  expiryDate?: string;
  sellerId?: string;
};

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      
      try {
        // Check if user is logged in
        if (currentUser?.id) {
          // Try to load cart from Supabase
          const { data: cartData, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', currentUser.id);
          
          if (error) {
            console.error('Error loading cart from database:', error);
            // Fallback to localStorage
            loadFromLocalStorage();
          } else if (cartData && cartData.length > 0) {
            // Transform data from DB format to CartItem format
            const items: CartItem[] = cartData.map(item => ({
              id: item.product_id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image_url || 'https://via.placeholder.com/150',
              sellerId: item.seller_id,
              expiryDate: item.expiry_date
            }));
            
            setCartItems(items);
            console.log('Cart loaded from database:', items);
          } else {
            // No cart in DB, try localStorage
            loadFromLocalStorage();
          }
        } else {
          // User not logged in, use localStorage only
          loadFromLocalStorage();
        }
      } catch (error) {
        console.error('Error in loading cart:', error);
        loadFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };
    
    const loadFromLocalStorage = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error parsing cart data from localStorage:', error);
          setCartItems([]);
        }
      }
    };
    
    loadCart();
  }, [currentUser]);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (!isLoading) {
        // Always save to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        // If user is logged in, also save to database
        if (currentUser?.id && cartItems.length > 0) {
          // First delete all existing items
          try {
            await supabase
              .from('cart_items')
              .delete()
              .eq('user_id', currentUser.id);
              
            // Then insert new ones
            const dbCartItems = cartItems.map(item => ({
              id: uuidv4(), // Generate new ID for the cart_items table
              user_id: currentUser.id,
              product_id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image_url: item.image,
              seller_id: item.sellerId,
              expiry_date: item.expiryDate
            }));
            
            const { error } = await supabase
              .from('cart_items')
              .insert(dbCartItems);
              
            if (error) {
              console.error('Error saving cart to database:', error);
            } else {
              console.log('Cart saved to database');
            }
          } catch (error) {
            console.error('Error in cart operations:', error);
          }
        }
      }
    };
    
    saveCart();
  }, [cartItems, isLoading, currentUser]);
  
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    console.log("Adding to cart:", item);
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    toast.success(`${item.name} added to cart`);
  };
  
  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const clearCart = async () => {
    setCartItems([]);
    
    // Also clear from database if user is logged in
    if (currentUser?.id) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', currentUser.id);
      } catch (error) {
        console.error('Error clearing cart from database:', error);
      }
    }
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };
}
