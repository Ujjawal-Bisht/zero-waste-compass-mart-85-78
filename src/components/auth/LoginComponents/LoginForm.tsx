
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Store } from 'lucide-react';
import { EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';
import BuyerLoginSection from './BuyerLoginSection';
import SellerLoginSection from './SellerLoginSection';
import ReturnToHomeButton from './ReturnToHomeButton';

interface LoginFormProps {
  onAccountTypeChange?: (type: 'buyer' | 'seller') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onAccountTypeChange }) => {
  const { login, googleLogin, phoneLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');

  // Notify parent component when account type changes
  useEffect(() => {
    if (onAccountTypeChange) {
      onAccountTypeChange(accountType);
    }
  }, [accountType, onAccountTypeChange]);

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit = async (values: EmailFormValues) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      // Add account type to email for mock service to determine account type
      const emailWithType = accountType === 'seller' 
        ? `seller_${values.email}` 
        : values.email;
        
      await login(emailWithType, values.password);
      toast.success(`Successfully signed in as ${accountType}!`);
      navigate(accountType === 'seller' ? '/seller/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Attempting Google login from UI as", accountType);
      
      // Pass accountType to googleLogin
      const user = await googleLogin(accountType);
      console.log("Google login successful, user:", user);
      
      // Determine where to navigate based on user properties
      if (user.isSeller) {
        navigate('/seller/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google login error in UI:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      // Pass account type to phoneLogin
      await phoneLogin(phoneNumber, accountType);
      navigate(accountType === 'seller' ? '/seller/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Phone login error:', error);
      toast.error('Failed to sign in with phone number.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Tabs 
        value={accountType} 
        onValueChange={(value) => {
          setAccountType(value as 'buyer' | 'seller');
          // Reset captcha when switching account types
          setCaptchaValue(null);
        }} 
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="buyer" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
          >
            <ShoppingBag size={16} /> 
            <span className="text-base">
              Buyer
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="seller" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
          >
            <Store size={16} />
            <span className="text-base">
              Seller
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyer" className="mt-4">
          <BuyerLoginSection 
            onSubmit={onSubmit}
            onGoogleLogin={handleGoogleLogin}
            handlePhoneLogin={handlePhoneLogin}
            isLoading={isLoading}
            captchaValue={captchaValue}
            onCaptchaChange={onCaptchaChange}
          />
        </TabsContent>
        
        <TabsContent value="seller" className="mt-4">
          <SellerLoginSection 
            onSubmit={onSubmit}
            onGoogleLogin={handleGoogleLogin}
            handlePhoneLogin={handlePhoneLogin}
            isLoading={isLoading}
            captchaValue={captchaValue}
            onCaptchaChange={onCaptchaChange}
          />
        </TabsContent>
      </Tabs>

      {/* Return to home button */}
      <ReturnToHomeButton />
    </>
  );
};

export default LoginForm;
