
import React from 'react';
import { motion } from 'framer-motion';

const CosmicElements: React.FC = () => {
  return (
    <>
      {/* New animated cosmic elements */}
      <motion.div 
        className="absolute top-10 right-1/3 w-60 h-60 rounded-full bg-gradient-to-r from-green-400 to-blue-300 blur-3xl opacity-20 cosmic-spiral"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 0.8, 1.2, 1],
          opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <motion.div 
        className="absolute bottom-40 right-10 w-52 h-52 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-3xl opacity-20 quantum-pulse"
        animate={{
          scale: [1, 1.3, 0.8, 1.25, 1],
          opacity: [0.1, 0.25, 0.1, 0.2, 0.1],
          filter: ["blur(50px)", "blur(70px)", "blur(60px)", "blur(80px)", "blur(50px)"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <motion.div 
        className="absolute top-40 left-10 w-48 h-48 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 blur-3xl opacity-20 nebula-drift"
        animate={{
          x: [0, 40, -30, 20, 0],
          y: [0, -30, 40, 10, 0],
          rotate: [0, 180, 0, 360, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </>
  );
};

export default CosmicElements;
