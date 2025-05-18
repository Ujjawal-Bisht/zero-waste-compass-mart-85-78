
import React from 'react';
import { motion } from 'framer-motion';

interface QRCodeProps {
  url: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3 bg-white border-2 border-gray-200 rounded-lg shadow-md"
    >
      <div className="relative">
        <img 
          src={url} 
          alt="QR Code for two-factor authentication" 
          className="w-[200px] h-[200px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
            className="w-16 h-16 rounded-full bg-blue-500/10"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default QRCode;
