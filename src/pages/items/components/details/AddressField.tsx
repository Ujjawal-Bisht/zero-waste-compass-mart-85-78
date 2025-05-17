
import React, { useEffect, useRef } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import { MapPin } from 'lucide-react';

interface AddressFieldProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  isUpdated?: boolean;
}

const AddressField: React.FC<AddressFieldProps> = ({ form, isUpdated = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Add animation when field is updated (e.g., from barcode scan)
  useEffect(() => {
    if (isUpdated && inputRef.current) {
      const input = inputRef.current;
      input.classList.add('form-field-success');
      
      // Remove the animation class after animation completes
      const timer = setTimeout(() => {
        input.classList.remove('form-field-success');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isUpdated]);

  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Enter address" 
                {...field} 
                className="pl-10 transition-all hover:border-zwm-primary focus:border-zwm-primary" 
                ref={inputRef}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressField;
