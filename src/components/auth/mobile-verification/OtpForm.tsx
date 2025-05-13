
import React from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be exactly 6 characters' })
});

export type OtpFormValues = z.infer<typeof otpSchema>;

interface OtpFormProps {
  onSubmit: (values: OtpFormValues) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
  phoneNumber: string;
  onResend: () => void;
  resendDisabled: boolean;
  countdownTime: number;
}

const OtpForm: React.FC<OtpFormProps> = ({
  onSubmit,
  onBack,
  isSubmitting,
  phoneNumber,
  onResend,
  resendDisabled,
  countdownTime
}) => {
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  return (
    <Form {...otpForm}>
      <form onSubmit={otpForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <div className="flex justify-center py-4">
                  <InputOTP 
                    maxLength={6} 
                    value={field.value}
                    onChange={field.onChange}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot 
                            key={index} 
                            {...slot}
                            index={index}
                          />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="zwm-gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Didn't receive a code?
          <button 
            type="button"
            className={`text-zwm-primary ml-1 ${resendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
            onClick={onResend}
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend in ${countdownTime}s` : 'Resend'}
          </button>
        </div>

        <div className="text-xs text-center text-amber-600">
          Note: This is a demo. In a real app, you would receive an SMS with the code. 
          Look in the toast notifications for the demo code.
        </div>
      </form>
    </Form>
  );
};

export default OtpForm;
