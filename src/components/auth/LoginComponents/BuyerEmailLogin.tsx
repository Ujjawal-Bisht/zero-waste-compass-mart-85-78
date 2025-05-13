
import React from 'react';
import { EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';
import SharedEmailLogin from './SharedEmailLogin';

interface BuyerEmailLoginProps {
  onSubmit: (values: EmailFormValues) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
}

const BuyerEmailLogin: React.FC<BuyerEmailLoginProps> = ({
  onSubmit,
  onGoogleLogin,
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
      submitButtonText="Sign In as Buyer"
      accountType="buyer"
      onGoogleLogin={onGoogleLogin}
    />
  );
};

export default BuyerEmailLogin;
