
import React from 'react';
import { motion } from 'framer-motion';

const AdditionalElements: React.FC = () => {
  return (
    <>
      {/* Additional enhanced animated elements */}
      <motion.div 
        className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 blur-3xl opacity-15 radiance"
        animate={{
          scale: [1, 1.3, 0.8, 1.2, 1],
          rotate: [0, 15, -15, 20, 0],
          opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 3,
        }}
      />
      <motion.div 
        className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 blur-3xl opacity-20 particle-float"
        animate={{
          y: [0, -30, 20, -10, 0],
          rotate: [0, 20, -20, 10, 0],
          scale: [1, 1.2, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 5,
        }}
      />
    </>
  );
};

export default AdditionalElements;
