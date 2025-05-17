
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  seller: string;
  image: string;
};

// Mock cart items
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Organic Apples',
    price: 5.99,
    quantity: 2,
    seller: 'Fresh Farms',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=100',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 89.99,
    quantity: 1,
    seller: 'Tech World',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100',
  },
];

const Cart: React.FC = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      variant: "default",
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const checkout = () => {
    toast({
      title: "Checkout initiated",
      description: "Processing your order...",
      variant: "default",
    });
    // In a real app, this would navigate to checkout page or process payment
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
        </div>
        <Button 
          onClick={checkout}
          className="zwm-gradient hover:opacity-90 transition-opacity"
          disabled={cartItems.length === 0}
        >
          <ShoppingBag className="mr-2 h-4 w-4" /> 
          Checkout
        </Button>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Sold by {item.seller}</p>
                      <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="px-2 py-0 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="px-4">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="px-2 py-0 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-2xl font-bold">${calculateTotal()}</p>
              </div>
              <Button 
                onClick={checkout}
                className="zwm-gradient hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> 
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet</p>
            <Button 
              onClick={() => window.location.href = '/marketplace'}
              variant="outline"
              className="button-bounce"
            >
              <Package className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Cart;
