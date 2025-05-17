
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { usePayment } from '@/hooks/usePayment';
import { CreditCard, Banknote } from 'lucide-react';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  orderId?: string;
  onPaymentComplete?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onOpenChange,
  amount,
  orderId,
  onPaymentComplete
}) => {
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'cod'>('card');
  const { isLoading, paymentStatus, createPayment } = usePayment();

  const handlePayment = async () => {
    try {
      await createPayment(amount, orderId);
      if (onPaymentComplete) {
        onPaymentComplete();
      }
      
      // Close modal after short delay to show success state
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Secure Payment</DialogTitle>
          <DialogDescription>
            Complete your purchase securely with our payment gateway.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              {orderId && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Order ID:</span>
                  <span>{orderId.substring(0, 8)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal:</span>
                <span>₹{amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Delivery Fee:</span>
                <span>₹40.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span className="text-indigo-700">₹{(amount + 40).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <h3 className="font-medium mb-2">Payment Method</h3>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as 'card' | 'cod')}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Credit/Debit Card</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                <Banknote className="mr-2 h-4 w-4" />
                <span>Cash on Delivery</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <AnimatePresence mode="wait">
            {paymentStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center py-2"
              >
                <div className="text-green-600 font-medium">Payment Successful!</div>
                <p className="text-sm text-gray-500">Your order has been placed.</p>
              </motion.div>
            ) : (
              <motion.div
                key="pay-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>Pay ₹{(amount + 40).toFixed(2)}</>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
