
import React from 'react';
import { EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';
import SharedEmailLogin from './SharedEmailLogin';

interface SellerLoginProps {
  onSubmit: (values: EmailFormValues) => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
}

const SellerLogin: React.FC<SellerLoginProps> = ({
  onSubmit,
  isLoading,
  captchaValue,
  onCaptchaChange,
}) => {
  return (
    <SharedEmailLogin 
      onSubmit={onSubmit}
      isLoading={isLoading}
      captchaValue={captchaValue}
      onCaptchaChange={onCaptchaChange}
      submitButtonText="Sign In as Seller"
      accountType="seller"
    />
  );
};

export default SellerLogin;
