
import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const PageContainer: React.FC = () => {
  return (
    <motion.main 
      className="p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Outlet />
    </motion.main>
  );
};

export default PageContainer;
