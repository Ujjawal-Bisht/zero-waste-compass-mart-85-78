import React, { useState } from 'react';
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
import { ShieldCheck, Smartphone, QrCode, AppWindow } from 'lucide-react';
import QRCode from './QRCode';
import TwoFactorMobileOtpSetup from './TwoFactorMobileOtpSetup';
import TwoFactorForm from './TwoFactorForm';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

//--- New: Custom simple animated CardBox for the 2FA option cards ---
const CardBox = ({ children, icon: Icon, title, desc, onClick, active }: any) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: '0 0 12px #a0a0ff55' }}
    animate={active ? { borderColor: "#5b4fff" } : { borderColor: "#eeeeee" }}
    className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 mb-2 bg-white cursor-pointer transition-all shadow-md min-h-[160px] ${active ? "shadow-blue-100 border-zwm-primary" : "border-gray-100"}`}
    onClick={onClick}
    tabIndex={0}
  >
    <Icon size={32} className={active ? 'text-blue-500 mb-3' : 'mb-3 text-gray-400'} />
    <div className={`font-semibold text-base ${active ? "text-blue-700" : "text-gray-900"}`}>{title}</div>
    <div className="text-xs mt-1 text-gray-500 text-center">{desc}</div>
  </motion.div>
)

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
        // "Enable" 2FA for mobile
        toast.success("2FA enabled by mobile OTP successfully!");
        setStep("intro"); // Move back to intro so user sees status
        setActiveTab("status");
        // In production, update user db/flag here.
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

  // handle OTP input
  const handleMobileOtpInput = (code: string) => setMobileOtpValue(code);

  // --- UI RENDER ---
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

            <TabsContent value="options" forceMount className="flex flex-col gap-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardBox
                  icon={AppWindow}
                  title="Authenticator App"
                  desc="Use Google or Microsoft Authenticator"
                  onClick={() => handleSelectMethod('app')}
                  active={activeOption === 'app'}
                />
                <CardBox
                  icon={Smartphone}
                  title="Mobile OTP"
                  desc="Receive OTP via SMS to your phone"
                  onClick={() => handleSelectMethod('otp')}
                  active={activeOption === 'otp'}
                />
              </div>
              {/* Authenticator App flow */}
              {step === 'setup' && verificationMethod === 'app' && qrCodeUrl && (
                <div className="my-8">
                  <div className="text-center mb-4 text-blue-800 text-sm">
                    Scan this QR code with your authenticator app and enter the 6-digit code it generates.
                  </div>
                  <div className="flex justify-center mb-4">
                    <QRCode url={qrCodeUrl} />
                  </div>
                  <button
                    className="w-full p-3 rounded-xl bg-gradient-to-tr from-violet-500 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
                    onClick={() => setStep('verify')}
                  >
                    Continue to Verification
                  </button>
                </div>
              )}
              {/* QR code Verify Flow */}
              {step === "verify" && verificationMethod === "app" && (
                <div className="my-8">
                  <TwoFactorForm
                    onSubmit={async () => {
                      setIsLoading(true);
                      try {
                        const code = (document.querySelector("input[type='tel']") as HTMLInputElement)?.value ?? "";
                        if (!code || code.length !== 6) {
                          toast.error("Please enter your 6-digit code");
                          return;
                        }
                        const ok = await verifyTwoFactor(code);
                        if (ok) {
                          setActiveTab("status");
                          setStep("intro");
                        }
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    onChange={() => {}}
                    onCancel={() => setStep("setup")}
                    isLoading={isLoading}
                  />
                </div>
              )}
              {/* Mobile OTP (SMS) flow */}
              {step === 'mobileEnter' && verificationMethod === 'otp' && (
                <TwoFactorMobileOtpSetup
                  onRequestOtp={handleSendMobileOtp}
                  isLoading={isLoading}
                />
              )}
              {/* Mobile OTP ENTRY FORM */}
              {step === "mobileOtp" && (
                <div className="my-8">
                  <div className="mb-4 text-center text-blue-700">Enter the OTP sent to <span className="font-bold">{mobileOtpPhone}</span></div>
                  <TwoFactorForm
                    onSubmit={handleVerifyMobileOtp}
                    onChange={handleMobileOtpInput}
                    isLoading={isLoading}
                    onCancel={() => setStep("mobileEnter")}
                  />
                </div>
              )}
            </TabsContent>
            {/* Status Tab */}
            <TabsContent value="status" forceMount className="space-y-6">
              <div className="bg-gray-50 rounded-md p-5 text-center">
                <ShieldCheck className="mx-auto mb-2 text-3xl text-blue-500" />
                <div className="font-bold text-lg">{isTwoFactorEnabled ? "2FA Enabled!" : "Not Yet Enabled"}</div>
                <p className="text-gray-600">{isTwoFactorEnabled
                  ? "Your account is protected with an extra layer of authentication."
                  : "Enable two-factor authentication for improved account security."}
                </p>
                {isTwoFactorEnabled && (
                  <button
                    className="mt-5 px-5 py-2 rounded-md border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 font-medium transition-all"
                    onClick={disableTwoFactor}
                  >
                    Disable 2FA
                  </button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TwoFactorSetup;
