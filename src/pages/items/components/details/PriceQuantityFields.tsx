
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import { IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

interface PriceQuantityFieldsProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
}

const PriceQuantityFields: React.FC<PriceQuantityFieldsProps> = ({ form }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <motion.div 
        className="grid grid-cols-2 gap-4" 
        variants={itemVariants}
      >
        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price (₹)</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    <IndianRupee size={16} />
                  </span>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00" 
                    onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} 
                    value={field.value === undefined ? '' : field.value}
                    className="pl-8 transition-all hover:border-zwm-primary focus:border-zwm-primary"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discounted Price (₹)</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    <IndianRupee size={16} />
                  </span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} 
                    value={field.value === undefined ? '' : field.value}
                    className="pl-8 transition-all hover:border-zwm-primary focus:border-zwm-primary" 
                  />
                </div>
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
                  type="number" 
                  min="1" 
                  placeholder="1" 
                  onChange={e => field.onChange(parseInt(e.target.value) || undefined)} 
                  value={field.value === undefined ? '' : field.value}
                  className="transition-all hover:border-zwm-primary focus:border-zwm-primary" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </>
  );
};

export default PriceQuantityFields;
