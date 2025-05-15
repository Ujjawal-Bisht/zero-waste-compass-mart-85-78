
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles, Zap, ShoppingBag, TagIcon } from 'lucide-react';

interface FloatingElementsProps {
  showFloatingElements: boolean;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ showFloatingElements }) => {
  if (!showFloatingElements) return null;
  
  return (
    <>
      <motion.div 
        className="absolute -top-10 -left-10 text-blue-500/20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.7, 0.3], 
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Package size={80} />
      </motion.div>
      
      <motion.div 
        className="absolute top-20 right-10 text-orange-500/20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.4, 0.8, 0.4], 
          scale: [0.9, 1.1, 0.9],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      >
        <Sparkles size={60} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 -left-5 text-purple-500/20 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3], 
          scale: [0.7, 1.3, 0.7],
          rotate: [0, 20, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      >
        <Zap size={70} />
      </motion.div>
      
      <motion.div 
        className="absolute -bottom-10 right-20 text-emerald-500/20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.7, 0.3], 
          scale: [0.8, 1.1, 0.8],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 8.5, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1.5
        }}
      >
        <TagIcon size={65} />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 -left-5 text-indigo-500/20 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.2, 0.5, 0.2], 
          scale: [0.6, 1.2, 0.6],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 7.5, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      >
        <ShoppingBag size={75} />
      </motion.div>
    </>
  );
};

export default FloatingElements;
