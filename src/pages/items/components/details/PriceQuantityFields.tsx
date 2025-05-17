
import React, { useEffect, useRef } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import { motion } from 'framer-motion';

interface PriceQuantityFieldsProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  isPriceUpdated?: boolean;
  isQuantityUpdated?: boolean;
  dynamicPricingEnabled?: boolean;
}

const PriceQuantityFields: React.FC<PriceQuantityFieldsProps> = ({ 
  form, 
  isPriceUpdated = false,
  isQuantityUpdated = false,
  dynamicPricingEnabled = false
}) => {
  const originalPriceRef = useRef<HTMLInputElement>(null);
  const currentPriceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  // Apply animation to original price field
  useEffect(() => {
    if (isPriceUpdated && originalPriceRef.current) {
      const input = originalPriceRef.current;
      input.classList.add('form-field-success');
      
      const timer = setTimeout(() => {
        input.classList.remove('form-field-success');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isPriceUpdated]);

  // Apply animation to current price field
  useEffect(() => {
    if (isPriceUpdated && currentPriceRef.current) {
      const input = currentPriceRef.current;
      input.classList.add('form-field-success');
      
      const timer = setTimeout(() => {
        input.classList.remove('form-field-success');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isPriceUpdated]);

  // Apply animation to quantity field
  useEffect(() => {
    if (isQuantityUpdated && quantityRef.current) {
      const input = quantityRef.current;
      input.classList.add('form-field-success');
      
      const timer = setTimeout(() => {
        input.classList.remove('form-field-success');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isQuantityUpdated]);

  // Animation variants for the grid
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price</FormLabel>
              <FormControl>
                <Input 
                  placeholder="0.00" 
                  type="number" 
                  {...field} 
                  className="transition-all hover:border-zwm-primary focus:border-zwm-primary" 
                  ref={originalPriceRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="currentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Price</FormLabel>
              <FormControl>
                <Input 
                  placeholder="0.00" 
                  type="number" 
                  {...field} 
                  className="transition-all hover:border-zwm-primary focus:border-zwm-primary" 
                  ref={currentPriceRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input 
                  placeholder="1" 
                  type="number" 
                  {...field} 
                  className="transition-all hover:border-zwm-primary focus:border-zwm-primary" 
                  ref={quantityRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </motion.div>
  );
};

export default PriceQuantityFields;
