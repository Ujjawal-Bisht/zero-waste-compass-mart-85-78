
import React from 'react';
import { Button } from '@/components/ui/button';
import TwoFactorForm from '../TwoFactorForm';

interface MobileOtpEntryStepProps {
  mobileOtpValue: string;
  setMobileOtpValue: (value: string) => void;
  handleVerifyMobileOtp: () => Promise<void>;
  handleBack: () => void;
  isLoading: boolean;
}

const MobileOtpEntryStep: React.FC<MobileOtpEntryStepProps> = ({
  mobileOtpValue,
  setMobileOtpValue,
  handleVerifyMobileOtp,
  handleBack,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-base font-medium">Enter Verification Code</h3>
        <p className="text-sm text-gray-600 mt-1">
          We've sent a 6-digit verification code to your phone. Enter it below to enable 2FA.
        </p>
      </div>

      <TwoFactorForm
        onSubmit={handleVerifyMobileOtp}
        onChange={setMobileOtpValue}
        isLoading={isLoading}
        onCancel={handleBack}
      />
      
      <div className="text-center text-sm text-gray-500 pt-2">
        <p>Didn't receive the code?</p>
        <Button
          variant="link"
          className="p-0 h-auto text-blue-600"
          onClick={handleBack}
          disabled={isLoading}
        >
          Go back and try again
        </Button>
      </div>
    </div>
  );
};

export default MobileOtpEntryStep;
