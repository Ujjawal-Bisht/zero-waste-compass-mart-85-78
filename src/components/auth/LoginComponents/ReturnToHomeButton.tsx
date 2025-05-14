
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ReturnToHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="mt-6 flex justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors home-button button-bounce home-button-3d"
      >
        <ArrowLeft className="h-4 w-4 home-button-icon rotate-on-hover" />
        Return to Home Page
      </Button>
    </motion.div>
  );
};

export default ReturnToHomeButton;
