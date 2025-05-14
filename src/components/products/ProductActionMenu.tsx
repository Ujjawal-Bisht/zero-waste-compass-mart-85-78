
import React from 'react';
import { Item } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ProductActionMenuProps {
  product: Item;
}

const ProductActionMenu: React.FC<ProductActionMenuProps> = ({ product }) => {
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
      <DropdownMenuContent align="end" className="table-dropdown-content">
        <DropdownMenuItem 
          onClick={() => handleViewDetails(product.id)}
          className="flex items-center cursor-pointer action-view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleEditProduct(product.id)}
          className="flex items-center cursor-pointer action-edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDuplicateProduct(product)}
          className="flex items-center cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleToggleVisibility(product, product.status)}
          className="flex items-center cursor-pointer"
        >
          {product.status === 'available' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m1 1 22 22"/></svg>
              Hide product
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Show product
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => handleDeleteProduct(product.id)}
          className="flex items-center cursor-pointer text-red-600 action-delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActionMenu;
