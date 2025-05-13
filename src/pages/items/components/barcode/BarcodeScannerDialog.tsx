
import React, { useState } from 'react';
import { X, Flashlight, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ScannerView from './ScannerView';
import IdleView from './IdleView';
import { motion } from 'framer-motion';

interface BarcodeScannerDialogProps {
  isScanning: boolean;
  barcodeResult: string | null;
  scanFeedback: string;
  onStartScanner: () => void;
  onStopScanner: () => void;
  scannerRef: React.RefObject<HTMLDivElement>;
  scanLineRef: React.RefObject<HTMLDivElement>;
  setIsDialogOpen: (isOpen: boolean) => void;
  onResetScanner?: () => void;
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
  onResetScanner,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success animation when barcode is detected
  React.useEffect(() => {
    if (barcodeResult && !isScanning) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [barcodeResult, isScanning]);

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <span className="flex-1">Scan Barcode</span>
          {barcodeResult && !isScanning && onResetScanner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetScanner}
              className="mr-2 animate-fade-in"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Scan Again
            </Button>
          )}
        </DialogTitle>
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
          <motion.div 
            className={`text-center p-3 bg-muted rounded-md w-full ${showSuccess ? "success-pulse" : ""}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm font-semibold">Barcode detected: {barcodeResult}</p>
            <p className="text-xs text-muted-foreground mt-1">Item details have been filled automatically</p>
          </motion.div>
        )}
      </div>
    </DialogContent>
  );
};

export default BarcodeScannerDialog;
