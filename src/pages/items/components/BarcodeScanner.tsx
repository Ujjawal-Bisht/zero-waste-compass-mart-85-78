
import React, { useState, useRef, useEffect } from 'react';
import { Barcode } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Quagga from 'quagga';
import BarcodeScannerDialog from './barcode/BarcodeScannerDialog';
import { initializeScanner, drawBarcodeBox } from './barcode/scannerUtils';

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [scanFeedback, setScanFeedback] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  // Animate the scan line
  useEffect(() => {
    if (isScanning && scanLineRef.current) {
      const animation = scanLineRef.current.animate(
        [
          { transform: 'translateY(-100%)', opacity: 0.5 },
          { transform: 'translateY(100%)', opacity: 1 },
          { transform: 'translateY(300%)', opacity: 0.5 },
        ],
        {
          duration: 2000,
          iterations: Infinity,
          easing: 'ease-in-out',
        }
      );

      return () => {
        animation.cancel();
      };
    }
  }, [isScanning]);

  // Initialize and clean up Quagga when dialog opens/closes
  useEffect(() => {
    if (isDialogOpen && isScanning) {
      startScanner();
    }
    
    return () => {
      if (Quagga) {
        Quagga.stop();
      }
    };
  }, [isDialogOpen, isScanning]);

  const handleDetected = (result: any) => {
    if (result && result.codeResult && result.codeResult.code) {
      const code = result.codeResult.code;
      setBarcodeResult(code);
      setScanFeedback(`Barcode detected: ${code}`);
      
      // Stop scanning
      Quagga.stop();
      setIsScanning(false);
      
      // Use a slight delay to show the detected barcode before closing
      setTimeout(() => {
        onBarcodeDetected(code);
        setIsDialogOpen(false);
      }, 1500);
    }
  };

  const handleProcessed = (result: any) => {
    drawBarcodeBox(result);
  };

  const handleScannerError = (err: Error) => {
    console.error("Error initializing Quagga:", err);
    setScanFeedback('Camera access denied. Please check permissions.');
    toast.error('Could not access camera. Please check permissions.');
    setIsScanning(false);
  };

  const startScanner = () => {
    setIsScanning(true);
    setScanFeedback('Initializing camera...');
    
    initializeScanner(
      scannerRef,
      handleDetected,
      handleProcessed,
      handleScannerError
    );

    setScanFeedback('Camera ready. Scanning for barcode...');
  };

  const stopScanner = () => {
    if (Quagga) {
      Quagga.stop();
    }
    setIsScanning(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          type="button" 
          variant="outline" 
          className="mt-8 button-glow animate-pulse"
          title="Scan Barcode"
        >
          <Barcode className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <BarcodeScannerDialog
        isScanning={isScanning}
        barcodeResult={barcodeResult}
        scanFeedback={scanFeedback}
        onStartScanner={startScanner}
        onStopScanner={stopScanner}
        scannerRef={scannerRef}
        scanLineRef={scanLineRef}
        setIsDialogOpen={setIsDialogOpen}
      />
    </Dialog>
  );
};
