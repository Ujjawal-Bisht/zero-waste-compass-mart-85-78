
import React from 'react';
import { Button } from '@/components/ui/button';
import QRCode from '@/components/auth/two-factor/QRCode';

interface SetupStepProps {
  qrCodeUrl: string;
  onNext: () => void;
}

const SetupStep: React.FC<SetupStepProps> = ({ qrCodeUrl, onNext }) => {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="font-medium mb-2">Scan QR Code</h3>
        <p className="text-sm text-gray-600 mb-4">
          Scan this QR code with your authenticator app
        </p>
        
        <div className="flex justify-center">
          <QRCode url={qrCodeUrl} />
        </div>
      </div>
          
      <div className="pt-4">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onNext}
        >
          Next: Verify Code
        </Button>
      </div>
    </div>
  );
};

export default SetupStep;
