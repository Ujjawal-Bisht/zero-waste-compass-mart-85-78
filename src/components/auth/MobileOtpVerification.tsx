
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Smartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 characters' })
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be exactly 6 characters' })
});

interface MobileOtpVerificationProps {
  onVerificationComplete: (phoneNumber: string) => void;
  onCancel: () => void;
}

const MobileOtpVerification: React.FC<MobileOtpVerificationProps> = ({ 
  onVerificationComplete, 
  onCancel 
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: ''
    }
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  const handleSendOtp = async (values: z.infer<typeof phoneSchema>) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, this would call an API to send the OTP
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPhoneNumber(values.phoneNumber);
      setStep('otp');
      toast.success(`OTP sent to ${values.phoneNumber}`);
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (values: z.infer<typeof otpSchema>) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, this would call an API to verify the OTP
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For this mock, we'll consider any 6-digit OTP as valid
      if (values.otp.length === 6) {
        onVerificationComplete(phoneNumber);
        toast.success('Phone number verified successfully!');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-zwm-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <Smartphone className="h-8 w-8 text-zwm-primary" />
          </div>
          <CardTitle>{step === 'phone' ? 'Phone Verification' : 'Enter OTP'}</CardTitle>
          <CardDescription>
            {step === 'phone' 
              ? 'Enter your phone number to receive a verification code' 
              : `Enter the 6-digit code sent to ${phoneNumber}`}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 'phone' ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(handleSendOtp)} className="space-y-4">
                <FormField
                  control={phoneForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted">
                            +1
                          </span>
                          <Input 
                            className="rounded-l-none" 
                            placeholder="(555) 123-4567" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="zwm-gradient"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Code'}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleVerifyOtp)} className="space-y-4">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <div className="flex justify-center py-4">
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setStep('phone')}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="zwm-gradient"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify Code'}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {step === 'phone' 
            ? 'We\'ll send a verification code to this number' 
            : 'Didn\'t receive a code? '} 
          {step === 'otp' && (
            <button 
              type="button"
              className="text-zwm-primary hover:underline ml-1"
              onClick={() => {
                toast.info('Resending code...');
                // Simulate resending OTP
                setTimeout(() => toast.success('New code sent!'), 1500);
              }}
            >
              Resend
            </button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MobileOtpVerification;
