
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ItemCategory } from '@/types';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../schemas/itemFormSchema';
import { BarcodeScanner } from './BarcodeScanner';
import { IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

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
  // Animation variants for staggered children
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
      <motion.div variants={itemVariants} className="flex items-center gap-2">
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
      </motion.div>

      <motion.div variants={itemVariants}>
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
      </motion.div>

      {/* Address input */}
      <motion.div variants={itemVariants}>
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
      </motion.div>

      {/* Price and quantity inputs */}
      <PriceQuantityInputs form={form} />
    </motion.div>
  );
};

// Price and quantity inputs section
const PriceQuantityInputs: React.FC<{ form: UseFormReturn<ItemFormValues, any, undefined> }> = ({ form }) => {
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

export default ItemDetailsSection;
