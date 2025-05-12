
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ItemCategory } from '@/types';
import { ImageUploader } from './ImageUploader';
import { BarcodeScanner } from './BarcodeScanner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  category: z.enum(['food', 'clothing', 'electronics', 'furniture', 'household', 'books', 'toys', 'other'] as const),
  expiryDate: z.date({
    required_error: 'Expiry date is required.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  originalPrice: z.number().optional(),
  currentPrice: z.number().optional(),
  quantity: z.number().optional(),
});

const foodCategories: { value: ItemCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'household', label: 'Household' },
  { value: 'other', label: 'Other' },
];

// Mock barcode data for demonstration - this could be moved to a separate file
export const barcodeDatabase = {
  '9780140157376': {
    name: 'Organic Milk',
    description: 'Fresh organic milk from local farms',
    category: 'food',
    originalPrice: 4.99,
    currentPrice: 3.99,
  },
  '7350053850019': {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread',
    category: 'food',
    originalPrice: 3.49,
    currentPrice: 2.99,
  },
  '5901234123457': {
    name: 'Bananas (Bunch)',
    description: 'Organic fair trade bananas',
    category: 'food',
    originalPrice: 2.99,
    currentPrice: 2.49,
  }
};

interface ItemFormProps {
  onBarcodeDetected?: (barcode: string, item: any) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onBarcodeDetected }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      originalPrice: undefined,
      currentPrice: undefined,
      quantity: 1,
    },
  });

  const handleBarcodeDetected = (barcode: string) => {
    if (barcode && barcodeDatabase[barcode as keyof typeof barcodeDatabase]) {
      const item = barcodeDatabase[barcode as keyof typeof barcodeDatabase];
      
      form.setValue('name', item.name);
      form.setValue('description', item.description);
      form.setValue('category', item.category as any);
      form.setValue('originalPrice', item.originalPrice);
      form.setValue('currentPrice', item.currentPrice);
      
      toast.success(`Scanned item: ${item.name}`, {
        description: 'Item details have been filled automatically'
      });
      
      if (onBarcodeDetected) {
        onBarcodeDetected(barcode, item);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      console.log('Form values:', values);
      console.log('Image:', imagePreview);
      
      // Show success message
      toast.success('Item added successfully');
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal transition-all",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter a detailed description of the item" 
                      className="h-32 transition-all"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageUploader 
              imagePreview={imagePreview} 
              setImagePreview={setImagePreview} 
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard')}
            disabled={isSubmitting}
            className="transition-all hover:bg-gray-100"
          >
            Cancel
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="zwm-gradient-hover transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Item'}
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
};

export default ItemForm;
