
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
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
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Focus the first input slot when the component mounts
  useEffect(() => {
    // Small delay to ensure component is fully rendered
    setTimeout(() => {
      const firstInput = document.querySelector('.input-otp-slot') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
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
        
        <div className="flex justify-center py-4">
          <InputOTP 
            maxLength={6} 
            value={value}
            onChange={handleChange}
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
          className="flex-1 zwm-gradient-hover"
          disabled={isLoading || value.length !== 6}
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
