
import React from 'react';
import { motion } from 'framer-motion';
import SecurityForm from '@/pages/profile/SecurityForm';
import TwoFactorSetup from '@/components/auth/two-factor/TwoFactorSetup';

const SecuritySection: React.FC = () => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 profile-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SecurityForm />
        </div>
        <div>
          <TwoFactorSetup />
        </div>
      </div>
    </motion.div>
  );
};

export default SecuritySection;
