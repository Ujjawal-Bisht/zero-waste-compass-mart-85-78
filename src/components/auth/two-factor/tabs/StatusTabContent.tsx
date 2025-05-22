
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface StatusTabContentProps {
  isTwoFactorEnabled: boolean;
  localOtpEnabled: boolean;
  disableTwoFactor: () => void;
}

const StatusTabContent: React.FC<StatusTabContentProps> = ({
  isTwoFactorEnabled,
  localOtpEnabled,
  disableTwoFactor
}) => {
  return (
    <div className="bg-gray-50 rounded-md p-5 text-center">
      <ShieldCheck className="mx-auto mb-2 text-3xl text-blue-500" />
      <div className="font-bold text-lg">
        {(isTwoFactorEnabled || localOtpEnabled)
          ? "2FA Enabled!"
          : "Not Yet Enabled"}
      </div>
      <p className="text-gray-600">{(isTwoFactorEnabled || localOtpEnabled)
        ? "Your account is protected with an extra layer of authentication."
        : "Enable two-factor authentication for improved account security."}
      </p>
      {(isTwoFactorEnabled || localOtpEnabled) && (
        <button
          className="mt-5 px-5 py-2 rounded-md border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 font-medium transition-all"
          onClick={() => {
            // For demo mobile OTP, clear local flag too
            if (typeof window !== "undefined") {
              window.localStorage.removeItem("zwm_2fa_enabled");
            }
            // Try to call real disabling too
            disableTwoFactor();
          }}
        >
          Disable 2FA
        </button>
      )}
    </div>
  );
};

export default StatusTabContent;
