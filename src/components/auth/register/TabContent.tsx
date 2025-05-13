
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import BuyerForm from './BuyerForm';
import SellerForm from './SellerForm';
import PhoneRegisterTab from './PhoneRegisterTab';
import GoogleLoginSection from '../LoginComponents/GoogleLoginSection';

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
  return (
    <>
      {accountType === 'buyer' && (
        <>
          <TabsContent value="email" className="animate-fade-in">
            <BuyerForm
              onSubmit={onSubmitBuyer}
              isLoading={isLoading}
              setCaptchaValue={setCaptchaValue}
              captchaValue={captchaValue}
            />
          </TabsContent>
          
          <TabsContent value="phone" className="animate-fade-in">
            <PhoneRegisterTab
              onVerificationComplete={handlePhoneRegistration}
              onCancel={() => {}}
              setCaptchaValue={setCaptchaValue}
              captchaValue={captchaValue}
            />
          </TabsContent>

          <TabsContent value="google" className="animate-fade-in">
            <GoogleLoginSection 
              handleGoogleLogin={handleGoogleLogin}
              isLoading={isLoading}
              accountType="buyer"
              setCaptchaValue={setCaptchaValue}
              captchaValue={captchaValue}
              showCaptcha={true}
            />
          </TabsContent>
        </>
      )}

      {accountType === 'seller' && (
        <>
          <TabsContent value="email" className="animate-fade-in">
            <SellerForm
              onSubmit={onSubmitSeller}
              isLoading={isLoading}
              setCaptchaValue={setCaptchaValue}
              captchaValue={captchaValue}
            />
          </TabsContent>
          
          <TabsContent value="phone" className="animate-fade-in">
            <PhoneRegisterTab
              onVerificationComplete={handlePhoneRegistration}
              onCancel={() => {}}
              setCaptchaValue={setCaptchaValue}
              captchaValue={captchaValue}
            />
          </TabsContent>

          <TabsContent value="google" className="animate-fade-in">
            <GoogleLoginSection 
              handleGoogleLogin={handleGoogleLogin}
              isLoading={isLoading}
              accountType="seller"
              setCaptchaValue={setCaptchaValue}
              captchaValue={captchaValue}
              showCaptcha={true}
            />
          </TabsContent>
        </>
      )}
    </>
  );
};

export default TabContent;
