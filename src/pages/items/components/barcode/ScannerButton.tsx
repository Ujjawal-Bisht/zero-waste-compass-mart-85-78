
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Scan } from 'lucide-react';

interface ScannerButtonProps {
  onClick: () => void;
}

const ScannerButton: React.FC<ScannerButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="animate-bounce-subtle"
    >
      <Button 
        type="button" 
        variant="outline" 
        className="mt-8 scanner-button add-button-special text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 border-none"
        title="Scan Barcode"
        onClick={onClick}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            repeatDelay: 3,
            duration: 0.5 
          }}
        >
          <Scan className="h-4 w-4 mr-2" />
        </motion.div>
        <span>Scan Barcode</span>
      </Button>
    </motion.div>
  );
};

export default ScannerButton;
