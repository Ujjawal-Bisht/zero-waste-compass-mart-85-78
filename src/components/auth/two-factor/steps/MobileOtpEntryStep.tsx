
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  // Update parent component value when digits change
  useEffect(() => {
    setMobileOtpValue(digits.join(''));
  }, [digits, setMobileOtpValue]);

  // Handle input change for individual digit inputs
  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return; // Prevent multiple characters
    
    if (!/^\d*$/.test(digit) && digit !== '') return; // Only allow digits or empty string
    
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    
    // Auto-focus to the next input if a digit was entered
    if (digit !== '' && index < 5) {
      const nextInput = document.getElementById(`mobile-otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle paste event across inputs
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Filter only digits and limit to 6
    const pastedDigits = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
    
    if (pastedDigits.length === 0) return;
    
    const newDigits = [...digits];
    
    // Fill in digits from the pasted content
    pastedDigits.split('').forEach((digit, index) => {
      if (index < 6) {
        newDigits[index] = digit;
      }
    });
    
    setDigits(newDigits);
  };

  // Handle backspace key to move to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && digits[index] === '' && index > 0) {
      const prevInput = document.getElementById(`mobile-otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Focus the first input when the component mounts
  useEffect(() => {
    const firstInput = document.getElementById('mobile-otp-input-0');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 mb-2">
        Enter the 6-digit code sent to your phone:
      </p>
      <div className="flex justify-center gap-2 py-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Input
            key={index}
            id={`mobile-otp-input-${index}`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digits[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="h-12 w-12 text-center text-lg font-semibold border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            aria-label={`Digit ${index + 1}`}
          />
        ))}
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
          disabled={digits.join('').length !== 6 || isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
};

export default MobileOtpEntryStep;
