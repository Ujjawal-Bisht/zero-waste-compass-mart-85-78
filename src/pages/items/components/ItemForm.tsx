
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
}

const ItemForm: React.FC<ItemFormProps> = ({ onBarcodeDetected }) => {
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
      
      // Navigate back to products page
      navigate('/seller/products');
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
        staggerChildren: 0.1
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={formVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={sectionVariants} className="space-y-6">
            <ItemDetailsSection form={form} handleBarcodeDetected={handleBarcodeDetected} />
            <ExpiryDatePicker form={form} />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <DescriptionImageSection 
              form={form}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-end space-x-4 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/seller/products')}
            disabled={isSubmitting}
            className="transition-all hover:bg-gray-100"
          >
            Cancel
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="submit" 
              className="zwm-gradient-hover transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">Adding...</span>
                  <span className="loading-dots"></span>
                </>
              ) : 'Add Item'}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </Form>
  );
};

export default ItemForm;
