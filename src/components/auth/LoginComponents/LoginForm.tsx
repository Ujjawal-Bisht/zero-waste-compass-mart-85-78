
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Store, Mail, Smartphone } from 'lucide-react';
import BuyerEmailLogin from './BuyerEmailLogin';
import SellerLogin from './SellerLogin';
import MobileOtpVerification from '@/components/auth/MobileOtpVerification';
import { EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';

const LoginForm: React.FC = () => {
  const { login, googleLogin, phoneLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');

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
      
      // We pass accountType to googleLogin to simulate account selection
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
      
      <TabsContent value="buyer" className="animate-fade-in mt-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 mb-4 shadow-sm">
          <p className="text-sm text-blue-700">
            Welcome back! Sign in to your buyer account to explore sustainable products.
          </p>
        </div>
        <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail size={16} /> Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Smartphone size={16} /> Phone
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="mt-4">
            <BuyerEmailLogin 
              onSubmit={onSubmit}
              onGoogleLogin={handleGoogleLogin}
              isLoading={isLoading}
              captchaValue={captchaValue}
              onCaptchaChange={onCaptchaChange}
            />
          </TabsContent>
          
          <TabsContent value="phone" className="mt-4">
            <MobileOtpVerification 
              onVerificationComplete={handlePhoneLogin}
              onCancel={() => setLoginMethod('email')}
            />
          </TabsContent>
        </Tabs>
      </TabsContent>
      
      <TabsContent value="seller" className="animate-fade-in mt-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 mb-4 shadow-sm">
          <p className="text-sm text-amber-700">
            Welcome back, seller! Sign in to manage your sustainable business.
          </p>
        </div>
        <SellerLogin 
          onSubmit={onSubmit}
          isLoading={isLoading}
          captchaValue={captchaValue}
          onCaptchaChange={onCaptchaChange}
          onGoogleLogin={handleGoogleLogin}
        />
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
