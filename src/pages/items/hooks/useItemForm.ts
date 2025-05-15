
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { itemFormSchema, ItemFormValues } from '../schemas/itemFormSchema';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Item } from '@/types';
import { barcodeDatabase } from '../data/barcodeDatabase';

interface UseItemFormProps {
  onBarcodeDetected?: (barcode: string, item: any) => void;
  onFormSuccess?: () => void;
}

export const useItemForm = ({ onBarcodeDetected, onFormSuccess }: UseItemFormProps = {}) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);
  const [updatedFields, setUpdatedFields] = useState<string[]>([]);
  
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

  // Watch for field changes to update animations
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && type === 'change') {
        setUpdatedFields(prev => {
          if (prev.includes(name)) return prev;
          
          // Add the field to the updated list and remove it after animation completes
          const newFields = [...prev, name];
          setTimeout(() => {
            setUpdatedFields(current => current.filter(field => field !== name));
          }, 1500); // Animation duration
          
          return newFields;
        });
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleBarcodeDetected = (barcode: string) => {
    if (barcode && barcodeDatabase[barcode]) {
      const item = barcodeDatabase[barcode];
      const fieldsToUpdate: string[] = [];
      
      // Calculate expiry date based on expiryDays if present
      if (item.expiryDays) {
        const date = new Date();
        date.setDate(date.getDate() + item.expiryDays);
        
        // Set expiry date in the form as Date object
        setTimeout(() => {
          form.setValue('expiryDate', date);
          fieldsToUpdate.push('expiryDate');
        }, 600);
      }
      
      // Animate the form filling with a slight delay between fields
      setTimeout(() => {
        form.setValue('name', item.name);
        fieldsToUpdate.push('name');
      }, 100);
      
      setTimeout(() => {
        form.setValue('description', item.description);
        fieldsToUpdate.push('description');
      }, 200);
      
      setTimeout(() => {
        form.setValue('category', item.category as any);
        fieldsToUpdate.push('category');
      }, 300);
      
      setTimeout(() => {
        form.setValue('originalPrice', item.originalPrice);
        fieldsToUpdate.push('originalPrice');
      }, 400);
      
      setTimeout(() => {
        form.setValue('currentPrice', item.currentPrice);
        fieldsToUpdate.push('currentPrice');
        
        // Update the field animations after all fields are set
        setUpdatedFields(fieldsToUpdate);
      }, 500);
      
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

  return {
    form,
    imagePreview,
    setImagePreview,
    isSubmitting,
    handleBarcodeDetected,
    onSubmit,
    updatedFields
  };
};
