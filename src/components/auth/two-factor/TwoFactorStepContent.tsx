
import React from 'react';
import OptionsTabContent from './tabs/OptionsTabContent';
import VerifyStep from './steps/VerifyStep';
import MobilePhoneEntryStep from './steps/MobilePhoneEntryStep';
import MobileOtpEntryStep from './steps/MobileOtpEntryStep';

interface TwoFactorStepContentProps {
  step: 'intro' | 'setup' | 'verify' | 'mobileEnter' | 'mobileOtp';
  qrCodeUrl: string | null;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  isLoading: boolean;
  verificationMethod: 'app' | 'sms';
  setVerificationMethod: (method: 'app' | 'sms') => void;
  mobileOtpPhone: string;
  setMobileOtpPhone: (phone: string) => void;
  mobileOtpValue: string;
  setMobileOtpValue: (value: string) => void;
  handleVerify: () => Promise<void>;
  handleSendMobileOtp: (phone: string) => Promise<void>;
  handleVerifyMobileOtp: () => Promise<void>;
  handleSelectMethod: (method: 'app' | 'sms') => Promise<void>;
  setStep: (step: 'intro' | 'setup' | 'verify' | 'mobileEnter' | 'mobileOtp') => void;
  manualEntryCode?: string;
  showManualEntry?: boolean;
  toggleManualEntry?: () => void;
}

const TwoFactorStepContent: React.FC<TwoFactorStepContentProps> = ({
  step,
  qrCodeUrl,
  verificationCode,
  setVerificationCode,
  isLoading,
  verificationMethod,
  setVerificationMethod,
  mobileOtpPhone,
  setMobileOtpPhone,
  mobileOtpValue,
  setMobileOtpValue,
  handleVerify,
  handleSendMobileOtp,
  handleVerifyMobileOtp,
  handleSelectMethod,
  setStep,
  manualEntryCode,
  showManualEntry,
  toggleManualEntry
}) => {
  switch (step) {
    case "setup":
      return (
        <VerifyStep 
          qrCodeUrl={qrCodeUrl}
          onSubmit={handleVerify}
          onChange={setVerificationCode}
          onCancel={() => setStep("intro")}
          isLoading={isLoading}
          manualEntryCode={manualEntryCode}
          showManualEntry={showManualEntry}
          toggleManualEntry={toggleManualEntry}
        />
      );
    case "mobileEnter":
      return (
        <MobilePhoneEntryStep
          mobileOtpPhone={mobileOtpPhone}
          setMobileOtpPhone={setMobileOtpPhone}
          handleSendMobileOtp={handleSendMobileOtp}
          handleBack={() => setStep("intro")}
          isLoading={isLoading}
        />
      );
    case "mobileOtp":
      return (
        <MobileOtpEntryStep
          mobileOtpValue={mobileOtpValue}
          setMobileOtpValue={setMobileOtpValue}
          handleVerifyMobileOtp={handleVerifyMobileOtp}
          handleBack={() => setStep("mobileEnter")}
          isLoading={isLoading}
        />
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

export default TwoFactorStepContent;
