
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  onCheckout: () => void;
  isDisabled: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  subtotal, 
  deliveryFee = 40, 
  onCheckout,
  isDisabled
}) => {
  const total = subtotal + deliveryFee;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="sticky top-24 border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-indigo-700">₹{total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
              onClick={onCheckout}
              disabled={isDisabled}
            >
              Proceed to Checkout
            </Button>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mt-4">
              <h4 className="text-sm font-medium text-indigo-700 mb-2">Delivery Information</h4>
              <p className="text-xs text-indigo-600">
                Orders are typically delivered within 24-48 hours. Free delivery on orders above ₹500.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderSummary;
