
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import BarcodeScannerDialog from './barcode/BarcodeScannerDialog';
import { useBarcodeScanner } from '../hooks/useBarcodeScanner';
import ScannerButton from './barcode/ScannerButton';

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const {
    isScanning,
    setIsScanning,
    barcodeResult,
    setBarcodeResult,
    scanFeedback,
    setScanFeedback,
    scanProgress,
    setScanProgress,
    scannerRef,
    scanLineRef,
    startScanner,
    stopScanner,
    resetScanner
  } = useBarcodeScanner(onBarcodeDetected);

  // Reset state when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      setBarcodeResult(null);
      setScanFeedback('');
      setIsScanning(false);
      setScanProgress(0);
    }
  }, [isDialogOpen, setBarcodeResult, setScanFeedback, setIsScanning, setScanProgress]);

  // Initialize and clean up scanner when dialog opens/closes
  useEffect(() => {
    if (isDialogOpen && isScanning) {
      startScanner();
    }
    
    // Clean up function
    return () => {
      stopScanner();
    };
  }, [isDialogOpen, isScanning, startScanner, stopScanner]);

  const handleOpenDialog = () => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setIsDialogOpen(true);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      if (!open && isScanning) {
        stopScanner();
      }
      setIsDialogOpen(open);
    }}>
      <DialogTrigger asChild>
        <ScannerButton onClick={handleOpenDialog} />
      </DialogTrigger>
      
      <BarcodeScannerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onBarcodeDetected={onBarcodeDetected}
      />
    </Dialog>
  );
};

export default BarcodeScanner;
