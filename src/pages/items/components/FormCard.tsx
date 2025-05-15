
import React from 'react';
import { motion } from 'framer-motion';
import ItemForm from './ItemForm';
import SuccessOverlay from './result/SuccessOverlay';

interface FormCardProps {
  formSubmitted: boolean;
  onFormSuccess: () => void;
}

const FormCard: React.FC<FormCardProps> = ({ formSubmitted, onFormSuccess }) => {
  return (
    <motion.div 
      className="bg-white/80 p-6 md:p-8 rounded-xl shadow-sm border border-indigo-100 card-hover relative overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.1)" }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 p-[1px] rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 animate-spin-slow [animation-duration:4s]" style={{ borderRadius: '0.75rem' }} />
      </div>
      
      {/* Success overlay */}
      <SuccessOverlay formSubmitted={formSubmitted} />
      
      <div className="relative">
        <ItemForm onFormSuccess={onFormSuccess} />
      </div>
    </motion.div>
  );
};

export default FormCard;
