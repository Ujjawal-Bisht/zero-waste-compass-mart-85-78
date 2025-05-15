
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import { BarcodeScanner } from '../BarcodeScanner';

interface ItemNameFieldProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  handleBarcodeDetected: (barcode: string) => void;
}

const ItemNameField: React.FC<ItemNameFieldProps> = ({ form, handleBarcodeDetected }) => {
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
