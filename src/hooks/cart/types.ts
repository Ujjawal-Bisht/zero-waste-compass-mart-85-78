
import { User } from "@/types";

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

export interface CartOperations {
  addToCart: (item: CartItem | string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => number;
  getCartTotal: () => number;
  refresh: () => Promise<void>;
}

export interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  isLoading: boolean;
}

export type CartHookReturn = CartState & CartOperations;
