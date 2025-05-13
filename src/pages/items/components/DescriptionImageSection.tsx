
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from './ImageUploader';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../schemas/itemFormSchema';
import { motion } from 'framer-motion';

interface DescriptionImageSectionProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const DescriptionImageSection: React.FC<DescriptionImageSectionProps> = ({ 
  form, 
  imagePreview, 
  setImagePreview 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter a detailed description of the item" 
                  className="h-32 transition-all hover:border-zwm-primary focus:border-zwm-primary"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ImageUploader 
          imagePreview={imagePreview} 
          setImagePreview={setImagePreview} 
        />
      </motion.div>
    </motion.div>
  );
};

export default DescriptionImageSection;
