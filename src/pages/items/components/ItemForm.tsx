
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { itemFormSchema, ItemFormValues } from '../schemas/itemFormSchema';
import { barcodeDatabase } from '../data/barcodeDatabase';
import ItemDetailsSection from './ItemDetailsSection';
import ExpiryDatePicker from './ExpiryDatePicker';
import DescriptionImageSection from './DescriptionImageSection';

interface ItemFormProps {
  onBarcodeDetected?: (barcode: string, item: any) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onBarcodeDetected }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } else {
      toast.error("Barcode not found in database", {
        description: "This barcode is not in our system."
      });
    }
  };

  const onSubmit = async (values: ItemFormValues) => {
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
            <ItemDetailsSection form={form} handleBarcodeDetected={handleBarcodeDetected} />
            <ExpiryDatePicker form={form} />
          </div>

          <DescriptionImageSection 
            form={form}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
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
