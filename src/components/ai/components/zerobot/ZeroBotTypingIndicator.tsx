
import React from 'react';
import { motion } from 'framer-motion';

const ZeroBotTypingIndicator: React.FC = () => {
  return (
    <motion.div 
      className="flex justify-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 rounded-bl-none">
        <div className="flex space-x-2 items-center h-5">
          <motion.div 
            className="w-2 h-2 bg-emerald-500 rounded-full"
            animate={{ scale: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-2 h-2 bg-emerald-500 rounded-full"
            animate={{ scale: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.div 
            className="w-2 h-2 bg-emerald-500 rounded-full"
            animate={{ scale: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ZeroBotTypingIndicator;
