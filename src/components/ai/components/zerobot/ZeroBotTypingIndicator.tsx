
import React from 'react';
import { motion } from 'framer-motion';

interface ZeroBotTypingIndicatorProps {
  isMobile?: boolean;
}

const ZeroBotTypingIndicator: React.FC<ZeroBotTypingIndicatorProps> = ({ isMobile = false }) => {
  return (
    <div className="flex items-center justify-start">
      <motion.div 
        className={`bg-white p-3 rounded-lg shadow-sm ${isMobile ? 'p-2 max-w-[70%]' : ''}`}
      >
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500">ZeroBot is typing</div>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gray-400 rounded-full"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ZeroBotTypingIndicator;
