
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from './types';
import { User } from '@/types';

// Helper to calculate total items in cart
export const calculateCartCount = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

// Helper to calculate total price of items in cart
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
};

// Save cart to localStorage
export const saveCartToLocalStorage = (cartItems: CartItem[]): void => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

// Load cart from localStorage
export const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (e) {
    console.error("Error parsing stored cart:", e);
  }
  return [];
};

// Generate mock cart items for testing/demo purposes
export const generateMockCartItems = (userId?: string): CartItem[] => {
  return [
    {
      id: "mock-cart-item-1",
      product_id: "product-1",
      user_id: userId,
      quantity: 2,
      name: "Organic Apples",
      price: 299,
      image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=100&h=100",
      expiryDate: "2025-05-30"
    },
    {
      id: "mock-cart-item-2",
      product_id: "product-2",
      user_id: userId,
      quantity: 1,
      name: "Free-Range Eggs",
      price: 349,
      image: "https://images.unsplash.com/photo-1598965766601-5f2c89c2a1ad?auto=format&fit=crop&q=80&w=100&h=100",
      expiryDate: "2025-05-25"
    }
  ];
};

// Find an existing cart item by product ID
export const findCartItemByProductId = (cartItems: CartItem[], productId: string): CartItem | undefined => {
  return cartItems.find(item => item.product_id === productId);
};

// Convert marketplace product to cart item
export const convertMarketplaceProductToCartItem = (product: any, userId?: string): CartItem => {
  return {
    id: `cart-item-${Date.now()}`,
    product_id: product.id,
    user_id: userId,
    quantity: 1,
    name: product.name,
    price: product.price || 999,
    image: product.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100&h=100",
    expiryDate: product.expiryDate,
    sellerId: product.sellerId
  };
};

// Create a new mock cart item for a product
export const createMockCartProduct = (productId: string, userId?: string): CartItem => {
  return {
    id: `mock-cart-item-${Date.now()}`,
    product_id: productId,
    user_id: userId,
    quantity: 1,
    name: "New Product",
    price: 999,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100&h=100"
  };
};
