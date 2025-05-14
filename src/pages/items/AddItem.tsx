
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ItemForm from './components/ItemForm';
import { Sparkles, Package, Zap } from 'lucide-react';
import { toast } from 'sonner';

const AddItem: React.FC = () => {
  const [showFloatingElements, setShowFloatingElements] = useState(true);

  // Hide floating elements after form interaction
  const handleFormInteraction = () => {
    setShowFloatingElements(false);
  };

  return (
    <div className="relative">
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
            className="absolute -bottom-10 right-20 text-purple-500/20 pointer-events-none"
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
          className="mb-8"
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
            className="inline-block rounded-lg p-1 mb-2"
          >
            <h1 className="text-3xl font-bold bg-white rounded-md p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
              Add New Item
            </h1>
          </motion.div>
          <motion.p 
            className="text-muted-foreground ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            List an item for donation or discount
          </motion.p>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2 w-0"
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm border card-hover relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-spin-slow [animation-duration:4s]" style={{ borderRadius: '0.5rem' }} />
          </div>
          
          <div className="relative">
            <ItemForm />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddItem;
