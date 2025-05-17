
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { usePayment, PaymentMethod, PaymentDetails } from '@/hooks/usePayment';
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Building, 
  Wallet, 
  Check,
  ChevronDown
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [walletType, setWalletType] = useState<'paytm' | 'phonepe' | 'gpay' | 'other'>('paytm');
  const [bankName, setBankName] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const { isLoading, paymentStatus, createPayment } = usePayment();

  const resetForm = () => {
    setCardNumber('');
    setCardHolder('');
    setExpiryDate('');
    setCvv('');
    setUpiId('');
    setWalletType('paytm');
    setBankName('');
    setValidationError('');
  };

  const validatePaymentDetails = (): boolean => {
    setValidationError('');
    
    switch(paymentMethod) {
      case 'card':
        if (!cardNumber.trim() || !cardHolder.trim() || !expiryDate.trim() || !cvv.trim()) {
          setValidationError('Please fill in all card details');
          return false;
        }
        // Basic validation for card number (16 digits)
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
          setValidationError('Please enter a valid 16-digit card number');
          return false;
        }
        // Basic validation for CVV (3-4 digits)
        if (!/^\d{3,4}$/.test(cvv)) {
          setValidationError('Please enter a valid CVV (3-4 digits)');
          return false;
        }
        // Basic validation for expiry date (MM/YY)
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
          setValidationError('Please enter a valid expiry date (MM/YY)');
          return false;
        }
        break;
      case 'upi':
        if (!upiId.trim() || !upiId.includes('@')) {
          setValidationError('Please enter a valid UPI ID');
          return false;
        }
        break;
      case 'netbanking':
        if (!bankName.trim()) {
          setValidationError('Please select a bank');
          return false;
        }
        break;
      case 'wallet':
        // No additional validation for wallet selection
        break;
      case 'cod':
        // No validation needed for COD
        break;
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) {
      return;
    }
    
    try {
      // Prepare payment details based on selected method
      const paymentDetails: PaymentDetails = {
        method: paymentMethod,
      };
      
      // Add specific details based on payment method
      switch(paymentMethod) {
        case 'card':
          paymentDetails.card = {
            cardNumber,
            cardHolder,
            expiryDate,
            cvv
          };
          break;
        case 'upi':
          paymentDetails.upi = { upiId };
          break;
        case 'wallet':
          paymentDetails.wallet = { walletType };
          break;
        case 'netbanking':
          paymentDetails.netBanking = { bankName };
          break;
        // COD doesn't need additional details
      }
      
      await createPayment(amount, paymentDetails, orderId);
      
      if (onPaymentComplete) {
        onPaymentComplete();
      }
      
      // Reset form
      resetForm();
      
      // Close modal after short delay to show success state
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cardNumber = value.replace(/\D/g, '');
    // Add a space after every 4 digits
    const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formattedCardNumber.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Insert slash after 2 digits
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    // Limit to 5 characters (MM/YY)
    value = value.slice(0, 5);
    
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Secure Checkout</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to complete your purchase.
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
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            className="space-y-2"
          >
            {/* Credit/Debit Card Option */}
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Credit/Debit Card</span>
              </Label>
            </div>
            
            {/* UPI Option */}
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                <Smartphone className="mr-2 h-4 w-4" />
                <span>UPI</span>
              </Label>
            </div>
            
            {/* Net Banking Option */}
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Label htmlFor="netbanking" className="flex items-center cursor-pointer flex-1">
                <Building className="mr-2 h-4 w-4" />
                <span>Net Banking</span>
              </Label>
            </div>
            
            {/* Wallet Option */}
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center cursor-pointer flex-1">
                <Wallet className="mr-2 h-4 w-4" />
                <span>Wallets</span>
              </Label>
            </div>
            
            {/* Cash on Delivery Option */}
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                <Banknote className="mr-2 h-4 w-4" />
                <span>Cash on Delivery</span>
              </Label>
            </div>
          </RadioGroup>

          {/* Payment Method Details */}
          <div className="mt-4">
            <AnimatePresence mode="wait">
              {/* Card Details Section */}
              {paymentMethod === 'card' && (
                <motion.div
                  key="card-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 p-4 rounded-md space-y-3">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardHolder">Name on Card</Label>
                      <Input 
                        id="cardHolder" 
                        placeholder="John Doe"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate" 
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          value={cvv}
                          onChange={handleCvvChange}
                          type="password"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* UPI Details */}
              {paymentMethod === 'upi' && (
                <motion.div
                  key="upi-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 p-4 rounded-md space-y-3">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId" 
                        placeholder="username@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <img src="https://via.placeholder.com/40x20?text=GPay" alt="Google Pay" className="h-6" />
                      <img src="https://via.placeholder.com/40x20?text=PhonePe" alt="PhonePe" className="h-6" />
                      <img src="https://via.placeholder.com/40x20?text=Paytm" alt="Paytm" className="h-6" />
                      <img src="https://via.placeholder.com/40x20?text=BHIM" alt="BHIM UPI" className="h-6" />
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Net Banking Details */}
              {paymentMethod === 'netbanking' && (
                <motion.div
                  key="netbanking-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 p-4 rounded-md">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="banks">
                        <AccordionTrigger className="py-2">
                          Select Bank
                        </AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup
                            value={bankName}
                            onValueChange={setBankName}
                            className="space-y-2"
                          >
                            {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank'].map(bank => (
                              <div key={bank} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-100 cursor-pointer">
                                <RadioGroupItem value={bank} id={`bank-${bank}`} />
                                <Label htmlFor={`bank-${bank}`}>{bank}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </motion.div>
              )}
              
              {/* Wallet Details */}
              {paymentMethod === 'wallet' && (
                <motion.div
                  key="wallet-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 p-4 rounded-md">
                    <RadioGroup
                      value={walletType}
                      onValueChange={(value) => setWalletType(value as 'paytm' | 'phonepe' | 'gpay' | 'other')}
                      className="space-y-2"
                    >
                      {[
                        { value: 'paytm', label: 'Paytm' },
                        { value: 'phonepe', label: 'PhonePe' },
                        { value: 'gpay', label: 'Google Pay' },
                        { value: 'other', label: 'Other Wallet' }
                      ].map(wallet => (
                        <div key={wallet.value} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-100 cursor-pointer">
                          <RadioGroupItem value={wallet.value} id={`wallet-${wallet.value}`} />
                          <Label htmlFor={`wallet-${wallet.value}`}>{wallet.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </motion.div>
              )}
              
              {/* COD Message */}
              {paymentMethod === 'cod' && (
                <motion.div
                  key="cod-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 p-4 rounded-md flex items-center space-x-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Pay with cash at the time of delivery. Our delivery executive will carry a payment terminal.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <p className="text-sm text-red-500 mt-2">{validationError}</p>
          )}
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
                <div className="text-green-600 font-medium flex items-center">
                  <Check className="mr-1 h-4 w-4" />
                  Payment Successful!
                </div>
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
