
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ItemForm from './components/ItemForm';
import { Sparkles, Package, Zap, ShoppingBag, TagIcon, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const AddItem: React.FC = () => {
  const [showFloatingElements, setShowFloatingElements] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Hide floating elements after form interaction
  const handleFormInteraction = () => {
    setShowFloatingElements(false);
  };

  // Handle successful form submission
  const handleFormSuccess = () => {
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000); // Reset after animation
  };

  return (
    <div className="relative min-h-[85vh] pb-10">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
      
      {/* Decorative floating elements */}
      {showFloatingElements && (
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
      )}

      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={handleFormInteraction}
      >
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <motion.div
            initial={{ background: "linear-gradient(90deg, #3b82f6, #6366f1)" }}
            animate={{ 
              background: [
                "linear-gradient(90deg, #3b82f6, #6366f1)",
                "linear-gradient(90deg, #6366f1, #8b5cf6)", 
                "linear-gradient(90deg, #8b5cf6, #3b82f6)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="inline-block rounded-lg p-1 mb-3"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-white rounded-md p-2 px-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Add New Item
            </h1>
          </motion.div>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Add products for donation or discount sale to help reduce waste
          </motion.p>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mt-4 w-0 mx-auto"
            animate={{ width: "120px" }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          />
        </motion.div>

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
          
          {/* Success overlay - shown only after form submission */}
          {formSubmitted && (
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
          )}
          
          <div className="relative">
            <ItemForm onFormSuccess={handleFormSuccess} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddItem;
