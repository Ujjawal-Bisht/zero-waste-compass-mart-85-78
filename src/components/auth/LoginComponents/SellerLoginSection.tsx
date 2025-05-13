
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';
import LoginMethodTabs from './LoginMethodTabs';

interface SellerLoginSectionProps {
  onSubmit: (values: EmailFormValues) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  handlePhoneLogin: (phoneNumber: string) => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
}

const SellerLoginSection: React.FC<SellerLoginSectionProps> = ({
  onSubmit,
  onGoogleLogin,
  handlePhoneLogin,
  isLoading,
  captchaValue,
  onCaptchaChange
}) => {
  const [sellerLoginMethod, setSellerLoginMethod] = useState<'email' | 'phone' | 'google'>('email');

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="seller-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 mb-4 shadow-sm"
        >
          <p className="text-sm text-amber-700">
            Seller Login - Access your business dashboard to manage your sustainable products.
          </p>
        </motion.div>
      </AnimatePresence>
      
      <LoginMethodTabs
        loginMethod={sellerLoginMethod}
        setLoginMethod={setSellerLoginMethod}
        onSubmit={onSubmit}
        onGoogleLogin={onGoogleLogin}
        handlePhoneLogin={handlePhoneLogin}
        isLoading={isLoading}
        captchaValue={captchaValue}
        onCaptchaChange={onCaptchaChange}
        accountType="seller"
      />
    </>
  );
};

export default SellerLoginSection;
