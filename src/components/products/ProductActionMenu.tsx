import React, { useState } from 'react';
import { Item, ItemCategory } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, Pencil, Trash, Copy, Tag, 
  ShoppingBag, Eye, ArrowDownToLine, Check, 
  Zap, Gift, Printer, Bell, Download,
  FileBarChart, Share2, EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import { useLocalStorage } from '@/pages/items/hooks/useLocalStorage';
import { motion } from 'framer-motion';

interface ProductActionMenuProps {
  product: Item;
}

const ProductActionMenu: React.FC<ProductActionMenuProps> = ({ product }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(product.category);
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);

  const handleEditProduct = (productId: string) => {
    toast.info("Editing product", {
      description: `You're now editing product ${productId.substring(0, 8)}...`,
      duration: 3000,
    });
    // navigate(`/items/edit/${productId}`);
  };

  const handleViewDetails = (productId: string) => {
    toast.info("Viewing product details", {
      description: `Viewing details for product ${productId.substring(0, 8)}...`,
      duration: 3000,
    });
    // navigate(`/items/${productId}`);
  };

  const handleDuplicateProduct = (product: Item) => {
    // Create a duplicate with new ID
    const duplicatedProduct = {
      ...product,
      id: `duplicate-${Date.now()}`,
      name: `${product.name} (Copy)`,
      createdAt: new Date().toISOString()
    };
    
    // Add to saved products
    const updatedProducts = [...savedProducts, duplicatedProduct];
    setSavedProducts(updatedProducts);
    
    toast.success("Product duplicated", {
      description: `"${product.name}" has been duplicated`,
      duration: 3000,
    });
  };

  const handleChangeCategory = (newCategory: string) => {
    setSelectedCategory(newCategory);
    
    // Update the product in the local storage
    const updatedProducts = savedProducts.map(p => {
      if (p.id === product.id) {
        return { ...p, category: newCategory as ItemCategory };
      }
      return p;
    });
    
    setSavedProducts(updatedProducts);
    
    toast.success("Category updated", {
      description: `Product category changed to "${newCategory}"`,
      duration: 3000,
    });
  };

  const handleToggleVisibility = (product: Item, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'flagged' : 'available';
    
    // Update the product status in local storage
    const updatedProducts = savedProducts.map(p => {
      if (p.id === product.id) {
        return { ...p, status: newStatus as any };
      }
      return p;
    });
    
    setSavedProducts(updatedProducts);
    
    toast.success("Status updated", {
      description: `Product "${product.name}" is now ${newStatus}`,
      duration: 3000,
    });
  };

  const handleDownloadProductData = (product: Item) => {
    // Create a JSON blob
    const blob = new Blob([JSON.stringify(product, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-${product.id.substring(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Product data downloaded", {
      description: `Data for "${product.name}" has been downloaded as JSON`,
      duration: 3000,
    });
  };

  const handleAnalyticsView = (productId: string) => {
    toast.info("Analytics View", {
      description: `Viewing analytics for product ${productId.substring(0, 8)}...`,
      duration: 3000,
    });
  };

  const handleShareProduct = (product: Item) => {
    // Create a shareable link (in a real app, this would be a proper URL)
    const shareableLink = `${window.location.origin}/products/${product.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast.success("Link copied to clipboard", {
        description: `Share link for "${product.name}" copied`,
        duration: 3000,
      });
    });
  };

  const handleDeleteProduct = (productId: string) => {
    // Remove the product from local storage
    const updatedProducts = savedProducts.filter(p => p.id !== productId);
    setSavedProducts(updatedProducts);
    
    toast.error("Product deleted", {
      description: `Product has been removed`,
      duration: 3000,
    });
  };

  const handlePromoteProduct = (product: Item) => {
    toast.success("Product promoted", {
      description: `"${product.name}" will be featured in promotions`,
      duration: 3000,
    });
  };

  const handleToggleDynamicPricing = (product: Item) => {
    // Update the product dynamic pricing status in local storage
    const updatedProducts = savedProducts.map(p => {
      if (p.id === product.id) {
        return { ...p, dynamicPricingEnabled: !p.dynamicPricingEnabled };
      }
      return p;
    });
    
    setSavedProducts(updatedProducts);
    
    toast.success("Dynamic pricing updated", {
      description: `Dynamic pricing ${!product.dynamicPricingEnabled ? 'enabled' : 'disabled'} for "${product.name}"`,
      duration: 3000,
    });
  };

  const handlePrintLabel = (product: Item) => {
    toast.info("Printing label", {
      description: `Preparing label for "${product.name}"`,
      duration: 3000,
    });
  };

  const handleSetAlert = (product: Item) => {
    toast.success("Alert set", {
      description: `You'll be notified when "${product.name}" is low in stock`,
      duration: 3000,
    });
  };

  const itemAnimation = {
    whileHover: { x: 5, backgroundColor: "rgba(243, 244, 246, 0.8)" },
    transition: { type: "spring", stiffness: 300, damping: 10 }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" className="h-8 w-8 p-0 menu-icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="table-dropdown-content w-56">
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleViewDetails(product.id)}
            className="flex items-center cursor-pointer action-view"
          >
            <Eye className="h-4 w-4 mr-2" />
            View details
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleEditProduct(product.id)}
            className="flex items-center cursor-pointer action-edit"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleDuplicateProduct(product)}
            className="flex items-center cursor-pointer"
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </DropdownMenuItem>
        </motion.div>
        
        {/* Category Change Option */}
        <DropdownMenuSub>
          <motion.div {...itemAnimation}>
            <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
              <Tag className="h-4 w-4 mr-2" />
              Change Category
            </DropdownMenuSubTrigger>
          </motion.div>
          <DropdownMenuSubContent className="min-w-[180px]">
            <DropdownMenuRadioGroup value={selectedCategory} onValueChange={(value) => handleChangeCategory(value)}>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="food" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2 inline-block"></span> Food
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="clothing" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 inline-block"></span> Clothing
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="electronics" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2 inline-block"></span> Electronics
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="furniture" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-purple-500 mr-2 inline-block"></span> Furniture
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="household" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-cyan-500 mr-2 inline-block"></span> Household
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="books" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 mr-2 inline-block"></span> Books
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="toys" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-pink-500 mr-2 inline-block"></span> Toys
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="medicine" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-2 inline-block"></span> Medicine
                </DropdownMenuRadioItem>
              </motion.div>
              <motion.div {...itemAnimation}>
                <DropdownMenuRadioItem value="other" className="cursor-pointer">
                  <span className="h-2 w-2 rounded-full bg-gray-500 mr-2 inline-block"></span> Other
                </DropdownMenuRadioItem>
              </motion.div>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* New enhanced options */}
        <DropdownMenuSeparator />
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleToggleDynamicPricing(product)}
            className="flex items-center cursor-pointer"
          >
            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
            {product.dynamicPricingEnabled ? 'Disable dynamic pricing' : 'Enable dynamic pricing'}
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handlePromoteProduct(product)}
            className="flex items-center cursor-pointer"
          >
            <Gift className="h-4 w-4 mr-2 text-purple-500" />
            Promote product
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handlePrintLabel(product)}
            className="flex items-center cursor-pointer"
          >
            <Printer className="h-4 w-4 mr-2 text-blue-500" />
            Print label
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleSetAlert(product)}
            className="flex items-center cursor-pointer"
          >
            <Bell className="h-4 w-4 mr-2 text-amber-500" />
            Set stock alert
          </DropdownMenuItem>
        </motion.div>
        
        <DropdownMenuSeparator />
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleDownloadProductData(product)}
            className="flex items-center cursor-pointer"
          >
            <Download className="h-4 w-4 mr-2 text-blue-600" />
            Export product data
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleAnalyticsView(product.id)}
            className="flex items-center cursor-pointer"
          >
            <FileBarChart className="h-4 w-4 mr-2 text-indigo-600" />
            View analytics
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleShareProduct(product)}
            className="flex items-center cursor-pointer"
          >
            <Share2 className="h-4 w-4 mr-2 text-green-600" />
            Share product
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div {...itemAnimation}>
          <DropdownMenuItem 
            onClick={() => handleToggleVisibility(product, product.status)}
            className="flex items-center cursor-pointer"
          >
            {product.status === 'available' ? (
              <>
                <EyeOff className="h-4 w-4 mr-2 text-amber-600" />
                Hide product
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2 text-green-600" />
                Show product
              </>
            )}
          </DropdownMenuItem>
        </motion.div>
        
        <DropdownMenuSeparator />
        
        <motion.div 
          whileHover={{ x: 5, backgroundColor: "rgba(254, 202, 202, 0.8)" }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <DropdownMenuItem 
            onClick={() => handleDeleteProduct(product.id)}
            className="flex items-center cursor-pointer text-red-600 action-delete"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActionMenu;
