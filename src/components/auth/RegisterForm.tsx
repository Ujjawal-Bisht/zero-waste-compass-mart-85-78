
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useRegistrationHandlers } from './register/useRegistrationHandlers';

// Import the components we've extracted
import ReturnToHomeButton from './LoginComponents/ReturnToHomeButton';
import AccountTypeTabs from './register/AccountTypeTabs';
import RegistrationMethodTabs from './register/RegistrationMethodTabs';
import TabContent from './register/TabContent';
import LoginLink from './register/LoginLink';

interface RegisterFormProps {
  onAccountTypeChange?: (type: 'buyer' | 'seller') => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onAccountTypeChange }) => {
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');
  const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone' | 'google'>('email');
  
  const {
    isLoading,
    captchaValue,
    setCaptchaValue,
    onSubmitBuyer,
    onSubmitSeller,
    handleGoogleLogin,
    handlePhoneRegistration
  } = useRegistrationHandlers();

  // Notify parent component when account type changes
  useEffect(() => {
    if (onAccountTypeChange) {
      onAccountTypeChange(accountType);
    }
  }, [accountType, onAccountTypeChange]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Tabs 
          value={accountType} 
          onValueChange={(value) => {
            setAccountType(value as 'buyer' | 'seller');
            // Reset captcha when switching account types
            setCaptchaValue(null);
          }} 
          className="mb-6"
        >
          <AccountTypeTabs accountType={accountType} />
          
          <TabsContent value="buyer" className="mt-4 tab-transition">
            <Tabs value={registrationMethod} onValueChange={(v) => setRegistrationMethod(v as 'email' | 'phone' | 'google')} className="mb-4">
              <RegistrationMethodTabs accountType="buyer" />
              
              <TabContent 
                accountType="buyer"
                registrationMethod={registrationMethod}
                onSubmitBuyer={onSubmitBuyer}
                onSubmitSeller={onSubmitSeller}
                handlePhoneRegistration={handlePhoneRegistration('buyer')}
                handleGoogleLogin={() => handleGoogleLogin('buyer')}
                isLoading={isLoading}
                setCaptchaValue={setCaptchaValue}
                captchaValue={captchaValue}
              />
            </Tabs>
          </TabsContent>
          
          <TabsContent value="seller" className="mt-4 tab-transition">
            <Tabs value={registrationMethod} onValueChange={(v) => setRegistrationMethod(v as 'email' | 'phone' | 'google')} className="mb-4">
              <RegistrationMethodTabs accountType="seller" />
              
              <TabContent 
                accountType="seller"
                registrationMethod={registrationMethod}
                onSubmitBuyer={onSubmitBuyer}
                onSubmitSeller={onSubmitSeller}
                handlePhoneRegistration={handlePhoneRegistration('seller')}
                handleGoogleLogin={() => handleGoogleLogin('seller')}
                isLoading={isLoading}
                setCaptchaValue={setCaptchaValue}
                captchaValue={captchaValue}
              />
            </Tabs>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <LoginLink />
      
      {/* Return to home button */}
      <ReturnToHomeButton />
    </>
  );
};

export default RegisterForm;
