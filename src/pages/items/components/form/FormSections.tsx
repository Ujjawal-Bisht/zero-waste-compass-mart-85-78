
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import ItemDetailsSection from '../ItemDetailsSection';
import ExpiryDatePicker from '../ExpiryDatePicker';
import DescriptionImageSection from '../DescriptionImageSection';

interface FormSectionsProps {
  form: UseFormReturn<ItemFormValues>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  handleBarcodeDetected: (barcode: string) => void;
  updatedFields?: string[];
}

const FormSections: React.FC<FormSectionsProps> = ({ 
  form, 
  imagePreview, 
  setImagePreview, 
  handleBarcodeDetected,
  updatedFields = []
}) => {
  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        duration: 0.5
      } 
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={formVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={sectionVariants} className="space-y-6 form-stagger">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-2 inline-block"></span>
            Item Details
          </h3>
          <ItemDetailsSection 
            form={form} 
            handleBarcodeDetected={handleBarcodeDetected} 
            updatedFields={updatedFields}
          />
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-700 mb-2 flex items-center">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-2 inline-block"></span>
            Expiry Date
          </h3>
          <ExpiryDatePicker form={form} isUpdated={updatedFields.includes('expiryDate')} />
        </div>
      </motion.div>

      <motion.div variants={sectionVariants}>
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 shadow-sm h-full">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full mr-2 inline-block"></span>
            Description & Image
          </h3>
          <DescriptionImageSection 
            form={form}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            isDescriptionUpdated={updatedFields.includes('description')}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FormSections;
