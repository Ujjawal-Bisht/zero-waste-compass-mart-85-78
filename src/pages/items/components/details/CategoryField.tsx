
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ItemCategory } from '@/types';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import { motion } from 'framer-motion';

// Define the categories that can be selected
const foodCategories: { value: ItemCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'household', label: 'Household' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'other', label: 'Other' },
];

interface CategoryFieldProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
}

const CategoryField: React.FC<CategoryFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="transition-all hover:border-zwm-primary focus:border-zwm-primary">
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
  );
};

export default CategoryField;
