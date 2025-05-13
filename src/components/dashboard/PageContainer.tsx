
import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const PageContainer: React.FC = () => {
  return (
    <motion.main 
      className="p-4 md:p-6 max-w-7xl mx-auto w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Outlet />
    </motion.main>
  );
};

export default PageContainer;
