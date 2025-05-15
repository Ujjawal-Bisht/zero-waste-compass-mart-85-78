
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { itemFormSchema, ItemFormValues } from '../schemas/itemFormSchema';
import { barcodeDatabase } from '../data/barcodeDatabase';
import ItemDetailsSection from './ItemDetailsSection';
import ExpiryDatePicker from './ExpiryDatePicker';
import DescriptionImageSection from './DescriptionImageSection';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Item } from '@/types';

interface ItemFormProps {
  onBarcodeDetected?: (barcode: string, item: any) => void;
  onFormSuccess?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onBarcodeDetected, onFormSuccess }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);
  
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
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
    if (barcode && barcodeDatabase[barcode]) {
      const item = barcodeDatabase[barcode];
      
      // Calculate expiry date based on expiryDays if present
      if (item.expiryDays) {
        const date = new Date();
        date.setDate(date.getDate() + item.expiryDays);
        
        // Set expiry date in the form as Date object
        setTimeout(() => form.setValue('expiryDate', date), 600);
      }
      
      // Animate the form filling with a slight delay between fields
      setTimeout(() => form.setValue('name', item.name), 100);
      setTimeout(() => form.setValue('description', item.description), 200);
      setTimeout(() => form.setValue('category', item.category as any), 300);
      setTimeout(() => form.setValue('originalPrice', item.originalPrice), 400);
      setTimeout(() => form.setValue('currentPrice', item.currentPrice), 500);
      
      toast.success(`Scanned item: ${item.name}`, {
        description: 'Item details have been filled automatically'
      });
      
      if (onBarcodeDetected) {
        onBarcodeDetected(barcode, item);
      }
    } else {
      toast.error("Barcode not found in database", {
        description: "This barcode is not in our system."
      });
    }
  };

  const onSubmit = async (values: ItemFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Get the date string in ISO format for storage
      const expiryDateString = values.expiryDate instanceof Date 
        ? values.expiryDate.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      // Create a new item object
      const newItem: Item = {
        id: uuidv4(),
        name: values.name,
        description: values.description || '',
        category: values.category || 'other',
        imageUrl: imagePreview || 'https://via.placeholder.com/150',
        expiryDate: expiryDateString,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'available',
        userId: 'seller123', // Mock user ID
        userName: 'Demo Business',
        userPhoto: null,
        location: {
          address: values.address || '123 Main St',
          lat: 40.7128,
          lng: -74.006,
        },
        quantity: values.quantity || 1,
        originalPrice: values.originalPrice || 0,
        currentPrice: values.currentPrice || 0,
        dynamicPricingEnabled: false,
      };
      
      // Save the new item to localStorage
      setSavedProducts([...savedProducts, newItem]);
      
      // Artificial delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message with confetti effect
      toast.success('Item added successfully', {
        description: 'Your item has been added to your inventory'
      });
      
      if (onFormSuccess) {
        onFormSuccess();
      }
      
      // Navigate back to products page after delay
      setTimeout(() => navigate('/seller/products'), 2000);
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        duration: 0.5
      } 
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={formVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={sectionVariants} className="space-y-6 form-stagger">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-2 inline-block"></span>
                Item Details
              </h3>
              <ItemDetailsSection form={form} handleBarcodeDetected={handleBarcodeDetected} />
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 shadow-sm">
              <h3 className="text-lg font-semibold text-purple-700 mb-2 flex items-center">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-2 inline-block"></span>
                Expiry Date
              </h3>
              <ExpiryDatePicker form={form} />
            </div>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 shadow-sm h-full">
              <h3 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full mr-2 inline-block"></span>
                Description & Image
              </h3>
              <DescriptionImageSection 
                form={form}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/seller/products')}
            disabled={isSubmitting}
            className="transition-all hover:bg-gray-100 px-6"
          >
            Cancel
          </Button>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 h-11 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Item...
                </span>
              ) : 'Add Item'}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </Form>
  );
};

export default ItemForm;
