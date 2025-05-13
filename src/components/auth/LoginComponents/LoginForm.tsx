
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
  const [sellerLoginMethod, setSellerLoginMethod] = useState<'email' | 'phone' | 'google'>('email');

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
      <div className="flex items-center justify-center mb-6">
        <Link 
          to="/" 
          className="text-sm text-zwm-primary hover:underline flex items-center gap-1"
        >
          ← Return to home page
        </Link>
      </div>
      
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
          
          <Tabs value={sellerLoginMethod} onValueChange={(value) => setSellerLoginMethod(value as 'email' | 'phone' | 'google')} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail size={16} /> Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Smartphone size={16} /> Phone
              </TabsTrigger>
              <TabsTrigger value="google" className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-4">
              <SellerLogin 
                onSubmit={onSubmit}
                isLoading={isLoading}
                captchaValue={captchaValue}
                onCaptchaChange={onCaptchaChange}
              />
            </TabsContent>
            
            <TabsContent value="phone" className="mt-4">
              <MobileOtpVerification 
                onVerificationComplete={handlePhoneLogin}
                onCancel={() => setSellerLoginMethod('email')}
              />
            </TabsContent>
            
            <TabsContent value="google" className="mt-4">
              <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-medium mb-2">Sign in with Google</h3>
                  <p className="text-sm text-gray-600">
                    Use your Google Business account to sign in as a seller.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-lg py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  {isLoading ? 'Signing in...' : 'Continue with Google'}
                </motion.button>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default LoginForm;
