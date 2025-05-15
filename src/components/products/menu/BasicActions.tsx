
import React from 'react';
import { Eye, Pencil, Copy } from 'lucide-react';
import MenuItem from './MenuItem';
import { Item } from '@/types';

interface BasicActionsProps {
  product: Item;
  onViewDetails: (id: string) => void;
  onEditProduct: (id: string) => void;
  onDuplicateProduct: (product: Item) => void;
}

const BasicActions: React.FC<BasicActionsProps> = ({ 
  product, 
  onViewDetails, 
  onEditProduct, 
  onDuplicateProduct 
}) => {
  return (
    <>
      <MenuItem 
        onClick={() => onViewDetails(product.id)}
        icon={<Eye className="h-4 w-4 mr-2" />}
        label="View details"
        className="action-view"
      />
      
      <MenuItem 
        onClick={() => onEditProduct(product.id)}
        icon={<Pencil className="h-4 w-4 mr-2" />}
        label="Edit"
        className="action-edit"
      />
      
      <MenuItem 
        onClick={() => onDuplicateProduct(product)}
        icon={<Copy className="h-4 w-4 mr-2" />}
        label="Duplicate"
      />
    </>
  );
};

export default BasicActions;
