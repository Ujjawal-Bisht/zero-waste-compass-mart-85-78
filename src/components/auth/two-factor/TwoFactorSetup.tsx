
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent
} from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import IntroStep from './steps/IntroStep';
import SetupStep from './steps/SetupStep';
import TwoFactorForm from './TwoFactorForm';

const TwoFactorSetup: React.FC = () => {
  const { setupTwoFactor, verifyTwoFactor, disableTwoFactor, isTwoFactorEnabled } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [step, setStep] = useState<'intro' | 'setup' | 'verify'>('intro');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSetup = async () => {
    try {
      setIsLoading(true);
      const { qrCode } = await setupTwoFactor();
      setQrCodeUrl(qrCode);
      setStep('setup');
    } catch (error) {
      toast.error('Failed to set up two-factor authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const result = await verifyTwoFactor(verificationCode);
      if (result) {
        setStep('intro');
      }
    } catch (error) {
      toast.error('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable = async () => {
    try {
      setIsLoading(true);
      await disableTwoFactor();
      setQrCodeUrl(null);
    } catch (error) {
      toast.error('Failed to disable two-factor authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="w-full shadow-lg border-t-4 border-t-zwm-primary">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg font-semibold">
            <ShieldCheck className="mr-2 text-zwm-primary h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Enhance your account security with two-factor authentication
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          {step === 'intro' && (
            <IntroStep 
              isTwoFactorEnabled={isTwoFactorEnabled} 
              isLoading={isLoading}
              onSetup={handleSetup}
              onDisable={handleDisable}
            />
          )}

          {step === 'setup' && qrCodeUrl && (
            <SetupStep 
              qrCodeUrl={qrCodeUrl}
              onNext={() => setStep('verify')}
            />
          )}

          {step === 'verify' && (
            <TwoFactorForm 
              onSubmit={handleVerify} 
              onChange={setVerificationCode}
              isLoading={isLoading}
              onCancel={() => setStep('intro')}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TwoFactorSetup;
