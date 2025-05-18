
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
        <div className="flex flex-col items-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Package className="h-12 w-12 text-gray-300 mb-2" />
          </motion.div>
          <p className="text-gray-500 mb-2">No products found</p>
          <Button variant="link" onClick={handleAddProduct} className="mt-2">
            Add your first product
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default EmptyProductsView;
