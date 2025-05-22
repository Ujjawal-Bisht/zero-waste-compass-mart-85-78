
import React from 'react';
import { AppWindow, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardBox from '../components/CardBox';
import QRCode from '../QRCode';
import TwoFactorForm from '../TwoFactorForm';
import TwoFactorMobileOtpSetup from '../TwoFactorMobileOtpSetup';
import { toast } from 'sonner';

interface OptionsTabContentProps {
  activeOption: 'app' | 'otp';
  step: 'intro' | 'setup' | 'verify' | 'mobileEnter' | 'mobileOtp';
  qrCodeUrl: string | null;
  handleSelectMethod: (method: 'app' | 'otp') => Promise<void>;
  handleVerifyMobileOtp: () => Promise<void>;
  handleSendMobileOtp: (fullNumber: string) => Promise<void>;
  isLoading: boolean;
  setStep: (step: 'intro' | 'setup' | 'verify' | 'mobileEnter' | 'mobileOtp') => void;
  mobileOtpPhone: string;
  setMobileOtpValue: (value: string) => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  setActiveTab: (tab: 'options' | 'status') => void;
}

const OptionsTabContent: React.FC<OptionsTabContentProps> = ({
  activeOption,
  step,
  qrCodeUrl,
  handleSelectMethod,
  handleVerifyMobileOtp,
  handleSendMobileOtp,
  isLoading,
  setStep,
  mobileOtpPhone,
  setMobileOtpValue,
  verifyTwoFactor,
  setActiveTab
}) => {
  return (
    <div className="flex flex-col gap-2">
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
      {step === 'setup' && activeOption === 'app' && qrCodeUrl && (
        <div className="my-8">
          <div className="text-center mb-4 text-blue-800 text-sm">
            Scan this QR code with your authenticator app and enter the 6-digit code it generates.
          </div>
          <div className="flex justify-center mb-4">
            <QRCode url={qrCodeUrl} />
          </div>
          <Button
            className="w-full p-3 rounded-xl bg-gradient-to-tr from-violet-500 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
            onClick={() => setStep('verify')}
          >
            Continue to Verification
          </Button>
        </div>
      )}
      
      {/* QR code Verify Flow (app method) */}
      {step === "verify" && activeOption === "app" && (
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
      
      {/* Mobile OTP (SMS) flow entry form */}
      {step === 'mobileEnter' && activeOption === 'otp' && (
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
            onSubmit={async () => {
              await handleVerifyMobileOtp();
              setMobileOtpValue("");
            }}
            onChange={setMobileOtpValue}
            isLoading={isLoading}
            onCancel={() => setStep("mobileEnter")}
          />
        </div>
      )}
    </div>
  );
};

export default OptionsTabContent;
