import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Smartphone } from 'lucide-react';
import BuyerEmailLogin from './BuyerEmailLogin';
import SellerLogin from './SellerLogin';
import MobileOtpVerification from '@/components/auth/MobileOtpVerification';
import GoogleLoginSection from './GoogleLoginSection';
import { EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';

interface LoginMethodTabsProps {
  loginMethod: 'email' | 'phone' | 'google';
  setLoginMethod: React.Dispatch<React.SetStateAction<'email' | 'phone' | 'google'>>;
  onSubmit: (values: EmailFormValues) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  handlePhoneLogin: (phoneNumber: string) => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
  accountType: 'buyer' | 'seller';
}

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

const LoginMethodTabs: React.FC<LoginMethodTabsProps> = ({
  loginMethod,
  setLoginMethod,
  onSubmit,
  onGoogleLogin,
  handlePhoneLogin,
  isLoading,
  captchaValue,
  onCaptchaChange,
  accountType
}) => {
  return (
    <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone' | 'google')} className="mb-6">
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
      
      <AnimatePresence mode="wait">
        {loginMethod === 'email' && (
          <motion.div
            key={`${accountType}-email-tab`}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-4"
          >
            {accountType === 'buyer' ? (
              <BuyerEmailLogin 
                onSubmit={onSubmit}
                onGoogleLogin={onGoogleLogin}
                isLoading={isLoading}
                captchaValue={captchaValue}
                onCaptchaChange={onCaptchaChange}
              />
            ) : (
              <SellerLogin 
                onSubmit={onSubmit}
                isLoading={isLoading}
                captchaValue={captchaValue}
                onCaptchaChange={onCaptchaChange}
              />
            )}
          </motion.div>
        )}
        
        {loginMethod === 'phone' && (
          <motion.div
            key={`${accountType}-phone-tab`}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-4"
          >
            <MobileOtpVerification 
              onVerificationComplete={handlePhoneLogin}
              onCancel={() => setLoginMethod('email')}
            />
          </motion.div>
        )}
        
        {loginMethod === 'google' && (
          <motion.div
            key={`${accountType}-google-tab`}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-4"
          >
            <GoogleLoginSection 
              handleGoogleLogin={onGoogleLogin} 
              isLoading={isLoading} 
              accountType={accountType}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
};

export default LoginMethodTabs;
