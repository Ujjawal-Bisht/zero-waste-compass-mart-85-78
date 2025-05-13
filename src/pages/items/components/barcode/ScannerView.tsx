
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Flashlight } from 'lucide-react';
import { toggleTorch } from './scannerUtils';
import { motion } from 'framer-motion';

interface ScannerViewProps {
  scannerRef: React.RefObject<HTMLDivElement>;
  scanLineRef: React.RefObject<HTMLDivElement>;
  scanFeedback: string;
  onStopScanner: () => void;
}

const ScannerView: React.FC<ScannerViewProps> = ({
  scannerRef,
  scanLineRef,
  scanFeedback,
  onStopScanner,
}) => {
  const [torchEnabled, setTorchEnabled] = useState(false);
  
  const handleTorchToggle = () => {
    const newStatus = !torchEnabled;
    const success = toggleTorch(newStatus);
    if (success) {
      setTorchEnabled(newStatus);
    } else if (newStatus) {
      // Only show error if user was trying to enable the torch
      console.log("Flashlight not supported on this device");
    }
  };

  return (
    <motion.div 
      className="relative w-full aspect-video bg-black rounded-md overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        ref={scannerRef} 
        className="w-full h-full"
      >
        {/* Quagga will inject video here */}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-2/3 h-1/3 border-2 border-zwm-primary/70 rounded-md scan-target"></div>
        <div 
          ref={scanLineRef}
          className="absolute top-1/2 left-0 w-full h-0.5 bg-zwm-primary opacity-70 scan-line"
        ></div>
      </div>
      
      <div className="absolute top-2 right-2 flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="bg-white/80 z-10"
            onClick={handleTorchToggle}
            title={torchEnabled ? "Turn off flashlight" : "Turn on flashlight"}
          >
            <Flashlight className={`h-4 w-4 ${torchEnabled ? 'text-yellow-400' : ''}`} />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="bg-white/80 z-10"
            onClick={onStopScanner}
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      {/* Status indicator */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70 text-white text-center text-sm">
        {scanFeedback}
      </div>
    </motion.div>
  );
};

export default ScannerView;
