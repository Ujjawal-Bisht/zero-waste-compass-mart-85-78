
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import TwoFactorForm from './TwoFactorForm';

interface TwoFactorVerificationProps {
  onVerify: (code: string) => Promise<boolean>;
  onCancel: () => void;
  email?: string;
}

const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({
  onVerify,
  onCancel,
  email
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const result = await onVerify(verificationCode);
      if (!result) {
        toast.error('Invalid verification code. Please try again.');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="w-full shadow-lg border-t-4 border-t-zwm-primary">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg font-semibold">
            <ShieldCheck className="mr-2 text-zwm-primary h-5 w-5" />
            Two-Factor Verification
          </CardTitle>
          <CardDescription>
            Enter the verification code from your authenticator app
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="mb-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700 border border-blue-100">
            A verification code has been requested for your account
            {email && <span className="font-medium"> ({email})</span>}.
          </div>
          
          <TwoFactorForm
            onSubmit={handleVerify}
            onChange={setVerificationCode}
            isLoading={isLoading}
            onCancel={onCancel}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TwoFactorVerification;
