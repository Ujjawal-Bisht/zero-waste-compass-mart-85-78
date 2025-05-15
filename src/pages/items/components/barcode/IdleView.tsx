
import React from 'react';
import { Scan, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
        <div className="flex items-center justify-center gap-1 mb-2">
          <h3 className="font-medium text-indigo-800 text-lg">Ready to Scan</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-indigo-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  This scanner supports various barcode formats including EAN, UPC, Code 128, and QR codes.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-center text-sm text-indigo-600 mb-4 max-w-xs">
          Position your camera in front of the barcode to quickly scan and fill item details automatically
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
            <span>Reliable Detection</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
            <span>Auto-Fill Details</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-1.5"></span>
            <span>Multiple Formats</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-1.5"></span>
            <span>Camera Controls</span>
          </div>
        </div>
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
