
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
      className="flex flex-col items-center space-y-5 p-8 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ boxShadow: "inset 0 0 20px rgba(99, 102, 241, 0.05)" }}
    >
      <motion.div 
        className="relative"
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
        {/* Ring animation around icon */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-indigo-300/50"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
          }}
        />
        
        {/* Icon with gradient background */}
        <div className="relative z-10 bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-full shadow-lg">
          <Scan className="h-10 w-10 text-white" />
        </div>
      </motion.div>
      
      <div className="text-center">
        <h3 className="font-medium text-indigo-800 text-lg mb-2">Ready to Scan</h3>
        <p className="text-center text-sm text-indigo-600 mb-4 max-w-xs">
          Position your camera in front of the barcode to quickly scan and fill item details automatically
        </p>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          type="button"
          onClick={onStartScanner}
          className="add-button-special text-white py-6 px-8 rounded-lg"
          size="lg"
        >
          Start Scanner
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-1"
          >
            →
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IdleView;
