
import React from 'react';
import { motion } from 'framer-motion';

interface ZeroBotTypingIndicatorProps {
  isMobile?: boolean;
}

const ZeroBotTypingIndicator: React.FC<ZeroBotTypingIndicatorProps> = ({ isMobile = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className={`bg-white p-3 rounded-lg shadow-sm border border-gray-100 rounded-bl-none ${isMobile ? 'p-2' : ''}`}>
        <div className="flex space-x-1">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1, repeatType: 'loop', delay: 0 }}
            className={`bg-gray-300 rounded-full ${isMobile ? 'h-1.5 w-1.5' : 'h-2 w-2'}`}
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1, repeatType: 'loop', delay: 0.2 }}
            className={`bg-gray-300 rounded-full ${isMobile ? 'h-1.5 w-1.5' : 'h-2 w-2'}`}
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1, repeatType: 'loop', delay: 0.4 }}
            className={`bg-gray-300 rounded-full ${isMobile ? 'h-1.5 w-1.5' : 'h-2 w-2'}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ZeroBotTypingIndicator;
