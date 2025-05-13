
import React from 'react';
import MobileOtpVerification from '@/components/auth/MobileOtpVerification';

interface PhoneRegisterTabProps {
  onVerificationComplete: (phoneNumber: string) => void;
  onCancel: () => void;
}

const PhoneRegisterTab: React.FC<PhoneRegisterTabProps> = ({ 
  onVerificationComplete, 
  onCancel 
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
        <p className="text-sm text-yellow-800">
          By registering with your phone number, you'll be able to securely sign in 
          without a password in the future.
        </p>
      </div>
      
      <MobileOtpVerification
        onVerificationComplete={onVerificationComplete}
        onCancel={onCancel}
      />
    </div>
  );
};

export default PhoneRegisterTab;
