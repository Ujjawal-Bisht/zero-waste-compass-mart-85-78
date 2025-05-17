
import React from 'react';
import { motion } from 'framer-motion';
import NotificationCenter from '@/components/NotificationCenter';

const NotificationSection: React.FC = () => {
  return (
    <motion.div
      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="navbar-item notification-bell"
    >
      <NotificationCenter />
    </motion.div>
  );
};

export default NotificationSection;
