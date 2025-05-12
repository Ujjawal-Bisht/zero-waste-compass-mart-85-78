import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ItemCategory } from '@/types';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../schemas/itemFormSchema';
import { BarcodeScanner } from './BarcodeScanner';

// Define the categories that can be selected
const foodCategories: { value: ItemCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'household', label: 'Household' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'other', label: 'Other' },
];

interface ItemDetailsSectionProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  handleBarcodeDetected: (barcode: string) => void;
}

const ItemDetailsSection: React.FC<ItemDetailsSectionProps> = ({ form, handleBarcodeDetected }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" {...field} className="transition-all" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} />
      </div>

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="transition-all">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {foodCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Address input */}
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Enter address" {...field} className="transition-all" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Price and quantity inputs */}
      <PriceQuantityInputs form={form} />
    </div>
  );
};

// Price and quantity inputs section
const PriceQuantityInputs: React.FC<{ form: UseFormReturn<ItemFormValues, any, undefined> }> = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price (₹)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00" 
                  onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} 
                  value={field.value === undefined ? '' : field.value}
                  className="transition-all"
                />
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
                <Input 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} 
                  value={field.value === undefined ? '' : field.value}
                  className="transition-all" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
                className="transition-all" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ItemDetailsSection;
