
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import ItemNameField from './details/ItemNameField';
import PriceQuantityFields from './details/PriceQuantityFields';
import CategoryField from './details/CategoryField';
import ExpiryDatePicker from './ExpiryDatePicker';
import { ItemFormValues } from '../schemas/itemFormSchema';

export interface ItemDetailsSectionProps {
  form: UseFormReturn<ItemFormValues>;
  handleBarcodeDetected: (barcode: string) => void;
  isNameUpdated?: boolean;
  isPriceUpdated?: boolean;
  isQuantityUpdated?: boolean;
  isCategoryUpdated?: boolean;
}

const ItemDetailsSection: React.FC<ItemDetailsSectionProps> = ({ 
  form, 
  handleBarcodeDetected,
  isNameUpdated, 
  isPriceUpdated,
  isQuantityUpdated,
  isCategoryUpdated
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Item Details</h3>
        
        <div className="space-y-5">
          <ItemNameField 
            form={form} 
            handleBarcodeDetected={handleBarcodeDetected}
            isUpdated={Boolean(isNameUpdated)}
          />
          
          <PriceQuantityFields 
            form={form} 
            isQuantityUpdated={Boolean(isQuantityUpdated)}
            isPriceUpdated={Boolean(isPriceUpdated)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategoryField 
              form={form} 
              isUpdated={Boolean(isCategoryUpdated)}
            />
            <ExpiryDatePicker form={form} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemDetailsSection;
