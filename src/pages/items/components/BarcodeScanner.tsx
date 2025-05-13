
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
  const quaggaInitialized = useRef(false);
  const detectionCount = useRef<Record<string, number>>({});

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
    
    // Clean up function
    return () => {
      cleanupScanner();
    };
  }, [isDialogOpen, isScanning]);

  const handleDetected = (result: any) => {
    if (result && result.codeResult && result.codeResult.code) {
      const code = result.codeResult.code;
      
      // Count detection frequency for reliability
      detectionCount.current[code] = (detectionCount.current[code] || 0) + 1;
      
      // Require multiple detections of the same barcode for reliability
      if (detectionCount.current[code] >= 3) {
        setBarcodeResult(code);
        setScanFeedback(`Barcode detected: ${code}`);
        
        // Stop scanning safely
        cleanupScanner();
        setIsScanning(false);
        
        // Use a slight delay to show the detected barcode before closing
        setTimeout(() => {
          onBarcodeDetected(code);
          setIsDialogOpen(false);
        }, 1500);
      } else {
        setScanFeedback(`Confirming scan: ${code} (${detectionCount.current[code]}/3)`);
      }
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
    quaggaInitialized.current = false;
  };

  const cleanupScanner = () => {
    if (quaggaInitialized.current && Quagga) {
      try {
        Quagga.offDetected(handleDetected);
        Quagga.stop();
        quaggaInitialized.current = false;
      } catch (error) {
        console.error("Error stopping Quagga:", error);
      }
    }
  };

  const startScanner = () => {
    setIsScanning(true);
    setScanFeedback('Initializing camera...');
    detectionCount.current = {}; // Reset detection counter
    
    if (scannerRef.current) {
      initializeScanner(
        scannerRef,
        handleDetected,
        handleProcessed,
        handleScannerError,
        () => {
          // On successful initialization
          quaggaInitialized.current = true;
          setScanFeedback('Camera ready. Scanning for barcode...');
        },
        false // torch initially disabled
      );
    }
  };

  const stopScanner = () => {
    cleanupScanner();
    setIsScanning(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      if (!open && isScanning) {
        stopScanner();
      }
      setIsDialogOpen(open);
    }}>
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
