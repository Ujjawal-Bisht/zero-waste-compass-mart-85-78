
import React from 'react';
import { motion } from 'framer-motion';

const RadialGradient: React.FC = () => {
  return (
    <motion.div
      className="absolute w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 2 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-blue-100/10 to-transparent gradient-shift"
        animate={{
          opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </motion.div>
  );
};

export default RadialGradient;
