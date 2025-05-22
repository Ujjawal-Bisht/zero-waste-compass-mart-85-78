
import React from 'react';
import QRCode from '../QRCode';
import TwoFactorForm from '../TwoFactorForm';
import ManualEntryCode from '../ManualEntryCode';
import { Button } from '@/components/ui/button';

interface VerifyStepProps {
  qrCodeUrl: string | null;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  onChange: (code: string) => void;
  isLoading: boolean;
  manualEntryCode?: string;
  showManualEntry?: boolean;
  toggleManualEntry?: () => void;
}

const VerifyStep: React.FC<VerifyStepProps> = ({
  qrCodeUrl,
  onSubmit,
  onCancel,
  onChange,
  isLoading,
  manualEntryCode,
  showManualEntry,
  toggleManualEntry
}) => {
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 space-y-2">
        <p>Scan this QR code with your authenticator app (like Google Authenticator or Authy)</p>
        <p className="text-xs text-gray-500">
          The authenticator app will generate a new 6-digit code every 30 seconds that you can use to verify your identity.
        </p>
      </div>
      
      <div className="flex justify-center py-4">
        {qrCodeUrl && <QRCode url={qrCodeUrl} />}
      </div>

      {manualEntryCode && (
        <>
          {showManualEntry ? (
            <ManualEntryCode code={manualEntryCode} />
          ) : (
            <Button 
              variant="outline" 
              type="button" 
              className="w-full"
              onClick={toggleManualEntry}
            >
              Can't scan the code? Enter manually
            </Button>
          )}
        </>
      )}
      
      <TwoFactorForm
        onSubmit={onSubmit}
        onChange={onChange}
        isLoading={isLoading}
        onCancel={onCancel}
      />
    </div>
  );
};

export default VerifyStep;
