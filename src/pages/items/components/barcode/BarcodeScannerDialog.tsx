
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Camera, X, Loader2, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeScanner, stopScanner } from './scannerUtils';

interface BarcodeScannerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBarcodeDetected: (barcode: string) => void;
}

const BarcodeScannerDialog: React.FC<BarcodeScannerDialogProps> = ({
  isOpen,
  onClose,
  onBarcodeDetected,
}) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [scannerActive, setScannerActive] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Increase progress when scanner is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (scannerActive && scanProgress < 95) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          const nextValue = prev + (95 - prev) * 0.05;
          return Math.min(nextValue, 95);
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [scannerActive, scanProgress]);

  useEffect(() => {
    // Reset state when dialog opens
    if (isOpen) {
      setScanProgress(0);
      setScannerActive(false);
      setError(null);
      setSuccess(false);
      setManualBarcode('');
    }
  }, [isOpen]);

  useEffect(() => {
    // Clean up scanner on component unmount
    return () => {
      stopScanner();
    };
  }, []);

  const handleStartScanner = () => {
    setScannerActive(true);
    setError(null);
    
    initializeScanner({
      containerId: 'interactive',
      onDetected: (code) => {
        handleBarcodeDetection(code);
      },
      onError: (err) => {
        setError(err.message || 'Failed to access camera');
        setScannerActive(false);
        setScanProgress(0);
      }
    });
  };

  const handleBarcodeDetection = (code: string) => {
    stopScanner();
    setScannerActive(false);
    setScanProgress(100);
    setSuccess(true);
    
    // Delay to show success animation
    setTimeout(() => {
      onBarcodeDetected(code);
      onClose();
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      handleBarcodeDetection(manualBarcode);
    }
  };

  const handleClose = () => {
    stopScanner();
    setScannerActive(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Camera className="mr-2 h-5 w-5 text-indigo-500" />
            <span>Barcode Scanner</span>
          </DialogTitle>
          <DialogDescription>
            Position the barcode within the camera view or enter the code manually.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          {/* Progress indicator */}
          <div className="relative">
            <Progress 
              value={scanProgress} 
              className="h-2 bg-gray-100" 
            />
            {scanProgress === 100 && success && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-3 -top-3"
              >
                <div className="bg-green-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Scanner or error display */}
          <div className="relative h-60 bg-gray-100 rounded-md overflow-hidden">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-100"
                >
                  <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
                  <p className="text-center text-gray-700">{error}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setError(null)}
                    className="mt-4"
                  >
                    Try Again
                  </Button>
                </motion.div>
              ) : scannerActive ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <div id="interactive" className="h-full viewport"></div>
                  <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-indigo-400 m-8 rounded-md scanner-target"></div>
                  <div className="scan-line absolute left-0 w-full h-px bg-indigo-500 opacity-75"></div>
                </motion.div>
              ) : success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-green-50"
                >
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-medium text-green-800 mb-2">Barcode Detected!</h3>
                    <p className="text-green-600">Processing product information...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Button
                    onClick={handleStartScanner}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Start Scanner
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Manual entry form */}
          <form onSubmit={handleManualSubmit} className="space-y-2">
            <p className="text-sm text-gray-500">Or enter barcode manually:</p>
            <div className="flex space-x-2">
              <Input
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="Enter barcode number"
                className="flex-1"
                disabled={scannerActive || success}
              />
              <Button 
                type="submit" 
                disabled={!manualBarcode.trim() || scannerActive || success}
              >
                {success ? <Check className="h-4 w-4" /> : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex items-center"
            disabled={success}
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          
          {scannerActive && (
            <div className="flex items-center text-sm text-indigo-600">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScannerDialog;
