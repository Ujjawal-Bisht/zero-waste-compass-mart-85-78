
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/types';
import { Loader2 } from 'lucide-react';

interface PaymentProcessorProps {
  orderId: string;
  amount: number;
  items: OrderItem[];
  onPaymentComplete?: (success: boolean) => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ 
  orderId, 
  amount, 
  items, 
  onPaymentComplete 
}) => {
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer'>('card');
  
  const handlePayment = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to make a payment');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const description = `Order #${orderId} - ${items.length} items`;
      
      const { data, error } = await supabase.functions.invoke(
        'process-payment',
        {
          body: {
            amount,
            currency: 'inr',
            orderId,
            userId: currentUser.id,
            paymentMethod,
            email: currentUser.email,
            description
          }
        }
      );
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.clientSecret) {
        // In a real implementation, you would use Stripe.js to handle the payment
        // with the client secret. This is just a simulation.
        toast.success('Payment processed successfully');
        
        if (onPaymentComplete) {
          onPaymentComplete(true);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try again.');
      
      if (onPaymentComplete) {
        onPaymentComplete(false);
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            className="p-6 h-auto flex flex-col items-center justify-center"
            onClick={() => setPaymentMethod('card')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 mb-2"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span>Credit/Debit Card</span>
          </Button>
          
          <Button
            variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
            className="p-6 h-auto flex flex-col items-center justify-center"
            onClick={() => setPaymentMethod('bank_transfer')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 mb-2"
            >
              <rect x="2" y="8" width="20" height="12" rx="2" />
              <path d="M12 2v6" />
              <path d="M12 2l-3 3" />
              <path d="M12 2l3 3" />
              <line x1="2" y1="13" x2="22" y2="13" />
            </svg>
            <span>Bank Transfer</span>
          </Button>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">₹{amount.toFixed(2)}</span>
          </div>
        </div>
        
        {/* This would be replaced with actual Stripe Elements or payment form */}
        <div className="p-4 border rounded-md bg-white">
          <p className="text-sm text-gray-500">
            In a real implementation, this would be an embedded payment form. For this demo, just click "Pay Now" to simulate a payment.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handlePayment} 
          className="w-full" 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ₹${amount.toFixed(2)}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentProcessor;
