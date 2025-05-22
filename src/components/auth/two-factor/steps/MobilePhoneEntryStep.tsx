
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MobilePhoneEntryStepProps {
  mobileOtpPhone: string;
  setMobileOtpPhone: (value: string) => void;
  handleSendMobileOtp: (phoneNumber: string) => Promise<void>;
  handleBack: () => void;
  isLoading: boolean;
}

const MobilePhoneEntryStep: React.FC<MobilePhoneEntryStepProps> = ({
  mobileOtpPhone,
  setMobileOtpPhone,
  handleSendMobileOtp,
  handleBack,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 mb-4">
        Enter your mobile number to receive verification codes via SMS:
      </div>
      <Input 
        type="tel" 
        placeholder="+91 9876543210"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={mobileOtpPhone}
        onChange={(e) => setMobileOtpPhone(e.target.value)}
      />
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="px-4 py-2"
        >
          Back
        </Button>
        <Button
          onClick={() => handleSendMobileOtp(mobileOtpPhone)}
          disabled={!mobileOtpPhone || mobileOtpPhone.length < 10 || isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Sending..." : "Send Code"}
        </Button>
      </div>
    </div>
  );
};

export default MobilePhoneEntryStep;
