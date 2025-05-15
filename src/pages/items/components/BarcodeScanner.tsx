
import React, { useState, useRef, useEffect } from 'react';
import { Barcode, Camera, Scan } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Quagga from 'quagga';
import BarcodeScannerDialog from './barcode/BarcodeScannerDialog';
import { initializeScanner, drawBarcodeBox, selectOptimalCamera } from './barcode/scannerUtils';
import { motion } from 'framer-motion';

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [scanFeedback, setScanFeedback] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const scannerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const quaggaInitialized = useRef(false);
  const detectionCount = useRef<Record<string, number>>({});
  const progressIntervalRef = useRef<number | null>(null);

  // Animate the scan line
  useEffect(() => {
    if (isScanning && scanLineRef.current) {
      // The animation is now handled by CSS in items.css
    }
    
    // Start the scanning progress animation when scanning begins
    if (isScanning) {
      setScanProgress(0);
      const intervalId = window.setInterval(() => {
        setScanProgress(prev => {
          if (prev < 95) return prev + 1;
          return prev;
        });
      }, 100);
      progressIntervalRef.current = intervalId;
      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
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
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
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
        setScanProgress(100);
        
        // Visual feedback
        const scannerElement = scannerRef.current;
        if (scannerElement) {
          scannerElement.classList.add('barcode-detected');
          setTimeout(() => {
            scannerElement.classList.remove('barcode-detected');
          }, 1500);
        }
        
        // Stop scanning safely
        cleanupScanner();
        setIsScanning(false);
        
        // Haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 200]);
        }
        
        // Use a slight delay to show the detected barcode before closing
        setTimeout(() => {
          onBarcodeDetected(code);
          // Keep dialog open to show success state
          // setIsDialogOpen(false);
        }, 500);
      } else {
        setScanFeedback(`Confirming scan: ${code} (${detectionCount.current[code]}/3)`);
        setScanProgress(30 + (detectionCount.current[code] * 20)); // Incremental progress
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
    setHasPermission(false);
    quaggaInitialized.current = false;
  };

  const cleanupScanner = () => {
    if (quaggaInitialized.current && Quagga) {
      try {
        Quagga.offDetected(handleDetected);
        Quagga.offProcessed(handleProcessed);
        Quagga.stop();
        quaggaInitialized.current = false;
      } catch (error) {
        console.error("Error stopping Quagga:", error);
      }
    }
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const startScanner = async () => {
    setIsScanning(true);
    setScanFeedback('Initializing camera...');
    detectionCount.current = {}; // Reset detection counter
    setScanProgress(5); // Start progress indicator
    
    // Try to select the optimal camera (back camera if available)
    const optimalCameraId = await selectOptimalCamera();
    
    if (scannerRef.current) {
      initializeScanner(
        scannerRef,
        handleDetected,
        handleProcessed,
        handleScannerError,
        () => {
          // On successful initialization
          quaggaInitialized.current = true;
          setHasPermission(true);
          setScanFeedback('Camera ready. Scanning for barcode...');
          setScanProgress(25); // Update progress after initialization
        },
        false, // torch initially disabled
        optimalCameraId
      );
    }
  };

  const stopScanner = () => {
    cleanupScanner();
    setIsScanning(false);
  };

  const resetScanner = () => {
    setBarcodeResult(null);
    setScanFeedback('');
    setScanProgress(0);
    detectionCount.current = {};
    startScanner();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      if (!open && isScanning) {
        stopScanner();
      }
      setIsDialogOpen(open);
    }}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            type="button" 
            variant="outline" 
            className="mt-8 scanner-button add-button-special text-white"
            title="Scan Barcode"
          >
            <Scan className="h-4 w-4 mr-2" />
            <span>Scan Barcode</span>
          </Button>
        </motion.div>
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
        onResetScanner={resetScanner}
        scanProgress={scanProgress}
      />
    </Dialog>
  );
};
