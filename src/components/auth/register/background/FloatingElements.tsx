
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  return (
    <>
      {/* Enhanced original floating elements with more intense animations */}
      <motion.div 
        className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 blur-3xl opacity-20 glow-pulse"
        animate={{
          y: [0, 40, -20, 30, 0],
          x: [0, 30, -20, 10, 0],
          scale: [1, 1.1, 0.9, 1.2, 1],
          rotate: [0, 10, -10, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div 
        className="absolute -bottom-32 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl opacity-20 spiral-float"
        animate={{
          y: [0, -50, 20, -30, 0],
          x: [0, -40, 20, -10, 0],
          scale: [1, 1.2, 0.8, 1.1, 1],
          rotate: [0, -20, 40, -10, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2,
        }}
      />
      <motion.div 
        className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-gradient-to-r from-green-300 to-emerald-400 blur-3xl opacity-10 color-shift"
        animate={{
          scale: [1, 1.3, 0.9, 1.2, 1],
          rotate: [0, 30, -20, 10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </>
  );
};

export default FloatingElements;
