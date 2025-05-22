
import React from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

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
      <p className="text-sm text-gray-600 mb-2">
        Enter the 6-digit code sent to your phone:
      </p>
      <div className="flex justify-center py-4">
        <InputOTP 
          maxLength={6}
          value={mobileOtpValue} 
          onChange={setMobileOtpValue}
          autoFocus={true} 
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot 
                  key={index} 
                  {...slot}
                  index={index}
                  className="transition-all border-gray-300 focus:border-zwm-primary input-otp-slot"
                />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="px-4 py-2"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleVerifyMobileOtp}
          disabled={mobileOtpValue.length !== 6 || isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
};

export default MobileOtpEntryStep;
