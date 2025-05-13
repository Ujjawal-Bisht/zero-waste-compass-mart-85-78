
import React from 'react';
import MobileOtpVerification from '@/components/auth/MobileOtpVerification';
import ReCAPTCHA from 'react-google-recaptcha';

interface PhoneRegisterTabProps {
  onVerificationComplete: (phoneNumber: string) => void;
  onCancel: () => void;
  setCaptchaValue: (value: string | null) => void;
  captchaValue: string | null;
}

const PhoneRegisterTab: React.FC<PhoneRegisterTabProps> = ({ 
  onVerificationComplete, 
  onCancel,
  setCaptchaValue,
  captchaValue
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

      {/* Captcha verification */}
      <div className="mt-6">
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Google's test key
            onChange={(value) => setCaptchaValue(value)}
          />
        </div>
        
        {!captchaValue && (
          <div className="text-center text-sm text-orange-600 mt-2">
            Please verify that you're not a robot
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneRegisterTab;
