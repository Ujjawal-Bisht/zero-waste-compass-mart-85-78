
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScannerControlsProps {
  onResetScanner: () => void;
  onStopScanner: () => void;
  isDetected: boolean;
}

const ScannerControls: React.FC<ScannerControlsProps> = ({
  onResetScanner,
  onStopScanner,
  isDetected
}) => {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2 z-20">
      {isDetected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="scanner-button bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={onResetScanner}
            title="Scan Again"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            <span>Scan Again</span>
          </Button>
        </motion.div>
      )}
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="scanner-button bg-white/90 backdrop-blur-sm"
          onClick={onStopScanner}
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ScannerControls;
