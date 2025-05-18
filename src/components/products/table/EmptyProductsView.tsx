
import React from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface EmptyProductsViewProps {
  handleAddProduct: () => void;
}

const EmptyProductsView: React.FC<EmptyProductsViewProps> = ({ handleAddProduct }) => {
  return (
    <tr>
      <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
        <div className="flex flex-col items-center py-10">
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: 1, 
              rotate: [0, -10, 10, -5, 0],
              y: [0, -10, 0] 
            }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              bounce: 0.5 
            }}
            className="bg-gray-50 p-4 rounded-full mb-3"
          >
            <Package className="h-16 w-16 text-gray-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-lg text-gray-600 mb-2">No products found</p>
            <p className="text-sm text-gray-500 mb-5">Start by adding your first product</p>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleAddProduct} 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 button-glow"
              >
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="flex items-center"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Add your first product
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </td>
    </tr>
  );
};

export default EmptyProductsView;
