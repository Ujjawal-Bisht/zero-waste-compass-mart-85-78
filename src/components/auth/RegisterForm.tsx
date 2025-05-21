import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6"
      >
        <Tabs 
          value={accountType} 
          onValueChange={(value) => {
            setAccountType(value as 'buyer' | 'seller');
            setCaptchaValue(null);
          }} 
          className="mb-6"
        >
          <AccountTypeTabs accountType={accountType} />
          <AnimatePresence mode="wait">
            <motion.div
              key={accountType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="buyer" className="mt-4 tab-transition">
                <Tabs value={registrationMethod} onValueChange={(v) => setRegistrationMethod(v as 'email' | 'phone' | 'google')} className="mb-4">
                  <RegistrationMethodTabs accountType="buyer" />
                  <TabContent 
                    accountType="buyer"
                    registrationMethod={registrationMethod}
                    onSubmitBuyer={onSubmitBuyer}
                    onSubmitSeller={onSubmitSeller}
                    handlePhoneRegistration={handlePhoneRegistration('buyer')}
                    handleGoogleLogin={handleGoogleLogin('buyer')}
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
                    handleGoogleLogin={handleGoogleLogin('seller')}
                    isLoading={isLoading}
                    setCaptchaValue={setCaptchaValue}
                    captchaValue={captchaValue}
                  />
                </Tabs>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <LoginLink />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-4">
        <ReturnToHomeButton />
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;
