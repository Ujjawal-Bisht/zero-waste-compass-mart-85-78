
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessOverlayProps {
  formSubmitted: boolean;
}

const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ formSubmitted }) => {
  if (!formSubmitted) return null;
  
  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-emerald-600/80 flex flex-col items-center justify-center z-10 success-confetti"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <CheckCircle size={80} className="text-white mb-4" />
      </motion.div>
      <motion.h2 
        className="text-white text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Item Added Successfully!
      </motion.h2>
      <motion.p
        className="text-white/90 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Your item has been added to your inventory
      </motion.p>
      
      {/* Confetti pieces */}
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
    </motion.div>
  );
};

export default SuccessOverlay;
