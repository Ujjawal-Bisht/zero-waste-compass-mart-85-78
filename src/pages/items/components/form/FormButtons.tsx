
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FormButtonsProps {
  isSubmitting: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ isSubmitting }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100 mt-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate('/seller/products')}
        disabled={isSubmitting}
        className="transition-all hover:bg-gray-100 px-6"
      >
        Cancel
      </Button>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 h-11 transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding Item...
            </span>
          ) : 'Add Item'}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FormButtons;
