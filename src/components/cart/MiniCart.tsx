
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronRight, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const MiniCart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleViewCart = () => {
    navigate('/cart');
    setOpen(false);
  };

  const handleCheckout = () => {
    navigate('/cart');
    setOpen(false);
    toast({
      title: "Checkout initiated",
      description: "Taking you to the checkout page...",
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getCartCount() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-500 text-white"
            >
              {getCartCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
        <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-indigo-600" />
              Your Cart
            </SheetTitle>
            <Badge className="ml-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
              {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-auto p-4">
            {cartItems.length > 0 ? (
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex items-center p-3 mb-2 border border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          ₹{item.price.toFixed(2)} x {item.quantity}
                        </span>
                        <span className="text-sm font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-base font-medium text-gray-600 mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Looks like you haven't added any items yet.
                </p>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => navigate('/marketplace')}
                  >
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium">₹40.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-indigo-700">₹{(getCartTotal() + 40).toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                  onClick={handleViewCart}
                >
                  View Cart
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MiniCart;
