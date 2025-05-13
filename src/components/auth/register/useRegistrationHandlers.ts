
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';
import { z } from 'zod';
import { userSchema, sellerSchema } from '../schemas/registerSchema';

export const useRegistrationHandlers = () => {
  const { register: registerUser, googleLogin, phoneLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleRegistrationAttempt = async (
    callback: () => Promise<void>, 
    successMessage: string,
    redirectPath: string,
    errorMessage: string = 'Failed to create account. Please try again.'
  ) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      await callback();
      toast.success(successMessage);
      navigate(redirectPath);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitBuyer = async (values: z.infer<typeof userSchema>) => {
    const extraUserDetails = {
      phoneNumber: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      country: values.country,
      dob: values.dob,
      isSeller: false
    };
    
    await handleRegistrationAttempt(
      async () => await registerUser(values.email, values.password, values.name, extraUserDetails),
      'Account created successfully!',
      '/dashboard'
    );
  };

  const onSubmitSeller = async (values: z.infer<typeof sellerSchema>) => {
    const sellerDetails = {
      businessName: values.businessName,
      businessType: values.businessType,
      isSeller: values.isSeller,
      phoneNumber: values.phone,
      address: values.address || values.businessAddress,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      country: values.country,
      taxId: values.taxId,
      website: values.website,
    };
    
    await handleRegistrationAttempt(
      async () => await registerUser(values.email, values.password, values.name, sellerDetails),
      'Seller account created successfully!',
      '/seller/profile',
      'Failed to create seller account. Please try again.'
    );
  };

  const handleGoogleLogin = async (accountType: 'buyer' | 'seller') => {
    await handleRegistrationAttempt(
      async () => await googleLogin(accountType),
      'Successfully signed in with Google!',
      accountType === 'seller' ? '/seller/dashboard' : '/dashboard',
      'Failed to sign in with Google.'
    );
  };

  const handlePhoneRegistration = (accountType: 'buyer' | 'seller') => (phoneNumber: string) => {
    handleRegistrationAttempt(
      async () => phoneLogin(phoneNumber, accountType),
      'Account created successfully with phone verification!',
      accountType === 'seller' ? '/seller/dashboard' : '/dashboard',
      'Failed to create account with phone. Please try again.'
    );
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
