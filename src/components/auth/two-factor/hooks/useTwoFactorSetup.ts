
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export const useTwoFactorSetup = () => {
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
  const [manualEntryCode, setManualEntryCode] = useState<string>('');
  const [showManualEntry, setShowManualEntry] = useState(false);

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
      if (result) {
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
        setManualEntryCode(result.secret);
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

  // --- Toggle manual entry code visibility ---
  const toggleManualEntry = () => {
    setShowManualEntry(prevState => !prevState);
  };

  // --- Read 2FA status for demo mobile flow from localStorage (simulated database flag) ---
  const [localOtpEnabled, setLocalOtpEnabled] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalOtpEnabled(window.localStorage.getItem("zwm_2fa_enabled") === "true");
    }
  }, [step, activeTab]);

  return {
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
    disableTwoFactor,
    manualEntryCode,
    showManualEntry,
    toggleManualEntry
  };
};
