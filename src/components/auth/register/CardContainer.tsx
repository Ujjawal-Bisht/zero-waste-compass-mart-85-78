
import React from 'react';
import { motion } from 'framer-motion';

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    >
      <div className="border-0 shadow-xl overflow-hidden bg-white rounded-xl">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 z-0"
          animate={{ 
            background: [
              "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))",
              "linear-gradient(to right, rgba(99, 102, 241, 0.05), rgba(59, 130, 246, 0.05))",
              "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10 px-6 py-8 md:p-10"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CardContainer;
