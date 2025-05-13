
import React from 'react';
import { motion } from 'framer-motion';

const IntenseAnimations: React.FC = () => {
  return (
    <>
      {/* Additional animated elements with more intensity */}
      <motion.div 
        className="absolute top-1/4 left-1/3 w-44 h-44 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 blur-3xl opacity-15 spiral-float"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 0.7, 1.2, 1],
          filter: ["blur(50px)", "blur(70px)", "blur(60px)", "blur(80px)", "blur(50px)"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 7,
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 blur-3xl opacity-15 radiance"
        animate={{
          y: [0, -50, 30, -20, 0],
          x: [0, 40, -30, 20, 0],
          rotate: [0, 30, -20, 10, 0],
          scale: [1, 1.2, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </>
  );
};

export default IntenseAnimations;
