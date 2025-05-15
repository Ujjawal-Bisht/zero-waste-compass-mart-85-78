
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingElements from './components/decorative/FloatingElements';
import AddItemHeader from './components/header/AddItemHeader';
import FormCard from './components/FormCard';

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
      <FloatingElements showFloatingElements={showFloatingElements} />

      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={handleFormInteraction}
      >
        {/* Page header */}
        <AddItemHeader />

        {/* Form card with success overlay */}
        <FormCard 
          formSubmitted={formSubmitted} 
          onFormSuccess={handleFormSuccess} 
        />
      </motion.div>
    </div>
  );
};

export default AddItem;
