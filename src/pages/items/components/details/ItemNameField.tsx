
import React, { useEffect, useRef } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import { BarcodeScanner } from '../BarcodeScanner';

interface ItemNameFieldProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  handleBarcodeDetected: (barcode: string) => void;
  isUpdated?: boolean;
}

const ItemNameField: React.FC<ItemNameFieldProps> = ({ form, handleBarcodeDetected, isUpdated = false }) => {
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
    <div className="flex items-center gap-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Item Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter item name" 
                {...field} 
                className="transition-all hover:border-zwm-primary focus:border-zwm-primary" 
                ref={inputRef}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} />
    </div>
  );
};

export default ItemNameField;
