
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';

interface AddressFieldProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
}

const AddressField: React.FC<AddressFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <Input 
              placeholder="Enter address" 
              {...field} 
              className="transition-all hover:border-zwm-primary focus:border-zwm-primary" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressField;
