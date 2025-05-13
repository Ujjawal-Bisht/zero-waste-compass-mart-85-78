
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import BuyerForm from './BuyerForm';
import SellerForm from './SellerForm';
import PhoneRegisterTab from './PhoneRegisterTab';
import GoogleLoginSection from '../LoginComponents/GoogleLoginSection';
import { motion, AnimatePresence } from 'framer-motion';

interface TabContentProps {
  accountType: 'buyer' | 'seller';
  registrationMethod: 'email' | 'phone' | 'google';
  onSubmitBuyer: (values: any) => Promise<void>;
  onSubmitSeller: (values: any) => Promise<void>;
  handlePhoneRegistration: (phoneNumber: string) => void;
  handleGoogleLogin: () => Promise<void>;
  isLoading: boolean;
  setCaptchaValue: (value: string | null) => void;
  captchaValue: string | null;
}

const TabContent: React.FC<TabContentProps> = ({
  accountType,
  registrationMethod,
  onSubmitBuyer,
  onSubmitSeller,
  handlePhoneRegistration,
  handleGoogleLogin,
  isLoading,
  setCaptchaValue,
  captchaValue,
}) => {
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {accountType === 'buyer' && (
        <>
          {registrationMethod === 'email' && (
            <TabsContent value="email" className="animate-fade-in form-section-enter">
              <motion.div
                key="buyer-email"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card-float"
              >
                <BuyerForm
                  onSubmit={onSubmitBuyer}
                  isLoading={isLoading}
                  setCaptchaValue={setCaptchaValue}
                  captchaValue={captchaValue}
                />
              </motion.div>
            </TabsContent>
          )}
          
          {registrationMethod === 'phone' && (
            <TabsContent value="phone" className="animate-fade-in form-section-enter">
              <motion.div
                key="buyer-phone"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card-float"
              >
                <PhoneRegisterTab
                  onVerificationComplete={handlePhoneRegistration}
                  onCancel={() => {}}
                  setCaptchaValue={setCaptchaValue}
                  captchaValue={captchaValue}
                />
              </motion.div>
            </TabsContent>
          )}

          {registrationMethod === 'google' && (
            <TabsContent value="google" className="animate-fade-in form-section-enter">
              <motion.div
                key="buyer-google"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card-float"
              >
                <GoogleLoginSection 
                  handleGoogleLogin={handleGoogleLogin}
                  isLoading={isLoading}
                  accountType="buyer"
                  setCaptchaValue={setCaptchaValue}
                  captchaValue={captchaValue}
                  showCaptcha={true}
                />
              </motion.div>
            </TabsContent>
          )}
        </>
      )}

      {accountType === 'seller' && (
        <>
          {registrationMethod === 'email' && (
            <TabsContent value="email" className="animate-fade-in form-section-enter">
              <motion.div
                key="seller-email"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card-float"
              >
                <SellerForm
                  onSubmit={onSubmitSeller}
                  isLoading={isLoading}
                  setCaptchaValue={setCaptchaValue}
                  captchaValue={captchaValue}
                />
              </motion.div>
            </TabsContent>
          )}
          
          {registrationMethod === 'phone' && (
            <TabsContent value="phone" className="animate-fade-in form-section-enter">
              <motion.div
                key="seller-phone"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card-float"
              >
                <PhoneRegisterTab
                  onVerificationComplete={handlePhoneRegistration}
                  onCancel={() => {}}
                  setCaptchaValue={setCaptchaValue}
                  captchaValue={captchaValue}
                />
              </motion.div>
            </TabsContent>
          )}

          {registrationMethod === 'google' && (
            <TabsContent value="google" className="animate-fade-in form-section-enter">
              <motion.div
                key="seller-google"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card-float"
              >
                <GoogleLoginSection 
                  handleGoogleLogin={handleGoogleLogin}
                  isLoading={isLoading}
                  accountType="seller"
                  setCaptchaValue={setCaptchaValue}
                  captchaValue={captchaValue}
                  showCaptcha={true}
                />
              </motion.div>
            </TabsContent>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default TabContent;
