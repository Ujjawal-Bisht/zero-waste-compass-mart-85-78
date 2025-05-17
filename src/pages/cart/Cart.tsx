
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import TopNavbar from '@/components/layouts/TopNavbar';
import CartHeader from './components/CartHeader';
import CartItems from './components/CartItems';
import OrderSummary from './components/OrderSummary';
import PaymentModal from '@/components/PaymentModal';
import { v4 as uuidv4 } from 'uuid';

const Cart: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartCount,
    clearCart,
    isLoading
  } = useCart();
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderId] = useState(uuidv4());

  const removeItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const updateItemQuantity = (id: string, delta: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + delta);
    }
  };

  const checkoutHandler = () => {
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentComplete = () => {
    // Clear the cart after successful payment
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and will be processed shortly.",
      });
      navigate('/dashboard');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <TopNavbar />
      <div className="container mx-auto px-4 py-8">
        <CartHeader cartItemCount={getCartCount()} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems 
              cartItems={cartItems}
              removeFromCart={removeItem}
              updateItemQuantity={updateItemQuantity}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              subtotal={getCartTotal()}
              deliveryFee={40}
              onCheckout={checkoutHandler}
              isDisabled={cartItems.length === 0}
            />
          </div>
        </div>
        
        <PaymentModal 
          open={isPaymentModalOpen}
          onOpenChange={setIsPaymentModalOpen}
          amount={getCartTotal()}
          orderId={orderId}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </>
  );
};

export default Cart;
