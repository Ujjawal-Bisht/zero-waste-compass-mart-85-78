
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flashlight } from 'lucide-react';
import { toggleTorch } from './scannerUtils';
import { motion } from 'framer-motion';
import ScannerControls from './ScannerControls';
import ScanProgressBar from './ScanProgressBar';
import ScanFeedback from './ScanFeedback';

interface ScannerViewProps {
  scannerRef: React.RefObject<HTMLDivElement>;
  scanLineRef: React.RefObject<HTMLDivElement>;
  scanFeedback: string;
  scanProgress: number;
  onStopScanner: () => void;
  onResetScanner: () => void;
  barcodeResult: string | null;
}

const ScannerView: React.FC<ScannerViewProps> = ({
  scannerRef,
  scanLineRef,
  scanFeedback,
  scanProgress,
  onStopScanner,
  onResetScanner,
  barcodeResult
}) => {
  const [torchEnabled, setTorchEnabled] = useState(false);
  
  const handleTorchToggle = async () => {
    const newStatus = !torchEnabled;
    const success = await toggleTorch(newStatus);
    if (success) {
      setTorchEnabled(newStatus);
    } else if (newStatus) {
      // Only show error if user was trying to enable the torch
      console.log("Flashlight not supported on this device");
    }
  };

  return (
    <motion.div 
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
    >
      <div 
        ref={scannerRef} 
        id="scanner"
        className="w-full h-full"
      >
        {/* Quagga will inject video here */}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Scan target overlay with animated corners */}
        <div className="relative w-2/3 h-1/3 border-2 border-indigo-400/70 rounded-md">
          {/* Animated corners */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-indigo-500 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-indigo-500 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-indigo-500 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-indigo-500 animate-pulse"></div>
        </div>
        
        {/* Enhanced scan line with gradient */}
        <div 
          ref={scanLineRef}
          className="absolute top-1/3 left-1/6 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70 scan-line shadow-sm shadow-indigo-500/50 blur-[0.5px]"
        ></div>
      </div>
      
      <div className="absolute top-3 right-3 flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className={`scanner-button bg-white/90 backdrop-blur-sm z-10 ${torchEnabled ? 'border-yellow-400 text-yellow-500' : ''}`}
            onClick={handleTorchToggle}
            title={torchEnabled ? "Turn off flashlight" : "Turn on flashlight"}
          >
            <Flashlight className={`h-4 w-4 ${torchEnabled ? 'text-yellow-400 filter drop-shadow-md' : ''}`} />
          </Button>
        </motion.div>
      </div>
      
      {/* Scanner controls (Stop/Reset) */}
      <ScannerControls
        onStopScanner={onStopScanner}
        onResetScanner={onResetScanner}
        isDetected={!!barcodeResult}
      />
      
      {/* Progress bar */}
      <ScanProgressBar progress={scanProgress} />
      
      {/* Enhanced status indicator */}
      <ScanFeedback message={scanFeedback} />
    </motion.div>
  );
};

export default ScannerView;
