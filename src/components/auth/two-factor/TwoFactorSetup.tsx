
import React from 'react';
import { motion } from 'framer-motion';
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
import TwoFactorStepContent from './TwoFactorStepContent';
import { useTwoFactorSetup } from './hooks/useTwoFactorSetup';

const TwoFactorSetup: React.FC = () => {
  const {
    isLoading,
    qrCodeUrl,
    verificationCode,
    setVerificationCode,
    step,
    setStep,
    verificationMethod,
    setVerificationMethod,
    mobileOtpPhone,
    setMobileOtpPhone,
    mobileOtpValue,
    setMobileOtpValue,
    activeTab,
    setActiveTab,
    localOtpEnabled,
    isTwoFactorEnabled,
    handleSendMobileOtp,
    handleVerifyMobileOtp,
    handleVerify,
    handleSelectMethod,
    disableTwoFactor
  } = useTwoFactorSetup();

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
              <TwoFactorStepContent
                step={step}
                qrCodeUrl={qrCodeUrl}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                isLoading={isLoading}
                verificationMethod={verificationMethod}
                setVerificationMethod={setVerificationMethod}
                mobileOtpPhone={mobileOtpPhone}
                setMobileOtpPhone={setMobileOtpPhone}
                mobileOtpValue={mobileOtpValue}
                setMobileOtpValue={setMobileOtpValue}
                handleVerify={handleVerify}
                handleSendMobileOtp={handleSendMobileOtp}
                handleVerifyMobileOtp={handleVerifyMobileOtp}
                handleSelectMethod={handleSelectMethod}
                setStep={setStep}
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
