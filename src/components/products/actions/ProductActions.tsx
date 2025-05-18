
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, FileDown, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Item } from '@/types';
import { exportProducts } from '@/utils/exportUtils';

interface ProductActionsProps {
  products: Item[];
  onAddProduct: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ products, onAddProduct }) => {
  const handleExportProducts = () => {
    exportProducts(products);
    toast({
      title: "Products exported",
      description: "CSV file has been downloaded",
      duration: 3000
    });
  };

  const handleImportProducts = () => {
    // This would open a file picker in a real app
    toast({
      title: "Import functionality",
      description: "This would open a file picker to import products",
      duration: 3000
    });
  };

  return (
    <motion.div
      className="flex gap-3"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button variant="outline" onClick={handleImportProducts} className="button-shimmer flex items-center">
          <FileUp className="mr-2 h-4 w-4" /> Import
        </Button>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button variant="outline" onClick={handleExportProducts} className="button-shimmer flex items-center">
          <FileDown className="mr-2 h-4 w-4" /> Export
        </Button>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={onAddProduct} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 button-shimmer text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ProductActions;
