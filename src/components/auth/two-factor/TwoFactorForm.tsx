
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface TwoFactorFormProps {
  onSubmit: () => Promise<void>;
  onChange: (code: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  onSubmit,
  onChange,
  onCancel,
  isLoading
}) => {
  const [value, setValue] = useState(['', '', '', '', '', '']);

  // Handle input change for individual digit inputs
  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return; // Prevent multiple characters
    
    if (!/^\d*$/.test(digit) && digit !== '') return; // Only allow digits or empty string
    
    const newValue = [...value];
    newValue[index] = digit;
    setValue(newValue);
    
    const combinedValue = newValue.join('');
    onChange(combinedValue);
    
    // Auto-focus to the next input if a digit was entered
    if (digit !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
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
    const digits = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
    
    if (digits.length === 0) return;
    
    const newValue = [...value];
    
    // Fill in digits from the pasted content
    digits.split('').forEach((digit, index) => {
      if (index < 6) {
        newValue[index] = digit;
      }
    });
    
    setValue(newValue);
    onChange(newValue.join(''));
  };

  // Handle backspace key to move to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && value[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.join('').length === 6) {
      onSubmit();
    }
  };

  // Focus the first input when the component mounts
  useEffect(() => {
    const firstInput = document.getElementById('otp-input-0');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Enter the 6-digit code from your authenticator app
        </label>
        
        <div className="flex justify-center gap-2 py-4">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={value[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="h-12 w-12 text-center text-lg font-semibold border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between space-x-3">
        <Button 
          type="button" 
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading || value.join('').length !== 6}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default TwoFactorForm;
