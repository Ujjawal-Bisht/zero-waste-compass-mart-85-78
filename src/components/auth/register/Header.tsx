
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-center mb-6"
    >
      <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
      <motion.div 
        className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
        animate={{
          width: ["0%", "100%", "50%"],
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
      />
      <p className="text-center mt-2 text-gray-600">
        Join Zero Waste Mart to buy and sell surplus goods
      </p>
    </motion.div>
  );
};

export default Header;
