
import React from 'react';
import { motion } from 'framer-motion';

interface ScanFeedbackProps {
  message: string;
}

const ScanFeedback: React.FC<ScanFeedbackProps> = ({ message }) => {
  return (
    <motion.div 
      className="absolute bottom-6 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-black/60 text-white text-center backdrop-blur-sm"
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
        <span className="text-sm font-medium">{message}</span>
      </div>
    </motion.div>
  );
};

export default ScanFeedback;
