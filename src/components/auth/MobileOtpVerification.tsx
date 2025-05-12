
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { COUNTRY_CODES } from '@/utils/countryCodes';

const phoneSchema = z.object({
  countryCode: z.string().min(1, { message: 'Country code is required' }),
  phoneNumber: z.string().min(5, { message: 'Phone number must be at least 5 characters' })
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
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+1', // Default to US
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
      // Format the phone number with country code
      const fullPhoneNumber = `${values.countryCode}${values.phoneNumber}`;
      
      // In a real implementation, this would call an API to send the OTP
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormattedPhoneNumber(fullPhoneNumber);
      setStep('otp');
      toast.success(`OTP sent to ${fullPhoneNumber}`);
      
      // Start countdown for resend button
      startResendCountdown();
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
        onVerificationComplete(formattedPhoneNumber);
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

  const startResendCountdown = () => {
    setResendDisabled(true);
    setCountdownTime(30);
    
    const timer = setInterval(() => {
      setCountdownTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;
    
    toast.info('Resending code...');
    
    // Get current values from phone form
    const countryCode = phoneForm.getValues('countryCode');
    const phoneNumber = phoneForm.getValues('phoneNumber');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('New code sent!');
      startResendCountdown();
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const formatPhoneNumberForDisplay = (countryCode: string, phoneNumber: string) => {
    const country = COUNTRY_CODES.find(c => c.dialCode === countryCode);
    return `${countryCode} ${phoneNumber}${country ? ` (${country.name})` : ''}`;
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
              : `Enter the 6-digit code sent to ${formattedPhoneNumber}`}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 'phone' ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(handleSendOtp)} className="space-y-4">
                <FormField
                  control={phoneForm.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Code</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select country code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {COUNTRY_CODES.map((country) => (
                            <SelectItem 
                              key={country.code} 
                              value={country.dialCode}
                              className="flex items-center gap-2"
                            >
                              <span className="font-medium">{country.dialCode}</span>
                              <span className="text-muted-foreground">{country.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={phoneForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123-456-7890" 
                          {...field}
                          className="w-full" 
                          type="tel"
                        />
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
              className={`text-zwm-primary ml-1 ${resendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
              onClick={handleResendOtp}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend in ${countdownTime}s` : 'Resend'}
            </button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MobileOtpVerification;
