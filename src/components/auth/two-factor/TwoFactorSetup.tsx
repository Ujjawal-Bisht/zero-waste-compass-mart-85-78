
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StatusTabContent from './tabs/StatusTabContent';
import QRCode from './QRCode';
import TwoFactorForm from './TwoFactorForm';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import CardBox from './components/CardBox';
import OptionsTabContent from './tabs/OptionsTabContent';

const TwoFactorSetup: React.FC = () => {
  const { setupTwoFactor, verifyTwoFactor, disableTwoFactor, isTwoFactorEnabled } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');

  const [step, setStep] = useState<'intro' | 'setup' | 'verify' | 'mobileEnter' | 'mobileOtp'>('intro');
  const [verificationMethod, setVerificationMethod] = useState<'app' | 'sms'>('app');
  const [mobileOtpPhone, setMobileOtpPhone] = useState<string>("");
  const [mobileOtpValue, setMobileOtpValue] = useState<string>("");
  const [mobileOtpSentCode, setMobileOtpSentCode] = useState<string>("");

  const [activeTab, setActiveTab] = useState<'options' | 'status'>('options');

  // --- For simulating OTP send & check (for demo) ---
  const handleSendMobileOtp = async (fullNumber: string) => {
    setIsLoading(true);
    try {
      // Simulate sending SMS code
      const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setMobileOtpSentCode(simulatedOtp);
      setMobileOtpPhone(fullNumber);
      setStep("mobileOtp");
      toast.info(`Demo: Your 2FA OTP is ${simulatedOtp}`, {
        description: `This code would be SMSed to ${fullNumber} in production.`,
        duration: 10000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Simulate verifying OTP ---
  const handleVerifyMobileOtp = async () => {
    setIsLoading(true);
    try {
      if (mobileOtpValue === mobileOtpSentCode && mobileOtpValue.length === 6) {
        // Mark 2FA as enabled for demo
        toast.success("2FA enabled by mobile OTP successfully!");
        setStep("intro");
        setActiveTab("status");
        // In production: set the flag in user DB
        if (typeof window !== "undefined") {
          window.localStorage.setItem("zwm_2fa_enabled", "true");
        }
      } else {
        toast.error("Incorrect or missing code!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle verification code submission ---
  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit verification code");
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await verifyTwoFactor(verificationCode);
      if (result) { // Changed from result.success to just result
        toast.success("Two-factor authentication enabled successfully!");
        setStep("intro");
        setActiveTab("status");
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Select verification method and set up QR code ---
  const handleSelectMethod = async (method: 'app' | 'sms') => {
    setVerificationMethod(method);

    if (method === 'app') {
      setStep("setup");
      setIsLoading(true);
      try {
        const result = await setupTwoFactor();
        setQrCodeUrl(result.qrCode);
      } catch (error) {
        toast.error('Failed to set up two-factor authentication');
      } finally {
        setIsLoading(false);
      }
    } else if (method === 'sms') {
      setStep("mobileEnter");
      setQrCodeUrl(null); // in case user goes back and forth
    }
  };

  // --- Read 2FA status for demo mobile flow from localStorage (simulated database flag) ---
  const [localOtpEnabled, setLocalOtpEnabled] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalOtpEnabled(window.localStorage.getItem("zwm_2fa_enabled") === "true");
    }
  }, [step, activeTab]);

  // --- Determine what to render based on the current step ---
  const renderStepContent = () => {
    switch (step) {
      case "setup":
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              Scan this QR code with your authenticator app (like Google Authenticator or Authy)
            </p>
            <div className="flex justify-center py-4">
              {qrCodeUrl && <QRCode url={qrCodeUrl} />}
            </div>
            <TwoFactorForm
              onSubmit={handleVerify}
              onChange={setVerificationCode}
              isLoading={isLoading}
              onCancel={() => setStep("intro")}
            />
          </div>
        );
      case "mobileEnter":
        return (
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Enter your mobile number to receive verification codes via SMS:
            </div>
            <input 
              type="tel" 
              placeholder="+91 9876543210"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={mobileOtpPhone}
              onChange={(e) => setMobileOtpPhone(e.target.value)}
            />
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep("intro")}
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
      case "mobileOtp":
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
                onClick={() => setStep("mobileEnter")}
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
      default:
        return (
          <OptionsTabContent
            method={verificationMethod}
            onMethodSelect={setVerificationMethod}
            onProceed={() => handleSelectMethod(verificationMethod)}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto"
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

        <CardContent>
          <Tabs value={activeTab} className="mb-2 animate-fade-in">
            <TabsList className="w-full flex mb-4 rounded-full bg-gray-100 overflow-hidden shadow-sm">
              <TabsTrigger 
                value="options" 
                className={`flex-1 py-2 text-base ${activeTab === "options" ? "!bg-violet-500 text-white" : ""}`}
                onClick={() => setActiveTab("options")}
              >
                Setup Options
              </TabsTrigger>
              <TabsTrigger 
                value="status" 
                className={`flex-1 py-2 text-base ${activeTab === "status" ? "!bg-violet-500 text-white" : ""}`}
                onClick={() => setActiveTab("status")}
              >
                Current Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="options" forceMount>
              {renderStepContent()}
            </TabsContent>
            
            <TabsContent value="status" forceMount>
              <StatusTabContent
                isTwoFactorEnabled={isTwoFactorEnabled}
                localOtpEnabled={localOtpEnabled}
                disableTwoFactor={disableTwoFactor}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TwoFactorSetup;
