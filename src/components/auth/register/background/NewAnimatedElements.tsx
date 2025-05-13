
import React from 'react';
import { motion } from 'framer-motion';

const NewAnimatedElements: React.FC = () => {
  return (
    <>
      {/* New enhanced animated elements */}
      <motion.div 
        className="absolute top-1/2 right-20 w-28 h-28 rounded-full bg-gradient-to-r from-pink-300 to-rose-400 blur-3xl opacity-25 orbit"
        animate={{
          x: [0, 40, 0, -40, 0],
          y: [0, 40, 0, -40, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
          opacity: [0.15, 0.25, 0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-20 w-36 h-36 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 blur-3xl opacity-15 blur-breathe"
        animate={{
          scale: [1, 1.4, 0.8, 1.2, 1],
          opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
          filter: ["blur(40px)", "blur(60px)", "blur(50px)", "blur(70px)", "blur(40px)"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </>
  );
};

export default NewAnimatedElements;
