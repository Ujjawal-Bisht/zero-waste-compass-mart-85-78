
import React, { useState } from 'react';
import { Item } from '@/types';
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
import { MoreVertical, Tag, Bookmark, Edit, Trash, Eye, Copy, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface ProductActionMenuProps {
  product: Item;
}

const ProductActionMenu: React.FC<ProductActionMenuProps> = ({ product }) => {
  const [selectedCategory, setSelectedCategory] = useState(product.category);

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
    toast({
      title: "Product duplicated",
      description: `"${product.name}" has been duplicated`,
      duration: 3000,
    });
  };

  const handleChangeCategory = (productId: string, newCategory: string) => {
    setSelectedCategory(newCategory);
    toast({
      title: "Category updated",
      description: `Product category changed to "${newCategory}"`,
      duration: 3000,
    });
  };

  const handleToggleVisibility = (product: Item, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'flagged' : 'available';
    toast({
      title: "Status updated",
      description: `Product "${product.name}" is now ${newStatus}`,
      duration: 3000,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Confirm deletion",
      description: `Product ID: ${productId} would be deleted`,
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
        
        {/* New Category Change Option */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
            <Tag className="h-4 w-4 mr-2" />
            Change Category
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="min-w-[180px]">
            <DropdownMenuRadioGroup value={selectedCategory} onValueChange={(value) => handleChangeCategory(product.id, value)}>
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
              <DropdownMenuRadioItem value="other" className="cursor-pointer">
                <span className="h-2 w-2 rounded-full bg-gray-500 mr-2 inline-block"></span> Other
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
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
