
import { useEffect } from 'react';
import { toast } from 'sonner';
import { selectOptimalCamera } from '../components/barcode/scannerUtils';
import { useBarcodeDetection } from './scanner/useBarcodeDetection';
import { useScannerInitialization } from './scanner/useScannerInitialization';
import { useProductManagement } from './scanner/useProductManagement';
import { useScanProgress } from './scanner/useScanProgress';

export const useBarcodeScanner = (onBarcodeDetected: (barcode: string) => void) => {
  // Combine all the smaller hooks
  const {
    barcodeResult,
    setBarcodeResult,
    scanFeedback,
    setScanFeedback,
    scanProgress,
    setScanProgress,
    scanStatus,
    setScanStatus,
    detectionCount,
    resetDetection,
    incrementDetectionCount
  } = useBarcodeDetection();

  const {
    isScanning,
    setIsScanning,
    hasPermission,
    scannerRef,
    scanLineRef,
    progressIntervalRef,
    startScanner: initScanner,
    cleanupScanner,
    handleScannerError
  } = useScannerInitialization();

  const { addBarcodeProduct } = useProductManagement();

  // Use the progress animation hook
  useScanProgress(isScanning, setScanProgress, progressIntervalRef);

  const handleDetected = (result: any) => {
    if (result && result.codeResult && result.codeResult.code) {
      const code = result.codeResult.code;
      
      // Count detection frequency for reliability
      const detectionFrequency = incrementDetectionCount(code);
      
      // Require multiple detections of the same barcode for reliability
      if (detectionFrequency >= 3) {
        setBarcodeResult(code);
        setScanFeedback(`Barcode detected: ${code}`);
        setScanProgress(100);
        setScanStatus('success');
        
        // Check if code exists in database
        const foundProduct = addBarcodeProduct(code);
        
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
        }, 500);
      } else {
        setScanFeedback(`Confirming scan: ${code} (${detectionFrequency}/3)`);
        setScanProgress(30 + (detectionFrequency * 20)); // Incremental progress
      }
    }
  };

  const startScanner = async (options = {}) => {
    setIsScanning(true);
    setScanFeedback('Initializing camera...');
    setScanStatus('scanning');
    resetDetection();
    setScanProgress(5); // Start progress indicator
    
    try {
      // Try to select the optimal camera (back camera if available)
      await selectOptimalCamera();
      
      await initScanner({
        ...options,
        onDetected: handleDetected
      });
      
      setScanFeedback('Camera ready. Scanning for barcode...');
      setScanProgress(25); // Update progress after initialization
      
    } catch (error) {
      console.error("Failed to initialize scanner:", error);
      setScanStatus('error');
      handleScannerError(error instanceof Error ? error : new Error('Failed to start scanner'));
      toast.error('Could not access camera. Please check permissions.');
    }
  };

  // Fix for scanner line animation using CSS instead of JS
  useEffect(() => {
    if (isScanning && scanLineRef.current) {
      // Animation handled by CSS
    }
  }, [isScanning]);

  return {
    isScanning,
    setIsScanning,
    barcodeResult,
    setBarcodeResult,
    scanFeedback,
    setScanFeedback,
    scanProgress,
    setScanProgress,
    scanStatus,
    setScanStatus,
    hasPermission,
    scannerRef,
    scanLineRef,
    startScanner,
    stopScanner: cleanupScanner,
    resetScanner: () => {
      resetDetection();
      setScanStatus('scanning');
      startScanner();
    }
  };
};
