
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../schemas/itemFormSchema';
import { motion } from 'framer-motion';
import ItemNameField from './details/ItemNameField';
import CategoryField from './details/CategoryField';
import AddressField from './details/AddressField';
import PriceQuantityFields from './details/PriceQuantityFields';

interface ItemDetailsSectionProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  handleBarcodeDetected: (barcode: string) => void;
}

const ItemDetailsSection: React.FC<ItemDetailsSectionProps> = ({ form, handleBarcodeDetected }) => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <ItemNameField form={form} handleBarcodeDetected={handleBarcodeDetected} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CategoryField form={form} />
      </motion.div>

      {/* Address input */}
      <motion.div variants={itemVariants}>
        <AddressField form={form} />
      </motion.div>

      {/* Price and quantity inputs */}
      <PriceQuantityFields form={form} />
    </motion.div>
  );
};

export default ItemDetailsSection;
