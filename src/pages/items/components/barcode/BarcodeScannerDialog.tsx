
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ScannerView from './ScannerView';
import IdleView from './IdleView';

interface BarcodeScannerDialogProps {
  isScanning: boolean;
  barcodeResult: string | null;
  scanFeedback: string;
  onStartScanner: () => void;
  onStopScanner: () => void;
  scannerRef: React.RefObject<HTMLDivElement>;
  scanLineRef: React.RefObject<HTMLDivElement>;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const BarcodeScannerDialog: React.FC<BarcodeScannerDialogProps> = ({
  isScanning,
  barcodeResult,
  scanFeedback,
  onStartScanner,
  onStopScanner,
  scannerRef,
  scanLineRef,
  setIsDialogOpen,
}) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Scan Barcode</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center space-y-4">
        {isScanning ? (
          <ScannerView
            scannerRef={scannerRef}
            scanLineRef={scanLineRef}
            scanFeedback={scanFeedback}
            onStopScanner={onStopScanner}
          />
        ) : (
          <IdleView onStartScanner={onStartScanner} />
        )}
        
        {barcodeResult && !isScanning && (
          <div className="text-center p-3 bg-muted rounded-md w-full animate-fade-in">
            <p className="text-sm font-semibold">Barcode detected: {barcodeResult}</p>
            <p className="text-xs text-muted-foreground mt-1">Item details have been filled automatically</p>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default BarcodeScannerDialog;
