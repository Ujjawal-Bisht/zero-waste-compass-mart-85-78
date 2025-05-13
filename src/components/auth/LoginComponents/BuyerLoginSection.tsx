
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';
import LoginMethodTabs from './LoginMethodTabs';

interface BuyerLoginSectionProps {
  onSubmit: (values: EmailFormValues) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  handlePhoneLogin: (phoneNumber: string) => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
}

const BuyerLoginSection: React.FC<BuyerLoginSectionProps> = ({
  onSubmit,
  onGoogleLogin,
  handlePhoneLogin,
  isLoading,
  captchaValue,
  onCaptchaChange
}) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'google'>('email');

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="buyer-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 mb-4 shadow-sm"
        >
          <p className="text-sm text-blue-700">
            Buyer Login - Sign in to your buyer account to explore sustainable products.
          </p>
        </motion.div>
      </AnimatePresence>
      
      <LoginMethodTabs
        loginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
        onSubmit={onSubmit}
        onGoogleLogin={onGoogleLogin}
        handlePhoneLogin={handlePhoneLogin}
        isLoading={isLoading}
        captchaValue={captchaValue}
        onCaptchaChange={onCaptchaChange}
        accountType="buyer"
      />
    </>
  );
};

export default BuyerLoginSection;
