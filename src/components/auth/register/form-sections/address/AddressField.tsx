
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddressFieldProps {
  form: UseFormReturn<any>;
  addressFieldName: string;
  isBusiness: boolean;
  itemVariants: any;
}

const AddressField: React.FC<AddressFieldProps> = ({
  form,
  addressFieldName,
  isBusiness,
  itemVariants
}) => {
  return (
    <motion.div variants={itemVariants}>
      <FormField
        control={form.control}
        name={addressFieldName}
        render={({ field }) => (
          <FormItem className="form-field-focus">
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin size={16} className="text-gray-400" />
                </div>
                <Input 
                  placeholder={isBusiness ? "123 Business Ave" : "123 Main St"} 
                  className="pl-10 input-animate" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

export default AddressField;
