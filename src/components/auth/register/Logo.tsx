
import React from 'react';
import { motion } from 'framer-motion';
import { Logo as ZeroWasteLogo } from '@/components/ui/logo';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="flex justify-center mb-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <ZeroWasteLogo size="lg" showText={true} animated={true} />
      </motion.div>
    </motion.div>
  );
};

export default Logo;
