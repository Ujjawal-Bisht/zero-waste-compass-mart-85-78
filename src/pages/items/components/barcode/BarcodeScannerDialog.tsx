
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
import { Progress } from '@/components/ui/progress';

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
  scanProgress: number;
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
  scanProgress,
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
        <DialogTitle className="flex items-center justify-between">
          <span className="flex-1 text-lg font-semibold text-indigo-700">
            {barcodeResult ? "Barcode Detected" : "Scan Barcode"}
          </span>
          {barcodeResult && !isScanning && onResetScanner && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetScanner}
              className="animate-fade-in scanner-button text-indigo-600 border-indigo-200"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Scan Again
            </Button>
          )}
        </DialogTitle>
      </DialogHeader>
      
      {isScanning && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Scanning</span>
            <span>{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="h-1.5 bg-slate-100" 
            indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>
      )}
      
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
            className={`text-center p-4 rounded-md w-full ${showSuccess ? "success-pulse" : ""}`}
            style={{
              background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
              boxShadow: '0 4px 12px -2px rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center mb-3">
              <motion.div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Check className="h-6 w-6 text-white" />
              </motion.div>
            </div>
            <p className="text-base font-semibold text-indigo-800">Barcode detected: {barcodeResult}</p>
            <p className="text-sm text-indigo-600 mt-1">Item details have been filled automatically</p>
            
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                className="w-full add-button-special text-white"
                onClick={() => setIsDialogOpen(false)}
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DialogContent>
  );
};

export default BarcodeScannerDialog;
