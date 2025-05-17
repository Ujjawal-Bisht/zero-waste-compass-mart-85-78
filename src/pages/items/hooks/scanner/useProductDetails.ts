
import { useState, useEffect } from 'react';
import { barcodeDatabase } from '../../data/barcodeDatabase';
import { toast } from 'sonner';
import { Item } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useProductDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<Item | null>(null);
  
  const fetchProductByBarcode = async (barcode: string): Promise<Item | null> => {
    setIsLoading(true);
    
    try {
      // First check our local database
      const localProduct = barcodeDatabase[barcode];
      
      if (localProduct) {
        // Convert barcode database format to Item format
        const item: Item = {
          id: uuidv4(),
          name: localProduct.name,
          description: localProduct.description || '',
          category: localProduct.category,
          imageUrl: localProduct.imageUrl || 'https://via.placeholder.com/150',
          expiryDate: localProduct.expiryDays ? 
            new Date(Date.now() + localProduct.expiryDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
            undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'available',
          userId: 'current-user',
          userName: 'Current User',
          userPhoto: null,
          location: {
            address: 'Current Location',
            lat: 0,
            lng: 0,
          },
          quantity: localProduct.quantity || 1,
          originalPrice: localProduct.originalPrice,
          currentPrice: localProduct.currentPrice,
          dynamicPricingEnabled: true,
        };
        
        setProductDetails(item);
        toast.success(`Found product: ${localProduct.name}`);
        return item;
      }
      
      // If not in local DB, we could make an API call to an external database
      // For now, just return null as not found
      toast.error('Product not found in database', {
        description: 'Please enter details manually'
      });
      return null;
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Error fetching product details');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    productDetails,
    setProductDetails,
    fetchProductByBarcode
  };
};
