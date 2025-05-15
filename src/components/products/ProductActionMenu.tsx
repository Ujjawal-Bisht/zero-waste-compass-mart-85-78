
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
  MoreVertical, 
  Tag, 
  Edit, 
  Trash, 
  Eye, 
  Copy, 
  EyeOff, 
  Download,
  BarChart, 
  Share2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/pages/items/hooks/useLocalStorage';

interface ProductActionMenuProps {
  product: Item;
}

const ProductActionMenu: React.FC<ProductActionMenuProps> = ({ product }) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>(product.category);
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Editing product",
      description: `You're now editing product ${productId}`,
      duration: 3000,
    });
    // navigate(`/items/edit/${productId}`);
  };

  const handleViewDetails = (productId: string) => {
    toast({
      title: "Viewing product details",
      description: `Viewing details for product ${productId}`,
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
    
    toast({
      title: "Product duplicated",
      description: `"${product.name}" has been duplicated`,
      duration: 3000,
    });
  };

  const handleChangeCategory = (newCategory: ItemCategory) => {
    setSelectedCategory(newCategory);
    
    // Update the product in the local storage
    const updatedProducts = savedProducts.map(p => {
      if (p.id === product.id) {
        return { ...p, category: newCategory };
      }
      return p;
    });
    
    setSavedProducts(updatedProducts);
    
    toast({
      title: "Category updated",
      description: `Product category changed to "${newCategory}"`,
      duration: 3000,
    });
  };

  const handleToggleVisibility = (product: Item, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'flagged' : 'available';
    
    // Update the product status in local storage
    const updatedProducts = savedProducts.map(p => {
      if (p.id === product.id) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    
    setSavedProducts(updatedProducts);
    
    toast({
      title: "Status updated",
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
    a.download = `product-${product.id}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Product data downloaded",
      description: `Data for "${product.name}" has been downloaded as JSON`,
      duration: 3000,
    });
  };

  const handleAnalyticsView = (productId: string) => {
    toast({
      title: "Analytics View",
      description: `Viewing analytics for product ${productId}`,
      duration: 3000,
    });
  };

  const handleShareProduct = (product: Item) => {
    // Create a shareable link (in a real app, this would be a proper URL)
    const shareableLink = `${window.location.origin}/products/${product.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: `Share link for "${product.name}" copied`,
        duration: 3000,
      });
    });
  };

  const handleDeleteProduct = (productId: string) => {
    // Remove the product from local storage
    const updatedProducts = savedProducts.filter(p => p.id !== productId);
    setSavedProducts(updatedProducts);
    
    toast({
      title: "Product deleted",
      description: `Product has been removed`,
      variant: "destructive",
      duration: 3000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 menu-icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="table-dropdown-content w-56">
        <DropdownMenuItem 
          onClick={() => handleViewDetails(product.id)}
          className="flex items-center cursor-pointer action-view"
        >
          <Eye className="h-4 w-4 mr-2" />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleEditProduct(product.id)}
          className="flex items-center cursor-pointer action-edit"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDuplicateProduct(product)}
          className="flex items-center cursor-pointer"
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </DropdownMenuItem>
        
        {/* Category Change Option */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
            <Tag className="h-4 w-4 mr-2" />
            Change Category
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="min-w-[180px]">
            <DropdownMenuRadioGroup value={selectedCategory} onValueChange={(value: ItemCategory) => handleChangeCategory(value)}>
              <DropdownMenuRadioItem value="food" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2 inline-block"></span> Food
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="clothing" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 inline-block"></span> Clothing
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="electronics" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2 inline-block"></span> Electronics
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="furniture" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-purple-500 mr-2 inline-block"></span> Furniture
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="household" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-cyan-500 mr-2 inline-block"></span> Household
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="books" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-indigo-500 mr-2 inline-block"></span> Books
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="toys" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-pink-500 mr-2 inline-block"></span> Toys
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medicine" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-red-500 mr-2 inline-block"></span> Medicine
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="other" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-gray-500 mr-2 inline-block"></span> Other
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* New options */}
        <DropdownMenuItem 
          onClick={() => handleDownloadProductData(product)}
          className="flex items-center cursor-pointer"
        >
          <Download className="h-4 w-4 mr-2" />
          Export product data
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleAnalyticsView(product.id)}
          className="flex items-center cursor-pointer"
        >
          <BarChart className="h-4 w-4 mr-2" />
          View analytics
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShareProduct(product)}
          className="flex items-center cursor-pointer"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share product
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleToggleVisibility(product, product.status)}
          className="flex items-center cursor-pointer"
        >
          {product.status === 'available' ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide product
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show product
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => handleDeleteProduct(product.id)}
          className="flex items-center cursor-pointer text-red-600 action-delete"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActionMenu;
