
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/auth';

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface UPIDetails {
  upiId: string;
}

export interface WalletDetails {
  walletType: 'paytm' | 'phonepe' | 'gpay' | 'other';
  mobileNumber?: string;
}

export interface NetBankingDetails {
  bankName: string;
}

export interface PaymentDetails {
  method: PaymentMethod;
  card?: CardDetails;
  upi?: UPIDetails;
  wallet?: WalletDetails;
  netBanking?: NetBankingDetails;
}

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { currentUser } = useAuth();

  // Function to create a payment session
  const createPayment = async (amount: number, paymentDetails: PaymentDetails, orderId?: string) => {
    setIsLoading(true);
    setPaymentStatus('processing');
    
    try {
      // Store payment record in database
      const paymentRecord = {
        user_id: currentUser?.id,
        order_id: orderId,
        amount: amount,
        payment_method: paymentDetails.method,
        payment_status: 'pending',
        currency: 'inr'
      };
      
      // Insert the payment record to Supabase
      const { data: paymentData, error } = await supabase
        .from('payments')
        .insert(paymentRecord)
        .select()
        .single();
        
      if (error) {
        throw new Error(`Failed to create payment record: ${error.message}`);
      }
      
      console.log('Payment record created:', paymentData);
      
      // Simulate payment processing with different providers based on the payment method
      const processingTime = Math.floor(Math.random() * 1000) + 800; // Random time between 800-1800ms
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      // Generate a transaction ID
      const transactionId = `txn_${Math.random().toString(36).substring(2, 15)}`;
      
      // Update payment record with transaction ID and success status
      const { error: updateError } = await supabase
        .from('payments')
        .update({ 
          payment_status: 'paid',
          transaction_id: transactionId,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentData.id);
        
      if (updateError) {
        throw new Error(`Failed to update payment status: ${updateError.message}`);
      }
      
      // Create success response
      const response = {
        success: true,
        paymentId: paymentData.id,
        transactionId,
        amount: amount,
        status: 'paid'
      };
      
      // Create notification for buyer
      await createNotification(
        currentUser?.id as string,
        'Payment Successful',
        `Your payment of ₹${amount.toFixed(2)} has been processed successfully.`,
        'success',
        'payment',
        paymentData.id
      );
      
      setPaymentStatus('success');
      toast.success('Payment successful!', {
        description: `Your payment of ₹${amount.toFixed(2)} has been processed.`
      });
      
      return response;
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      toast.error('Payment failed', {
        description: 'There was an issue processing your payment. Please try again.'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to transfer payment to seller
  const transferToSeller = async (sellerId: string, amount: number, orderId: string) => {
    setIsLoading(true);
    
    try {
      // Create notification for seller
      await createNotification(
        sellerId,
        'Payment Received',
        `₹${amount.toFixed(2)} has been credited to your account for order #${orderId.substring(0, 8)}`,
        'success',
        'payment',
        orderId
      );
      
      toast.success('Payment transferred to seller', {
        description: `₹${amount.toFixed(2)} has been transferred for order #${orderId.substring(0, 8)}`
      });
      
      return true;
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Transfer failed', {
        description: 'Could not transfer payment to seller. Our team will investigate.'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to create notification
  const createNotification = async (
    userId: string,
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error',
    relatedEntityType?: string,
    relatedEntityId?: string
  ) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title,
          message,
          type,
          related_entity_type: relatedEntityType,
          related_entity_id: relatedEntityId,
          is_read: false,
          created_at: new Date().toISOString()
        });
        
      if (error) {
        console.error('Failed to create notification:', error);
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  return {
    isLoading,
    paymentStatus,
    createPayment,
    transferToSeller
  };
}
