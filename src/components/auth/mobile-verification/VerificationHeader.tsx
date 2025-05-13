
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

interface VerificationHeaderProps {
  step: 'phone' | 'otp';
  phoneNumber?: string;
}

const VerificationHeader: React.FC<VerificationHeaderProps> = ({ step, phoneNumber }) => {
  return (
    <CardHeader className="text-center">
      <div className="mx-auto mb-4 bg-zwm-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
        <Smartphone className="h-8 w-8 text-zwm-primary" />
      </div>
      <CardTitle>{step === 'phone' ? 'Phone Verification' : 'Enter OTP'}</CardTitle>
      <CardDescription>
        {step === 'phone' 
          ? 'Enter your phone number to receive a verification code' 
          : `Enter the 6-digit code sent to ${phoneNumber}`}
      </CardDescription>
    </CardHeader>
  );
};

export default VerificationHeader;
