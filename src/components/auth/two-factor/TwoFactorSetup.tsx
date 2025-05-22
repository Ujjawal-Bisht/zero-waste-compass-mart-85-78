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
import { ShieldCheck, Smartphone, QrCode, AppWindow } from 'lucide-react';
import IntroStep from './steps/IntroStep';
import SetupStep from './steps/SetupStep';
import TwoFactorForm from './TwoFactorForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import QRCode from './QRCode';
import TwoFactorMobileOtpSetup from './TwoFactorMobileOtpSetup';

const TwoFactorSetup: React.FC = () => {
  const { setupTwoFactor, verifyTwoFactor, disableTwoFactor, isTwoFactorEnabled } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [step, setStep] = useState<'intro' | 'setup' | 'verify'>('intro');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'app' | 'qr' | 'otp'>('app');
  const [setupSecret, setSetupSecret] = useState<string | null>(null);
  const [mobileOtpStep, setMobileOtpStep] = useState<'setup' | 'otp'>('setup');
  const [otpNumber, setOtpNumber] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpInputValue, setOtpInputValue] = useState('');
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);

  const handleSetup = async () => {
    try {
      setIsLoading(true);
      const result = await setupTwoFactor();
      setQrCodeUrl(result.qrCode);
      setSetupSecret(result.secret);
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
        toast.success('Two-factor authentication successfully enabled!');
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
      setSetupSecret(null);
      toast.success('Two-factor authentication disabled');
    } catch (error) {
      toast.error('Failed to disable two-factor authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async (fullNumber: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - a real system should call backend!
      await new Promise(res => setTimeout(res, 1000));
      toast.success(`OTP sent to ${fullNumber}`);
      setOtpNumber(fullNumber);
      setOtpSent(true);
      setMobileOtpStep('otp');
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setOtpVerificationLoading(true);
    try {
      // In reality, should call backend API/service to verify
      if (otpInputValue.length === 6 /* and regex for digits */) {
        toast.success("Phone number verified and 2FA enabled!");
        setOtpSent(false);
        setOtpInputValue('');
        setStep('intro');
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } finally {
      setOtpVerificationLoading(false);
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
            <>
              <Tabs defaultValue="app" className="mb-6">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="app" onClick={() => setVerificationMethod('app')}>
                    <AppWindow className="h-4 w-4 mr-2" />
                    Authenticator App
                  </TabsTrigger>
                  <TabsTrigger value="qr" onClick={() => setVerificationMethod('qr')}>
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </TabsTrigger>
                  <TabsTrigger value="otp" onClick={() => setVerificationMethod('otp')}>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile OTP
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="app" className="space-y-4">
                  <div className="bg-blue-50 rounded-md p-4 text-sm text-blue-700">
                    <ol className="list-decimal ml-4 space-y-2">
                      <li>Install an authenticator app like Google Authenticator or Microsoft Authenticator</li>
                      <li>Scan the QR code with your authenticator app</li>
                      <li>Enter the 6-digit code generated by the app to verify</li>
                    </ol>
                  </div>

                  <div className="flex justify-center mt-4">
                    <QRCode url={qrCodeUrl} />
                  </div>
                </TabsContent>
                
                <TabsContent value="qr" className="space-y-4">
                  <div className="bg-blue-50 rounded-md p-4 text-sm text-blue-700">
                    <p>Scan this QR code with your authenticator app to set up two-factor authentication.</p>
                  </div>

                  <div className="flex justify-center mt-4">
                    <QRCode url={qrCodeUrl} />
                  </div>
                </TabsContent>

                <TabsContent value="otp" className="space-y-4">
                  {mobileOtpStep === 'setup' && (
                    <TwoFactorMobileOtpSetup
                      onRequestOtp={handleRequestOtp}
                      isLoading={isLoading}
                    />
                  )}
                  {mobileOtpStep === 'otp' && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-md p-3 text-blue-700">
                        Enter the 6-digit code sent to <span className="font-medium">{otpNumber}</span>
                      </div>
                      <div className="flex justify-center py-2">
                        <Input
                          type="text"
                          maxLength={6}
                          pattern="\d*"
                          className="text-center text-lg tracking-widest px-4 py-2 border rounded-md"
                          value={otpInputValue}
                          onChange={e => setOtpInputValue(e.target.value.replace(/\D/g, ''))}
                          placeholder="------"
                        />
                      </div>
                      <Button
                        className="w-full zwm-gradient-hover"
                        disabled={otpVerificationLoading || otpInputValue.length !== 6}
                        onClick={handleOtpVerify}
                      >
                        {otpVerificationLoading ? "Verifying..." : "Verify"}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <Button 
                  onClick={() => setStep('verify')} 
                  className="w-full zwm-gradient-hover"
                >
                  Continue to Verification
                </Button>
              </div>
            </>
          )}

          {step === 'verify' && (
            <>
              <div className="mb-4 bg-blue-50 rounded-md p-4 text-sm text-blue-700 flex items-start gap-3">
                <Smartphone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Enter verification code</p>
                  <p>Open your authenticator app and enter the 6-digit code displayed.</p>
                </div>
              </div>
              
              <TwoFactorForm 
                onSubmit={handleVerify} 
                onChange={setVerificationCode}
                isLoading={isLoading}
                onCancel={() => setStep('intro')}
              />
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TwoFactorSetup;
