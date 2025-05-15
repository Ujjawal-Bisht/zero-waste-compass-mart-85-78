
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '@/types';
import { getProductByBarcode } from '../../data/barcodeDatabase';
import { useLocalStorage } from '../useLocalStorage';

export const useProductManagement = () => {
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);

  const addBarcodeProduct = (barcode: string) => {
    const product = getProductByBarcode(barcode);
    if (!product) return;

    // Check if product already exists
    const existingProduct = savedProducts.find(p => 
      p.name === product.name && 
      p.originalPrice === product.originalPrice
    );

    if (existingProduct) {
      // Update quantity if product exists
      const updatedProducts = savedProducts.map(p => {
        if (p.name === product.name && p.originalPrice === product.originalPrice) {
          return {
            ...p,
            quantity: (p.quantity || 0) + (product.quantity || 1)
          };
        }
        return p;
      });
      setSavedProducts(updatedProducts);
      toast.success(`Updated quantity of ${product.name}`);
    } else {
      // Create new product
      const newItem: Item = {
        id: uuidv4(),
        name: product.name,
        description: product.description || "",
        category: product.category,
        imageUrl: product.imageUrl || "https://via.placeholder.com/150",
        expiryDate: product.expiryDays ? 
          new Date(Date.now() + product.expiryDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
          undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "available",
        userId: "user123",
        userName: "Current User",
        userPhoto: null,
        location: {
          address: "Current Location",
          lat: 0,
          lng: 0,
        },
        quantity: product.quantity || 1,
        originalPrice: product.originalPrice,
        currentPrice: product.currentPrice,
        dynamicPricingEnabled: true,
      };

      setSavedProducts([...savedProducts, newItem]);
      toast.success(`Added ${product.name} to your inventory!`);
    }
  };

  return {
    savedProducts,
    setSavedProducts,
    addBarcodeProduct
  };
};
