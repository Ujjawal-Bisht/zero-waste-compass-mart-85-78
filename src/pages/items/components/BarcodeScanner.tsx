
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import BarcodeScannerDialog from './barcode/BarcodeScannerDialog';
import { useBarcodeScanner } from '../hooks/useBarcodeScanner';
import ScannerButton from './barcode/ScannerButton';
import { useProductDetails } from '../hooks/scanner/useProductDetails';
import { toast } from 'sonner';

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { fetchProductByBarcode } = useProductDetails();
  
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
  } = useBarcodeScanner((barcode) => {
    // Handle successful barcode detection
    handleBarcodeDetection(barcode);
  });
  
  const handleBarcodeDetection = async (barcode: string) => {
    console.log("Barcode detected:", barcode);
    
    // Fetch product details based on the barcode
    const product = await fetchProductByBarcode(barcode);
    
    // Pass the barcode to the parent component
    onBarcodeDetected(barcode);
    
    // Close the scanner dialog after a short delay
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 1500);
    
    // Show feedback toast with detected product
    if (product) {
      toast.success(
        `Product found: ${product.name}`,
        {
          description: `Price: ₹${product.currentPrice}, Category: ${product.category}`
        }
      );
    }
  };

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
