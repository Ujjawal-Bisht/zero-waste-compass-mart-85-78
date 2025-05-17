
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import ItemNameField from './details/ItemNameField';
import PriceQuantityFields from './details/PriceQuantityFields';
import CategoryField from './details/CategoryField';
import ExpiryDatePicker from './ExpiryDatePicker';
import { ItemFormValues } from '../schemas/itemFormSchema';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { InfoCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  // Get dynamicPricingEnabled value from form
  const dynamicPricingEnabled = form.watch('dynamicPricingEnabled');

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
            dynamicPricingEnabled={dynamicPricingEnabled}
          />
          
          <div className="flex items-center space-x-2 mb-4 py-2 px-3 bg-indigo-50 rounded-md border border-indigo-100">
            <Switch
              id="dynamic-pricing"
              checked={dynamicPricingEnabled}
              onCheckedChange={(checked) => form.setValue('dynamicPricingEnabled', checked)}
            />
            <Label htmlFor="dynamic-pricing" className="text-sm font-medium flex items-center cursor-pointer">
              Enable AI Dynamic Pricing
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoCircle className="h-4 w-4 ml-1 text-indigo-500" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>AI Dynamic Pricing automatically adjusts the price based on expiry date, reducing waste and maximizing sales. Prices will be automatically discounted as the expiry date approaches.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
          
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
