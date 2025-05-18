
import { useState, useEffect } from 'react';
import { Item, ItemCategory } from '@/types';
import { useLocalStorage } from '@/pages/items/hooks/useLocalStorage';

export const useProductManagement = () => {
  // Use local storage to retrieve saved products
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);
  const [products, setProducts] = useState<Item[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Initialize with sample products if no saved products
  useEffect(() => {
    const sampleProducts: Item[] = [
      {
        id: '1',
        name: 'Organic Bananas',
        description: 'Bundle of organic bananas, slightly ripened',
        category: 'food',
        imageUrl: 'https://via.placeholder.com/150',
        expiryDate: '2023-06-01',
        createdAt: '2023-05-15',
        updatedAt: '2023-05-15',
        status: 'available',
        userId: 'seller123',
        userName: 'Demo Business',
        userPhoto: null,
        location: {
          address: '123 Main St',
          lat: 40.7128,
          lng: -74.006,
        },
        quantity: 20,
        originalPrice: 399.99,
        currentPrice: 299.99,
        dynamicPricingEnabled: true,
      },
      {
        id: '2',
        name: 'T-shirts Pack',
        description: 'Pack of 5 plain t-shirts, various sizes',
        category: 'clothing',
        imageUrl: 'https://via.placeholder.com/150',
        expiryDate: '2024-05-15',
        createdAt: '2023-05-10',
        updatedAt: '2023-05-10',
        status: 'available',
        userId: 'seller123',
        userName: 'Demo Business',
        userPhoto: null,
        location: {
          address: '123 Main St',
          lat: 40.7128,
          lng: -74.006,
        },
        quantity: 10,
        originalPrice: 3499.00,
        currentPrice: 2499.00,
        dynamicPricingEnabled: false,
      },
    ];
    
    // Combine sample products with saved products
    const allProducts = [...sampleProducts];
    if (savedProducts && savedProducts.length > 0) {
      savedProducts.forEach(product => {
        // Add only if not already in the list
        if (!allProducts.some(p => p.id === product.id)) {
          allProducts.push(product);
        }
      });
    }
    
    setProducts(allProducts);
  }, [savedProducts]);

  const handleFilterByCategory = (category: ItemCategory | null) => {
    if (category === activeFilter) {
      setActiveFilter(null); // Clear filter if clicking the active one
    } else {
      setActiveFilter(category);
    }
  };
  
  // Get filtered products
  const filteredProducts = activeFilter 
    ? products.filter(p => p.category === activeFilter) 
    : products;

  return {
    products,
    filteredProducts,
    activeFilter,
    handleFilterByCategory
  };
};
