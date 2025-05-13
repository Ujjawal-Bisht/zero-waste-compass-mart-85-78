
import React from 'react';
import { motion } from 'framer-motion';

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-0 shadow-xl overflow-hidden bg-white rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 z-0"></div>
        <div className="relative z-10 px-6 py-8 md:p-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default CardContainer;
