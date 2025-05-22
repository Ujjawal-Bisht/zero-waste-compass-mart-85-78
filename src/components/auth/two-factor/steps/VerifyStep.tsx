
import React from 'react';
import QRCode from '../QRCode';
import TwoFactorForm from '../TwoFactorForm';

interface VerifyStepProps {
  qrCodeUrl: string | null;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  onChange: (code: string) => void;
  isLoading: boolean;
}

const VerifyStep: React.FC<VerifyStepProps> = ({
  qrCodeUrl,
  onSubmit,
  onCancel,
  onChange,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Scan this QR code with your authenticator app (like Google Authenticator or Authy)
      </p>
      <div className="flex justify-center py-4">
        {qrCodeUrl && <QRCode url={qrCodeUrl} />}
      </div>
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
