
import React from 'react';
import { motion } from 'framer-motion';

const AddItemHeader: React.FC = () => {
  return (
    <motion.div 
      className="mb-8 text-center"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
    >
      <motion.div
        className="mb-3 mx-auto inline-flex justify-center bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 rounded-lg shadow-md"
        whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)' }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Add New Item
        </h1>
      </motion.div>
      
      <motion.p 
        className="text-indigo-700 text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Add products for donation or discount sale to help reduce waste
      </motion.p>
      
      <div className="clean-divider mt-3"></div>
    </motion.div>
  );
};

export default AddItemHeader;
