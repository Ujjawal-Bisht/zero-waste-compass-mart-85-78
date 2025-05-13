
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const titleVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };

  const underlineVariants = {
    initial: { width: "0%" },
    animate: { 
      width: ["0%", "100%", "50%"],
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="text-center mb-6"
    >
      <motion.h1 
        className="text-2xl font-bold mb-2"
        variants={titleVariants}
        whileHover="hover"
      >
        Create an Account
      </motion.h1>
      
      <motion.div 
        className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
        variants={underlineVariants}
      />
      
      <motion.p 
        className="text-center mt-2 text-gray-600"
        variants={textVariants}
      >
        Join Zero Waste Mart to buy and sell surplus goods
      </motion.p>
    </motion.div>
  );
};

export default Header;
