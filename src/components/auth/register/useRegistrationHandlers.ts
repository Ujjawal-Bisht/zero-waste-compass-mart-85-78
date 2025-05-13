
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

  const onSubmitBuyer = async (values: z.infer<typeof userSchema>) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      // Create enhanced user object with additional fields
      const extraUserDetails = {
        phoneNumber: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
        dob: values.dob,
        // This fixed the type error by adding isSeller flag
        isSeller: false
      };
      
      await registerUser(values.email, values.password, values.name, extraUserDetails);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSeller = async (values: z.infer<typeof sellerSchema>) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      // Create enhanced seller object with additional fields
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
      
      await registerUser(values.email, values.password, values.name, sellerDetails);
      toast.success('Seller account created successfully!');
      navigate('/seller/profile'); // Redirect to seller verification page
    } catch (error) {
      console.error('Seller registration error:', error);
      toast.error('Failed to create seller account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (accountType: 'buyer' | 'seller') => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }
    
    try {
      setIsLoading(true);
      // Pass account type to googleLogin
      await googleLogin(accountType);
      toast.success('Successfully signed in with Google!');
      navigate(accountType === 'seller' ? '/seller/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneRegistration = (accountType: 'buyer' | 'seller') => (phoneNumber: string) => {
    try {
      setIsLoading(true);
      // Pass account type to phoneLogin
      phoneLogin(phoneNumber, accountType);
      toast.success('Account created successfully with phone verification!');
      navigate(accountType === 'seller' ? '/seller/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Phone registration error:', error);
      toast.error('Failed to create account with phone. Please try again.');
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
