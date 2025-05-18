import { useState, useEffect } from 'react';
import { barcodeDatabase } from '../../data/barcodeDatabase';
import { toast } from 'sonner';
import { Item } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

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
            new Date().toISOString().split('T')[0],
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
      
      // If not in local DB, check Supabase database
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('barcode', barcode)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching product from database:', error);
      }
      
      if (data) {
        const item: Item = {
          id: data.id,
          name: data.name,
          description: data.description || '',
          category: data.category as any,
          imageUrl: (data as any).image_url || 'https://via.placeholder.com/150',
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 7 days
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          status: 'available',
          userId: data.seller_id,
          userName: 'Seller',
          userPhoto: null,
          location: {
            address: 'Store Location',
            lat: 0,
            lng: 0,
          },
          quantity: data.stock_quantity || 1,
          originalPrice: data.price * 1.2, // Example: original price is 20% higher
          currentPrice: data.price,
          dynamicPricingEnabled: false,
        };
        setProductDetails(item);
        toast.success(`Found product: ${data.name}`);
        return item;
      }
      
      // If not found in either database, try external API
      try {
        // Simulate API call to external barcode database
        console.log(`Simulating API call for barcode: ${barcode}`);
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // For simulation purposes, create a mock product if barcode starts with '8'
        if (barcode.startsWith('8')) {
          const mockProduct: Item = {
            id: uuidv4(),
            name: `Product ${barcode.substring(0, 6)}`,
            description: `This is a product with barcode ${barcode}`,
            category: 'food',
            imageUrl: 'https://via.placeholder.com/150',
            expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
            quantity: 1,
            originalPrice: Math.floor(Math.random() * 200) + 50,
            currentPrice: Math.floor(Math.random() * 100) + 50,
            dynamicPricingEnabled: false,
          };
          
          setProductDetails(mockProduct);
          toast.success(`Found external product: ${mockProduct.name}`);
          return mockProduct;
        }
        
      } catch (externalError) {
        console.error('Error fetching from external API:', externalError);
      }
      
      // If not in local DB or external API, return null
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
