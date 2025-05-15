
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
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="scanner-button bg-white/90 backdrop-blur-sm z-10"
            onClick={onStopScanner}
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      {/* Enhanced status indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-black/60 text-white text-center backdrop-blur-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="h-2 w-2 bg-indigo-400 rounded-full"
          ></motion.div>
          <span className="text-sm font-medium">{scanFeedback}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScannerView;
