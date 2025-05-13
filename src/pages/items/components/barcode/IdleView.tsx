
import React from 'react';
import { Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface IdleViewProps {
  onStartScanner: () => void;
}

const IdleView: React.FC<IdleViewProps> = ({ onStartScanner }) => {
  return (
    <motion.div 
      className="flex flex-col items-center space-y-4 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Scan className="h-16 w-16 text-zwm-primary" />
      </motion.div>
      <p className="text-center text-sm text-muted-foreground">
        Position the barcode in front of your camera to scan automatically
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          type="button"
          onClick={onStartScanner}
          className="zwm-gradient hover:opacity-90 animate-bounce-subtle"
        >
          Start Scanner
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IdleView;
