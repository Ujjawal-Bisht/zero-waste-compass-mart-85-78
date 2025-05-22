
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
import OptionsTabContent from './tabs/OptionsTabContent';
import StatusTabContent from './tabs/StatusTabContent';

const TwoFactorSetup: React.FC = () => {
  const { setupTwoFactor, verifyTwoFactor, disableTwoFactor, isTwoFactorEnabled } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const [step, setStep] = useState<'intro' | 'setup' | 'verify' | 'mobileEnter' | 'mobileOtp'>('intro');
  const [verificationMethod, setVerificationMethod] = useState<'app' | 'otp'>('app');
  const [mobileOtpPhone, setMobileOtpPhone] = useState<string>("");
  const [mobileOtpValue, setMobileOtpValue] = useState<string>("");
  const [mobileOtpSentCode, setMobileOtpSentCode] = useState<string>("");

  const [activeTab, setActiveTab] = useState<'options' | 'status'>('options');
  const [activeOption, setActiveOption] = useState<'app' | 'otp'>('app');

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

  // --- Existing QR code/app method setup ---
  const handleSelectMethod = async (method: 'app' | 'otp') => {
    setVerificationMethod(method);
    setActiveOption(method);

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
    } else if (method === 'otp') {
      setStep("mobileEnter");
      setQrCodeUrl(null); // in case user goes back and forth
    }
  };

  //--- Read 2FA status for demo mobile flow from localStorage (simulated database flag)
  const [localOtpEnabled, setLocalOtpEnabled] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalOtpEnabled(window.localStorage.getItem("zwm_2fa_enabled") === "true");
    }
  }, [step, activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">Two-Factor Authentication</h1>
        <p className="text-gray-600">Enhance your account security with two-factor authentication using an authenticator app or SMS OTP.</p>
      </div>
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
              <TabsTrigger value="options" className={`flex-1 py-2 text-base ${activeTab === "options" ? "!bg-violet-500 text-white" : ""}`} onClick={() => setActiveTab("options")}>Setup Options</TabsTrigger>
              <TabsTrigger value="status" className={`flex-1 py-2 text-base ${activeTab === "status" ? "!bg-violet-500 text-white" : ""}`} onClick={() => setActiveTab("status")}>Current Status</TabsTrigger>
            </TabsList>

            <TabsContent value="options" forceMount>
              <OptionsTabContent
                activeOption={activeOption}
                step={step}
                qrCodeUrl={qrCodeUrl}
                handleSelectMethod={handleSelectMethod}
                handleVerifyMobileOtp={handleVerifyMobileOtp}
                handleSendMobileOtp={handleSendMobileOtp}
                isLoading={isLoading}
                setStep={setStep}
                mobileOtpPhone={mobileOtpPhone}
                setMobileOtpValue={setMobileOtpValue}
                verifyTwoFactor={verifyTwoFactor}
                setActiveTab={setActiveTab}
              />
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
