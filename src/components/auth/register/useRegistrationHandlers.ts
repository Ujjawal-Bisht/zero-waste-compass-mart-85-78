
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export const useRegistrationHandlers = () => {
  const { register, googleLogin, phoneLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const onSubmitBuyer = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }
    
    try {
      setIsLoading(true);
      await register(values.email, values.password, values.name);
      navigate('/dashboard');
    } catch (error) {
      console.error('Buyer registration error:', error);
      // Error is already handled in the register function
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmitSeller = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    businessName: string;
    businessType: 'retailer' | 'distributor' | 'manufacturer' | 'individual';
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  }) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }
    
    try {
      setIsLoading(true);
      await register(values.email, values.password, values.name, {
        businessName: values.businessName,
        businessType: values.businessType,
        isSeller: true
      });
      navigate('/seller/dashboard');
    } catch (error) {
      console.error('Seller registration error:', error);
      // Error is already handled in the register function
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = (accountType: 'buyer' | 'seller') => async () => {
    try {
      setIsLoading(true);
      await googleLogin(accountType);
      // The page will be redirected by Google OAuth, so no navigate needed here
    } catch (error) {
      console.error('Google login error:', error);
      // Error is already handled in the googleLogin function
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePhoneRegistration = (accountType: 'buyer' | 'seller') => async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      await phoneLogin(phoneNumber, accountType);
    } catch (error) {
      console.error('Phone registration error:', error);
      // Error is already handled in the phoneLogin function
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
    handleGoogleLogin,
    handlePhoneRegistration
  };
};
