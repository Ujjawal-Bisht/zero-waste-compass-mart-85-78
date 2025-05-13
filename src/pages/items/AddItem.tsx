
import React from 'react';
import { motion } from 'framer-motion';
import ItemForm from './components/ItemForm';

const AddItem: React.FC = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Add New Item
        </h1>
        <p className="text-muted-foreground">List an item for donation or discount</p>
      </motion.div>

      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm border card-hover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <ItemForm />
      </motion.div>
    </motion.div>
  );
};

export default AddItem;
