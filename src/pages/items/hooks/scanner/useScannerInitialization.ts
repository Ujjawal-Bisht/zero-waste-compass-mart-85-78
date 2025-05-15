
import { useRef, useState } from 'react';
import { initializeScanner, stopScanner } from '../../components/barcode/scannerUtils';

export const useScannerInitialization = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const quaggaInitialized = useRef(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const startScanner = async (options = {}) => {
    setIsScanning(true);
    
    try {
      if (scannerRef.current) {
        initializeScanner({
          containerId: scannerRef.current.id || 'scanner',
          onDetected: () => {}, // Will be overridden in main hook
          onError: (err) => handleScannerError(err),
          ...options
        });
        
        quaggaInitialized.current = true;
        setHasPermission(true);
      }
    } catch (error) {
      handleScannerError(error instanceof Error ? error : new Error('Failed to start scanner'));
    }
  };

  const handleScannerError = (err: Error) => {
    console.error("Error initializing Quagga:", err);
    setIsScanning(false);
    setHasPermission(false);
    quaggaInitialized.current = false;
  };

  const cleanupScanner = () => {
    if (quaggaInitialized.current) {
      try {
        stopScanner();
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

  return {
    isScanning,
    setIsScanning,
    hasPermission,
    setHasPermission,
    quaggaInitialized,
    scannerRef,
    scanLineRef,
    progressIntervalRef,
    startScanner,
    cleanupScanner,
    handleScannerError
  };
};
