
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Store, Mail, Smartphone } from 'lucide-react';
import BuyerEmailLogin from './BuyerEmailLogin';
import SellerLogin from './SellerLogin';
import MobileOtpVerification from '@/components/auth/MobileOtpVerification';

const emailFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

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

  const onSubmit = async (values: z.infer<typeof emailFormSchema>) => {
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
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }
    
    try {
      setIsLoading(true);
      await googleLogin();
      toast.success('Successfully signed in with Google!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      await phoneLogin(phoneNumber);
      navigate('/dashboard');
    } catch (error) {
      console.error('Phone login error:', error);
      toast.error('Failed to sign in with phone number.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs value={accountType} onValueChange={(value) => setAccountType(value as 'buyer' | 'seller')} className="mb-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="buyer" className="flex items-center gap-2">
          <ShoppingBag size={16} /> Buyer
        </TabsTrigger>
        <TabsTrigger value="seller" className="flex items-center gap-2">
          <Store size={16} /> Seller
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="buyer">
        <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail size={16} /> Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Smartphone size={16} /> Phone
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <BuyerEmailLogin 
              onSubmit={onSubmit}
              onGoogleLogin={handleGoogleLogin}
              isLoading={isLoading}
              captchaValue={captchaValue}
              onCaptchaChange={onCaptchaChange}
            />
          </TabsContent>
          
          <TabsContent value="phone">
            <MobileOtpVerification 
              onVerificationComplete={handlePhoneLogin}
              onCancel={() => setLoginMethod('email')}
            />
          </TabsContent>
        </Tabs>
      </TabsContent>
      
      <TabsContent value="seller">
        <SellerLogin 
          onSubmit={onSubmit}
          isLoading={isLoading}
          captchaValue={captchaValue}
          onCaptchaChange={onCaptchaChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
