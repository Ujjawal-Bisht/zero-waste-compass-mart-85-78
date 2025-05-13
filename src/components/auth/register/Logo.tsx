
import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="flex justify-center mb-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}>
        <div className="h-16 w-16 rounded-full zwm-gradient flex items-center justify-center text-white font-bold text-2xl mb-2">ZW</div>
      </motion.div>
    </motion.div>
  );
};

export default Logo;
