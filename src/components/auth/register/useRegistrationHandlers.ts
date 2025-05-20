
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { registerSchema } from '../schemas/registerSchema';

export const useRegistrationHandlers = () => {
  const { register, googleLogin, phoneLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fix the buyer form submission handler to not return a function
  const onSubmitBuyer = async (values: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);
      
      if (!captchaValue) {
        toast.error("Please complete the captcha verification");
        setIsLoading(false);
        return;
      }
      
      await register(
        values.email, 
        values.password, 
        values.name
      );
      
      toast.success("Registration successful! Please check your email to verify your account.");
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || "Something went wrong during registration");
    } finally {
      setIsLoading(false);
    }
  };

  // Fix the seller form submission handler to not return a function
  const onSubmitSeller = async (values: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);
      
      if (!captchaValue) {
        toast.error("Please complete the captcha verification");
        setIsLoading(false);
        return;
      }
      
      await register(
        values.email, 
        values.password, 
        values.name, 
        {
          businessName: values.businessName,
          businessType: values.businessType as 'retailer' | 'distributor' | 'manufacturer' | 'individual',
          isSeller: true
        }
      );
      
      toast.success("Seller registration successful! Please check your email to verify your account.");
      navigate('/login');
    } catch (error: any) {
      console.error('Seller registration error:', error);
      toast.error(error.message || "Something went wrong during registration");
    } finally {
      setIsLoading(false);
    }
  };

  // Fix the phone registration to return the function directly
  const handlePhoneRegistration = (accountType: 'buyer' | 'seller') => async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      await phoneLogin(phoneNumber, accountType);
      toast.success("OTP sent to your phone. Please verify to complete registration.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Fix the Google login to return the function directly
  const handleGoogleLogin = (accountType: 'buyer' | 'seller') => async () => {
    try {
      setIsLoading(true);
      await googleLogin(accountType);
    } catch (error: any) {
      toast.error(error.message || "Failed to authenticate with Google");
    } finally {
      setIsLoading(false); 
    }
  };

  return {
    isLoading,
    captchaValue,
    setCaptchaValue,
    onSubmitBuyer,
    onSubmitSeller,
    handlePhoneRegistration,
    handleGoogleLogin
  };
};
